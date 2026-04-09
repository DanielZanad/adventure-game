pub enum PlayerIntent {
    Action(String),        // Found a matching action ID (e.g., Action("unlock_car"))
    Move(String),          // Found a movement command (e.g., Move("north"))
    SystemCommand(String), // Matches a hardcoded system command (e.g., "inventory", "help")
    Unknown(String),       // The parser couldn't figure out what the text meant
}
