import * as assert from "assert";
import { join } from "path";
import * as vscode from "vscode";
import type { ConsoleLogColor } from "../../types/types";
import { consoleColorLog } from "../../utils/consoleColorLog";
export const setupDocument = async (
  testFileLocation: string,
  consoleLogColor?: ConsoleLogColor
) => {
  consoleColorLog("setup start", consoleLogColor);
  if (vscode.workspace.workspaceFolders === undefined) {
    consoleColorLog("workspace folders is undefined", "red");
    assert.fail();
  }
  const filePath = join(
    vscode.workspace.workspaceFolders[0].uri.fsPath,
    testFileLocation
  );

  const fileUri = vscode.Uri.file(filePath);

  return vscode.workspace.openTextDocument(fileUri);
};
