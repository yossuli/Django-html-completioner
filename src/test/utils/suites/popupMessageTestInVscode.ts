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
  // let showWarningMessageStub: sinon.SinonStub;
  let showTextDocumentStub: sinon.SinonStub;
  let openTextDocumentStub: sinon.SinonStub;
  const consoleLogColor: ConsoleLogColor = "magenta";
  // ANCHOR setup
  setup(async () => {
    showWarningMessageSpy = sinon.spy(vscode.window, "showWarningMessage");
    showInformationMessageSpy = sinon.spy(
      vscode.window,
      "showInformationMessage"
    );
    // showWarningMessageStub = sinon.stub(vscode.window, "showWarningMessage");
    await sleep(100);

    editor = await setupEditor(a.location);
    await sleep(100);

    openTextDocumentStub = sinon.stub(vscode.workspace, "openTextDocument");
    showTextDocumentStub = sinon.stub(vscode.window, "showTextDocument");
    await sleep(100);

    consoleColorLog("End setup.", consoleLogColor);
  });
  const fileName = a.location.split("/").slice(-1)[0];
  //ANCHOR test
  test(`Popup Message in ${fileName}`, async function () {
    consoleColorLog("execute command", consoleLogColor);

    await sleep(1000);
    assert.strictEqual(
      showWarningMessageSpy.callCount,
      a.isCalled ? 0 : 1,
      "showWarningMessageSpy"
    );
    // assert.strictEqual(showWarningMessageStub.callCount , a.isCalled ? 0 : 1,'showWarningMessageStub');
    assert.strictEqual(
      showInformationMessageSpy.callCount,
      !a.isCalled ? 0 : 1,
      "showInformationMessageSpy"
    );

    if (a.isCalled) {
      assert.strictEqual(
        showInformationMessageSpy.getCall(0).args[0],
        `'${fileName}'はviews.pyで呼び出されています`
      );
      assert.strictEqual(showInformationMessageSpy.getCall(0).args.length, 1);
    } //
    else {
      // assert.strictEqual(
      //   showWarningMessageStub.getCall(0).args[0],
      //   `'${fileName}'はviews.pyで呼び出されていない可能性があります`
      // );
      assert.strictEqual(
        showWarningMessageSpy.getCall(0).args[0],
        `'${fileName}'はviews.pyで呼び出されていない可能性があります`
      );
      // assert.strictEqual(showWarningMessageStub.getCall(0).args.length, 3);
      assert.strictEqual(showWarningMessageSpy.getCall(0).args.length, 3);
    }
    await sleep(100);
  });
  teardown(cleanupVscode);
  teardown(() => {
    // showWarningMessageStub.restore();
    showWarningMessageSpy.restore();
    showInformationMessageSpy.restore();
    showTextDocumentStub.restore();
    openTextDocumentStub.restore();
    consoleColorLog("stubs reset", consoleLogColor);
  });
};
