import { execSync } from "child_process";
import type { Module } from "../../types/AST";

export const viewsPyToASTObject = (appPath: string): Module => {
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
    `print(json.dumps(ast_to_json(ast.parse(open('${appPath}/views.py').read()))))`,
  ];
  const command = `python3 -c "${commandRows.join("\n")}"`;

  return JSON.parse(
    execSync(command, {
      encoding: "utf-8",
    })
  );
};
