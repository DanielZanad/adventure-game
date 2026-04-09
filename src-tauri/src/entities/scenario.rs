use crate::entities::{action::Action, game_state::GameState, room::Room};
use crate::entities::{map_node::MapNode, room_status::RoomStatus};
use crate::enums::ActionResult::ActionResult;
use crate::enums::PlayerIntent::PlayerIntent;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

// The Aggregate Root: Manages the entire world and validates interactions
#[derive(Clone, Serialize, Deserialize)]
pub struct Scenario {
    pub id: String,
    pub name: String,
    pub intro_text: String,
    pub state: GameState,
    pub rooms: HashMap<String, Room>,               // The Map Data
    pub available_actions: HashMap<String, Action>, // All possible interactions
}

#[derive(Clone, Serialize)]
pub struct GameSnapshot {
    pub current_room_name: String,
    pub current_room_description: String,
    pub inventory: Vec<String>,
    pub inventory_weight_label: String,
    pub map_nodes: Vec<MapNode>,
}

#[derive(Clone, Serialize)]
pub struct GameInitResponse {
    pub intro_text: String,
    pub snapshot: GameSnapshot,
}

#[derive(Clone, Serialize)]
pub struct CommandResponse {
    pub messages: Vec<String>,
    pub snapshot: GameSnapshot,
}

impl Scenario {
    pub fn init_response(&self) -> GameInitResponse {
        GameInitResponse {
            intro_text: self.intro_text.clone(),
            snapshot: self.snapshot(),
        }
    }

    pub fn submit_command(&mut self, input: &str) -> CommandResponse {
        let normalized = normalize_input(input);
        let intent = self.parse_intent(&normalized);
        let messages = match intent {
            PlayerIntent::SystemCommand(command) if command == "look_around" => {
                vec![self.describe_current_room()]
            }
            PlayerIntent::Action(action_id) => self.apply_action(&action_id),
            PlayerIntent::Move(_) => vec!["You cannot go that way yet.".into()],
            PlayerIntent::Unknown(_) | PlayerIntent::SystemCommand(_) => {
                vec!["Nothing happens. Try another action.".into()]
            }
        };

        CommandResponse {
            messages,
            snapshot: self.snapshot(),
        }
    }

    fn snapshot(&self) -> GameSnapshot {
        let current_room = self.current_room();
        let mut inventory = self.state.inventory.iter().cloned().collect::<Vec<_>>();
        inventory.sort();

        GameSnapshot {
            current_room_name: current_room.name.clone(),
            current_room_description: current_room.description.clone(),
            inventory_weight_label: format!("Weight: {}/8", inventory.len()),
            inventory,
            map_nodes: self.map_nodes(),
        }
    }

    fn current_room(&self) -> &Room {
        self.rooms
            .get(&self.state.current_room_id)
            .expect("current room should exist in seeded scenario")
    }

    fn describe_current_room(&self) -> String {
        self.current_room().description.clone()
    }

    fn map_nodes(&self) -> Vec<MapNode> {
        let mut nodes = self
            .rooms
            .values()
            .map(|room| {
                let status = if room.id == self.state.current_room_id {
                    RoomStatus::Current
                } else if self.state.visited_rooms.contains(&room.id) {
                    RoomStatus::Explored
                } else if room.is_danger_zone {
                    RoomStatus::Danger
                } else {
                    RoomStatus::Unexplored
                };

                MapNode {
                    id: room.id.clone(),
                    name: room.name.clone(),
                    x: room.x,
                    y: room.y,
                    status,
                    exits: room.exits.keys().cloned().collect(),
                }
            })
            .collect::<Vec<_>>();

        nodes.sort_by_key(|node| (node.y, node.x));
        nodes
    }

    fn parse_intent(&self, input: &str) -> PlayerIntent {
        if input.is_empty() {
            return PlayerIntent::Unknown(String::new());
        }

        if matches!(input, "look around" | "look" | "observe") {
            return PlayerIntent::SystemCommand("look_around".into());
        }

        let filtered_tokens = significant_tokens(input);

        for action in self.available_actions.values() {
            let verb_matches = action
                .verbs
                .iter()
                .any(|verb| filtered_tokens.contains(&verb.as_str()));

            if !verb_matches {
                continue;
            }

            let target_matches = action.targets.iter().any(|target| {
                let target_tokens = significant_tokens(target);

                !target_tokens.is_empty()
                    && target_tokens
                        .iter()
                        .all(|token| filtered_tokens.contains(token))
            });

            if target_matches {
                return PlayerIntent::Action(action.id.clone());
            }
        }

        PlayerIntent::Unknown(input.into())
    }

    fn apply_action(&mut self, action_id: &str) -> Vec<String> {
        let Some(action) = self.available_actions.get(action_id).cloned() else {
            return vec!["Nothing happens. Try another action.".into()];
        };

        match self.validate_action(&action) {
            ActionResult::Success(_) => {
                if let Some(destination_room) = &action.destination_room {
                    self.state.current_room_id = destination_room.clone();
                    self.state.visited_rooms.insert(destination_room.clone());
                }

                self.state.completed_flags.insert(action.id.clone());

                for flag in &action.set_flags {
                    self.state.completed_flags.insert(flag.clone());
                }

                for flag in &action.removes_flags {
                    self.state.completed_flags.remove(flag);
                }

                vec![action.success_message, self.describe_current_room()]
            }
            ActionResult::AlreadyDone(message)
            | ActionResult::MissingRequirements(message)
            | ActionResult::WrongLocation(message) => vec![message],
            ActionResult::ActionNotFound => vec!["Nothing happens. Try another action.".into()],
        }
    }

    fn validate_action(&self, action: &Action) -> ActionResult {
        if self.state.completed_flags.contains(&action.id) {
            return ActionResult::AlreadyDone(action.already_done_message.clone());
        }

        if let Some(required_room) = &action.required_room {
            if &self.state.current_room_id != required_room {
                return ActionResult::WrongLocation(format!(
                    "{} {}",
                    action.missing_req_message, "You need to be in the right place first."
                ));
            }
        }

        if action
            .required_flags
            .iter()
            .any(|flag| !self.state.completed_flags.contains(flag))
        {
            return ActionResult::MissingRequirements(action.missing_req_message.clone());
        }

        if action
            .required_items
            .iter()
            .any(|item| !self.state.inventory.contains(item))
        {
            return ActionResult::MissingRequirements(action.missing_req_message.clone());
        }

        ActionResult::Success(action.success_message.clone())
    }
}

fn normalize_input(input: &str) -> String {
    input
        .to_lowercase()
        .split_whitespace()
        .collect::<Vec<_>>()
        .join(" ")
}

fn significant_tokens(input: &str) -> Vec<&str> {
    input
        .split_whitespace()
        .filter(|token| {
            !matches!(
                *token,
                "the" | "a" | "an" | "to" | "in" | "into" | "inside" | "at" | "on"
            )
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use crate::helpers::seed_game;

    #[test]
    fn look_around_returns_current_room_description() {
        let mut scenario = seed_game::seeded_car_scene();

        let response = scenario.submit_command("look around");

        assert_eq!(response.messages.len(), 1);
        assert!(response.messages[0].contains("silent roadside"));
    }

    #[test]
    fn enter_in_the_car_returns_success_then_room_description() {
        let mut scenario = seed_game::seeded_car_scene();

        let response = scenario.submit_command("enter in the car");

        assert_eq!(response.messages.len(), 2);
        assert_eq!(response.messages[0], "You enter in the car.");
        assert!(response.messages[1].contains("inside the car"));
        assert_eq!(response.snapshot.current_room_name, "Inside The Car");
    }
}
