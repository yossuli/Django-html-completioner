import type { HaveBody, RenderContext } from "../../types/types";
import { findContext } from "./findContext";
import { findTemplateNameFromStmt } from "./fromStmt";

export const findTemplateNameLoopBody = (
  ast: HaveBody,
  templateName: string
): RenderContext | null => {
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
  return null;
};
