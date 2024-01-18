import type { stmt } from "../../types/AST";
import type { RenderContext } from "../../types/types";
import { findTemplateNameAfterLoopBody } from "./findTemplateNameAfterLoopBody";
import { findTemplateNameLoopBody } from "./findTemplateNameLoopBody";

export const findTemplateNameFromStmt = (
  ast: stmt,
  templateName: string
): RenderContext => {
  if ("body" in ast) {
    const findThisFilePathLoopBodyReturn = findTemplateNameLoopBody(
      ast,
      templateName
    );
    if (findThisFilePathLoopBodyReturn !== null) {
      return findThisFilePathLoopBodyReturn;
    }
  }

  const findThisFilePathAfterLoopBodyReturn = findTemplateNameAfterLoopBody(
    ast,
    templateName
  );

  if (findThisFilePathAfterLoopBodyReturn !== null) {
    return findThisFilePathAfterLoopBodyReturn;
  }

  return { id: null, variables: null };
};
