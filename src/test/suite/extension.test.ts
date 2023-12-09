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
  // vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });
  let editor: vscode.TextEditor;

  setup(async () => {
    consoleColorLog(`set up`, "cyan");
    if (vscode.workspace.workspaceFolders === undefined) {
      consoleColorLog(`workspace folders is undefined`, "cyan");

      return;
    }
    consoleColorLog("set up 1", "cyan");

    // open folder
    const fileUri = vscode.Uri.file(
      vscode.workspace.workspaceFolders[0].uri.fsPath + testFileLocation
    );
    consoleColorLog("set up 2", "cyan");
    consoleColorLog(`fileUri is ${JSON.stringify(fileUri)}`, "cyan");

    // await sleep(10000);

    const document = await vscode.workspace.openTextDocument(fileUri);
    consoleColorLog("set up 3", "cyan");
    editor = await vscode.window.showTextDocument(document);
    consoleColorLog("set up 4", "cyan");
  });

  test("Completion Items are Provided", async function () {
    consoleColorLog(`test start`, "cyan");
    editor.selection = new vscode.Selection(
      new vscode.Position(0, 0),
      new vscode.Position(0, 0)
    );

    consoleColorLog("2", "cyan");
    consoleColorLog(`editor is ${editor.document.uri}`, "cyan");

    const completionList =
      await vscode.commands.executeCommand<vscode.CompletionList>(
        "vscode.executeCompletionItemProvider"
      );
    consoleColorLog("3", "cyan");
    consoleColorLog(`completionList is ${completionList}`, "cyan");

    // Ensure that completion items are provided
    assert.ok(completionList.items.length > 0);
    const completionItem = completionList.items[0];
    assert.strictEqual(completionItem.label, "test1");
    assert.strictEqual(completionItem.kind, vscode.CompletionItemKind.Variable);
    assert.strictEqual(completionItem.detail, "../../test.py");
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
