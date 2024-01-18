import type { stmt } from "../../types/AST";
import type { RenderContext } from "../../types/types";

export const findContext = (
  body: stmt[],
  variable: RenderContext
): RenderContext | null => {
  for (const b of body) {
    if (
      b.nodeType === "Assign" &&
      b.value.nodeType === "Dict" &&
      b.targets.some((c) => c.nodeType === "Name" && c.id === variable.id)
    ) {
      return {
        ...variable,
        variables: b.value.keys.map((d) =>
          "value" in d ? String(d.value) : "unknown_key"
        ),
      };
    }
  }
  return null;
};
