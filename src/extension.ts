/* eslint-disable @typescript-eslint/no-explicit-any */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import * as vscode from "vscode";
import type { Module, stmt } from "./type";
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
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor === undefined) {
        return;
      }
      const document = editor.document;
      // const selection = editor.selection;
      // const text = document.getText(selection);
      // console.log(text);
      const pathArray = document.uri.path.split("/");
      const appPath = pathArray
        .map((_, i) => pathArray.slice(0, pathArray.length - i).join("/"))
        .find((path) => {
          console.log(path);
          try {
            fs.statSync(`${path}/views.py`);
            return true;
          } catch {
            return false;
          }
        });
      console.log(appPath);
      if (appPath === undefined) return;
      console.log(pathArray.slice(0, -1).join("/"), appPath);
      const relativeRootPath = path.relative(
        pathArray.slice(0, -1).join("/"),
        appPath
      );
      console.log(relativeRootPath);
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);

  const provider1 = vscode.languages.registerCompletionItemProvider(
    "django-html",
    {
      provideCompletionItems() {
        const editor = vscode.window.activeTextEditor;
        if (editor === undefined) {
          return;
        }

        const pathArray = editor.document.uri.path.split("/");
        const appPath = pathArray.slice(0, -3).join("/");
        const thisFilePath = pathArray.slice(-2).join("/");

        try {
          const commandRows = [
            `import ast`,
            `import json`,
            `def ast_to_json(node):`,
            `    if isinstance(node, ast.AST):`,
            `        field = {`,
            `            field: ast_to_json(getattr(node, field)) for field in node._fields`,
            `        }`,
            `        field["nodeType"] = type(node).__name__`,
            `        return field`,
            `    elif isinstance(node, list):`,
            `        return [ast_to_json(item) for item in node]`,
            `    else:`,
            `        return node`,
            `print(json.dumps(ast_to_json(ast.parse(open("${appPath}/views.py").read()))))`,
          ];
          const command = `python3 -c '${commandRows.join("\n")}'`;

          type Variable = { id: string | null; variables: string[] | null };
          const astJSObject: Module = JSON.parse(
            execSync(command, {
              encoding: "utf-8",
            })
          );
          const findThisFilePath = (ast: stmt | Module): Variable => {
            if ("body" in ast) {
              for (const a of ast.body) {
                const variable = findThisFilePath(a);
                if (variable.id !== null) {
                  if (variable.variables !== null) {
                    return variable;
                  }
                  for (const b of ast.body) {
                    if (
                      "targets" in b &&
                      "value" in b &&
                      "keys" in b.value &&
                      b.targets.some((c: any) => c.id === variable.id)
                    ) {
                      console.log(b.value);
                      return {
                        ...variable,
                        variables: b.value.keys.map((d: any) => d.value),
                      };
                    }
                  }
                }
              }
            }
            if (
              ast?.nodeType === "Return" &&
              ast.value &&
              "func" in ast.value &&
              "id" in ast.value.func &&
              ast.value.func.id === "render"
            ) {
              console.log(ast.value.args[1]);
              if (
                "value" in ast.value.args[1] &&
                "id" in ast.value.args[2] &&
                ast.value.args[1].value === thisFilePath
              ) {
                return { id: ast.value.args[2].id, variables: null };
              }
            }
            return { id: null, variables: null };
          };

          const variables = findThisFilePath(astJSObject).variables;
          console.log(
            `[info - ${Date()}] this html file get variables : [${variables}]`
          );
          if (variables === null) return;

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
