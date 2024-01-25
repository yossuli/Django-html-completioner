import * as assert from "assert";
import { join } from "path";
import * as vscode from "vscode";
import type { ConsoleLogColor } from "../../types/types";
import { consoleColorLog } from "../../utils/consoleColorLog";
import { sleep } from "../../utils/sleep";
export const setupEditor = async (
  consoleLogColor: ConsoleLogColor | undefined,
  testFileLocation: string
) => {
  consoleColorLog("setup start", "cyan");
  if (vscode.workspace.workspaceFolders === undefined) {
    consoleColorLog(`workspace folders is undefined`, "red");
    assert.fail();
  }
  consoleColorLog("setup 1", consoleLogColor);

  await sleep(100);
  const filePath = join(
    vscode.workspace.workspaceFolders[0].uri.fsPath,
    testFileLocation
  );

  await sleep(100);
  const fileUri = vscode.Uri.file(filePath);
  consoleColorLog("setup 2", consoleLogColor);

  await sleep(100);
  const document = await vscode.workspace.openTextDocument(fileUri);
  consoleColorLog("setup 3", consoleLogColor);

  await sleep(100);
  return vscode.window.showTextDocument(document);
};
