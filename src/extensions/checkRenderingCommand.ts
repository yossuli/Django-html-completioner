import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export const checkRenderingCommand = vscode.commands.registerCommand(
  "extension-exercise.checkRendering",
  () => {
    const e = vscode.window.activeTextEditor?.document;
    if (!e) return;
    if (e.languageId === "django-html") {
      const viewsPath = path.resolve(e.uri.fsPath, "../../../views.py");

      // views.pyを読み込みます。
      fs.readFile(viewsPath, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const templateName = path.basename(e.fileName, ".html");

        if (!data.match(`${templateName}.html`)) {
          vscode.window
            .showWarningMessage(
              `'${templateName}.html'はviews.pyで呼び出されていない可能性があります`,
              { modal: false },
              "views.pyを開く"
            )
            .then(async (selection) => {
              if (selection === "views.pyを開く") {
                // views.pyを開く処理
                const doc = await vscode.workspace.openTextDocument(viewsPath);
                vscode.window.showTextDocument(doc);
              }
            });
        } else {
          vscode.window.showInformationMessage(
            `'${templateName}.html'はviews.pyで呼び出されています`
          );
        }
      });
      return "extension-exercise.checkRendering";
    }
  }
);
