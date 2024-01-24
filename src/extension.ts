import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { djangoHTMLCompletionItemProvider } from "./extensions/djangoHTMLCompletionItemProvider";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "extension-exercise" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    "extension-exercise.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from extension-exercise!"
      );
    }
  );

  // extension.ts

  // export function activate(context: vscode.ExtensionContext) {
  const onDidOpenTextDocument = vscode.workspace.onDidOpenTextDocument((e) => {
    if (e.languageId === "django-html") {
      const pathArray = e.uri.path.split("/");
      const appPath = pathArray.slice(0, -3).join("/");
      const viewsPath = path.join(appPath, "views.py");

      // views.pyを読み込みます。
      fs.readFile(viewsPath, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const templateName = path.basename(e.fileName, ".html");

        const openFileCommandUri = vscode.Uri.parse(
          `command:vscode.open?${encodeURIComponent(
            JSON.stringify([vscode.Uri.file(viewsPath)])
          )}`
        );

        const recheckCommandUri = vscode.Uri.parse(
          `command:extension.recheckRender?${encodeURIComponent(
            JSON.stringify([viewsPath])
          )}`
        );

        vscode.window.showWarningMessage(
          `'${templateName}.html'はviews.pyに存在${
            !data.match(`${templateName}.html`)
              ? "しない可能性があります"
              : "します"
          }`
        );
      });
    }
  });

  context.subscriptions.push(onDidOpenTextDocument);

  context.subscriptions.push(disposable);

  context.subscriptions.push(djangoHTMLCompletionItemProvider);
}

export function deactivate() {}
