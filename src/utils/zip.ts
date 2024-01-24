export const zip2 = <T, U>(arrays: [T[], U[]]): [T, U][] => {
  const length = Math.min(...arrays.map((arr) => arr.length));
  return Array.from({ length }, (_, i) => [arrays[0][i], arrays[1][i]]);
};
