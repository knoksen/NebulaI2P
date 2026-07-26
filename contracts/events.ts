export type NebulaEvent =
  | {
      type: "node.status.changed";
      payload: {
        online: boolean;
        peers: number;
        bandwidthKbps: number;
        tunnels: number;
      };
    }
  | {
      type: "sync.completed";
      payload: {
        sent: number;
        received: number;
        conflicts: number;
      };
    }
  | {
      type: "pairing.completed";
      payload: {
        deviceId: string;
        deviceName: string;
        role: "desktop" | "mobile";
      };
    }
  | {
      type: "privacy.singularity.triggered";
      payload: {
        blackoutMs: number;
      };
    };
