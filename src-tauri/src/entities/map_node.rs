use serde::{Deserialize, Serialize};

use crate::entities::room_status::RoomStatus;

// The exact data React needs to render a single square on your Map Dialog
#[derive(Clone, Deserialize, Serialize)]
pub struct MapNode {
    pub id: String,
    pub name: String,
    pub x: i32,
    pub y: i32,
    pub status: RoomStatus,
    pub exits: Vec<String>, // Useful if you want to draw connecting lines later
}
