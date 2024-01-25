import * as vscode from "vscode";
export const cleanupVscode = async () => {
  vscode.window.showInformationMessage("End test.");
  await vscode.commands.executeCommand("vscode.setEditorLayout", {
    groups: [{}, {}],
    orientation: 0,
  });
  await vscode.commands.executeCommand("workbench.action.closeAllEditors");
};
