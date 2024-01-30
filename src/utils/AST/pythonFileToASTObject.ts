import { execSync } from "child_process";
import type { Module } from "../../types/AST";

export const viewsPyToASTObject = (appPath: string): Module => {
  const commandPy = `import ast, json; ast_to_json = lambda node: {field: ast_to_json(getattr(node, field)) for field in node._fields} | {'nodeType': type(node).__name__} if isinstance(node, ast.AST) else [ast_to_json(item) for item in node] if isinstance(node, list) else node; print(json.dumps(ast_to_json(ast.parse(open(r'${appPath}/views.py').read()))))`;

  const command = `python3 -c "${commandPy}"`;

  return JSON.parse(
    execSync(command, {
      encoding: "utf-8",
    })
  );
};
