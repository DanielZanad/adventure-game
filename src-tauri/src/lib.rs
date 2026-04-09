pub mod entities;
pub mod enums;
pub mod helpers;

use crate::entities::scenario::{CommandResponse, GameInitResponse, Scenario};
use crate::helpers::seed_game;
use std::sync::Mutex;

#[tauri::command]
fn init_game(game: tauri::State<'_, Mutex<Scenario>>) -> Result<GameInitResponse, String> {
    let mut scenario = game
        .lock()
        .map_err(|_| "Failed to lock game state.".to_string())?;

    *scenario = seed_game::seeded_car_scene();

    Ok(scenario.init_response())
}

#[tauri::command]
fn submit_command(
    input: String,
    game: tauri::State<'_, Mutex<Scenario>>,
) -> Result<CommandResponse, String> {
    let mut scenario = game
        .lock()
        .map_err(|_| "Failed to lock game state.".to_string())?;

    Ok(scenario.submit_command(&input))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(Mutex::new(seed_game::seeded_car_scene()))
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![init_game, submit_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
