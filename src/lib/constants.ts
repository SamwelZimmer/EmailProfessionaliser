import { Turn } from "./types";

export const EMPTY_TURN: Turn = { prompt: "" };

export const GENERATION_STATUS_MAP = {
  improvements: { progress: 15, text: "Getting Improvements..." },
  thinking: { progress: 33, text: "Thinking..." },
  writing: { progress: 60, text: "Writing..." },
  retro: { progress: 79, text: "Post-Game..." },
  done: { progress: 100, text: "Ready" },
};
