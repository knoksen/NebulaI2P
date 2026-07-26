use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PairedDevice {
    pub device_id: Uuid,
    pub device_name: String,
    pub role: String,
    pub trust_level: u8,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InvitePayload {
    pub token: String,
    pub expires_at_unix: u64,
}

pub struct PairingService;

impl PairingService {
    pub fn new() -> Self {
        Self
    }

    pub fn generate_invite(&self) -> InvitePayload {
        InvitePayload {
            token: Uuid::new_v4().to_string(),
            expires_at_unix: 1_900_000_000,
        }
    }

    pub fn accept_invite(&self, _token: &str, device_name: &str, role: &str) -> PairedDevice {
        PairedDevice {
            device_id: Uuid::new_v4(),
            device_name: device_name.to_string(),
            role: role.to_string(),
            trust_level: 100,
        }
    }
}
