use jsonrpsee::{http_server::HttpServerBuilder, RpcModule};
use std::net::SocketAddr;

pub async fn run_rpc_server() -> anyhow::Result<()> {
    let server = HttpServerBuilder::default()
        .build("127.0.0.1:4173".parse::<SocketAddr>()?)
        .await?;

    let mut module = RpcModule::new(());
    module.register_method("hello", |_, _| Ok("hello sui"))?;

    Ok(server.start(module)?.await)
}
