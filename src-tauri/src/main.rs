#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use sui_desktop_wallet::server;
use sui_desktop_wallet::{__cmd__greet, commands::greet};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|_| {
            tauri::async_runtime::spawn(async move {
                server::run_rpc_server().await.expect("rpc server to start");
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
