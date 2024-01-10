type identifier = string;
export type int = number;
export type constant = number | string | boolean | null | undefined;

export type Module = {
  nodeType: "Module";
  body: stmt[];
  type_ignores: type_ignore[];
};
export type Interactive = { nodeType: "Interactive"; body: stmt[] };
export type Expression = { nodeType: "Expression"; body: expr };
export type FunctionType = {
  nodeType: "FunctionType";
  argtypes: expr[];
  returns: expr;
};
export type FunctionDef = {
  nodeType: "FunctionDef";
  name: identifier;
  args: arguments;
  body: stmt[];
  decorator_list: expr[];
  returns?: expr;
  type_comment?: string;
  type_params: type_param[];
};
export type AsyncFunctionDef = {
  nodeType: "AsyncFunctionDef";
  name: identifier;
  args: arguments;
  body: stmt[];
  decorator_list: expr[];
  returns?: expr;
  type_comment?: string;
  type_params: type_param[];
};
export type ClassDef = {
  nodeType: "ClassDef";
  name: identifier;
  bases: expr[];
  keywords: keyword[];
  body: stmt[];
  decorator_list: expr[];
  type_params: type_param[];
};
export type Return = { nodeType: "Return"; value?: expr };
export type Delete = { nodeType: "Delete"; targets: expr[] };
export type Assign = {
  nodeType: "Assign";
  targets: expr[];
  value: expr;
  type_comment?: string;
};
export type TypeAlias = {
  nodeType: "TypeAlias";
  name: expr;
  type_params: type_param[];
  value: expr;
};
export type AugAssign = {
  nodeType: "AugAssign";
  target: expr;
  op: operator;
  value: expr;
};
export type AnnAssign = {
  nodeType: "AnnAssign";
  target: expr;
  annotation: expr;
  value?: expr;
  simple: int;
};
export type For = {
  nodeType: "For";
  target: expr;
  iter: expr;
  body: stmt[];
  orelse: stmt[];
  type_comment?: string;
};
export type AsyncFor = {
  nodeType: "AsyncFor";
  target: expr;
  iter: expr;
  body: stmt[];
  orelse: stmt[];
  type_comment?: string;
};
export type While = { nodeType: "While"; test: expr; body: stmt[]; orelse: stmt[] };
export type If = { nodeType: "If"; test: expr; body: stmt[]; orelse: stmt[] };
export type With = {
  nodeType: "With";
  items: withitem[];
  body: stmt[];
  type_comment?: string;
};
export type AsyncWith = {
  nodeType: "AsyncWith";
  items: withitem[];
  body: stmt[];
  type_comment?: string;
};
export type Match = { nodeType: "Match"; subject: expr; cases: match_case[] };
export type Raise = { nodeType: "Raise"; exc?: expr; cause?: expr };
export type Try = {
  nodeType: "Try";
  body: stmt[];
  handlers: excepthandler[];
  orelse: stmt[];
  finalbody: stmt[];
};
export type TryStar = {
  nodeType: "TryStar";
  body: stmt[];
  handlers: excepthandler[];
  orelse: stmt[];
  finalbody: stmt[];
};
export type Assert = { nodeType: "Assert"; test: expr; msg?: expr };
export type Import = { nodeType: "Import"; names: alias[] };
export type ImportFrom = {
  nodeType: "ImportFrom";
  module?: identifier;
  names: alias[];
  level?: int;
};
export type Global = { nodeType: "Global"; names: identifier[] };
export type Nonlocal = { nodeType: "Nonlocal"; names: identifier[] };
export type Expr = { nodeType: "Expr"; value: expr };
export type Pass = { nodeType: "Pass " };
export type Break = { nodeType: "Break " };
export type Continue = { nodeType: "Continue" };
export type BoolOp = { nodeType: "BoolOp"; op: boolop; values: expr[] };
export type NamedExpr = { nodeType: "NamedExpr"; target: expr; value: expr };
export type BinOp = { nodeType: "BinOp"; left: expr; op: operator; right: expr };
export type UnaryOp = { nodeType: "UnaryOp"; op: unaryop; operand: expr };
export type Lambda = { nodeType: "Lambda"; args: arguments; body: expr };
export type IfExp = { nodeType: "IfExp"; test: expr; body: expr; orelse: expr };
export type Dict = { nodeType: "Dict"; keys: expr[]; values: expr[] };
export type PySet = { nodeType: "Set"; elts: expr[] };
export type ListComp = {
  nodeType: "ListComp";
  elt: expr;
  generators: comprehension[];
};
export type SetComp = { nodeType: "SetComp"; elt: expr; generators: comprehension[] };
export type DictComp = {
  nodeType: "DictComp";
  key: expr;
  value: expr;
  generators: comprehension[];
};
export type GeneratorExp = {
  nodeType: "GeneratorExp";
  elt: expr;
  generators: comprehension[];
};
export type Await = { nodeType: "Await"; value: expr };
export type Yield = { nodeType: "Yield"; value?: expr };
export type YieldFrom = { nodeType: "YieldFrom"; value: expr };
export type Compare = {
  nodeType: "Compare";
  left: expr;
  ops: cmpop[];
  comparators: expr[];
};
export type Call = {
  nodeType: "Call";
  func: expr;
  args: expr[];
  keywords: keyword[];
};
export type FormattedValue = {
  nodeType: "FormattedValue";
  value: expr;
  conversion: int;
  format_spec?: expr;
};
export type JoinedStr = { nodeType: "JoinedStr"; values: expr[] };
export type Constant = { nodeType: "Constant"; value: constant; kind?: string };
export type Attribute = {
  nodeType: "Attribute";
  value: expr;
  attr: identifier;
  ctx: expr_context;
};
export type Subscript = {
  nodeType: "Subscript";
  value: expr;
  slice: expr;
  ctx: expr_context;
};
export type Starred = { nodeType: "Starred"; value: expr; ctx: expr_context };
export type Name = { nodeType: "Name"; id: identifier; ctx: expr_context };
export type List = { nodeType: "List"; elts: expr[]; ctx: expr_context };
export type Tuple = { nodeType: "Tuple"; elts: expr[]; ctx: expr_context };
export type Slice = { nodeType: "Slice"; lower?: expr; upper?: expr; step?: expr };
export type Load = { nodeType: "Load " };
export type Store = { nodeType: "Store " };
export type Del = { nodeType: "Del" };
export type And = { nodeType: "And " };
export type Or = { nodeType: "Or" };
export type Add = { nodeType: "Add " };
export type Sub = { nodeType: "Sub " };
export type Mult = { nodeType: "Mult " };
export type MatMult = { nodeType: "MatMult " };
export type Div = { nodeType: "Div " };
export type Mod = { nodeType: "Mod " };
export type Pow = { nodeType: "Pow " };
export type LShift = { nodeType: "LShift" };
export type RShift = { nodeType: "RShift " };
export type BitOr = { nodeType: "BitOr " };
export type BitXor = { nodeType: "BitXor " };
export type BitAnd = { nodeType: "BitAnd " };
export type FloorDiv = { nodeType: "FloorDiv" };
export type Invert = { nodeType: "Invert " };
export type Not = { nodeType: "Not " };
export type UAdd = { nodeType: "UAdd " };
export type USub = { nodeType: "USub" };
export type Eq = { nodeType: "Eq " };
export type NotEq = { nodeType: "NotEq " };
export type Lt = { nodeType: "Lt " };
export type LtE = { nodeType: "LtE " };
export type Gt = { nodeType: "Gt " };
export type GtE = { nodeType: "GtE " };
export type Is = { nodeType: "Is " };
export type IsNot = { nodeType: "IsNot " };
export type In = { nodeType: "In " };
export type NotIn = { nodeType: "NotIn" };
export type comprehension = {
  nodeType: comprehension;
  target: expr;
  iter: expr;
  ifs: expr[];
  is_async: int;
};
export type ExceptHandler = {
  nodeType: "ExceptHandler";
  type?: expr;
  name?: identifier;
  body: stmt[];
};
export type arguments = {
  nodeType: arguments;
  posonlyargs: arg[];
  args: arg[];
  vararg?: arg;
  kwonlyargs: arg[];
  kw_defaults: expr[];
  kwarg?: arg;
  defaults: expr[];
};
export type arg = {
  nodeType: arg;
  arg: identifier;
  annotation?: expr;
  type_comment?: string;
};
export type keyword = { nodeType: keyword; arg?: identifier; value: expr };
export type alias = { nodeType: alias; name: identifier; asname?: identifier };
export type withitem = {
  nodeType: withitem;
  context_expr: expr;
  optional_vars?: expr;
};
export type match_case = {
  nodeType: match_case;
  pattern: pattern;
  guard?: expr;
  body: stmt[];
};
export type MatchValue = { nodeType: "MatchValue"; value: expr };
export type MatchSingleton = { nodeType: "MatchSingleton"; value: constant };
export type MatchSequence = { nodeType: "MatchSequence"; patterns: pattern[] };
export type MatchMapping = {
  nodeType: "MatchMapping";
  keys: expr[];
  patterns: pattern[];
  rest?: identifier;
};
export type MatchClass = {
  nodeType: "MatchClass";
  cls: expr;
  patterns: pattern[];
  kwd_attrs: identifier[];
  kwd_patterns: pattern[];
};
export type MatchStar = { nodeType: "MatchStar"; name?: identifier };
export type MatchAs = { nodeType: "MatchAs"; pattern?: pattern; name?: identifier };
export type MatchOr = { nodeType: "MatchOr"; patterns: pattern[] };
export type TypeIgnore = { nodeType: "TypeIgnore"; lineno: int; tag: string };
export type TypeVar = { nodeType: "TypeVar"; name: identifier; bound?: expr };
export type ParamSpec = { nodeType: "ParamSpec"; name: identifier };
export type TypeVarTuple = { nodeType: "TypeVarTuple"; name: identifier };
export type mod = Module | Interactive | Expression | FunctionType;
export type stmt =
  | FunctionDef
  | AsyncFunctionDef
  | ClassDef
  | Return
  | Delete
  | Assign
  | TypeAlias
  | AugAssign
  | AnnAssign
  | For
  | AsyncFor
  | While
  | If
  | With
  | AsyncWith
  | Match
  | Raise
  | Try
  | TryStar
  | Assert
  | Import
  | ImportFrom
  | Global
  | Nonlocal
  | Expr
  | Pass
  | Break
  | Continue;
