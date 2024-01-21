import * as assert from "assert";
import { join } from "path";
import * as vscode from "vscode";
import type { TestFileLocationAndExpectedItems } from "../../types/types";
import { consoleColorLog } from "../../utils/consoleColorLog";
import { sleep } from "../../utils/sleep";

export const completionItemsTest = (
  testFileLocationAndExpectedItem: TestFileLocationAndExpectedItems
): Promise<void> =>
  new Promise((resolve) => {
    let editor: vscode.TextEditor;

    setup(async () => {
      consoleColorLog("set up start", "cyan");
      if (vscode.workspace.workspaceFolders === undefined) {
        consoleColorLog(`workspace folders is undefined`, "red");
        assert.fail();
      }
      consoleColorLog("set up 1", testFileLocationAndExpectedItem.color);

      await sleep(100);
      const filePath = join(
        vscode.workspace.workspaceFolders[0].uri.fsPath,
        testFileLocationAndExpectedItem.location
      );

      await sleep(100);
      const fileUri = vscode.Uri.file(filePath);
      consoleColorLog("set up 2", testFileLocationAndExpectedItem.color);

      await sleep(100);
      const document = await vscode.workspace.openTextDocument(fileUri);
      consoleColorLog("set up 3", testFileLocationAndExpectedItem.color);

      await sleep(100);

      editor = await vscode.window.showTextDocument(document);
      consoleColorLog("set up 4", testFileLocationAndExpectedItem.color);
    });
    test(`Completion Items are Provided from ${
      testFileLocationAndExpectedItem.location.split("/").slice(-1)[0]
    }`, async function () {
      const completionList =
        await vscode.commands.executeCommand<vscode.CompletionList>(
          "vscode.executeCompletionItemProvider",
          editor.document.uri,
          new vscode.Position(0, 0)
        );

      consoleColorLog(
        `completionList is ${JSON.stringify(completionList)}`,
        testFileLocationAndExpectedItem.color
      );

      assert.ok(
        completionList.items.length ===
          testFileLocationAndExpectedItem.items.length
      );
      completionList.items.forEach((completionItem, i) => {
        assert.strictEqual(
          completionItem.label,
          testFileLocationAndExpectedItem.items[i]
        );
        assert.strictEqual(
          completionItem.kind,
          vscode.CompletionItemKind.Variable
        );
        assert.strictEqual(completionItem.detail, "../../views.py");
      });
    });
    teardown(async function () {
      vscode.window.showInformationMessage("End tests.");
      await vscode.commands.executeCommand("vscode.setEditorLayout", {
        groups: [{}, {}],
        orientation: 0,
      });
      await vscode.commands.executeCommand("workbench.action.closeAllEditors");
    });
    resolve();
  });
