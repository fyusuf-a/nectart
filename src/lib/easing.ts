export const easeCubicFactory = (p0: number, p1: number, p2: number, p3: number) =>
  function (t) {
    const t1 = 1 - t;
    return p0 * t1 * t1 * t1 + 3 * p1 * t * t1 * t1 + 3 * p2 * t * t * t1 + p3 * t * t * t;
  };
