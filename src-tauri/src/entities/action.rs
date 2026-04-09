use serde::{Deserialize, Serialize};

#[derive(Clone, Serialize, Deserialize)]
pub struct Action {
    pub id: String,

    pub verbs: Vec<String>,
    pub targets: Vec<String>,

    pub required_flags: Vec<String>,
    pub required_items: Vec<String>,
    pub required_room: Option<String>,
    pub destination_room: Option<String>,

    pub set_flags: Vec<String>,
    pub removes_flags: Vec<String>,

    pub success_message: String,
    pub missing_req_message: String,
    pub already_done_message: String,
}
