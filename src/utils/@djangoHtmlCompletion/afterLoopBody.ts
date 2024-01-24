import type { stmt } from "../../types/AST";
import type { RenderContext } from "../../types/types";
import { isInTemplateNameFromCall, isRender } from "./conditions";

export const findTemplateNameAfterLoopBody = (
  ast: stmt,
  templateName: string
): RenderContext | null => {
  if (
    ast.nodeType === "Return" &&
    ast.value?.nodeType === "Call" &&
    isRender(ast.value)
  ) {
    const isInThisFilePathFromCallReturn = isInTemplateNameFromCall(
      ast.value,
      templateName
    );
    if (isInThisFilePathFromCallReturn !== undefined) {
      return isInThisFilePathFromCallReturn;
    }
  }
  return null;
};
