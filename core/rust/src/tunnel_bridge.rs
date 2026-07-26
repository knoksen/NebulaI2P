use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TunnelSession {
    pub session_id: String,
    pub source_device_id: String,
    pub active: bool,
}

pub struct TunnelBridge;

impl TunnelBridge {
    pub fn new() -> Self {
        Self
    }

    pub async fn open_session(&self, source_device_id: &str) -> Result<TunnelSession, String> {
        Ok(TunnelSession {
            session_id: format!("sess-{}", source_device_id),
            source_device_id: source_device_id.to_string(),
            active: true,
        })
    }

    pub async fn close_session(&self, _session_id: &str) -> Result<(), String> {
        Ok(())
    }
}