export type expr =
  | BoolOp
  | NamedExpr
  | BinOp
  | UnaryOp
  | Lambda
  | IfExp
  | Dict
  | PySet
  | ListComp
  | SetComp
  | DictComp
  | GeneratorExp
  | Await
  | Yield
  | YieldFrom
  | Compare
  | Call
  | FormattedValue
  | JoinedStr
  | Constant
  | Attribute
  | Subscript
  | Starred
  | Name
  | List
  | Tuple
  | Slice;
export type expr_context = Load | Store | Del;
export type boolop = And | Or;
export type operator =
  | Add
  | Sub
  | Mult
  | MatMult
  | Div
  | Mod
  | Pow
  | LShift
  | RShift
  | BitOr
  | BitXor
  | BitAnd
  | FloorDiv;
export type unaryop = Invert | Not | UAdd | USub;
export type cmpop = Eq | NotEq | Lt | LtE | Gt | GtE | Is | IsNot | In | NotIn;
export type excepthandler = ExceptHandler;
export type pattern =
  | MatchValue
  | MatchSingleton
  | MatchSequence
  | MatchMapping
  | MatchClass
  | MatchStar
  | MatchAs
  | MatchOr;
export type type_ignore = TypeIgnore;
export type type_param = TypeVar | ParamSpec | TypeVarTuple;
