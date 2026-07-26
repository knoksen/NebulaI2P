use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SyncResult {
    pub sent: u32,
    pub received: u32,
    pub conflicts: u32,
}

pub struct SyncEngine;

impl SyncEngine {
    pub fn new() -> Self {
        Self
    }

    pub async fn push(&self) -> Result<SyncResult, String> {
        Ok(SyncResult {
            sent: 1,
            received: 0,
            conflicts: 0,
        })
    }

    pub async fn pull(&self) -> Result<SyncResult, String> {
        Ok(SyncResult {
            sent: 0,
            received: 1,
            conflicts: 0,
        })
    }

    pub async fn resolve_conflict(&self, _conflict_id: &str, _strategy: &str) -> Result<(), String> {
        Ok(())
    }
}
