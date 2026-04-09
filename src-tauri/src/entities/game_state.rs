use serde::{Deserialize, Serialize};
use std::collections::HashSet;

#[derive(Clone, Default, Serialize, Deserialize)]
pub struct GameState {
    pub current_room_id: String,
    pub visited_rooms: HashSet<String>,

    pub completed_flags: HashSet<String>,
    pub inventory: HashSet<String>,
}
