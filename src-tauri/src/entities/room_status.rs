use serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize, Serialize)]
pub enum RoomStatus {
    Current,
    Explored,
    Unexplored,
    Danger,
}
