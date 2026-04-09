use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Clone, Serialize, Deserialize)]
pub struct Room {
    pub id: String,
    pub name: String,
    pub description: String,

    // Spatial coordinates for the React UI map grid
    pub x: i32,
    pub y: i32,

    // Available exits mapped by direction (e.g., {"north": "hallway_01"})
    pub exits: HashMap<String, String>,

    // Special flags for UI styling
    pub is_danger_zone: bool,
}
