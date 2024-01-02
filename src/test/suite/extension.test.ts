import * as assert from "assert";

import * as vscode from "vscode";
import { consoleColorLog } from "../../utils";
// import * as myExtension from '../../extension';

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const testFileLocation = "/djangoApp/templates/djangoApp/index.html";

suite("Extension Test Suite", async () => {
  vscode.window.showInformationMessage("Start all tests.");

  let editor: vscode.TextEditor;
  let fileUri: vscode.Uri;

  setup(async () => {
    consoleColorLog(`set up`, "cyan");
    if (vscode.workspace.workspaceFolders === undefined) {
      consoleColorLog(`workspace folders is undefined`, "cyan");
      assert.fail();
    }
    consoleColorLog("set up 1", "cyan");

    await sleep(1000);
    const filePath =
      vscode.workspace.workspaceFolders[0].uri.fsPath + testFileLocation;

    await sleep(1000);
    fileUri = vscode.Uri.file(filePath);
    consoleColorLog("set up 2", "cyan");
    // consoleColorLog(`fileUri is ${JSON.stringify(fileUri.path)}`, "cyan");

    await sleep(1000);
    const document = await vscode.workspace.openTextDocument(fileUri);
    consoleColorLog("set up 3", "cyan");
    // consoleColorLog(document.languageId, "cyan");
    // consoleColorLog(document.uri.fsPath, "cyan");

    await sleep(1000);
    editor = await vscode.window.showTextDocument(document);
    consoleColorLog("set up 4", "cyan");
  });

  test("Completion Items are Provided", async function () {
    // await sleep(1000);
    consoleColorLog(`test start`, "cyan");
    consoleColorLog(editor.document.languageId, "magenta");

    const completionList =
      await vscode.commands.executeCommand<vscode.CompletionList>(
        "vscode.executeCompletionItemProvider",
        editor.document.uri,
        new vscode.Position(0, 0)
      );

    consoleColorLog(
      `completionList is ${JSON.stringify(completionList)}`,
      "cyan"
    );

    // Ensure that completion items are provided
    assert.ok(completionList.items.length > 0);
    const completionItem = completionList.items[0];
    assert.strictEqual(completionItem.label, "test1");
    assert.strictEqual(completionItem.kind, vscode.CompletionItemKind.Variable);
    assert.strictEqual(completionItem.detail, "../../views.py");
    vscode.window.showInformationMessage("End all tests.");
    await vscode.commands.executeCommand("workbench.action.closeActiveEditor");
  });

  // Additional tests can be added as needed

  teardown(async function () {
    // Clean up the temporary test workspace
    await vscode.commands.executeCommand("vscode.setEditorLayout", {
      groups: [{}, {}],
      orientation: 0,
    });
    await vscode.commands.executeCommand("workbench.action.closeAllEditors");
  });
});
