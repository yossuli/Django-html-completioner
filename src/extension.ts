/* eslint-disable @typescript-eslint/no-explicit-any */
import { execSync } from "child_process";
import * as vscode from "vscode";
import type { Call, Module, stmt } from "./types/AST";

type Variable = { id: string | null; variables: string[] | null };

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

        const astJSObject: Module = JSON.parse(
          execSync(command, {
            encoding: "utf-8",
          })
        );

        const findVariable = (
          body: stmt[],
          variable: Variable
        ): Variable | null => {
          for (const b of body) {
            if (
              b.nodeType === "Assign" &&
              b.value.nodeType === "Dict" &&
              b.targets.some((c: any) => c.id === variable.id)
            ) {
              return {
                ...variable,
                variables: b.value.keys.map((d: any) => d.value),
              };
            }
          }
          return null;
        };

        const findThisFilePath = (ast: Module): Variable => {
          for (const a of ast.body) {
            const variable = findThisFilePath2(a);
            if (variable.id !== null) {
              if (variable.variables !== null) {
                return variable;
              }
              const newVariable = findVariable(ast.body, variable);
              if (newVariable !== null) return newVariable;
            }
          }
          return { id: null, variables: null };
        };
        const findThisFilePath2 = (ast: stmt): Variable => {
          if ("body" in ast) {
            for (const a of ast.body) {
              const variable = findThisFilePath2(a);
              if (variable.id !== null) {
                if (variable.variables !== null) {
                  return variable;
                }
                const newVariable = findVariable(ast.body, variable);
                if (newVariable !== null) return newVariable;
              }
            }
          }
          const isRender = (call: Call): boolean =>
            call.func.nodeType === "Name" && call.func.id === "render";
          if (
            ast.nodeType === "Return" &&
            ast.value?.nodeType === "Call" &&
            isRender(ast.value)
          ) {
            const isInThisFilePath = (call: Call): boolean =>
              call.args[1].nodeType === "Constant" &&
              call.args[1].value === thisFilePath;
            if (
              isInThisFilePath(ast.value) &&
              ast.value.args[2].nodeType === "Name"
            ) {
              return { id: ast.value.args[2].id, variables: null };
            }
          }
          return { id: null, variables: null };
        };

        const variables = findThisFilePath(astJSObject).variables;
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
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);

  const provider1 = vscode.languages.registerCompletionItemProvider(
    ["django-html", "html"],
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
      ) {
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

          const astJSObject: Module = JSON.parse(
            execSync(command, {
              encoding: "utf-8",
            })
          );

          const findVariable = (
            body: stmt[],
            variable: Variable
          ): Variable | null => {
            for (const b of body) {
              if (
                b.nodeType === "Assign" &&
                b.value.nodeType === "Dict" &&
                b.targets.some((c: any) => c.id === variable.id)
              ) {
                return {
                  ...variable,
                  variables: b.value.keys.map((d: any) => d.value),
                };
              }
            }
            return null;
          };

          const findThisFilePath = (ast: Module): Variable => {
            for (const a of ast.body) {
              const variable = findThisFilePath2(a);
              if (variable.id !== null) {
                if (variable.variables !== null) {
                  return variable;
                }
                const newVariable = findVariable(ast.body, variable);
                if (newVariable !== null) return newVariable;
              }
            }
            return { id: null, variables: null };
          };
          const findThisFilePath2 = (ast: stmt): Variable => {
            if ("body" in ast) {
              for (const a of ast.body) {
                const variable = findThisFilePath2(a);
                if (variable.id !== null) {
                  if (variable.variables !== null) {
                    return variable;
                  }
                  const newVariable = findVariable(ast.body, variable);
                  if (newVariable !== null) return newVariable;
                }
              }
            }
            const isRender = (call: Call): boolean =>
              call.func.nodeType === "Name" && call.func.id === "render";
            if (
              ast.nodeType === "Return" &&
              ast.value?.nodeType === "Call" &&
              isRender(ast.value)
            ) {
              const isInThisFilePath = (call: Call): boolean =>
                call.args[1].nodeType === "Constant" &&
                call.args[1].value === thisFilePath;
              if (
                isInThisFilePath(ast.value) &&
                ast.value.args[2].nodeType === "Name"
              ) {
                return { id: ast.value.args[2].id, variables: null };
              }
            }
            return { id: null, variables: null };
          };

          const variables = findThisFilePath(astJSObject).variables;
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
