import * as assert from "assert";
import path from "path";
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
  const consoleLogColor: ConsoleLogColor = "magenta";

  let editor: vscode.TextEditor;
  let showWarningMessageStub: sinon.SinonStub;
  let showInformationMessageSpy: sinon.SinonSpy;
  let openTextDocumentSpy: sinon.SinonSpy;
  let showTextDocumentSpy: sinon.SinonSpy;

  setup(async () => {
    showWarningMessageStub = sinon.stub(vscode.window, "showWarningMessage");
    showWarningMessageStub.returns(
      new Promise((resolve) => {
        resolve("views.pyを開く");
      })
    );
    showInformationMessageSpy = sinon.spy(
      vscode.window,
      "showInformationMessage"
    );
    openTextDocumentSpy = sinon.spy(vscode.workspace, "openTextDocument");
    showTextDocumentSpy = sinon.spy(vscode.window, "showTextDocument");
    await sleep(100);

    editor = await setupEditor(a.location);
    await sleep(100);

    consoleColorLog("End setup.", consoleLogColor);
  });
  const fileName = a.location.split("/").slice(-1)[0];

  //ANCHOR test
  test(`Popup Message in ${fileName}`, async function () {
    if (a.isCalled) {
      assert.ok(showWarningMessageStub.notCalled, "showWarningMessageStub");
      assert.ok(
        showInformationMessageSpy.calledOnce,
        "showInformationMessageSpy"
      );

      assert.strictEqual(
        showInformationMessageSpy.getCall(0).args[0],
        `'${fileName}'はviews.pyで呼び出されています`
      );
      assert.strictEqual(showInformationMessageSpy.getCall(0).args.length, 1);

      assert.ok(showTextDocumentSpy.calledOnce, "showTextDocumentSpy");
      assert.ok(openTextDocumentSpy.calledOnce, "openTextDocumentSpy");
    } else {
      assert.ok(showWarningMessageStub.calledOnce, "showWarningMessageStub");
      assert.ok(
        showInformationMessageSpy.notCalled,
        "showInformationMessageSpy"
      );

      assert.strictEqual(
        showWarningMessageStub.getCall(0).args[0],
        `'${fileName}'はviews.pyで呼び出されていない可能性があります`
      );
      assert.strictEqual(showWarningMessageStub.getCall(0).args.length, 3);

      assert.strictEqual(showTextDocumentSpy.callCount, 2);
      assert.strictEqual(
        openTextDocumentSpy.getCall(1).args[0],
        path.resolve(
          path.join(
            path.resolve(__dirname, "../../../../test-workspace"),
            a.location
          ),
          "../../../views.py"
        )
      );
      assert.strictEqual(openTextDocumentSpy.callCount, 2);
    }
    await sleep(100);
  });
  teardown(cleanupVscode);
  teardown(() => {
    showWarningMessageStub.restore();
    showInformationMessageSpy.restore();
    openTextDocumentSpy.restore();
    showTextDocumentSpy.restore();
    consoleColorLog("stubs reset");
  });
};
