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

  const disposable2 = vscode.commands.registerCommand(
    "extension-exercise.2",
    () => {}
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);

  context.subscriptions.push(djangoHTMLCompletionItemProvider);
}

export function deactivate() {}
