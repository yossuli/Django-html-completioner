import * as assert from "assert";
import * as vscode from "vscode";
import type { TestFileLocationAndExpectedItems } from "../../../types/types";
import { consoleColorLog } from "../../../utils/consoleColorLog";
import { zip2 } from "../../../utils/zip";
import { cleanupVscode } from "../cleanupVscode";
import { setupEditor } from "../setupEditor";

export const completionItemsTestInVscode = (
  testFileLocationAndExpectedLabel: TestFileLocationAndExpectedItems
) => {
  vscode.window.showInformationMessage("Start test.");
  let editor: vscode.TextEditor;
  const consoleLogColor = testFileLocationAndExpectedLabel.color;
  // ANCHOR setup
  setup(async () => {
    editor = await setupEditor(
      consoleLogColor,
      testFileLocationAndExpectedLabel.location
    );
    consoleColorLog("End setup.", consoleLogColor);
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
    });
  });
  teardown(cleanupVscode);
};
