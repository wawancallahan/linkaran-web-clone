export const pSBC = (r, t, e, l) => {
    let n,
      g,
      i,
      s,
      a,
      b,
      p,
      u = parseInt,
      h = Math.round,
      o = "string" == typeof e;
    return "number" != typeof r ||
      r < -1 ||
      r > 1 ||
      "string" != typeof t ||
      ("r" != t[0] && "#" != t[0]) ||
      (e && !o)
      ? null
      : (this.pSBCr ||
          (this.pSBCr = r => {
            let t = r.length,
              e = {};
            if (t > 9) {
              if (
                (([n, g, i, o] = r = r.split(",")), (t = r.length) < 3 || t > 4)
              ) {
                return null;
              }
              (e.r = u("a" === n[3] ? n.slice(5) : n.slice(4))),
                (e.g = u(g)),
                (e.b = u(i)),
                (e.a = o ? parseFloat(o) : -1);
            } else {
              if (8 === t || 6 === t || t < 4) { return null; }
              t < 6 &&
                (r =
                  "#" +
                  r[1] +
                  r[1] +
                  r[2] +
                  r[2] +
                  r[3] +
                  r[3] +
                  (t > 4 ? r[4] + r[4] : "")),
                (r = u(r.slice(1), 16)),
                9 === t || 5 === t
                  ? ((e.r = (r >> 24) & 255),
                    (e.g = (r >> 16) & 255),
                    (e.b = (r >> 8) & 255),
                    (e.a = h((255 & r) / 0.255) / 1e3))
                  : ((e.r = r >> 16),
                    (e.g = (r >> 8) & 255),
                    (e.b = 255 & r),
                    (e.a = -1));
            }
            return e;
          }),
        (p = t.length > 9),
        (p = o ? e.length > 9 || ("c" === e && !p) : p),
        (a = this.pSBCr(t)),
        (s = r < 0),
        (b =
          e && "c" !== e
            ? this.pSBCr(e)
            : s
            ? { r: 0, g: 0, b: 0, a: -1 }
            : { r: 255, g: 255, b: 255, a: -1 }),
        (s = 1 - (r = s ? -1 * r : r)),
        a && b
          ? (l
              ? ((n = h(s * a.r + r * b.r)),
                (g = h(s * a.g + r * b.g)),
                (i = h(s * a.b + r * b.b)))
              : ((n = h((s * a.r ** 2 + r * b.r ** 2) ** 0.5)),
                (g = h((s * a.g ** 2 + r * b.g ** 2) ** 0.5)),
                (i = h((s * a.b ** 2 + r * b.b ** 2) ** 0.5))),
            (o = a.a),
            (b = b.a),
            (o = (a = o >= 0 || b >= 0)
              ? o < 0
                ? b
                : b < 0
                ? o
                : o * s + b * r
              : 0),
            p
              ? "rgb" +
                (a ? "a(" : "(") +
                n +
                "," +
                g +
                "," +
                i +
                (a ? "," + h(1e3 * o) / 1e3 : "") +
                ")"
              : "#" +
                (
                  4294967296 +
                  16777216 * n +
                  65536 * g +
                  256 * i +
                  (a ? h(255 * o) : 0)
                )
                  .toString(16)
                  .slice(1, a ? void 0 : -2))
          : null);
  };