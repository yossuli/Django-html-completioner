import type { Call } from "../../types/AST";
import type { RenderContext } from "../../types/types";

export const isRender = (call: Call): boolean =>
  call.func.nodeType === "Name" && call.func.id === "render";

export const isInTemplateName = (call: Call, templateName: string): boolean =>
  call.args[1].nodeType === "Constant" && call.args[1].value === templateName;

export const isInTemplateNameFromCall = (
  astValue: Call,
  templateName: string
): RenderContext | null => {
  if (
    isInTemplateName(astValue, templateName) &&
    astValue.args.length > 2 &&
    astValue.args[2].nodeType === "Name"
  ) {
    return { id: astValue.args[2].id, variables: null };
  }
  return null;
};
