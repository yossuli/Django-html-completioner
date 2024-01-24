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

  const onDidOpenTextDocument = vscode.workspace.onDidOpenTextDocument((e) => {
    if (e.languageId === "django-html") {
      vscode.window.showInformationMessage(
        "django-htmlファイルが開かれました!"
      );
    }
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(onDidOpenTextDocument);

  context.subscriptions.push(djangoHTMLCompletionItemProvider);
}

export function deactivate() {}
