use crate::entities::{
    action::Action, game_state::GameState, room::Room, scenario::Scenario,
};
use std::collections::{HashMap, HashSet};

pub fn seeded_car_scene() -> Scenario {
    let outside_car = Room {
        id: "roadside".into(),
        name: "Roadside".into(),
        description: "You stand alone on a silent roadside. A battered car waits under a dead streetlight, its metal body reflecting the last trace of rain.".into(),
        x: 1,
        y: 1,
        exits: HashMap::new(),
        is_danger_zone: false,
    };

    let inside_car = Room {
        id: "inside_car".into(),
        name: "Inside The Car".into(),
        description: "You are inside the car now. The cabin smells of dust, gasoline, and old leather. The dashboard is cracked, but the steering wheel and front seats are still intact.".into(),
        x: 1,
        y: 0,
        exits: HashMap::new(),
        is_danger_zone: false,
    };

    let enter_car = Action {
        id: "enter_car".into(),
        verbs: vec!["enter".into(), "get".into(), "climb".into()],
        targets: vec!["car".into(), "vehicle".into()],
        required_flags: Vec::new(),
        required_items: Vec::new(),
        required_room: Some("roadside".into()),
        destination_room: Some("inside_car".into()),
        set_flags: vec!["entered_car".into()],
        removes_flags: Vec::new(),
        success_message: "You enter in the car.".into(),
        missing_req_message: "Something is stopping you from entering the car.".into(),
        already_done_message: "You are already inside the car.".into(),
    };

    let mut rooms = HashMap::new();
    rooms.insert(outside_car.id.clone(), outside_car);
    rooms.insert(inside_car.id.clone(), inside_car);

    let mut available_actions = HashMap::new();
    available_actions.insert(enter_car.id.clone(), enter_car);

    let mut visited_rooms = HashSet::new();
    visited_rooms.insert("roadside".into());

    Scenario {
        id: "car_scene".into(),
        name: "Lonely Road".into(),
        intro_text: "The road behind you has already disappeared into fog.\nOnly one thing still feels real: the abandoned car waiting beside the shoulder.\nIf you want answers, you will have to begin there.".into(),
        state: GameState {
            current_room_id: "roadside".into(),
            visited_rooms,
            completed_flags: HashSet::new(),
            inventory: HashSet::new(),
        },
        rooms,
        available_actions,
    }
}
