// Represents the outcome of an action attempting to mutate the GameState
pub enum ActionResult {
    Success(String),
    AlreadyDone(String),
    MissingRequirements(String),
    WrongLocation(String), // NEW: Player tried an action in the wrong room
    ActionNotFound,
}
