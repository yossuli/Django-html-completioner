import type {
  AsyncFor,
  AsyncFunctionDef,
  AsyncWith,
  ClassDef,
  For,
  FunctionDef,
  If,
  Try,
  TryStar,
  While,
  With,
} from "./AST";

export type ConsoleLogColor =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white";

export type RenderContext = { id: string | null; variables: string[] | null };

export type HaveBody =
  | FunctionDef
  | AsyncFunctionDef
  | ClassDef
  | For
  | AsyncFor
  | While
  | If
  | With
  | AsyncWith
  | Try
  | TryStar;

export type CompletionItemsTestCases = {
  location: string;
  items: string[];
  color?: ConsoleLogColor;
};
