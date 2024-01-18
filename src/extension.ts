import * as vscode from "vscode";
import { findTemplateNameFromModule } from "./utils/@djangoHtmlCompletion/findTemplateNameFromModule";
import { viewsPyToASTObject } from "./utils/@djangoHtmlCompletion/pythonFileToASTObject";

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

  const provider1 = vscode.languages.registerCompletionItemProvider(
    ["django-html"],
    {
      provideCompletionItems() {
        const editor = vscode.window.activeTextEditor;
        if (editor === undefined) {
          return;
        }

        const pathArray = editor.document.uri.path.split("/");
        const appPath = pathArray.slice(0, -3).join("/");
        const templateName = pathArray.slice(-2).join("/");

        try {
          const astJSObject = viewsPyToASTObject(appPath);

          const variables = findTemplateNameFromModule(
            astJSObject,
            templateName
          ).variables;
          if (variables === null) return;

          console.log(
            `[info - ${new Date().toLocaleTimeString()}] this html file get variables : [${variables}]`
          );
          return variables.map((a) => {
            const newCompletionItem = new vscode.CompletionItem(
              a,
              vscode.CompletionItemKind.Variable
            );
            newCompletionItem.detail = "../../views.py";
            return newCompletionItem;
          });
        } catch (error) {
          console.error("Error extracting variable value:", error);
        }
      },
    }
  );

  context.subscriptions.push(provider1);
}

export function deactivate() {}
