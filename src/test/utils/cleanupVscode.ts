import * as vscode from "vscode";
import type { ConsoleLogColor } from "../../types/types";
import { consoleColorLog } from "../../utils/consoleColorLog";
export const cleanupVscode = async (consoleLogColor?: ConsoleLogColor) => {
  vscode.window.showInformationMessage("End test.");
  await vscode.commands.executeCommand("vscode.setEditorLayout", {
    groups: [{}, {}],
    orientation: 0,
  });
  await vscode.commands.executeCommand("workbench.action.closeAllEditors");
  consoleColorLog("cleanupVscode", consoleLogColor);
};
