use serde::Serialize;
use std::time::Duration;
use tauri::{AppHandle, Emitter, Manager};

#[derive(Clone, Serialize)]
struct CollisionPayload {
    size: u32,
}

fn start_collision_simulation(app: AppHandle) {
    tauri::async_runtime::spawn(async move {
        let mut size: u32 = 24;
        loop {
            let windows = app.webview_windows();
            if let Some(window) = windows.get("main") {
                let _ = window.emit("incoming-collision", CollisionPayload { size });
            }

            size += 9;
            if size > 84 {
                size = 24;
            }

            tauri::async_runtime::sleep(Duration::from_millis(2800)).await;
        }
    });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            start_collision_simulation(app.handle().clone());
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
