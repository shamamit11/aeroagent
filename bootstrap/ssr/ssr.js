import { jsx } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
async function resolvePageComponent(path, pages) {
  const page = pages[path];
  if (typeof page === "undefined") {
    throw new Error(`Page not found: ${path}`);
  }
  return typeof page === "function" ? page() : page;
}
function t(t4, r2) {
  for (var e2 = 0; e2 < r2.length; e2++) {
    var n2 = r2[e2];
    n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t4, "symbol" == typeof (o2 = function(t5, r3) {
      if ("object" != typeof t5 || null === t5)
        return t5;
      var e3 = t5[Symbol.toPrimitive];
      if (void 0 !== e3) {
        var n3 = e3.call(t5, "string");
        if ("object" != typeof n3)
          return n3;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(t5);
    }(n2.key)) ? o2 : String(o2), n2);
  }
  var o2;
}
function r(r2, e2, n2) {
  return e2 && t(r2.prototype, e2), n2 && t(r2, n2), Object.defineProperty(r2, "prototype", { writable: false }), r2;
}
function e() {
  return e = Object.assign ? Object.assign.bind() : function(t4) {
    for (var r2 = 1; r2 < arguments.length; r2++) {
      var e2 = arguments[r2];
      for (var n2 in e2)
        Object.prototype.hasOwnProperty.call(e2, n2) && (t4[n2] = e2[n2]);
    }
    return t4;
  }, e.apply(this, arguments);
}
function n(t4) {
  return n = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t5) {
    return t5.__proto__ || Object.getPrototypeOf(t5);
  }, n(t4);
}
function o(t4, r2) {
  return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t5, r3) {
    return t5.__proto__ = r3, t5;
  }, o(t4, r2);
}
function i(t4, r2, e2) {
  return i = function() {
    if ("undefined" == typeof Reflect || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if ("function" == typeof Proxy)
      return true;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), true;
    } catch (t5) {
      return false;
    }
  }() ? Reflect.construct.bind() : function(t5, r3, e3) {
    var n2 = [null];
    n2.push.apply(n2, r3);
    var i2 = new (Function.bind.apply(t5, n2))();
    return e3 && o(i2, e3.prototype), i2;
  }, i.apply(null, arguments);
}
function u(t4) {
  var r2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
  return u = function(t5) {
    if (null === t5 || -1 === Function.toString.call(t5).indexOf("[native code]"))
      return t5;
    if ("function" != typeof t5)
      throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r2) {
      if (r2.has(t5))
        return r2.get(t5);
      r2.set(t5, e2);
    }
    function e2() {
      return i(t5, arguments, n(this).constructor);
    }
    return e2.prototype = Object.create(t5.prototype, { constructor: { value: e2, enumerable: false, writable: true, configurable: true } }), o(e2, t5);
  }, u(t4);
}
var f = String.prototype.replace, a = /%20/g, c = "RFC3986", l = { default: c, formatters: { RFC1738: function(t4) {
  return f.call(t4, a, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738", RFC3986: c }, s = Object.prototype.hasOwnProperty, v = Array.isArray, p = function() {
  for (var t4 = [], r2 = 0; r2 < 256; ++r2)
    t4.push("%" + ((r2 < 16 ? "0" : "") + r2.toString(16)).toUpperCase());
  return t4;
}(), y = function(t4, r2) {
  for (var e2 = r2 && r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n2 = 0; n2 < t4.length; ++n2)
    void 0 !== t4[n2] && (e2[n2] = t4[n2]);
  return e2;
}, d = { arrayToObject: y, assign: function(t4, r2) {
  return Object.keys(r2).reduce(function(t5, e2) {
    return t5[e2] = r2[e2], t5;
  }, t4);
}, combine: function(t4, r2) {
  return [].concat(t4, r2);
}, compact: function(t4) {
  for (var r2 = [{ obj: { o: t4 }, prop: "o" }], e2 = [], n2 = 0; n2 < r2.length; ++n2)
    for (var o2 = r2[n2], i2 = o2.obj[o2.prop], u2 = Object.keys(i2), f2 = 0; f2 < u2.length; ++f2) {
      var a2 = u2[f2], c2 = i2[a2];
      "object" == typeof c2 && null !== c2 && -1 === e2.indexOf(c2) && (r2.push({ obj: i2, prop: a2 }), e2.push(c2));
    }
  return function(t5) {
    for (; t5.length > 1; ) {
      var r3 = t5.pop(), e3 = r3.obj[r3.prop];
      if (v(e3)) {
        for (var n3 = [], o3 = 0; o3 < e3.length; ++o3)
          void 0 !== e3[o3] && n3.push(e3[o3]);
        r3.obj[r3.prop] = n3;
      }
    }
  }(r2), t4;
}, decode: function(t4, r2, e2) {
  var n2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === e2)
    return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t5) {
    return n2;
  }
}, encode: function(t4, r2, e2, n2, o2) {
  if (0 === t4.length)
    return t4;
  var i2 = t4;
  if ("symbol" == typeof t4 ? i2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (i2 = String(t4)), "iso-8859-1" === e2)
    return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
      return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
    });
  for (var u2 = "", f2 = 0; f2 < i2.length; ++f2) {
    var a2 = i2.charCodeAt(f2);
    45 === a2 || 46 === a2 || 95 === a2 || 126 === a2 || a2 >= 48 && a2 <= 57 || a2 >= 65 && a2 <= 90 || a2 >= 97 && a2 <= 122 || o2 === l.RFC1738 && (40 === a2 || 41 === a2) ? u2 += i2.charAt(f2) : a2 < 128 ? u2 += p[a2] : a2 < 2048 ? u2 += p[192 | a2 >> 6] + p[128 | 63 & a2] : a2 < 55296 || a2 >= 57344 ? u2 += p[224 | a2 >> 12] + p[128 | a2 >> 6 & 63] + p[128 | 63 & a2] : (a2 = 65536 + ((1023 & a2) << 10 | 1023 & i2.charCodeAt(f2 += 1)), u2 += p[240 | a2 >> 18] + p[128 | a2 >> 12 & 63] + p[128 | a2 >> 6 & 63] + p[128 | 63 & a2]);
  }
  return u2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, r2) {
  if (v(t4)) {
    for (var e2 = [], n2 = 0; n2 < t4.length; n2 += 1)
      e2.push(r2(t4[n2]));
    return e2;
  }
  return r2(t4);
}, merge: function t2(r2, e2, n2) {
  if (!e2)
    return r2;
  if ("object" != typeof e2) {
    if (v(r2))
      r2.push(e2);
    else {
      if (!r2 || "object" != typeof r2)
        return [r2, e2];
      (n2 && (n2.plainObjects || n2.allowPrototypes) || !s.call(Object.prototype, e2)) && (r2[e2] = true);
    }
    return r2;
  }
  if (!r2 || "object" != typeof r2)
    return [r2].concat(e2);
  var o2 = r2;
  return v(r2) && !v(e2) && (o2 = y(r2, n2)), v(r2) && v(e2) ? (e2.forEach(function(e3, o3) {
    if (s.call(r2, o3)) {
      var i2 = r2[o3];
      i2 && "object" == typeof i2 && e3 && "object" == typeof e3 ? r2[o3] = t2(i2, e3, n2) : r2.push(e3);
    } else
      r2[o3] = e3;
  }), r2) : Object.keys(e2).reduce(function(r3, o3) {
    var i2 = e2[o3];
    return r3[o3] = s.call(r3, o3) ? t2(r3[o3], i2, n2) : i2, r3;
  }, o2);
} }, b = Object.prototype.hasOwnProperty, h = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, r2) {
  return t4 + "[" + r2 + "]";
}, repeat: function(t4) {
  return t4;
} }, g = Array.isArray, m = String.prototype.split, j = Array.prototype.push, w = function(t4, r2) {
  j.apply(t4, g(r2) ? r2 : [r2]);
}, O = Date.prototype.toISOString, E = l.default, R = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: d.encode, encodeValuesOnly: false, format: E, formatter: l.formatters[E], indices: false, serializeDate: function(t4) {
  return O.call(t4);
}, skipNulls: false, strictNullHandling: false }, S = function t3(r2, e2, n2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2) {
  var b2, h2 = r2;
  if ("function" == typeof f2 ? h2 = f2(e2, h2) : h2 instanceof Date ? h2 = l2(h2) : "comma" === n2 && g(h2) && (h2 = d.maybeMap(h2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === h2) {
    if (o2)
      return u2 && !p2 ? u2(e2, R.encoder, y2, "key", s2) : e2;
    h2 = "";
  }
  if ("string" == typeof (b2 = h2) || "number" == typeof b2 || "boolean" == typeof b2 || "symbol" == typeof b2 || "bigint" == typeof b2 || d.isBuffer(h2)) {
    if (u2) {
      var j2 = p2 ? e2 : u2(e2, R.encoder, y2, "key", s2);
      if ("comma" === n2 && p2) {
        for (var O2 = m.call(String(h2), ","), E2 = "", S2 = 0; S2 < O2.length; ++S2)
          E2 += (0 === S2 ? "" : ",") + v2(u2(O2[S2], R.encoder, y2, "value", s2));
        return [v2(j2) + "=" + E2];
      }
      return [v2(j2) + "=" + v2(u2(h2, R.encoder, y2, "value", s2))];
    }
    return [v2(e2) + "=" + v2(String(h2))];
  }
  var k2, x2 = [];
  if (void 0 === h2)
    return x2;
  if ("comma" === n2 && g(h2))
    k2 = [{ value: h2.length > 0 ? h2.join(",") || null : void 0 }];
  else if (g(f2))
    k2 = f2;
  else {
    var T2 = Object.keys(h2);
    k2 = a2 ? T2.sort(a2) : T2;
  }
  for (var N2 = 0; N2 < k2.length; ++N2) {
    var C2 = k2[N2], D2 = "object" == typeof C2 && void 0 !== C2.value ? C2.value : h2[C2];
    if (!i2 || null !== D2) {
      var $2 = g(h2) ? "function" == typeof n2 ? n2(e2, C2) : e2 : e2 + (c2 ? "." + C2 : "[" + C2 + "]");
      w(x2, t3(D2, $2, n2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2));
    }
  }
  return x2;
}, k = Object.prototype.hasOwnProperty, x = Array.isArray, T = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: d.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, N = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, r2) {
    return String.fromCharCode(parseInt(r2, 10));
  });
}, C = function(t4, r2) {
  return t4 && "string" == typeof t4 && r2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, D = function(t4, r2, e2, n2) {
  if (t4) {
    var o2 = e2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = e2.depth > 0 && /(\[[^[\]]*])/.exec(o2), f2 = u2 ? o2.slice(0, u2.index) : o2, a2 = [];
    if (f2) {
      if (!e2.plainObjects && k.call(Object.prototype, f2) && !e2.allowPrototypes)
        return;
      a2.push(f2);
    }
    for (var c2 = 0; e2.depth > 0 && null !== (u2 = i2.exec(o2)) && c2 < e2.depth; ) {
      if (c2 += 1, !e2.plainObjects && k.call(Object.prototype, u2[1].slice(1, -1)) && !e2.allowPrototypes)
        return;
      a2.push(u2[1]);
    }
    return u2 && a2.push("[" + o2.slice(u2.index) + "]"), function(t5, r3, e3, n3) {
      for (var o3 = n3 ? r3 : C(r3, e3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, f3 = t5[i3];
        if ("[]" === f3 && e3.parseArrays)
          u3 = [].concat(o3);
        else {
          u3 = e3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var a3 = "[" === f3.charAt(0) && "]" === f3.charAt(f3.length - 1) ? f3.slice(1, -1) : f3, c3 = parseInt(a3, 10);
          e3.parseArrays || "" !== a3 ? !isNaN(c3) && f3 !== a3 && String(c3) === a3 && c3 >= 0 && e3.parseArrays && c3 <= e3.arrayLimit ? (u3 = [])[c3] = o3 : "__proto__" !== a3 && (u3[a3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(a2, r2, e2, n2);
  }
}, $ = function(t4, r2) {
  var e2 = function(t5) {
    if (!t5)
      return T;
    if (null != t5.decoder && "function" != typeof t5.decoder)
      throw new TypeError("Decoder has to be a function.");
    if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset)
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    return { allowDots: void 0 === t5.allowDots ? T.allowDots : !!t5.allowDots, allowPrototypes: "boolean" == typeof t5.allowPrototypes ? t5.allowPrototypes : T.allowPrototypes, arrayLimit: "number" == typeof t5.arrayLimit ? t5.arrayLimit : T.arrayLimit, charset: void 0 === t5.charset ? T.charset : t5.charset, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : T.charsetSentinel, comma: "boolean" == typeof t5.comma ? t5.comma : T.comma, decoder: "function" == typeof t5.decoder ? t5.decoder : T.decoder, delimiter: "string" == typeof t5.delimiter || d.isRegExp(t5.delimiter) ? t5.delimiter : T.delimiter, depth: "number" == typeof t5.depth || false === t5.depth ? +t5.depth : T.depth, ignoreQueryPrefix: true === t5.ignoreQueryPrefix, interpretNumericEntities: "boolean" == typeof t5.interpretNumericEntities ? t5.interpretNumericEntities : T.interpretNumericEntities, parameterLimit: "number" == typeof t5.parameterLimit ? t5.parameterLimit : T.parameterLimit, parseArrays: false !== t5.parseArrays, plainObjects: "boolean" == typeof t5.plainObjects ? t5.plainObjects : T.plainObjects, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : T.strictNullHandling };
  }(r2);
  if ("" === t4 || null == t4)
    return e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n2 = "string" == typeof t4 ? function(t5, r3) {
    var e3, n3 = {}, o3 = (r3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(r3.delimiter, Infinity === r3.parameterLimit ? void 0 : r3.parameterLimit), i3 = -1, u3 = r3.charset;
    if (r3.charsetSentinel)
      for (e3 = 0; e3 < o3.length; ++e3)
        0 === o3[e3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[e3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[e3] && (u3 = "iso-8859-1"), i3 = e3, e3 = o3.length);
    for (e3 = 0; e3 < o3.length; ++e3)
      if (e3 !== i3) {
        var f3, a3, c2 = o3[e3], l2 = c2.indexOf("]="), s2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
        -1 === s2 ? (f3 = r3.decoder(c2, T.decoder, u3, "key"), a3 = r3.strictNullHandling ? null : "") : (f3 = r3.decoder(c2.slice(0, s2), T.decoder, u3, "key"), a3 = d.maybeMap(C(c2.slice(s2 + 1), r3), function(t6) {
          return r3.decoder(t6, T.decoder, u3, "value");
        })), a3 && r3.interpretNumericEntities && "iso-8859-1" === u3 && (a3 = N(a3)), c2.indexOf("[]=") > -1 && (a3 = x(a3) ? [a3] : a3), n3[f3] = k.call(n3, f3) ? d.combine(n3[f3], a3) : a3;
      }
    return n3;
  }(t4, e2) : t4, o2 = e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(n2), u2 = 0; u2 < i2.length; ++u2) {
    var f2 = i2[u2], a2 = D(f2, n2[f2], e2, "string" == typeof t4);
    o2 = d.merge(o2, a2, e2);
  }
  return d.compact(o2);
}, F = /* @__PURE__ */ function() {
  function t4(t5, r2, e3) {
    var n2, o2;
    this.name = t5, this.definition = r2, this.bindings = null != (n2 = r2.bindings) ? n2 : {}, this.wheres = null != (o2 = r2.wheres) ? o2 : {}, this.config = e3;
  }
  var e2 = t4.prototype;
  return e2.matchesUrl = function(t5) {
    var r2 = this;
    if (!this.definition.methods.includes("GET"))
      return false;
    var e3 = this.template.replace(/(\/?){([^}?]*)(\??)}/g, function(t6, e4, n3, o3) {
      var i3, u3 = "(?<" + n3 + ">" + ((null == (i3 = r2.wheres[n3]) ? void 0 : i3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+") + ")";
      return o3 ? "(" + e4 + u3 + ")?" : "" + e4 + u3;
    }).replace(/^\w+:\/\//, ""), n2 = t5.replace(/^\w+:\/\//, "").split("?"), o2 = n2[0], i2 = n2[1], u2 = new RegExp("^" + e3 + "/?$").exec(decodeURI(o2));
    if (u2) {
      for (var f2 in u2.groups)
        u2.groups[f2] = "string" == typeof u2.groups[f2] ? decodeURIComponent(u2.groups[f2]) : u2.groups[f2];
      return { params: u2.groups, query: $(i2) };
    }
    return false;
  }, e2.compile = function(t5) {
    var r2 = this;
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, function(e3, n2, o2) {
      var i2, u2;
      if (!o2 && [null, void 0].includes(t5[n2]))
        throw new Error("Ziggy error: '" + n2 + "' parameter is required for route '" + r2.name + "'.");
      if (r2.wheres[n2] && !new RegExp("^" + (o2 ? "(" + r2.wheres[n2] + ")?" : r2.wheres[n2]) + "$").test(null != (u2 = t5[n2]) ? u2 : ""))
        throw new Error("Ziggy error: '" + n2 + "' parameter does not match required format '" + r2.wheres[n2] + "' for route '" + r2.name + "'.");
      return encodeURI(null != (i2 = t5[n2]) ? i2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.origin + "//", this.origin + "/").replace(/\/+$/, "") : this.template;
  }, r(t4, [{ key: "template", get: function() {
    var t5 = (this.origin + "/" + this.definition.uri).replace(/\/+$/, "");
    return "" === t5 ? "/" : t5;
  } }, { key: "origin", get: function() {
    return this.config.absolute ? this.definition.domain ? "" + this.config.url.match(/^\w+:\/\//)[0] + this.definition.domain + (this.config.port ? ":" + this.config.port : "") : this.config.url : "";
  } }, { key: "parameterSegments", get: function() {
    var t5, r2;
    return null != (t5 = null == (r2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : r2.map(function(t6) {
      return { name: t6.replace(/{|\??}/g, ""), required: !/\?}$/.test(t6) };
    })) ? t5 : [];
  } }]), t4;
}(), P = /* @__PURE__ */ function(t4) {
  var n2, i2;
  function u2(r2, n3, o2, i3) {
    var u3;
    if (void 0 === o2 && (o2 = true), (u3 = t4.call(this) || this).t = null != i3 ? i3 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, u3.t = e({}, u3.t, { absolute: o2 }), r2) {
      if (!u3.t.routes[r2])
        throw new Error("Ziggy error: route '" + r2 + "' is not in the route list.");
      u3.i = new F(r2, u3.t.routes[r2], u3.t), u3.u = u3.l(n3);
    }
    return u3;
  }
  i2 = t4, (n2 = u2).prototype = Object.create(i2.prototype), n2.prototype.constructor = n2, o(n2, i2);
  var f2 = u2.prototype;
  return f2.toString = function() {
    var t5 = this, r2 = Object.keys(this.u).filter(function(r3) {
      return !t5.i.parameterSegments.some(function(t6) {
        return t6.name === r3;
      });
    }).filter(function(t6) {
      return "_query" !== t6;
    }).reduce(function(r3, n3) {
      var o2;
      return e({}, r3, ((o2 = {})[n3] = t5.u[n3], o2));
    }, {});
    return this.i.compile(this.u) + function(t6, r3) {
      var e2, n3 = t6, o2 = function(t7) {
        if (!t7)
          return R;
        if (null != t7.encoder && "function" != typeof t7.encoder)
          throw new TypeError("Encoder has to be a function.");
        var r4 = t7.charset || R.charset;
        if (void 0 !== t7.charset && "utf-8" !== t7.charset && "iso-8859-1" !== t7.charset)
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var e3 = l.default;
        if (void 0 !== t7.format) {
          if (!b.call(l.formatters, t7.format))
            throw new TypeError("Unknown format option provided.");
          e3 = t7.format;
        }
        var n4 = l.formatters[e3], o3 = R.filter;
        return ("function" == typeof t7.filter || g(t7.filter)) && (o3 = t7.filter), { addQueryPrefix: "boolean" == typeof t7.addQueryPrefix ? t7.addQueryPrefix : R.addQueryPrefix, allowDots: void 0 === t7.allowDots ? R.allowDots : !!t7.allowDots, charset: r4, charsetSentinel: "boolean" == typeof t7.charsetSentinel ? t7.charsetSentinel : R.charsetSentinel, delimiter: void 0 === t7.delimiter ? R.delimiter : t7.delimiter, encode: "boolean" == typeof t7.encode ? t7.encode : R.encode, encoder: "function" == typeof t7.encoder ? t7.encoder : R.encoder, encodeValuesOnly: "boolean" == typeof t7.encodeValuesOnly ? t7.encodeValuesOnly : R.encodeValuesOnly, filter: o3, format: e3, formatter: n4, serializeDate: "function" == typeof t7.serializeDate ? t7.serializeDate : R.serializeDate, skipNulls: "boolean" == typeof t7.skipNulls ? t7.skipNulls : R.skipNulls, sort: "function" == typeof t7.sort ? t7.sort : null, strictNullHandling: "boolean" == typeof t7.strictNullHandling ? t7.strictNullHandling : R.strictNullHandling };
      }(r3);
      "function" == typeof o2.filter ? n3 = (0, o2.filter)("", n3) : g(o2.filter) && (e2 = o2.filter);
      var i3 = [];
      if ("object" != typeof n3 || null === n3)
        return "";
      var u3 = h[r3 && r3.arrayFormat in h ? r3.arrayFormat : r3 && "indices" in r3 ? r3.indices ? "indices" : "repeat" : "indices"];
      e2 || (e2 = Object.keys(n3)), o2.sort && e2.sort(o2.sort);
      for (var f3 = 0; f3 < e2.length; ++f3) {
        var a2 = e2[f3];
        o2.skipNulls && null === n3[a2] || w(i3, S(n3[a2], a2, u3, o2.strictNullHandling, o2.skipNulls, o2.encode ? o2.encoder : null, o2.filter, o2.sort, o2.allowDots, o2.serializeDate, o2.format, o2.formatter, o2.encodeValuesOnly, o2.charset));
      }
      var c2 = i3.join(o2.delimiter), s2 = true === o2.addQueryPrefix ? "?" : "";
      return o2.charsetSentinel && (s2 += "iso-8859-1" === o2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), c2.length > 0 ? s2 + c2 : "";
    }(e({}, r2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: function(t6, r3) {
      return "boolean" == typeof t6 ? Number(t6) : r3(t6);
    } });
  }, f2.v = function(t5) {
    var r2 = this;
    t5 ? this.t.absolute && t5.startsWith("/") && (t5 = this.p().host + t5) : t5 = this.h();
    var n3 = {}, o2 = Object.entries(this.t.routes).find(function(e2) {
      return n3 = new F(e2[0], e2[1], r2.t).matchesUrl(t5);
    }) || [void 0, void 0];
    return e({ name: o2[0] }, n3, { route: o2[1] });
  }, f2.h = function() {
    var t5 = this.p(), r2 = t5.pathname, e2 = t5.search;
    return (this.t.absolute ? t5.host + r2 : r2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + e2;
  }, f2.current = function(t5, r2) {
    var n3 = this.v(), o2 = n3.name, i3 = n3.params, u3 = n3.query, f3 = n3.route;
    if (!t5)
      return o2;
    var a2 = new RegExp("^" + t5.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$").test(o2);
    if ([null, void 0].includes(r2) || !a2)
      return a2;
    var c2 = new F(o2, f3, this.t);
    r2 = this.l(r2, c2);
    var l2 = e({}, i3, u3);
    return !(!Object.values(r2).every(function(t6) {
      return !t6;
    }) || Object.values(l2).some(function(t6) {
      return void 0 !== t6;
    })) || Object.entries(r2).every(function(t6) {
      return l2[t6[0]] == t6[1];
    });
  }, f2.p = function() {
    var t5, r2, e2, n3, o2, i3, u3 = "undefined" != typeof window ? window.location : {}, f3 = u3.host, a2 = u3.pathname, c2 = u3.search;
    return { host: null != (t5 = null == (r2 = this.t.location) ? void 0 : r2.host) ? t5 : void 0 === f3 ? "" : f3, pathname: null != (e2 = null == (n3 = this.t.location) ? void 0 : n3.pathname) ? e2 : void 0 === a2 ? "" : a2, search: null != (o2 = null == (i3 = this.t.location) ? void 0 : i3.search) ? o2 : void 0 === c2 ? "" : c2 };
  }, f2.has = function(t5) {
    return Object.keys(this.t.routes).includes(t5);
  }, f2.l = function(t5, r2) {
    var n3 = this;
    void 0 === t5 && (t5 = {}), void 0 === r2 && (r2 = this.i), null != t5 || (t5 = {}), t5 = ["string", "number"].includes(typeof t5) ? [t5] : t5;
    var o2 = r2.parameterSegments.filter(function(t6) {
      return !n3.t.defaults[t6.name];
    });
    if (Array.isArray(t5))
      t5 = t5.reduce(function(t6, r3, n4) {
        var i4, u3;
        return e({}, t6, o2[n4] ? ((i4 = {})[o2[n4].name] = r3, i4) : "object" == typeof r3 ? r3 : ((u3 = {})[r3] = "", u3));
      }, {});
    else if (1 === o2.length && !t5[o2[0].name] && (t5.hasOwnProperty(Object.values(r2.bindings)[0]) || t5.hasOwnProperty("id"))) {
      var i3;
      (i3 = {})[o2[0].name] = t5, t5 = i3;
    }
    return e({}, this.g(r2), this.m(t5, r2));
  }, f2.g = function(t5) {
    var r2 = this;
    return t5.parameterSegments.filter(function(t6) {
      return r2.t.defaults[t6.name];
    }).reduce(function(t6, n3, o2) {
      var i3, u3 = n3.name;
      return e({}, t6, ((i3 = {})[u3] = r2.t.defaults[u3], i3));
    }, {});
  }, f2.m = function(t5, r2) {
    var n3 = r2.bindings, o2 = r2.parameterSegments;
    return Object.entries(t5).reduce(function(t6, r3) {
      var i3, u3, f3 = r3[0], a2 = r3[1];
      if (!a2 || "object" != typeof a2 || Array.isArray(a2) || !o2.some(function(t7) {
        return t7.name === f3;
      }))
        return e({}, t6, ((u3 = {})[f3] = a2, u3));
      if (!a2.hasOwnProperty(n3[f3])) {
        if (!a2.hasOwnProperty("id"))
          throw new Error("Ziggy error: object passed as '" + f3 + "' parameter is missing route model binding key '" + n3[f3] + "'.");
        n3[f3] = "id";
      }
      return e({}, t6, ((i3 = {})[f3] = a2[n3[f3]], i3));
    }, {});
  }, f2.valueOf = function() {
    return this.toString();
  }, f2.check = function(t5) {
    return this.has(t5);
  }, r(u2, [{ key: "params", get: function() {
    var t5 = this.v();
    return e({}, t5.params, t5.query);
  } }]), u2;
}(/* @__PURE__ */ u(String));
function A(t4, r2, e2, n2) {
  var o2 = new P(t4, r2, e2, n2);
  return t4 ? o2.toString() : o2;
}
const appName = "Laravel";
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/ActivityLog/Index.jsx": () => import("./assets/Index-fe7fa4ac.js"), "./Pages/Admin/ActivityType/AddEdit.jsx": () => import("./assets/AddEdit-54c939d5.js"), "./Pages/Admin/ActivityType/Index.jsx": () => import("./assets/Index-6fbab603.js"), "./Pages/Admin/Amenity/AddEdit.jsx": () => import("./assets/AddEdit-e713d5a0.js"), "./Pages/Admin/Amenity/Index.jsx": () => import("./assets/Index-4f85105e.js"), "./Pages/Admin/Dashboard/Index.jsx": () => import("./assets/Index-c39e36cd.js"), "./Pages/Admin/Property/AddEdit.jsx": () => import("./assets/AddEdit-c0337c56.js"), "./Pages/Admin/Property/Index.jsx": () => import("./assets/Index-e7e7db68.js"), "./Pages/Admin/PropertyType/AddEdit.jsx": () => import("./assets/AddEdit-c3cae468.js"), "./Pages/Admin/PropertyType/Index.jsx": () => import("./assets/Index-68238402.js"), "./Pages/Admin/Setting/Index.jsx": () => import("./assets/Index-310b23c3.js"), "./Pages/Admin/Setting/Password.jsx": () => import("./assets/Password-3358bdb0.js"), "./Pages/Admin/Setting/Profile.jsx": () => import("./assets/Profile-f1402222.js"), "./Pages/Admin/Status/AddEdit.jsx": () => import("./assets/AddEdit-85fad0a1.js"), "./Pages/Admin/Status/Index.jsx": () => import("./assets/Index-e7186056.js"), "./Pages/Admin/User/AddEdit.jsx": () => import("./assets/AddEdit-bb3ed7c2.js"), "./Pages/Admin/User/Index.jsx": () => import("./assets/Index-02ab020f.js"), "./Pages/Affiliate/Payment/Confirmation.jsx": () => import("./assets/Confirmation-a78fb786.js"), "./Pages/Affiliate/Payment/Index.jsx": () => import("./assets/Index-83a5ed8f.js"), "./Pages/Affiliate/Referral/Index.jsx": () => import("./assets/Index-1e03e80c.js"), "./Pages/Affiliate/Setting/Bank.jsx": () => import("./assets/Bank-2fafca02.js"), "./Pages/Affiliate/Setting/Index.jsx": () => import("./assets/Index-1e3072f7.js"), "./Pages/Affiliate/Setting/Password.jsx": () => import("./assets/Password-b53f6fe1.js"), "./Pages/Affiliate/Setting/Profile.jsx": () => import("./assets/Profile-7d7d0351.js"), "./Pages/Affiliate/Wallet/Dashboard.jsx": () => import("./assets/Dashboard-709ac11e.js"), "./Pages/Affiliate/Wallet/Index.jsx": () => import("./assets/Index-64f0d90a.js"), "./Pages/Affiliate/Wallet/Payout.jsx": () => import("./assets/Payout-14f0b037.js"), "./Pages/Affiliate/Wallet/Renewal.jsx": () => import("./assets/Renewal-e968517c.js"), "./Pages/Agent/ActivityLog/Index.jsx": () => import("./assets/Index-5bf123b2.js"), "./Pages/Agent/Buyer/AddEdit.jsx": () => import("./assets/AddEdit-8b944039.js"), "./Pages/Agent/Buyer/Detail.jsx": () => import("./assets/Detail-588014bb.js"), "./Pages/Agent/Buyer/Import.jsx": () => import("./assets/Import-ceb39789.js"), "./Pages/Agent/Buyer/Index.jsx": () => import("./assets/Index-483e3c1f.js"), "./Pages/Agent/Buyer/Request.jsx": () => import("./assets/Request-6cb4467d.js"), "./Pages/Agent/Customer/List/AddEdit.jsx": () => import("./assets/AddEdit-b3122d35.js"), "./Pages/Agent/Customer/List/Index.jsx": () => import("./assets/Index-be070b5d.js"), "./Pages/Agent/Customer/Partials/Nav.jsx": () => import("./assets/Nav-5e5de205.js"), "./Pages/Agent/Dashboard/Index.jsx": () => import("./assets/Index-56fbefd1.js"), "./Pages/Agent/Developer/AddEdit.jsx": () => import("./assets/AddEdit-03b39bff.js"), "./Pages/Agent/Developer/AdminIndex.jsx": () => import("./assets/AdminIndex-0cf55fc5.js"), "./Pages/Agent/Developer/Index.jsx": () => import("./assets/Index-7aab76ed.js"), "./Pages/Agent/Followup/Index.jsx": () => import("./assets/Index-fcd60a4b.js"), "./Pages/Agent/Leaser/AddEdit.jsx": () => import("./assets/AddEdit-fc5bf3ad.js"), "./Pages/Agent/Leaser/Detail.jsx": () => import("./assets/Detail-e38f19c5.js"), "./Pages/Agent/Leaser/Import.jsx": () => import("./assets/Import-31dd8422.js"), "./Pages/Agent/Leaser/Index.jsx": () => import("./assets/Index-3b381ebe.js"), "./Pages/Agent/Leaser/List.jsx": () => import("./assets/List-498a5248.js"), "./Pages/Agent/Leaser/Request.jsx": () => import("./assets/Request-4bb00831.js"), "./Pages/Agent/Location/AddEdit.jsx": () => import("./assets/AddEdit-ac2577c7.js"), "./Pages/Agent/Location/AdminIndex.jsx": () => import("./assets/AdminIndex-df76a02f.js"), "./Pages/Agent/Location/Index.jsx": () => import("./assets/Index-197d3cdb.js"), "./Pages/Agent/Meeting/Index.jsx": () => import("./assets/Index-f0f6b741.js"), "./Pages/Agent/Payment/Confirmation.jsx": () => import("./assets/Confirmation-4cd41954.js"), "./Pages/Agent/Payment/Index.jsx": () => import("./assets/Index-03e833de.js"), "./Pages/Agent/Project/AddEdit.jsx": () => import("./assets/AddEdit-f8fbc78f.js"), "./Pages/Agent/Project/Index.jsx": () => import("./assets/Index-1f0f0bf0.js"), "./Pages/Agent/Project/Partials/TabDetail.jsx": () => import("./assets/TabDetail-9f873c97.js"), "./Pages/Agent/Project/Partials/TabDoc.jsx": () => import("./assets/TabDoc-0f8055c8.js"), "./Pages/Agent/Project/Partials/TabInfo.jsx": () => import("./assets/TabInfo-d3054c8f.js"), "./Pages/Agent/Project/View.jsx": () => import("./assets/View-16d96f25.js"), "./Pages/Agent/ProjectDetail/AddEdit.jsx": () => import("./assets/AddEdit-681a1d54.js"), "./Pages/Agent/ProjectDetail/Index.jsx": () => import("./assets/Index-bb91d65f.js"), "./Pages/Agent/ProjectDoc/AddEdit.jsx": () => import("./assets/AddEdit-02cdf724.js"), "./Pages/Agent/ProjectDoc/Index.jsx": () => import("./assets/Index-4df4d7a3.js"), "./Pages/Agent/Referral/Index.jsx": () => import("./assets/Index-1f7622ef.js"), "./Pages/Agent/Seller/AddEdit.jsx": () => import("./assets/AddEdit-2d12c943.js"), "./Pages/Agent/Seller/Detail.jsx": () => import("./assets/Detail-fe4682cb.js"), "./Pages/Agent/Seller/Import.jsx": () => import("./assets/Import-295d9dad.js"), "./Pages/Agent/Seller/Index.jsx": () => import("./assets/Index-0c1c3cb1.js"), "./Pages/Agent/Seller/List.jsx": () => import("./assets/List-76bddcea.js"), "./Pages/Agent/Seller/Request.jsx": () => import("./assets/Request-7bedce2f.js"), "./Pages/Agent/Setting/Bank.jsx": () => import("./assets/Bank-8099bc60.js"), "./Pages/Agent/Setting/Index.jsx": () => import("./assets/Index-1f793a68.js"), "./Pages/Agent/Setting/Password.jsx": () => import("./assets/Password-0435e0f3.js"), "./Pages/Agent/Setting/Profile.jsx": () => import("./assets/Profile-d1348e58.js"), "./Pages/Agent/Tenant/AddEdit.jsx": () => import("./assets/AddEdit-46096a0a.js"), "./Pages/Agent/Tenant/Detail.jsx": () => import("./assets/Detail-61c00d3e.js"), "./Pages/Agent/Tenant/Import.jsx": () => import("./assets/Import-3860e7b3.js"), "./Pages/Agent/Tenant/Index.jsx": () => import("./assets/Index-368faa89.js"), "./Pages/Agent/Tenant/Request.jsx": () => import("./assets/Request-9c432ff4.js"), "./Pages/Agent/Viewing/Index.jsx": () => import("./assets/Index-97f3a34d.js"), "./Pages/Agent/Wallet/Dashboard.jsx": () => import("./assets/Dashboard-4564dda9.js"), "./Pages/Agent/Wallet/Index.jsx": () => import("./assets/Index-4e4ba069.js"), "./Pages/Agent/Wallet/Payout.jsx": () => import("./assets/Payout-109a3f03.js"), "./Pages/Agent/Wallet/Renewal.jsx": () => import("./assets/Renewal-9ac4b001.js"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-60faa3c2.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-3b84ecb1.js"), "./Pages/Auth/PaymentConfirmation.jsx": () => import("./assets/PaymentConfirmation-71a0ed02.js"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-ea5d7316.js"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-3b5b72cd.js"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-f09bc862.js"), "./Pages/Error.jsx": () => import("./assets/Error-a0e4e906.js") })),
    setup: ({ App, props }) => {
      global.route = (name, params, absolute) => A(name, params, absolute, {
        ...page.props.ziggy,
        location: new URL(page.props.ziggy.location)
      });
      return /* @__PURE__ */ jsx(App, { ...props });
    }
  })
);
