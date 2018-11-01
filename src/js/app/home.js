(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;
},{}],2:[function(require,module,exports){
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _template = _interopRequireDefault(require("../common/template"));

var data = {
  title: '基本例子12345',
  isAdmin: true,
  list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
};
var html = (0, _template.default)('test', data);
document.getElementById('home').innerHTML = html;
},{"../common/template":5,"@babel/runtime/helpers/interopRequireDefault":1}],5:[function(require,module,exports){
(function (process){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

/*! art-template@4.13.1 for browser | https://github.com/aui/art-template */
!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : (0, _typeof2.default)(exports)) && "object" == (typeof module === "undefined" ? "undefined" : (0, _typeof2.default)(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === "undefined" ? "undefined" : (0, _typeof2.default)(exports)) ? exports.template = t() : e.template = t();
}("undefined" != typeof self ? self : void 0, function () {
  return function (e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var i = n[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
    }

    var n = {};
    return t.m = e, t.c = n, t.d = function (e, n, r) {
      t.o(e, n) || Object.defineProperty(e, n, {
        configurable: !1,
        enumerable: !0,
        get: r
      });
    }, t.n = function (e) {
      var n = e && e.__esModule ? function () {
        return e["default"];
      } : function () {
        return e;
      };
      return t.d(n, "a", n), n;
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 4);
  }([function (e, t, n) {
    "use strict";

    var r = n(6),
        i = n(2),
        o = n(22),
        s = function s(e, t) {
      t.onerror(e, t);

      var n = function n() {
        return "{Template Error}";
      };

      return n.mappings = [], n.sourcesContent = [], n;
    },
        a = function u(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      "string" != typeof e ? t = e : t.source = e, t = i.$extend(t), e = t.source, !0 === t.debug && (t.cache = !1, t.minimize = !1, t.compileDebug = !0), t.compileDebug && (t.minimize = !1), t.filename && (t.filename = t.resolveFilename(t.filename, t));
      var n = t.filename,
          a = t.cache,
          c = t.caches;

      if (a && n) {
        var l = c.get(n);
        if (l) return l;
      }

      if (!e) try {
        e = t.loader(n, t), t.source = e;
      } catch (d) {
        var f = new o({
          name: "CompileError",
          path: n,
          message: "template not found: " + d.message,
          stack: d.stack
        });
        if (t.bail) throw f;
        return s(f, t);
      }
      var p = void 0,
          h = new r(t);

      try {
        p = h.build();
      } catch (f) {
        if (f = new o(f), t.bail) throw f;
        return s(f, t);
      }

      var m = function m(e, n) {
        try {
          return p(e, n);
        } catch (f) {
          if (!t.compileDebug) return t.cache = !1, t.compileDebug = !0, u(t)(e, n);
          if (f = new o(f), t.bail) throw f;
          return s(f, t)();
        }
      };

      return m.mappings = p.mappings, m.sourcesContent = p.sourcesContent, m.toString = function () {
        return p.toString();
      }, a && n && c.set(n, m), m;
    };

    a.Compiler = r, e.exports = a;
  }, function (e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyu]{1,5}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g, t.matchToToken = function (e) {
      var t = {
        type: "invalid",
        value: e[0]
      };
      return e[1] ? (t.type = "string", t.closed = !(!e[3] && !e[4])) : e[5] ? t.type = "comment" : e[6] ? (t.type = "comment", t.closed = !!e[7]) : e[8] ? t.type = "regex" : e[9] ? t.type = "number" : e[10] ? t.type = "name" : e[11] ? t.type = "punctuator" : e[12] && (t.type = "whitespace"), t;
    };
  }, function (e, t, n) {
    "use strict";

    function r() {
      this.$extend = function (e) {
        return e = e || {}, o(e, e instanceof r ? e : this);
      };
    }

    var i = n(10),
        o = n(12),
        s = n(13),
        a = n(14),
        u = n(15),
        c = n(16),
        l = n(17),
        f = n(18),
        p = n(19),
        h = n(21),
        m = "undefined" == typeof window,
        d = {
      source: null,
      filename: null,
      rules: [f, l],
      escape: !0,
      debug: !!m && "production" !== process.env.NODE_ENV,
      bail: !0,
      cache: !0,
      minimize: !0,
      compileDebug: !1,
      resolveFilename: h,
      include: s,
      htmlMinifier: p,
      htmlMinifierOptions: {
        collapseWhitespace: !0,
        minifyCSS: !0,
        minifyJS: !0,
        ignoreCustomFragments: []
      },
      onerror: a,
      loader: c,
      caches: u,
      root: "/",
      extname: ".art",
      ignore: [],
      imports: i
    };
    r.prototype = d, e.exports = new r();
  }, function (e, t) {}, function (e, t, n) {
    "use strict";

    var r = n(5),
        i = n(0),
        o = n(23),
        s = function s(e, t) {
      return t instanceof Object ? r({
        filename: e
      }, t) : i({
        filename: e,
        source: t
      });
    };

    s.render = r, s.compile = i, s.defaults = o, e.exports = s;
  }, function (e, t, n) {
    "use strict";

    var r = n(0),
        i = function i(e, t, n) {
      return r(e, n)(t);
    };

    e.exports = i;
  }, function (e, t, n) {
    "use strict";

    function r(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    function i(e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) {
          n[t] = e[t];
        }

        return n;
      }

      return Array.from(e);
    }

    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    var s = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }

      return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        a = n(7),
        u = n(9),
        c = "$data",
        l = "$imports",
        f = "print",
        p = "include",
        h = "extend",
        m = "block",
        d = "$$out",
        v = "$$line",
        g = "$$blocks",
        y = "$$slice",
        b = "$$from",
        w = "$$options",
        x = function x(e, t) {
      return Object.hasOwnProperty.call(e, t);
    },
        k = JSON.stringify,
        E = function () {
      function e(t) {
        var n,
            s,
            a = this;
        o(this, e);
        var x = t.source,
            k = t.minimize,
            E = t.htmlMinifier;
        if (this.options = t, this.stacks = [], this.context = [], this.scripts = [], this.CONTEXT_MAP = {}, this.ignore = [c, l, w].concat(i(t.ignore)), this.internal = (n = {}, r(n, d, "''"), r(n, v, "[0,0]"), r(n, g, "arguments[1]||{}"), r(n, b, "null"), r(n, f, "function(){var s=''.concat.apply('',arguments);" + d + "+=s;return s}"), r(n, p, "function(src,data){var s=" + w + ".include(src,data||" + c + ",arguments[2]||" + g + "," + w + ");" + d + "+=s;return s}"), r(n, h, "function(from){" + b + "=from}"), r(n, y, "function(c,p,s){p=" + d + ";" + d + "='';c();s=" + d + ";" + d + "=p+s;return s}"), r(n, m, "function(){var a=arguments,s;if(typeof a[0]==='function'){return " + y + "(a[0])}else if(" + b + "){if(!" + g + "[a[0]]){" + g + "[a[0]]=" + y + "(a[1])}else{" + d + "+=" + g + "[a[0]]}}else{s=" + g + "[a[0]];if(typeof s==='string'){" + d + "+=s}else{s=" + y + "(a[1])}return s}}"), n), this.dependencies = (s = {}, r(s, f, [d]), r(s, p, [d, w, c, g]), r(s, h, [b, p]), r(s, m, [y, b, d, g]), s), this.importContext(d), t.compileDebug && this.importContext(v), k) try {
          x = E(x, t);
        } catch (T) {}
        this.source = x, this.getTplTokens(x, t.rules, this).forEach(function (e) {
          e.type === u.TYPE_STRING ? a.parseString(e) : a.parseExpression(e);
        });
      }

      return s(e, [{
        key: "getTplTokens",
        value: function value() {
          return u.apply(undefined, arguments);
        }
      }, {
        key: "getEsTokens",
        value: function value(e) {
          return a(e);
        }
      }, {
        key: "getVariables",
        value: function value(e) {
          var t = !1;
          return e.filter(function (e) {
            return "whitespace" !== e.type && "comment" !== e.type;
          }).filter(function (e) {
            return "name" === e.type && !t || (t = "punctuator" === e.type && "." === e.value, !1);
          }).map(function (e) {
            return e.value;
          });
        }
      }, {
        key: "importContext",
        value: function value(e) {
          var t = this,
              n = "",
              r = this.internal,
              i = this.dependencies,
              o = this.ignore,
              s = this.context,
              a = this.options,
              u = a.imports,
              f = this.CONTEXT_MAP;
          x(f, e) || -1 !== o.indexOf(e) || (x(r, e) ? (n = r[e], x(i, e) && i[e].forEach(function (e) {
            return t.importContext(e);
          })) : n = "$escape" === e || "$each" === e || x(u, e) ? l + "." + e : c + "." + e, f[e] = n, s.push({
            name: e,
            value: n
          }));
        }
      }, {
        key: "parseString",
        value: function value(e) {
          var t = e.value;

          if (t) {
            var n = d + "+=" + k(t);
            this.scripts.push({
              source: t,
              tplToken: e,
              code: n
            });
          }
        }
      }, {
        key: "parseExpression",
        value: function value(e) {
          var t = this,
              n = e.value,
              r = e.script,
              i = r.output,
              o = this.options.escape,
              s = r.code;
          i && (s = !1 === o || i === u.TYPE_RAW ? d + "+=" + r.code : d + "+=$escape(" + r.code + ")");
          var a = this.getEsTokens(s);
          this.getVariables(a).forEach(function (e) {
            return t.importContext(e);
          }), this.scripts.push({
            source: n,
            tplToken: e,
            code: s
          });
        }
      }, {
        key: "checkExpression",
        value: function value(e) {
          for (var t = [[/^\s*}[\w\W]*?{?[\s;]*$/, ""], [/(^[\w\W]*?\([\w\W]*?(?:=>|\([\w\W]*?\))\s*{[\s;]*$)/, "$1})"], [/(^[\w\W]*?\([\w\W]*?\)\s*{[\s;]*$)/, "$1}"]], n = 0; n < t.length;) {
            if (t[n][0].test(e)) {
              var r;
              e = (r = e).replace.apply(r, i(t[n]));
              break;
            }

            n++;
          }

          try {
            return new Function(e), !0;
          } catch (o) {
            return !1;
          }
        }
      }, {
        key: "build",
        value: function value() {
          var e = this.options,
              t = this.context,
              n = this.scripts,
              r = this.stacks,
              i = this.source,
              o = e.filename,
              s = e.imports,
              a = [],
              f = x(this.CONTEXT_MAP, h),
              m = 0,
              y = function y(e, t) {
            var n = t.line,
                i = t.start,
                o = {
              generated: {
                line: r.length + m + 1,
                column: 1
              },
              original: {
                line: n + 1,
                column: i + 1
              }
            };
            return m += e.split(/\n/).length - 1, o;
          },
              E = function E(e) {
            return e.replace(/^[\t ]+|[\t ]$/g, "");
          };

          r.push("function(" + c + "){"), r.push("'use strict'"), r.push(c + "=" + c + "||{}"), r.push("var " + t.map(function (e) {
            return e.name + "=" + e.value;
          }).join(",")), e.compileDebug ? (r.push("try{"), n.forEach(function (e) {
            e.tplToken.type === u.TYPE_EXPRESSION && r.push(v + "=[" + [e.tplToken.line, e.tplToken.start].join(",") + "]"), a.push(y(e.code, e.tplToken)), r.push(E(e.code));
          }), r.push("}catch(error){"), r.push("throw {" + ["name:'RuntimeError'", "path:" + k(o), "message:error.message", "line:" + v + "[0]+1", "column:" + v + "[1]+1", "source:" + k(i), "stack:error.stack"].join(",") + "}"), r.push("}")) : n.forEach(function (e) {
            a.push(y(e.code, e.tplToken)), r.push(E(e.code));
          }), f && (r.push(d + "=''"), r.push(p + "(" + b + "," + c + "," + g + ")")), r.push("return " + d), r.push("}");
          var T = r.join("\n");

          try {
            var O = new Function(l, w, "return " + T)(s, e);
            return O.mappings = a, O.sourcesContent = [i], O;
          } catch (P) {
            for (var $ = 0, j = 0, _ = 0, S = void 0; $ < n.length;) {
              var C = n[$];

              if (!this.checkExpression(C.code)) {
                j = C.tplToken.line, _ = C.tplToken.start, S = C.code;
                break;
              }

              $++;
            }

            throw {
              name: "CompileError",
              path: o,
              message: P.message,
              line: j + 1,
              column: _ + 1,
              source: i,
              generated: S,
              stack: P.stack
            };
          }
        }
      }]), e;
    }();

    E.CONSTS = {
      DATA: c,
      IMPORTS: l,
      PRINT: f,
      INCLUDE: p,
      EXTEND: h,
      BLOCK: m,
      OPTIONS: w,
      OUT: d,
      LINE: v,
      BLOCKS: g,
      SLICE: y,
      FROM: b,
      ESCAPE: "$escape",
      EACH: "$each"
    }, e.exports = E;
  }, function (e, t, n) {
    "use strict";

    var r = n(8),
        i = n(1)["default"],
        o = n(1).matchToToken,
        s = function s(e) {
      return e.match(i).map(function (e) {
        return i.lastIndex = 0, o(i.exec(e));
      }).map(function (e) {
        return "name" === e.type && r(e.value) && (e.type = "keyword"), e;
      });
    };

    e.exports = s;
  }, function (e, t, n) {
    "use strict";

    var r = {
      "abstract": !0,
      await: !0,
      "boolean": !0,
      "break": !0,
      "byte": !0,
      "case": !0,
      "catch": !0,
      "char": !0,
      "class": !0,
      "const": !0,
      "continue": !0,
      "debugger": !0,
      "default": !0,
      "delete": !0,
      "do": !0,
      "double": !0,
      "else": !0,
      "enum": !0,
      "export": !0,
      "extends": !0,
      "false": !0,
      "final": !0,
      "finally": !0,
      "float": !0,
      "for": !0,
      "function": !0,
      "goto": !0,
      "if": !0,
      "implements": !0,
      "import": !0,
      "in": !0,
      "instanceof": !0,
      "int": !0,
      "interface": !0,
      "let": !0,
      "long": !0,
      "native": !0,
      "new": !0,
      "null": !0,
      "package": !0,
      "private": !0,
      "protected": !0,
      "public": !0,
      "return": !0,
      "short": !0,
      "static": !0,
      "super": !0,
      "switch": !0,
      "synchronized": !0,
      "this": !0,
      "throw": !0,
      "transient": !0,
      "true": !0,
      "try": !0,
      "typeof": !0,
      "var": !0,
      "void": !0,
      "volatile": !0,
      "while": !0,
      "with": !0,
      "yield": !0
    };

    e.exports = function (e) {
      return r.hasOwnProperty(e);
    };
  }, function (e, t, n) {
    "use strict";

    function r(e) {
      var t = new String(e.value);
      return t.line = e.line, t.start = e.start, t.end = e.end, t;
    }

    function i(e, t, n) {
      this.type = e, this.value = t, this.script = null, n ? (this.line = n.line + n.value.split(/\n/).length - 1, this.line === n.line ? this.start = n.end : this.start = n.value.length - n.value.lastIndexOf("\n") - 1) : (this.line = 0, this.start = 0), this.end = this.start + this.value.length;
    }

    var o = function o(e, t) {
      for (var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}, o = [new i("string", e)], s = 0; s < t.length; s++) {
        for (var a = t[s], u = a.test.ignoreCase ? "ig" : "g", c = new RegExp(a.test.source, u), l = 0; l < o.length; l++) {
          var f = o[l],
              p = o[l - 1];

          if ("string" === f.type) {
            for (var h = void 0, m = 0, d = [], v = f.value; null !== (h = c.exec(v));) {
              h.index > m && (p = new i("string", v.slice(m, h.index), p), d.push(p)), p = new i("expression", h[0], p), h[0] = r(p), p.script = a.use.apply(n, h), d.push(p), m = h.index + h[0].length;
            }

            m < v.length && (p = new i("string", v.slice(m), p), d.push(p)), o.splice.apply(o, [l, 1].concat(d)), l += d.length - 1;
          }
        }
      }

      return o;
    };

    o.TYPE_STRING = "string", o.TYPE_EXPRESSION = "expression", o.TYPE_RAW = "raw", o.TYPE_ESCAPE = "escape", e.exports = o;
  }, function (e, t, n) {
    "use strict";

    (function (t) {
      function n(e) {
        return "string" != typeof e && (e = e === undefined || null === e ? "" : "function" == typeof e ? n(e.call(e)) : JSON.stringify(e)), e;
      }

      function r(e) {
        var t = "" + e,
            n = s.exec(t);
        if (!n) return e;
        var r = "",
            i = void 0,
            o = void 0,
            a = void 0;

        for (i = n.index, o = 0; i < t.length; i++) {
          switch (t.charCodeAt(i)) {
            case 34:
              a = "&#34;";
              break;

            case 38:
              a = "&#38;";
              break;

            case 39:
              a = "&#39;";
              break;

            case 60:
              a = "&#60;";
              break;

            case 62:
              a = "&#62;";
              break;

            default:
              continue;
          }

          o !== i && (r += t.substring(o, i)), o = i + 1, r += a;
        }

        return o !== i ? r + t.substring(o, i) : r;
      }
      /*! art-template@runtime | https://github.com/aui/art-template */


      var i = "undefined" == typeof window,
          o = Object.create(i ? t : window),
          s = /["&'<>]/;
      o.$escape = function (e) {
        return r(n(e));
      }, o.$each = function (e, t) {
        if (Array.isArray(e)) for (var n = 0, r = e.length; n < r; n++) {
          t(e[n], n);
        } else for (var i in e) {
          t(e[i], i);
        }
      }, e.exports = o;
    }).call(t, n(11));
  }, function (e, t) {
    var n;

    n = function () {
      return this;
    }();

    try {
      n = n || Function("return this")() || (0, eval)("this");
    } catch (r) {
      "object" == (typeof window === "undefined" ? "undefined" : (0, _typeof2.default)(window)) && (n = window);
    }

    e.exports = n;
  }, function (e, t, n) {
    "use strict";

    var r = Object.prototype.toString,
        i = function i(e) {
      return null === e ? "Null" : r.call(e).slice(8, -1);
    },
        o = function s(e, t) {
      var n = void 0,
          r = i(e);

      if ("Object" === r ? n = Object.create(t || {}) : "Array" === r && (n = [].concat(t || [])), n) {
        for (var o in e) {
          Object.hasOwnProperty.call(e, o) && (n[o] = s(e[o], n[o]));
        }

        return n;
      }

      return e;
    };

    e.exports = o;
  }, function (e, t, n) {
    "use strict";

    var r = function r(e, t, _r, i) {
      var o = n(0);
      return i = i.$extend({
        filename: i.resolveFilename(e, i),
        bail: !0,
        source: null
      }), o(i)(t, _r);
    };

    e.exports = r;
  }, function (e, t, n) {
    "use strict";

    var r = function r(e) {
      console.error(e.name, e.message);
    };

    e.exports = r;
  }, function (e, t, n) {
    "use strict";

    var r = {
      __data: Object.create(null),
      set: function set(e, t) {
        this.__data[e] = t;
      },
      get: function get(e) {
        return this.__data[e];
      },
      reset: function reset() {
        this.__data = {};
      }
    };
    e.exports = r;
  }, function (e, t, n) {
    "use strict";

    var r = "undefined" == typeof window,
        i = function i(e) {
      if (r) {
        return n(3).readFileSync(e, "utf8");
      }

      var t = document.getElementById(e);
      return t.value || t.innerHTML;
    };

    e.exports = i;
  }, function (e, t, n) {
    "use strict";

    var r = {
      test: /{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}/,
      use: function use(e, t, n, i) {
        var o = this,
            s = o.options,
            a = o.getEsTokens(i),
            u = a.map(function (e) {
          return e.value;
        }),
            c = {},
            l = void 0,
            f = !!t && "raw",
            p = n + u.shift(),
            h = function h(t, n) {
          console.warn((s.filename || "anonymous") + ":" + (e.line + 1) + ":" + (e.start + 1) + "\nTemplate upgrade: {{" + t + "}} -> {{" + n + "}}");
        };

        switch ("#" === t && h("#value", "@value"), p) {
          case "set":
            i = "var " + u.join("").trim();
            break;

          case "if":
            i = "if(" + u.join("").trim() + "){";
            break;

          case "else":
            var m = u.indexOf("if");
            ~m ? (u.splice(0, m + 1), i = "}else if(" + u.join("").trim() + "){") : i = "}else{";
            break;

          case "/if":
            i = "}";
            break;

          case "each":
            l = r._split(a), l.shift(), "as" === l[1] && (h("each object as value index", "each object value index"), l.splice(1, 1));
            i = "$each(" + (l[0] || "$data") + ",function(" + (l[1] || "$value") + "," + (l[2] || "$index") + "){";
            break;

          case "/each":
            i = "})";
            break;

          case "block":
            l = r._split(a), l.shift(), i = "block(" + l.join(",").trim() + ",function(){";
            break;

          case "/block":
            i = "})";
            break;

          case "echo":
            p = "print", h("echo value", "value");

          case "print":
          case "include":
          case "extend":
            if (0 !== u.join("").trim().indexOf("(")) {
              l = r._split(a), l.shift(), i = p + "(" + l.join(",") + ")";
              break;
            }

          default:
            if (~u.indexOf("|")) {
              var d = a.reduce(function (e, t) {
                var n = t.value,
                    r = t.type;
                return "|" === n ? e.push([]) : "whitespace" !== r && "comment" !== r && (e.length || e.push([]), ":" === n && 1 === e[e.length - 1].length ? h("value | filter: argv", "value | filter argv") : e[e.length - 1].push(t)), e;
              }, []).map(function (e) {
                return r._split(e);
              });
              i = d.reduce(function (e, t) {
                var n = t.shift();
                return t.unshift(e), "$imports." + n + "(" + t.join(",") + ")";
              }, d.shift().join(" ").trim());
            }

            f = f || "escape";
        }

        return c.code = i, c.output = f, c;
      },
      _split: function _split(e) {
        e = e.filter(function (e) {
          var t = e.type;
          return "whitespace" !== t && "comment" !== t;
        });

        for (var t = 0, n = e.shift(), r = /\]|\)/, i = [[n]]; t < e.length;) {
          var o = e[t];
          "punctuator" === o.type || "punctuator" === n.type && !r.test(n.value) ? i[i.length - 1].push(o) : i.push([o]), n = o, t++;
        }

        return i.map(function (e) {
          return e.map(function (e) {
            return e.value;
          }).join("");
        });
      }
    };
    e.exports = r;
  }, function (e, t, n) {
    "use strict";

    var r = {
      test: /<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/,
      use: function use(e, t, n, r) {
        return n = {
          "-": "raw",
          "=": "escape",
          "": !1,
          "==": "raw",
          "=#": "raw"
        }[n], t && (r = "/*" + r + "*/", n = !1), {
          code: r,
          output: n
        };
      }
    };
    e.exports = r;
  }, function (e, t, n) {
    "use strict";

    function r(e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) {
          n[t] = e[t];
        }

        return n;
      }

      return Array.from(e);
    }

    var i = "undefined" == typeof window,
        o = function o(e, t) {
      if (i) {
        var o,
            s = n(20).minify,
            a = t.htmlMinifierOptions,
            u = t.rules.map(function (e) {
          return e.test;
        });
        (o = a.ignoreCustomFragments).push.apply(o, r(u)), e = s(e, a);
      }

      return e;
    };

    e.exports = o;
  }, function (e, t) {
    !function (e) {
      e.noop = function () {};
    }("object" == (0, _typeof2.default)(e) && "object" == (0, _typeof2.default)(e.exports) ? e.exports : window);
  }, function (e, t, n) {
    "use strict";

    var r = "undefined" == typeof window,
        i = /^\.+\//,
        o = function o(e, t) {
      if (r) {
        var o = n(3),
            s = t.root,
            a = t.extname;

        if (i.test(e)) {
          var u = t.filename,
              c = !u || e === u,
              l = c ? s : o.dirname(u);
          e = o.resolve(l, e);
        } else e = o.resolve(s, e);

        o.extname(e) || (e += a);
      }

      return e;
    };

    e.exports = o;
  }, function (e, t, n) {
    "use strict";

    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != (0, _typeof2.default)(t) && "function" != typeof t ? e : t;
    }

    function o(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (0, _typeof2.default)(t));
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }

    function s(e) {
      var t = e.name,
          n = e.source,
          r = e.path,
          i = e.line,
          o = e.column,
          s = e.generated,
          a = e.message;
      if (!n) return a;
      var u = n.split(/\n/),
          c = Math.max(i - 3, 0),
          l = Math.min(u.length, i + 3),
          f = u.slice(c, l).map(function (e, t) {
        var n = t + c + 1;
        return (n === i ? " >> " : "    ") + n + "| " + e;
      }).join("\n");
      return (r || "anonymous") + ":" + i + ":" + o + "\n" + f + "\n\n" + t + ": " + a + (s ? "\n   generated: " + s : "");
    }

    var a = function (e) {
      function t(e) {
        r(this, t);
        var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e.message));
        return n.name = "TemplateError", n.message = s(e), Error.captureStackTrace && Error.captureStackTrace(n, n.constructor), n;
      }

      return o(t, e), t;
    }(Error);

    e.exports = a;
  }, function (e, t, n) {
    "use strict";

    e.exports = n(2);
  }]);
});
}).call(this,require('_process'))
},{"@babel/runtime/helpers/interopRequireDefault":1,"@babel/runtime/helpers/typeof":2,"_process":3}]},{},[4]);