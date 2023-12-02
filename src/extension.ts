/* eslint-disable @typescript-eslint/no-explicit-any */
import { execSync } from "child_process";
import * as vscode from "vscode";

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
      const selection = editor.selection;
      const text = document.getText(selection);
      console.log(text);
      // vscode.window.showInformationMessage(text);
    }
  );

  const disposable3 = vscode.commands.registerCommand(
    "extension-exercise.3",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor === undefined) {
        return;
      }

      const pathArray = editor.document.uri.path.split("/");

      const viewsPyPath = `${pathArray
        .slice(
          0,
          pathArray.findIndex((t) => t === "templates")
        )
        .join("/")}/views.py`;
      const thisFilePath = pathArray
        .slice(
          pathArray.findIndex((t) => t === "templates") + 1,
          pathArray.length
        )
        .join("/");

      try {
        console.log(thisFilePath);
        const command = `python3 -c 'import ast\nimport json\ndef ast_to_json(node):\n    if isinstance(node, ast.AST):\n        field = {\n            field: ast_to_json(getattr(node, field)) for field in node._fields\n        }\n        field["type"] = type(node).__name__\n        return field\n    elif isinstance(node, list):\n        return [ast_to_json(item) for item in node]\n    else:\n        return node\nprint(json.dumps(ast_to_json(ast.parse(open("${viewsPyPath}").read()))))'`;

        type AST = any;
        // Record<string, Record<string, any>[]>;

        type Variable = { id: string | null; variables: string[] | null };
        const astJSObject: AST = JSON.parse(
          execSync(command, {
            encoding: "utf-8",
          })
        );
        const findThisFilePath = (ast: AST): Variable => {
          if ("body" in ast) {
            for (const a of ast["body"]) {
              const variable = findThisFilePath(a);
              if (variable.id !== null) {
                if (variable.variables !== null) {
                  return variable;
                }
                for (const b of ast["body"]) {
                  if (
                    "targets" in b &&
                    (b["targets"] as any[]).some(
                      (c: any) => c["id"] === variable.id
                    )
                  ) {
                    return {
                      ...variable,
                      variables: b["value"]["keys"].map((d: any) => d["value"]),
                    };
                  }
                }
              }
            }
          }
          if (
            ast?.type === "Return" &&
            ast["value"]["func"]["id"] === "render"
          ) {
            if (ast["value"]["args"][1]["value"] === thisFilePath) {
              return { id: ast["value"]["args"][2]["id"], variables: null };
            }
          }
          return { id: null, variables: null };
        };

        console.log(findThisFilePath(astJSObject).variables);
      } catch (error) {
        console.error("Error extracting variable value:", error);
      }
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);
  context.subscriptions.push(disposable3);

  const provider1 = vscode.languages.registerCompletionItemProvider("html", {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken,
      context: vscode.CompletionContext
    ) {
      const editor = vscode.window.activeTextEditor;
      if (editor === undefined) {
        return;
      }

      const pathArray = editor.document.uri.path.split("/");

      const viewsPyPath = `${pathArray
        .slice(
          0,
          pathArray.findIndex((t) => t === "templates")
        )
        .join("/")}/views.py`;
      const thisFilePath = pathArray
        .slice(
          pathArray.findIndex((t) => t === "templates") + 1,
          pathArray.length
        )
        .join("/");

      try {
        console.log(thisFilePath);
        const command = `python3 -c 'import ast\nimport json\ndef ast_to_json(node):\n    if isinstance(node, ast.AST):\n        field = {\n            field: ast_to_json(getattr(node, field)) for field in node._fields\n        }\n        field["type"] = type(node).__name__\n        return field\n    elif isinstance(node, list):\n        return [ast_to_json(item) for item in node]\n    else:\n        return node\nprint(json.dumps(ast_to_json(ast.parse(open("${viewsPyPath}").read()))))'`;

        type AST = any;
        // Record<string, Record<string, any>[]>;

        type Variable = { id: string | null; variables: string[] | null };
        const astJSObject: AST = JSON.parse(
          execSync(command, {
            encoding: "utf-8",
          })
        );
        const findThisFilePath = (ast: AST): Variable => {
          if ("body" in ast) {
            for (const a of ast["body"]) {
              const variable = findThisFilePath(a);
              if (variable.id !== null) {
                if (variable.variables !== null) {
                  return variable;
                }
                for (const b of ast["body"]) {
                  if (
                    "targets" in b &&
                    (b["targets"] as any[]).some(
                      (c: any) => c["id"] === variable.id
                    )
                  ) {
                    return {
                      ...variable,
                      variables: b["value"]["keys"].map((d: any) => d["value"]),
                    };
                  }
                }
              }
            }
          }
          if (
            ast?.type === "Return" &&
            ast["value"]["func"]["id"] === "render"
          ) {
            if (ast["value"]["args"][1]["value"] === thisFilePath) {
              return { id: ast["value"]["args"][2]["id"], variables: null };
            }
          }
          return { id: null, variables: null };
        };

        const variables = findThisFilePath(astJSObject).variables;
        console.log(variables);
        if (variables === null) return;

        return variables.map((a) => {
          const commandCompletion = new vscode.CompletionItem(
            a,
            vscode.CompletionItemKind.Method
          );
          commandCompletion.kind = vscode.CompletionItemKind.Keyword;
          commandCompletion.insertText = "new ";
          commandCompletion.command = {
            command: "editor.action.triggerSuggest",
            title: "Re-trigger completions...",
          };
          return commandCompletion;
        });
      } catch (error) {
        console.error("Error extracting variable value:", error);
      }
    },
  });
  const provider2 = vscode.languages.registerCompletionItemProvider(
    "plaintext",
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
      ) {
        // a simple completion item which inserts `Hello World!`
        const simpleCompletion = new vscode.CompletionItem("Hello World!");

        // a completion item that inserts its text as snippet,
        // the `insertText`-property is a `SnippetString` which will be
        // honored by the editor.
        const snippetCompletion = new vscode.CompletionItem(
          "Good part of the day"
        );
        snippetCompletion.insertText = new vscode.SnippetString(
          "Good ${1|morning,afternoon,evening|}. It is ${1}, right?"
        );
        snippetCompletion.documentation = new vscode.MarkdownString(
          "Inserts a snippet that lets you select the _appropriate_ part of the day for your greeting."
        );

        // a completion item that can be accepted by a commit character,
        // the `commitCharacters`-property is set which means that the completion will
        // be inserted and then the character will be typed.
        const commitCharacterCompletion = new vscode.CompletionItem("console");
        commitCharacterCompletion.commitCharacters = ["."];
        commitCharacterCompletion.documentation = new vscode.MarkdownString(
          "Press `.` to get `console.`"
        );

        // a completion item that retriggers IntelliSense when being accepted,
        // the `command`-property is set which the editor will execute after
        // completion has been inserted. Also, the `insertText` is set so that
        // a space is inserted after `new`
        const commandCompletion = new vscode.CompletionItem("new");
        commandCompletion.kind = vscode.CompletionItemKind.Keyword;
        commandCompletion.insertText = "new ";
        commandCompletion.command = {
          command: "editor.action.triggerSuggest",
          title: "Re-trigger completions...",
        };

        // return all completion items as array
        return [
          simpleCompletion,
          snippetCompletion,
          commitCharacterCompletion,
          commandCompletion,
        ];
      },
    }
  );
  context.subscriptions.push(provider1, provider2);
}

export function deactivate() {}
