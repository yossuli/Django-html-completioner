import type { ConsoleLogColor } from "../types/types";

export const colors: { [color in ConsoleLogColor]: string } = {
  black: "\u001b[30m",
  red: "\u001b[31m",
  green: "\u001b[32m",
  yellow: "\u001b[33m",
  blue: "\u001b[34m",
  magenta: "\u001b[35m",
  cyan: "\u001b[36m",
  white: "\u001b[37m",
};

export const consoleColorLog = (message: string, color?: ConsoleLogColor) => {
  console.log(`${colors[color ?? "white"]}${message}\u001b[0m`);
};
