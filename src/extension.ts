import * as vscode from "vscode";
import { checkRenderingCommand } from "./extensions/checkRenderingCommand";
import { djangoHTMLCompletionItemProvider } from "./extensions/djangoHTMLCompletionItemProvider";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "Django-html-completioner" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    "Django-html-completioner.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from Django-html-completioner!"
      );
    }
  );

  const onDidOpenTextDocument = vscode.window.onDidChangeActiveTextEditor(
    () => {
      vscode.commands.executeCommand("Django-html-completioner.checkRendering");
    }
  );

  context.subscriptions.push(checkRenderingCommand);
  context.subscriptions.push(onDidOpenTextDocument);

  context.subscriptions.push(disposable);

  context.subscriptions.push(djangoHTMLCompletionItemProvider);
}

export function deactivate() {}
