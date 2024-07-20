export type Turn = {
  prompt: string;
  response?: string;
  initialScore?: number;
  actions?: string;
  improvedScore?: number;
};

export type GenerationStatus =
  | "improvements"
  | "thinking"
  | "writing"
  | "retro"
  | "done"
  | null;
