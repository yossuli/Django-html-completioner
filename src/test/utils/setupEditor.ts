import * as vscode from "vscode";
import type { ConsoleLogColor } from "../../types/types";
import { setupDocument } from "./setupDocument";
export const setupEditor = async (
  testFileLocation: string,
  consoleLogColor?: ConsoleLogColor
) => {
  const document = await setupDocument(testFileLocation, consoleLogColor);

  return vscode.window.showTextDocument(document);
};
