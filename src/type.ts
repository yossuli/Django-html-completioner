type identifier = string;
type int = number;
type constant = number | string | boolean | null | undefined;

export type Module = {
  nodeType: "Module";
  body: stmt[];
  type_ignores: type_ignore[];
};
type Interactive = { nodeType: "Interactive"; body: stmt[] };
type Expression = { nodeType: "Expression"; body: expr };
type FunctionType = {
  nodeType: "FunctionType";
  argtypes: expr[];
  returns: expr;
};
type FunctionDef = {
  nodeType: "FunctionDef";
  name: identifier;
  args: arguments;
  body: stmt[];
  decorator_list: expr[];
  returns?: expr;
  type_comment?: string;
  type_params: type_param[];
};
type AsyncFunctionDef = {
  nodeType: "AsyncFunctionDef";
  name: identifier;
  args: arguments;
  body: stmt[];
  decorator_list: expr[];
  returns?: expr;
  type_comment?: string;
  type_params: type_param[];
};
type ClassDef = {
  nodeType: "ClassDef";
  name: identifier;
  bases: expr[];
  keywords: keyword[];
  body: stmt[];
  decorator_list: expr[];
  type_params: type_param[];
};
type Return = { nodeType: "Return"; value?: expr };
type Delete = { nodeType: "Delete"; targets: expr[] };
type Assign = {
  nodeType: "Assign";
  targets: expr[];
  value: expr;
  type_comment?: string;
};
type TypeAlias = {
  nodeType: "TypeAlias";
  name: expr;
  type_params: type_param[];
  value: expr;
};
type AugAssign = {
  nodeType: "AugAssign";
  target: expr;
  op: operator;
  value: expr;
};
type AnnAssign = {
  nodeType: "AnnAssign";
  target: expr;
  annotation: expr;
  value?: expr;
  simple: int;
};
type For = {
  nodeType: "For";
  target: expr;
  iter: expr;
  body: stmt[];
  orelse: stmt[];
  type_comment?: string;
};
type AsyncFor = {
  nodeType: "AsyncFor";
  target: expr;
  iter: expr;
  body: stmt[];
  orelse: stmt[];
  type_comment?: string;
};
type While = { nodeType: "While"; test: expr; body: stmt[]; orelse: stmt[] };
type If = { nodeType: "If"; test: expr; body: stmt[]; orelse: stmt[] };
type With = {
  nodeType: "With";
  items: withitem[];
  body: stmt[];
  type_comment?: string;
};
type AsyncWith = {
  nodeType: "AsyncWith";
  items: withitem[];
  body: stmt[];
  type_comment?: string;
};
type Match = { nodeType: "Match"; subject: expr; cases: match_case[] };
type Raise = { nodeType: "Raise"; exc?: expr; cause?: expr };
type Try = {
  nodeType: "Try";
  body: stmt[];
  handlers: excepthandler[];
  orelse: stmt[];
  finalbody: stmt[];
};
type TryStar = {
  nodeType: "TryStar";
  body: stmt[];
  handlers: excepthandler[];
  orelse: stmt[];
  finalbody: stmt[];
};
type Assert = { nodeType: "Assert"; test: expr; msg?: expr };
type Import = { nodeType: "Import"; names: alias[] };
type ImportFrom = {
  nodeType: "ImportFrom";
  module?: identifier;
  names: alias[];
  level?: int;
};
type Global = { nodeType: "Global"; names: identifier[] };
type Nonlocal = { nodeType: "Nonlocal"; names: identifier[] };
type Expr = { nodeType: "Expr"; value: expr };
type Pass = { nodeType: "Pass " };
type Break = { nodeType: "Break " };
type Continue = { nodeType: "Continue" };
type BoolOp = { nodeType: "BoolOp"; op: boolop; values: expr[] };
type NamedExpr = { nodeType: "NamedExpr"; target: expr; value: expr };
type BinOp = { nodeType: "BinOp"; left: expr; op: operator; right: expr };
type UnaryOp = { nodeType: "UnaryOp"; op: unaryop; operand: expr };
type Lambda = { nodeType: "Lambda"; args: arguments; body: expr };
type IfExp = { nodeType: "IfExp"; test: expr; body: expr; orelse: expr };
type Dict = { nodeType: "Dict"; keys: expr[]; values: expr[] };
type PySet = { nodeType: "PySet"; elts: expr[] };
type ListComp = {
  nodeType: "ListComp";
  elt: expr;
  generators: comprehension[];
};
type SetComp = { nodeType: "SetComp"; elt: expr; generators: comprehension[] };
type DictComp = {
  nodeType: "DictComp";
  key: expr;
  value: expr;
  generators: comprehension[];
};
type GeneratorExp = {
  nodeType: "GeneratorExp";
  elt: expr;
  generators: comprehension[];
};
type Await = { nodeType: "Await"; value: expr };
type Yield = { nodeType: "Yield"; value?: expr };
type YieldFrom = { nodeType: "YieldFrom"; value: expr };
type Compare = {
  nodeType: "Compare";
  left: expr;
  ops: cmpop[];
  comparators: expr[];
};
type Call = {
  nodeType: "Call";
  func: expr;
  args: expr[];
  keywords: keyword[];
};
type FormattedValue = {
  nodeType: "FormattedValue";
  value: expr;
  conversion: int;
  format_spec?: expr;
};
type JoinedStr = { nodeType: "JoinedStr"; values: expr[] };
type Constant = { nodeType: "Constant"; value: constant; kind?: string };
type Attribute = {
  nodeType: "Attribute";
  value: expr;
  attr: identifier;
  ctx: expr_context;
};
type Subscript = {
  nodeType: "Subscript";
  value: expr;
  slice: expr;
  ctx: expr_context;
};
type Starred = { nodeType: "Starred"; value: expr; ctx: expr_context };
type Name = { nodeType: "Name"; id: identifier; ctx: expr_context };
type List = { nodeType: "List"; elts: expr[]; ctx: expr_context };
type Tuple = { nodeType: "Tuple"; elts: expr[]; ctx: expr_context };
type Slice = { nodeType: "Slice"; lower?: expr; upper?: expr; step?: expr };
type Load = { nodeType: "Load " };
type Store = { nodeType: "Store " };
type Del = { nodeType: "Del" };
type And = { nodeType: "And " };
type Or = { nodeType: "Or" };
type Add = { nodeType: "Add " };
type Sub = { nodeType: "Sub " };
type Mult = { nodeType: "Mult " };
type MatMult = { nodeType: "MatMult " };
type Div = { nodeType: "Div " };
type Mod = { nodeType: "Mod " };
type Pow = { nodeType: "Pow " };
type LShift = { nodeType: "LShift" };
type RShift = { nodeType: "RShift " };
type BitOr = { nodeType: "BitOr " };
type BitXor = { nodeType: "BitXor " };
type BitAnd = { nodeType: "BitAnd " };
type FloorDiv = { nodeType: "FloorDiv" };
type Invert = { nodeType: "Invert " };
type Not = { nodeType: "Not " };
type UAdd = { nodeType: "UAdd " };
type USub = { nodeType: "USub" };
type Eq = { nodeType: "Eq " };
type NotEq = { nodeType: "NotEq " };
type Lt = { nodeType: "Lt " };
type LtE = { nodeType: "LtE " };
type Gt = { nodeType: "Gt " };
type GtE = { nodeType: "GtE " };
type Is = { nodeType: "Is " };
type IsNot = { nodeType: "IsNot " };
type In = { nodeType: "In " };
type NotIn = { nodeType: "NotIn" };
type comprehension = {
  nodeType: comprehension;
  target: expr;
  iter: expr;
  ifs: expr[];
  is_async: int;
};
type ExceptHandler = {
  nodeType: "ExceptHandler";
  type?: expr;
  name?: identifier;
  body: stmt[];
};
type arguments = {
  nodeType: arguments;
  posonlyargs: arg[];
  args: arg[];
  vararg?: arg;
  kwonlyargs: arg[];
  kw_defaults: expr[];
  kwarg?: arg;
  defaults: expr[];
};
type arg = {
  nodeType: arg;
  arg: identifier;
  annotation?: expr;
  type_comment?: string;
};
type keyword = { nodeType: keyword; arg?: identifier; value: expr };
type alias = { nodeType: alias; name: identifier; asname?: identifier };
type withitem = {
  nodeType: withitem;
  context_expr: expr;
  optional_vars?: expr;
};
type match_case = {
  nodeType: match_case;
  pattern: pattern;
  guard?: expr;
  body: stmt[];
};
type MatchValue = { nodeType: "MatchValue"; value: expr };
type MatchSingleton = { nodeType: "MatchSingleton"; value: constant };
type MatchSequence = { nodeType: "MatchSequence"; patterns: pattern[] };
type MatchMapping = {
  nodeType: "MatchMapping";
  keys: expr[];
  patterns: pattern[];
  rest?: identifier;
};
type MatchClass = {
  nodeType: "MatchClass";
  cls: expr;
  patterns: pattern[];
  kwd_attrs: identifier[];
  kwd_patterns: pattern[];
};
type MatchStar = { nodeType: "MatchStar"; name?: identifier };
type MatchAs = { nodeType: "MatchAs"; pattern?: pattern; name?: identifier };
type MatchOr = { nodeType: "MatchOr"; patterns: pattern[] };
type TypeIgnore = { nodeType: "TypeIgnore"; lineno: int; tag: string };
type TypeVar = { nodeType: "TypeVar"; name: identifier; bound?: expr };
type ParamSpec = { nodeType: "ParamSpec"; name: identifier };
type TypeVarTuple = { nodeType: "TypeVarTuple"; name: identifier };
type mod = Module | Interactive | Expression | FunctionType;
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
type expr =
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
type expr_context = Load | Store | Del;
type boolop = And | Or;
type operator =
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
type unaryop = Invert | Not | UAdd | USub;
type cmpop = Eq | NotEq | Lt | LtE | Gt | GtE | Is | IsNot | In | NotIn;
type excepthandler = ExceptHandler;
type pattern =
  | MatchValue
  | MatchSingleton
  | MatchSequence
  | MatchMapping
  | MatchClass
  | MatchStar
  | MatchAs
  | MatchOr;
type type_ignore = TypeIgnore;
type type_param = TypeVar | ParamSpec | TypeVarTuple;
