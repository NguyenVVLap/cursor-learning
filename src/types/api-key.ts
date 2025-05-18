export interface ApiKey {
  id: string;
  name: string;
  type: "dev" | "prod";
  usage: number;
  key: string;
  usage_limit: number | null;
  created_at: string;
}

export type ModalMode = "create" | "edit" | "view";
