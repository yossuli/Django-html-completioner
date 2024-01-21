import * as assert from "assert";
import * as vscode from "vscode";
import type { ConsoleLogColor } from "../types/types";
import { consoleColorLog } from "../utils/consoleColorLog";

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const testFileLocationAndExpectedItems: {
  location: string;
  item: string;
  color: ConsoleLogColor;
}[] = [
  {
    location: "/djangoApp/templates/djangoApp/index.html",
    item: "test1",
    color: "green",
  },
  {
    location: "/djangoApp/templates/djangoApp/index2.html",
    item: "test2",
    color: "yellow",
  },
];

suite("Extension Test Suite", async () => {
  vscode.window.showInformationMessage("Start all tests.");
  const testProcess = (testCount: number): Promise<void> =>
    new Promise((resolve) => {
      let editorAndExpectedItem: {
        editor: vscode.TextEditor;
        item: string;
        path?: string;
      };
      console.log(`<<<${testCount}>>>`);
      // setup(async () => {});
      console.log(`<<<<${testCount}>>>>`);
      test(`Completion Items are Provided - ${testCount}`, async function () {
        consoleColorLog(`set up`, "cyan");
        if (vscode.workspace.workspaceFolders === undefined) {
          consoleColorLog(`workspace folders is undefined`, "cyan");
          assert.fail();
        }
        // for (const testFileLocationAndExpectedItem of testFileLocationAndExpectedItems) {
        const testFileLocationAndExpectedItem =
          testFileLocationAndExpectedItems[testCount];
        consoleColorLog("set up 1", testFileLocationAndExpectedItem.color);

        await sleep(1000);
        const filePath =
          vscode.workspace.workspaceFolders[0].uri.fsPath +
          testFileLocationAndExpectedItem.location;

        await sleep(1000);
        const fileUri = vscode.Uri.file(filePath);
        consoleColorLog("set up 2", testFileLocationAndExpectedItem.color);

        await sleep(1000);
        const document = await vscode.workspace.openTextDocument(fileUri);
        consoleColorLog("set up 3", testFileLocationAndExpectedItem.color);

        await sleep(1000);
        editorAndExpectedItem = {
          editor: await vscode.window.showTextDocument(document),
          item: testFileLocationAndExpectedItem.item,
          path: fileUri.path,
        };
        consoleColorLog("set up 4", testFileLocationAndExpectedItem.color);
        consoleColorLog(`editorAndExpectedItem is ${fileUri.path}`, "magenta");
        // }

        // for (const editorAndExpectedItem of editorAndExpectedItems) {
        // const editorAndExpectedItem = editorAndExpectedItem;

        consoleColorLog(
          `uri is ${editorAndExpectedItem.editor.document.uri}`,
          testFileLocationAndExpectedItems[testCount].color
        );
        const completionList =
          await vscode.commands.executeCommand<vscode.CompletionList>(
            "vscode.executeCompletionItemProvider",
            editorAndExpectedItem.editor.document.uri,
            new vscode.Position(0, 0)
          );

        consoleColorLog(
          `completionList is ${JSON.stringify(completionList)}`,
          testFileLocationAndExpectedItems[testCount].color
        );

        assert.ok(completionList.items.length > 0);
        const completionItem = completionList.items[0];
        assert.strictEqual(completionItem.label, editorAndExpectedItem.item);
        assert.strictEqual(
          completionItem.kind,
          vscode.CompletionItemKind.Variable
        );
        assert.strictEqual(completionItem.detail, "../../views.py");
        vscode.window.showInformationMessage("End tests.");
        await sleep(500);
        await vscode.commands.executeCommand(
          "workbench.action.closeActiveEditor"
        );
        // }
        await vscode.commands.executeCommand("vscode.setEditorLayout", {
          groups: [{}, {}],
          orientation: 0,
        });
        await vscode.commands.executeCommand(
          "workbench.action.closeAllEditors"
        );
      });
      console.log(`<<<<<${testCount}>>>>>`);
      resolve(console.log("End tests."));
      // teardown(async function () {
      // });
    });
  await testProcess(0);
  consoleColorLog("test1", "green");
  await testProcess(1);
  consoleColorLog("test2", "yellow");
});
