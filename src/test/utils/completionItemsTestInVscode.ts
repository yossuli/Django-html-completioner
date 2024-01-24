import * as assert from "assert";
import { join } from "path";
import * as vscode from "vscode";
import type { TestFileLocationAndExpectedItems } from "../../types/types";
import { consoleColorLog } from "../../utils/consoleColorLog";
import { sleep } from "../../utils/sleep";
import { zip2 } from "../../utils/zip";

export const completionItemsTestInVscode = (
  testFileLocationAndExpectedLabel: TestFileLocationAndExpectedItems
): Promise<void> =>
  new Promise((resolve) => {
    vscode.window.showInformationMessage("Start test.");
    let editor: vscode.TextEditor;
    const consoleLogColor = testFileLocationAndExpectedLabel.color;
    // ANCHOR setup
    setup(async () => {
      consoleColorLog("set up start", "cyan");
      if (vscode.workspace.workspaceFolders === undefined) {
        consoleColorLog(`workspace folders is undefined`, "red");
        assert.fail();
      }
      consoleColorLog("set up 1", consoleLogColor);

      await sleep(100);
      const filePath = join(
        vscode.workspace.workspaceFolders[0].uri.fsPath,
        testFileLocationAndExpectedLabel.location
      );

      await sleep(100);
      const fileUri = vscode.Uri.file(filePath);
      consoleColorLog("set up 2", consoleLogColor);

      await sleep(100);
      const document = await vscode.workspace.openTextDocument(fileUri);
      consoleColorLog("set up 3", consoleLogColor);

      await sleep(100);

      editor = await vscode.window.showTextDocument(document);
      consoleColorLog("set up 4", consoleLogColor);
    });
    //ANCHOR test
    test(`Completion Items are Provided from ${
      testFileLocationAndExpectedLabel.location.split("/").slice(-1)[0]
    }`, async function () {
      const completionList =
        await vscode.commands.executeCommand<vscode.CompletionList>(
          "vscode.executeCompletionItemProvider",
          editor.document.uri,
          new vscode.Position(0, 0)
        );
      // consoleColorLog(`editor is ${JSON.stringify(editor)}`, consoleLogColor);

      consoleColorLog(
        `completionList is [${completionList.items.map((item) => item.label)}]`,
        consoleLogColor
      );

      assert.strictEqual(
        completionList.items.length,
        testFileLocationAndExpectedLabel.items.length
      );
      zip2([
        completionList.items,
        testFileLocationAndExpectedLabel.items,
      ]).forEach(([completionItem, expectedLabel]) => {
        assert.strictEqual(completionItem.label, expectedLabel);
        assert.strictEqual(
          completionItem.kind,
          vscode.CompletionItemKind.Variable
        );
        assert.strictEqual(completionItem.detail, "../../views.py");
        resolve(consoleColorLog("all tests are done"));
      });
    });
    teardown(async function () {
      vscode.window.showInformationMessage("End test.");
      await vscode.commands.executeCommand("vscode.setEditorLayout", {
        groups: [{}, {}],
        orientation: 0,
      });
      await vscode.commands.executeCommand("workbench.action.closeAllEditors");
    });
  });
