use crate::entities::scenario::Scenario;
use std::fs;
use std::path::PathBuf;

pub fn seeded_car_scene() -> Scenario {
    seeded_scenario("car_scene")
}

pub fn seeded_scenario(scenario_id: &str) -> Scenario {
    let scenario_json = load_scenario_file(scenario_id)
        .unwrap_or_else(|error| panic!("Failed to load seeded scenario JSON: {error}"));

    serde_json::from_str::<Scenario>(&scenario_json)
        .unwrap_or_else(|error| panic!("Failed to parse seeded scenario JSON: {error}"))
}

fn load_scenario_file(scenario_id: &str) -> Result<String, String> {
    let file_name = if scenario_id.ends_with(".json") {
        scenario_id.to_string()
    } else {
        format!("{scenario_id}.json")
    };

    let mut candidates = vec![
        PathBuf::from(env!("CARGO_MANIFEST_DIR"))
            .join("resources")
            .join("scenarios")
            .join(&file_name),
        PathBuf::from("src-tauri")
            .join("resources")
            .join("scenarios")
            .join(&file_name),
        PathBuf::from("resources")
            .join("scenarios")
            .join(&file_name),
    ];

    if let Ok(custom_path) = std::env::var("ADVENTURE_SCENARIO_PATH") {
        candidates.insert(0, PathBuf::from(custom_path));
    }

    for path in &candidates {
        if let Ok(contents) = fs::read_to_string(path) {
            return Ok(contents);
        }
    }

    Err(format!(
        "No scenario file found for '{scenario_id}'. Tried: {}",
        candidates
            .iter()
            .map(|path| path.display().to_string())
            .collect::<Vec<_>>()
            .join(", ")
    ))
}
