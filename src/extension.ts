import * as vscode from "vscode";
import { checkRenderingCommand } from "./extensions/checkRenderingCommand";
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

  const onDidOpenTextDocument = vscode.window.onDidChangeActiveTextEditor(
    () => {
      vscode.commands.executeCommand("extension-exercise.checkRendering");
    }
  );

  context.subscriptions.push(checkRenderingCommand);
  context.subscriptions.push(onDidOpenTextDocument);

  context.subscriptions.push(disposable);

  context.subscriptions.push(djangoHTMLCompletionItemProvider);
}

export function deactivate() {}
