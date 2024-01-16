import { execSync } from "child_process";
import * as vscode from "vscode";
import type {
  AsyncFor,
  AsyncFunctionDef,
  AsyncWith,
  Call,
  ClassDef,
  For,
  FunctionDef,
  If,
  Module,
  Try,
  TryStar,
  While,
  With,
  stmt,
} from "../types/AST";
import type { Variable } from "../types/types";

export function activate(context: vscode.ExtensionContext) {
  const provider1 = vscode.languages.registerCompletionItemProvider(
    ["django-html"],
    {
      provideCompletionItems(document: vscode.TextDocument) {
        // console.log(document.languageId);
        // console.log(document.uri);
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
                b.targets.some(
                  (c) => c.nodeType === "Name" && c.id === variable.id
                )
              ) {
                return {
                  ...variable,
                  variables: b.value.keys.map((d) =>
                    "value" in d ? String(d.value) : ""
                  ),
                };
              }
            }
            return null;
          };

          const findThisFilePathFromModule = (ast: Module): Variable => {
            for (const a of ast.body) {
              const variable = findThisFilePathFromStmt(a);
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

          const findThisFilePathLoopBody = (
            ast:
              | FunctionDef
              | AsyncFunctionDef
              | ClassDef
              | For
              | AsyncFor
              | While
              | If
              | With
              | AsyncWith
              | Try
              | TryStar
          ): Variable | null => {
            for (const a of ast.body) {
              const variable = findThisFilePathFromStmt(a);
              if (variable.id !== null) {
                if (variable.variables !== null) {
                  return variable;
                }
                const newVariable = findVariable(ast.body, variable);
                if (newVariable !== null) return newVariable;
              }
            }
            return null;
          };

          const isRender = (call: Call): boolean =>
            call.func.nodeType === "Name" && call.func.id === "render";

          const isInThisFilePath = (call: Call): boolean =>
            call.args[1].nodeType === "Constant" &&
            call.args[1].value === thisFilePath;

          const isInThisFilePathFromCall = (
            astValue: Call
          ): Variable | null => {
            if (
              isInThisFilePath(astValue) &&
              astValue.args[2].nodeType === "Name"
            ) {
              return { id: astValue.args[2].id, variables: null };
            }
            return null;
          };

          const findThisFilePathAfterLoopBody = (
            ast: stmt
          ): Variable | null => {
            if (
              ast.nodeType === "Return" &&
              ast.value?.nodeType === "Call" &&
              isRender(ast.value)
            ) {
              const isInThisFilePathFromCallReturn = isInThisFilePathFromCall(
                ast.value
              );
              if (isInThisFilePathFromCallReturn !== undefined) {
                return isInThisFilePathFromCallReturn;
              }
            }
            return null;
          };

          const findThisFilePathFromStmt = (ast: stmt): Variable => {
            if ("body" in ast) {
              const findThisFilePathLoopBodyReturn =
                findThisFilePathLoopBody(ast);
              if (findThisFilePathLoopBodyReturn !== null) {
                return findThisFilePathLoopBodyReturn;
              }
            }

            const findThisFilePathAfterLoopBodyReturn =
              findThisFilePathAfterLoopBody(ast);

            if (findThisFilePathAfterLoopBodyReturn !== null) {
              return findThisFilePathAfterLoopBodyReturn;
            }

            return { id: null, variables: null };
          };

          const variables = findThisFilePathFromModule(astJSObject).variables;
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
