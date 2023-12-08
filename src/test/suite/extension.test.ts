import * as assert from "assert";
import { execSync } from "child_process";

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
    consoleColorLog(`2`, "cyan");
    function getWorkspaceStructureMessage(
      workspaceFolders: readonly vscode.WorkspaceFolder[]
    ) {
      let structureMessage = "ワークスペースのディレクトリ構造:";
      // consoleColorLog(
      //   `workspaceFolders${JSON.stringify(workspaceFolders)}`,'cyan'
      // );
      workspaceFolders.forEach((folder) => {
        structureMessage += `\n${folder.name}: ${folder.uri.fsPath}`;
      });

      return structureMessage;
    }

    // ワークスペースのディレクトリ構造を取得
    const structureMessage = getWorkspaceStructureMessage(
      vscode.workspace.workspaceFolders
    );

    // メッセージを表示
    consoleColorLog(`${structureMessage}`, "cyan");

    // open folder
    const fileUri = vscode.Uri.file(
      vscode.workspace.workspaceFolders[0].uri.fsPath + testFileLocation
    );
    consoleColorLog(`2.5`, "cyan");
    consoleColorLog(`fileUri is ${JSON.stringify(fileUri)}`, "cyan");
    console.log(execSync("ls"));
    await sleep(1000);
    const document = await vscode.workspace.openTextDocument(fileUri);
    consoleColorLog(`3`, "cyan");
    editor = await vscode.window.showTextDocument(document);
    consoleColorLog(`4`, "cyan");
  });

  test("Completion Items are Provided", async function () {
    consoleColorLog(`test start`, "cyan");
    // if (vscode.workspace.workspaceFolders === undefined) return;
    // const fileUri = vscode.Uri.file(
    //   vscode.workspace.workspaceFolders[0].uri.fsPath + testFileLocation
    // );
    // consoleColorLog(`fileUri is ${JSON.stringify(fileUri)}`,'cyan');
    // sleep(1000);

    // const testFileUri = vscode.Uri.file(
    //   path.join(
    //     __dirname.split("/").slice(0, -1).join("/"),
    //     `../../${testFileLocation}`
    //   )
    // );
    // consoleColorLog(`1`,'cyan');
    // consoleColorLog(`testFile uri is ${testFileUri}`,'cyan');
    // await sleep(1000);

    // const document = await vscode.workspace.openTextDocument(fileUri);
    // consoleColorLog(`2`,'cyan');
    // consoleColorLog(`document is ${document}`,'cyan');
    // await sleep(1000);

    // const editor = await vscode.window.showTextDocument(document);
    // consoleColorLog(`3`,'cyan');
    // await sleep(1000);

    // const completionList =
    //   await vscode.commands.executeCommand<vscode.CompletionList>(
    //     "vscode.executeCompletionItemProvider"
    //   );
    editor.selection = new vscode.Selection(
      new vscode.Position(0, 0),
      new vscode.Position(0, 0)
    );
    await vscode.commands.executeCommand("コピー");
    consoleColorLog(`4`, "cyan");
    // consoleColorLog(`completionList is ${completionList} `,'cyan');
    await sleep(1000);

    assert.strictEqual(await vscode.env.clipboard.readText(), "");

    // // Ensure that completion items are provided
    // assert.ok(completionList.items.length > 0);
    // const completionItem = completionList.items[0];
    // assert.strictEqual(completionItem.label, "test1");
    // assert.strictEqual(completionItem.kind, vscode.CompletionItemKind.Variable);
    // assert.strictEqual(completionItem.detail, "../../test.py");

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
