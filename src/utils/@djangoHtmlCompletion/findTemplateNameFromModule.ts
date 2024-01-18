import type { Module } from "../../types/AST";
import type { RenderContext } from "../../types/types";
import { findTemplateNameFromStmt } from "./findTemplateNameFromStmt";
import { findContext } from "./findcontext";

export const findTemplateNameFromModule = (
  ast: Module,
  templateName: string
): RenderContext => {
  for (const a of ast.body) {
    const variable = findTemplateNameFromStmt(a, templateName);
    if (variable.id !== null) {
      if (variable.variables !== null) {
        return variable;
      }
      const newVariable = findContext(ast.body, variable);
      if (newVariable !== null) return newVariable;
    }
  }
  return { id: null, variables: null };
};
