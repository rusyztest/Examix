import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

export function createLobbyCode(length = 8) {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const codeLength = Math.min(Math.max(4, length), 10);

  return Array.from({ length: codeLength }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
}
