import * as assert from "assert";
import * as sinon from "sinon";
import * as vscode from "vscode";
import type {
  ConsoleLogColor,
  PopupMassageItemsTestCases,
} from "../../../types/types";
import { consoleColorLog } from "../../../utils/consoleColorLog";
import { sleep } from "../../../utils/sleep";
import { cleanupVscode } from "../cleanupVscode";
import { setupEditor } from "../setupEditor";

export const popupMessageTestInVscode = (a: PopupMassageItemsTestCases) => {
  vscode.window.showInformationMessage("Start test.");
  let editor: vscode.TextEditor;
  let showWarningMessageSpy: sinon.SinonSpy;
  let showInformationMessageSpy: sinon.SinonSpy;
  const consoleLogColor: ConsoleLogColor = "magenta";
  // ANCHOR setup
  setup(async () => {
    editor = await setupEditor(a.location);
    await sleep(100);

    showWarningMessageSpy = sinon.spy(vscode.window, "showWarningMessage");
    showInformationMessageSpy = sinon.spy(
      vscode.window,
      "showInformationMessage"
    );
    await sleep(100);

    consoleColorLog("End setup.", consoleLogColor);
  });
  const fileName = a.location.split("/").slice(-1)[0];
  //ANCHOR test
  test(`Popup Message in ${fileName}`, async function () {
    consoleColorLog("execute command", consoleLogColor);

    vscode.commands.executeCommand(
      "extension-exercise.checkRendering",
      editor.document.uri
    );
    // vscode.window.showWarningMessage("dummy message");

    await sleep(1000);
    assert.strictEqual(showWarningMessageSpy.callCount > 0, !a.isCalled);
    assert.strictEqual(showInformationMessageSpy.callCount > 0, a.isCalled);
    if (a.isCalled) {
      assert.strictEqual(
        showInformationMessageSpy.getCall(0).args[0],
        `'${fileName}'はviews.pyで呼び出されています`
      );
    } else {
      assert.strictEqual(
        showWarningMessageSpy.getCall(0).args[0],
        `'${fileName}'はviews.pyで呼び出されていない可能性があります`
      );
    }
    await sleep(1000);
  });
  teardown(cleanupVscode);
  teardown(() => {
    // スタブをリセット
    showWarningMessageSpy.restore();
    showInformationMessageSpy.restore();
    consoleColorLog("stubs reset", consoleLogColor);
  });
};
