import * as vscode from "vscode";
import type { ConsoleLogColor } from "../../types/types";
import { consoleColorLog } from "../../utils/consoleColorLog";
import { sleep } from "../../utils/sleep";
import { setupDocument } from "./setupDocument";
export const setupEditor = async (
  testFileLocation: string,
  consoleLogColor?: ConsoleLogColor
) => {
  const document = await setupDocument(testFileLocation, consoleLogColor);
  consoleColorLog("setup 3", consoleLogColor);
  await sleep(100);

  return vscode.window.showTextDocument(document);
};
