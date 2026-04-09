// Represents the outcome of attempting to move between rooms
pub enum MoveResult {
    Success(String),     // Contains the new room's description
    NoExitFound(String), // Player tried to walk into a wall
}
