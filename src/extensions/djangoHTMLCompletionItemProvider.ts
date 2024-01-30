import path from "path";
import * as vscode from "vscode";
import { findTemplateNameFromModule } from "../utils/AST/fromModule";
import { viewsPyToASTObject } from "../utils/AST/pythonFileToASTObject";

export const djangoHTMLCompletionItemProvider =
  vscode.languages.registerCompletionItemProvider(["django-html"], {
    provideCompletionItems() {
      const editor = vscode.window.activeTextEditor;
      if (editor === undefined) {
        return;
      }

      const filePath = editor.document.uri.fsPath;
      const appPath = path.resolve(filePath, "../../../");
      const templateName = `${path.basename(
        path.dirname(path.normalize(filePath))
      )}/${path.basename(filePath)}`;

      try {
        const astJSObject = viewsPyToASTObject(appPath);

        const variables = findTemplateNameFromModule(
          astJSObject,
          templateName
        ).variables;
        if (variables === null) return;

        console.log(
          `[info - ${new Date().toLocaleTimeString()}] ${templateName} get variables : [${variables}]`
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
  });
