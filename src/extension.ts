import * as vscode from "vscode";
import fs from "fs";
import { execSync } from "child_process";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "extension-exercise" is now active!'
  );

  let disposable = vscode.commands.registerCommand(
    "extension-exercise.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from extension-exercise!"
      );
    }
  );

  let disposable2 = vscode.commands.registerCommand(
    "extension-exercise.2",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor === undefined) {
        return;
      }
      const document = editor.document;
      const selection = editor.selection;
      let text = document.getText(selection);
      console.log(text);
      // vscode.window.showInformationMessage(text);s
    }
  );

  let disposable3 = vscode.commands.registerCommand(
    "extension-exercise.0",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor === undefined) {
        return;
      }
      const pathArray = editor.document.uri.path.split("/");

      const viewsStr = fs.readFileSync(
        pathArray
          .slice(
            0,
            pathArray.findIndex((t) => t === "templates")
          )
          .join("/") + "/views.py",
        "utf-8"
      );

      const targetFn = viewsStr
        .split("def")
        .filter((fn) =>
          fn.includes(
            pathArray
              .slice(pathArray.findIndex((t) => t === "templates") + 1)
              .join("/")
          )
        )[0];

      const context = targetFn.split(",");

      const context2 = context[context.length - 1].split(")")[0];

      console.log(context2.length);
      console.log(
        targetFn
          .split(context2)[1]
          .split("{")[1]
          .split("}\n")[0]
          .split(":")
          .map((a) => a.split(",")[a.split(",").length - 1])
      );
      // console.log(a.slice(a.findIndex((t) => t === "templates") + 1).join("/"));
    }
  );

  let disposable4 = vscode.commands.registerCommand(
    "extension-exercise.3",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor === undefined) {
        return;
      }

      const pathArray = editor.document.uri.path.split("/");

      const filePath =
        pathArray
          .slice(
            0,
            pathArray.findIndex((t) => t === "templates")
          )
          .join("/") + "/views.py";
      const targetFileStr = fs.readFileSync(
        pathArray
          .slice(
            0,
            pathArray.findIndex((t) => t === "templates")
          )
          .join("/") + "/views.py",
        "utf-8"
      );
      const targetFn = `def${
        targetFileStr
          .split("def")
          .filter((fn) =>
            fn.includes(
              pathArray
                .slice(pathArray.findIndex((t) => t === "templates") + 1)
                .join("/")
            )
          )[0]
      }`;
      function extractPythonVariableValueFromCode(
        pythonCode: string,
        variableName: string
      ) {
        try {
          // Pythonコードを実行して変数の値を取得
          const command = `python3 -c "exec(${pythonCode}); print(eval('${variableName}'))"`;
          console.log(command);
          const variableValue = execSync(command, { encoding: "utf-8" });

          return variableValue.trim();
        } catch (error) {
          console.error("Error extracting variable value:", error);
          return null;
        }
      }

      // 例として、Pythonコードを含む文字列と変数 'myVar' の値を抽出
      const pythonCodeString = `
data = {
    "name": "Alice",
    "weather": "CLOUDY",
    "weather_detail": [\"Temperature: 23℃\", \"Humidity: 40%\", \"wind: 5m/s\"],
    "isGreatFortune": fortune == 0,
    "fortune": ["Great Fortune", "Small Fortune", "Bad Fortune..."][fortune],
}
return render(request, "blog/hello.html", data)
`;

      const variableName = "myVar";
      const extractedValue = extractPythonVariableValueFromCode(
        pythonCodeString,
        variableName
      );

      console.log(`Value of ${variableName}:`, extractedValue);

      // console.log(targetFn);
      // const variableName = "context";

      // try {
      //   // Pythonスクリプトを実行して変数の値を取得
      //   const command = `python3 -c "import sys; exec(open('${filePath}').read()); print(eval('${variableName}'))"`;
      //   const variableValue = execSync(command, { encoding: "utf-8" });

      //   return variableValue.trim();
      // } catch (error) {
      //   console.error("Error extracting variable value:", error);
      // }
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable3);
  context.subscriptions.push(disposable4);
}

export function deactivate() {}
