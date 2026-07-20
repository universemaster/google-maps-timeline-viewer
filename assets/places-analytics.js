"use strict";
var PlacesAnalytics = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to2, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to2, key) && key !== except)
          __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to2;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/jsbi/dist/jsbi-umd.js
  var require_jsbi_umd = __commonJS({
    "node_modules/jsbi/dist/jsbi-umd.js"(exports, module) {
      (function(e2, t2) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t2() : "function" == typeof define && define.amd ? define(t2) : (e2 = e2 || self, e2.JSBI = t2());
      })(exports, function() {
        "use strict";
        var e2 = Math.imul, t2 = Math.clz32;
        function i2(t3, i3) {
          (null == i3 || i3 > t3.length) && (i3 = t3.length);
          for (var _3 = 0, o3 = Array(i3); _3 < i3; _3++) o3[_3] = t3[_3];
          return o3;
        }
        function _2(e3) {
          if (Array.isArray(e3)) return e3;
        }
        function n2(t3) {
          if (void 0 === t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t3;
        }
        function o2(i3, t3, _3) {
          return t3 = r2(t3), v2(i3, b2() ? Reflect.construct(t3, _3 || [], r2(i3).constructor) : t3.apply(i3, _3));
        }
        function l2(e3, t3) {
          if (!(e3 instanceof t3)) throw new TypeError("Cannot call a class as a function");
        }
        function g2(i3, t3, e3) {
          if (b2()) return Reflect.construct.apply(null, arguments);
          var _3 = [null];
          _3.push.apply(_3, t3);
          var n3 = new (i3.bind.apply(i3, _3))();
          return e3 && y2(n3, e3.prototype), n3;
        }
        function a2(i3, e3) {
          for (var _3, n3 = 0; n3 < e3.length; n3++) _3 = e3[n3], _3.enumerable = _3.enumerable || false, _3.configurable = true, "value" in _3 && (_3.writable = true), Object.defineProperty(i3, D2(_3.key), _3);
        }
        function s2(i3, e3, _3) {
          return e3 && a2(i3.prototype, e3), _3 && a2(i3, _3), Object.defineProperty(i3, "prototype", { writable: false }), i3;
        }
        function u2(i3, _3) {
          var e3 = "undefined" != typeof Symbol && i3[Symbol.iterator] || i3["@@iterator"];
          if (!e3) {
            if (Array.isArray(i3) || (e3 = B2(i3)) || _3 && i3 && "number" == typeof i3.length) {
              e3 && (i3 = e3);
              var l3 = 0, g3 = function() {
              };
              return { s: g3, n: function() {
                return l3 >= i3.length ? { done: true } : { done: false, value: i3[l3++] };
              }, e: function(e4) {
                throw e4;
              }, f: g3 };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          var s3, d3 = true, h3 = false;
          return { s: function() {
            e3 = e3.call(i3);
          }, n: function() {
            var t3 = e3.next();
            return d3 = t3.done, t3;
          }, e: function(e4) {
            h3 = true, s3 = e4;
          }, f: function() {
            try {
              d3 || null == e3.return || e3.return();
            } finally {
              if (h3) throw s3;
            }
          } };
        }
        function r2(e3) {
          return r2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e4) {
            return e4.__proto__ || Object.getPrototypeOf(e4);
          }, r2(e3);
        }
        function d2(i3, t3) {
          if ("function" != typeof t3 && null !== t3) throw new TypeError("Super expression must either be null or a function");
          i3.prototype = Object.create(t3 && t3.prototype, { constructor: { value: i3, writable: true, configurable: true } }), Object.defineProperty(i3, "prototype", { writable: false }), t3 && y2(i3, t3);
        }
        function h2(e3) {
          try {
            return -1 !== Function.toString.call(e3).indexOf("[native code]");
          } catch (t3) {
            return "function" == typeof e3;
          }
        }
        function b2() {
          try {
            var e3 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (e4) {
          }
          return (b2 = function() {
            return !!e3;
          })();
        }
        function m2(_3, g3) {
          var l3 = null == _3 ? null : "undefined" != typeof Symbol && _3[Symbol.iterator] || _3["@@iterator"];
          if (null != l3) {
            var s3, d3, r3, h3, b3 = [], a3 = true, m3 = false;
            try {
              if (r3 = (l3 = l3.call(_3)).next, 0 === g3) {
                if (Object(l3) !== l3) return;
                a3 = false;
              } else for (; !(a3 = (s3 = r3.call(l3)).done) && (b3.push(s3.value), b3.length !== g3); a3 = true) ;
            } catch (e3) {
              m3 = true, d3 = e3;
            } finally {
              try {
                if (!a3 && null != l3.return && (h3 = l3.return(), Object(h3) !== h3)) return;
              } finally {
                if (m3) throw d3;
              }
            }
            return b3;
          }
        }
        function c2() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function v2(i3, t3) {
          if (t3 && ("object" == typeof t3 || "function" == typeof t3)) return t3;
          if (void 0 !== t3) throw new TypeError("Derived constructors may only return object or undefined");
          return n2(i3);
        }
        function y2(i3, t3) {
          return y2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(i4, t4) {
            return i4.__proto__ = t4, i4;
          }, y2(i3, t3);
        }
        function f2(t3, i3) {
          return _2(t3) || m2(t3, i3) || B2(t3, i3) || c2();
        }
        function k2(_3, t3) {
          if ("object" != typeof _3 || !_3) return _3;
          var n3 = _3[Symbol.toPrimitive];
          if (void 0 !== n3) {
            var e3 = n3.call(_3, t3 || "default");
            if ("object" != typeof e3) return e3;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === t3 ? String : Number)(_3);
        }
        function D2(e3) {
          var t3 = k2(e3, "string");
          return "symbol" == typeof t3 ? t3 : t3 + "";
        }
        function p2(e3) {
          "@babel/helpers - typeof";
          return p2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
            return typeof e4;
          } : function(e4) {
            return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
          }, p2(e3);
        }
        function B2(e3, _3) {
          if (e3) {
            if ("string" == typeof e3) return i2(e3, _3);
            var n3 = {}.toString.call(e3).slice(8, -1);
            return "Object" === n3 && e3.constructor && (n3 = e3.constructor.name), "Map" === n3 || "Set" === n3 ? Array.from(e3) : "Arguments" === n3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3) ? i2(e3, _3) : void 0;
          }
        }
        function S2(e3) {
          var i3 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
          return S2 = function(e4) {
            function t3() {
              return g2(e4, arguments, r2(this).constructor);
            }
            if (null === e4 || !h2(e4)) return e4;
            if ("function" != typeof e4) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== i3) {
              if (i3.has(e4)) return i3.get(e4);
              i3.set(e4, t3);
            }
            return t3.prototype = Object.create(e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), y2(t3, e4);
          }, S2(e3);
        }
        var C2 = (function(e3) {
          var t3 = Math.abs, i3 = Math.max, _3 = Math.floor;
          function g3(e4, t4) {
            var i4;
            if (l2(this, g3), i4 = o2(this, g3, [e4]), i4.sign = t4, Object.setPrototypeOf(i4, g3.prototype), e4 > g3.__kMaxLength) throw new RangeError("Maximum BigInt size exceeded");
            return i4;
          }
          return d2(g3, e3), s2(g3, [{ key: "toDebugString", value: function e4() {
            var t4, i4 = ["BigInt["], _4 = u2(this);
            try {
              for (_4.s(); !(t4 = _4.n()).done; ) {
                var n3 = t4.value;
                i4.push((n3 ? (n3 >>> 0).toString(16) : n3) + ", ");
              }
            } catch (e5) {
              _4.e(e5);
            } finally {
              _4.f();
            }
            return i4.push("]"), i4.join("");
          } }, { key: "toString", value: function e4() {
            var t4 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 10;
            if (2 > t4 || 36 < t4) throw new RangeError("toString() radix argument must be between 2 and 36");
            return 0 === this.length ? "0" : 0 == (t4 & t4 - 1) ? g3.__toStringBasePowerOfTwo(this, t4) : g3.__toStringGeneric(this, t4, false);
          } }, { key: "valueOf", value: function e4() {
            throw new Error("Convert JSBI instances to native numbers using `toNumber`.");
          } }, { key: "__copy", value: function e4() {
            for (var t4 = new g3(this.length, this.sign), _4 = 0; _4 < this.length; _4++) t4[_4] = this[_4];
            return t4;
          } }, { key: "__trim", value: function e4() {
            for (var t4 = this.length, i4 = this[t4 - 1]; 0 === i4; ) t4--, i4 = this[t4 - 1], this.pop();
            return 0 === t4 && (this.sign = false), this;
          } }, { key: "__initializeDigits", value: function e4() {
            for (var t4 = 0; t4 < this.length; t4++) this[t4] = 0;
          } }, { key: "__clzmsd", value: function e4() {
            return g3.__clz30(this.__digit(this.length - 1));
          } }, { key: "__inplaceMultiplyAdd", value: function n3(e4, t4, _4) {
            _4 > this.length && (_4 = this.length);
            for (var o3 = 32767 & e4, l3 = e4 >>> 15, a3 = 0, s3 = t4, u3 = 0; u3 < _4; u3++) {
              var r3 = this.__digit(u3), h3 = 32767 & r3, b3 = r3 >>> 15, m3 = g3.__imul(h3, o3), c3 = g3.__imul(h3, l3), v3 = g3.__imul(b3, o3), y3 = g3.__imul(b3, l3), f3 = s3 + m3 + a3;
              a3 = f3 >>> 30, f3 &= 1073741823, f3 += ((32767 & c3) << 15) + ((32767 & v3) << 15), a3 += f3 >>> 30, s3 = y3 + (c3 >>> 15) + (v3 >>> 15), this.__setDigit(u3, 1073741823 & f3);
            }
            if (0 !== a3 || 0 !== s3) throw new Error("implementation bug");
          } }, { key: "__inplaceAdd", value: function n3(e4, t4, _4) {
            for (var o3, l3 = 0, g4 = 0; g4 < _4; g4++) o3 = this.__halfDigit(t4 + g4) + e4.__halfDigit(g4) + l3, l3 = o3 >>> 15, this.__setHalfDigit(t4 + g4, 32767 & o3);
            return l3;
          } }, { key: "__inplaceSub", value: function n3(e4, t4, _4) {
            var o3 = _4 - 1 >>> 1, l3 = 0;
            if (1 & t4) {
              t4 >>= 1;
              for (var g4 = this.__digit(t4), a3 = 32767 & g4, s3 = 0; s3 < o3; s3++) {
                var u3 = e4.__digit(s3), r3 = (g4 >>> 15) - (32767 & u3) - l3;
                l3 = 1 & r3 >>> 15, this.__setDigit(t4 + s3, (32767 & r3) << 15 | 32767 & a3), g4 = this.__digit(t4 + s3 + 1), a3 = (32767 & g4) - (u3 >>> 15) - l3, l3 = 1 & a3 >>> 15;
              }
              var d3 = e4.__digit(s3), h3 = (g4 >>> 15) - (32767 & d3) - l3;
              l3 = 1 & h3 >>> 15, this.__setDigit(t4 + s3, (32767 & h3) << 15 | 32767 & a3);
              var b3 = d3 >>> 15;
              if (t4 + s3 + 1 >= this.length) throw new RangeError("out of bounds");
              0 == (1 & _4) && (g4 = this.__digit(t4 + s3 + 1), a3 = (32767 & g4) - b3 - l3, l3 = 1 & a3 >>> 15, this.__setDigit(t4 + e4.length, 1073709056 & g4 | 32767 & a3));
            } else {
              t4 >>= 1;
              for (var m3 = 0; m3 < e4.length - 1; m3++) {
                var c3 = this.__digit(t4 + m3), v3 = e4.__digit(m3), y3 = (32767 & c3) - (32767 & v3) - l3;
                l3 = 1 & y3 >>> 15;
                var f3 = (c3 >>> 15) - (v3 >>> 15) - l3;
                l3 = 1 & f3 >>> 15, this.__setDigit(t4 + m3, (32767 & f3) << 15 | 32767 & y3);
              }
              var k3 = this.__digit(t4 + m3), D3 = e4.__digit(m3), p3 = (32767 & k3) - (32767 & D3) - l3;
              l3 = 1 & p3 >>> 15;
              var B3 = 0;
              0 == (1 & _4) && (B3 = (k3 >>> 15) - (D3 >>> 15) - l3, l3 = 1 & B3 >>> 15), this.__setDigit(t4 + m3, (32767 & B3) << 15 | 32767 & p3);
            }
            return l3;
          } }, { key: "__inplaceRightShift", value: function t4(e4) {
            if (0 !== e4) {
              for (var _4, n3 = this.__digit(0) >>> e4, o3 = this.length - 1, l3 = 0; l3 < o3; l3++) _4 = this.__digit(l3 + 1), this.__setDigit(l3, 1073741823 & _4 << 30 - e4 | n3), n3 = _4 >>> e4;
              this.__setDigit(o3, n3);
            }
          } }, { key: "__digit", value: function t4(e4) {
            return this[e4];
          } }, { key: "__unsignedDigit", value: function t4(e4) {
            return this[e4] >>> 0;
          } }, { key: "__setDigit", value: function i4(e4, t4) {
            this[e4] = 0 | t4;
          } }, { key: "__setDigitGrow", value: function i4(e4, t4) {
            this[e4] = 0 | t4;
          } }, { key: "__halfDigitLength", value: function e4() {
            var t4 = this.length;
            return 32767 >= this.__unsignedDigit(t4 - 1) ? 2 * t4 - 1 : 2 * t4;
          } }, { key: "__halfDigit", value: function t4(e4) {
            return 32767 & this[e4 >>> 1] >>> 15 * (1 & e4);
          } }, { key: "__setHalfDigit", value: function i4(e4, t4) {
            var _4 = e4 >>> 1, n3 = this.__digit(_4), o3 = 1 & e4 ? 32767 & n3 | t4 << 15 : 1073709056 & n3 | 32767 & t4;
            this.__setDigit(_4, o3);
          } }], [{ key: "BigInt", value: function t4(e4) {
            var i4 = Number.isFinite;
            if ("number" == typeof e4) {
              if (0 === e4) return g3.__zero();
              if (g3.__isOneDigitInt(e4)) return 0 > e4 ? g3.__oneDigit(-e4, true) : g3.__oneDigit(e4, false);
              if (!i4(e4) || _3(e4) !== e4) throw new RangeError("The number " + e4 + " cannot be converted to BigInt because it is not an integer");
              return g3.__fromDouble(e4);
            }
            if ("string" == typeof e4) {
              var n3 = g3.__fromString(e4);
              if (null === n3) throw new SyntaxError("Cannot convert " + e4 + " to a BigInt");
              return n3;
            }
            if ("boolean" == typeof e4) return true === e4 ? g3.__oneDigit(1, false) : g3.__zero();
            if ("object" === p2(e4)) {
              if (e4.constructor === g3) return e4;
              var o3 = g3.__toPrimitive(e4);
              return g3.BigInt(o3);
            }
            throw new TypeError("Cannot convert " + e4 + " to a BigInt");
          } }, { key: "toNumber", value: function t4(e4) {
            var i4 = e4.length;
            if (0 === i4) return 0;
            if (1 === i4) {
              var _4 = e4.__unsignedDigit(0);
              return e4.sign ? -_4 : _4;
            }
            var n3 = e4.__digit(i4 - 1), o3 = g3.__clz30(n3), l3 = 30 * i4 - o3;
            if (1024 < l3) return e4.sign ? -Infinity : 1 / 0;
            var a3 = l3 - 1, s3 = n3, u3 = i4 - 1, r3 = o3 + 3, d3 = 32 === r3 ? 0 : s3 << r3;
            d3 >>>= 12;
            var h3 = r3 - 12, b3 = 12 <= r3 ? 0 : s3 << 20 + r3, m3 = 20 + r3;
            for (0 < h3 && 0 < u3 && (u3--, s3 = e4.__digit(u3), d3 |= s3 >>> 30 - h3, b3 = s3 << h3 + 2, m3 = h3 + 2); 0 < m3 && 0 < u3; ) u3--, s3 = e4.__digit(u3), b3 |= 30 <= m3 ? s3 << m3 - 30 : s3 >>> 30 - m3, m3 -= 30;
            var c3 = g3.__decideRounding(e4, m3, u3, s3);
            if ((1 === c3 || 0 === c3 && 1 == (1 & b3)) && (b3 = b3 + 1 >>> 0, 0 === b3 && (d3++, 0 != d3 >>> 20 && (d3 = 0, a3++, 1023 < a3)))) return e4.sign ? -Infinity : 1 / 0;
            var v3 = e4.sign ? -2147483648 : 0;
            return a3 = a3 + 1023 << 20, g3.__kBitConversionInts[g3.__kBitConversionIntHigh] = v3 | a3 | d3, g3.__kBitConversionInts[g3.__kBitConversionIntLow] = b3, g3.__kBitConversionDouble[0];
          } }, { key: "unaryMinus", value: function t4(e4) {
            if (0 === e4.length) return e4;
            var i4 = e4.__copy();
            return i4.sign = !e4.sign, i4;
          } }, { key: "bitwiseNot", value: function t4(e4) {
            return e4.sign ? g3.__absoluteSubOne(e4).__trim() : g3.__absoluteAddOne(e4, true);
          } }, { key: "exponentiate", value: function i4(e4, t4) {
            if (t4.sign) throw new RangeError("Exponent must be positive");
            if (0 === t4.length) return g3.__oneDigit(1, false);
            if (0 === e4.length) return e4;
            if (1 === e4.length && 1 === e4.__digit(0)) return e4.sign && 0 == (1 & t4.__digit(0)) ? g3.unaryMinus(e4) : e4;
            if (1 < t4.length) throw new RangeError("BigInt too big");
            var _4 = t4.__unsignedDigit(0);
            if (1 === _4) return e4;
            if (_4 >= g3.__kMaxLengthBits) throw new RangeError("BigInt too big");
            if (1 === e4.length && 2 === e4.__digit(0)) {
              var n3 = 1 + (0 | _4 / 30), o3 = e4.sign && 0 != (1 & _4), l3 = new g3(n3, o3);
              l3.__initializeDigits();
              var a3 = 1 << _4 % 30;
              return l3.__setDigit(n3 - 1, a3), l3;
            }
            var s3 = null, u3 = e4;
            for (0 != (1 & _4) && (s3 = e4), _4 >>= 1; 0 !== _4; _4 >>= 1) u3 = g3.multiply(u3, u3), 0 != (1 & _4) && (null === s3 ? s3 = u3 : s3 = g3.multiply(s3, u3));
            return s3;
          } }, { key: "multiply", value: function _4(e4, t4) {
            if (0 === e4.length) return e4;
            if (0 === t4.length) return t4;
            var n3 = e4.length + t4.length;
            30 <= e4.__clzmsd() + t4.__clzmsd() && n3--;
            var o3 = new g3(n3, e4.sign !== t4.sign);
            o3.__initializeDigits();
            for (var l3 = 0; l3 < e4.length; l3++) g3.__multiplyAccumulate(t4, e4.__digit(l3), o3, l3);
            return o3.__trim();
          } }, { key: "divide", value: function i4(e4, t4) {
            if (0 === t4.length) throw new RangeError("Division by zero");
            if (0 > g3.__absoluteCompare(e4, t4)) return g3.__zero();
            var _4, n3 = e4.sign !== t4.sign, o3 = t4.__unsignedDigit(0);
            if (1 === t4.length && 32767 >= o3) {
              if (1 === o3) return n3 === e4.sign ? e4 : g3.unaryMinus(e4);
              _4 = g3.__absoluteDivSmall(e4, o3, null);
            } else _4 = g3.__absoluteDivLarge(e4, t4, true, false);
            return _4.sign = n3, _4.__trim();
          } }, { key: "remainder", value: function i4(e4, t4) {
            if (0 === t4.length) throw new RangeError("Division by zero");
            if (0 > g3.__absoluteCompare(e4, t4)) return e4;
            var _4 = t4.__unsignedDigit(0);
            if (1 === t4.length && 32767 >= _4) {
              if (1 === _4) return g3.__zero();
              var n3 = g3.__absoluteModSmall(e4, _4);
              return 0 === n3 ? g3.__zero() : g3.__oneDigit(n3, e4.sign);
            }
            var i5 = g3.__absoluteDivLarge(e4, t4, false, true);
            return i5.sign = e4.sign, i5.__trim();
          } }, { key: "add", value: function i4(e4, t4) {
            var _4 = e4.sign;
            return _4 === t4.sign ? g3.__absoluteAdd(e4, t4, _4) : 0 <= g3.__absoluteCompare(e4, t4) ? g3.__absoluteSub(e4, t4, _4) : g3.__absoluteSub(t4, e4, !_4);
          } }, { key: "subtract", value: function i4(e4, t4) {
            var _4 = e4.sign;
            return _4 === t4.sign ? 0 <= g3.__absoluteCompare(e4, t4) ? g3.__absoluteSub(e4, t4, _4) : g3.__absoluteSub(t4, e4, !_4) : g3.__absoluteAdd(e4, t4, _4);
          } }, { key: "leftShift", value: function i4(e4, t4) {
            return 0 === t4.length || 0 === e4.length ? e4 : t4.sign ? g3.__rightShiftByAbsolute(e4, t4) : g3.__leftShiftByAbsolute(e4, t4);
          } }, { key: "signedRightShift", value: function i4(e4, t4) {
            return 0 === t4.length || 0 === e4.length ? e4 : t4.sign ? g3.__leftShiftByAbsolute(e4, t4) : g3.__rightShiftByAbsolute(e4, t4);
          } }, { key: "unsignedRightShift", value: function e4() {
            throw new TypeError("BigInts have no unsigned right shift; use >> instead");
          } }, { key: "lessThan", value: function i4(e4, t4) {
            return 0 > g3.__compareToBigInt(e4, t4);
          } }, { key: "lessThanOrEqual", value: function i4(e4, t4) {
            return 0 >= g3.__compareToBigInt(e4, t4);
          } }, { key: "greaterThan", value: function i4(e4, t4) {
            return 0 < g3.__compareToBigInt(e4, t4);
          } }, { key: "greaterThanOrEqual", value: function i4(e4, t4) {
            return 0 <= g3.__compareToBigInt(e4, t4);
          } }, { key: "equal", value: function _4(e4, t4) {
            if (e4.sign !== t4.sign) return false;
            if (e4.length !== t4.length) return false;
            for (var n3 = 0; n3 < e4.length; n3++) if (e4.__digit(n3) !== t4.__digit(n3)) return false;
            return true;
          } }, { key: "notEqual", value: function i4(e4, t4) {
            return !g3.equal(e4, t4);
          } }, { key: "bitwiseAnd", value: function _4(e4, t4) {
            if (!e4.sign && !t4.sign) return g3.__absoluteAnd(e4, t4).__trim();
            if (e4.sign && t4.sign) {
              var n3 = i3(e4.length, t4.length) + 1, o3 = g3.__absoluteSubOne(e4, n3), l3 = g3.__absoluteSubOne(t4);
              return o3 = g3.__absoluteOr(o3, l3, o3), g3.__absoluteAddOne(o3, true, o3).__trim();
            }
            if (e4.sign) {
              var a3 = [t4, e4];
              e4 = a3[0], t4 = a3[1];
            }
            return g3.__absoluteAndNot(e4, g3.__absoluteSubOne(t4)).__trim();
          } }, { key: "bitwiseXor", value: function _4(e4, t4) {
            if (!e4.sign && !t4.sign) return g3.__absoluteXor(e4, t4).__trim();
            if (e4.sign && t4.sign) {
              var n3 = i3(e4.length, t4.length), o3 = g3.__absoluteSubOne(e4, n3), l3 = g3.__absoluteSubOne(t4);
              return g3.__absoluteXor(o3, l3, o3).__trim();
            }
            var a3 = i3(e4.length, t4.length) + 1;
            if (e4.sign) {
              var s3 = [t4, e4];
              e4 = s3[0], t4 = s3[1];
            }
            var u3 = g3.__absoluteSubOne(t4, a3);
            return u3 = g3.__absoluteXor(u3, e4, u3), g3.__absoluteAddOne(u3, true, u3).__trim();
          } }, { key: "bitwiseOr", value: function _4(e4, t4) {
            var n3 = i3(e4.length, t4.length);
            if (!e4.sign && !t4.sign) return g3.__absoluteOr(e4, t4).__trim();
            if (e4.sign && t4.sign) {
              var o3 = g3.__absoluteSubOne(e4, n3), l3 = g3.__absoluteSubOne(t4);
              return o3 = g3.__absoluteAnd(o3, l3, o3), g3.__absoluteAddOne(o3, true, o3).__trim();
            }
            if (e4.sign) {
              var a3 = [t4, e4];
              e4 = a3[0], t4 = a3[1];
            }
            var s3 = g3.__absoluteSubOne(t4, n3);
            return s3 = g3.__absoluteAndNot(s3, e4, s3), g3.__absoluteAddOne(s3, true, s3).__trim();
          } }, { key: "asIntN", value: function o3(e4, t4) {
            if (0 === t4.length) return t4;
            if (e4 = _3(e4), 0 > e4) throw new RangeError("Invalid value: not (convertible to) a safe integer");
            if (0 === e4) return g3.__zero();
            if (e4 >= g3.__kMaxLengthBits) return t4;
            var l3 = 0 | (e4 + 29) / 30;
            if (t4.length < l3) return t4;
            var a3 = t4.__unsignedDigit(l3 - 1), s3 = 1 << (e4 - 1) % 30;
            if (t4.length === l3 && a3 < s3) return t4;
            var u3 = (a3 & s3) === s3;
            if (!u3) return g3.__truncateToNBits(e4, t4);
            if (!t4.sign) return g3.__truncateAndSubFromPowerOfTwo(e4, t4, true);
            if (0 == (a3 & s3 - 1)) {
              for (var r3 = l3 - 2; 0 <= r3; r3--) if (0 !== t4.__digit(r3)) return g3.__truncateAndSubFromPowerOfTwo(e4, t4, false);
              return t4.length === l3 && a3 === s3 ? t4 : g3.__truncateToNBits(e4, t4);
            }
            return g3.__truncateAndSubFromPowerOfTwo(e4, t4, false);
          } }, { key: "asUintN", value: function i4(e4, t4) {
            if (0 === t4.length) return t4;
            if (e4 = _3(e4), 0 > e4) throw new RangeError("Invalid value: not (convertible to) a safe integer");
            if (0 === e4) return g3.__zero();
            if (t4.sign) {
              if (e4 > g3.__kMaxLengthBits) throw new RangeError("BigInt too big");
              return g3.__truncateAndSubFromPowerOfTwo(e4, t4, false);
            }
            if (e4 >= g3.__kMaxLengthBits) return t4;
            var o3 = 0 | (e4 + 29) / 30;
            if (t4.length < o3) return t4;
            var l3 = e4 % 30;
            if (t4.length == o3) {
              if (0 === l3) return t4;
              var a3 = t4.__digit(o3 - 1);
              if (0 == a3 >>> l3) return t4;
            }
            return g3.__truncateToNBits(e4, t4);
          } }, { key: "ADD", value: function i4(e4, t4) {
            if (e4 = g3.__toPrimitive(e4), t4 = g3.__toPrimitive(t4), "string" == typeof e4) return "string" != typeof t4 && (t4 = t4.toString()), e4 + t4;
            if ("string" == typeof t4) return e4.toString() + t4;
            if (e4 = g3.__toNumeric(e4), t4 = g3.__toNumeric(t4), g3.__isBigInt(e4) && g3.__isBigInt(t4)) return g3.add(e4, t4);
            if ("number" == typeof e4 && "number" == typeof t4) return e4 + t4;
            throw new TypeError("Cannot mix BigInt and other types, use explicit conversions");
          } }, { key: "LT", value: function i4(e4, t4) {
            return g3.__compare(e4, t4, 0);
          } }, { key: "LE", value: function i4(e4, t4) {
            return g3.__compare(e4, t4, 1);
          } }, { key: "GT", value: function i4(e4, t4) {
            return g3.__compare(e4, t4, 2);
          } }, { key: "GE", value: function i4(e4, t4) {
            return g3.__compare(e4, t4, 3);
          } }, { key: "EQ", value: function i4(e4, t4) {
            for (; true; ) {
              if (g3.__isBigInt(e4)) return g3.__isBigInt(t4) ? g3.equal(e4, t4) : g3.EQ(t4, e4);
              if ("number" == typeof e4) {
                if (g3.__isBigInt(t4)) return g3.__equalToNumber(t4, e4);
                if ("object" !== p2(t4)) return e4 == t4;
                t4 = g3.__toPrimitive(t4);
              } else if ("string" == typeof e4) {
                if (g3.__isBigInt(t4)) return e4 = g3.__fromString(e4), null !== e4 && g3.equal(e4, t4);
                if ("object" !== p2(t4)) return e4 == t4;
                t4 = g3.__toPrimitive(t4);
              } else if ("boolean" == typeof e4) {
                if (g3.__isBigInt(t4)) return g3.__equalToNumber(t4, +e4);
                if ("object" !== p2(t4)) return e4 == t4;
                t4 = g3.__toPrimitive(t4);
              } else if ("symbol" === p2(e4)) {
                if (g3.__isBigInt(t4)) return false;
                if ("object" !== p2(t4)) return e4 == t4;
                t4 = g3.__toPrimitive(t4);
              } else if ("object" === p2(e4)) {
                if ("object" === p2(t4) && t4.constructor !== g3) return e4 == t4;
                e4 = g3.__toPrimitive(e4);
              } else return e4 == t4;
            }
          } }, { key: "NE", value: function i4(e4, t4) {
            return !g3.EQ(e4, t4);
          } }, { key: "DataViewGetBigInt64", value: function i4(e4, t4) {
            var _4 = !!(2 < arguments.length && void 0 !== arguments[2]) && arguments[2];
            return g3.asIntN(64, g3.DataViewGetBigUint64(e4, t4, _4));
          } }, { key: "DataViewGetBigUint64", value: function i4(e4, t4) {
            var _4 = !!(2 < arguments.length && void 0 !== arguments[2]) && arguments[2], n3 = _4 ? [4, 0] : [0, 4], o3 = f2(n3, 2), a3 = o3[0], s3 = o3[1], l3 = e4.getUint32(t4 + a3, _4), u3 = e4.getUint32(t4 + s3, _4), r3 = new g3(3, false);
            return r3.__setDigit(0, 1073741823 & u3), r3.__setDigit(1, (268435455 & l3) << 2 | u3 >>> 30), r3.__setDigit(2, l3 >>> 28), r3.__trim();
          } }, { key: "DataViewSetBigInt64", value: function _4(e4, t4, i4) {
            var n3 = !!(3 < arguments.length && void 0 !== arguments[3]) && arguments[3];
            g3.DataViewSetBigUint64(e4, t4, i4, n3);
          } }, { key: "DataViewSetBigUint64", value: function _4(e4, t4, i4) {
            var n3 = !!(3 < arguments.length && void 0 !== arguments[3]) && arguments[3];
            i4 = g3.asUintN(64, i4);
            var o3 = 0, a3 = 0;
            if (0 < i4.length && (a3 = i4.__digit(0), 1 < i4.length)) {
              var s3 = i4.__digit(1);
              a3 |= s3 << 30, o3 = s3 >>> 2, 2 < i4.length && (o3 |= i4.__digit(2) << 28);
            }
            var u3 = n3 ? [4, 0] : [0, 4], r3 = f2(u3, 2), d3 = r3[0], h3 = r3[1];
            e4.setUint32(t4 + d3, o3, n3), e4.setUint32(t4 + h3, a3, n3);
          } }, { key: "__zero", value: function e4() {
            return new g3(0, false);
          } }, { key: "__oneDigit", value: function i4(e4, t4) {
            var _4 = new g3(1, t4);
            return _4.__setDigit(0, e4), _4;
          } }, { key: "__decideRounding", value: function n3(e4, t4, i4, _4) {
            if (0 < t4) return -1;
            var o3;
            if (0 > t4) o3 = -t4 - 1;
            else {
              if (0 === i4) return -1;
              i4--, _4 = e4.__digit(i4), o3 = 29;
            }
            var l3 = 1 << o3;
            if (0 == (_4 & l3)) return -1;
            if (l3 -= 1, 0 != (_4 & l3)) return 1;
            for (; 0 < i4; ) if (i4--, 0 !== e4.__digit(i4)) return 1;
            return 0;
          } }, { key: "__fromDouble", value: function t4(e4) {
            var i4 = 0 > e4;
            g3.__kBitConversionDouble[0] = e4;
            var _4, n3 = 2047 & g3.__kBitConversionInts[g3.__kBitConversionIntHigh] >>> 20, o3 = n3 - 1023, l3 = (0 | o3 / 30) + 1, a3 = new g3(l3, i4), s3 = 1048576, u3 = 1048575 & g3.__kBitConversionInts[g3.__kBitConversionIntHigh] | s3, r3 = g3.__kBitConversionInts[g3.__kBitConversionIntLow], d3 = 20, h3 = o3 % 30, b3 = 0;
            if (h3 < d3) {
              var m3 = d3 - h3;
              b3 = m3 + 32, _4 = u3 >>> m3, u3 = u3 << 32 - m3 | r3 >>> m3, r3 <<= 32 - m3;
            } else if (h3 === d3) b3 = 32, _4 = u3, u3 = r3, r3 = 0;
            else {
              var c3 = h3 - d3;
              b3 = 32 - c3, _4 = u3 << c3 | r3 >>> 32 - c3, u3 = r3 << c3, r3 = 0;
            }
            a3.__setDigit(l3 - 1, _4);
            for (var v3 = l3 - 2; 0 <= v3; v3--) 0 < b3 ? (b3 -= 30, _4 = u3 >>> 2, u3 = u3 << 30 | r3 >>> 2, r3 <<= 30) : _4 = 0, a3.__setDigit(v3, _4);
            return a3.__trim();
          } }, { key: "__isWhitespace", value: function t4(e4) {
            return !!(13 >= e4 && 9 <= e4) || (159 >= e4 ? 32 == e4 : 131071 >= e4 ? 160 == e4 || 5760 == e4 : 196607 >= e4 ? (e4 &= 131071, 10 >= e4 || 40 == e4 || 41 == e4 || 47 == e4 || 95 == e4 || 4096 == e4) : 65279 == e4);
          } }, { key: "__fromString", value: function t4(e4) {
            var i4 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, _4 = 0, n3 = e4.length, o3 = 0;
            if (o3 === n3) return g3.__zero();
            for (var l3 = e4.charCodeAt(o3); g3.__isWhitespace(l3); ) {
              if (++o3 === n3) return g3.__zero();
              l3 = e4.charCodeAt(o3);
            }
            if (43 === l3) {
              if (++o3 === n3) return null;
              l3 = e4.charCodeAt(o3), _4 = 1;
            } else if (45 === l3) {
              if (++o3 === n3) return null;
              l3 = e4.charCodeAt(o3), _4 = -1;
            }
            if (0 === i4) {
              if (i4 = 10, 48 === l3) {
                if (++o3 === n3) return g3.__zero();
                if (l3 = e4.charCodeAt(o3), 88 === l3 || 120 === l3) {
                  if (i4 = 16, ++o3 === n3) return null;
                  l3 = e4.charCodeAt(o3);
                } else if (79 === l3 || 111 === l3) {
                  if (i4 = 8, ++o3 === n3) return null;
                  l3 = e4.charCodeAt(o3);
                } else if (66 === l3 || 98 === l3) {
                  if (i4 = 2, ++o3 === n3) return null;
                  l3 = e4.charCodeAt(o3);
                }
              }
            } else if (16 === i4 && 48 === l3) {
              if (++o3 === n3) return g3.__zero();
              if (l3 = e4.charCodeAt(o3), 88 === l3 || 120 === l3) {
                if (++o3 === n3) return null;
                l3 = e4.charCodeAt(o3);
              }
            }
            if (0 !== _4 && 10 !== i4) return null;
            for (; 48 === l3; ) {
              if (++o3 === n3) return g3.__zero();
              l3 = e4.charCodeAt(o3);
            }
            var a3 = n3 - o3, s3 = g3.__kMaxBitsPerChar[i4], u3 = g3.__kBitsPerCharTableMultiplier - 1;
            if (a3 > 1073741824 / s3) return null;
            var r3 = s3 * a3 + u3 >>> g3.__kBitsPerCharTableShift, h3 = 0 | (r3 + 29) / 30, b3 = new g3(h3, false), c3 = 10 > i4 ? i4 : 10, v3 = 10 < i4 ? i4 - 10 : 0;
            if (0 == (i4 & i4 - 1)) {
              s3 >>= g3.__kBitsPerCharTableShift;
              var y3 = [], f3 = [], k3 = false;
              do {
                for (var D3, p3 = 0, B3 = 0; true; ) {
                  if (D3 = void 0, l3 - 48 >>> 0 < c3) D3 = l3 - 48;
                  else if ((32 | l3) - 97 >>> 0 < v3) D3 = (32 | l3) - 87;
                  else {
                    k3 = true;
                    break;
                  }
                  if (B3 += s3, p3 = p3 << s3 | D3, ++o3 === n3) {
                    k3 = true;
                    break;
                  }
                  if (l3 = e4.charCodeAt(o3), 30 < B3 + s3) break;
                }
                y3.push(p3), f3.push(B3);
              } while (!k3);
              g3.__fillFromParts(b3, y3, f3);
            } else {
              b3.__initializeDigits();
              var S3 = false, C3 = 0;
              do {
                for (var I2, A2 = 0, T2 = 1; true; ) {
                  if (I2 = void 0, l3 - 48 >>> 0 < c3) I2 = l3 - 48;
                  else if ((32 | l3) - 97 >>> 0 < v3) I2 = (32 | l3) - 87;
                  else {
                    S3 = true;
                    break;
                  }
                  var P2 = T2 * i4;
                  if (1073741823 < P2) break;
                  if (T2 = P2, A2 = A2 * i4 + I2, C3++, ++o3 === n3) {
                    S3 = true;
                    break;
                  }
                  l3 = e4.charCodeAt(o3);
                }
                u3 = 30 * g3.__kBitsPerCharTableMultiplier - 1;
                var O2 = 0 | (s3 * C3 + u3 >>> g3.__kBitsPerCharTableShift) / 30;
                b3.__inplaceMultiplyAdd(T2, A2, O2);
              } while (!S3);
            }
            if (o3 !== n3) {
              if (!g3.__isWhitespace(l3)) return null;
              for (o3++; o3 < n3; o3++) if (l3 = e4.charCodeAt(o3), !g3.__isWhitespace(l3)) return null;
            }
            return b3.sign = -1 === _4, b3.__trim();
          } }, { key: "__fillFromParts", value: function n3(e4, t4, _4) {
            for (var o3 = 0, l3 = 0, g4 = 0, a3 = t4.length - 1; 0 <= a3; a3--) {
              var s3 = t4[a3], u3 = _4[a3];
              l3 |= s3 << g4, g4 += u3, 30 === g4 ? (e4.__setDigit(o3++, l3), g4 = 0, l3 = 0) : 30 < g4 && (e4.__setDigit(o3++, 1073741823 & l3), g4 -= 30, l3 = s3 >>> u3 - g4);
            }
            if (0 !== l3) {
              if (o3 >= e4.length) throw new Error("implementation bug");
              e4.__setDigit(o3++, l3);
            }
            for (; o3 < e4.length; o3++) e4.__setDigit(o3, 0);
          } }, { key: "__toStringBasePowerOfTwo", value: function _4(e4, t4) {
            var n3 = e4.length, o3 = t4 - 1;
            o3 = (85 & o3 >>> 1) + (85 & o3), o3 = (51 & o3 >>> 2) + (51 & o3), o3 = (15 & o3 >>> 4) + (15 & o3);
            var l3 = o3, a3 = t4 - 1, s3 = e4.__digit(n3 - 1), u3 = g3.__clz30(s3), r3 = 30 * n3 - u3, d3 = 0 | (r3 + l3 - 1) / l3;
            if (e4.sign && d3++, 268435456 < d3) throw new Error("string too long");
            for (var h3 = Array(d3), b3 = d3 - 1, m3 = 0, c3 = 0, v3 = 0; v3 < n3 - 1; v3++) {
              var y3 = e4.__digit(v3), f3 = (m3 | y3 << c3) & a3;
              h3[b3--] = g3.__kConversionChars[f3];
              var k3 = l3 - c3;
              for (m3 = y3 >>> k3, c3 = 30 - k3; c3 >= l3; ) h3[b3--] = g3.__kConversionChars[m3 & a3], m3 >>>= l3, c3 -= l3;
            }
            var D3 = (m3 | s3 << c3) & a3;
            for (h3[b3--] = g3.__kConversionChars[D3], m3 = s3 >>> l3 - c3; 0 !== m3; ) h3[b3--] = g3.__kConversionChars[m3 & a3], m3 >>>= l3;
            if (e4.sign && (h3[b3--] = "-"), -1 !== b3) throw new Error("implementation bug");
            return h3.join("");
          } }, { key: "__toStringGeneric", value: function n3(e4, t4, _4) {
            var o3 = e4.length;
            if (0 === o3) return "";
            if (1 === o3) {
              var l3 = e4.__unsignedDigit(0).toString(t4);
              return false === _4 && e4.sign && (l3 = "-" + l3), l3;
            }
            var a3 = 30 * o3 - g3.__clz30(e4.__digit(o3 - 1)), s3 = g3.__kMaxBitsPerChar[t4], u3 = s3 - 1, r3 = a3 * g3.__kBitsPerCharTableMultiplier;
            r3 += u3 - 1, r3 = 0 | r3 / u3;
            var d3, h3, b3 = r3 + 1 >> 1, m3 = g3.exponentiate(g3.__oneDigit(t4, false), g3.__oneDigit(b3, false)), c3 = m3.__unsignedDigit(0);
            if (1 === m3.length && 32767 >= c3) {
              d3 = new g3(e4.length, false), d3.__initializeDigits();
              for (var v3, y3 = 0, f3 = 2 * e4.length - 1; 0 <= f3; f3--) v3 = y3 << 15 | e4.__halfDigit(f3), d3.__setHalfDigit(f3, 0 | v3 / c3), y3 = 0 | v3 % c3;
              h3 = y3.toString(t4);
            } else {
              var k3 = g3.__absoluteDivLarge(e4, m3, true, true);
              d3 = k3.quotient;
              var D3 = k3.remainder.__trim();
              h3 = g3.__toStringGeneric(D3, t4, true);
            }
            d3.__trim();
            for (var p3 = g3.__toStringGeneric(d3, t4, true); h3.length < b3; ) h3 = "0" + h3;
            return false === _4 && e4.sign && (p3 = "-" + p3), p3 + h3;
          } }, { key: "__unequalSign", value: function t4(e4) {
            return e4 ? -1 : 1;
          } }, { key: "__absoluteGreater", value: function t4(e4) {
            return e4 ? -1 : 1;
          } }, { key: "__absoluteLess", value: function t4(e4) {
            return e4 ? 1 : -1;
          } }, { key: "__compareToBigInt", value: function i4(e4, t4) {
            var _4 = e4.sign;
            if (_4 !== t4.sign) return g3.__unequalSign(_4);
            var n3 = g3.__absoluteCompare(e4, t4);
            return 0 < n3 ? g3.__absoluteGreater(_4) : 0 > n3 ? g3.__absoluteLess(_4) : 0;
          } }, { key: "__compareToNumber", value: function _4(e4, i4) {
            if (g3.__isOneDigitInt(i4)) {
              var n3 = e4.sign, o3 = 0 > i4;
              if (n3 !== o3) return g3.__unequalSign(n3);
              if (0 === e4.length) {
                if (o3) throw new Error("implementation bug");
                return 0 === i4 ? 0 : -1;
              }
              if (1 < e4.length) return g3.__absoluteGreater(n3);
              var l3 = t3(i4), a3 = e4.__unsignedDigit(0);
              return a3 > l3 ? g3.__absoluteGreater(n3) : a3 < l3 ? g3.__absoluteLess(n3) : 0;
            }
            return g3.__compareToDouble(e4, i4);
          } }, { key: "__compareToDouble", value: function i4(e4, t4) {
            if (t4 !== t4) return t4;
            if (t4 === 1 / 0) return -1;
            if (t4 === -Infinity) return 1;
            var _4 = e4.sign, n3 = 0 > t4;
            if (_4 !== n3) return g3.__unequalSign(_4);
            if (0 === t4) throw new Error("implementation bug: should be handled elsewhere");
            if (0 === e4.length) return -1;
            g3.__kBitConversionDouble[0] = t4;
            var o3 = 2047 & g3.__kBitConversionInts[g3.__kBitConversionIntHigh] >>> 20;
            if (2047 == o3) throw new Error("implementation bug: handled elsewhere");
            var l3 = o3 - 1023;
            if (0 > l3) return g3.__absoluteGreater(_4);
            var a3 = e4.length, s3 = e4.__digit(a3 - 1), u3 = g3.__clz30(s3), r3 = 30 * a3 - u3, d3 = l3 + 1;
            if (r3 < d3) return g3.__absoluteLess(_4);
            if (r3 > d3) return g3.__absoluteGreater(_4);
            var h3 = 1048576, b3 = 1048576 | 1048575 & g3.__kBitConversionInts[g3.__kBitConversionIntHigh], m3 = g3.__kBitConversionInts[g3.__kBitConversionIntLow], c3 = 20, v3 = 29 - u3;
            if (v3 !== (0 | (r3 - 1) % 30)) throw new Error("implementation bug");
            var y3, f3 = 0;
            if (v3 < c3) {
              var k3 = c3 - v3;
              f3 = k3 + 32, y3 = b3 >>> k3, b3 = b3 << 32 - k3 | m3 >>> k3, m3 <<= 32 - k3;
            } else if (v3 === c3) f3 = 32, y3 = b3, b3 = m3, m3 = 0;
            else {
              var D3 = v3 - c3;
              f3 = 32 - D3, y3 = b3 << D3 | m3 >>> 32 - D3, b3 = m3 << D3, m3 = 0;
            }
            if (s3 >>>= 0, y3 >>>= 0, s3 > y3) return g3.__absoluteGreater(_4);
            if (s3 < y3) return g3.__absoluteLess(_4);
            for (var p3 = a3 - 2; 0 <= p3; p3--) {
              0 < f3 ? (f3 -= 30, y3 = b3 >>> 2, b3 = b3 << 30 | m3 >>> 2, m3 <<= 30) : y3 = 0;
              var B3 = e4.__unsignedDigit(p3);
              if (B3 > y3) return g3.__absoluteGreater(_4);
              if (B3 < y3) return g3.__absoluteLess(_4);
            }
            if (0 !== b3 || 0 !== m3) {
              if (0 === f3) throw new Error("implementation bug");
              return g3.__absoluteLess(_4);
            }
            return 0;
          } }, { key: "__equalToNumber", value: function _4(e4, i4) {
            return g3.__isOneDigitInt(i4) ? 0 === i4 ? 0 === e4.length : 1 === e4.length && e4.sign === 0 > i4 && e4.__unsignedDigit(0) === t3(i4) : 0 === g3.__compareToDouble(e4, i4);
          } }, { key: "__comparisonResultToBool", value: function i4(e4, t4) {
            return 0 === t4 ? 0 > e4 : 1 === t4 ? 0 >= e4 : 2 === t4 ? 0 < e4 : 3 === t4 ? 0 <= e4 : void 0;
          } }, { key: "__compare", value: function _4(e4, t4, i4) {
            if (e4 = g3.__toPrimitive(e4), t4 = g3.__toPrimitive(t4), "string" == typeof e4 && "string" == typeof t4) switch (i4) {
              case 0:
                return e4 < t4;
              case 1:
                return e4 <= t4;
              case 2:
                return e4 > t4;
              case 3:
                return e4 >= t4;
            }
            if (g3.__isBigInt(e4) && "string" == typeof t4) return t4 = g3.__fromString(t4), null !== t4 && g3.__comparisonResultToBool(g3.__compareToBigInt(e4, t4), i4);
            if ("string" == typeof e4 && g3.__isBigInt(t4)) return e4 = g3.__fromString(e4), null !== e4 && g3.__comparisonResultToBool(g3.__compareToBigInt(e4, t4), i4);
            if (e4 = g3.__toNumeric(e4), t4 = g3.__toNumeric(t4), g3.__isBigInt(e4)) {
              if (g3.__isBigInt(t4)) return g3.__comparisonResultToBool(g3.__compareToBigInt(e4, t4), i4);
              if ("number" != typeof t4) throw new Error("implementation bug");
              return g3.__comparisonResultToBool(g3.__compareToNumber(e4, t4), i4);
            }
            if ("number" != typeof e4) throw new Error("implementation bug");
            if (g3.__isBigInt(t4)) return g3.__comparisonResultToBool(g3.__compareToNumber(t4, e4), 2 ^ i4);
            if ("number" != typeof t4) throw new Error("implementation bug");
            return 0 === i4 ? e4 < t4 : 1 === i4 ? e4 <= t4 : 2 === i4 ? e4 > t4 : 3 === i4 ? e4 >= t4 : void 0;
          } }, { key: "__absoluteAdd", value: function n3(e4, t4, _4) {
            if (e4.length < t4.length) return g3.__absoluteAdd(t4, e4, _4);
            if (0 === e4.length) return e4;
            if (0 === t4.length) return e4.sign === _4 ? e4 : g3.unaryMinus(e4);
            var o3 = e4.length;
            (0 === e4.__clzmsd() || t4.length === e4.length && 0 === t4.__clzmsd()) && o3++;
            for (var l3, a3 = new g3(o3, _4), s3 = 0, u3 = 0; u3 < t4.length; u3++) l3 = e4.__digit(u3) + t4.__digit(u3) + s3, s3 = l3 >>> 30, a3.__setDigit(u3, 1073741823 & l3);
            for (; u3 < e4.length; u3++) {
              var d3 = e4.__digit(u3) + s3;
              s3 = d3 >>> 30, a3.__setDigit(u3, 1073741823 & d3);
            }
            return u3 < a3.length && a3.__setDigit(u3, s3), a3.__trim();
          } }, { key: "__absoluteSub", value: function n3(e4, t4, _4) {
            if (0 === e4.length) return e4;
            if (0 === t4.length) return e4.sign === _4 ? e4 : g3.unaryMinus(e4);
            for (var o3, l3 = new g3(e4.length, _4), a3 = 0, s3 = 0; s3 < t4.length; s3++) o3 = e4.__digit(s3) - t4.__digit(s3) - a3, a3 = 1 & o3 >>> 30, l3.__setDigit(s3, 1073741823 & o3);
            for (; s3 < e4.length; s3++) {
              var u3 = e4.__digit(s3) - a3;
              a3 = 1 & u3 >>> 30, l3.__setDigit(s3, 1073741823 & u3);
            }
            return l3.__trim();
          } }, { key: "__absoluteAddOne", value: function _4(e4, t4) {
            var n3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, o3 = e4.length;
            null === n3 ? n3 = new g3(o3, t4) : n3.sign = t4;
            for (var l3, a3 = 1, s3 = 0; s3 < o3; s3++) l3 = e4.__digit(s3) + a3, a3 = l3 >>> 30, n3.__setDigit(s3, 1073741823 & l3);
            return 0 !== a3 && n3.__setDigitGrow(o3, 1), n3;
          } }, { key: "__absoluteSubOne", value: function _4(e4, t4) {
            var n3 = e4.length;
            t4 = t4 || n3;
            for (var o3, l3 = new g3(t4, false), a3 = 1, s3 = 0; s3 < n3; s3++) o3 = e4.__digit(s3) - a3, a3 = 1 & o3 >>> 30, l3.__setDigit(s3, 1073741823 & o3);
            if (0 !== a3) throw new Error("implementation bug");
            for (var u3 = n3; u3 < t4; u3++) l3.__setDigit(u3, 0);
            return l3;
          } }, { key: "__absoluteAnd", value: function _4(e4, t4) {
            var n3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, o3 = e4.length, l3 = t4.length, a3 = l3;
            if (o3 < l3) {
              a3 = o3;
              var s3 = e4, u3 = o3;
              e4 = t4, o3 = l3, t4 = s3, l3 = u3;
            }
            var r3 = a3;
            null === n3 ? n3 = new g3(r3, false) : r3 = n3.length;
            for (var d3 = 0; d3 < a3; d3++) n3.__setDigit(d3, e4.__digit(d3) & t4.__digit(d3));
            for (; d3 < r3; d3++) n3.__setDigit(d3, 0);
            return n3;
          } }, { key: "__absoluteAndNot", value: function _4(e4, t4) {
            var n3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, o3 = e4.length, l3 = t4.length, a3 = l3;
            o3 < l3 && (a3 = o3);
            var s3 = o3;
            null === n3 ? n3 = new g3(s3, false) : s3 = n3.length;
            for (var u3 = 0; u3 < a3; u3++) n3.__setDigit(u3, e4.__digit(u3) & ~t4.__digit(u3));
            for (; u3 < o3; u3++) n3.__setDigit(u3, e4.__digit(u3));
            for (; u3 < s3; u3++) n3.__setDigit(u3, 0);
            return n3;
          } }, { key: "__absoluteOr", value: function _4(e4, t4) {
            var n3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, o3 = e4.length, l3 = t4.length, a3 = l3;
            if (o3 < l3) {
              a3 = o3;
              var s3 = e4, u3 = o3;
              e4 = t4, o3 = l3, t4 = s3, l3 = u3;
            }
            var r3 = o3;
            null === n3 ? n3 = new g3(r3, false) : r3 = n3.length;
            for (var d3 = 0; d3 < a3; d3++) n3.__setDigit(d3, e4.__digit(d3) | t4.__digit(d3));
            for (; d3 < o3; d3++) n3.__setDigit(d3, e4.__digit(d3));
            for (; d3 < r3; d3++) n3.__setDigit(d3, 0);
            return n3;
          } }, { key: "__absoluteXor", value: function _4(e4, t4) {
            var n3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, o3 = e4.length, l3 = t4.length, a3 = l3;
            if (o3 < l3) {
              a3 = o3;
              var s3 = e4, u3 = o3;
              e4 = t4, o3 = l3, t4 = s3, l3 = u3;
            }
            var r3 = o3;
            null === n3 ? n3 = new g3(r3, false) : r3 = n3.length;
            for (var d3 = 0; d3 < a3; d3++) n3.__setDigit(d3, e4.__digit(d3) ^ t4.__digit(d3));
            for (; d3 < o3; d3++) n3.__setDigit(d3, e4.__digit(d3));
            for (; d3 < r3; d3++) n3.__setDigit(d3, 0);
            return n3;
          } }, { key: "__absoluteCompare", value: function _4(e4, t4) {
            var n3 = e4.length - t4.length;
            if (0 != n3) return n3;
            for (var o3 = e4.length - 1; 0 <= o3 && e4.__digit(o3) === t4.__digit(o3); ) o3--;
            return 0 > o3 ? 0 : e4.__unsignedDigit(o3) > t4.__unsignedDigit(o3) ? 1 : -1;
          } }, { key: "__multiplyAccumulate", value: function o3(e4, t4, _4, n3) {
            if (0 !== t4) {
              for (var l3 = 32767 & t4, a3 = t4 >>> 15, s3 = 0, u3 = 0, r3 = 0; r3 < e4.length; r3++, n3++) {
                var d3 = _4.__digit(n3), h3 = e4.__digit(r3), b3 = 32767 & h3, m3 = h3 >>> 15, c3 = g3.__imul(b3, l3), v3 = g3.__imul(b3, a3), y3 = g3.__imul(m3, l3), f3 = g3.__imul(m3, a3);
                d3 += u3 + c3 + s3, s3 = d3 >>> 30, d3 &= 1073741823, d3 += ((32767 & v3) << 15) + ((32767 & y3) << 15), s3 += d3 >>> 30, u3 = f3 + (v3 >>> 15) + (y3 >>> 15), _4.__setDigit(n3, 1073741823 & d3);
              }
              for (; 0 !== s3 || 0 !== u3; n3++) {
                var k3 = _4.__digit(n3);
                k3 += s3 + u3, u3 = 0, s3 = k3 >>> 30, _4.__setDigit(n3, 1073741823 & k3);
              }
            }
          } }, { key: "__internalMultiplyAdd", value: function a3(e4, t4, _4, o3, l3) {
            for (var s3 = _4, u3 = 0, d3 = 0; d3 < o3; d3++) {
              var h3 = e4.__digit(d3), b3 = g3.__imul(32767 & h3, t4), m3 = g3.__imul(h3 >>> 15, t4), c3 = b3 + ((32767 & m3) << 15) + u3 + s3;
              s3 = c3 >>> 30, u3 = m3 >>> 15, l3.__setDigit(d3, 1073741823 & c3);
            }
            if (l3.length > o3) for (l3.__setDigit(o3++, s3 + u3); o3 < l3.length; ) l3.__setDigit(o3++, 0);
            else if (0 !== s3 + u3) throw new Error("implementation bug");
          } }, { key: "__absoluteDivSmall", value: function _4(e4, t4) {
            var n3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
            null === n3 && (n3 = new g3(e4.length, false));
            for (var o3 = 0, l3 = 2 * e4.length - 1; 0 <= l3; l3 -= 2) {
              var a3 = (o3 << 15 | e4.__halfDigit(l3)) >>> 0, s3 = 0 | a3 / t4;
              o3 = 0 | a3 % t4, a3 = (o3 << 15 | e4.__halfDigit(l3 - 1)) >>> 0;
              var u3 = 0 | a3 / t4;
              o3 = 0 | a3 % t4, n3.__setDigit(l3 >>> 1, s3 << 15 | u3);
            }
            return n3;
          } }, { key: "__absoluteModSmall", value: function _4(e4, t4) {
            for (var n3, o3 = 0, l3 = 2 * e4.length - 1; 0 <= l3; l3--) n3 = (o3 << 15 | e4.__halfDigit(l3)) >>> 0, o3 = 0 | n3 % t4;
            return o3;
          } }, { key: "__absoluteDivLarge", value: function o3(e4, t4, i4, _4) {
            var l3 = t4.__halfDigitLength(), n3 = t4.length, a3 = e4.__halfDigitLength() - l3, s3 = null;
            i4 && (s3 = new g3(a3 + 2 >>> 1, false), s3.__initializeDigits());
            var r3 = new g3(l3 + 2 >>> 1, false);
            r3.__initializeDigits();
            var d3 = g3.__clz15(t4.__halfDigit(l3 - 1));
            0 < d3 && (t4 = g3.__specialLeftShift(t4, d3, 0));
            for (var h3 = g3.__specialLeftShift(e4, d3, 1), u3 = t4.__halfDigit(l3 - 1), b3 = 0, m3 = a3; 0 <= m3; m3--) {
              var v3 = 32767, y3 = h3.__halfDigit(m3 + l3);
              if (y3 !== u3) {
                var f3 = (y3 << 15 | h3.__halfDigit(m3 + l3 - 1)) >>> 0;
                v3 = 0 | f3 / u3;
                for (var k3 = 0 | f3 % u3, D3 = t4.__halfDigit(l3 - 2), p3 = h3.__halfDigit(m3 + l3 - 2); g3.__imul(v3, D3) >>> 0 > (k3 << 16 | p3) >>> 0 && (v3--, k3 += u3, !(32767 < k3)); ) ;
              }
              g3.__internalMultiplyAdd(t4, v3, 0, n3, r3);
              var B3 = h3.__inplaceSub(r3, m3, l3 + 1);
              0 !== B3 && (B3 = h3.__inplaceAdd(t4, m3, l3), h3.__setHalfDigit(m3 + l3, 32767 & h3.__halfDigit(m3 + l3) + B3), v3--), i4 && (1 & m3 ? b3 = v3 << 15 : s3.__setDigit(m3 >>> 1, b3 | v3));
            }
            if (_4) return h3.__inplaceRightShift(d3), i4 ? { quotient: s3, remainder: h3 } : h3;
            if (i4) return s3;
            throw new Error("unreachable");
          } }, { key: "__clz15", value: function t4(e4) {
            return g3.__clz30(e4) - 15;
          } }, { key: "__specialLeftShift", value: function o3(e4, t4, _4) {
            var l3 = e4.length, n3 = l3 + _4, a3 = new g3(n3, false);
            if (0 === t4) {
              for (var s3 = 0; s3 < l3; s3++) a3.__setDigit(s3, e4.__digit(s3));
              return 0 < _4 && a3.__setDigit(l3, 0), a3;
            }
            for (var u3, r3 = 0, h3 = 0; h3 < l3; h3++) u3 = e4.__digit(h3), a3.__setDigit(h3, 1073741823 & u3 << t4 | r3), r3 = u3 >>> 30 - t4;
            return 0 < _4 && a3.__setDigit(l3, r3), a3;
          } }, { key: "__leftShiftByAbsolute", value: function _4(e4, t4) {
            var n3 = g3.__toShiftAmount(t4);
            if (0 > n3) throw new RangeError("BigInt too big");
            var o3 = 0 | n3 / 30, l3 = n3 % 30, a3 = e4.length, s3 = 0 !== l3 && 0 != e4.__digit(a3 - 1) >>> 30 - l3, u3 = a3 + o3 + (s3 ? 1 : 0), r3 = new g3(u3, e4.sign);
            if (0 === l3) {
              for (var h3 = 0; h3 < o3; h3++) r3.__setDigit(h3, 0);
              for (; h3 < u3; h3++) r3.__setDigit(h3, e4.__digit(h3 - o3));
            } else {
              for (var b3 = 0, m3 = 0; m3 < o3; m3++) r3.__setDigit(m3, 0);
              for (var c3, v3 = 0; v3 < a3; v3++) c3 = e4.__digit(v3), r3.__setDigit(v3 + o3, 1073741823 & c3 << l3 | b3), b3 = c3 >>> 30 - l3;
              if (s3) r3.__setDigit(a3 + o3, b3);
              else if (0 !== b3) throw new Error("implementation bug");
            }
            return r3.__trim();
          } }, { key: "__rightShiftByAbsolute", value: function _4(e4, t4) {
            var n3 = e4.length, o3 = e4.sign, l3 = g3.__toShiftAmount(t4);
            if (0 > l3) return g3.__rightShiftByMaximum(o3);
            var a3 = 0 | l3 / 30, s3 = l3 % 30, u3 = n3 - a3;
            if (0 >= u3) return g3.__rightShiftByMaximum(o3);
            var r3 = false;
            if (o3) {
              var h3 = (1 << s3) - 1;
              if (0 != (e4.__digit(a3) & h3)) r3 = true;
              else for (var b3 = 0; b3 < a3; b3++) if (0 !== e4.__digit(b3)) {
                r3 = true;
                break;
              }
            }
            if (r3 && 0 === s3) {
              var m3 = e4.__digit(n3 - 1), c3 = 0 == ~m3;
              c3 && u3++;
            }
            var v3 = new g3(u3, o3);
            if (0 === s3) {
              v3.__setDigit(u3 - 1, 0);
              for (var y3 = a3; y3 < n3; y3++) v3.__setDigit(y3 - a3, e4.__digit(y3));
            } else {
              for (var f3, k3 = e4.__digit(a3) >>> s3, D3 = n3 - a3 - 1, p3 = 0; p3 < D3; p3++) f3 = e4.__digit(p3 + a3 + 1), v3.__setDigit(p3, 1073741823 & f3 << 30 - s3 | k3), k3 = f3 >>> s3;
              v3.__setDigit(D3, k3);
            }
            return r3 && (v3 = g3.__absoluteAddOne(v3, true, v3)), v3.__trim();
          } }, { key: "__rightShiftByMaximum", value: function t4(e4) {
            return e4 ? g3.__oneDigit(1, true) : g3.__zero();
          } }, { key: "__toShiftAmount", value: function t4(e4) {
            if (1 < e4.length) return -1;
            var i4 = e4.__unsignedDigit(0);
            return i4 > g3.__kMaxLengthBits ? -1 : i4;
          } }, { key: "__toPrimitive", value: function t4(e4) {
            var i4 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "default";
            if ("object" !== p2(e4)) return e4;
            if (e4.constructor === g3) return e4;
            if ("undefined" != typeof Symbol && "symbol" === p2(Symbol.toPrimitive) && e4[Symbol.toPrimitive]) {
              var _4 = e4[Symbol.toPrimitive](i4);
              if ("object" !== p2(_4)) return _4;
              throw new TypeError("Cannot convert object to primitive value");
            }
            var n3 = e4.valueOf;
            if (n3) {
              var o3 = n3.call(e4);
              if ("object" !== p2(o3)) return o3;
            }
            var l3 = e4.toString;
            if (l3) {
              var a3 = l3.call(e4);
              if ("object" !== p2(a3)) return a3;
            }
            throw new TypeError("Cannot convert object to primitive value");
          } }, { key: "__toNumeric", value: function t4(e4) {
            return g3.__isBigInt(e4) ? e4 : +e4;
          } }, { key: "__isBigInt", value: function t4(e4) {
            return "object" === p2(e4) && null !== e4 && e4.constructor === g3;
          } }, { key: "__truncateToNBits", value: function _4(e4, t4) {
            for (var n3 = 0 | (e4 + 29) / 30, o3 = new g3(n3, t4.sign), l3 = n3 - 1, a3 = 0; a3 < l3; a3++) o3.__setDigit(a3, t4.__digit(a3));
            var s3 = t4.__digit(l3);
            if (0 != e4 % 30) {
              var u3 = 32 - e4 % 30;
              s3 = s3 << u3 >>> u3;
            }
            return o3.__setDigit(l3, s3), o3.__trim();
          } }, { key: "__truncateAndSubFromPowerOfTwo", value: function n3(e4, t4, _4) {
            for (var o3 = Math.min, l3, a3 = 0 | (e4 + 29) / 30, s3 = new g3(a3, _4), u3 = 0, d3 = a3 - 1, h3 = 0, b3 = o3(d3, t4.length); u3 < b3; u3++) l3 = 0 - t4.__digit(u3) - h3, h3 = 1 & l3 >>> 30, s3.__setDigit(u3, 1073741823 & l3);
            for (; u3 < d3; u3++) s3.__setDigit(u3, 0 | 1073741823 & -h3);
            var m3, c3 = d3 < t4.length ? t4.__digit(d3) : 0, v3 = e4 % 30;
            if (0 === v3) m3 = 0 - c3 - h3, m3 &= 1073741823;
            else {
              var y3 = 32 - v3;
              c3 = c3 << y3 >>> y3;
              var f3 = 1 << 32 - y3;
              m3 = f3 - c3 - h3, m3 &= f3 - 1;
            }
            return s3.__setDigit(d3, m3), s3.__trim();
          } }, { key: "__digitPow", value: function i4(e4, t4) {
            for (var _4 = 1; 0 < t4; ) 1 & t4 && (_4 *= e4), t4 >>>= 1, e4 *= e4;
            return _4;
          } }, { key: "__detectBigEndian", value: function e4() {
            return g3.__kBitConversionDouble[0] = -0, 0 !== g3.__kBitConversionInts[0];
          } }, { key: "__isOneDigitInt", value: function t4(e4) {
            return (1073741823 & e4) === e4;
          } }]);
        })(S2(Array));
        return C2.__kMaxLength = 33554432, C2.__kMaxLengthBits = C2.__kMaxLength << 5, C2.__kMaxBitsPerChar = [0, 0, 32, 51, 64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126, 128, 131, 134, 136, 139, 141, 143, 145, 147, 149, 151, 153, 154, 156, 158, 159, 160, 162, 163, 165, 166], C2.__kBitsPerCharTableShift = 5, C2.__kBitsPerCharTableMultiplier = 1 << C2.__kBitsPerCharTableShift, C2.__kConversionChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], C2.__kBitConversionBuffer = new ArrayBuffer(8), C2.__kBitConversionDouble = new Float64Array(C2.__kBitConversionBuffer), C2.__kBitConversionInts = new Int32Array(C2.__kBitConversionBuffer), C2.__kBitConversionIntHigh = C2.__detectBigEndian() ? 0 : 1, C2.__kBitConversionIntLow = C2.__detectBigEndian() ? 1 : 0, C2.__clz30 = t2 ? function(e3) {
          return t2(e3) - 2;
        } : function(e3) {
          var t3 = Math.LN2, i3 = Math.log;
          return 0 === e3 ? 30 : 0 | 29 - (0 | i3(e3 >>> 0) / t3);
        }, C2.__imul = e2 || function(e3, t3) {
          return 0 | e3 * t3;
        }, C2;
      });
    }
  });

  // src/browser-api.ts
  var browser_api_exports = {};
  __export(browser_api_exports, {
    ANALYTICS_VERSION: () => ANALYTICS_VERSION,
    DEFAULT_PLACE_DISCOVERY_SETTINGS: () => DEFAULT_PLACE_DISCOVERY_SETTINGS,
    VISIT_PURPOSES: () => VISIT_PURPOSES,
    applyAnnotationRules: () => applyAnnotationRules,
    applyCorrections: () => applyCorrections,
    buildAnalyticsCacheKey: () => buildAnalyticsCacheKey,
    buildDataQualityDashboard: () => buildDataQualityDashboard,
    buildDataQualitySummary: () => buildDataQualitySummary,
    buildDayEventFeed: () => buildDayEventFeed,
    buildJourneyAnalytics: () => buildJourneyAnalytics,
    buildPeriodSummary: () => buildPeriodSummary,
    buildPlaceProfile: () => buildPlaceProfile,
    buildPublicTransportAnalytics: () => buildPublicTransportAnalytics,
    buildReplayPlan: () => buildReplayPlan,
    buildRoutineAnalysis: () => buildRoutineAnalysis,
    buildSelectedDayContext: () => buildSelectedDayContext,
    buildSelectedDaySummary: () => buildSelectedDaySummary,
    buildWalkingAnalytics: () => buildWalkingAnalytics,
    calculateIntelligenceJob: () => calculateIntelligenceJob,
    compareJourneys: () => compareJourneys,
    comparePlaces: () => comparePlaces,
    copyAnnotationToVisits: () => copyAnnotationToVisits,
    dayInterval: () => dayInterval,
    detectAllAnomalies: () => detectAllAnomalies,
    detectDayAnomalies: () => detectDayAnomalies,
    detectJourneyAnomalies: () => detectJourneyAnomalies,
    detectPlaceInactivityAnomalies: () => detectPlaceInactivityAnomalies,
    detectRoutineSequenceAnomalies: () => detectRoutineSequenceAnomalies,
    detectRoutineShiftAnomalies: () => detectRoutineShiftAnomalies,
    detectTimelineFormat: () => detectTimelineFormat,
    detectVisitAnomalies: () => detectVisitAnomalies,
    discoverPlaces: () => discoverPlaces,
    localParts: () => localParts,
    matchesAnnotationRule: () => matchesAnnotationRule,
    mergeAnnotations: () => mergeAnnotations,
    movingAverage: () => movingAverage,
    nextPausePoint: () => nextPausePoint,
    normalizeTimeline: () => normalizeTimeline,
    percentile: () => percentile,
    percentileRank: () => percentileRank,
    placesPersistence: () => placesPersistence,
    pointInsideBoundary: () => pointInsideBoundary,
    previewBoundaryChange: () => previewBoundaryChange,
    previewPlaceMerge: () => previewPlaceMerge,
    replayStateAt: () => replayStateAt,
    routinePercentile: () => routinePercentile,
    routineThreshold: () => routineThreshold,
    scoreJourney: () => scoreJourney,
    scoreVisit: () => scoreVisit,
    searchTimeline: () => searchTimeline,
    suggestCoordinateSplit: () => suggestCoordinateSplit,
    suggestDateRangeSplit: () => suggestDateRangeSplit,
    suggestDurationSplit: () => suggestDurationSplit,
    summarizeDistribution: () => summarizeDistribution
  });

  // src/model/identifiers.ts
  function canonicalize(value) {
    if (value === null || typeof value !== "object") return JSON.stringify(value);
    if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
    const entries = Object.entries(value).sort(([left], [right]) => left.localeCompare(right)).map(([key, entry]) => `${JSON.stringify(key)}:${canonicalize(entry)}`);
    return `{${entries.join(",")}}`;
  }
  function stableHash(value) {
    const input = typeof value === "string" ? value : canonicalize(value);
    let hash = 2166136261;
    for (let index = 0; index < input.length; index += 1) {
      hash ^= input.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }
  function entityId(kind, ...identityParts) {
    return `${kind}_${stableHash(identityParts)}`;
  }

  // src/importers/detect.ts
  function detectTimelineFormat(input, sourceName = "") {
    if (Array.isArray(input)) return "ios-on-device";
    if (!input || typeof input !== "object") return "unknown";
    const object = input;
    if (Array.isArray(object.semanticSegments)) return "semantic-segments";
    if (Array.isArray(object.timelineObjects)) {
      const first = object.timelineObjects[0];
      if (first && typeof first === "object" && ("visit" in first || "activity" in first)) return "ios-on-device";
      return /(^|[/\\])android([/\\]|$)/i.test(sourceName) ? "android-on-device" : "takeout";
    }
    return "unknown";
  }

  // src/importers/normalize.ts
  function record(value) {
    return value && typeof value === "object" && !Array.isArray(value) ? value : null;
  }
  function string(value) {
    return typeof value === "string" && value.length > 0 ? value : null;
  }
  function number(value) {
    const parsed = typeof value === "number" ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  function coordinatesFromLatLng(value) {
    const text = string(value);
    if (!text) return null;
    const match = text.replace(/°/g, "").match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
    if (!match) return null;
    const latitude = Number(match[1]);
    const longitude = Number(match[2]);
    return validCoordinates(latitude, longitude) ? { latitude, longitude } : null;
  }
  function coordinatesFromObject(value) {
    const object = record(value);
    if (!object) return null;
    const latitude = number(object.latitudeE7) !== null ? number(object.latitudeE7) / 1e7 : number(object.latitude) ?? number(object.lat);
    const longitude = number(object.longitudeE7) !== null ? number(object.longitudeE7) / 1e7 : number(object.longitude) ?? number(object.lng) ?? number(object.lon);
    if (latitude === null || longitude === null || !validCoordinates(latitude, longitude)) return null;
    const accuracyMeters = number(object.accuracyMeters) ?? number(object.accuracy);
    return accuracyMeters === null ? { latitude, longitude } : { latitude, longitude, accuracyMeters };
  }
  function validCoordinates(latitude, longitude) {
    return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
  }
  function interval(start, end) {
    const startValue = string(start);
    const endValue = string(end);
    return {
      start: startValue && Number.isFinite(Date.parse(startValue)) ? new Date(startValue).toISOString() : null,
      end: endValue && Number.isFinite(Date.parse(endValue)) ? new Date(endValue).toISOString() : null,
      startUncertain: !startValue,
      endUncertain: !endValue
    };
  }
  function sourceReference(session, path, probability, sourceRecordId) {
    return {
      importSessionId: session.id,
      format: session.format,
      sourceName: session.sourceName,
      recordPath: path,
      ...probability === null || probability === void 0 ? {} : { providerProbability: probability },
      ...sourceRecordId ? { sourceRecordId } : {}
    };
  }
  function addPlace(places, candidate, source) {
    const existing = places.get(candidate.id);
    if (existing) {
      existing.sourceReferences.push(source);
      if (!existing.coordinates && candidate.coordinates) existing.coordinates = candidate.coordinates;
      if (existing.name === "Unknown place" && candidate.name !== existing.name) existing.name = candidate.name;
      return existing;
    }
    const created = { ...candidate, sourceReferences: [source] };
    places.set(created.id, created);
    return created;
  }
  function normalizeSemanticSegments(segments, session, places, visits, journeys, warnings) {
    segments.forEach((entry, index) => {
      const segment = record(entry);
      const path = `semanticSegments[${index}]`;
      if (!segment) return;
      const segmentInterval = interval(segment.startTime, segment.endTime);
      const visit = record(segment.visit);
      const activity = record(segment.activity);
      if (visit) {
        const candidate = record(visit.topCandidate) ?? {};
        const location = record(candidate.placeLocation);
        const coords = coordinatesFromLatLng(location?.latLng) ?? coordinatesFromObject(location);
        const googlePlaceId = string(candidate.placeId) ?? string(candidate.placeID);
        const semanticType = string(candidate.semanticType);
        const placeId = googlePlaceId ? `google_${googlePlaceId}` : entityId("place", coords, semanticType);
        const source = sourceReference(session, path, number(candidate.probability) ?? number(visit.probability), googlePlaceId);
        addPlace(places, {
          id: placeId,
          name: string(candidate.placeName) ?? semanticType ?? "Unknown place",
          category: null,
          coordinates: coords,
          boundary: null,
          googlePlaceId,
          semanticType,
          ignored: false,
          notes: "",
          tags: []
        }, source);
        visits.push({
          id: entityId("visit", session.id, path, segmentInterval),
          placeId,
          interval: segmentInterval,
          coordinates: coords,
          confidence: null,
          source,
          annotationId: null
        });
      } else if (activity) {
        const start = record(activity.start);
        const end = record(activity.end);
        const pathPoints = Array.isArray(segment.timelinePath) ? segment.timelinePath.map((point) => {
          const item = record(point);
          const coords = coordinatesFromLatLng(item?.point) ?? coordinatesFromObject(item);
          if (!coords) return null;
          return { at: string(item?.time) ?? null, coordinates: coords };
        }).filter((point) => point !== null) : [];
        const topCandidate = record(activity.topCandidate);
        const source = sourceReference(session, path, number(activity.probability));
        const endpointPoints = [start, end].flatMap((item) => {
          const coords = coordinatesFromLatLng(item?.latLng) ?? coordinatesFromObject(item);
          return coords ? [{ at: null, coordinates: coords }] : [];
        });
        journeys.push({
          id: entityId("journey", session.id, path, segmentInterval),
          startPlaceId: null,
          endPlaceId: null,
          interval: segmentInterval,
          travelMode: string(topCandidate?.type) ?? string(activity.activityType) ?? "UNKNOWN",
          distanceMeters: number(activity.distanceMeters) ?? number(activity.distance),
          path: pathPoints.length > 0 ? pathPoints : endpointPoints,
          confidence: null,
          source,
          annotationId: null
        });
      } else {
        warnings.push({ code: "unsupported-semantic-segment", message: "Segment contains neither a visit nor an activity.", recordPath: path });
      }
    });
  }
  function normalizeTimelineObjects(objects, session, places, visits, journeys, warnings) {
    objects.forEach((entry, index) => {
      const item = record(entry);
      const path = `timelineObjects[${index}]`;
      if (!item) return;
      const placeVisit = record(item.placeVisit) ?? record(item.visit);
      const activity = record(item.activitySegment) ?? record(item.activity);
      if (placeVisit) {
        const location = record(placeVisit.location) ?? record(placeVisit.topCandidate) ?? {};
        const duration = record(placeVisit.duration) ?? item;
        const placeLocation = location.placeLocation;
        const coords = coordinatesFromObject(location) ?? coordinatesFromLatLng(placeLocation) ?? coordinatesFromLatLng(record(placeLocation)?.latLng);
        const googlePlaceId = string(location.placeId) ?? string(location.placeID);
        const semanticType = string(location.semanticType);
        const visitInterval = interval(duration.startTimestamp ?? item.startTime, duration.endTimestamp ?? item.endTime);
        const placeId = googlePlaceId ? `google_${googlePlaceId}` : entityId("place", coords, semanticType, string(location.name));
        const source = sourceReference(session, path, number(placeVisit.probability), googlePlaceId);
        addPlace(places, {
          id: placeId,
          name: string(location.name) ?? semanticType ?? "Unknown place",
          category: null,
          coordinates: coords,
          boundary: null,
          googlePlaceId,
          semanticType,
          ignored: false,
          notes: "",
          tags: []
        }, source);
        visits.push({ id: entityId("visit", session.id, path, visitInterval), placeId, interval: visitInterval, coordinates: coords, confidence: null, source, annotationId: null });
      } else if (activity) {
        const duration = record(activity.duration) ?? item;
        const journeyInterval = interval(duration.startTimestamp ?? item.startTime, duration.endTimestamp ?? item.endTime);
        const simplified = record(activity.simplifiedRawPath);
        const waypoints = record(activity.waypointPath);
        const rawPoints = Array.isArray(simplified?.points) ? simplified.points : Array.isArray(waypoints?.waypoints) ? waypoints.waypoints : [];
        const source = sourceReference(session, path);
        journeys.push({
          id: entityId("journey", session.id, path, journeyInterval),
          startPlaceId: null,
          endPlaceId: null,
          interval: journeyInterval,
          travelMode: string(activity.activityType) ?? string(waypoints?.travelMode) ?? "UNKNOWN",
          distanceMeters: number(activity.distance) ?? number(simplified?.distanceMeters) ?? number(waypoints?.distanceMeters),
          path: rawPoints.flatMap((point) => {
            const item2 = record(point);
            const coordinates = coordinatesFromObject(point);
            return coordinates ? [{ at: string(item2?.timestamp) ?? string(item2?.time) ?? null, coordinates }] : [];
          }),
          confidence: null,
          source,
          annotationId: null
        });
      } else {
        warnings.push({ code: "unsupported-timeline-object", message: "Timeline object contains neither a visit nor an activity.", recordPath: path });
      }
    });
  }
  function eventBounds(visits, journeys) {
    const timestamps = [...visits, ...journeys].flatMap((event) => [event.interval.start, event.interval.end]).filter((value) => value !== null).sort();
    return [timestamps[0] ?? null, timestamps.at(-1) ?? null];
  }
  function linkJourneyPlaces(visits, journeys) {
    const orderedVisits = visits.filter((visit) => visit.interval.start || visit.interval.end).sort((left, right) => (left.interval.start ?? left.interval.end ?? "").localeCompare(right.interval.start ?? right.interval.end ?? ""));
    journeys.forEach((journey) => {
      if (!journey.startPlaceId && journey.interval.start) {
        const previous = orderedVisits.filter((visit) => visit.interval.end && visit.interval.end <= journey.interval.start).at(-1);
        if (previous) journey.startPlaceId = previous.placeId;
      }
      if (!journey.endPlaceId && journey.interval.end) {
        const next = orderedVisits.find((visit) => visit.interval.start && visit.interval.start >= journey.interval.end);
        if (next) journey.endPlaceId = next.placeId;
      }
    });
  }
  function normalizeTimeline(input, options = {}) {
    const sourceName = options.sourceName ?? "Timeline.json";
    const format = options.format ?? detectTimelineFormat(input, sourceName);
    const fingerprint = stableHash(input);
    const session = {
      id: entityId("import", sourceName, fingerprint),
      importedAt: options.importedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
      sourceName,
      format,
      fingerprint,
      firstEventAt: null,
      lastEventAt: null,
      recordCount: 0
    };
    const places = /* @__PURE__ */ new Map();
    const visits = [];
    const journeys = [];
    const warnings = [];
    const object = record(input);
    if (format === "semantic-segments" && Array.isArray(object?.semanticSegments)) {
      normalizeSemanticSegments(object.semanticSegments, session, places, visits, journeys, warnings);
    } else {
      const objects = Array.isArray(input) ? input : Array.isArray(object?.timelineObjects) ? object.timelineObjects : [];
      normalizeTimelineObjects(objects, session, places, visits, journeys, warnings);
    }
    const [firstEventAt, lastEventAt] = eventBounds(visits, journeys);
    linkJourneyPlaces(visits, journeys);
    session.firstEventAt = firstEventAt;
    session.lastEventAt = lastEventAt;
    session.recordCount = visits.length + journeys.length;
    return {
      schemaVersion: 1,
      importSession: session,
      places: [...places.values()],
      visits,
      journeys,
      rawLocationPoints: [],
      annotations: [],
      warnings
    };
  }

  // src/analytics/intervals.ts
  function durationMilliseconds(start, end) {
    if (!start || !end) return null;
    const startMs = Date.parse(start);
    const endMs = Date.parse(end);
    if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs < startMs) return null;
    return endMs - startMs;
  }
  function mergeIntervals(intervals) {
    const valid = intervals.filter(({ startMs, endMs }) => Number.isFinite(startMs) && Number.isFinite(endMs) && endMs >= startMs).sort((left, right) => left.startMs - right.startMs || left.endMs - right.endMs);
    const merged = [];
    for (const interval3 of valid) {
      const previous = merged.at(-1);
      if (!previous || interval3.startMs > previous.endMs) {
        merged.push({ ...interval3 });
      } else {
        previous.endMs = Math.max(previous.endMs, interval3.endMs);
      }
    }
    return merged;
  }
  function coveredMilliseconds(intervals) {
    return mergeIntervals(intervals).reduce((sum, interval3) => sum + interval3.endMs - interval3.startMs, 0);
  }
  function overlappingMilliseconds(left, right) {
    return Math.max(0, Math.min(left.endMs, right.endMs) - Math.max(left.startMs, right.startMs));
  }

  // src/analytics/spatial.ts
  var EARTH_RADIUS_METERS = 6371e3;
  function haversineMeters(left, right) {
    const toRadians = (degrees) => degrees * Math.PI / 180;
    const latitudeDelta = toRadians(right.latitude - left.latitude);
    const longitudeDelta = toRadians(right.longitude - left.longitude);
    const leftLatitude = toRadians(left.latitude);
    const rightLatitude = toRadians(right.latitude);
    const haversine = Math.sin(latitudeDelta / 2) ** 2 + Math.cos(leftLatitude) * Math.cos(rightLatitude) * Math.sin(longitudeDelta / 2) ** 2;
    return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(haversine));
  }
  function coordinateCentroid(points) {
    if (points.length === 0) return null;
    return {
      latitude: points.reduce((sum, point) => sum + point.latitude, 0) / points.length,
      longitude: points.reduce((sum, point) => sum + point.longitude, 0) / points.length
    };
  }
  function estimatedRadiusMeters(points) {
    const centre = coordinateCentroid(points);
    if (!centre) return null;
    return Math.max(0, ...points.map((point) => haversineMeters(centre, point)));
  }

  // src/analytics/statistics.ts
  function mean(values) {
    return values.length === 0 ? null : values.reduce((sum, value) => sum + value, 0) / values.length;
  }
  function percentile(values, probability) {
    if (values.length === 0) return null;
    if (!Number.isFinite(probability) || probability < 0 || probability > 1) {
      throw new RangeError("Percentile probability must be between 0 and 1.");
    }
    const sorted = [...values].sort((left, right) => left - right);
    const position = (sorted.length - 1) * probability;
    const lowerIndex = Math.floor(position);
    const upperIndex = Math.ceil(position);
    const lower = sorted[lowerIndex];
    const upper = sorted[upperIndex];
    return lower + (upper - lower) * (position - lowerIndex);
  }
  function median(values) {
    return percentile(values, 0.5);
  }
  function percentileRank(values, value) {
    if (values.length === 0) return null;
    const below = values.filter((candidate) => candidate < value).length;
    const equal = values.filter((candidate) => candidate === value).length;
    return (below + equal * 0.5) / values.length * 100;
  }
  function summarizeDistribution(values) {
    const finite = values.filter(Number.isFinite);
    const p25 = percentile(finite, 0.25);
    const p75 = percentile(finite, 0.75);
    return {
      count: finite.length,
      minimum: finite.length ? Math.min(...finite) : null,
      p10: percentile(finite, 0.1),
      p25,
      median: median(finite),
      mean: mean(finite),
      p75,
      p90: percentile(finite, 0.9),
      p95: percentile(finite, 0.95),
      maximum: finite.length ? Math.max(...finite) : null,
      interquartileRange: p25 === null || p75 === null ? null : p75 - p25
    };
  }
  function movingAverage(values, windowSize) {
    if (!Number.isInteger(windowSize) || windowSize < 1) throw new RangeError("Window size must be a positive integer.");
    return values.map((_2, index) => {
      if (index + 1 < windowSize) return null;
      const window = values.slice(index + 1 - windowSize, index + 1);
      return mean(window);
    });
  }

  // node_modules/@js-temporal/polyfill/dist/index.esm.js
  var import_jsbi = __toESM(require_jsbi_umd(), 1);
  var t = import_jsbi.default.BigInt(0);
  var n = import_jsbi.default.BigInt(1);
  var r = import_jsbi.default.BigInt(2);
  var o = import_jsbi.default.BigInt(10);
  var i = import_jsbi.default.BigInt(24);
  var a = import_jsbi.default.BigInt(60);
  var s = import_jsbi.default.BigInt(1e3);
  var c = import_jsbi.default.BigInt(1e6);
  var d = import_jsbi.default.BigInt(1e9);
  var h = import_jsbi.default.multiply(import_jsbi.default.BigInt(3600), d);
  var u = import_jsbi.default.multiply(a, d);
  var l = import_jsbi.default.multiply(h, i);
  function m(t2) {
    return "bigint" == typeof t2 ? import_jsbi.default.BigInt(t2.toString(10)) : t2;
  }
  function f(n2) {
    return import_jsbi.default.equal(import_jsbi.default.remainder(n2, r), t);
  }
  function y(n2) {
    return import_jsbi.default.lessThan(n2, t) ? import_jsbi.default.unaryMinus(n2) : n2;
  }
  function p(t2, n2) {
    return import_jsbi.default.lessThan(t2, n2) ? -1 : import_jsbi.default.greaterThan(t2, n2) ? 1 : 0;
  }
  function g(t2, n2) {
    return { quotient: import_jsbi.default.divide(t2, n2), remainder: import_jsbi.default.remainder(t2, n2) };
  }
  var w;
  var v;
  var b = "slot-epochNanoSeconds";
  var D = "slot-iso-date";
  var T = "slot-iso-date-time";
  var M = "slot-time";
  var E = "slot-calendar";
  var I = "slot-date-brand";
  var C = "slot-year-month-brand";
  var O = "slot-month-day-brand";
  var $ = "slot-time-zone";
  var Y = "slot-years";
  var R = "slot-months";
  var S = "slot-weeks";
  var j = "slot-days";
  var k = "slot-hours";
  var N = "slot-minutes";
  var x = "slot-seconds";
  var L = "slot-milliseconds";
  var P = "slot-microseconds";
  var U = "slot-nanoseconds";
  var B = "date";
  var Z = "ym";
  var F = "md";
  var H = "time";
  var z = "datetime";
  var A = "instant";
  var q = "original";
  var W = "timezone-canonical";
  var _ = "timezone-original";
  var J = "calendar-id";
  var G = "locale";
  var K = "options";
  var V = /* @__PURE__ */ new WeakMap();
  var X = Symbol.for("@@Temporal__GetSlots");
  (w = globalThis)[X] || (w[X] = function(e2) {
    return V.get(e2);
  });
  var Q = globalThis[X];
  var ee = Symbol.for("@@Temporal__CreateSlots");
  (v = globalThis)[ee] || (v[ee] = function(e2) {
    V.set(e2, /* @__PURE__ */ Object.create(null));
  });
  var te = globalThis[ee];
  function ne(e2, ...t2) {
    if (!e2 || "object" != typeof e2) return false;
    const n2 = Q(e2);
    return !!n2 && t2.every(((e3) => e3 in n2));
  }
  function re(e2, t2) {
    const n2 = Q(e2)?.[t2];
    if (void 0 === n2) throw new TypeError(`Missing internal slot ${t2}`);
    return n2;
  }
  function oe(e2, t2, n2) {
    const r2 = Q(e2);
    if (void 0 === r2) throw new TypeError("Missing slots for the given container");
    if (r2[t2]) throw new TypeError(`${t2} already has set`);
    r2[t2] = n2;
  }
  var ie = {};
  function ae(e2, t2) {
    Object.defineProperty(e2.prototype, Symbol.toStringTag, { value: t2, writable: false, enumerable: false, configurable: true });
    const n2 = Object.getOwnPropertyNames(e2);
    for (let t3 = 0; t3 < n2.length; t3++) {
      const r3 = n2[t3], o2 = Object.getOwnPropertyDescriptor(e2, r3);
      o2.configurable && o2.enumerable && (o2.enumerable = false, Object.defineProperty(e2, r3, o2));
    }
    const r2 = Object.getOwnPropertyNames(e2.prototype);
    for (let t3 = 0; t3 < r2.length; t3++) {
      const n3 = r2[t3], o2 = Object.getOwnPropertyDescriptor(e2.prototype, n3);
      o2.configurable && o2.enumerable && (o2.enumerable = false, Object.defineProperty(e2.prototype, n3, o2));
    }
    se(t2, e2), se(`${t2}.prototype`, e2.prototype);
  }
  function se(e2, t2) {
    const n2 = `%${e2}%`;
    if (void 0 !== ie[n2]) throw new Error(`intrinsic ${e2} already exists`);
    ie[n2] = t2;
  }
  function ce(e2) {
    return ie[e2];
  }
  function de(e2, t2) {
    let n2 = e2;
    if (0 === n2) return { div: n2, mod: n2 };
    const r2 = Math.sign(n2);
    n2 = Math.abs(n2);
    const o2 = Math.trunc(1 + Math.log10(n2));
    if (t2 >= o2) return { div: 0 * r2, mod: r2 * n2 };
    if (0 === t2) return { div: r2 * n2, mod: 0 * r2 };
    const i2 = n2.toPrecision(o2);
    return { div: r2 * Number.parseInt(i2.slice(0, o2 - t2), 10), mod: r2 * Number.parseInt(i2.slice(o2 - t2), 10) };
  }
  function he(e2, t2, n2) {
    let r2 = e2, o2 = n2;
    if (0 === r2) return o2;
    const i2 = Math.sign(r2) || Math.sign(o2);
    r2 = Math.abs(r2), o2 = Math.abs(o2);
    const a2 = r2.toPrecision(Math.trunc(1 + Math.log10(r2)));
    if (0 === o2) return i2 * Number.parseInt(a2 + "0".repeat(t2), 10);
    const s2 = a2 + o2.toPrecision(Math.trunc(1 + Math.log10(o2))).padStart(t2, "0");
    return i2 * Number.parseInt(s2, 10);
  }
  function ue(e2, t2) {
    const n2 = "negative" === t2;
    switch (e2) {
      case "ceil":
        return n2 ? "zero" : "infinity";
      case "floor":
        return n2 ? "infinity" : "zero";
      case "expand":
        return "infinity";
      case "trunc":
        return "zero";
      case "halfCeil":
        return n2 ? "half-zero" : "half-infinity";
      case "halfFloor":
        return n2 ? "half-infinity" : "half-zero";
      case "halfExpand":
        return "half-infinity";
      case "halfTrunc":
        return "half-zero";
      case "halfEven":
        return "half-even";
    }
  }
  function le(e2, t2, n2, r2, o2) {
    return "zero" === o2 ? e2 : "infinity" === o2 ? t2 : n2 < 0 ? e2 : n2 > 0 ? t2 : "half-zero" === o2 ? e2 : "half-infinity" === o2 ? t2 : r2 ? e2 : t2;
  }
  var TimeDuration = class _TimeDuration {
    constructor(t2) {
      this.totalNs = m(t2), this.sec = import_jsbi.default.toNumber(import_jsbi.default.divide(this.totalNs, d)), this.subsec = import_jsbi.default.toNumber(import_jsbi.default.remainder(this.totalNs, d));
    }
    static validateNew(t2, n2) {
      if (import_jsbi.default.greaterThan(y(t2), _TimeDuration.MAX)) throw new RangeError(`${n2} of duration time units cannot exceed ${_TimeDuration.MAX} s`);
      return new _TimeDuration(t2);
    }
    static fromEpochNsDiff(t2, n2) {
      const r2 = import_jsbi.default.subtract(m(t2), m(n2));
      return new _TimeDuration(r2);
    }
    static fromComponents(t2, n2, r2, o2, i2, a2) {
      const l2 = import_jsbi.default.add(import_jsbi.default.add(import_jsbi.default.add(import_jsbi.default.add(import_jsbi.default.add(import_jsbi.default.BigInt(a2), import_jsbi.default.multiply(import_jsbi.default.BigInt(i2), s)), import_jsbi.default.multiply(import_jsbi.default.BigInt(o2), c)), import_jsbi.default.multiply(import_jsbi.default.BigInt(r2), d)), import_jsbi.default.multiply(import_jsbi.default.BigInt(n2), u)), import_jsbi.default.multiply(import_jsbi.default.BigInt(t2), h));
      return _TimeDuration.validateNew(l2, "total");
    }
    abs() {
      return new _TimeDuration(y(this.totalNs));
    }
    add(t2) {
      return _TimeDuration.validateNew(import_jsbi.default.add(this.totalNs, t2.totalNs), "sum");
    }
    add24HourDays(t2) {
      return _TimeDuration.validateNew(import_jsbi.default.add(this.totalNs, import_jsbi.default.multiply(import_jsbi.default.BigInt(t2), l)), "sum");
    }
    addToEpochNs(t2) {
      return import_jsbi.default.add(m(t2), this.totalNs);
    }
    cmp(e2) {
      return p(this.totalNs, e2.totalNs);
    }
    divmod(t2) {
      const { quotient: n2, remainder: r2 } = g(this.totalNs, import_jsbi.default.BigInt(t2));
      return { quotient: import_jsbi.default.toNumber(n2), remainder: new _TimeDuration(r2) };
    }
    fdiv(n2) {
      const r2 = m(n2), i2 = import_jsbi.default.BigInt(r2);
      let { quotient: a2, remainder: s2 } = g(this.totalNs, i2);
      const c2 = [];
      let d2;
      const h2 = (import_jsbi.default.lessThan(this.totalNs, t) ? -1 : 1) * Math.sign(import_jsbi.default.toNumber(r2));
      for (; !import_jsbi.default.equal(s2, t) && c2.length < 50; ) s2 = import_jsbi.default.multiply(s2, o), { quotient: d2, remainder: s2 } = g(s2, i2), c2.push(Math.abs(import_jsbi.default.toNumber(d2)));
      return h2 * Number(y(a2).toString() + "." + c2.join(""));
    }
    isZero() {
      return import_jsbi.default.equal(this.totalNs, t);
    }
    round(o2, i2) {
      const a2 = m(o2);
      if (import_jsbi.default.equal(a2, n)) return this;
      const { quotient: s2, remainder: c2 } = g(this.totalNs, a2), d2 = import_jsbi.default.lessThan(this.totalNs, t) ? "negative" : "positive", h2 = import_jsbi.default.multiply(y(s2), a2), u2 = import_jsbi.default.add(h2, a2), l2 = p(y(import_jsbi.default.multiply(c2, r)), a2), w2 = ue(i2, d2), v2 = import_jsbi.default.equal(y(this.totalNs), h2) ? h2 : le(h2, u2, l2, f(s2), w2), b2 = "positive" === d2 ? v2 : import_jsbi.default.unaryMinus(v2);
      return _TimeDuration.validateNew(b2, "rounding");
    }
    sign() {
      return this.cmp(new _TimeDuration(t));
    }
    subtract(t2) {
      return _TimeDuration.validateNew(import_jsbi.default.subtract(this.totalNs, t2.totalNs), "difference");
    }
  };
  TimeDuration.MAX = import_jsbi.default.BigInt("9007199254740991999999999"), TimeDuration.ZERO = new TimeDuration(t);
  var me = /[A-Za-z._][A-Za-z._0-9+-]*/;
  var fe = new RegExp(`(?:${/(?:[+-](?:[01][0-9]|2[0-3])(?::?[0-5][0-9])?)/.source}|(?:${me.source})(?:\\/(?:${me.source}))*)`);
  var ye = /(?:[+-]\d{6}|\d{4})/;
  var pe = /(?:0[1-9]|1[0-2])/;
  var ge = /(?:0[1-9]|[12]\d|3[01])/;
  var we = new RegExp(`(${ye.source})(?:-(${pe.source})-(${ge.source})|(${pe.source})(${ge.source}))`);
  var ve = /(\d{2})(?::(\d{2})(?::(\d{2})(?:[.,](\d{1,9}))?)?|(\d{2})(?:(\d{2})(?:[.,](\d{1,9}))?)?)?/;
  var be = /((?:[+-])(?:[01][0-9]|2[0-3])(?::?(?:[0-5][0-9])(?::?(?:[0-5][0-9])(?:[.,](?:\d{1,9}))?)?)?)/;
  var De = new RegExp(`([zZ])|${be.source}?`);
  var Te = /\[(!)?([a-z_][a-z0-9_-]*)=([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\]/g;
  var Me = new RegExp([`^${we.source}`, `(?:(?:[tT]|\\s+)${ve.source}(?:${De.source})?)?`, `(?:\\[!?(${fe.source})\\])?`, `((?:${Te.source})*)$`].join(""));
  var Ee = new RegExp([`^[tT]?${ve.source}`, `(?:${De.source})?`, `(?:\\[!?${fe.source}\\])?`, `((?:${Te.source})*)$`].join(""));
  var Ie = new RegExp(`^(${ye.source})-?(${pe.source})(?:\\[!?${fe.source}\\])?((?:${Te.source})*)$`);
  var Ce = new RegExp(`^(?:--)?(${pe.source})-?(${ge.source})(?:\\[!?${fe.source}\\])?((?:${Te.source})*)$`);
  var Oe = /(\d+)(?:[.,](\d{1,9}))?/;
  var $e = new RegExp(`(?:${Oe.source}H)?(?:${Oe.source}M)?(?:${Oe.source}S)?`);
  var Ye = new RegExp(`^([+-])?P${/(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?/.source}(?:T(?!$)${$e.source})?$`, "i");
  var Re = 864e5;
  var Se = 1e6 * Re;
  var je = 6e10;
  var ke = 1e8 * Re;
  var Ne = xo(ke);
  var xe = import_jsbi.default.unaryMinus(Ne);
  var Le = import_jsbi.default.add(import_jsbi.default.subtract(xe, l), n);
  var Pe = import_jsbi.default.subtract(import_jsbi.default.add(Ne, l), n);
  var Ue = 146097 * Re;
  var Be = -271821;
  var Ze = 275760;
  var Fe = Date.UTC(1847, 0, 1);
  var He = ["iso8601", "hebrew", "islamic", "islamic-umalqura", "islamic-tbla", "islamic-civil", "islamic-rgsa", "islamicc", "persian", "ethiopic", "ethioaa", "ethiopic-amete-alem", "coptic", "chinese", "dangi", "roc", "indian", "buddhist", "japanese", "gregory"];
  var ze = /* @__PURE__ */ new Set(["ACT", "AET", "AGT", "ART", "AST", "BET", "BST", "CAT", "CNT", "CST", "CTT", "EAT", "ECT", "IET", "IST", "JST", "MIT", "NET", "NST", "PLT", "PNT", "PRT", "PST", "SST", "VST"]);
  function Ae(e2) {
    return "object" == typeof e2 && null !== e2 || "function" == typeof e2;
  }
  function qe(e2) {
    if ("bigint" == typeof e2) throw new TypeError("Cannot convert BigInt to number");
    return Number(e2);
  }
  function We(e2) {
    if ("symbol" == typeof e2) throw new TypeError("Cannot convert a Symbol value to a String");
    return String(e2);
  }
  function _e(e2) {
    const t2 = qe(e2);
    if (0 === t2) return 0;
    if (Number.isNaN(t2) || t2 === 1 / 0 || t2 === -1 / 0) throw new RangeError("invalid number value");
    const n2 = Math.trunc(t2);
    return 0 === n2 ? 0 : n2;
  }
  function Je(e2, t2) {
    const n2 = _e(e2);
    if (n2 <= 0) {
      if (void 0 !== t2) throw new RangeError(`property '${t2}' cannot be a a number less than one`);
      throw new RangeError("Cannot convert a number less than one to a positive integer");
    }
    return n2;
  }
  function Ge(e2) {
    const t2 = qe(e2);
    if (Number.isNaN(t2)) throw new RangeError("not a number");
    if (t2 === 1 / 0 || t2 === -1 / 0) throw new RangeError("infinity is out of range");
    if (!(function(e3) {
      if ("number" != typeof e3 || Number.isNaN(e3) || e3 === 1 / 0 || e3 === -1 / 0) return false;
      const t3 = Math.abs(e3);
      return Math.floor(t3) === t3;
    })(t2)) throw new RangeError(`unsupported fractional value ${e2}`);
    return 0 === t2 ? 0 : t2;
  }
  function Ke(e2, t2) {
    return String(e2).padStart(t2, "0");
  }
  function Ve(e2) {
    if ("string" != typeof e2) throw new TypeError(`expected a string, not ${String(e2)}`);
    return e2;
  }
  function Xe(e2, t2) {
    if (Ae(e2)) {
      const t3 = e2?.toString();
      if ("string" == typeof t3 || "number" == typeof t3) return t3;
      throw new TypeError("Cannot convert object to primitive value");
    }
    return e2;
  }
  var Qe = ["era", "eraYear", "year", "month", "monthCode", "day", "hour", "minute", "second", "millisecond", "microsecond", "nanosecond", "offset", "timeZone"];
  var et = { era: We, eraYear: _e, year: _e, month: Je, monthCode: function(e2) {
    const t2 = Ve(Xe(e2));
    if (t2.length < 3 || t2.length > 4 || "M" !== t2[0] || -1 === "0123456789".indexOf(t2[1]) || -1 === "0123456789".indexOf(t2[2]) || t2[1] + t2[2] === "00" && "L" !== t2[3] || "L" !== t2[3] && void 0 !== t2[3]) throw new RangeError(`bad month code ${t2}; must match M01-M99 or M00L-M99L`);
    return t2;
  }, day: Je, hour: _e, minute: _e, second: _e, millisecond: _e, microsecond: _e, nanosecond: _e, offset: function(e2) {
    const t2 = Ve(Xe(e2));
    return sr(t2), t2;
  }, timeZone: Bn };
  var tt = { hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 };
  var nt = [["years", "year", "date"], ["months", "month", "date"], ["weeks", "week", "date"], ["days", "day", "date"], ["hours", "hour", "time"], ["minutes", "minute", "time"], ["seconds", "second", "time"], ["milliseconds", "millisecond", "time"], ["microseconds", "microsecond", "time"], ["nanoseconds", "nanosecond", "time"]];
  var rt = Object.fromEntries(nt.map(((e2) => [e2[0], e2[1]])));
  var ot = Object.fromEntries(nt.map((([e2, t2]) => [t2, e2])));
  var it = nt.map((([, e2]) => e2));
  var at = { day: Se, hour: 36e11, minute: 6e10, second: 1e9, millisecond: 1e6, microsecond: 1e3, nanosecond: 1 };
  var st = ["days", "hours", "microseconds", "milliseconds", "minutes", "months", "nanoseconds", "seconds", "weeks", "years"];
  var ct = Intl.DateTimeFormat;
  var dt = /* @__PURE__ */ new Map();
  function ht(e2) {
    const t2 = Ao(e2);
    let n2 = dt.get(t2);
    return void 0 === n2 && (n2 = new ct("en-us", { timeZone: t2, hour12: false, era: "short", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }), dt.set(t2, n2)), n2;
  }
  function ut(e2) {
    return ne(e2, b) && !ne(e2, $, E);
  }
  function lt(e2) {
    return ne(e2, Y, R, j, k, N, x, L, P, U);
  }
  function mt(e2) {
    return ne(e2, I);
  }
  function ft(e2) {
    return ne(e2, M);
  }
  function yt(e2) {
    return ne(e2, T);
  }
  function pt(e2) {
    return ne(e2, C);
  }
  function gt(e2) {
    return ne(e2, O);
  }
  function wt(e2) {
    return ne(e2, b, $, E);
  }
  function vt(e2, t2) {
    if (!t2(e2)) throw new TypeError("invalid receiver: method called with the wrong type of this-object");
  }
  function bt(e2) {
    if (ne(e2, E) || ne(e2, $)) throw new TypeError("with() does not support a calendar or timeZone property");
    if (ft(e2)) throw new TypeError("with() does not accept Temporal.PlainTime, use withPlainTime() instead");
    if (void 0 !== e2.calendar) throw new TypeError("with() does not support a calendar property");
    if (void 0 !== e2.timeZone) throw new TypeError("with() does not support a timeZone property");
  }
  function Dt(e2, t2) {
    return "never" === t2 || "auto" === t2 && "iso8601" === e2 ? "" : `[${"critical" === t2 ? "!" : ""}u-ca=${e2}]`;
  }
  function Tt(e2) {
    let t2, n2, r2 = false;
    for (Te.lastIndex = 0; n2 = Te.exec(e2); ) {
      const { 1: o2, 2: i2, 3: a2 } = n2;
      if ("u-ca" === i2) {
        if (void 0 === t2) t2 = a2, r2 = "!" === o2;
        else if ("!" === o2 || r2) throw new RangeError(`Invalid annotations in ${e2}: more than one u-ca present with critical flag`);
      } else if ("!" === o2) throw new RangeError(`Unrecognized annotation: !${i2}=${a2}`);
    }
    return t2;
  }
  function Mt(e2) {
    const t2 = Me.exec(e2);
    if (!t2) throw new RangeError(`invalid RFC 9557 string: ${e2}`);
    const n2 = Tt(t2[16]);
    let r2 = t2[1];
    if ("-000000" === r2) throw new RangeError(`invalid RFC 9557 string: ${e2}`);
    const o2 = +r2, i2 = +(t2[2] ?? t2[4] ?? 1), a2 = +(t2[3] ?? t2[5] ?? 1), s2 = void 0 !== t2[6], c2 = +(t2[6] ?? 0), d2 = +(t2[7] ?? t2[10] ?? 0);
    let h2 = +(t2[8] ?? t2[11] ?? 0);
    60 === h2 && (h2 = 59);
    const u2 = (t2[9] ?? t2[12] ?? "") + "000000000", l2 = +u2.slice(0, 3), m2 = +u2.slice(3, 6), f2 = +u2.slice(6, 9);
    let y2, p2 = false;
    t2[13] ? (y2 = void 0, p2 = true) : t2[14] && (y2 = t2[14]);
    const g2 = t2[15];
    return Ur(o2, i2, a2, c2, d2, h2, l2, m2, f2), { year: o2, month: i2, day: a2, time: s2 ? { hour: c2, minute: d2, second: h2, millisecond: l2, microsecond: m2, nanosecond: f2 } : "start-of-day", tzAnnotation: g2, offset: y2, z: p2, calendar: n2 };
  }
  function Et(e2) {
    const t2 = Ee.exec(e2);
    let n2, r2, o2, i2, a2, s2, c2;
    if (t2) {
      c2 = Tt(t2[10]), n2 = +(t2[1] ?? 0), r2 = +(t2[2] ?? t2[5] ?? 0), o2 = +(t2[3] ?? t2[6] ?? 0), 60 === o2 && (o2 = 59);
      const e3 = (t2[4] ?? t2[7] ?? "") + "000000000";
      if (i2 = +e3.slice(0, 3), a2 = +e3.slice(3, 6), s2 = +e3.slice(6, 9), t2[8]) throw new RangeError("Z designator not supported for PlainTime");
    } else {
      let t3, d2;
      if ({ time: t3, z: d2, calendar: c2 } = Mt(e2), "start-of-day" === t3) throw new RangeError(`time is missing in string: ${e2}`);
      if (d2) throw new RangeError("Z designator not supported for PlainTime");
      ({ hour: n2, minute: r2, second: o2, millisecond: i2, microsecond: a2, nanosecond: s2 } = t3);
    }
    if (Pr(n2, r2, o2, i2, a2, s2), /[tT ][0-9][0-9]/.test(e2)) return { hour: n2, minute: r2, second: o2, millisecond: i2, microsecond: a2, nanosecond: s2, calendar: c2 };
    try {
      const { month: t3, day: n3 } = Ct(e2);
      xr(1972, t3, n3);
    } catch {
      try {
        const { year: t3, month: n3 } = It(e2);
        xr(t3, n3, 1);
      } catch {
        return { hour: n2, minute: r2, second: o2, millisecond: i2, microsecond: a2, nanosecond: s2, calendar: c2 };
      }
    }
    throw new RangeError(`invalid RFC 9557 time-only string ${e2}; may need a T prefix`);
  }
  function It(e2) {
    const t2 = Ie.exec(e2);
    let n2, r2, o2, i2;
    if (t2) {
      o2 = Tt(t2[3]);
      let a2 = t2[1];
      if ("-000000" === a2) throw new RangeError(`invalid RFC 9557 string: ${e2}`);
      if (n2 = +a2, r2 = +t2[2], i2 = 1, void 0 !== o2 && "iso8601" !== o2) throw new RangeError("YYYY-MM format is only valid with iso8601 calendar");
    } else {
      let t3;
      if ({ year: n2, month: r2, calendar: o2, day: i2, z: t3 } = Mt(e2), t3) throw new RangeError("Z designator not supported for PlainYearMonth");
    }
    return { year: n2, month: r2, calendar: o2, referenceISODay: i2 };
  }
  function Ct(e2) {
    const t2 = Ce.exec(e2);
    let n2, r2, o2, i2;
    if (t2) {
      if (o2 = Tt(t2[3]), n2 = +t2[1], r2 = +t2[2], void 0 !== o2 && "iso8601" !== o2) throw new RangeError("MM-DD format is only valid with iso8601 calendar");
    } else {
      let t3;
      if ({ month: n2, day: r2, calendar: o2, year: i2, z: t3 } = Mt(e2), t3) throw new RangeError("Z designator not supported for PlainMonthDay");
    }
    return { month: n2, day: r2, calendar: o2, referenceISOYear: i2 };
  }
  var Ot = new RegExp(`^${fe.source}$`, "i");
  var $t = new RegExp(`^${/([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])?)?/.source}$`);
  function Yt(e2) {
    const t2 = Wo.test(e2) ? "Seconds not allowed in offset time zone" : "Invalid time zone";
    throw new RangeError(`${t2}: ${e2}`);
  }
  function Rt(e2) {
    return Ot.test(e2) || Yt(e2), $t.test(e2) ? { offsetMinutes: sr(e2) / 6e10 } : { tzName: e2 };
  }
  function St(e2, t2, n2, r2) {
    let o2 = e2, i2 = t2, a2 = n2;
    switch (r2) {
      case "reject":
        xr(o2, i2, a2);
        break;
      case "constrain":
        ({ year: o2, month: i2, day: a2 } = kr(o2, i2, a2));
    }
    return { year: o2, month: i2, day: a2 };
  }
  function jt(e2, t2, n2, r2, o2, i2, a2) {
    let s2 = e2, c2 = t2, d2 = n2, h2 = r2, u2 = o2, l2 = i2;
    switch (a2) {
      case "reject":
        Pr(s2, c2, d2, h2, u2, l2);
        break;
      case "constrain":
        s2 = jr(s2, 0, 23), c2 = jr(c2, 0, 59), d2 = jr(d2, 0, 59), h2 = jr(h2, 0, 999), u2 = jr(u2, 0, 999), l2 = jr(l2, 0, 999);
    }
    return { hour: s2, minute: c2, second: d2, millisecond: h2, microsecond: u2, nanosecond: l2 };
  }
  function kt(e2) {
    if (!Ae(e2)) throw new TypeError("invalid duration-like");
    const t2 = { years: void 0, months: void 0, weeks: void 0, days: void 0, hours: void 0, minutes: void 0, seconds: void 0, milliseconds: void 0, microseconds: void 0, nanoseconds: void 0 };
    let n2 = false;
    for (let r2 = 0; r2 < st.length; r2++) {
      const o2 = st[r2], i2 = e2[o2];
      void 0 !== i2 && (n2 = true, t2[o2] = Ge(i2));
    }
    if (!n2) throw new TypeError("invalid duration-like");
    return t2;
  }
  function Nt({ years: e2, months: t2, weeks: n2, days: r2 }, o2, i2, a2) {
    return { years: e2, months: a2 ?? t2, weeks: i2 ?? n2, days: o2 ?? r2 };
  }
  function xt(e2, t2) {
    return { isoDate: e2, time: t2 };
  }
  function Lt(e2) {
    return Ho(e2, "overflow", ["constrain", "reject"], "constrain");
  }
  function Pt(e2) {
    return Ho(e2, "disambiguation", ["compatible", "earlier", "later", "reject"], "compatible");
  }
  function Ut(e2, t2) {
    return Ho(e2, "roundingMode", ["ceil", "floor", "expand", "trunc", "halfCeil", "halfFloor", "halfExpand", "halfTrunc", "halfEven"], t2);
  }
  function Bt(e2, t2) {
    return Ho(e2, "offset", ["prefer", "use", "ignore", "reject"], t2);
  }
  function Zt(e2) {
    return Ho(e2, "calendarName", ["auto", "always", "never", "critical"], "auto");
  }
  function Ft(e2) {
    let t2 = e2.roundingIncrement;
    if (void 0 === t2) return 1;
    const n2 = _e(t2);
    if (n2 < 1 || n2 > 1e9) throw new RangeError(`roundingIncrement must be at least 1 and at most 1e9, not ${t2}`);
    return n2;
  }
  function Ht(e2, t2, n2) {
    const r2 = n2 ? t2 : t2 - 1;
    if (e2 > r2) throw new RangeError(`roundingIncrement must be at least 1 and less than ${r2}, not ${e2}`);
    if (t2 % e2 != 0) throw new RangeError(`Rounding increment must divide evenly into ${t2}`);
  }
  function zt(e2) {
    const t2 = e2.fractionalSecondDigits;
    if (void 0 === t2) return "auto";
    if ("number" != typeof t2) {
      if ("auto" !== We(t2)) throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t2}`);
      return "auto";
    }
    const n2 = Math.floor(t2);
    if (!Number.isFinite(n2) || n2 < 0 || n2 > 9) throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t2}`);
    return n2;
  }
  function At(e2, t2) {
    switch (e2) {
      case "minute":
        return { precision: "minute", unit: "minute", increment: 1 };
      case "second":
        return { precision: 0, unit: "second", increment: 1 };
      case "millisecond":
        return { precision: 3, unit: "millisecond", increment: 1 };
      case "microsecond":
        return { precision: 6, unit: "microsecond", increment: 1 };
      case "nanosecond":
        return { precision: 9, unit: "nanosecond", increment: 1 };
    }
    switch (t2) {
      case "auto":
        return { precision: t2, unit: "nanosecond", increment: 1 };
      case 0:
        return { precision: t2, unit: "second", increment: 1 };
      case 1:
      case 2:
      case 3:
        return { precision: t2, unit: "millisecond", increment: 10 ** (3 - t2) };
      case 4:
      case 5:
      case 6:
        return { precision: t2, unit: "microsecond", increment: 10 ** (6 - t2) };
      case 7:
      case 8:
      case 9:
        return { precision: t2, unit: "nanosecond", increment: 10 ** (9 - t2) };
      default:
        throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t2}`);
    }
  }
  var qt = Symbol("~required~");
  function Wt(e2, t2, n2, r2, o2 = []) {
    let i2 = [];
    for (let e3 = 0; e3 < nt.length; e3++) {
      const t3 = nt[e3], r3 = t3[1], o3 = t3[2];
      "datetime" !== n2 && n2 !== o3 || i2.push(r3);
    }
    i2 = i2.concat(o2);
    let a2 = r2;
    a2 === qt ? a2 = void 0 : void 0 !== a2 && i2.push(a2);
    let s2 = [];
    s2 = s2.concat(i2);
    for (let e3 = 0; e3 < i2.length; e3++) {
      const t3 = i2[e3], n3 = ot[t3];
      void 0 !== n3 && s2.push(n3);
    }
    let c2 = Ho(e2, t2, s2, a2);
    if (void 0 === c2 && r2 === qt) throw new RangeError(`${t2} is required`);
    return c2 && c2 in rt ? rt[c2] : c2;
  }
  function _t(e2) {
    const t2 = e2.relativeTo;
    if (void 0 === t2) return {};
    let n2, r2, o2, i2, a2, s2 = "option", c2 = false;
    if (Ae(t2)) {
      if (wt(t2)) return { zonedRelativeTo: t2 };
      if (mt(t2)) return { plainRelativeTo: t2 };
      if (yt(t2)) return { plainRelativeTo: pn(re(t2, T).isoDate, re(t2, E)) };
      o2 = Nn(t2);
      const e3 = tn(o2, t2, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond", "offset", "timeZone"], []);
      ({ isoDate: n2, time: r2 } = on(o2, e3, "constrain")), { offset: a2, timeZone: i2 } = e3, void 0 === a2 && (s2 = "wall");
    } else {
      let e3, d2, h2, u2, l2;
      if ({ year: h2, month: u2, day: l2, time: r2, calendar: o2, tzAnnotation: e3, offset: a2, z: d2 } = Mt(Ve(t2)), e3) i2 = Bn(e3), d2 ? s2 = "exact" : a2 || (s2 = "wall"), c2 = true;
      else if (d2) throw new RangeError("Z designator not supported for PlainDate relativeTo; either remove the Z or add a bracketed time zone");
      o2 || (o2 = "iso8601"), o2 = zo(o2), n2 = { year: h2, month: u2, day: l2 };
    }
    return void 0 === i2 ? { plainRelativeTo: pn(n2, o2) } : { zonedRelativeTo: $n(mn(n2, r2, s2, "option" === s2 ? sr(a2) : 0, i2, "compatible", "reject", c2), i2, o2) };
  }
  function Jt(e2) {
    return 0 !== re(e2, Y) ? "year" : 0 !== re(e2, R) ? "month" : 0 !== re(e2, S) ? "week" : 0 !== re(e2, j) ? "day" : 0 !== re(e2, k) ? "hour" : 0 !== re(e2, N) ? "minute" : 0 !== re(e2, x) ? "second" : 0 !== re(e2, L) ? "millisecond" : 0 !== re(e2, P) ? "microsecond" : "nanosecond";
  }
  function Gt(e2, t2) {
    return it.indexOf(e2) > it.indexOf(t2) ? t2 : e2;
  }
  function Kt(e2) {
    return "year" === e2 || "month" === e2 || "week" === e2;
  }
  function Vt(e2) {
    return Kt(e2) || "day" === e2 ? "date" : "time";
  }
  function Xt(e2) {
    return ce("%calendarImpl%")(e2);
  }
  function Qt(e2) {
    return ce("%calendarImpl%")(re(e2, E));
  }
  function en(e2, t2, n2 = "date") {
    const r2 = /* @__PURE__ */ Object.create(null), o2 = Xt(e2).isoToDate(t2, { year: true, monthCode: true, day: true });
    return r2.monthCode = o2.monthCode, "month-day" !== n2 && "date" !== n2 || (r2.day = o2.day), "year-month" !== n2 && "date" !== n2 || (r2.year = o2.year), r2;
  }
  function tn(e2, t2, n2, r2, o2) {
    const i2 = Xt(e2).extraFields(n2), a2 = n2.concat(r2, i2), s2 = /* @__PURE__ */ Object.create(null);
    let c2 = false;
    a2.sort();
    for (let e3 = 0; e3 < a2.length; e3++) {
      const n3 = a2[e3], r3 = t2[n3];
      if (void 0 !== r3) c2 = true, s2[n3] = (0, et[n3])(r3);
      else if ("partial" !== o2) {
        if (o2.includes(n3)) throw new TypeError(`required property '${n3}' missing or undefined`);
        s2[n3] = tt[n3];
      }
    }
    if ("partial" === o2 && !c2) throw new TypeError("no supported properties found");
    return s2;
  }
  function nn(e2, t2 = "complete") {
    const n2 = ["hour", "microsecond", "millisecond", "minute", "nanosecond", "second"];
    let r2 = false;
    const o2 = /* @__PURE__ */ Object.create(null);
    for (let i2 = 0; i2 < n2.length; i2++) {
      const a2 = n2[i2], s2 = e2[a2];
      void 0 !== s2 ? (o2[a2] = _e(s2), r2 = true) : "complete" === t2 && (o2[a2] = 0);
    }
    if (!r2) throw new TypeError("invalid time-like");
    return o2;
  }
  function rn(e2, t2) {
    if (Ae(e2)) {
      if (mt(e2)) return Lt(Zo(t2)), pn(re(e2, D), re(e2, E));
      if (wt(e2)) {
        const n4 = zn(re(e2, $), re(e2, b));
        return Lt(Zo(t2)), pn(n4.isoDate, re(e2, E));
      }
      if (yt(e2)) return Lt(Zo(t2)), pn(re(e2, T).isoDate, re(e2, E));
      const n3 = Nn(e2);
      return pn(Ln(n3, tn(n3, e2, ["year", "month", "monthCode", "day"], [], []), Lt(Zo(t2))), n3);
    }
    let { year: n2, month: r2, day: o2, calendar: i2, z: a2 } = Mt(Ve(e2));
    if (a2) throw new RangeError("Z designator not supported for PlainDate");
    return i2 || (i2 = "iso8601"), i2 = zo(i2), Lt(Zo(t2)), pn({ year: n2, month: r2, day: o2 }, i2);
  }
  function on(e2, t2, n2) {
    return xt(Ln(e2, t2, n2), jt(t2.hour, t2.minute, t2.second, t2.millisecond, t2.microsecond, t2.nanosecond, n2));
  }
  function an(e2, t2) {
    let n2, r2, o2;
    if (Ae(e2)) {
      if (yt(e2)) return Lt(Zo(t2)), wn(re(e2, T), re(e2, E));
      if (wt(e2)) {
        const n3 = zn(re(e2, $), re(e2, b));
        return Lt(Zo(t2)), wn(n3, re(e2, E));
      }
      if (mt(e2)) return Lt(Zo(t2)), wn(xt(re(e2, D), { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), re(e2, E));
      o2 = Nn(e2);
      const i2 = tn(o2, e2, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond"], []), a2 = Lt(Zo(t2));
      ({ isoDate: n2, time: r2 } = on(o2, i2, a2));
    } else {
      let i2, a2, s2, c2;
      if ({ year: a2, month: s2, day: c2, time: r2, calendar: o2, z: i2 } = Mt(Ve(e2)), i2) throw new RangeError("Z designator not supported for PlainDateTime");
      "start-of-day" === r2 && (r2 = { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), Ur(a2, s2, c2, r2.hour, r2.minute, r2.second, r2.millisecond, r2.microsecond, r2.nanosecond), o2 || (o2 = "iso8601"), o2 = zo(o2), Lt(Zo(t2)), n2 = { year: a2, month: s2, day: c2 };
    }
    return wn(xt(n2, r2), o2);
  }
  function sn(e2) {
    const t2 = ce("%Temporal.Duration%");
    if (lt(e2)) return new t2(re(e2, Y), re(e2, R), re(e2, S), re(e2, j), re(e2, k), re(e2, N), re(e2, x), re(e2, L), re(e2, P), re(e2, U));
    if (!Ae(e2)) return (function(e3) {
      const { years: t3, months: n3, weeks: r3, days: o2, hours: i2, minutes: a2, seconds: s2, milliseconds: c2, microseconds: d2, nanoseconds: h2 } = (function(e4) {
        const t4 = Ye.exec(e4);
        if (!t4) throw new RangeError(`invalid duration: ${e4}`);
        if (t4.every(((e5, t5) => t5 < 2 || void 0 === e5))) throw new RangeError(`invalid duration: ${e4}`);
        const n4 = "-" === t4[1] ? -1 : 1, r4 = void 0 === t4[2] ? 0 : _e(t4[2]) * n4, o3 = void 0 === t4[3] ? 0 : _e(t4[3]) * n4, i3 = void 0 === t4[4] ? 0 : _e(t4[4]) * n4, a3 = void 0 === t4[5] ? 0 : _e(t4[5]) * n4, s3 = void 0 === t4[6] ? 0 : _e(t4[6]) * n4, c3 = t4[7], d3 = t4[8], h3 = t4[9], u2 = t4[10], l2 = t4[11];
        let m2 = 0, f2 = 0, y2 = 0;
        if (void 0 !== c3) {
          if (d3 ?? h3 ?? u2 ?? l2) throw new RangeError("only the smallest unit can be fractional");
          y2 = 3600 * _e((c3 + "000000000").slice(0, 9)) * n4;
        } else if (m2 = void 0 === d3 ? 0 : _e(d3) * n4, void 0 !== h3) {
          if (u2 ?? l2) throw new RangeError("only the smallest unit can be fractional");
          y2 = 60 * _e((h3 + "000000000").slice(0, 9)) * n4;
        } else f2 = void 0 === u2 ? 0 : _e(u2) * n4, void 0 !== l2 && (y2 = _e((l2 + "000000000").slice(0, 9)) * n4);
        const p2 = y2 % 1e3, g2 = Math.trunc(y2 / 1e3) % 1e3, w2 = Math.trunc(y2 / 1e6) % 1e3;
        return f2 += Math.trunc(y2 / 1e9) % 60, m2 += Math.trunc(y2 / 6e10), zr(r4, o3, i3, a3, s3, m2, f2, w2, g2, p2), { years: r4, months: o3, weeks: i3, days: a3, hours: s3, minutes: m2, seconds: f2, milliseconds: w2, microseconds: g2, nanoseconds: p2 };
      })(e3);
      return new (ce("%Temporal.Duration%"))(t3, n3, r3, o2, i2, a2, s2, c2, d2, h2);
    })(Ve(e2));
    const n2 = { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, microseconds: 0, nanoseconds: 0 };
    let r2 = kt(e2);
    for (let e3 = 0; e3 < st.length; e3++) {
      const t3 = st[e3], o2 = r2[t3];
      void 0 !== o2 && (n2[t3] = o2);
    }
    return new t2(n2.years, n2.months, n2.weeks, n2.days, n2.hours, n2.minutes, n2.seconds, n2.milliseconds, n2.microseconds, n2.nanoseconds);
  }
  function cn(e2) {
    let t2;
    if (Ae(e2)) {
      if (ut(e2) || wt(e2)) return Cn(re(e2, b));
      t2 = Xe(e2);
    } else t2 = e2;
    const { year: n2, month: r2, day: o2, time: i2, offset: a2, z: s2 } = (function(e3) {
      const t3 = Mt(e3);
      if (!t3.z && !t3.offset) throw new RangeError("Temporal.Instant requires a time zone offset");
      return t3;
    })(Ve(t2)), { hour: c2 = 0, minute: d2 = 0, second: h2 = 0, millisecond: u2 = 0, microsecond: l2 = 0, nanosecond: m2 = 0 } = "start-of-day" === i2 ? {} : i2, f2 = $r(n2, r2, o2, c2, d2, h2, u2, l2, m2 - (s2 ? 0 : sr(a2)));
    return Kr(f2.isoDate), Cn(pr(f2));
  }
  function dn(e2, t2) {
    if (Ae(e2)) {
      if (gt(e2)) return Lt(Zo(t2)), bn(re(e2, D), re(e2, E));
      let n3;
      return ne(e2, E) ? n3 = re(e2, E) : (n3 = e2.calendar, void 0 === n3 && (n3 = "iso8601"), n3 = kn(n3)), bn(Un(n3, tn(n3, e2, ["year", "month", "monthCode", "day"], [], []), Lt(Zo(t2))), n3);
    }
    let { month: n2, day: r2, referenceISOYear: o2, calendar: i2 } = Ct(Ve(e2));
    if (void 0 === i2 && (i2 = "iso8601"), i2 = zo(i2), Lt(Zo(t2)), "iso8601" === i2) return bn({ year: 1972, month: n2, day: r2 }, i2);
    let a2 = { year: o2, month: n2, day: r2 };
    return Lr(a2), a2 = Un(i2, en(i2, a2, "month-day"), "constrain"), bn(a2, i2);
  }
  function hn(e2, t2) {
    let n2;
    if (Ae(e2)) {
      if (ft(e2)) return Lt(Zo(t2)), Tn(re(e2, M));
      if (yt(e2)) return Lt(Zo(t2)), Tn(re(e2, T).time);
      if (wt(e2)) {
        const n3 = zn(re(e2, $), re(e2, b));
        return Lt(Zo(t2)), Tn(n3.time);
      }
      const { hour: r2, minute: o2, second: i2, millisecond: a2, microsecond: s2, nanosecond: c2 } = nn(e2);
      n2 = jt(r2, o2, i2, a2, s2, c2, Lt(Zo(t2)));
    } else n2 = Et(Ve(e2)), Lt(Zo(t2));
    return Tn(n2);
  }
  function un(e2) {
    return void 0 === e2 ? { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 } : re(hn(e2), M);
  }
  function ln(e2, t2) {
    if (Ae(e2)) {
      if (pt(e2)) return Lt(Zo(t2)), En(re(e2, D), re(e2, E));
      const n3 = Nn(e2);
      return En(Pn(n3, tn(n3, e2, ["year", "month", "monthCode"], [], []), Lt(Zo(t2))), n3);
    }
    let { year: n2, month: r2, referenceISODay: o2, calendar: i2 } = It(Ve(e2));
    void 0 === i2 && (i2 = "iso8601"), i2 = zo(i2), Lt(Zo(t2));
    let a2 = { year: n2, month: r2, day: o2 };
    return Hr(a2), a2 = Pn(i2, en(i2, a2, "year-month"), "constrain"), En(a2, i2);
  }
  function mn(t2, n2, r2, o2, i2, a2, s2, c2) {
    if ("start-of-day" === n2) return _n(i2, t2);
    const d2 = xt(t2, n2);
    if ("wall" === r2 || "ignore" === s2) return An(i2, d2, a2);
    if ("exact" === r2 || "use" === s2) {
      const e2 = $r(t2.year, t2.month, t2.day, n2.hour, n2.minute, n2.second, n2.millisecond, n2.microsecond, n2.nanosecond - o2);
      Kr(e2.isoDate);
      const r3 = pr(e2);
      return Fr(r3), r3;
    }
    Kr(t2);
    const h2 = pr(d2), u2 = Wn(i2, d2);
    for (let t3 = 0; t3 < u2.length; t3++) {
      const n3 = u2[t3], r3 = import_jsbi.default.toNumber(import_jsbi.default.subtract(h2, n3)), i3 = Eo(r3, 6e10, "halfExpand");
      if (r3 === o2 || c2 && i3 === o2) return n3;
    }
    if ("reject" === s2) {
      const e2 = Hn(o2), t3 = nr(d2, "iso8601", "auto");
      throw new RangeError(`Offset ${e2} is invalid for ${t3} in ${i2}`);
    }
    return qn(u2, i2, d2, a2);
  }
  function fn(e2, t2) {
    let n2, r2, o2, i2, a2, s2, c2, d2 = false, h2 = "option";
    if (Ae(e2)) {
      if (wt(e2)) {
        const n3 = Zo(t2);
        return Pt(n3), Bt(n3, "reject"), Lt(n3), $n(re(e2, b), re(e2, $), re(e2, E));
      }
      a2 = Nn(e2);
      const d3 = tn(a2, e2, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond", "offset", "timeZone"], ["timeZone"]);
      ({ offset: i2, timeZone: o2 } = d3), void 0 === i2 && (h2 = "wall");
      const u3 = Zo(t2);
      s2 = Pt(u3), c2 = Bt(u3, "reject");
      const l2 = Lt(u3);
      ({ isoDate: n2, time: r2 } = on(a2, d3, l2));
    } else {
      let u3, l2, m2, f2, y2;
      ({ year: m2, month: f2, day: y2, time: r2, tzAnnotation: u3, offset: i2, z: l2, calendar: a2 } = (function(e3) {
        const t3 = Mt(e3);
        if (!t3.tzAnnotation) throw new RangeError("Temporal.ZonedDateTime requires a time zone ID in brackets");
        return t3;
      })(Ve(e2))), o2 = Bn(u3), l2 ? h2 = "exact" : i2 || (h2 = "wall"), a2 || (a2 = "iso8601"), a2 = zo(a2), d2 = true;
      const p2 = Zo(t2);
      s2 = Pt(p2), c2 = Bt(p2, "reject"), Lt(p2), n2 = { year: m2, month: f2, day: y2 };
    }
    let u2 = 0;
    return "option" === h2 && (u2 = sr(i2)), $n(mn(n2, r2, h2, u2, o2, s2, c2, d2), o2, a2);
  }
  function yn(e2, t2, n2) {
    Lr(t2), te(e2), oe(e2, D, t2), oe(e2, E, n2), oe(e2, I, true);
  }
  function pn(e2, t2) {
    const n2 = ce("%Temporal.PlainDate%"), r2 = Object.create(n2.prototype);
    return yn(r2, e2, t2), r2;
  }
  function gn(e2, t2, n2) {
    Br(t2), te(e2), oe(e2, T, t2), oe(e2, E, n2);
  }
  function wn(e2, t2) {
    const n2 = ce("%Temporal.PlainDateTime%"), r2 = Object.create(n2.prototype);
    return gn(r2, e2, t2), r2;
  }
  function vn(e2, t2, n2) {
    Lr(t2), te(e2), oe(e2, D, t2), oe(e2, E, n2), oe(e2, O, true);
  }
  function bn(e2, t2) {
    const n2 = ce("%Temporal.PlainMonthDay%"), r2 = Object.create(n2.prototype);
    return vn(r2, e2, t2), r2;
  }
  function Dn(e2, t2) {
    te(e2), oe(e2, M, t2);
  }
  function Tn(e2) {
    const t2 = ce("%Temporal.PlainTime%"), n2 = Object.create(t2.prototype);
    return Dn(n2, e2), n2;
  }
  function Mn(e2, t2, n2) {
    Hr(t2), te(e2), oe(e2, D, t2), oe(e2, E, n2), oe(e2, C, true);
  }
  function En(e2, t2) {
    const n2 = ce("%Temporal.PlainYearMonth%"), r2 = Object.create(n2.prototype);
    return Mn(r2, e2, t2), r2;
  }
  function In(e2, t2) {
    Fr(t2), te(e2), oe(e2, b, t2);
  }
  function Cn(e2) {
    const t2 = ce("%Temporal.Instant%"), n2 = Object.create(t2.prototype);
    return In(n2, e2), n2;
  }
  function On(e2, t2, n2, r2) {
    Fr(t2), te(e2), oe(e2, b, t2), oe(e2, $, n2), oe(e2, E, r2);
  }
  function $n(e2, t2, n2 = "iso8601") {
    const r2 = ce("%Temporal.ZonedDateTime%"), o2 = Object.create(r2.prototype);
    return On(o2, e2, t2, n2), o2;
  }
  function Yn(e2) {
    return Qe.filter(((t2) => void 0 !== e2[t2]));
  }
  function Rn(e2, t2, n2) {
    const r2 = Yn(n2), o2 = Xt(e2).fieldKeysToIgnore(r2), i2 = /* @__PURE__ */ Object.create(null), a2 = Yn(t2);
    for (let e3 = 0; e3 < Qe.length; e3++) {
      let s2;
      const c2 = Qe[e3];
      a2.includes(c2) && !o2.includes(c2) && (s2 = t2[c2]), r2.includes(c2) && (s2 = n2[c2]), void 0 !== s2 && (i2[c2] = s2);
    }
    return i2;
  }
  function Sn(e2, t2, n2, r2) {
    const o2 = Xt(e2).dateAdd(t2, n2, r2);
    return Lr(o2), o2;
  }
  function jn(e2, t2, n2, r2) {
    return Xt(e2).dateUntil(t2, n2, r2);
  }
  function kn(e2) {
    if (Ae(e2) && ne(e2, E)) return re(e2, E);
    const t2 = Ve(e2);
    try {
      return zo(t2);
    } catch {
    }
    let n2;
    try {
      ({ calendar: n2 } = Mt(t2));
    } catch {
      try {
        ({ calendar: n2 } = Et(t2));
      } catch {
        try {
          ({ calendar: n2 } = It(t2));
        } catch {
          ({ calendar: n2 } = Ct(t2));
        }
      }
    }
    return n2 || (n2 = "iso8601"), zo(n2);
  }
  function Nn(e2) {
    if (ne(e2, E)) return re(e2, E);
    const { calendar: t2 } = e2;
    return void 0 === t2 ? "iso8601" : kn(t2);
  }
  function xn(e2, t2) {
    return zo(e2) === zo(t2);
  }
  function Ln(e2, t2, n2) {
    const r2 = Xt(e2);
    r2.resolveFields(t2, "date");
    const o2 = r2.dateToISO(t2, n2);
    return Lr(o2), o2;
  }
  function Pn(e2, t2, n2) {
    const r2 = Xt(e2);
    r2.resolveFields(t2, "year-month"), t2.day = 1;
    const o2 = r2.dateToISO(t2, n2);
    return Hr(o2), o2;
  }
  function Un(e2, t2, n2) {
    const r2 = Xt(e2);
    r2.resolveFields(t2, "month-day");
    const o2 = r2.monthDayToISOReferenceDate(t2, n2);
    return Lr(o2), o2;
  }
  function Bn(e2) {
    if (Ae(e2) && wt(e2)) return re(e2, $);
    const t2 = Ve(e2);
    if ("UTC" === t2) return "UTC";
    const { tzName: n2, offsetMinutes: r2 } = (function(e3) {
      const { tzAnnotation: t3, offset: n3, z: r3 } = (function(e4) {
        if (Ot.test(e4)) return { tzAnnotation: e4, offset: void 0, z: false };
        try {
          const { tzAnnotation: t4, offset: n4, z: r4 } = Mt(e4);
          if (r4 || t4 || n4) return { tzAnnotation: t4, offset: n4, z: r4 };
        } catch {
        }
        Yt(e4);
      })(e3);
      return t3 ? Rt(t3) : r3 ? Rt("UTC") : n3 ? Rt(n3) : void 0;
    })(t2);
    if (void 0 !== r2) return mr(r2);
    const o2 = hr(n2);
    if (!o2) throw new RangeError(`Unrecognized time zone ${n2}`);
    return o2.identifier;
  }
  function Zn(e2, t2) {
    if (e2 === t2) return true;
    const n2 = Rt(e2).offsetMinutes, r2 = Rt(t2).offsetMinutes;
    if (void 0 === n2 && void 0 === r2) {
      const n3 = hr(t2);
      if (!n3) return false;
      const r3 = hr(e2);
      return !!r3 && r3.primaryIdentifier === n3.primaryIdentifier;
    }
    return n2 === r2;
  }
  function Fn(e2, t2) {
    const n2 = Rt(e2).offsetMinutes;
    return void 0 !== n2 ? 6e10 * n2 : lr(e2, t2);
  }
  function Hn(e2) {
    const t2 = e2 < 0 ? "-" : "+", n2 = Math.abs(e2), r2 = Math.floor(n2 / 36e11), o2 = Math.floor(n2 / 6e10) % 60, i2 = Math.floor(n2 / 1e9) % 60, a2 = n2 % 1e9;
    return `${t2}${Vn(r2, o2, i2, a2, 0 === i2 && 0 === a2 ? "minute" : "auto")}`;
  }
  function zn(e2, t2) {
    const n2 = Fn(e2, t2);
    let { isoDate: { year: r2, month: o2, day: i2 }, time: { hour: a2, minute: s2, second: c2, millisecond: d2, microsecond: h2, nanosecond: u2 } } = gr(t2);
    return $r(r2, o2, i2, a2, s2, c2, d2, h2, u2 + n2);
  }
  function An(e2, t2, n2) {
    return qn(Wn(e2, t2), e2, t2, n2);
  }
  function qn(t2, n2, r2, o2) {
    const i2 = t2.length;
    if (1 === i2) return t2[0];
    if (i2) switch (o2) {
      case "compatible":
      case "earlier":
        return t2[0];
      case "later":
        return t2[i2 - 1];
      case "reject":
        throw new RangeError("multiple instants found");
    }
    if ("reject" === o2) throw new RangeError("multiple instants found");
    const a2 = pr(r2), s2 = import_jsbi.default.subtract(a2, l);
    Fr(s2);
    const c2 = Fn(n2, s2), d2 = import_jsbi.default.add(a2, l);
    Fr(d2);
    const h2 = Fn(n2, d2) - c2;
    switch (o2) {
      case "earlier": {
        const e2 = TimeDuration.fromComponents(0, 0, 0, 0, 0, -h2), t3 = fo(r2.time, e2);
        return Wn(n2, xt(Or(r2.isoDate.year, r2.isoDate.month, r2.isoDate.day + t3.deltaDays), t3))[0];
      }
      case "compatible":
      case "later": {
        const e2 = TimeDuration.fromComponents(0, 0, 0, 0, 0, h2), t3 = fo(r2.time, e2), o3 = Wn(n2, xt(Or(r2.isoDate.year, r2.isoDate.month, r2.isoDate.day + t3.deltaDays), t3));
        return o3[o3.length - 1];
      }
    }
  }
  function Wn(t2, n2) {
    if ("UTC" === t2) return Kr(n2.isoDate), [pr(n2)];
    const r2 = Rt(t2).offsetMinutes;
    if (void 0 !== r2) {
      const e2 = $r(n2.isoDate.year, n2.isoDate.month, n2.isoDate.day, n2.time.hour, n2.time.minute - r2, n2.time.second, n2.time.millisecond, n2.time.microsecond, n2.time.nanosecond);
      Kr(e2.isoDate);
      const t3 = pr(e2);
      return Fr(t3), [t3];
    }
    return Kr(n2.isoDate), (function(t3, n3) {
      let r3 = pr(n3), o2 = import_jsbi.default.subtract(r3, l);
      import_jsbi.default.lessThan(o2, xe) && (o2 = r3);
      let i2 = import_jsbi.default.add(r3, l);
      import_jsbi.default.greaterThan(i2, Ne) && (i2 = r3);
      const a2 = lr(t3, o2), s2 = lr(t3, i2), c2 = (a2 === s2 ? [a2] : [a2, s2]).map(((o3) => {
        const i3 = import_jsbi.default.subtract(r3, import_jsbi.default.BigInt(o3)), a3 = (function(e2, t4) {
          const { epochMilliseconds: n4, time: { millisecond: r4, microsecond: o4, nanosecond: i4 } } = gr(t4), { year: a4, month: s3, day: c3, hour: d2, minute: h2, second: u2 } = br(e2, n4);
          return $r(a4, s3, c3, d2, h2, u2, r4, o4, i4);
        })(t3, i3);
        if (0 === jo(n3, a3)) return Fr(i3), i3;
      }));
      return c2.filter(((e2) => void 0 !== e2));
    })(t2, n2);
  }
  function _n(t2, n2) {
    const r2 = xt(n2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), o2 = Wn(t2, r2);
    if (o2.length) return o2[0];
    const i2 = pr(r2), a2 = import_jsbi.default.subtract(i2, l);
    return Fr(a2), wr(t2, a2);
  }
  function Jn(e2) {
    let t2;
    return t2 = e2 < 0 || e2 > 9999 ? (e2 < 0 ? "-" : "+") + Ke(Math.abs(e2), 6) : Ke(e2, 4), t2;
  }
  function Gn(e2) {
    return Ke(e2, 2);
  }
  function Kn(e2, t2) {
    let n2;
    if ("auto" === t2) {
      if (0 === e2) return "";
      n2 = Ke(e2, 9).replace(/0+$/, "");
    } else {
      if (0 === t2) return "";
      n2 = Ke(e2, 9).slice(0, t2);
    }
    return `.${n2}`;
  }
  function Vn(e2, t2, n2, r2, o2) {
    let i2 = `${Gn(e2)}:${Gn(t2)}`;
    return "minute" === o2 || (i2 += `:${Gn(n2)}`, i2 += Kn(r2, o2)), i2;
  }
  function Xn(e2, t2, n2) {
    let r2 = t2;
    void 0 === r2 && (r2 = "UTC");
    const o2 = re(e2, b), i2 = nr(zn(r2, o2), "iso8601", n2, "never");
    let a2 = "Z";
    return void 0 !== t2 && (a2 = fr(Fn(r2, o2))), `${i2}${a2}`;
  }
  function Qn(e2, t2) {
    const n2 = re(e2, Y), r2 = re(e2, R), o2 = re(e2, S), i2 = re(e2, j), a2 = re(e2, k), s2 = re(e2, N), c2 = Mr(e2);
    let d2 = "";
    0 !== n2 && (d2 += `${Math.abs(n2)}Y`), 0 !== r2 && (d2 += `${Math.abs(r2)}M`), 0 !== o2 && (d2 += `${Math.abs(o2)}W`), 0 !== i2 && (d2 += `${Math.abs(i2)}D`);
    let h2 = "";
    0 !== a2 && (h2 += `${Math.abs(a2)}H`), 0 !== s2 && (h2 += `${Math.abs(s2)}M`);
    const u2 = TimeDuration.fromComponents(0, 0, re(e2, x), re(e2, L), re(e2, P), re(e2, U));
    u2.isZero() && !["second", "millisecond", "microsecond", "nanosecond"].includes(Jt(e2)) && "auto" === t2 || (h2 += `${Math.abs(u2.sec)}${Kn(Math.abs(u2.subsec), t2)}S`);
    let l2 = `${c2 < 0 ? "-" : ""}P${d2}`;
    return h2 && (l2 = `${l2}T${h2}`), l2;
  }
  function er(e2, t2 = "auto") {
    const { year: n2, month: r2, day: o2 } = re(e2, D);
    return `${Jn(n2)}-${Gn(r2)}-${Gn(o2)}${Dt(re(e2, E), t2)}`;
  }
  function tr({ hour: e2, minute: t2, second: n2, millisecond: r2, microsecond: o2, nanosecond: i2 }, a2) {
    return Vn(e2, t2, n2, 1e6 * r2 + 1e3 * o2 + i2, a2);
  }
  function nr(e2, t2, n2, r2 = "auto") {
    const { isoDate: { year: o2, month: i2, day: a2 }, time: { hour: s2, minute: c2, second: d2, millisecond: h2, microsecond: u2, nanosecond: l2 } } = e2;
    return `${Jn(o2)}-${Gn(i2)}-${Gn(a2)}T${Vn(s2, c2, d2, 1e6 * h2 + 1e3 * u2 + l2, n2)}${Dt(t2, r2)}`;
  }
  function rr(e2, t2 = "auto") {
    const { year: n2, month: r2, day: o2 } = re(e2, D);
    let i2 = `${Gn(r2)}-${Gn(o2)}`;
    const a2 = re(e2, E);
    "always" !== t2 && "critical" !== t2 && "iso8601" === a2 || (i2 = `${Jn(n2)}-${i2}`);
    const s2 = Dt(a2, t2);
    return s2 && (i2 += s2), i2;
  }
  function or(e2, t2 = "auto") {
    const { year: n2, month: r2, day: o2 } = re(e2, D);
    let i2 = `${Jn(n2)}-${Gn(r2)}`;
    const a2 = re(e2, E);
    "always" !== t2 && "critical" !== t2 && "iso8601" === a2 || (i2 += `-${Gn(o2)}`);
    const s2 = Dt(a2, t2);
    return s2 && (i2 += s2), i2;
  }
  function ir(e2, t2, n2 = "auto", r2 = "auto", o2 = "auto", i2 = void 0) {
    let a2 = re(e2, b);
    if (i2) {
      const { unit: e3, increment: t3, roundingMode: n3 } = i2;
      a2 = Io(a2, t3, e3, n3);
    }
    const s2 = re(e2, $), c2 = Fn(s2, a2);
    let d2 = nr(zn(s2, a2), "iso8601", t2, "never");
    return "never" !== o2 && (d2 += fr(c2)), "never" !== r2 && (d2 += `[${"critical" === r2 ? "!" : ""}${s2}]`), d2 += Dt(re(e2, E), n2), d2;
  }
  function ar(e2) {
    return $t.test(e2);
  }
  function sr(e2) {
    const t2 = _o.exec(e2);
    if (!t2) throw new RangeError(`invalid time zone offset: ${e2}; must match \xB1HH:MM[:SS.SSSSSSSSS]`);
    return ("-" === t2[1] ? -1 : 1) * (1e9 * (60 * (60 * +t2[2] + +(t2[3] || 0)) + +(t2[4] || 0)) + +((t2[5] || 0) + "000000000").slice(0, 9));
  }
  var cr;
  var dr = Object.assign(/* @__PURE__ */ Object.create(null), { "/": true, "-": true, _: true });
  function hr(e2) {
    if (void 0 === cr) {
      const e3 = Intl.supportedValuesOf?.("timeZone");
      if (e3) {
        cr = /* @__PURE__ */ new Map();
        for (let t3 = 0; t3 < e3.length; t3++) {
          const n3 = e3[t3];
          cr.set(Ao(n3), n3);
        }
      } else cr = null;
    }
    const t2 = Ao(e2);
    let n2 = cr?.get(t2);
    if (n2) return { identifier: n2, primaryIdentifier: n2 };
    try {
      n2 = ht(e2).resolvedOptions().timeZone;
    } catch {
      return;
    }
    if ("antarctica/south_pole" === t2 && (n2 = "Antarctica/McMurdo"), ze.has(e2)) throw new RangeError(`${e2} is a legacy time zone identifier from ICU. Use ${n2} instead`);
    const r2 = [...t2].map(((e3, n3) => 0 === n3 || dr[t2[n3 - 1]] ? e3.toUpperCase() : e3)).join("").split("/");
    if (1 === r2.length) return "gb-eire" === t2 ? { identifier: "GB-Eire", primaryIdentifier: n2 } : { identifier: t2.length <= 3 || /[-0-9]/.test(t2) ? t2.toUpperCase() : r2[0], primaryIdentifier: n2 };
    if ("Etc" === r2[0]) return { identifier: `Etc/${["Zulu", "Greenwich", "Universal"].includes(r2[1]) ? r2[1] : r2[1].toUpperCase()}`, primaryIdentifier: n2 };
    if ("Us" === r2[0]) return { identifier: `US/${r2[1]}`, primaryIdentifier: n2 };
    const o2 = /* @__PURE__ */ new Map([["Act", "ACT"], ["Lhi", "LHI"], ["Nsw", "NSW"], ["Dar_Es_Salaam", "Dar_es_Salaam"], ["Port_Of_Spain", "Port_of_Spain"], ["Port-Au-Prince", "Port-au-Prince"], ["Isle_Of_Man", "Isle_of_Man"], ["Comodrivadavia", "ComodRivadavia"], ["Knox_In", "Knox_IN"], ["Dumontdurville", "DumontDUrville"], ["Mcmurdo", "McMurdo"], ["Denoronha", "DeNoronha"], ["Easterisland", "EasterIsland"], ["Bajanorte", "BajaNorte"], ["Bajasur", "BajaSur"]]);
    return r2[1] = o2.get(r2[1]) ?? r2[1], r2.length > 2 && (r2[2] = o2.get(r2[2]) ?? r2[2]), { identifier: r2.join("/"), primaryIdentifier: n2 };
  }
  function ur(e2, t2) {
    const { year: n2, month: r2, day: o2, hour: i2, minute: a2, second: s2 } = br(e2, t2);
    let c2 = t2 % 1e3;
    return c2 < 0 && (c2 += 1e3), 1e6 * (yr({ isoDate: { year: n2, month: r2, day: o2 }, time: { hour: i2, minute: a2, second: s2, millisecond: c2 } }) - t2);
  }
  function lr(e2, t2) {
    return ur(e2, No(t2, "floor"));
  }
  function mr(e2) {
    const t2 = e2 < 0 ? "-" : "+", n2 = Math.abs(e2);
    return `${t2}${Vn(Math.floor(n2 / 60), n2 % 60, 0, 0, "minute")}`;
  }
  function fr(e2) {
    return mr(Eo(e2, je, "halfExpand") / 6e10);
  }
  function yr({ isoDate: { year: e2, month: t2, day: n2 }, time: { hour: r2, minute: o2, second: i2, millisecond: a2 } }) {
    const s2 = e2 % 400, c2 = (e2 - s2) / 400, d2 = /* @__PURE__ */ new Date();
    return d2.setUTCHours(r2, o2, i2, a2), d2.setUTCFullYear(s2, t2 - 1, n2), d2.getTime() + Ue * c2;
  }
  function pr(t2) {
    const n2 = yr(t2), r2 = 1e3 * t2.time.microsecond + t2.time.nanosecond;
    return import_jsbi.default.add(xo(n2), import_jsbi.default.BigInt(r2));
  }
  function gr(t2) {
    let n2 = No(t2, "trunc"), r2 = import_jsbi.default.toNumber(import_jsbi.default.remainder(t2, c));
    r2 < 0 && (r2 += 1e6, n2 -= 1);
    const o2 = Math.floor(r2 / 1e3) % 1e3, i2 = r2 % 1e3, a2 = new Date(n2);
    return { epochMilliseconds: n2, isoDate: { year: a2.getUTCFullYear(), month: a2.getUTCMonth() + 1, day: a2.getUTCDate() }, time: { hour: a2.getUTCHours(), minute: a2.getUTCMinutes(), second: a2.getUTCSeconds(), millisecond: a2.getUTCMilliseconds(), microsecond: o2, nanosecond: i2 } };
  }
  function wr(e2, t2) {
    if ("UTC" === e2) return null;
    const n2 = No(t2, "floor");
    if (n2 < Fe) return wr(e2, xo(Fe));
    const r2 = Date.now(), o2 = Math.max(n2, r2) + 366 * Re * 3;
    let i2 = n2, a2 = ur(e2, i2), s2 = i2, c2 = a2;
    for (; a2 === c2 && i2 < o2; ) {
      if (s2 = i2 + 2 * Re * 7, s2 > ke) return null;
      c2 = ur(e2, s2), a2 === c2 && (i2 = s2);
    }
    return a2 === c2 ? null : xo(Jo(((t3) => ur(e2, t3)), i2, s2, a2, c2));
  }
  function vr(t2, n2) {
    if ("UTC" === t2) return null;
    const r2 = No(n2, "ceil"), o2 = Date.now(), i2 = o2 + 366 * Re * 3;
    if (r2 > i2) {
      const n3 = vr(t2, xo(i2));
      if (null === n3 || import_jsbi.default.lessThan(n3, xo(o2))) return n3;
    }
    if ("Africa/Casablanca" === t2 || "Africa/El_Aaiun" === t2) {
      const e2 = Date.UTC(2088, 0, 1);
      if (e2 < r2) return vr(t2, xo(e2));
    }
    let a2 = r2 - 1;
    if (a2 < Fe) return null;
    let s2 = ur(t2, a2), c2 = a2, d2 = s2;
    for (; s2 === d2 && a2 > Fe; ) {
      if (c2 = a2 - 2 * Re * 7, c2 < Fe) return null;
      d2 = ur(t2, c2), s2 === d2 && (a2 = c2);
    }
    return s2 === d2 ? null : xo(Jo(((e2) => ur(t2, e2)), c2, a2, d2, s2));
  }
  function br(e2, t2) {
    return (function(e3) {
      const t3 = e3.split(/[^\w]+/);
      if (7 !== t3.length) throw new RangeError(`expected 7 parts in "${e3}`);
      const n2 = +t3[0], r2 = +t3[1];
      let o2 = +t3[2];
      const i2 = t3[3];
      if ("b" === i2[0] || "B" === i2[0]) o2 = 1 - o2;
      else if ("a" !== i2[0] && "A" !== i2[0]) throw new RangeError(`Unknown era ${i2} in "${e3}`);
      const a2 = "24" === t3[4] ? 0 : +t3[4], s2 = +t3[5], c2 = +t3[6];
      if (!(Number.isFinite(o2) && Number.isFinite(n2) && Number.isFinite(r2) && Number.isFinite(a2) && Number.isFinite(s2) && Number.isFinite(c2))) throw new RangeError(`Invalid number in "${e3}`);
      return { year: o2, month: n2, day: r2, hour: a2, minute: s2, second: c2 };
    })(ht(e2).format(t2));
  }
  function Dr(e2) {
    return void 0 !== e2 && !(e2 % 4 != 0 || e2 % 100 == 0 && e2 % 400 != 0);
  }
  function Tr(e2, t2) {
    return { standard: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], leapyear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] }[Dr(e2) ? "leapyear" : "standard"][t2 - 1];
  }
  function Mr(e2) {
    const t2 = [re(e2, Y), re(e2, R), re(e2, S), re(e2, j), re(e2, k), re(e2, N), re(e2, x), re(e2, L), re(e2, P), re(e2, U)];
    for (let e3 = 0; e3 < t2.length; e3++) {
      const n2 = t2[e3];
      if (0 !== n2) return n2 < 0 ? -1 : 1;
    }
    return 0;
  }
  function Er(e2) {
    const t2 = ["years", "months", "weeks", "days"];
    for (let n2 = 0; n2 < t2.length; n2++) {
      const r2 = e2[t2[n2]];
      if (0 !== r2) return r2 < 0 ? -1 : 1;
    }
    return 0;
  }
  function Ir(e2) {
    const t2 = Er(e2.date);
    return 0 !== t2 ? t2 : e2.time.sign();
  }
  function Cr(e2, t2) {
    let n2 = e2, r2 = t2;
    if (!Number.isFinite(n2) || !Number.isFinite(r2)) throw new RangeError("infinity is out of range");
    return r2 -= 1, n2 += Math.floor(r2 / 12), r2 %= 12, r2 < 0 && (r2 += 12), r2 += 1, { year: n2, month: r2 };
  }
  function Or(e2, t2, n2) {
    let r2 = e2, o2 = t2, i2 = n2;
    if (!Number.isFinite(i2)) throw new RangeError("infinity is out of range");
    ({ year: r2, month: o2 } = Cr(r2, o2));
    const a2 = 146097;
    if (Math.abs(i2) > a2) {
      const e3 = Math.trunc(i2 / a2);
      r2 += 400 * e3, i2 -= e3 * a2;
    }
    let s2 = 0, c2 = o2 > 2 ? r2 : r2 - 1;
    for (; s2 = Dr(c2) ? 366 : 365, i2 < -s2; ) r2 -= 1, c2 -= 1, i2 += s2;
    for (c2 += 1; s2 = Dr(c2) ? 366 : 365, i2 > s2; ) r2 += 1, c2 += 1, i2 -= s2;
    for (; i2 < 1; ) ({ year: r2, month: o2 } = Cr(r2, o2 - 1)), i2 += Tr(r2, o2);
    for (; i2 > Tr(r2, o2); ) i2 -= Tr(r2, o2), { year: r2, month: o2 } = Cr(r2, o2 + 1);
    return { year: r2, month: o2, day: i2 };
  }
  function $r(e2, t2, n2, r2, o2, i2, a2, s2, c2) {
    const d2 = Yr(r2, o2, i2, a2, s2, c2);
    return xt(Or(e2, t2, n2 + d2.deltaDays), d2);
  }
  function Yr(e2, t2, n2, r2, o2, i2) {
    let a2, s2 = e2, c2 = t2, d2 = n2, h2 = r2, u2 = o2, l2 = i2;
    ({ div: a2, mod: l2 } = de(l2, 3)), u2 += a2, l2 < 0 && (u2 -= 1, l2 += 1e3), { div: a2, mod: u2 } = de(u2, 3), h2 += a2, u2 < 0 && (h2 -= 1, u2 += 1e3), d2 += Math.trunc(h2 / 1e3), h2 %= 1e3, h2 < 0 && (d2 -= 1, h2 += 1e3), c2 += Math.trunc(d2 / 60), d2 %= 60, d2 < 0 && (c2 -= 1, d2 += 60), s2 += Math.trunc(c2 / 60), c2 %= 60, c2 < 0 && (s2 -= 1, c2 += 60);
    let m2 = Math.trunc(s2 / 24);
    return s2 %= 24, s2 < 0 && (m2 -= 1, s2 += 24), m2 += 0, s2 += 0, c2 += 0, d2 += 0, h2 += 0, u2 += 0, l2 += 0, { deltaDays: m2, hour: s2, minute: c2, second: d2, millisecond: h2, microsecond: u2, nanosecond: l2 };
  }
  function Rr(e2, t2) {
    const n2 = Nt(e2, 0);
    if (0 === Er(n2)) return e2.days;
    const r2 = re(t2, D), o2 = Sn(re(t2, E), r2, n2, "constrain"), i2 = Gr(r2.year, r2.month - 1, r2.day), a2 = Gr(o2.year, o2.month - 1, o2.day) - i2;
    return e2.days + a2;
  }
  function Sr(e2) {
    return new (ce("%Temporal.Duration%"))(-re(e2, Y), -re(e2, R), -re(e2, S), -re(e2, j), -re(e2, k), -re(e2, N), -re(e2, x), -re(e2, L), -re(e2, P), -re(e2, U));
  }
  function jr(e2, t2, n2) {
    return Math.min(n2, Math.max(t2, e2));
  }
  function kr(e2, t2, n2) {
    const r2 = jr(t2, 1, 12);
    return { year: e2, month: r2, day: jr(n2, 1, Tr(e2, r2)) };
  }
  function Nr(e2, t2, n2) {
    if (e2 < t2 || e2 > n2) throw new RangeError(`value out of range: ${t2} <= ${e2} <= ${n2}`);
  }
  function xr(e2, t2, n2) {
    Nr(t2, 1, 12), Nr(n2, 1, Tr(e2, t2));
  }
  function Lr(e2) {
    Br(xt(e2, { deltaDays: 0, hour: 12, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }));
  }
  function Pr(e2, t2, n2, r2, o2, i2) {
    Nr(e2, 0, 23), Nr(t2, 0, 59), Nr(n2, 0, 59), Nr(r2, 0, 999), Nr(o2, 0, 999), Nr(i2, 0, 999);
  }
  function Ur(e2, t2, n2, r2, o2, i2, a2, s2, c2) {
    xr(e2, t2, n2), Pr(r2, o2, i2, a2, s2, c2);
  }
  function Br(t2) {
    const n2 = pr(t2);
    (import_jsbi.default.lessThan(n2, Le) || import_jsbi.default.greaterThan(n2, Pe)) && Fr(n2);
  }
  function Zr(e2) {
    pr(e2);
  }
  function Fr(t2) {
    if (import_jsbi.default.lessThan(t2, xe) || import_jsbi.default.greaterThan(t2, Ne)) throw new RangeError("date/time value is outside of supported range");
  }
  function Hr({ year: e2, month: t2 }) {
    Nr(e2, Be, Ze), e2 === Be ? Nr(t2, 4, 12) : e2 === Ze && Nr(t2, 1, 9);
  }
  function zr(e2, t2, n2, r2, o2, i2, a2, s2, c2, d2) {
    let h2 = 0;
    const u2 = [e2, t2, n2, r2, o2, i2, a2, s2, c2, d2];
    for (let e3 = 0; e3 < u2.length; e3++) {
      const t3 = u2[e3];
      if (t3 === 1 / 0 || t3 === -1 / 0) throw new RangeError("infinite values not allowed as duration fields");
      if (0 !== t3) {
        const e4 = t3 < 0 ? -1 : 1;
        if (0 !== h2 && e4 !== h2) throw new RangeError("mixed-sign values not allowed as duration fields");
        h2 = e4;
      }
    }
    if (Math.abs(e2) >= 2 ** 32 || Math.abs(t2) >= 2 ** 32 || Math.abs(n2) >= 2 ** 32) throw new RangeError("years, months, and weeks must be < 2\xB3\xB2");
    const l2 = de(s2, 3), m2 = de(c2, 6), f2 = de(d2, 9), y2 = de(1e6 * l2.mod + 1e3 * m2.mod + f2.mod, 9).div, p2 = 86400 * r2 + 3600 * o2 + 60 * i2 + a2 + l2.div + m2.div + f2.div + y2;
    if (!Number.isSafeInteger(p2)) throw new RangeError("total of duration time units cannot exceed 9007199254740991.999999999 s");
  }
  function Ar(e2) {
    return { date: { years: re(e2, Y), months: re(e2, R), weeks: re(e2, S), days: re(e2, j) }, time: TimeDuration.fromComponents(re(e2, k), re(e2, N), re(e2, x), re(e2, L), re(e2, P), re(e2, U)) };
  }
  function qr(e2) {
    const t2 = TimeDuration.fromComponents(re(e2, k), re(e2, N), re(e2, x), re(e2, L), re(e2, P), re(e2, U)).add24HourDays(re(e2, j));
    return { date: { years: re(e2, Y), months: re(e2, R), weeks: re(e2, S), days: 0 }, time: t2 };
  }
  function Wr(e2) {
    const t2 = qr(e2), n2 = Math.trunc(t2.time.sec / 86400);
    return zr(t2.date.years, t2.date.months, t2.date.weeks, n2, 0, 0, 0, 0, 0, 0), { ...t2.date, days: n2 };
  }
  function _r(e2, t2) {
    const n2 = e2.time.sign();
    let r2 = e2.time.abs().subsec, o2 = 0, i2 = 0, a2 = e2.time.abs().sec, s2 = 0, c2 = 0, d2 = 0;
    switch (t2) {
      case "year":
      case "month":
      case "week":
      case "day":
        o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = Math.trunc(o2 / 1e3), o2 %= 1e3, a2 += Math.trunc(i2 / 1e3), i2 %= 1e3, s2 = Math.trunc(a2 / 60), a2 %= 60, c2 = Math.trunc(s2 / 60), s2 %= 60, d2 = Math.trunc(c2 / 24), c2 %= 24;
        break;
      case "hour":
        o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = Math.trunc(o2 / 1e3), o2 %= 1e3, a2 += Math.trunc(i2 / 1e3), i2 %= 1e3, s2 = Math.trunc(a2 / 60), a2 %= 60, c2 = Math.trunc(s2 / 60), s2 %= 60;
        break;
      case "minute":
        o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = Math.trunc(o2 / 1e3), o2 %= 1e3, a2 += Math.trunc(i2 / 1e3), i2 %= 1e3, s2 = Math.trunc(a2 / 60), a2 %= 60;
        break;
      case "second":
        o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = Math.trunc(o2 / 1e3), o2 %= 1e3, a2 += Math.trunc(i2 / 1e3), i2 %= 1e3;
        break;
      case "millisecond":
        o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = he(a2, 3, Math.trunc(o2 / 1e3)), o2 %= 1e3, a2 = 0;
        break;
      case "microsecond":
        o2 = he(a2, 6, Math.trunc(r2 / 1e3)), r2 %= 1e3, a2 = 0;
        break;
      case "nanosecond":
        r2 = he(a2, 9, r2), a2 = 0;
    }
    return new (ce("%Temporal.Duration%"))(e2.date.years, e2.date.months, e2.date.weeks, e2.date.days + n2 * d2, n2 * c2, n2 * s2, n2 * a2, n2 * i2, n2 * o2, n2 * r2);
  }
  function Jr(e2, t2) {
    return Er(e2), t2.sign(), { date: e2, time: t2 };
  }
  function Gr(e2, t2, n2) {
    return yr({ isoDate: { year: e2, month: t2 + 1, day: n2 }, time: { hour: 0, minute: 0, second: 0, millisecond: 0 } }) / Re;
  }
  function Kr({ year: e2, month: t2, day: n2 }) {
    if (Math.abs(Gr(e2, t2 - 1, n2)) > 1e8) throw new RangeError("date/time value is outside the supported range");
  }
  function Vr(e2, t2) {
    const n2 = t2.hour - e2.hour, r2 = t2.minute - e2.minute, o2 = t2.second - e2.second, i2 = t2.millisecond - e2.millisecond, a2 = t2.microsecond - e2.microsecond, s2 = t2.nanosecond - e2.nanosecond;
    return TimeDuration.fromComponents(n2, r2, o2, i2, a2, s2);
  }
  function Xr(e2, t2, n2, r2, o2) {
    let i2 = TimeDuration.fromEpochNsDiff(t2, e2);
    return i2 = $o(i2, n2, r2, o2), Jr({ years: 0, months: 0, weeks: 0, days: 0 }, i2);
  }
  function Qr(e2, t2, n2, r2) {
    Zr(e2), Zr(t2);
    let o2 = Vr(e2.time, t2.time);
    const i2 = o2.sign(), a2 = Ro(e2.isoDate, t2.isoDate);
    let s2 = t2.isoDate;
    a2 === i2 && (s2 = Or(s2.year, s2.month, s2.day + i2), o2 = o2.add24HourDays(-i2));
    const c2 = Gt("day", r2), d2 = jn(n2, e2.isoDate, s2, c2);
    return r2 !== c2 && (o2 = o2.add24HourDays(d2.days), d2.days = 0), Jr(d2, o2);
  }
  function eo(n2, r2, o2, i2, a2) {
    const s2 = import_jsbi.default.subtract(r2, n2);
    if (import_jsbi.default.equal(s2, t)) return { date: { years: 0, months: 0, weeks: 0, days: 0 }, time: TimeDuration.ZERO };
    const c2 = import_jsbi.default.lessThan(s2, t) ? -1 : 1, d2 = zn(o2, n2), h2 = zn(o2, r2);
    let u2, l2 = 0, m2 = 1 === c2 ? 2 : 1, f2 = Vr(d2.time, h2.time);
    for (f2.sign() === -c2 && l2++; l2 <= m2; l2++) {
      u2 = xt(Or(h2.isoDate.year, h2.isoDate.month, h2.isoDate.day - l2 * c2), d2.time);
      const e2 = An(o2, u2, "compatible");
      if (f2 = TimeDuration.fromEpochNsDiff(r2, e2), f2.sign() !== -c2) break;
    }
    const y2 = Gt("day", a2);
    return Jr(jn(i2, d2.isoDate, u2.isoDate, y2), f2);
  }
  function to(t2, n2, r2, o2, i2, a2, s2, c2, d2) {
    let h2, u2, l2, m2, f2 = n2;
    switch (c2) {
      case "year": {
        const e2 = Eo(f2.date.years, s2, "trunc");
        h2 = e2, u2 = e2 + s2 * t2, l2 = { years: h2, months: 0, weeks: 0, days: 0 }, m2 = { ...l2, years: u2 };
        break;
      }
      case "month": {
        const e2 = Eo(f2.date.months, s2, "trunc");
        h2 = e2, u2 = e2 + s2 * t2, l2 = Nt(f2.date, 0, 0, h2), m2 = Nt(f2.date, 0, 0, u2);
        break;
      }
      case "week": {
        const e2 = Nt(f2.date, 0, 0), n3 = Sn(a2, o2.isoDate, e2, "constrain"), r3 = jn(a2, n3, Or(n3.year, n3.month, n3.day + f2.date.days), "week"), i3 = Eo(f2.date.weeks + r3.weeks, s2, "trunc");
        h2 = i3, u2 = i3 + s2 * t2, l2 = Nt(f2.date, 0, h2), m2 = Nt(f2.date, 0, u2);
        break;
      }
      case "day": {
        const e2 = Eo(f2.date.days, s2, "trunc");
        h2 = e2, u2 = e2 + s2 * t2, l2 = Nt(f2.date, h2), m2 = Nt(f2.date, u2);
        break;
      }
    }
    const y2 = Sn(a2, o2.isoDate, l2, "constrain"), p2 = Sn(a2, o2.isoDate, m2, "constrain");
    let g2, w2;
    const v2 = xt(y2, o2.time), b2 = xt(p2, o2.time);
    i2 ? (g2 = An(i2, v2, "compatible"), w2 = An(i2, b2, "compatible")) : (g2 = pr(v2), w2 = pr(b2));
    const D2 = TimeDuration.fromEpochNsDiff(r2, g2), T2 = TimeDuration.fromEpochNsDiff(w2, g2), M2 = ue(d2, t2 < 0 ? "negative" : "positive"), E2 = D2.add(D2).abs().subtract(T2.abs()).sign(), I2 = Math.abs(h2) / s2 % 2 == 0, C2 = D2.isZero() ? Math.abs(h2) : D2.cmp(T2) ? le(Math.abs(h2), Math.abs(u2), E2, I2, M2) : Math.abs(u2), O2 = new TimeDuration(import_jsbi.default.add(import_jsbi.default.multiply(T2.totalNs, import_jsbi.default.BigInt(h2)), import_jsbi.default.multiply(D2.totalNs, import_jsbi.default.BigInt(s2 * t2)))).fdiv(T2.totalNs), $2 = C2 === Math.abs(u2);
    return f2 = { date: $2 ? m2 : l2, time: TimeDuration.ZERO }, { nudgeResult: { duration: f2, nudgedEpochNs: $2 ? w2 : g2, didExpandCalendarUnit: $2 }, total: O2 };
  }
  function no(t2, n2, r2, o2, i2, a2, s2, c2, d2) {
    let h2 = t2;
    const u2 = Kt(c2) || o2 && "day" === c2, l2 = Ir(h2) < 0 ? -1 : 1;
    let m2;
    return u2 ? { nudgeResult: m2 } = to(l2, h2, n2, r2, o2, i2, s2, c2, d2) : m2 = o2 ? (function(t3, n3, r3, o3, i3, a3, s3, c3) {
      let d3 = n3;
      const h3 = Sn(i3, r3.isoDate, d3.date, "constrain"), u3 = xt(h3, r3.time), l3 = xt(Or(h3.year, h3.month, h3.day + t3), r3.time), m3 = An(o3, u3, "compatible"), f2 = An(o3, l3, "compatible"), y2 = TimeDuration.fromEpochNsDiff(f2, m3);
      if (y2.sign() !== t3) throw new RangeError("time zone returned inconsistent Instants");
      const p2 = import_jsbi.default.BigInt(at[s3] * a3);
      let g2 = d3.time.round(p2, c3);
      const w2 = g2.subtract(y2), v2 = w2.sign() !== -t3;
      let b2, D2;
      return v2 ? (b2 = t3, g2 = w2.round(p2, c3), D2 = g2.addToEpochNs(f2)) : (b2 = 0, D2 = g2.addToEpochNs(m3)), { duration: Jr(Nt(d3.date, d3.date.days + b2), g2), nudgedEpochNs: D2, didExpandCalendarUnit: v2 };
    })(l2, h2, r2, o2, i2, s2, c2, d2) : (function(t3, n3, r3, o3, i3, a3) {
      let s3 = t3;
      const c3 = s3.time.add24HourDays(s3.date.days), d3 = c3.round(import_jsbi.default.BigInt(o3 * at[i3]), a3), h3 = d3.subtract(c3), { quotient: u3 } = c3.divmod(Se), { quotient: l3 } = d3.divmod(Se), m3 = Math.sign(l3 - u3) === c3.sign(), f2 = h3.addToEpochNs(n3);
      let y2 = 0, p2 = d3;
      return "date" === Vt(r3) && (y2 = l3, p2 = d3.add(TimeDuration.fromComponents(24 * -l3, 0, 0, 0, 0, 0))), { duration: { date: Nt(s3.date, y2), time: p2 }, nudgedEpochNs: f2, didExpandCalendarUnit: m3 };
    })(h2, n2, a2, s2, c2, d2), h2 = m2.duration, m2.didExpandCalendarUnit && "week" !== c2 && (h2 = (function(e2, t3, n3, r3, o3, i3, a3, s3) {
      let c3 = t3;
      if (s3 === a3) return c3;
      const d3 = it.indexOf(a3);
      for (let t4 = it.indexOf(s3) - 1; t4 >= d3; t4--) {
        const s4 = it[t4];
        if ("week" === s4 && "week" !== a3) continue;
        let d4;
        switch (s4) {
          case "year":
            d4 = { years: c3.date.years + e2, months: 0, weeks: 0, days: 0 };
            break;
          case "month": {
            const t5 = c3.date.months + e2;
            d4 = Nt(c3.date, 0, 0, t5);
            break;
          }
          case "week": {
            const t5 = c3.date.weeks + e2;
            d4 = Nt(c3.date, 0, t5);
            break;
          }
        }
        const h3 = xt(Sn(i3, r3.isoDate, d4, "constrain"), r3.time);
        let u3;
        if (u3 = o3 ? An(o3, h3, "compatible") : pr(h3), p(n3, u3) === -e2) break;
        c3 = { date: d4, time: TimeDuration.ZERO };
      }
      return c3;
    })(l2, h2, m2.nudgedEpochNs, r2, o2, i2, a2, Gt(c2, "day"))), h2;
  }
  function ro(e2, t2, n2, r2, o2, i2) {
    return Kt(i2) || r2 && "day" === i2 ? to(Ir(e2) < 0 ? -1 : 1, e2, t2, n2, r2, o2, 1, i2, "trunc").total : Yo(e2.time.add24HourDays(e2.date.days), i2);
  }
  function oo(e2, t2, n2, r2, o2, i2, a2) {
    if (0 == jo(e2, t2)) return { date: { years: 0, months: 0, weeks: 0, days: 0 }, time: TimeDuration.ZERO };
    Br(e2), Br(t2);
    const s2 = Qr(e2, t2, n2, r2);
    return "nanosecond" === i2 && 1 === o2 ? s2 : no(s2, pr(t2), e2, null, n2, r2, o2, i2, a2);
  }
  function io(e2, t2, n2, r2, o2, i2, a2, s2) {
    if ("time" === Vt(o2)) return Xr(e2, t2, i2, a2, s2);
    const c2 = eo(e2, t2, n2, r2, o2);
    return "nanosecond" === a2 && 1 === i2 ? c2 : no(c2, t2, zn(n2, e2), n2, r2, o2, i2, a2, s2);
  }
  function ao(e2, t2, n2, r2, o2, i2) {
    const a2 = nt.reduce(((e3, t3) => {
      const o3 = t3[0], i3 = t3[1], a3 = t3[2];
      return "datetime" !== n2 && a3 !== n2 || r2.includes(i3) || e3.push(i3, o3), e3;
    }), []);
    let s2 = Wt(t2, "largestUnit", n2, "auto");
    if (r2.includes(s2)) throw new RangeError(`largestUnit must be one of ${a2.join(", ")}, not ${s2}`);
    const c2 = Ft(t2);
    let d2 = Ut(t2, "trunc");
    "since" === e2 && (d2 = (function(e3) {
      switch (e3) {
        case "ceil":
          return "floor";
        case "floor":
          return "ceil";
        case "halfCeil":
          return "halfFloor";
        case "halfFloor":
          return "halfCeil";
        default:
          return e3;
      }
    })(d2));
    const h2 = Wt(t2, "smallestUnit", n2, o2);
    if (r2.includes(h2)) throw new RangeError(`smallestUnit must be one of ${a2.join(", ")}, not ${h2}`);
    const u2 = Gt(i2, h2);
    if ("auto" === s2 && (s2 = u2), Gt(s2, h2) !== s2) throw new RangeError(`largestUnit ${s2} cannot be smaller than smallestUnit ${h2}`);
    const l2 = { hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[h2];
    return void 0 !== l2 && Ht(c2, l2, false), { largestUnit: s2, roundingIncrement: c2, roundingMode: d2, smallestUnit: h2 };
  }
  function so(e2, t2, n2, r2) {
    const o2 = cn(n2), i2 = ao(e2, Zo(r2), "time", [], "nanosecond", "second");
    let a2 = _r(Xr(re(t2, b), re(o2, b), i2.roundingIncrement, i2.smallestUnit, i2.roundingMode), i2.largestUnit);
    return "since" === e2 && (a2 = Sr(a2)), a2;
  }
  function co(e2, t2, n2, r2) {
    const o2 = rn(n2), i2 = re(t2, E), a2 = re(o2, E);
    if (!xn(i2, a2)) throw new RangeError(`cannot compute difference between dates of ${i2} and ${a2} calendars`);
    const s2 = ao(e2, Zo(r2), "date", [], "day", "day"), c2 = ce("%Temporal.Duration%"), d2 = re(t2, D), h2 = re(o2, D);
    if (0 === Ro(d2, h2)) return new c2();
    let u2 = { date: jn(i2, d2, h2, s2.largestUnit), time: TimeDuration.ZERO };
    if ("day" !== s2.smallestUnit || 1 !== s2.roundingIncrement) {
      const e3 = xt(d2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
      u2 = no(u2, pr(xt(h2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 })), e3, null, i2, s2.largestUnit, s2.roundingIncrement, s2.smallestUnit, s2.roundingMode);
    }
    let l2 = _r(u2, "day");
    return "since" === e2 && (l2 = Sr(l2)), l2;
  }
  function ho(e2, t2, n2, r2) {
    const o2 = an(n2), i2 = re(t2, E), a2 = re(o2, E);
    if (!xn(i2, a2)) throw new RangeError(`cannot compute difference between dates of ${i2} and ${a2} calendars`);
    const s2 = ao(e2, Zo(r2), "datetime", [], "nanosecond", "day"), c2 = ce("%Temporal.Duration%"), d2 = re(t2, T), h2 = re(o2, T);
    if (0 === jo(d2, h2)) return new c2();
    let u2 = _r(oo(d2, h2, i2, s2.largestUnit, s2.roundingIncrement, s2.smallestUnit, s2.roundingMode), s2.largestUnit);
    return "since" === e2 && (u2 = Sr(u2)), u2;
  }
  function uo(e2, t2, n2, r2) {
    const o2 = hn(n2), i2 = ao(e2, Zo(r2), "time", [], "nanosecond", "hour");
    let a2 = Vr(re(t2, M), re(o2, M));
    a2 = $o(a2, i2.roundingIncrement, i2.smallestUnit, i2.roundingMode);
    let s2 = _r(Jr({ years: 0, months: 0, weeks: 0, days: 0 }, a2), i2.largestUnit);
    return "since" === e2 && (s2 = Sr(s2)), s2;
  }
  function lo(e2, t2, n2, r2) {
    const o2 = ln(n2), i2 = re(t2, E), a2 = re(o2, E);
    if (!xn(i2, a2)) throw new RangeError(`cannot compute difference between months of ${i2} and ${a2} calendars`);
    const s2 = ao(e2, Zo(r2), "date", ["week", "day"], "month", "year"), c2 = ce("%Temporal.Duration%");
    if (0 == Ro(re(t2, D), re(o2, D))) return new c2();
    const d2 = en(i2, re(t2, D), "year-month");
    d2.day = 1;
    const h2 = Ln(i2, d2, "constrain"), u2 = en(i2, re(o2, D), "year-month");
    u2.day = 1;
    const l2 = Ln(i2, u2, "constrain");
    let m2 = { date: Nt(jn(i2, h2, l2, s2.largestUnit), 0, 0), time: TimeDuration.ZERO };
    if ("month" !== s2.smallestUnit || 1 !== s2.roundingIncrement) {
      const e3 = xt(h2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
      m2 = no(m2, pr(xt(l2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 })), e3, null, i2, s2.largestUnit, s2.roundingIncrement, s2.smallestUnit, s2.roundingMode);
    }
    let f2 = _r(m2, "day");
    return "since" === e2 && (f2 = Sr(f2)), f2;
  }
  function mo(t2, n2, r2, o2) {
    const i2 = fn(r2), a2 = re(n2, E), s2 = re(i2, E);
    if (!xn(a2, s2)) throw new RangeError(`cannot compute difference between dates of ${a2} and ${s2} calendars`);
    const c2 = ao(t2, Zo(o2), "datetime", [], "nanosecond", "hour"), d2 = re(n2, b), h2 = re(i2, b), u2 = ce("%Temporal.Duration%");
    let l2;
    if ("date" !== Vt(c2.largestUnit)) l2 = _r(Xr(d2, h2, c2.roundingIncrement, c2.smallestUnit, c2.roundingMode), c2.largestUnit);
    else {
      const t3 = re(n2, $);
      if (!Zn(t3, re(i2, $))) throw new RangeError("When calculating difference between time zones, largestUnit must be 'hours' or smaller because day lengths can vary between time zones due to DST or time zone offset changes.");
      if (import_jsbi.default.equal(d2, h2)) return new u2();
      l2 = _r(io(d2, h2, t3, a2, c2.largestUnit, c2.roundingIncrement, c2.smallestUnit, c2.roundingMode), "hour");
    }
    return "since" === t2 && (l2 = Sr(l2)), l2;
  }
  function fo({ hour: e2, minute: t2, second: n2, millisecond: r2, microsecond: o2, nanosecond: i2 }, a2) {
    let s2 = n2, c2 = i2;
    return s2 += a2.sec, c2 += a2.subsec, Yr(e2, t2, s2, r2, o2, c2);
  }
  function yo(e2, t2) {
    const n2 = t2.addToEpochNs(e2);
    return Fr(n2), n2;
  }
  function po(e2, t2, n2, r2, o2 = "constrain") {
    if (0 === Er(r2.date)) return yo(e2, r2.time);
    const i2 = zn(t2, e2);
    return yo(An(t2, xt(Sn(n2, i2.isoDate, r2.date, o2), i2.time), "compatible"), r2.time);
  }
  function go(e2, t2, n2) {
    let r2 = sn(n2);
    "subtract" === e2 && (r2 = Sr(r2));
    const o2 = Gt(Jt(t2), Jt(r2));
    if (Kt(o2)) throw new RangeError("For years, months, or weeks arithmetic, use date arithmetic relative to a starting point");
    const i2 = qr(t2), a2 = qr(r2);
    return _r(Jr({ years: 0, months: 0, weeks: 0, days: 0 }, i2.time.add(a2.time)), o2);
  }
  function wo(e2, t2, n2) {
    let r2 = sn(n2);
    "subtract" === e2 && (r2 = Sr(r2));
    const o2 = Jt(r2);
    if ("date" === Vt(o2)) throw new RangeError(`Duration field ${o2} not supported by Temporal.Instant. Try Temporal.ZonedDateTime instead.`);
    const i2 = qr(r2);
    return Cn(yo(re(t2, b), i2.time));
  }
  function vo(e2, t2, n2, r2) {
    const o2 = re(t2, E);
    let i2 = sn(n2);
    "subtract" === e2 && (i2 = Sr(i2));
    const a2 = Wr(i2), s2 = Lt(Zo(r2));
    return pn(Sn(o2, re(t2, D), a2, s2), o2);
  }
  function bo(e2, t2, n2, r2) {
    let o2 = sn(n2);
    "subtract" === e2 && (o2 = Sr(o2));
    const i2 = Lt(Zo(r2)), a2 = re(t2, E), s2 = qr(o2), c2 = re(t2, T), d2 = fo(c2.time, s2.time), h2 = Nt(s2.date, d2.deltaDays);
    return zr(h2.years, h2.months, h2.weeks, h2.days, 0, 0, 0, 0, 0, 0), wn(xt(Sn(a2, c2.isoDate, h2, i2), d2), a2);
  }
  function Do(e2, t2, n2) {
    let r2 = sn(n2);
    "subtract" === e2 && (r2 = Sr(r2));
    const o2 = qr(r2), { hour: i2, minute: a2, second: s2, millisecond: c2, microsecond: d2, nanosecond: h2 } = fo(re(t2, M), o2.time);
    return Tn(jt(i2, a2, s2, c2, d2, h2, "reject"));
  }
  function To(e2, t2, n2, r2) {
    let o2 = sn(n2);
    "subtract" === e2 && (o2 = Sr(o2));
    const i2 = Lt(Zo(r2)), a2 = Mr(o2), s2 = re(t2, E), c2 = en(s2, re(t2, D), "year-month");
    c2.day = 1;
    let d2 = Ln(s2, c2, "constrain");
    if (a2 < 0) {
      const e3 = Sn(s2, d2, { months: 1 }, "constrain");
      d2 = Or(e3.year, e3.month, e3.day - 1);
    }
    const h2 = Wr(o2);
    return Lr(d2), En(Pn(s2, en(s2, Sn(s2, d2, h2, i2), "year-month"), i2), s2);
  }
  function Mo(e2, t2, n2, r2) {
    let o2 = sn(n2);
    "subtract" === e2 && (o2 = Sr(o2));
    const i2 = Lt(Zo(r2)), a2 = re(t2, $), s2 = re(t2, E), c2 = Ar(o2);
    return $n(po(re(t2, b), a2, s2, c2, i2), a2, s2);
  }
  function Eo(e2, t2, n2) {
    const r2 = Math.trunc(e2 / t2), o2 = e2 % t2, i2 = e2 < 0 ? "negative" : "positive", a2 = Math.abs(r2), s2 = a2 + 1, c2 = Bo(Math.abs(2 * o2) - t2), d2 = a2 % 2 == 0, h2 = ue(n2, i2), u2 = 0 === o2 ? a2 : le(a2, s2, c2, d2, h2);
    return t2 * ("positive" === i2 ? u2 : -u2);
  }
  function Io(o2, i2, a2, s2) {
    const c2 = at[a2] * i2;
    return (function(o3, i3, a3) {
      const s3 = m(o3), c3 = m(i3), d2 = import_jsbi.default.divide(s3, c3), h2 = import_jsbi.default.remainder(s3, c3), u2 = ue(a3, "positive");
      let l2, g2;
      import_jsbi.default.lessThan(s3, t) ? (l2 = import_jsbi.default.subtract(d2, n), g2 = d2) : (l2 = d2, g2 = import_jsbi.default.add(d2, n));
      const w2 = p(y(import_jsbi.default.multiply(h2, r)), c3) * (import_jsbi.default.lessThan(s3, t) ? -1 : 1) + 0, v2 = import_jsbi.default.equal(h2, t) ? d2 : le(l2, g2, w2, f(l2), u2);
      return import_jsbi.default.multiply(v2, c3);
    })(o2, import_jsbi.default.BigInt(c2), s2);
  }
  function Co(e2, t2, n2, r2) {
    Zr(e2);
    const { year: o2, month: i2, day: a2 } = e2.isoDate, s2 = Oo(e2.time, t2, n2, r2);
    return xt(Or(o2, i2, a2 + s2.deltaDays), s2);
  }
  function Oo({ hour: e2, minute: t2, second: n2, millisecond: r2, microsecond: o2, nanosecond: i2 }, a2, s2, c2) {
    let d2;
    switch (s2) {
      case "day":
      case "hour":
        d2 = 1e3 * (1e3 * (1e3 * (60 * (60 * e2 + t2) + n2) + r2) + o2) + i2;
        break;
      case "minute":
        d2 = 1e3 * (1e3 * (1e3 * (60 * t2 + n2) + r2) + o2) + i2;
        break;
      case "second":
        d2 = 1e3 * (1e3 * (1e3 * n2 + r2) + o2) + i2;
        break;
      case "millisecond":
        d2 = 1e3 * (1e3 * r2 + o2) + i2;
        break;
      case "microsecond":
        d2 = 1e3 * o2 + i2;
        break;
      case "nanosecond":
        d2 = i2;
    }
    const h2 = at[s2], u2 = Eo(d2, h2 * a2, c2) / h2;
    switch (s2) {
      case "day":
        return { deltaDays: u2, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 };
      case "hour":
        return Yr(u2, 0, 0, 0, 0, 0);
      case "minute":
        return Yr(e2, u2, 0, 0, 0, 0);
      case "second":
        return Yr(e2, t2, u2, 0, 0, 0);
      case "millisecond":
        return Yr(e2, t2, n2, u2, 0, 0);
      case "microsecond":
        return Yr(e2, t2, n2, r2, u2, 0);
      case "nanosecond":
        return Yr(e2, t2, n2, r2, o2, u2);
      default:
        throw new Error(`Invalid unit ${s2}`);
    }
  }
  function $o(t2, n2, r2, o2) {
    const i2 = at[r2];
    return t2.round(import_jsbi.default.BigInt(i2 * n2), o2);
  }
  function Yo(t2, n2) {
    const r2 = at[n2];
    return t2.fdiv(import_jsbi.default.BigInt(r2));
  }
  function Ro(e2, t2) {
    return e2.year !== t2.year ? Bo(e2.year - t2.year) : e2.month !== t2.month ? Bo(e2.month - t2.month) : e2.day !== t2.day ? Bo(e2.day - t2.day) : 0;
  }
  function So(e2, t2) {
    return e2.hour !== t2.hour ? Bo(e2.hour - t2.hour) : e2.minute !== t2.minute ? Bo(e2.minute - t2.minute) : e2.second !== t2.second ? Bo(e2.second - t2.second) : e2.millisecond !== t2.millisecond ? Bo(e2.millisecond - t2.millisecond) : e2.microsecond !== t2.microsecond ? Bo(e2.microsecond - t2.microsecond) : e2.nanosecond !== t2.nanosecond ? Bo(e2.nanosecond - t2.nanosecond) : 0;
  }
  function jo(e2, t2) {
    const n2 = Ro(e2.isoDate, t2.isoDate);
    return 0 !== n2 ? n2 : So(e2.time, t2.time);
  }
  function ko(e2) {
    const t2 = Lo(e2);
    return void 0 !== globalThis.BigInt ? globalThis.BigInt(t2.toString(10)) : t2;
  }
  function No(t2, n2) {
    const r2 = m(t2), { quotient: o2, remainder: i2 } = g(r2, c);
    let a2 = import_jsbi.default.toNumber(o2);
    return "floor" === n2 && import_jsbi.default.toNumber(i2) < 0 && (a2 -= 1), "ceil" === n2 && import_jsbi.default.toNumber(i2) > 0 && (a2 += 1), a2;
  }
  function xo(t2) {
    if (!Number.isInteger(t2)) throw new RangeError("epoch milliseconds must be an integer");
    return import_jsbi.default.multiply(import_jsbi.default.BigInt(t2), c);
  }
  function Lo(t2) {
    let n2 = t2;
    if ("object" == typeof t2) {
      const e2 = t2[Symbol.toPrimitive];
      e2 && "function" == typeof e2 && (n2 = e2.call(t2, "number"));
    }
    if ("number" == typeof n2) throw new TypeError("cannot convert number to bigint");
    return "bigint" == typeof n2 ? import_jsbi.default.BigInt(n2.toString(10)) : import_jsbi.default.BigInt(n2);
  }
  var Po = (() => {
    let t2 = import_jsbi.default.BigInt(Date.now() % 1e6);
    return () => {
      const n2 = Date.now(), r2 = import_jsbi.default.BigInt(n2), o2 = import_jsbi.default.add(xo(n2), t2);
      return t2 = import_jsbi.default.remainder(r2, c), import_jsbi.default.greaterThan(o2, Ne) ? Ne : import_jsbi.default.lessThan(o2, xe) ? xe : o2;
    };
  })();
  function Uo() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  function Bo(e2) {
    return e2 < 0 ? -1 : e2 > 0 ? 1 : e2;
  }
  function Zo(e2) {
    if (void 0 === e2) return /* @__PURE__ */ Object.create(null);
    if (Ae(e2) && null !== e2) return e2;
    throw new TypeError("Options parameter must be an object, not " + (null === e2 ? "null" : typeof e2));
  }
  function Fo(e2, t2) {
    const n2 = /* @__PURE__ */ Object.create(null);
    return n2[e2] = t2, n2;
  }
  function Ho(e2, t2, n2, r2) {
    let o2 = e2[t2];
    if (void 0 !== o2) {
      if (o2 = We(o2), !n2.includes(o2)) throw new RangeError(`${t2} must be one of ${n2.join(", ")}, not ${o2}`);
      return o2;
    }
    if (r2 === qt) throw new RangeError(`${t2} option is required`);
    return r2;
  }
  function zo(e2) {
    const t2 = Ao(e2);
    if (!He.includes(Ao(t2))) throw new RangeError(`invalid calendar identifier ${t2}`);
    switch (t2) {
      case "ethiopic-amete-alem":
        return "ethioaa";
      case "islamicc":
        return "islamic-civil";
    }
    return t2;
  }
  function Ao(e2) {
    let t2 = "";
    for (let n2 = 0; n2 < e2.length; n2++) {
      const r2 = e2.charCodeAt(n2);
      t2 += r2 >= 65 && r2 <= 90 ? String.fromCharCode(r2 + 32) : String.fromCharCode(r2);
    }
    return t2;
  }
  function qo(e2) {
    throw new TypeError(`Do not use built-in arithmetic operators with Temporal objects. When comparing, use ${"PlainMonthDay" === e2 ? "Temporal.PlainDate.compare(obj1.toPlainDate(year), obj2.toPlainDate(year))" : `Temporal.${e2}.compare(obj1, obj2)`}, not obj1 > obj2. When coercing to strings, use \`\${obj}\` or String(obj), not '' + obj. When coercing to numbers, use properties or methods of the object, not \`+obj\`. When concatenating with strings, use \`\${str}\${obj}\` or str.concat(obj), not str + obj. In React, coerce to a string before rendering a Temporal object.`);
  }
  var Wo = new RegExp(`^${be.source}$`);
  var _o = new RegExp(`^${/([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])(?::?([0-5][0-9])(?:[.,](\d{1,9}))?)?)?/.source}$`);
  function Jo(e2, t2, n2, r2 = e2(t2), o2 = e2(n2)) {
    let i2 = t2, a2 = n2, s2 = r2, c2 = o2;
    for (; a2 - i2 > 1; ) {
      let t3 = Math.trunc((i2 + a2) / 2);
      const n3 = e2(t3);
      n3 === s2 ? (i2 = t3, s2 = n3) : n3 === c2 && (a2 = t3, c2 = n3);
    }
    return a2;
  }
  function Go(e2) {
    return [...e2];
  }
  function Ko(e2, t2) {
    if ("gregory" !== e2 && "iso8601" !== e2) return;
    const n2 = Xo[e2];
    let r2 = t2.year;
    const { dayOfWeek: o2, dayOfYear: i2, daysInYear: a2 } = n2.isoToDate(t2, { dayOfWeek: true, dayOfYear: true, daysInYear: true }), s2 = n2.getFirstDayOfWeek(), c2 = n2.getMinimalDaysInFirstWeek();
    let d2 = (o2 + 7 - s2) % 7, h2 = (o2 - i2 + 7001 - s2) % 7, u2 = Math.floor((i2 - 1 + h2) / 7);
    if (7 - h2 >= c2 && ++u2, 0 == u2) u2 = (function(e3, t3, n3, r3) {
      let o3 = (r3 - e3 - n3 + 1) % 7;
      o3 < 0 && (o3 += 7);
      let i3 = Math.floor((n3 + o3 - 1) / 7);
      return 7 - o3 >= t3 && ++i3, i3;
    })(s2, c2, i2 + n2.isoToDate(n2.dateAdd(t2, { years: -1 }, "constrain"), { daysInYear: true }).daysInYear, o2), r2--;
    else if (i2 >= a2 - 5) {
      let e3 = (d2 + a2 - i2) % 7;
      e3 < 0 && (e3 += 7), 6 - e3 >= c2 && i2 + 7 - d2 > a2 && (u2 = 1, r2++);
    }
    return { week: u2, year: r2 };
  }
  function Vo(e2, t2, n2, r2, o2) {
    if (t2 !== o2.year) {
      if (e2 * (t2 - o2.year) > 0) return true;
    } else if (n2 !== o2.month) {
      if (e2 * (n2 - o2.month) > 0) return true;
    } else if (r2 !== o2.day && e2 * (r2 - o2.day) > 0) return true;
    return false;
  }
  var Xo = {};
  function Qo(e2) {
    if (!e2.startsWith("M")) throw new RangeError(`Invalid month code: ${e2}.  Month codes must start with M.`);
    const t2 = +e2.slice(1);
    if (Number.isNaN(t2)) throw new RangeError(`Invalid month code: ${e2}`);
    return t2;
  }
  function ei(e2, t2 = false) {
    return `M${`${e2}`.padStart(2, "0")}${t2 ? "L" : ""}`;
  }
  function ti(e2, t2 = void 0, n2 = 12) {
    let { month: r2, monthCode: o2 } = e2;
    if (void 0 === o2) {
      if (void 0 === r2) throw new TypeError("Either month or monthCode are required");
      "reject" === t2 && Nr(r2, 1, n2), "constrain" === t2 && (r2 = jr(r2, 1, n2)), o2 = ei(r2);
    } else {
      const e3 = Qo(o2);
      if (o2 !== ei(e3)) throw new RangeError(`Invalid month code: ${o2}`);
      if (void 0 !== r2 && r2 !== e3) throw new RangeError(`monthCode ${o2} and month ${r2} must match if both are present`);
      if (r2 = e3, r2 < 1 || r2 > n2) throw new RangeError(`Invalid monthCode: ${o2}`);
    }
    return { ...e2, month: r2, monthCode: o2 };
  }
  Xo.iso8601 = { resolveFields(e2, t2) {
    if (("date" === t2 || "year-month" === t2) && void 0 === e2.year) throw new TypeError("year is required");
    if (("date" === t2 || "month-day" === t2) && void 0 === e2.day) throw new TypeError("day is required");
    Object.assign(e2, ti(e2));
  }, dateToISO: (e2, t2) => St(e2.year, e2.month, e2.day, t2), monthDayToISOReferenceDate(e2, t2) {
    const { month: n2, day: r2 } = St(e2.year ?? 1972, e2.month, e2.day, t2);
    return { month: n2, day: r2, year: 1972 };
  }, extraFields: () => [], fieldKeysToIgnore(e2) {
    const t2 = /* @__PURE__ */ new Set();
    for (let n2 = 0; n2 < e2.length; n2++) {
      const r2 = e2[n2];
      t2.add(r2), "month" === r2 ? t2.add("monthCode") : "monthCode" === r2 && t2.add("month");
    }
    return Go(t2);
  }, dateAdd(e2, { years: t2 = 0, months: n2 = 0, weeks: r2 = 0, days: o2 = 0 }, i2) {
    let { year: a2, month: s2, day: c2 } = e2;
    return a2 += t2, s2 += n2, { year: a2, month: s2 } = Cr(a2, s2), { year: a2, month: s2, day: c2 } = St(a2, s2, c2, i2), c2 += o2 + 7 * r2, Or(a2, s2, c2);
  }, dateUntil(e2, t2, n2) {
    const r2 = -Ro(e2, t2);
    if (0 === r2) return { years: 0, months: 0, weeks: 0, days: 0 };
    let o2, i2 = 0, a2 = 0;
    if ("year" === n2 || "month" === n2) {
      let s3 = t2.year - e2.year;
      for (0 !== s3 && (s3 -= r2); !Vo(r2, e2.year + s3, e2.month, e2.day, t2); ) i2 = s3, s3 += r2;
      let c3 = r2;
      for (o2 = Cr(e2.year + i2, e2.month + c3); !Vo(r2, o2.year, o2.month, e2.day, t2); ) a2 = c3, c3 += r2, o2 = Cr(o2.year, o2.month + r2);
      "month" === n2 && (a2 += 12 * i2, i2 = 0);
    }
    o2 = Cr(e2.year + i2, e2.month + a2);
    const s2 = kr(o2.year, o2.month, e2.day);
    let c2 = 0, d2 = Gr(t2.year, t2.month - 1, t2.day) - Gr(s2.year, s2.month - 1, s2.day);
    return "week" === n2 && (c2 = Math.trunc(d2 / 7), d2 %= 7), { years: i2, months: a2, weeks: c2, days: d2 };
  }, isoToDate({ year: e2, month: t2, day: n2 }, r2) {
    const o2 = { era: void 0, eraYear: void 0, year: e2, month: t2, day: n2, daysInWeek: 7, monthsInYear: 12 };
    if (r2.monthCode && (o2.monthCode = ei(t2)), r2.dayOfWeek) {
      const r3 = t2 + (t2 < 3 ? 10 : -2), i2 = e2 - (t2 < 3 ? 1 : 0), a2 = Math.floor(i2 / 100), s2 = i2 - 100 * a2, c2 = (n2 + Math.floor(2.6 * r3 - 0.2) + (s2 + Math.floor(s2 / 4)) + (Math.floor(a2 / 4) - 2 * a2)) % 7;
      o2.dayOfWeek = c2 + (c2 <= 0 ? 7 : 0);
    }
    if (r2.dayOfYear) {
      let r3 = n2;
      for (let n3 = t2 - 1; n3 > 0; n3--) r3 += Tr(e2, n3);
      o2.dayOfYear = r3;
    }
    return r2.weekOfYear && (o2.weekOfYear = Ko("iso8601", { year: e2, month: t2, day: n2 })), r2.daysInMonth && (o2.daysInMonth = Tr(e2, t2)), (r2.daysInYear || r2.inLeapYear) && (o2.inLeapYear = Dr(e2), o2.daysInYear = o2.inLeapYear ? 366 : 365), o2;
  }, getFirstDayOfWeek: () => 1, getMinimalDaysInFirstWeek: () => 4 };
  var OneObjectCache = class _OneObjectCache {
    constructor(e2) {
      if (this.map = /* @__PURE__ */ new Map(), this.calls = 0, this.hits = 0, this.misses = 0, void 0 !== e2) {
        let t2 = 0;
        for (const n2 of e2.map.entries()) {
          if (++t2 > _OneObjectCache.MAX_CACHE_ENTRIES) break;
          this.map.set(...n2);
        }
      }
    }
    get(e2) {
      const t2 = this.map.get(e2);
      return t2 && (this.hits++, this.report()), this.calls++, t2;
    }
    set(e2, t2) {
      this.map.set(e2, t2), this.misses++, this.report();
    }
    report() {
    }
    setObject(e2) {
      if (_OneObjectCache.objectMap.get(e2)) throw new RangeError("object already cached");
      _OneObjectCache.objectMap.set(e2, this), this.report();
    }
    static getCacheForObject(e2) {
      let t2 = _OneObjectCache.objectMap.get(e2);
      return t2 || (t2 = new _OneObjectCache(), _OneObjectCache.objectMap.set(e2, t2)), t2;
    }
  };
  function ni({ isoYear: e2, isoMonth: t2, isoDay: n2 }) {
    return `${Jn(e2)}-${Gn(t2)}-${Gn(n2)}T00:00Z`;
  }
  function ri(e2, t2) {
    return { years: e2.year - t2.year, months: e2.month - t2.month, days: e2.day - t2.day };
  }
  OneObjectCache.objectMap = /* @__PURE__ */ new WeakMap(), OneObjectCache.MAX_CACHE_ENTRIES = 1e3;
  var HelperBase = class {
    constructor() {
      this.eras = [], this.hasEra = false, this.erasBeginMidYear = false;
    }
    getFormatter() {
      return void 0 === this.formatter && (this.formatter = new Intl.DateTimeFormat(`en-US-u-ca-${this.id}`, { day: "numeric", month: "numeric", year: "numeric", era: "short", timeZone: "UTC" })), this.formatter;
    }
    getCalendarParts(e2) {
      let t2 = this.getFormatter(), n2 = new Date(e2);
      if ("-271821-04-19T00:00Z" === e2) {
        const e3 = t2.resolvedOptions();
        t2 = new Intl.DateTimeFormat(e3.locale, { ...e3, timeZone: "Etc/GMT+1" }), n2 = /* @__PURE__ */ new Date("-271821-04-20T00:00Z");
      }
      try {
        return t2.formatToParts(n2);
      } catch (t3) {
        throw new RangeError(`Invalid ISO date: ${e2}`);
      }
    }
    isoToCalendarDate(e2, t2) {
      const { year: n2, month: r2, day: o2 } = e2, i2 = JSON.stringify({ func: "isoToCalendarDate", isoYear: n2, isoMonth: r2, isoDay: o2, id: this.id }), a2 = t2.get(i2);
      if (a2) return a2;
      const s2 = ni({ isoYear: n2, isoMonth: r2, isoDay: o2 }), c2 = this.getCalendarParts(s2), d2 = {};
      for (let e3 = 0; e3 < c2.length; e3++) {
        const { type: t3, value: n3 } = c2[e3];
        if ("year" !== t3 && "relatedYear" !== t3 || (this.hasEra ? d2.eraYear = +n3 : d2.year = +n3), "month" === t3) {
          const e4 = /^([0-9]*)(.*?)$/.exec(n3);
          if (!e4 || 3 != e4.length || !e4[1] && !e4[2]) throw new RangeError(`Unexpected month: ${n3}`);
          if (d2.month = e4[1] ? +e4[1] : 1, d2.month < 1) throw new RangeError(`Invalid month ${n3} from ${s2}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10527)`);
          if (d2.month > 13) throw new RangeError(`Invalid month ${n3} from ${s2}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10529)`);
          e4[2] && (d2.monthExtra = e4[2]);
        }
        "day" === t3 && (d2.day = +n3), this.hasEra && "era" === t3 && null != n3 && "" !== n3 && (d2.era = n3.split(" (")[0].normalize("NFD").replace(/[^-0-9 \p{L}]/gu, "").replace(/ /g, "-").toLowerCase());
      }
      if (this.hasEra && void 0 === d2.eraYear) throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);
      if (this.hasEra) {
        const e3 = this.eras.find(((e4) => d2.era === e4.genericName));
        e3 && (d2.era = e3.code);
      }
      if (this.reviseIntlEra) {
        const { era: t3, eraYear: n3 } = this.reviseIntlEra(d2, e2);
        d2.era = t3, d2.eraYear = n3;
      }
      this.checkIcuBugs && this.checkIcuBugs(e2);
      const h2 = this.adjustCalendarDate(d2, t2, "constrain", true);
      if (void 0 === h2.year) throw new RangeError(`Missing year converting ${JSON.stringify(e2)}`);
      if (void 0 === h2.month) throw new RangeError(`Missing month converting ${JSON.stringify(e2)}`);
      if (void 0 === h2.day) throw new RangeError(`Missing day converting ${JSON.stringify(e2)}`);
      return t2.set(i2, h2), ["constrain", "reject"].forEach(((n3) => {
        const r3 = JSON.stringify({ func: "calendarToIsoDate", year: h2.year, month: h2.month, day: h2.day, overflow: n3, id: this.id });
        t2.set(r3, e2);
      })), h2;
    }
    validateCalendarDate(e2) {
      const { month: t2, year: n2, day: r2, eraYear: o2, monthCode: i2, monthExtra: a2 } = e2;
      if (void 0 !== a2) throw new RangeError("Unexpected `monthExtra` value");
      if (void 0 === n2 && void 0 === o2) throw new TypeError("year or eraYear is required");
      if (void 0 === t2 && void 0 === i2) throw new TypeError("month or monthCode is required");
      if (void 0 === r2) throw new RangeError("Missing day");
      if (void 0 !== i2) {
        if ("string" != typeof i2) throw new RangeError("monthCode must be a string, not " + typeof i2);
        if (!/^M([01]?\d)(L?)$/.test(i2)) throw new RangeError(`Invalid monthCode: ${i2}`);
      }
      if (this.hasEra && void 0 === e2.era != (void 0 === e2.eraYear)) throw new TypeError("properties era and eraYear must be provided together");
    }
    adjustCalendarDate(e2, t2 = void 0, n2 = "constrain", r2 = false) {
      if ("lunisolar" === this.calendarType) throw new RangeError("Override required for lunisolar calendars");
      let o2 = e2;
      this.validateCalendarDate(o2);
      const i2 = this.monthsInYear(o2, t2);
      let { month: a2, monthCode: s2 } = o2;
      return { month: a2, monthCode: s2 } = ti(o2, n2, i2), { ...o2, month: a2, monthCode: s2 };
    }
    regulateMonthDayNaive(e2, t2, n2) {
      const r2 = this.monthsInYear(e2, n2);
      let { month: o2, day: i2 } = e2;
      return "reject" === t2 ? (Nr(o2, 1, r2), Nr(i2, 1, this.maximumMonthLength(e2))) : (o2 = jr(o2, 1, r2), i2 = jr(i2, 1, this.maximumMonthLength({ ...e2, month: o2 }))), { ...e2, month: o2, day: i2 };
    }
    calendarToIsoDate(e2, t2 = "constrain", n2) {
      const r2 = e2;
      let o2 = this.adjustCalendarDate(e2, n2, t2, false);
      o2 = this.regulateMonthDayNaive(o2, t2, n2);
      const { year: i2, month: a2, day: s2 } = o2, c2 = JSON.stringify({ func: "calendarToIsoDate", year: i2, month: a2, day: s2, overflow: t2, id: this.id });
      let d2, h2 = n2.get(c2);
      if (h2) return h2;
      if (void 0 !== r2.year && void 0 !== r2.month && void 0 !== r2.day && (r2.year !== o2.year || r2.month !== o2.month || r2.day !== o2.day) && (d2 = JSON.stringify({ func: "calendarToIsoDate", year: r2.year, month: r2.month, day: r2.day, overflow: t2, id: this.id }), h2 = n2.get(d2), h2)) return h2;
      let u2 = this.estimateIsoDate({ year: i2, month: a2, day: s2 });
      const l2 = (e3) => {
        let r3 = this.addDaysIso(u2, e3);
        if (o2.day > this.minimumMonthLength(o2)) {
          let e4 = this.isoToCalendarDate(r3, n2);
          for (; e4.month !== a2 || e4.year !== i2; ) {
            if ("reject" === t2) throw new RangeError(`day ${s2} does not exist in month ${a2} of year ${i2}`);
            r3 = this.addDaysIso(r3, -1), e4 = this.isoToCalendarDate(r3, n2);
          }
        }
        return r3;
      };
      let m2 = 0, f2 = this.isoToCalendarDate(u2, n2), y2 = ri(o2, f2);
      if (0 !== y2.years || 0 !== y2.months || 0 !== y2.days) {
        const e3 = 365 * y2.years + 30 * y2.months + y2.days;
        u2 = this.addDaysIso(u2, e3), f2 = this.isoToCalendarDate(u2, n2), y2 = ri(o2, f2), 0 === y2.years && 0 === y2.months ? u2 = l2(y2.days) : m2 = this.compareCalendarDates(o2, f2);
      }
      let p2 = 8;
      for (; m2; ) {
        u2 = this.addDaysIso(u2, m2 * p2);
        const e3 = f2;
        f2 = this.isoToCalendarDate(u2, n2);
        const i3 = m2;
        if (m2 = this.compareCalendarDates(o2, f2), m2) {
          if (y2 = ri(o2, f2), 0 === y2.years && 0 === y2.months) u2 = l2(y2.days), m2 = 0;
          else if (i3 && m2 !== i3) if (p2 > 1) p2 /= 2;
          else {
            if ("reject" === t2) throw new RangeError(`Can't find ISO date from calendar date: ${JSON.stringify({ ...r2 })}`);
            this.compareCalendarDates(f2, e3) > 0 && (u2 = this.addDaysIso(u2, -1)), m2 = 0;
          }
        }
      }
      if (n2.set(c2, u2), d2 && n2.set(d2, u2), void 0 === o2.year || void 0 === o2.month || void 0 === o2.day || void 0 === o2.monthCode || this.hasEra && (void 0 === o2.era || void 0 === o2.eraYear)) throw new RangeError("Unexpected missing property");
      return u2;
    }
    compareCalendarDates(e2, t2) {
      return e2.year !== t2.year ? Bo(e2.year - t2.year) : e2.month !== t2.month ? Bo(e2.month - t2.month) : e2.day !== t2.day ? Bo(e2.day - t2.day) : 0;
    }
    regulateDate(e2, t2 = "constrain", n2) {
      const r2 = this.calendarToIsoDate(e2, t2, n2);
      return this.isoToCalendarDate(r2, n2);
    }
    addDaysIso(e2, t2) {
      return Or(e2.year, e2.month, e2.day + t2);
    }
    addDaysCalendar(e2, t2, n2) {
      const r2 = this.calendarToIsoDate(e2, "constrain", n2), o2 = this.addDaysIso(r2, t2);
      return this.isoToCalendarDate(o2, n2);
    }
    addMonthsCalendar(e2, t2, n2, r2) {
      let o2 = e2;
      const { day: i2 } = o2;
      for (let e3 = 0, n3 = Math.abs(t2); e3 < n3; e3++) {
        const { month: e4 } = o2, n4 = o2, a2 = t2 < 0 ? -Math.max(i2, this.daysInPreviousMonth(o2, r2)) : this.daysInMonth(o2, r2), s2 = this.calendarToIsoDate(o2, "constrain", r2);
        let c2 = this.addDaysIso(s2, a2);
        if (o2 = this.isoToCalendarDate(c2, r2), t2 > 0) {
          const t3 = this.monthsInYear(n4, r2);
          for (; o2.month - 1 != e4 % t3; ) c2 = this.addDaysIso(c2, -1), o2 = this.isoToCalendarDate(c2, r2);
        }
        o2.day !== i2 && (o2 = this.regulateDate({ ...o2, day: i2 }, "constrain", r2));
      }
      if ("reject" === n2 && o2.day !== i2) throw new RangeError(`Day ${i2} does not exist in resulting calendar month`);
      return o2;
    }
    addCalendar(e2, { years: t2 = 0, months: n2 = 0, weeks: r2 = 0, days: o2 = 0 }, i2, a2) {
      const { year: s2, day: c2, monthCode: d2 } = e2, h2 = this.adjustCalendarDate({ year: s2 + t2, monthCode: d2, day: c2 }, a2), u2 = this.addMonthsCalendar(h2, n2, i2, a2), l2 = o2 + 7 * r2;
      return this.addDaysCalendar(u2, l2, a2);
    }
    untilCalendar(e2, t2, n2, r2) {
      let o2 = 0, i2 = 0, a2 = 0, s2 = 0;
      switch (n2) {
        case "day":
          o2 = this.calendarDaysUntil(e2, t2, r2);
          break;
        case "week": {
          const n3 = this.calendarDaysUntil(e2, t2, r2);
          o2 = n3 % 7, i2 = (n3 - o2) / 7;
          break;
        }
        case "month":
        case "year": {
          const i3 = this.compareCalendarDates(t2, e2);
          if (!i3) return { years: 0, months: 0, weeks: 0, days: 0 };
          const c2 = t2.year - e2.year, d2 = t2.day - e2.day;
          if ("year" === n2 && c2) {
            let n3 = 0;
            t2.monthCode > e2.monthCode && (n3 = 1), t2.monthCode < e2.monthCode && (n3 = -1), n3 || (n3 = Math.sign(d2)), s2 = n3 * i3 < 0 ? c2 - i3 : c2;
          }
          let h2, u2 = s2 ? this.addCalendar(e2, { years: s2 }, "constrain", r2) : e2;
          do {
            a2 += i3, h2 = u2, u2 = this.addMonthsCalendar(h2, i3, "constrain", r2), u2.day !== e2.day && (u2 = this.regulateDate({ ...u2, day: e2.day }, "constrain", r2));
          } while (this.compareCalendarDates(t2, u2) * i3 >= 0);
          a2 -= i3, o2 = this.calendarDaysUntil(h2, t2, r2);
          break;
        }
      }
      return { years: s2, months: a2, weeks: i2, days: o2 };
    }
    daysInMonth(e2, t2) {
      const { day: n2 } = e2, r2 = this.maximumMonthLength(e2), o2 = this.minimumMonthLength(e2);
      if (o2 === r2) return o2;
      const i2 = n2 <= r2 - o2 ? r2 : o2, a2 = this.calendarToIsoDate(e2, "constrain", t2), s2 = this.addDaysIso(a2, i2), c2 = this.isoToCalendarDate(s2, t2), d2 = this.addDaysIso(s2, -c2.day);
      return this.isoToCalendarDate(d2, t2).day;
    }
    daysInPreviousMonth(e2, t2) {
      const { day: n2, month: r2, year: o2 } = e2;
      let i2 = { year: r2 > 1 ? o2 : o2 - 1, month: r2, day: 1 };
      const a2 = r2 > 1 ? r2 - 1 : this.monthsInYear(i2, t2);
      i2 = { ...i2, month: a2 };
      const s2 = this.minimumMonthLength(i2), c2 = this.maximumMonthLength(i2);
      if (s2 === c2) return c2;
      const d2 = this.calendarToIsoDate(e2, "constrain", t2), h2 = this.addDaysIso(d2, -n2);
      return this.isoToCalendarDate(h2, t2).day;
    }
    startOfCalendarYear(e2) {
      return { year: e2.year, month: 1, monthCode: "M01", day: 1 };
    }
    startOfCalendarMonth(e2) {
      return { year: e2.year, month: e2.month, day: 1 };
    }
    calendarDaysUntil(e2, t2, n2) {
      const r2 = this.calendarToIsoDate(e2, "constrain", n2), o2 = this.calendarToIsoDate(t2, "constrain", n2);
      return Gr(o2.year, o2.month - 1, o2.day) - Gr(r2.year, r2.month - 1, r2.day);
    }
    monthDaySearchStartYear(e2, t2) {
      return 1972;
    }
    monthDayFromFields(e2, t2, n2) {
      let r2, o2, i2, a2, s2, { era: c2, eraYear: d2, year: h2, month: u2, monthCode: l2, day: m2 } = e2;
      if (void 0 !== u2 && void 0 === h2 && (!this.hasEra || void 0 === c2 || void 0 === d2)) throw new TypeError("when month is present, year (or era and eraYear) are required");
      (void 0 === l2 || void 0 !== h2 || this.hasEra && void 0 !== d2) && ({ monthCode: l2, day: m2 } = this.isoToCalendarDate(this.calendarToIsoDate(e2, t2, n2), n2));
      const f2 = { year: this.monthDaySearchStartYear(l2, m2), month: 12, day: 31 }, y2 = this.isoToCalendarDate(f2, n2), p2 = y2.monthCode > l2 || y2.monthCode === l2 && y2.day >= m2 ? y2.year : y2.year - 1;
      for (let e3 = 0; e3 < 20; e3++) {
        const c3 = this.adjustCalendarDate({ day: m2, monthCode: l2, year: p2 - e3 }, n2), d3 = this.calendarToIsoDate(c3, "constrain", n2), h3 = this.isoToCalendarDate(d3, n2);
        if ({ year: r2, month: o2, day: i2 } = d3, h3.monthCode === l2 && h3.day === m2) return { month: o2, day: i2, year: r2 };
        if ("constrain" === t2) {
          const e4 = this.maxLengthOfMonthCodeInAnyYear(h3.monthCode);
          if (h3.monthCode === l2 && h3.day === e4 && m2 > e4) return { month: o2, day: i2, year: r2 };
          (void 0 === a2 || h3.monthCode === a2.monthCode && h3.day > a2.day) && (a2 = h3, s2 = d3);
        }
      }
      if ("constrain" === t2 && void 0 !== s2) return s2;
      throw new RangeError(`No recent ${this.id} year with monthCode ${l2} and day ${m2}`);
    }
    getFirstDayOfWeek() {
    }
    getMinimalDaysInFirstWeek() {
    }
  };
  var HebrewHelper = class extends HelperBase {
    constructor() {
      super(...arguments), this.id = "hebrew", this.calendarType = "lunisolar", this.months = { Tishri: { leap: 1, regular: 1, monthCode: "M01", days: 30 }, Heshvan: { leap: 2, regular: 2, monthCode: "M02", days: { min: 29, max: 30 } }, Kislev: { leap: 3, regular: 3, monthCode: "M03", days: { min: 29, max: 30 } }, Tevet: { leap: 4, regular: 4, monthCode: "M04", days: 29 }, Shevat: { leap: 5, regular: 5, monthCode: "M05", days: 30 }, Adar: { leap: void 0, regular: 6, monthCode: "M06", days: 29 }, "Adar I": { leap: 6, regular: void 0, monthCode: "M05L", days: 30 }, "Adar II": { leap: 7, regular: void 0, monthCode: "M06", days: 29 }, Nisan: { leap: 8, regular: 7, monthCode: "M07", days: 30 }, Iyar: { leap: 9, regular: 8, monthCode: "M08", days: 29 }, Sivan: { leap: 10, regular: 9, monthCode: "M09", days: 30 }, Tamuz: { leap: 11, regular: 10, monthCode: "M10", days: 29 }, Av: { leap: 12, regular: 11, monthCode: "M11", days: 30 }, Elul: { leap: 13, regular: 12, monthCode: "M12", days: 29 } };
    }
    inLeapYear(e2) {
      const { year: t2 } = e2;
      return (7 * t2 + 1) % 19 < 7;
    }
    monthsInYear(e2) {
      return this.inLeapYear(e2) ? 13 : 12;
    }
    minimumMonthLength(e2) {
      return this.minMaxMonthLength(e2, "min");
    }
    maximumMonthLength(e2) {
      return this.minMaxMonthLength(e2, "max");
    }
    minMaxMonthLength(e2, t2) {
      const { month: n2, year: r2 } = e2, o2 = this.getMonthCode(r2, n2), i2 = Object.entries(this.months).find(((e3) => e3[1].monthCode === o2));
      if (void 0 === i2) throw new RangeError(`unmatched Hebrew month: ${n2}`);
      const a2 = i2[1].days;
      return "number" == typeof a2 ? a2 : a2[t2];
    }
    maxLengthOfMonthCodeInAnyYear(e2) {
      return ["M04", "M06", "M08", "M10", "M12"].includes(e2) ? 29 : 30;
    }
    estimateIsoDate(e2) {
      const { year: t2 } = e2;
      return { year: t2 - 3760, month: 1, day: 1 };
    }
    getMonthCode(e2, t2) {
      return this.inLeapYear({ year: e2 }) ? 6 === t2 ? ei(5, true) : ei(t2 < 6 ? t2 : t2 - 1) : ei(t2);
    }
    adjustCalendarDate(e2, t2, n2 = "constrain", r2 = false) {
      let { year: o2, month: i2, monthCode: a2, day: s2, monthExtra: c2 } = e2;
      if (void 0 === o2) throw new TypeError("Missing property: year");
      if (r2) {
        if (c2) {
          const e3 = this.months[c2];
          if (!e3) throw new RangeError(`Unrecognized month from formatToParts: ${c2}`);
          i2 = this.inLeapYear({ year: o2 }) ? e3.leap : e3.regular;
        }
        return a2 = this.getMonthCode(o2, i2), { year: o2, month: i2, day: s2, monthCode: a2 };
      }
      if (this.validateCalendarDate(e2), void 0 === i2) if (a2.endsWith("L")) {
        if ("M05L" !== a2) throw new RangeError(`Hebrew leap month must have monthCode M05L, not ${a2}`);
        if (i2 = 6, !this.inLeapYear({ year: o2 })) {
          if ("reject" === n2) throw new RangeError(`Hebrew monthCode M05L is invalid in year ${o2} which is not a leap year`);
          i2 = 6, a2 = "M06";
        }
      } else {
        i2 = Qo(a2), this.inLeapYear({ year: o2 }) && i2 >= 6 && i2++;
        const e3 = this.monthsInYear({ year: o2 });
        if (i2 < 1 || i2 > e3) throw new RangeError(`Invalid monthCode: ${a2}`);
      }
      else if ("reject" === n2 ? (Nr(i2, 1, this.monthsInYear({ year: o2 })), Nr(s2, 1, this.maximumMonthLength({ year: o2, month: i2 }))) : (i2 = jr(i2, 1, this.monthsInYear({ year: o2 })), s2 = jr(s2, 1, this.maximumMonthLength({ year: o2, month: i2 }))), void 0 === a2) a2 = this.getMonthCode(o2, i2);
      else if (this.getMonthCode(o2, i2) !== a2) throw new RangeError(`monthCode ${a2} doesn't correspond to month ${i2} in Hebrew year ${o2}`);
      return { ...e2, day: s2, month: i2, monthCode: a2, year: o2 };
    }
  };
  var IslamicBaseHelper = class extends HelperBase {
    constructor() {
      super(...arguments), this.calendarType = "lunar", this.DAYS_PER_ISLAMIC_YEAR = 354 + 11 / 30, this.DAYS_PER_ISO_YEAR = 365.2425;
    }
    inLeapYear(e2, t2) {
      const n2 = { year: e2.year, month: 1, monthCode: "M01", day: 1 }, r2 = { year: e2.year + 1, month: 1, monthCode: "M01", day: 1 };
      return 355 === this.calendarDaysUntil(n2, r2, t2);
    }
    monthsInYear() {
      return 12;
    }
    minimumMonthLength() {
      return 29;
    }
    maximumMonthLength() {
      return 30;
    }
    maxLengthOfMonthCodeInAnyYear() {
      return 30;
    }
    estimateIsoDate(e2) {
      const { year: t2 } = this.adjustCalendarDate(e2);
      return { year: Math.floor(t2 * this.DAYS_PER_ISLAMIC_YEAR / this.DAYS_PER_ISO_YEAR) + 622, month: 1, day: 1 };
    }
  };
  var IslamicHelper = class extends IslamicBaseHelper {
    constructor() {
      super(...arguments), this.id = "islamic";
    }
  };
  var IslamicUmalquraHelper = class extends IslamicBaseHelper {
    constructor() {
      super(...arguments), this.id = "islamic-umalqura";
    }
  };
  var IslamicTblaHelper = class extends IslamicBaseHelper {
    constructor() {
      super(...arguments), this.id = "islamic-tbla";
    }
  };
  var IslamicCivilHelper = class extends IslamicBaseHelper {
    constructor() {
      super(...arguments), this.id = "islamic-civil";
    }
  };
  var IslamicRgsaHelper = class extends IslamicBaseHelper {
    constructor() {
      super(...arguments), this.id = "islamic-rgsa";
    }
  };
  var IslamicCcHelper = class extends IslamicBaseHelper {
    constructor() {
      super(...arguments), this.id = "islamicc";
    }
  };
  var PersianHelper = class extends HelperBase {
    constructor() {
      super(...arguments), this.id = "persian", this.calendarType = "solar";
    }
    inLeapYear(e2, t2) {
      return 30 === this.daysInMonth({ year: e2.year, month: 12, day: 1 }, t2);
    }
    monthsInYear() {
      return 12;
    }
    minimumMonthLength(e2) {
      const { month: t2 } = e2;
      return 12 === t2 ? 29 : t2 <= 6 ? 31 : 30;
    }
    maximumMonthLength(e2) {
      const { month: t2 } = e2;
      return 12 === t2 ? 30 : t2 <= 6 ? 31 : 30;
    }
    maxLengthOfMonthCodeInAnyYear(e2) {
      return Qo(e2) <= 6 ? 31 : 30;
    }
    estimateIsoDate(e2) {
      const { year: t2 } = this.adjustCalendarDate(e2);
      return { year: t2 + 621, month: 1, day: 1 };
    }
  };
  var IndianHelper = class extends HelperBase {
    constructor() {
      super(...arguments), this.id = "indian", this.calendarType = "solar", this.months = { 1: { length: 30, month: 3, day: 22, leap: { length: 31, month: 3, day: 21 } }, 2: { length: 31, month: 4, day: 21 }, 3: { length: 31, month: 5, day: 22 }, 4: { length: 31, month: 6, day: 22 }, 5: { length: 31, month: 7, day: 23 }, 6: { length: 31, month: 8, day: 23 }, 7: { length: 30, month: 9, day: 23 }, 8: { length: 30, month: 10, day: 23 }, 9: { length: 30, month: 11, day: 22 }, 10: { length: 30, month: 12, day: 22 }, 11: { length: 30, month: 1, nextYear: true, day: 21 }, 12: { length: 30, month: 2, nextYear: true, day: 20 } }, this.vulnerableToBceBug = "10/11/-79 Saka" !== (/* @__PURE__ */ new Date("0000-01-01T00:00Z")).toLocaleDateString("en-US-u-ca-indian", { timeZone: "UTC" });
    }
    inLeapYear(e2) {
      return oi(e2.year + 78);
    }
    monthsInYear() {
      return 12;
    }
    minimumMonthLength(e2) {
      return this.getMonthInfo(e2).length;
    }
    maximumMonthLength(e2) {
      return this.getMonthInfo(e2).length;
    }
    maxLengthOfMonthCodeInAnyYear(e2) {
      const t2 = Qo(e2);
      let n2 = this.months[t2];
      return n2 = n2.leap ?? n2, n2.length;
    }
    getMonthInfo(e2) {
      const { month: t2 } = e2;
      let n2 = this.months[t2];
      if (void 0 === n2) throw new RangeError(`Invalid month: ${t2}`);
      return this.inLeapYear(e2) && n2.leap && (n2 = n2.leap), n2;
    }
    estimateIsoDate(e2) {
      const t2 = this.adjustCalendarDate(e2), n2 = this.getMonthInfo(t2);
      return Or(t2.year + 78 + (n2.nextYear ? 1 : 0), n2.month, n2.day + t2.day - 1);
    }
    checkIcuBugs(e2) {
      if (this.vulnerableToBceBug && e2.year < 1) throw new RangeError(`calendar '${this.id}' is broken for ISO dates before 0001-01-01 (see https://bugs.chromium.org/p/v8/issues/detail?id=10529)`);
    }
  };
  function oi(e2) {
    return e2 % 4 == 0 && (e2 % 100 != 0 || e2 % 400 == 0);
  }
  var GregorianBaseHelperFixedEpoch = class extends HelperBase {
    constructor(e2, t2) {
      super(), this.calendarType = "solar", this.id = e2, this.isoEpoch = t2;
    }
    inLeapYear(e2) {
      const { year: t2 } = this.estimateIsoDate({ month: 1, day: 1, year: e2.year });
      return oi(t2);
    }
    monthsInYear() {
      return 12;
    }
    minimumMonthLength(e2) {
      const { month: t2 } = e2;
      return 2 === t2 ? this.inLeapYear(e2) ? 29 : 28 : [4, 6, 9, 11].indexOf(t2) >= 0 ? 30 : 31;
    }
    maximumMonthLength(e2) {
      return this.minimumMonthLength(e2);
    }
    maxLengthOfMonthCodeInAnyYear(e2) {
      return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Qo(e2) - 1];
    }
    estimateIsoDate(e2) {
      const t2 = this.adjustCalendarDate(e2);
      return St(t2.year + this.isoEpoch.year, t2.month + this.isoEpoch.month, t2.day + this.isoEpoch.day, "constrain");
    }
  };
  var GregorianBaseHelper = class extends HelperBase {
    constructor(e2, t2) {
      super(), this.hasEra = true, this.calendarType = "solar", this.id = e2;
      const { eras: n2, anchorEra: r2 } = (function(e3) {
        let t3, n3 = e3;
        if (0 === n3.length) throw new RangeError("Invalid era data: eras are required");
        if (1 === n3.length && n3[0].reverseOf) throw new RangeError("Invalid era data: anchor era cannot count years backwards");
        if (1 === n3.length && !n3[0].code) throw new RangeError("Invalid era data: at least one named era is required");
        if (n3.filter(((e4) => null != e4.reverseOf)).length > 1) throw new RangeError("Invalid era data: only one era can count years backwards");
        n3.forEach(((e4) => {
          if (e4.isAnchor || !e4.anchorEpoch && !e4.reverseOf) {
            if (t3) throw new RangeError("Invalid era data: cannot have multiple anchor eras");
            t3 = e4, e4.anchorEpoch = { year: e4.hasYearZero ? 0 : 1 };
          } else if (!e4.code) throw new RangeError("If era name is blank, it must be the anchor era");
        })), n3 = n3.filter(((e4) => e4.code)), n3.forEach(((e4) => {
          const { reverseOf: t4 } = e4;
          if (t4) {
            const r4 = n3.find(((e5) => e5.code === t4));
            if (void 0 === r4) throw new RangeError(`Invalid era data: unmatched reverseOf era: ${t4}`);
            e4.reverseOf = r4, e4.anchorEpoch = r4.anchorEpoch, e4.isoEpoch = r4.isoEpoch;
          }
          void 0 === e4.anchorEpoch.month && (e4.anchorEpoch.month = 1), void 0 === e4.anchorEpoch.day && (e4.anchorEpoch.day = 1);
        })), n3.sort(((e4, t4) => {
          if (e4.reverseOf) return 1;
          if (t4.reverseOf) return -1;
          if (!e4.isoEpoch || !t4.isoEpoch) throw new RangeError("Invalid era data: missing ISO epoch");
          return t4.isoEpoch.year - e4.isoEpoch.year;
        }));
        const r3 = n3[n3.length - 1].reverseOf;
        if (r3 && r3 !== n3[n3.length - 2]) throw new RangeError("Invalid era data: invalid reverse-sign era");
        return n3.forEach(((e4, t4) => {
          e4.genericName = "era" + (n3.length - 1 - t4);
        })), { eras: n3, anchorEra: t3 || n3[0] };
      })(t2);
      this.anchorEra = r2, this.eras = n2;
    }
    inLeapYear(e2) {
      const { year: t2 } = this.estimateIsoDate({ month: 1, day: 1, year: e2.year });
      return oi(t2);
    }
    monthsInYear() {
      return 12;
    }
    minimumMonthLength(e2) {
      const { month: t2 } = e2;
      return 2 === t2 ? this.inLeapYear(e2) ? 29 : 28 : [4, 6, 9, 11].indexOf(t2) >= 0 ? 30 : 31;
    }
    maximumMonthLength(e2) {
      return this.minimumMonthLength(e2);
    }
    maxLengthOfMonthCodeInAnyYear(e2) {
      return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Qo(e2) - 1];
    }
    completeEraYear(e2) {
      const t2 = (t3, n3, r3) => {
        const o3 = e2[t3];
        if (null != o3 && o3 != n3 && !(r3 || []).includes(o3)) {
          const e3 = r3?.[0];
          throw new RangeError(`Input ${t3} ${o3} doesn't match calculated value ${e3 ? `${n3} (also called ${e3})` : n3}`);
        }
      }, n2 = (t3) => {
        let n3;
        const r3 = { ...e2, year: t3 }, o3 = this.eras.find(((e3, o4) => {
          if (o4 === this.eras.length - 1) {
            if (e3.reverseOf) {
              if (t3 > 0) throw new RangeError(`Signed year ${t3} is invalid for era ${e3.code}`);
              return n3 = e3.anchorEpoch.year - t3, true;
            }
            return n3 = t3 - e3.anchorEpoch.year + (e3.hasYearZero ? 0 : 1), true;
          }
          return this.compareCalendarDates(r3, e3.anchorEpoch) >= 0 && (n3 = t3 - e3.anchorEpoch.year + (e3.hasYearZero ? 0 : 1), true);
        }));
        if (!o3) throw new RangeError(`Year ${t3} was not matched by any era`);
        return { eraYear: n3, era: o3.code, eraNames: o3.names };
      };
      let { year: r2, eraYear: o2, era: i2 } = e2;
      if (null != r2) {
        const e3 = n2(r2);
        ({ eraYear: o2, era: i2 } = e3), t2("era", i2, e3?.eraNames), t2("eraYear", o2);
      } else {
        if (null == o2) throw new RangeError("Either year or eraYear and era are required");
        {
          if (void 0 === i2) throw new RangeError("era and eraYear must be provided together");
          const e3 = this.eras.find((({ code: e4, names: t3 = [] }) => e4 === i2 || t3.includes(i2)));
          if (!e3) throw new RangeError(`Era ${i2} (ISO year ${o2}) was not matched by any era`);
          r2 = e3.reverseOf ? e3.anchorEpoch.year - o2 : o2 + e3.anchorEpoch.year - (e3.hasYearZero ? 0 : 1), t2("year", r2), { eraYear: o2, era: i2 } = n2(r2);
        }
      }
      return { ...e2, year: r2, eraYear: o2, era: i2 };
    }
    adjustCalendarDate(e2, t2, n2 = "constrain") {
      let r2 = e2;
      const { month: o2, monthCode: i2 } = r2;
      return void 0 === o2 && (r2 = { ...r2, month: Qo(i2) }), this.validateCalendarDate(r2), r2 = this.completeEraYear(r2), super.adjustCalendarDate(r2, t2, n2);
    }
    estimateIsoDate(e2) {
      const t2 = this.adjustCalendarDate(e2), { year: n2, month: r2, day: o2 } = t2, { anchorEra: i2 } = this;
      return St(n2 + i2.isoEpoch.year - (i2.hasYearZero ? 0 : 1), r2, o2, "constrain");
    }
  };
  var SameMonthDayAsGregorianBaseHelper = class extends GregorianBaseHelper {
    constructor(e2, t2) {
      super(e2, t2);
    }
    isoToCalendarDate(e2) {
      const { year: t2, month: n2, day: r2 } = e2, o2 = ei(n2), i2 = t2 - this.anchorEra.isoEpoch.year + 1;
      return this.completeEraYear({ year: i2, month: n2, monthCode: o2, day: r2 });
    }
  };
  var ii = { inLeapYear(e2) {
    const { year: t2 } = e2;
    return (t2 + 1) % 4 == 0;
  }, monthsInYear: () => 13, minimumMonthLength(e2) {
    const { month: t2 } = e2;
    return 13 === t2 ? this.inLeapYear(e2) ? 6 : 5 : 30;
  }, maximumMonthLength(e2) {
    return this.minimumMonthLength(e2);
  }, maxLengthOfMonthCodeInAnyYear: (e2) => "M13" === e2 ? 6 : 30 };
  var OrthodoxBaseHelperFixedEpoch = class extends GregorianBaseHelperFixedEpoch {
    constructor(e2, t2) {
      super(e2, t2), this.inLeapYear = ii.inLeapYear, this.monthsInYear = ii.monthsInYear, this.minimumMonthLength = ii.minimumMonthLength, this.maximumMonthLength = ii.maximumMonthLength, this.maxLengthOfMonthCodeInAnyYear = ii.maxLengthOfMonthCodeInAnyYear;
    }
  };
  var OrthodoxBaseHelper = class extends GregorianBaseHelper {
    constructor(e2, t2) {
      super(e2, t2), this.inLeapYear = ii.inLeapYear, this.monthsInYear = ii.monthsInYear, this.minimumMonthLength = ii.minimumMonthLength, this.maximumMonthLength = ii.maximumMonthLength, this.maxLengthOfMonthCodeInAnyYear = ii.maxLengthOfMonthCodeInAnyYear;
    }
  };
  var EthioaaHelper = class extends OrthodoxBaseHelperFixedEpoch {
    constructor() {
      super("ethioaa", { year: -5492, month: 7, day: 17 });
    }
  };
  var CopticHelper = class extends OrthodoxBaseHelper {
    constructor() {
      super("coptic", [{ code: "coptic", isoEpoch: { year: 284, month: 8, day: 29 } }, { code: "coptic-inverse", reverseOf: "coptic" }]);
    }
  };
  var EthiopicHelper = class extends OrthodoxBaseHelper {
    constructor() {
      super("ethiopic", [{ code: "ethioaa", names: ["ethiopic-amete-alem", "mundi"], isoEpoch: { year: -5492, month: 7, day: 17 } }, { code: "ethiopic", names: ["incar"], isoEpoch: { year: 8, month: 8, day: 27 }, anchorEpoch: { year: 5501 } }]);
    }
  };
  var RocHelper = class extends SameMonthDayAsGregorianBaseHelper {
    constructor() {
      super("roc", [{ code: "roc", names: ["minguo"], isoEpoch: { year: 1912, month: 1, day: 1 } }, { code: "roc-inverse", names: ["before-roc"], reverseOf: "roc" }]);
    }
  };
  var BuddhistHelper = class extends GregorianBaseHelperFixedEpoch {
    constructor() {
      super("buddhist", { year: -543, month: 1, day: 1 });
    }
  };
  var GregoryHelper = class extends SameMonthDayAsGregorianBaseHelper {
    constructor() {
      super("gregory", [{ code: "gregory", names: ["ad", "ce"], isoEpoch: { year: 1, month: 1, day: 1 } }, { code: "gregory-inverse", names: ["be", "bce"], reverseOf: "gregory" }]);
    }
    reviseIntlEra(e2) {
      let { era: t2, eraYear: n2 } = e2;
      return "b" === t2 && (t2 = "gregory-inverse"), "a" === t2 && (t2 = "gregory"), { era: t2, eraYear: n2 };
    }
    getFirstDayOfWeek() {
      return 1;
    }
    getMinimalDaysInFirstWeek() {
      return 1;
    }
  };
  var JapaneseHelper = class extends SameMonthDayAsGregorianBaseHelper {
    constructor() {
      super("japanese", [{ code: "reiwa", isoEpoch: { year: 2019, month: 5, day: 1 }, anchorEpoch: { year: 2019, month: 5, day: 1 } }, { code: "heisei", isoEpoch: { year: 1989, month: 1, day: 8 }, anchorEpoch: { year: 1989, month: 1, day: 8 } }, { code: "showa", isoEpoch: { year: 1926, month: 12, day: 25 }, anchorEpoch: { year: 1926, month: 12, day: 25 } }, { code: "taisho", isoEpoch: { year: 1912, month: 7, day: 30 }, anchorEpoch: { year: 1912, month: 7, day: 30 } }, { code: "meiji", isoEpoch: { year: 1868, month: 9, day: 8 }, anchorEpoch: { year: 1868, month: 9, day: 8 } }, { code: "japanese", names: ["japanese", "gregory", "ad", "ce"], isoEpoch: { year: 1, month: 1, day: 1 } }, { code: "japanese-inverse", names: ["japanese-inverse", "gregory-inverse", "bc", "bce"], reverseOf: "japanese" }]), this.erasBeginMidYear = true;
    }
    reviseIntlEra(e2, t2) {
      const { era: n2, eraYear: r2 } = e2, { year: o2 } = t2;
      return this.eras.find(((e3) => e3.code === n2)) ? { era: n2, eraYear: r2 } : o2 < 1 ? { era: "japanese-inverse", eraYear: 1 - o2 } : { era: "japanese", eraYear: o2 };
    }
  };
  var ChineseBaseHelper = class extends HelperBase {
    constructor() {
      super(...arguments), this.calendarType = "lunisolar";
    }
    inLeapYear(e2, t2) {
      const n2 = this.getMonthList(e2.year, t2);
      return 13 === Object.entries(n2).length;
    }
    monthsInYear(e2, t2) {
      return this.inLeapYear(e2, t2) ? 13 : 12;
    }
    minimumMonthLength() {
      return 29;
    }
    maximumMonthLength() {
      return 30;
    }
    maxLengthOfMonthCodeInAnyYear(e2) {
      return ["M01L", "M09L", "M10L", "M11L", "M12L"].includes(e2) ? 29 : 30;
    }
    monthDaySearchStartYear(e2, t2) {
      const n2 = { M01L: [1651, 1651], M02L: [1947, 1765], M03L: [1966, 1955], M04L: [1963, 1944], M05L: [1971, 1952], M06L: [1960, 1941], M07L: [1968, 1938], M08L: [1957, 1718], M09L: [1832, 1832], M10L: [1870, 1870], M11L: [1814, 1814], M12L: [1890, 1890] }[e2] ?? [1972, 1972];
      return t2 < 30 ? n2[0] : n2[1];
    }
    getMonthList(e2, t2) {
      if (void 0 === e2) throw new TypeError("Missing year");
      const n2 = JSON.stringify({ func: "getMonthList", calendarYear: e2, id: this.id }), r2 = t2.get(n2);
      if (r2) return r2;
      const o2 = this.getFormatter(), i2 = (e3, t3) => {
        const n3 = ni({ isoYear: e3, isoMonth: 2, isoDay: 1 }), r3 = new Date(n3);
        r3.setUTCDate(t3 + 1);
        const i3 = o2.formatToParts(r3), a3 = i3.find(((e4) => "month" === e4.type)).value, s3 = +i3.find(((e4) => "day" === e4.type)).value, c3 = i3.find(((e4) => "relatedYear" === e4.type));
        let d3;
        if (void 0 === c3) throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);
        return d3 = +c3.value, { calendarMonthString: a3, calendarDay: s3, calendarYearToVerify: d3 };
      };
      let a2 = 17, { calendarMonthString: s2, calendarDay: c2, calendarYearToVerify: d2 } = i2(e2, a2);
      "1" !== s2 && (a2 += 29, { calendarMonthString: s2, calendarDay: c2 } = i2(e2, a2)), a2 -= c2 - 5;
      const h2 = {};
      let u2, l2, m2 = 1, f2 = false;
      do {
        ({ calendarMonthString: s2, calendarDay: c2, calendarYearToVerify: d2 } = i2(e2, a2)), u2 && (h2[l2].daysInMonth = u2 + 30 - c2), d2 !== e2 ? f2 = true : (h2[s2] = { monthIndex: m2++ }, a2 += 30), u2 = c2, l2 = s2;
      } while (!f2);
      return h2[l2].daysInMonth = u2 + 30 - c2, t2.set(n2, h2), h2;
    }
    estimateIsoDate(e2) {
      const { year: t2, month: n2 } = e2;
      return { year: t2, month: n2 >= 12 ? 12 : n2 + 1, day: 1 };
    }
    adjustCalendarDate(e2, t2, n2 = "constrain", r2 = false) {
      let { year: o2, month: i2, monthExtra: a2, day: s2, monthCode: c2 } = e2;
      if (void 0 === o2) throw new TypeError("Missing property: year");
      if (r2) {
        if (a2 && "bis" !== a2) throw new RangeError(`Unexpected leap month suffix: ${a2}`);
        const e3 = ei(i2, void 0 !== a2), n3 = `${i2}${a2 || ""}`, r3 = this.getMonthList(o2, t2)[n3];
        if (void 0 === r3) throw new RangeError(`Unmatched month ${n3} in Chinese year ${o2}`);
        return i2 = r3.monthIndex, { year: o2, month: i2, day: s2, monthCode: e3 };
      }
      if (this.validateCalendarDate(e2), void 0 === i2) {
        const e3 = this.getMonthList(o2, t2);
        let r3 = c2.replace(/^M|L$/g, ((e4) => "L" === e4 ? "bis" : ""));
        "0" === r3[0] && (r3 = r3.slice(1));
        let a3 = e3[r3];
        if (i2 = a3 && a3.monthIndex, void 0 === i2 && c2.endsWith("L") && "M13L" != c2 && "constrain" === n2) {
          const t3 = +c2.replace(/^M0?|L$/g, "");
          a3 = e3[t3], a3 && (i2 = a3.monthIndex, c2 = ei(t3));
        }
        if (void 0 === i2) throw new RangeError(`Unmatched month ${c2} in Chinese year ${o2}`);
      } else if (void 0 === c2) {
        const e3 = this.getMonthList(o2, t2), r3 = Object.entries(e3), a3 = r3.length;
        "reject" === n2 ? (Nr(i2, 1, a3), Nr(s2, 1, this.maximumMonthLength())) : (i2 = jr(i2, 1, a3), s2 = jr(s2, 1, this.maximumMonthLength()));
        const d2 = r3.find(((e4) => e4[1].monthIndex === i2));
        if (void 0 === d2) throw new RangeError(`Invalid month ${i2} in Chinese year ${o2}`);
        c2 = ei(+d2[0].replace("bis", ""), -1 !== d2[0].indexOf("bis"));
      } else {
        const e3 = this.getMonthList(o2, t2);
        let n3 = c2.replace(/^M|L$/g, ((e4) => "L" === e4 ? "bis" : ""));
        "0" === n3[0] && (n3 = n3.slice(1));
        const r3 = e3[n3];
        if (!r3) throw new RangeError(`Unmatched monthCode ${c2} in Chinese year ${o2}`);
        if (i2 !== r3.monthIndex) throw new RangeError(`monthCode ${c2} doesn't correspond to month ${i2} in Chinese year ${o2}`);
      }
      return { ...e2, year: o2, month: i2, monthCode: c2, day: s2 };
    }
  };
  var ChineseHelper = class extends ChineseBaseHelper {
    constructor() {
      super(...arguments), this.id = "chinese";
    }
  };
  var DangiHelper = class extends ChineseBaseHelper {
    constructor() {
      super(...arguments), this.id = "dangi";
    }
  };
  var NonIsoCalendar = class {
    constructor(e2) {
      this.helper = e2;
    }
    extraFields(e2) {
      return this.helper.hasEra && e2.includes("year") ? ["era", "eraYear"] : [];
    }
    resolveFields(e2) {
      if ("lunisolar" !== this.helper.calendarType) {
        const t2 = new OneObjectCache();
        ti(e2, void 0, this.helper.monthsInYear({ year: e2.year ?? 1972 }, t2));
      }
    }
    dateToISO(e2, t2) {
      const n2 = new OneObjectCache(), r2 = this.helper.calendarToIsoDate(e2, t2, n2);
      return n2.setObject(r2), r2;
    }
    monthDayToISOReferenceDate(e2, t2) {
      const n2 = new OneObjectCache(), r2 = this.helper.monthDayFromFields(e2, t2, n2);
      return n2.setObject(r2), r2;
    }
    fieldKeysToIgnore(e2) {
      const t2 = /* @__PURE__ */ new Set();
      for (let n2 = 0; n2 < e2.length; n2++) {
        const r2 = e2[n2];
        switch (t2.add(r2), r2) {
          case "era":
            t2.add("eraYear"), t2.add("year");
            break;
          case "eraYear":
            t2.add("era"), t2.add("year");
            break;
          case "year":
            t2.add("era"), t2.add("eraYear");
            break;
          case "month":
            t2.add("monthCode"), this.helper.erasBeginMidYear && (t2.add("era"), t2.add("eraYear"));
            break;
          case "monthCode":
            t2.add("month"), this.helper.erasBeginMidYear && (t2.add("era"), t2.add("eraYear"));
            break;
          case "day":
            this.helper.erasBeginMidYear && (t2.add("era"), t2.add("eraYear"));
        }
      }
      return Go(t2);
    }
    dateAdd(e2, { years: t2, months: n2, weeks: r2, days: o2 }, i2) {
      const a2 = OneObjectCache.getCacheForObject(e2), s2 = this.helper.isoToCalendarDate(e2, a2), c2 = this.helper.addCalendar(s2, { years: t2, months: n2, weeks: r2, days: o2 }, i2, a2), d2 = this.helper.calendarToIsoDate(c2, "constrain", a2);
      return OneObjectCache.getCacheForObject(d2) || new OneObjectCache(a2).setObject(d2), d2;
    }
    dateUntil(e2, t2, n2) {
      const r2 = OneObjectCache.getCacheForObject(e2), o2 = OneObjectCache.getCacheForObject(t2), i2 = this.helper.isoToCalendarDate(e2, r2), a2 = this.helper.isoToCalendarDate(t2, o2);
      return this.helper.untilCalendar(i2, a2, n2, r2);
    }
    isoToDate(e2, t2) {
      const n2 = OneObjectCache.getCacheForObject(e2), r2 = this.helper.isoToCalendarDate(e2, n2);
      if (t2.dayOfWeek && (r2.dayOfWeek = Xo.iso8601.isoToDate(e2, { dayOfWeek: true }).dayOfWeek), t2.dayOfYear) {
        const e3 = this.helper.startOfCalendarYear(r2), t3 = this.helper.calendarDaysUntil(e3, r2, n2);
        r2.dayOfYear = t3 + 1;
      }
      if (t2.weekOfYear && (r2.weekOfYear = Ko(this.helper.id, e2)), r2.daysInWeek = 7, t2.daysInMonth && (r2.daysInMonth = this.helper.daysInMonth(r2, n2)), t2.daysInYear) {
        const e3 = this.helper.startOfCalendarYear(r2), t3 = this.helper.addCalendar(e3, { years: 1 }, "constrain", n2);
        r2.daysInYear = this.helper.calendarDaysUntil(e3, t3, n2);
      }
      return t2.monthsInYear && (r2.monthsInYear = this.helper.monthsInYear(r2, n2)), t2.inLeapYear && (r2.inLeapYear = this.helper.inLeapYear(r2, n2)), r2;
    }
    getFirstDayOfWeek() {
      return this.helper.getFirstDayOfWeek();
    }
    getMinimalDaysInFirstWeek() {
      return this.helper.getMinimalDaysInFirstWeek();
    }
  };
  for (const e2 of [HebrewHelper, PersianHelper, EthiopicHelper, EthioaaHelper, CopticHelper, ChineseHelper, DangiHelper, RocHelper, IndianHelper, BuddhistHelper, GregoryHelper, JapaneseHelper, IslamicHelper, IslamicUmalquraHelper, IslamicTblaHelper, IslamicCivilHelper, IslamicRgsaHelper, IslamicCcHelper]) {
    const t2 = new e2();
    Xo[t2.id] = new NonIsoCalendar(t2);
  }
  se("calendarImpl", (function(e2) {
    return Xo[e2];
  }));
  var ai = Intl.DateTimeFormat;
  function si(e2, t2) {
    let n2 = re(e2, t2);
    return "function" == typeof n2 && (n2 = new ai(re(e2, G), n2(re(e2, K))), (function(e3, t3, n3) {
      const r2 = Q(e3);
      if (void 0 === r2) throw new TypeError("Missing slots for the given container");
      if (void 0 === r2[t3]) throw new TypeError(`tried to reset ${t3} which was not set`);
      r2[t3] = n3;
    })(e2, t2, n2)), n2;
  }
  function ci(e2) {
    return ne(e2, q);
  }
  var DateTimeFormatImpl = class {
    constructor(e2 = void 0, t2 = void 0) {
      !(function(e3, t3, n2) {
        const r2 = void 0 !== n2;
        let o2;
        if (r2) {
          const e4 = ["localeMatcher", "calendar", "numberingSystem", "hour12", "hourCycle", "timeZone", "weekday", "era", "year", "month", "day", "dayPeriod", "hour", "minute", "second", "fractionalSecondDigits", "timeZoneName", "formatMatcher", "dateStyle", "timeStyle"];
          o2 = (function(e5) {
            if (null == e5) throw new TypeError(`Expected object not ${e5}`);
            return Object(e5);
          })(n2);
          const t4 = /* @__PURE__ */ Object.create(null);
          for (let n3 = 0; n3 < e4.length; n3++) {
            const r3 = e4[n3];
            Object.prototype.hasOwnProperty.call(o2, r3) && (t4[r3] = o2[r3]);
          }
          o2 = t4;
        } else o2 = /* @__PURE__ */ Object.create(null);
        const i2 = new ai(t3, o2), a2 = i2.resolvedOptions();
        if (te(e3), r2) {
          const t4 = Object.assign(/* @__PURE__ */ Object.create(null), a2);
          for (const e4 in t4) Object.prototype.hasOwnProperty.call(o2, e4) || delete t4[e4];
          t4.hour12 = o2.hour12, t4.hourCycle = o2.hourCycle, oe(e3, K, t4);
        } else oe(e3, K, o2);
        oe(e3, G, a2.locale), oe(e3, q, i2), oe(e3, W, a2.timeZone), oe(e3, J, a2.calendar), oe(e3, B, vi), oe(e3, Z, gi), oe(e3, F, wi), oe(e3, H, pi), oe(e3, z, bi), oe(e3, A, Di);
        const s2 = r2 ? o2.timeZone : void 0;
        if (void 0 === s2) oe(e3, _, a2.timeZone);
        else {
          const t4 = We(s2);
          if (t4.startsWith("\u2212")) throw new RangeError("Unicode minus (U+2212) is not supported in time zone offsets");
          oe(e3, _, Bn(t4));
        }
      })(this, e2, t2);
    }
    get format() {
      vt(this, ci);
      const e2 = ui.bind(this);
      return Object.defineProperties(e2, { length: { value: 1, enumerable: false, writable: false, configurable: true }, name: { value: "", enumerable: false, writable: false, configurable: true } }), e2;
    }
    formatRange(e2, t2) {
      return vt(this, ci), mi.call(this, e2, t2);
    }
    formatToParts(e2, ...t2) {
      return vt(this, ci), li.call(this, e2, ...t2);
    }
    formatRangeToParts(e2, t2) {
      return vt(this, ci), fi.call(this, e2, t2);
    }
    resolvedOptions() {
      return vt(this, ci), hi.call(this);
    }
  };
  "formatToParts" in ai.prototype || delete DateTimeFormatImpl.prototype.formatToParts, "formatRangeToParts" in ai.prototype || delete DateTimeFormatImpl.prototype.formatRangeToParts;
  var di = function(e2 = void 0, t2 = void 0) {
    return new DateTimeFormatImpl(e2, t2);
  };
  function hi() {
    const e2 = re(this, q).resolvedOptions();
    return e2.timeZone = re(this, _), e2;
  }
  function ui(e2, ...t2) {
    let n2, r2, o2 = $i(e2, this);
    return o2.formatter ? (n2 = o2.formatter, r2 = [No(o2.epochNs, "floor")]) : (n2 = re(this, q), r2 = [e2, ...t2]), n2.format(...r2);
  }
  function li(e2, ...t2) {
    let n2, r2, o2 = $i(e2, this);
    return o2.formatter ? (n2 = o2.formatter, r2 = [No(o2.epochNs, "floor")]) : (n2 = re(this, q), r2 = [e2, ...t2]), n2.formatToParts(...r2);
  }
  function mi(e2, t2) {
    if (void 0 === e2 || void 0 === t2) throw new TypeError("Intl.DateTimeFormat.formatRange requires two values");
    const n2 = Ci(e2), r2 = Ci(t2);
    let o2, i2 = [n2, r2];
    if (Ii(n2) !== Ii(r2)) throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");
    if (Ii(n2)) {
      if (!Oi(n2, r2)) throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");
      const { epochNs: e3, formatter: t3 } = $i(n2, this), { epochNs: a2, formatter: s2 } = $i(r2, this);
      t3 && (o2 = t3, i2 = [No(e3, "floor"), No(a2, "floor")]);
    }
    return o2 || (o2 = re(this, q)), o2.formatRange(...i2);
  }
  function fi(e2, t2) {
    if (void 0 === e2 || void 0 === t2) throw new TypeError("Intl.DateTimeFormat.formatRange requires two values");
    const n2 = Ci(e2), r2 = Ci(t2);
    let o2, i2 = [n2, r2];
    if (Ii(n2) !== Ii(r2)) throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");
    if (Ii(n2)) {
      if (!Oi(n2, r2)) throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");
      const { epochNs: e3, formatter: t3 } = $i(n2, this), { epochNs: a2, formatter: s2 } = $i(r2, this);
      t3 && (o2 = t3, i2 = [No(e3, "floor"), No(a2, "floor")]);
    }
    return o2 || (o2 = re(this, q)), o2.formatRangeToParts(...i2);
  }
  function yi(e2 = {}, t2 = {}) {
    const n2 = Object.assign({}, e2), r2 = ["year", "month", "day", "hour", "minute", "second", "weekday", "dayPeriod", "timeZoneName", "dateStyle", "timeStyle"];
    for (let e3 = 0; e3 < r2.length; e3++) {
      const o2 = r2[e3];
      n2[o2] = o2 in t2 ? t2[o2] : n2[o2], false !== n2[o2] && void 0 !== n2[o2] || delete n2[o2];
    }
    return n2;
  }
  function pi(e2) {
    const t2 = yi(e2, { year: false, month: false, day: false, weekday: false, timeZoneName: false, dateStyle: false });
    if ("long" !== t2.timeStyle && "full" !== t2.timeStyle || (delete t2.timeStyle, Object.assign(t2, { hour: "numeric", minute: "2-digit", second: "2-digit" })), !Mi(t2)) {
      if (Ei(e2)) throw new TypeError(`cannot format Temporal.PlainTime with options [${Object.keys(e2)}]`);
      Object.assign(t2, { hour: "numeric", minute: "numeric", second: "numeric" });
    }
    return t2;
  }
  function gi(e2) {
    const t2 = { short: { year: "2-digit", month: "numeric" }, medium: { year: "numeric", month: "short" }, long: { year: "numeric", month: "long" }, full: { year: "numeric", month: "long" } }, n2 = yi(e2, { day: false, hour: false, minute: false, second: false, weekday: false, dayPeriod: false, timeZoneName: false, timeStyle: false });
    if ("dateStyle" in n2 && n2.dateStyle) {
      const e3 = n2.dateStyle;
      delete n2.dateStyle, Object.assign(n2, t2[e3]);
    }
    if (!("year" in n2 || "month" in n2 || "era" in n2)) {
      if (Ei(e2)) throw new TypeError(`cannot format PlainYearMonth with options [${Object.keys(e2)}]`);
      Object.assign(n2, { year: "numeric", month: "numeric" });
    }
    return n2;
  }
  function wi(e2) {
    const t2 = { short: { month: "numeric", day: "numeric" }, medium: { month: "short", day: "numeric" }, long: { month: "long", day: "numeric" }, full: { month: "long", day: "numeric" } }, n2 = yi(e2, { year: false, hour: false, minute: false, second: false, weekday: false, dayPeriod: false, timeZoneName: false, timeStyle: false });
    if ("dateStyle" in n2 && n2.dateStyle) {
      const e3 = n2.dateStyle;
      delete n2.dateStyle, Object.assign(n2, t2[e3]);
    }
    if (!("month" in n2) && !("day" in n2)) {
      if (Ei(e2)) throw new TypeError(`cannot format PlainMonthDay with options [${Object.keys(e2)}]`);
      Object.assign(n2, { month: "numeric", day: "numeric" });
    }
    return n2;
  }
  function vi(e2) {
    const t2 = yi(e2, { hour: false, minute: false, second: false, dayPeriod: false, timeZoneName: false, timeStyle: false });
    if (!Ti(t2)) {
      if (Ei(e2)) throw new TypeError(`cannot format PlainDate with options [${Object.keys(e2)}]`);
      Object.assign(t2, { year: "numeric", month: "numeric", day: "numeric" });
    }
    return t2;
  }
  function bi(e2) {
    const t2 = yi(e2, { timeZoneName: false });
    if (("long" === t2.timeStyle || "full" === t2.timeStyle) && (delete t2.timeStyle, Object.assign(t2, { hour: "numeric", minute: "2-digit", second: "2-digit" }), t2.dateStyle)) {
      const e3 = { short: { year: "numeric", month: "numeric", day: "numeric" }, medium: { year: "numeric", month: "short", day: "numeric" }, long: { year: "numeric", month: "long", day: "numeric" }, full: { year: "numeric", month: "long", day: "numeric", weekday: "long" } };
      Object.assign(t2, e3[t2.dateStyle]), delete t2.dateStyle;
    }
    if (!Mi(t2) && !Ti(t2)) {
      if (Ei(e2)) throw new TypeError(`cannot format PlainDateTime with options [${Object.keys(e2)}]`);
      Object.assign(t2, { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });
    }
    return t2;
  }
  function Di(e2) {
    let t2 = e2;
    return Mi(t2) || Ti(t2) || (t2 = Object.assign({}, t2, { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" })), t2;
  }
  function Ti(e2) {
    return "year" in e2 || "month" in e2 || "day" in e2 || "weekday" in e2 || "dateStyle" in e2 || "era" in e2;
  }
  function Mi(e2) {
    return "hour" in e2 || "minute" in e2 || "second" in e2 || "timeStyle" in e2 || "dayPeriod" in e2 || "fractionalSecondDigits" in e2;
  }
  function Ei(e2) {
    return Ti(e2) || Mi(e2) || "dateStyle" in e2 || "timeStyle" in e2 || "timeZoneName" in e2;
  }
  function Ii(e2) {
    return mt(e2) || ft(e2) || yt(e2) || wt(e2) || pt(e2) || gt(e2) || ut(e2);
  }
  function Ci(e2) {
    return Ii(e2) ? e2 : qe(e2);
  }
  function Oi(e2, t2) {
    return !(!Ii(e2) || !Ii(t2) || ft(e2) && !ft(t2) || mt(e2) && !mt(t2) || yt(e2) && !yt(t2) || wt(e2) && !wt(t2) || pt(e2) && !pt(t2) || gt(e2) && !gt(t2) || ut(e2) && !ut(t2));
  }
  function $i(e2, t2) {
    if (ft(e2)) {
      const n2 = { isoDate: { year: 1970, month: 1, day: 1 }, time: re(e2, M) };
      return { epochNs: An(re(t2, W), n2, "compatible"), formatter: si(t2, H) };
    }
    if (pt(e2)) {
      const n2 = re(e2, E), r2 = re(t2, J);
      if (n2 !== r2) throw new RangeError(`cannot format PlainYearMonth with calendar ${n2} in locale with calendar ${r2}`);
      const o2 = xt(re(e2, D), { deltaDays: 0, hour: 12, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
      return { epochNs: An(re(t2, W), o2, "compatible"), formatter: si(t2, Z) };
    }
    if (gt(e2)) {
      const n2 = re(e2, E), r2 = re(t2, J);
      if (n2 !== r2) throw new RangeError(`cannot format PlainMonthDay with calendar ${n2} in locale with calendar ${r2}`);
      const o2 = xt(re(e2, D), { deltaDays: 0, hour: 12, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
      return { epochNs: An(re(t2, W), o2, "compatible"), formatter: si(t2, F) };
    }
    if (mt(e2)) {
      const n2 = re(e2, E), r2 = re(t2, J);
      if ("iso8601" !== n2 && n2 !== r2) throw new RangeError(`cannot format PlainDate with calendar ${n2} in locale with calendar ${r2}`);
      const o2 = xt(re(e2, D), { deltaDays: 0, hour: 12, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
      return { epochNs: An(re(t2, W), o2, "compatible"), formatter: si(t2, B) };
    }
    if (yt(e2)) {
      const n2 = re(e2, E), r2 = re(t2, J);
      if ("iso8601" !== n2 && n2 !== r2) throw new RangeError(`cannot format PlainDateTime with calendar ${n2} in locale with calendar ${r2}`);
      const o2 = re(e2, T);
      return { epochNs: An(re(t2, W), o2, "compatible"), formatter: si(t2, z) };
    }
    if (wt(e2)) throw new TypeError("Temporal.ZonedDateTime not supported in DateTimeFormat methods. Use toLocaleString() instead.");
    return ut(e2) ? { epochNs: re(e2, b), formatter: si(t2, A) } : {};
  }
  function Yi(e2) {
    const t2 = /* @__PURE__ */ Object.create(null);
    return t2.years = re(e2, Y), t2.months = re(e2, R), t2.weeks = re(e2, S), t2.days = re(e2, j), t2.hours = re(e2, k), t2.minutes = re(e2, N), t2.seconds = re(e2, x), t2.milliseconds = re(e2, L), t2.microseconds = re(e2, P), t2.nanoseconds = re(e2, U), t2;
  }
  DateTimeFormatImpl.prototype.constructor = di, Object.defineProperty(di, "prototype", { value: DateTimeFormatImpl.prototype, writable: false, enumerable: false, configurable: false }), di.supportedLocalesOf = ai.supportedLocalesOf, ae(di, "Intl.DateTimeFormat");
  var { format: Ri, formatToParts: Si } = Intl.DurationFormat?.prototype ?? /* @__PURE__ */ Object.create(null);
  function ji(e2) {
    Intl.DurationFormat.prototype.resolvedOptions.call(this);
    const t2 = Yi(sn(e2));
    return Ri.call(this, t2);
  }
  Intl.DurationFormat?.prototype && (Intl.DurationFormat.prototype.format = ji, Intl.DurationFormat.prototype.formatToParts = function(e2) {
    Intl.DurationFormat.prototype.resolvedOptions.call(this);
    const t2 = Yi(sn(e2));
    return Si.call(this, t2);
  });
  var ki = Object.freeze({ __proto__: null, DateTimeFormat: di, ModifiedIntlDurationFormatPrototypeFormat: ji });
  var Instant = class {
    constructor(e2) {
      if (arguments.length < 1) throw new TypeError("missing argument: epochNanoseconds is required");
      In(this, Lo(e2));
    }
    get epochMilliseconds() {
      return vt(this, ut), No(re(this, b), "floor");
    }
    get epochNanoseconds() {
      return vt(this, ut), ko(import_jsbi.default.BigInt(re(this, b)));
    }
    add(e2) {
      return vt(this, ut), wo("add", this, e2);
    }
    subtract(e2) {
      return vt(this, ut), wo("subtract", this, e2);
    }
    until(e2, t2 = void 0) {
      return vt(this, ut), so("until", this, e2, t2);
    }
    since(e2, t2 = void 0) {
      return vt(this, ut), so("since", this, e2, t2);
    }
    round(e2) {
      if (vt(this, ut), void 0 === e2) throw new TypeError("options parameter is required");
      const t2 = "string" == typeof e2 ? Fo("smallestUnit", e2) : Zo(e2), n2 = Ft(t2), r2 = Ut(t2, "halfExpand"), o2 = Wt(t2, "smallestUnit", "time", qt);
      return Ht(n2, { hour: 24, minute: 1440, second: 86400, millisecond: 864e5, microsecond: 864e8, nanosecond: 864e11 }[o2], true), Cn(Io(re(this, b), n2, o2, r2));
    }
    equals(t2) {
      vt(this, ut);
      const n2 = cn(t2), r2 = re(this, b), o2 = re(n2, b);
      return import_jsbi.default.equal(import_jsbi.default.BigInt(r2), import_jsbi.default.BigInt(o2));
    }
    toString(e2 = void 0) {
      vt(this, ut);
      const t2 = Zo(e2), n2 = zt(t2), r2 = Ut(t2, "trunc"), o2 = Wt(t2, "smallestUnit", "time", void 0);
      if ("hour" === o2) throw new RangeError('smallestUnit must be a time unit other than "hour"');
      let i2 = t2.timeZone;
      void 0 !== i2 && (i2 = Bn(i2));
      const { precision: a2, unit: s2, increment: c2 } = At(o2, n2);
      return Xn(Cn(Io(re(this, b), c2, s2, r2)), i2, a2);
    }
    toJSON() {
      return vt(this, ut), Xn(this, void 0, "auto");
    }
    toLocaleString(e2 = void 0, t2 = void 0) {
      return vt(this, ut), new di(e2, t2).format(this);
    }
    valueOf() {
      qo("Instant");
    }
    toZonedDateTimeISO(e2) {
      vt(this, ut);
      const t2 = Bn(e2);
      return $n(re(this, b), t2, "iso8601");
    }
    static fromEpochMilliseconds(e2) {
      return Cn(xo(qe(e2)));
    }
    static fromEpochNanoseconds(e2) {
      return Cn(Lo(e2));
    }
    static from(e2) {
      return cn(e2);
    }
    static compare(t2, n2) {
      const r2 = cn(t2), o2 = cn(n2), i2 = re(r2, b), a2 = re(o2, b);
      return import_jsbi.default.lessThan(i2, a2) ? -1 : import_jsbi.default.greaterThan(i2, a2) ? 1 : 0;
    }
  };
  ae(Instant, "Temporal.Instant");
  var PlainDate = class {
    constructor(e2, t2, n2, r2 = "iso8601") {
      const o2 = _e(e2), i2 = _e(t2), a2 = _e(n2), s2 = zo(void 0 === r2 ? "iso8601" : Ve(r2));
      xr(o2, i2, a2), yn(this, { year: o2, month: i2, day: a2 }, s2);
    }
    get calendarId() {
      return vt(this, mt), re(this, E);
    }
    get era() {
      return Ni(this, "era");
    }
    get eraYear() {
      return Ni(this, "eraYear");
    }
    get year() {
      return Ni(this, "year");
    }
    get month() {
      return Ni(this, "month");
    }
    get monthCode() {
      return Ni(this, "monthCode");
    }
    get day() {
      return Ni(this, "day");
    }
    get dayOfWeek() {
      return Ni(this, "dayOfWeek");
    }
    get dayOfYear() {
      return Ni(this, "dayOfYear");
    }
    get weekOfYear() {
      return Ni(this, "weekOfYear")?.week;
    }
    get yearOfWeek() {
      return Ni(this, "weekOfYear")?.year;
    }
    get daysInWeek() {
      return Ni(this, "daysInWeek");
    }
    get daysInMonth() {
      return Ni(this, "daysInMonth");
    }
    get daysInYear() {
      return Ni(this, "daysInYear");
    }
    get monthsInYear() {
      return Ni(this, "monthsInYear");
    }
    get inLeapYear() {
      return Ni(this, "inLeapYear");
    }
    with(e2, t2 = void 0) {
      if (vt(this, mt), !Ae(e2)) throw new TypeError("invalid argument");
      bt(e2);
      const n2 = re(this, E);
      let r2 = en(n2, re(this, D));
      return r2 = Rn(n2, r2, tn(n2, e2, ["year", "month", "monthCode", "day"], [], "partial")), pn(Ln(n2, r2, Lt(Zo(t2))), n2);
    }
    withCalendar(e2) {
      vt(this, mt);
      const t2 = kn(e2);
      return pn(re(this, D), t2);
    }
    add(e2, t2 = void 0) {
      return vt(this, mt), vo("add", this, e2, t2);
    }
    subtract(e2, t2 = void 0) {
      return vt(this, mt), vo("subtract", this, e2, t2);
    }
    until(e2, t2 = void 0) {
      return vt(this, mt), co("until", this, e2, t2);
    }
    since(e2, t2 = void 0) {
      return vt(this, mt), co("since", this, e2, t2);
    }
    equals(e2) {
      vt(this, mt);
      const t2 = rn(e2);
      return 0 === Ro(re(this, D), re(t2, D)) && xn(re(this, E), re(t2, E));
    }
    toString(e2 = void 0) {
      return vt(this, mt), er(this, Zt(Zo(e2)));
    }
    toJSON() {
      return vt(this, mt), er(this);
    }
    toLocaleString(e2 = void 0, t2 = void 0) {
      return vt(this, mt), new di(e2, t2).format(this);
    }
    valueOf() {
      qo("PlainDate");
    }
    toPlainDateTime(e2 = void 0) {
      vt(this, mt);
      const t2 = un(e2);
      return wn(xt(re(this, D), t2), re(this, E));
    }
    toZonedDateTime(e2) {
      let t2, n2;
      if (vt(this, mt), Ae(e2)) {
        const r3 = e2.timeZone;
        void 0 === r3 ? t2 = Bn(e2) : (t2 = Bn(r3), n2 = e2.plainTime);
      } else t2 = Bn(e2);
      const r2 = re(this, D);
      let o2;
      return void 0 === n2 ? o2 = _n(t2, r2) : (n2 = hn(n2), o2 = An(t2, xt(r2, re(n2, M)), "compatible")), $n(o2, t2, re(this, E));
    }
    toPlainYearMonth() {
      vt(this, mt);
      const e2 = re(this, E);
      return En(Pn(e2, en(e2, re(this, D)), "constrain"), e2);
    }
    toPlainMonthDay() {
      vt(this, mt);
      const e2 = re(this, E);
      return bn(Un(e2, en(e2, re(this, D)), "constrain"), e2);
    }
    static from(e2, t2 = void 0) {
      return rn(e2, t2);
    }
    static compare(e2, t2) {
      const n2 = rn(e2), r2 = rn(t2);
      return Ro(re(n2, D), re(r2, D));
    }
  };
  function Ni(e2, t2) {
    vt(e2, mt);
    const n2 = re(e2, D);
    return Qt(e2).isoToDate(n2, { [t2]: true })[t2];
  }
  ae(PlainDate, "Temporal.PlainDate");
  var PlainDateTime = class {
    constructor(e2, t2, n2, r2 = 0, o2 = 0, i2 = 0, a2 = 0, s2 = 0, c2 = 0, d2 = "iso8601") {
      const h2 = _e(e2), u2 = _e(t2), l2 = _e(n2), m2 = void 0 === r2 ? 0 : _e(r2), f2 = void 0 === o2 ? 0 : _e(o2), y2 = void 0 === i2 ? 0 : _e(i2), p2 = void 0 === a2 ? 0 : _e(a2), g2 = void 0 === s2 ? 0 : _e(s2), w2 = void 0 === c2 ? 0 : _e(c2), v2 = zo(void 0 === d2 ? "iso8601" : Ve(d2));
      Ur(h2, u2, l2, m2, f2, y2, p2, g2, w2), gn(this, { isoDate: { year: h2, month: u2, day: l2 }, time: { hour: m2, minute: f2, second: y2, millisecond: p2, microsecond: g2, nanosecond: w2 } }, v2);
    }
    get calendarId() {
      return vt(this, yt), re(this, E);
    }
    get year() {
      return xi(this, "year");
    }
    get month() {
      return xi(this, "month");
    }
    get monthCode() {
      return xi(this, "monthCode");
    }
    get day() {
      return xi(this, "day");
    }
    get hour() {
      return Li(this, "hour");
    }
    get minute() {
      return Li(this, "minute");
    }
    get second() {
      return Li(this, "second");
    }
    get millisecond() {
      return Li(this, "millisecond");
    }
    get microsecond() {
      return Li(this, "microsecond");
    }
    get nanosecond() {
      return Li(this, "nanosecond");
    }
    get era() {
      return xi(this, "era");
    }
    get eraYear() {
      return xi(this, "eraYear");
    }
    get dayOfWeek() {
      return xi(this, "dayOfWeek");
    }
    get dayOfYear() {
      return xi(this, "dayOfYear");
    }
    get weekOfYear() {
      return xi(this, "weekOfYear")?.week;
    }
    get yearOfWeek() {
      return xi(this, "weekOfYear")?.year;
    }
    get daysInWeek() {
      return xi(this, "daysInWeek");
    }
    get daysInYear() {
      return xi(this, "daysInYear");
    }
    get daysInMonth() {
      return xi(this, "daysInMonth");
    }
    get monthsInYear() {
      return xi(this, "monthsInYear");
    }
    get inLeapYear() {
      return xi(this, "inLeapYear");
    }
    with(e2, t2 = void 0) {
      if (vt(this, yt), !Ae(e2)) throw new TypeError("invalid argument");
      bt(e2);
      const n2 = re(this, E), r2 = re(this, T);
      let o2 = { ...en(n2, r2.isoDate), ...r2.time };
      return o2 = Rn(n2, o2, tn(n2, e2, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond"], "partial")), wn(on(n2, o2, Lt(Zo(t2))), n2);
    }
    withPlainTime(e2 = void 0) {
      vt(this, yt);
      const t2 = un(e2);
      return wn(xt(re(this, T).isoDate, t2), re(this, E));
    }
    withCalendar(e2) {
      vt(this, yt);
      const t2 = kn(e2);
      return wn(re(this, T), t2);
    }
    add(e2, t2 = void 0) {
      return vt(this, yt), bo("add", this, e2, t2);
    }
    subtract(e2, t2 = void 0) {
      return vt(this, yt), bo("subtract", this, e2, t2);
    }
    until(e2, t2 = void 0) {
      return vt(this, yt), ho("until", this, e2, t2);
    }
    since(e2, t2 = void 0) {
      return vt(this, yt), ho("since", this, e2, t2);
    }
    round(e2) {
      if (vt(this, yt), void 0 === e2) throw new TypeError("options parameter is required");
      const t2 = "string" == typeof e2 ? Fo("smallestUnit", e2) : Zo(e2), n2 = Ft(t2), r2 = Ut(t2, "halfExpand"), o2 = Wt(t2, "smallestUnit", "time", qt, ["day"]), i2 = { day: 1, hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[o2];
      Ht(n2, i2, 1 === i2);
      const a2 = re(this, T);
      return wn(1 === n2 && "nanosecond" === o2 ? a2 : Co(a2, n2, o2, r2), re(this, E));
    }
    equals(e2) {
      vt(this, yt);
      const t2 = an(e2);
      return 0 === jo(re(this, T), re(t2, T)) && xn(re(this, E), re(t2, E));
    }
    toString(e2 = void 0) {
      vt(this, yt);
      const t2 = Zo(e2), n2 = Zt(t2), r2 = zt(t2), o2 = Ut(t2, "trunc"), i2 = Wt(t2, "smallestUnit", "time", void 0);
      if ("hour" === i2) throw new RangeError('smallestUnit must be a time unit other than "hour"');
      const { precision: a2, unit: s2, increment: c2 } = At(i2, r2), d2 = Co(re(this, T), c2, s2, o2);
      return Br(d2), nr(d2, re(this, E), a2, n2);
    }
    toJSON() {
      return vt(this, yt), nr(re(this, T), re(this, E), "auto");
    }
    toLocaleString(e2 = void 0, t2 = void 0) {
      return vt(this, yt), new di(e2, t2).format(this);
    }
    valueOf() {
      qo("PlainDateTime");
    }
    toZonedDateTime(e2, t2 = void 0) {
      vt(this, yt);
      const n2 = Bn(e2), r2 = Pt(Zo(t2));
      return $n(An(n2, re(this, T), r2), n2, re(this, E));
    }
    toPlainDate() {
      return vt(this, yt), pn(re(this, T).isoDate, re(this, E));
    }
    toPlainTime() {
      return vt(this, yt), Tn(re(this, T).time);
    }
    static from(e2, t2 = void 0) {
      return an(e2, t2);
    }
    static compare(e2, t2) {
      const n2 = an(e2), r2 = an(t2);
      return jo(re(n2, T), re(r2, T));
    }
  };
  function xi(e2, t2) {
    vt(e2, yt);
    const n2 = re(e2, T).isoDate;
    return Qt(e2).isoToDate(n2, { [t2]: true })[t2];
  }
  function Li(e2, t2) {
    return vt(e2, yt), re(e2, T).time[t2];
  }
  ae(PlainDateTime, "Temporal.PlainDateTime");
  var Duration = class _Duration {
    constructor(e2 = 0, t2 = 0, n2 = 0, r2 = 0, o2 = 0, i2 = 0, a2 = 0, s2 = 0, c2 = 0, d2 = 0) {
      const h2 = void 0 === e2 ? 0 : Ge(e2), u2 = void 0 === t2 ? 0 : Ge(t2), l2 = void 0 === n2 ? 0 : Ge(n2), m2 = void 0 === r2 ? 0 : Ge(r2), f2 = void 0 === o2 ? 0 : Ge(o2), y2 = void 0 === i2 ? 0 : Ge(i2), p2 = void 0 === a2 ? 0 : Ge(a2), g2 = void 0 === s2 ? 0 : Ge(s2), w2 = void 0 === c2 ? 0 : Ge(c2), v2 = void 0 === d2 ? 0 : Ge(d2);
      zr(h2, u2, l2, m2, f2, y2, p2, g2, w2, v2), te(this), oe(this, Y, h2), oe(this, R, u2), oe(this, S, l2), oe(this, j, m2), oe(this, k, f2), oe(this, N, y2), oe(this, x, p2), oe(this, L, g2), oe(this, P, w2), oe(this, U, v2);
    }
    get years() {
      return vt(this, lt), re(this, Y);
    }
    get months() {
      return vt(this, lt), re(this, R);
    }
    get weeks() {
      return vt(this, lt), re(this, S);
    }
    get days() {
      return vt(this, lt), re(this, j);
    }
    get hours() {
      return vt(this, lt), re(this, k);
    }
    get minutes() {
      return vt(this, lt), re(this, N);
    }
    get seconds() {
      return vt(this, lt), re(this, x);
    }
    get milliseconds() {
      return vt(this, lt), re(this, L);
    }
    get microseconds() {
      return vt(this, lt), re(this, P);
    }
    get nanoseconds() {
      return vt(this, lt), re(this, U);
    }
    get sign() {
      return vt(this, lt), Mr(this);
    }
    get blank() {
      return vt(this, lt), 0 === Mr(this);
    }
    with(e2) {
      vt(this, lt);
      const t2 = kt(e2), { years: n2 = re(this, Y), months: r2 = re(this, R), weeks: o2 = re(this, S), days: i2 = re(this, j), hours: a2 = re(this, k), minutes: s2 = re(this, N), seconds: c2 = re(this, x), milliseconds: d2 = re(this, L), microseconds: h2 = re(this, P), nanoseconds: u2 = re(this, U) } = t2;
      return new _Duration(n2, r2, o2, i2, a2, s2, c2, d2, h2, u2);
    }
    negated() {
      return vt(this, lt), Sr(this);
    }
    abs() {
      return vt(this, lt), new _Duration(Math.abs(re(this, Y)), Math.abs(re(this, R)), Math.abs(re(this, S)), Math.abs(re(this, j)), Math.abs(re(this, k)), Math.abs(re(this, N)), Math.abs(re(this, x)), Math.abs(re(this, L)), Math.abs(re(this, P)), Math.abs(re(this, U)));
    }
    add(e2) {
      return vt(this, lt), go("add", this, e2);
    }
    subtract(e2) {
      return vt(this, lt), go("subtract", this, e2);
    }
    round(e2) {
      if (vt(this, lt), void 0 === e2) throw new TypeError("options parameter is required");
      const t2 = Jt(this), n2 = "string" == typeof e2 ? Fo("smallestUnit", e2) : Zo(e2);
      let r2 = Wt(n2, "largestUnit", "datetime", void 0, ["auto"]), { plainRelativeTo: o2, zonedRelativeTo: i2 } = _t(n2);
      const a2 = Ft(n2), s2 = Ut(n2, "halfExpand");
      let c2 = Wt(n2, "smallestUnit", "datetime", void 0), d2 = true;
      c2 || (d2 = false, c2 = "nanosecond");
      const h2 = Gt(t2, c2);
      let u2 = true;
      if (r2 || (u2 = false, r2 = h2), "auto" === r2 && (r2 = h2), !d2 && !u2) throw new RangeError("at least one of smallestUnit or largestUnit is required");
      if (Gt(r2, c2) !== r2) throw new RangeError(`largestUnit ${r2} cannot be smaller than smallestUnit ${c2}`);
      const l2 = { hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[c2];
      if (void 0 !== l2 && Ht(a2, l2, false), a2 > 1 && "date" === Vt(c2) && r2 !== c2) throw new RangeError("For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit");
      if (i2) {
        let e3 = Ar(this);
        const t3 = re(i2, $), n3 = re(i2, E), o3 = re(i2, b);
        return e3 = io(o3, po(o3, t3, n3, e3), t3, n3, r2, a2, c2, s2), "date" === Vt(r2) && (r2 = "hour"), _r(e3, r2);
      }
      if (o2) {
        let e3 = qr(this);
        const t3 = fo({ deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }, e3.time), n3 = re(o2, D), i3 = re(o2, E), d3 = Sn(i3, n3, Nt(e3.date, t3.deltaDays), "constrain");
        return e3 = oo(xt(n3, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), xt(d3, t3), i3, r2, a2, c2, s2), _r(e3, r2);
      }
      if (Kt(t2)) throw new RangeError(`a starting point is required for ${t2}s balancing`);
      if (Kt(r2)) throw new RangeError(`a starting point is required for ${r2}s balancing`);
      let m2 = qr(this);
      if ("day" === c2) {
        const { quotient: e3, remainder: t3 } = m2.time.divmod(Se);
        let n3 = m2.date.days + e3 + Yo(t3, "day");
        n3 = Eo(n3, a2, s2), m2 = Jr({ years: 0, months: 0, weeks: 0, days: n3 }, TimeDuration.ZERO);
      } else m2 = Jr({ years: 0, months: 0, weeks: 0, days: 0 }, $o(m2.time, a2, c2, s2));
      return _r(m2, r2);
    }
    total(t2) {
      if (vt(this, lt), void 0 === t2) throw new TypeError("options argument is required");
      const n2 = "string" == typeof t2 ? Fo("unit", t2) : Zo(t2);
      let { plainRelativeTo: r2, zonedRelativeTo: o2 } = _t(n2);
      const i2 = Wt(n2, "unit", "datetime", qt);
      if (o2) {
        const e2 = Ar(this), t3 = re(o2, $), n3 = re(o2, E), r3 = re(o2, b);
        return (function(e3, t4, n4, r4, o3) {
          return "time" === Vt(o3) ? Yo(TimeDuration.fromEpochNsDiff(t4, e3), o3) : ro(eo(e3, t4, n4, r4, o3), t4, zn(n4, e3), n4, r4, o3);
        })(r3, po(r3, t3, n3, e2), t3, n3, i2);
      }
      if (r2) {
        const t3 = qr(this);
        let n3 = fo({ deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }, t3.time);
        const o3 = re(r2, D), a3 = re(r2, E), s2 = Sn(a3, o3, Nt(t3.date, n3.deltaDays), "constrain");
        return (function(t4, n4, r3, o4) {
          if (0 == jo(t4, n4)) return 0;
          Br(t4), Br(n4);
          const i3 = Qr(t4, n4, r3, o4);
          return "nanosecond" === o4 ? import_jsbi.default.toNumber(i3.time.totalNs) : ro(i3, pr(n4), t4, null, r3, o4);
        })(xt(o3, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), xt(s2, n3), a3, i2);
      }
      const a2 = Jt(this);
      if (Kt(a2)) throw new RangeError(`a starting point is required for ${a2}s total`);
      if (Kt(i2)) throw new RangeError(`a starting point is required for ${i2}s total`);
      return Yo(qr(this).time, i2);
    }
    toString(e2 = void 0) {
      vt(this, lt);
      const t2 = Zo(e2), n2 = zt(t2), r2 = Ut(t2, "trunc"), o2 = Wt(t2, "smallestUnit", "time", void 0);
      if ("hour" === o2 || "minute" === o2) throw new RangeError('smallestUnit must be a time unit other than "hours" or "minutes"');
      const { precision: i2, unit: a2, increment: s2 } = At(o2, n2);
      if ("nanosecond" === a2 && 1 === s2) return Qn(this, i2);
      const c2 = Jt(this);
      let d2 = Ar(this);
      const h2 = $o(d2.time, s2, a2, r2);
      return d2 = Jr(d2.date, h2), Qn(_r(d2, Gt(c2, "second")), i2);
    }
    toJSON() {
      return vt(this, lt), Qn(this, "auto");
    }
    toLocaleString(e2 = void 0, t2 = void 0) {
      if (vt(this, lt), "function" == typeof Intl.DurationFormat) {
        const n2 = new Intl.DurationFormat(e2, t2);
        return ji.call(n2, this);
      }
      return console.warn("Temporal.Duration.prototype.toLocaleString() requires Intl.DurationFormat."), Qn(this, "auto");
    }
    valueOf() {
      qo("Duration");
    }
    static from(e2) {
      return sn(e2);
    }
    static compare(t2, n2, r2 = void 0) {
      const o2 = sn(t2), i2 = sn(n2), a2 = Zo(r2), { plainRelativeTo: s2, zonedRelativeTo: c2 } = _t(a2);
      if (re(o2, Y) === re(i2, Y) && re(o2, R) === re(i2, R) && re(o2, S) === re(i2, S) && re(o2, j) === re(i2, j) && re(o2, k) === re(i2, k) && re(o2, N) === re(i2, N) && re(o2, x) === re(i2, x) && re(o2, L) === re(i2, L) && re(o2, P) === re(i2, P) && re(o2, U) === re(i2, U)) return 0;
      const d2 = Jt(o2), h2 = Jt(i2), u2 = Ar(o2), l2 = Ar(i2);
      if (c2 && ("date" === Vt(d2) || "date" === Vt(h2))) {
        const t3 = re(c2, $), n3 = re(c2, E), r3 = re(c2, b), o3 = po(r3, t3, n3, u2), i3 = po(r3, t3, n3, l2);
        return Bo(import_jsbi.default.toNumber(import_jsbi.default.subtract(o3, i3)));
      }
      let m2 = u2.date.days, f2 = l2.date.days;
      if (Kt(d2) || Kt(h2)) {
        if (!s2) throw new RangeError("A starting point is required for years, months, or weeks comparison");
        m2 = Rr(u2.date, s2), f2 = Rr(l2.date, s2);
      }
      const y2 = u2.time.add24HourDays(m2), p2 = l2.time.add24HourDays(f2);
      return y2.cmp(p2);
    }
  };
  ae(Duration, "Temporal.Duration");
  var PlainMonthDay = class {
    constructor(e2, t2, n2 = "iso8601", r2 = 1972) {
      const o2 = _e(e2), i2 = _e(t2), a2 = zo(void 0 === n2 ? "iso8601" : Ve(n2)), s2 = _e(r2);
      xr(s2, o2, i2), vn(this, { year: s2, month: o2, day: i2 }, a2);
    }
    get monthCode() {
      return Pi(this, "monthCode");
    }
    get day() {
      return Pi(this, "day");
    }
    get calendarId() {
      return vt(this, gt), re(this, E);
    }
    with(e2, t2 = void 0) {
      if (vt(this, gt), !Ae(e2)) throw new TypeError("invalid argument");
      bt(e2);
      const n2 = re(this, E);
      let r2 = en(n2, re(this, D), "month-day");
      return r2 = Rn(n2, r2, tn(n2, e2, ["year", "month", "monthCode", "day"], [], "partial")), bn(Un(n2, r2, Lt(Zo(t2))), n2);
    }
    equals(e2) {
      vt(this, gt);
      const t2 = dn(e2);
      return 0 === Ro(re(this, D), re(t2, D)) && xn(re(this, E), re(t2, E));
    }
    toString(e2 = void 0) {
      return vt(this, gt), rr(this, Zt(Zo(e2)));
    }
    toJSON() {
      return vt(this, gt), rr(this);
    }
    toLocaleString(e2 = void 0, t2 = void 0) {
      return vt(this, gt), new di(e2, t2).format(this);
    }
    valueOf() {
      qo("PlainMonthDay");
    }
    toPlainDate(e2) {
      if (vt(this, gt), !Ae(e2)) throw new TypeError("argument should be an object");
      const t2 = re(this, E);
      return pn(Ln(t2, Rn(t2, en(t2, re(this, D), "month-day"), tn(t2, e2, ["year"], [], [])), "constrain"), t2);
    }
    static from(e2, t2 = void 0) {
      return dn(e2, t2);
    }
  };
  function Pi(e2, t2) {
    vt(e2, gt);
    const n2 = re(e2, D);
    return Qt(e2).isoToDate(n2, { [t2]: true })[t2];
  }
  function Ui(e2) {
    return zn(e2, Po());
  }
  ae(PlainMonthDay, "Temporal.PlainMonthDay");
  var Bi = { instant: () => Cn(Po()), plainDateTimeISO: (e2 = Uo()) => wn(Ui(Bn(e2)), "iso8601"), plainDateISO: (e2 = Uo()) => pn(Ui(Bn(e2)).isoDate, "iso8601"), plainTimeISO: (e2 = Uo()) => Tn(Ui(Bn(e2)).time), timeZoneId: () => Uo(), zonedDateTimeISO: (e2 = Uo()) => {
    const t2 = Bn(e2);
    return $n(Po(), t2, "iso8601");
  }, [Symbol.toStringTag]: "Temporal.Now" };
  Object.defineProperty(Bi, Symbol.toStringTag, { value: "Temporal.Now", writable: false, enumerable: false, configurable: true });
  var PlainTime = class _PlainTime {
    constructor(e2 = 0, t2 = 0, n2 = 0, r2 = 0, o2 = 0, i2 = 0) {
      const a2 = void 0 === e2 ? 0 : _e(e2), s2 = void 0 === t2 ? 0 : _e(t2), c2 = void 0 === n2 ? 0 : _e(n2), d2 = void 0 === r2 ? 0 : _e(r2), h2 = void 0 === o2 ? 0 : _e(o2), u2 = void 0 === i2 ? 0 : _e(i2);
      Pr(a2, s2, c2, d2, h2, u2), Dn(this, { hour: a2, minute: s2, second: c2, millisecond: d2, microsecond: h2, nanosecond: u2 });
    }
    get hour() {
      return vt(this, ft), re(this, M).hour;
    }
    get minute() {
      return vt(this, ft), re(this, M).minute;
    }
    get second() {
      return vt(this, ft), re(this, M).second;
    }
    get millisecond() {
      return vt(this, ft), re(this, M).millisecond;
    }
    get microsecond() {
      return vt(this, ft), re(this, M).microsecond;
    }
    get nanosecond() {
      return vt(this, ft), re(this, M).nanosecond;
    }
    with(e2, t2 = void 0) {
      if (vt(this, ft), !Ae(e2)) throw new TypeError("invalid argument");
      bt(e2);
      const n2 = nn(e2, "partial"), r2 = nn(this);
      let { hour: o2, minute: i2, second: a2, millisecond: s2, microsecond: c2, nanosecond: d2 } = Object.assign(r2, n2);
      const h2 = Lt(Zo(t2));
      return { hour: o2, minute: i2, second: a2, millisecond: s2, microsecond: c2, nanosecond: d2 } = jt(o2, i2, a2, s2, c2, d2, h2), new _PlainTime(o2, i2, a2, s2, c2, d2);
    }
    add(e2) {
      return vt(this, ft), Do("add", this, e2);
    }
    subtract(e2) {
      return vt(this, ft), Do("subtract", this, e2);
    }
    until(e2, t2 = void 0) {
      return vt(this, ft), uo("until", this, e2, t2);
    }
    since(e2, t2 = void 0) {
      return vt(this, ft), uo("since", this, e2, t2);
    }
    round(e2) {
      if (vt(this, ft), void 0 === e2) throw new TypeError("options parameter is required");
      const t2 = "string" == typeof e2 ? Fo("smallestUnit", e2) : Zo(e2), n2 = Ft(t2), r2 = Ut(t2, "halfExpand"), o2 = Wt(t2, "smallestUnit", "time", qt);
      return Ht(n2, { hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[o2], false), Tn(Oo(re(this, M), n2, o2, r2));
    }
    equals(e2) {
      vt(this, ft);
      const t2 = hn(e2);
      return 0 === So(re(this, M), re(t2, M));
    }
    toString(e2 = void 0) {
      vt(this, ft);
      const t2 = Zo(e2), n2 = zt(t2), r2 = Ut(t2, "trunc"), o2 = Wt(t2, "smallestUnit", "time", void 0);
      if ("hour" === o2) throw new RangeError('smallestUnit must be a time unit other than "hour"');
      const { precision: i2, unit: a2, increment: s2 } = At(o2, n2);
      return tr(Oo(re(this, M), s2, a2, r2), i2);
    }
    toJSON() {
      return vt(this, ft), tr(re(this, M), "auto");
    }
    toLocaleString(e2 = void 0, t2 = void 0) {
      return vt(this, ft), new di(e2, t2).format(this);
    }
    valueOf() {
      qo("PlainTime");
    }
    static from(e2, t2 = void 0) {
      return hn(e2, t2);
    }
    static compare(e2, t2) {
      const n2 = hn(e2), r2 = hn(t2);
      return So(re(n2, M), re(r2, M));
    }
  };
  ae(PlainTime, "Temporal.PlainTime");
  var PlainYearMonth = class {
    constructor(e2, t2, n2 = "iso8601", r2 = 1) {
      const o2 = _e(e2), i2 = _e(t2), a2 = zo(void 0 === n2 ? "iso8601" : Ve(n2)), s2 = _e(r2);
      xr(o2, i2, s2), Mn(this, { year: o2, month: i2, day: s2 }, a2);
    }
    get year() {
      return Zi(this, "year");
    }
    get month() {
      return Zi(this, "month");
    }
    get monthCode() {
      return Zi(this, "monthCode");
    }
    get calendarId() {
      return vt(this, pt), re(this, E);
    }
    get era() {
      return Zi(this, "era");
    }
    get eraYear() {
      return Zi(this, "eraYear");
    }
    get daysInMonth() {
      return Zi(this, "daysInMonth");
    }
    get daysInYear() {
      return Zi(this, "daysInYear");
    }
    get monthsInYear() {
      return Zi(this, "monthsInYear");
    }
    get inLeapYear() {
      return Zi(this, "inLeapYear");
    }
    with(e2, t2 = void 0) {
      if (vt(this, pt), !Ae(e2)) throw new TypeError("invalid argument");
      bt(e2);
      const n2 = re(this, E);
      let r2 = en(n2, re(this, D), "year-month");
      return r2 = Rn(n2, r2, tn(n2, e2, ["year", "month", "monthCode"], [], "partial")), En(Pn(n2, r2, Lt(Zo(t2))), n2);
    }
    add(e2, t2 = void 0) {
      return vt(this, pt), To("add", this, e2, t2);
    }
    subtract(e2, t2 = void 0) {
      return vt(this, pt), To("subtract", this, e2, t2);
    }
    until(e2, t2 = void 0) {
      return vt(this, pt), lo("until", this, e2, t2);
    }
    since(e2, t2 = void 0) {
      return vt(this, pt), lo("since", this, e2, t2);
    }
    equals(e2) {
      vt(this, pt);
      const t2 = ln(e2);
      return 0 === Ro(re(this, D), re(t2, D)) && xn(re(this, E), re(t2, E));
    }
    toString(e2 = void 0) {
      return vt(this, pt), or(this, Zt(Zo(e2)));
    }
    toJSON() {
      return vt(this, pt), or(this);
    }
    toLocaleString(e2 = void 0, t2 = void 0) {
      return vt(this, pt), new di(e2, t2).format(this);
    }
    valueOf() {
      qo("PlainYearMonth");
    }
    toPlainDate(e2) {
      if (vt(this, pt), !Ae(e2)) throw new TypeError("argument should be an object");
      const t2 = re(this, E);
      return pn(Ln(t2, Rn(t2, en(t2, re(this, D), "year-month"), tn(t2, e2, ["day"], [], [])), "constrain"), t2);
    }
    static from(e2, t2 = void 0) {
      return ln(e2, t2);
    }
    static compare(e2, t2) {
      const n2 = ln(e2), r2 = ln(t2);
      return Ro(re(n2, D), re(r2, D));
    }
  };
  function Zi(e2, t2) {
    vt(e2, pt);
    const n2 = re(e2, D);
    return Qt(e2).isoToDate(n2, { [t2]: true })[t2];
  }
  ae(PlainYearMonth, "Temporal.PlainYearMonth");
  var Fi = di.prototype.resolvedOptions;
  var ZonedDateTime = class {
    constructor(e2, t2, n2 = "iso8601") {
      if (arguments.length < 1) throw new TypeError("missing argument: epochNanoseconds is required");
      const r2 = Lo(e2);
      let o2 = Ve(t2);
      const { tzName: i2, offsetMinutes: a2 } = Rt(o2);
      if (void 0 === a2) {
        const e3 = hr(i2);
        if (!e3) throw new RangeError(`unknown time zone ${i2}`);
        o2 = e3.identifier;
      } else o2 = mr(a2);
      On(this, r2, o2, zo(void 0 === n2 ? "iso8601" : Ve(n2)));
    }
    get calendarId() {
      return vt(this, wt), re(this, E);
    }
    get timeZoneId() {
      return vt(this, wt), re(this, $);
    }
    get year() {
      return zi(this, "year");
    }
    get month() {
      return zi(this, "month");
    }
    get monthCode() {
      return zi(this, "monthCode");
    }
    get day() {
      return zi(this, "day");
    }
    get hour() {
      return Ai(this, "hour");
    }
    get minute() {
      return Ai(this, "minute");
    }
    get second() {
      return Ai(this, "second");
    }
    get millisecond() {
      return Ai(this, "millisecond");
    }
    get microsecond() {
      return Ai(this, "microsecond");
    }
    get nanosecond() {
      return Ai(this, "nanosecond");
    }
    get era() {
      return zi(this, "era");
    }
    get eraYear() {
      return zi(this, "eraYear");
    }
    get epochMilliseconds() {
      return vt(this, wt), No(re(this, b), "floor");
    }
    get epochNanoseconds() {
      return vt(this, wt), ko(re(this, b));
    }
    get dayOfWeek() {
      return zi(this, "dayOfWeek");
    }
    get dayOfYear() {
      return zi(this, "dayOfYear");
    }
    get weekOfYear() {
      return zi(this, "weekOfYear")?.week;
    }
    get yearOfWeek() {
      return zi(this, "weekOfYear")?.year;
    }
    get hoursInDay() {
      vt(this, wt);
      const e2 = re(this, $), t2 = Hi(this).isoDate, n2 = Or(t2.year, t2.month, t2.day + 1), r2 = _n(e2, t2), o2 = _n(e2, n2);
      return Yo(TimeDuration.fromEpochNsDiff(o2, r2), "hour");
    }
    get daysInWeek() {
      return zi(this, "daysInWeek");
    }
    get daysInMonth() {
      return zi(this, "daysInMonth");
    }
    get daysInYear() {
      return zi(this, "daysInYear");
    }
    get monthsInYear() {
      return zi(this, "monthsInYear");
    }
    get inLeapYear() {
      return zi(this, "inLeapYear");
    }
    get offset() {
      return vt(this, wt), Hn(Fn(re(this, $), re(this, b)));
    }
    get offsetNanoseconds() {
      return vt(this, wt), Fn(re(this, $), re(this, b));
    }
    with(e2, t2 = void 0) {
      if (vt(this, wt), !Ae(e2)) throw new TypeError("invalid zoned-date-time-like");
      bt(e2);
      const n2 = re(this, E), r2 = re(this, $), o2 = Fn(r2, re(this, b)), i2 = Hi(this);
      let a2 = { ...en(n2, i2.isoDate), ...i2.time, offset: Hn(o2) };
      a2 = Rn(n2, a2, tn(n2, e2, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond", "offset"], "partial"));
      const s2 = Zo(t2), c2 = Pt(s2), d2 = Bt(s2, "prefer"), h2 = on(n2, a2, Lt(s2)), u2 = sr(a2.offset);
      return $n(mn(h2.isoDate, h2.time, "option", u2, r2, c2, d2, false), r2, n2);
    }
    withPlainTime(e2 = void 0) {
      vt(this, wt);
      const t2 = re(this, $), n2 = re(this, E), r2 = Hi(this).isoDate;
      let o2;
      return o2 = void 0 === e2 ? _n(t2, r2) : An(t2, xt(r2, re(hn(e2), M)), "compatible"), $n(o2, t2, n2);
    }
    withTimeZone(e2) {
      vt(this, wt);
      const t2 = Bn(e2);
      return $n(re(this, b), t2, re(this, E));
    }
    withCalendar(e2) {
      vt(this, wt);
      const t2 = kn(e2);
      return $n(re(this, b), re(this, $), t2);
    }
    add(e2, t2 = void 0) {
      return vt(this, wt), Mo("add", this, e2, t2);
    }
    subtract(e2, t2 = void 0) {
      return vt(this, wt), Mo("subtract", this, e2, t2);
    }
    until(e2, t2 = void 0) {
      return vt(this, wt), mo("until", this, e2, t2);
    }
    since(e2, t2 = void 0) {
      return vt(this, wt), mo("since", this, e2, t2);
    }
    round(t2) {
      if (vt(this, wt), void 0 === t2) throw new TypeError("options parameter is required");
      const n2 = "string" == typeof t2 ? Fo("smallestUnit", t2) : Zo(t2), r2 = Ft(n2), o2 = Ut(n2, "halfExpand"), i2 = Wt(n2, "smallestUnit", "time", qt, ["day"]), a2 = { day: 1, hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[i2];
      if (Ht(r2, a2, 1 === a2), "nanosecond" === i2 && 1 === r2) return $n(re(this, b), re(this, $), re(this, E));
      const s2 = re(this, $), c2 = re(this, b), d2 = Hi(this);
      let h2;
      if ("day" === i2) {
        const t3 = d2.isoDate, n3 = Or(t3.year, t3.month, t3.day + 1), r3 = _n(s2, t3), i3 = _n(s2, n3), a3 = import_jsbi.default.subtract(i3, r3);
        h2 = TimeDuration.fromEpochNsDiff(c2, r3).round(a3, o2).addToEpochNs(r3);
      } else {
        const e2 = Co(d2, r2, i2, o2), t3 = Fn(s2, c2);
        h2 = mn(e2.isoDate, e2.time, "option", t3, s2, "compatible", "prefer", false);
      }
      return $n(h2, s2, re(this, E));
    }
    equals(t2) {
      vt(this, wt);
      const n2 = fn(t2), r2 = re(this, b), o2 = re(n2, b);
      return !!import_jsbi.default.equal(import_jsbi.default.BigInt(r2), import_jsbi.default.BigInt(o2)) && !!Zn(re(this, $), re(n2, $)) && xn(re(this, E), re(n2, E));
    }
    toString(e2 = void 0) {
      vt(this, wt);
      const t2 = Zo(e2), n2 = Zt(t2), r2 = zt(t2), o2 = (function(e3) {
        return Ho(e3, "offset", ["auto", "never"], "auto");
      })(t2), i2 = Ut(t2, "trunc"), a2 = Wt(t2, "smallestUnit", "time", void 0);
      if ("hour" === a2) throw new RangeError('smallestUnit must be a time unit other than "hour"');
      const s2 = (function(e3) {
        return Ho(e3, "timeZoneName", ["auto", "never", "critical"], "auto");
      })(t2), { precision: c2, unit: d2, increment: h2 } = At(a2, r2);
      return ir(this, c2, n2, s2, o2, { unit: d2, increment: h2, roundingMode: i2 });
    }
    toLocaleString(e2 = void 0, t2 = void 0) {
      vt(this, wt);
      const n2 = Zo(t2), r2 = /* @__PURE__ */ Object.create(null);
      if ((function(e3, t3, n3, r3) {
        if (null == t3) return;
        const o3 = Reflect.ownKeys(t3);
        for (let i3 = 0; i3 < o3.length; i3++) {
          const a3 = o3[i3];
          if (!n3.some(((e4) => Object.is(e4, a3))) && Object.prototype.propertyIsEnumerable.call(t3, a3)) {
            const n4 = t3[a3];
            r3, e3[a3] = n4;
          }
        }
      })(r2, n2, ["timeZone"]), void 0 !== n2.timeZone) throw new TypeError("ZonedDateTime toLocaleString does not accept a timeZone option");
      if (void 0 === r2.year && void 0 === r2.month && void 0 === r2.day && void 0 === r2.era && void 0 === r2.weekday && void 0 === r2.dateStyle && void 0 === r2.hour && void 0 === r2.minute && void 0 === r2.second && void 0 === r2.fractionalSecondDigits && void 0 === r2.timeStyle && void 0 === r2.dayPeriod && void 0 === r2.timeZoneName && (r2.timeZoneName = "short"), r2.timeZone = re(this, $), ar(r2.timeZone)) throw new RangeError("toLocaleString does not currently support offset time zones");
      const o2 = new di(e2, r2), i2 = Fi.call(o2).calendar, a2 = re(this, E);
      if ("iso8601" !== a2 && "iso8601" !== i2 && !xn(i2, a2)) throw new RangeError(`cannot format ZonedDateTime with calendar ${a2} in locale with calendar ${i2}`);
      return o2.format(Cn(re(this, b)));
    }
    toJSON() {
      return vt(this, wt), ir(this, "auto");
    }
    valueOf() {
      qo("ZonedDateTime");
    }
    startOfDay() {
      vt(this, wt);
      const e2 = re(this, $);
      return $n(_n(e2, Hi(this).isoDate), e2, re(this, E));
    }
    getTimeZoneTransition(e2) {
      vt(this, wt);
      const t2 = re(this, $);
      if (void 0 === e2) throw new TypeError("options parameter is required");
      const n2 = Ho("string" == typeof e2 ? Fo("direction", e2) : Zo(e2), "direction", ["next", "previous"], qt);
      if (void 0 === n2) throw new TypeError("direction option is required");
      if (ar(t2) || "UTC" === t2) return null;
      const r2 = re(this, b), o2 = "next" === n2 ? wr(t2, r2) : vr(t2, r2);
      return null === o2 ? null : $n(o2, t2, re(this, E));
    }
    toInstant() {
      return vt(this, wt), Cn(re(this, b));
    }
    toPlainDate() {
      return vt(this, wt), pn(Hi(this).isoDate, re(this, E));
    }
    toPlainTime() {
      return vt(this, wt), Tn(Hi(this).time);
    }
    toPlainDateTime() {
      return vt(this, wt), wn(Hi(this), re(this, E));
    }
    static from(e2, t2 = void 0) {
      return fn(e2, t2);
    }
    static compare(t2, n2) {
      const r2 = fn(t2), o2 = fn(n2), i2 = re(r2, b), a2 = re(o2, b);
      return import_jsbi.default.lessThan(import_jsbi.default.BigInt(i2), import_jsbi.default.BigInt(a2)) ? -1 : import_jsbi.default.greaterThan(import_jsbi.default.BigInt(i2), import_jsbi.default.BigInt(a2)) ? 1 : 0;
    }
  };
  function Hi(e2) {
    return zn(re(e2, $), re(e2, b));
  }
  function zi(e2, t2) {
    vt(e2, wt);
    const n2 = Hi(e2).isoDate;
    return Qt(e2).isoToDate(n2, { [t2]: true })[t2];
  }
  function Ai(e2, t2) {
    return vt(e2, wt), Hi(e2).time[t2];
  }
  ae(ZonedDateTime, "Temporal.ZonedDateTime");
  var qi = Object.freeze({ __proto__: null, Duration, Instant, Now: Bi, PlainDate, PlainDateTime, PlainMonthDay, PlainTime, PlainYearMonth, ZonedDateTime });
  var Wi = class LegacyDateImpl {
    toTemporalInstant() {
      return Cn(xo(Date.prototype.valueOf.call(this)));
    }
  }.prototype.toTemporalInstant;
  var _i = [Instant, PlainDate, PlainDateTime, Duration, PlainMonthDay, PlainTime, PlainYearMonth, ZonedDateTime];
  for (const e2 of _i) {
    const t2 = Object.getOwnPropertyDescriptor(e2, "prototype");
    (t2.configurable || t2.enumerable || t2.writable) && (t2.configurable = false, t2.enumerable = false, t2.writable = false, Object.defineProperty(e2, "prototype", t2));
  }

  // src/analytics/time.ts
  function dayInterval(date, timeZone) {
    const start = qi.PlainDate.from(date).toZonedDateTime({ timeZone, plainTime: "00:00" });
    const end = start.add({ days: 1 });
    return { startMs: start.epochMilliseconds, endMs: end.epochMilliseconds };
  }
  function localParts(timestamp, timeZone) {
    const zoned = qi.Instant.from(timestamp).toZonedDateTimeISO(timeZone);
    return {
      date: zoned.toPlainDate().toString(),
      year: zoned.year,
      month: zoned.month,
      dayOfWeek: zoned.dayOfWeek,
      hour: zoned.hour
    };
  }
  function monthKey(timestamp, timeZone) {
    const parts = localParts(timestamp, timeZone);
    return `${parts.year}-${String(parts.month).padStart(2, "0")}`;
  }

  // src/analytics/place-profiles.ts
  function counts(values) {
    const result = /* @__PURE__ */ new Map();
    values.forEach((value) => result.set(value, (result.get(value) ?? 0) + 1));
    return [...result].map(([value, count]) => ({ value, count })).sort((a2, b2) => b2.count - a2.count || a2.value.localeCompare(b2.value));
  }
  function histogram(size, values) {
    const result = Array.from({ length: size }, () => 0);
    values.forEach((value) => {
      if (value >= 0 && value < size) result[value] = (result[value] ?? 0) + 1;
    });
    return result;
  }
  function periodMetrics(visits, timeZone, granularity) {
    const grouped = /* @__PURE__ */ new Map();
    visits.forEach((visit) => {
      if (!visit.interval.start) return;
      const key = granularity === "month" ? monthKey(visit.interval.start, timeZone) : String(localParts(visit.interval.start, timeZone).year);
      const duration = durationMilliseconds(visit.interval.start, visit.interval.end);
      const values = grouped.get(key) ?? [];
      if (duration !== null) values.push(duration);
      grouped.set(key, values);
    });
    const rows = [...grouped.entries()].sort(([a2], [b2]) => a2.localeCompare(b2)).map(([period, durations]) => ({
      period,
      visits: visits.filter((visit) => visit.interval.start && (granularity === "month" ? monthKey(visit.interval.start, timeZone) : String(localParts(visit.interval.start, timeZone).year)) === period).length,
      totalDurationMs: durations.reduce((sum, value) => sum + value, 0),
      medianDurationMs: summarizeDistribution(durations).median,
      yearOnYearPercent: null,
      movingAverageVisits: null
    }));
    rows.forEach((row, index) => {
      const previous = granularity === "year" ? rows[index - 1] : rows.find((candidate) => candidate.period === `${Number(row.period.slice(0, 4)) - 1}${row.period.slice(4)}`);
      row.yearOnYearPercent = previous && previous.visits > 0 ? (row.visits - previous.visits) / previous.visits * 100 : null;
    });
    const averages = movingAverage(rows.map((row) => row.visits), granularity === "month" ? 3 : 2);
    rows.forEach((row, index) => {
      row.movingAverageVisits = averages[index] ?? null;
    });
    return rows;
  }
  function surroundingContext(target, allVisits, journeys) {
    const visits = [...allVisits].filter((visit) => visit.interval.start).sort((a2, b2) => a2.interval.start.localeCompare(b2.interval.start));
    const targetIds = new Set(target.map((visit) => visit.id));
    const previous = [];
    const next = [];
    const arrivalModes = [];
    const departureModes = [];
    const sortedJourneys = [...journeys].filter((journey) => journey.interval.start).sort((a2, b2) => a2.interval.start.localeCompare(b2.interval.start));
    visits.forEach((visit, index) => {
      if (!targetIds.has(visit.id)) return;
      const prior = visits[index - 1];
      const following = visits[index + 1];
      if (prior) previous.push(prior.placeId);
      if (following) next.push(following.placeId);
      const arrival = sortedJourneys.filter((journey) => journey.interval.end && visit.interval.start && journey.interval.end <= visit.interval.start).at(-1);
      const departure = sortedJourneys.find((journey) => journey.interval.start && visit.interval.end && journey.interval.start >= visit.interval.end);
      if (arrival) arrivalModes.push(arrival.travelMode);
      if (departure) departureModes.push(departure.travelMode);
    });
    return {
      previous: counts(previous).map(({ value, count }) => ({ placeId: value, count })),
      next: counts(next).map(({ value, count }) => ({ placeId: value, count })),
      arrivals: counts(arrivalModes).map(({ value, count }) => ({ mode: value, count })),
      departures: counts(departureModes).map(({ value, count }) => ({ mode: value, count }))
    };
  }
  function coordinateClusterCount(visits, radiusMeters = 30) {
    const centres = [];
    visits.forEach((visit) => {
      if (!visit.coordinates) return;
      if (!centres.some((centre) => haversineMeters(centre, visit.coordinates) <= radiusMeters)) centres.push(visit.coordinates);
    });
    return centres.length;
  }
  function journeySequences(targetIds, allVisits) {
    const sorted = [...allVisits].filter((visit) => visit.interval.start).sort((a2, b2) => a2.interval.start.localeCompare(b2.interval.start));
    const counts2 = /* @__PURE__ */ new Map();
    sorted.forEach((visit, index) => {
      if (!targetIds.has(visit.id)) return;
      const placeIds = sorted.slice(Math.max(0, index - 2), Math.min(sorted.length, index + 3)).map((item) => item.placeId);
      const key = placeIds.join("");
      const current = counts2.get(key);
      counts2.set(key, current ? { ...current, count: current.count + 1 } : { placeIds, count: 1 });
    });
    return [...counts2.values()].sort((a2, b2) => b2.count - a2.count).slice(0, 5);
  }
  function buildPlaceProfile(place, allVisits, journeys, timeZone, now = Date.now(), allPlaces = []) {
    const visits = allVisits.filter((visit) => visit.placeId === place.id).sort((a2, b2) => (a2.interval.start ?? "").localeCompare(b2.interval.start ?? ""));
    const complete = visits.filter((visit) => visit.interval.start && visit.interval.end);
    const durations = complete.flatMap((visit) => {
      const value = durationMilliseconds(visit.interval.start, visit.interval.end);
      return value === null ? [] : [value];
    });
    const starts = visits.flatMap((visit) => visit.interval.start ? [visit.interval.start] : []);
    const ends = visits.flatMap((visit) => visit.interval.end ? [visit.interval.end] : []);
    const uniqueDays = new Set(starts.map((value) => localParts(value, timeZone).date));
    const firstMs = starts.length ? Date.parse(starts[0]) : null;
    const lastMs = ends.length ? Math.max(...ends.map(Date.parse)) : starts.length ? Date.parse(starts.at(-1)) : null;
    const gaps = visits.slice(1).flatMap((visit, index) => {
      const previousEnd = visits[index]?.interval.end;
      return previousEnd && visit.interval.start ? [Math.max(0, Date.parse(visit.interval.start) - Date.parse(previousEnd))] : [];
    });
    const spanMs = firstMs === null ? 0 : Math.max(1, (lastMs ?? now) - firstMs);
    const spanDays = spanMs / 864e5;
    const byYear = periodMetrics(visits, timeZone, "year");
    const recent = byYear.slice(-3).map((row) => row.visits);
    const trend = recent.length < 2 ? "insufficient-data" : recent.at(-1) > recent[0] * 1.1 ? "increasing" : recent.at(-1) < recent[0] * 0.9 ? "decreasing" : "stable";
    const context = surroundingContext(visits, [...allVisits], [...journeys]);
    const arrivals = journeys.filter((journey) => journey.endPlaceId === place.id || visits.some((visit) => visit.interval.start && journey.interval.end && journey.interval.end <= visit.interval.start && Date.parse(visit.interval.start) - Date.parse(journey.interval.end) <= 30 * 6e4));
    const departures = journeys.filter((journey) => journey.startPlaceId === place.id);
    const arrivalDistances = arrivals.flatMap((journey) => journey.distanceMeters === null ? [] : [journey.distanceMeters]);
    const originCounts = counts(arrivals.flatMap((journey) => journey.startPlaceId ? [journey.startPlaceId] : [])).map(({ value, count }) => ({ placeId: value, count }));
    const destinationCounts = counts(departures.flatMap((journey) => journey.endPlaceId ? [journey.endPlaceId] : [])).map(({ value, count }) => ({ placeId: value, count }));
    const coordinates = visits.flatMap((visit) => visit.coordinates ? [visit.coordinates] : []);
    const spread = estimatedRadiusMeters(coordinates);
    let overlappingVisits = 0;
    for (let index = 1; index < complete.length; index += 1) {
      if (Date.parse(complete[index]?.interval.start) < Date.parse(complete[index - 1]?.interval.end)) overlappingVisits += 1;
    }
    return {
      place,
      visitCount: visits.length,
      uniqueVisitDays: uniqueDays.size,
      firstVisitAt: starts[0] ?? null,
      mostRecentVisitAt: ends.sort().at(-1) ?? starts.at(-1) ?? null,
      totalDurationMs: durations.reduce((sum, value) => sum + value, 0),
      duration: summarizeDistribution(durations),
      frequency: {
        perWeek: spanDays ? visits.length / (spanDays / 7) : visits.length,
        perMonth: spanDays ? visits.length / (spanDays / 30.4375) : visits.length,
        perYear: spanDays ? visits.length / (spanDays / 365.25) : visits.length
      },
      longestIntervalBetweenVisitsMs: gaps.length ? Math.max(...gaps) : null,
      currentIntervalMs: lastMs === null ? null : Math.max(0, now - lastMs),
      arrivalHours: histogram(24, starts.map((value) => localParts(value, timeZone).hour)),
      departureHours: histogram(24, ends.map((value) => localParts(value, timeZone).hour)),
      daysOfWeek: histogram(7, starts.map((value) => localParts(value, timeZone).dayOfWeek - 1)),
      monthsOfYear: histogram(12, starts.map((value) => localParts(value, timeZone).month - 1)),
      calendarYears: Object.fromEntries(counts(starts.map((value) => String(localParts(value, timeZone).year))).map(({ value, count }) => [value, count])),
      byMonth: periodMetrics(visits, timeZone, "month"),
      byYear,
      trend,
      commonPreviousPlaces: context.previous,
      commonNextPlaces: context.next,
      commonArrivalModes: context.arrivals,
      commonDepartureModes: context.departures,
      meanDistanceToReachMeters: summarizeDistribution(arrivalDistances).mean,
      medianDistanceToReachMeters: summarizeDistribution(arrivalDistances).median,
      commonOrigins: originCounts,
      commonDestinations: destinationCounts,
      commonJourneySequences: journeySequences(new Set(visits.map((visit) => visit.id)), allVisits),
      coordinateSpreadMeters: spread,
      coordinateClusterCount: coordinateClusterCount(visits),
      possibleDuplicatePlaceIds: place.coordinates ? allPlaces.filter((candidate) => candidate.id !== place.id && candidate.coordinates && haversineMeters(place.coordinates, candidate.coordinates) <= Math.max(30, spread ?? 30)).map((candidate) => candidate.id) : [],
      estimatedGeofenceRadiusMeters: place.boundary?.kind === "circle" ? place.boundary.radiusMeters : spread,
      lowConfidenceVisits: visits.filter((visit) => visit.confidence && visit.confidence.score < 60).length,
      overlappingVisits,
      uncertainTimes: visits.filter((visit) => visit.interval.startUncertain || visit.interval.endUncertain).length
    };
  }

  // src/analytics/selected-day.ts
  function clipped(start, end, day) {
    if (!start || !end) return null;
    const event = { startMs: Date.parse(start), endMs: Date.parse(end) };
    const duration = overlappingMilliseconds(event, day);
    return duration > 0 ? { startMs: Math.max(event.startMs, day.startMs), endMs: Math.min(event.endMs, day.endMs) } : null;
  }
  function isHome(place) {
    return Boolean(place && (place.semanticType?.toUpperCase() === "HOME" || place.name.trim().toLowerCase() === "home"));
  }
  function largestGap(intervals, day) {
    const merged = mergeIntervals(intervals);
    if (merged.length === 0) return day.endMs - day.startMs;
    const gaps = [merged[0].startMs - day.startMs, day.endMs - merged.at(-1).endMs];
    for (let index = 1; index < merged.length; index += 1) gaps.push(merged[index].startMs - merged[index - 1].endMs);
    return Math.max(...gaps);
  }
  function buildSelectedDaySummary(date, timeZone, places, visits, journeys) {
    const day = dayInterval(date, timeZone);
    const placeById = new Map(places.map((place) => [place.id, place]));
    const dayVisits = visits.flatMap((visit) => {
      const interval3 = clipped(visit.interval.start, visit.interval.end, day);
      return interval3 ? [{ visit, interval: interval3 }] : [];
    });
    const dayJourneys = journeys.flatMap((journey) => {
      const interval3 = clipped(journey.interval.start, journey.interval.end, day);
      return interval3 ? [{ journey, interval: interval3 }] : [];
    });
    const home = dayVisits.filter(({ visit }) => isHome(placeById.get(visit.placeId))).map(({ interval: interval3 }) => interval3);
    const outside = [
      ...dayVisits.filter(({ visit }) => !isHome(placeById.get(visit.placeId))).map(({ interval: interval3 }) => interval3),
      ...dayJourneys.map(({ interval: interval3 }) => interval3)
    ];
    const coverage = [...dayVisits.map(({ interval: interval3 }) => interval3), ...dayJourneys.map(({ interval: interval3 }) => interval3)];
    const visitedPlaceIds = new Set(dayVisits.map(({ visit }) => visit.placeId));
    const firstVisitByPlace = /* @__PURE__ */ new Map();
    visits.forEach((visit) => {
      if (!visit.interval.start) return;
      const existing = firstVisitByPlace.get(visit.placeId);
      if (!existing || visit.interval.start < existing) firstVisitByPlace.set(visit.placeId, visit.interval.start);
    });
    const newPlaces = [...visitedPlaceIds].filter((placeId) => {
      const first = firstVisitByPlace.get(placeId);
      return first ? localParts(first, timeZone).date === date : false;
    }).length;
    const walking2 = dayJourneys.filter(({ journey }) => /WALK/i.test(journey.travelMode));
    const publicTransport2 = dayJourneys.filter(({ journey }) => /(BUS|TRAIN|RAIL|TRAM|SUBWAY|TRANSIT|FERRY)/i.test(journey.travelMode));
    const dayLengthMs = day.endMs - day.startMs;
    return {
      date,
      timeZone,
      dayLengthMs,
      timeAtHomeMs: coveredMilliseconds(home),
      timeOutsideHomeMs: coveredMilliseconds(outside),
      totalDistanceMeters: dayJourneys.reduce((sum, { journey }) => sum + (journey.distanceMeters ?? 0), 0),
      placesVisited: visitedPlaceIds.size,
      journeys: dayJourneys.length,
      walkingDistanceMeters: walking2.reduce((sum, { journey }) => sum + (journey.distanceMeters ?? 0), 0),
      walkingDurationMs: coveredMilliseconds(walking2.map(({ interval: interval3 }) => interval3)),
      publicTransportDurationMs: coveredMilliseconds(publicTransport2.map(({ interval: interval3 }) => interval3)),
      stationaryDurationMs: coveredMilliseconds(dayVisits.map(({ interval: interval3 }) => interval3)),
      newPlaces,
      repeatPlaces: visitedPlaceIds.size - newPlaces,
      longestVisitMs: Math.max(0, ...dayVisits.map(({ interval: interval3 }) => interval3.endMs - interval3.startMs)),
      longestJourneyMs: Math.max(0, ...dayJourneys.map(({ interval: interval3 }) => interval3.endMs - interval3.startMs)),
      trackingCoveragePercent: coveredMilliseconds(coverage) / dayLengthMs * 100,
      largestTrackingGapMs: largestGap(coverage, day)
    };
  }

  // src/analytics/confidence.ts
  function finalize(components) {
    return {
      score: Math.max(0, Math.min(100, Math.round(100 + components.reduce((sum, component) => sum + component.impact, 0)))),
      components
    };
  }
  function scoreVisit(visit) {
    const components = [];
    if (!visit.coordinates) components.push({ code: "missing-coordinates", impact: -35, explanation: "The visit has no valid coordinates." });
    if (visit.interval.startUncertain || !visit.interval.start) components.push({ code: "uncertain-arrival", impact: -20, explanation: "The arrival time is missing or uncertain." });
    if (visit.interval.endUncertain || !visit.interval.end) components.push({ code: "uncertain-departure", impact: -20, explanation: "The departure time is missing or uncertain." });
    const duration = durationMilliseconds(visit.interval.start, visit.interval.end);
    if (duration !== null && duration < 2 * 6e4) components.push({ code: "very-short-visit", impact: -8, explanation: "The visit is shorter than two minutes." });
    const probability = visit.source.providerProbability;
    if (probability !== void 0 && probability < 0.5) components.push({ code: "low-provider-probability", impact: -25, explanation: "Google assigned a low probability to the detected visit." });
    else if (probability !== void 0 && probability >= 0.8) components.push({ code: "high-provider-probability", impact: 3, explanation: "Google assigned a high probability to the detected visit." });
    return finalize(components);
  }
  function scoreJourney(journey) {
    const components = [];
    if (!journey.interval.start || journey.interval.startUncertain) components.push({ code: "uncertain-start", impact: -20, explanation: "The journey start is missing or uncertain." });
    if (!journey.interval.end || journey.interval.endUncertain) components.push({ code: "uncertain-end", impact: -20, explanation: "The journey end is missing or uncertain." });
    if (!journey.distanceMeters || journey.distanceMeters <= 0) components.push({ code: "missing-distance", impact: -12, explanation: "No usable recorded distance is available." });
    if (journey.path.length < 2) components.push({ code: "sparse-route", impact: -18, explanation: "The recorded route has fewer than two points." });
    if (journey.travelMode === "UNKNOWN") components.push({ code: "unknown-mode", impact: -15, explanation: "The travel mode is unknown." });
    const duration = durationMilliseconds(journey.interval.start, journey.interval.end);
    if (duration && journey.distanceMeters) {
      const speedKph = journey.distanceMeters / duration * 3600;
      if (speedKph > 350) components.push({ code: "implausible-speed", impact: -45, explanation: `The implied average speed is ${Math.round(speedKph)} km/h.` });
    }
    return finalize(components);
  }

  // src/analytics/data-quality.ts
  function eventInterval(start, end, day) {
    if (!start || !end) return null;
    const interval3 = { startMs: Math.max(day.startMs, Date.parse(start)), endMs: Math.min(day.endMs, Date.parse(end)) };
    return interval3.endMs > interval3.startMs ? interval3 : null;
  }
  function gapsForDay(intervals, day) {
    const merged = mergeIntervals(intervals);
    if (merged.length === 0) return [day.endMs - day.startMs];
    const gaps = [merged[0].startMs - day.startMs, day.endMs - merged.at(-1).endMs];
    for (let index = 1; index < merged.length; index += 1) gaps.push(merged[index].startMs - merged[index - 1].endMs);
    return gaps.filter((gap) => gap > 0);
  }
  function eventCoordinates(event, edge) {
    if ("placeId" in event) return event.coordinates;
    const point = edge === "start" ? event.path[0] : event.path.at(-1);
    return point?.coordinates ?? null;
  }
  function buildDataQualityDashboard(places, visits, journeys, timeZone, now = Date.now()) {
    const summary = buildDataQualitySummary(places, visits, journeys);
    const timestamps = [...visits, ...journeys].flatMap((event) => [event.interval.start, event.interval.end]).filter((value) => value !== null).sort();
    if (timestamps.length === 0) {
      return { summary, selectedRangeCoveragePercent: 0, dailyCoverage: [], gaps: summarizeDistribution([]), gapDurationsMs: [], issues: [], duplicatePlaceCandidates: [], ageOfImportedDataMs: null, trackingQualityBySource: [], unknownPlacesByYear: [] };
    }
    const firstDate = qi.PlainDate.from(localParts(timestamps[0], timeZone).date);
    const lastDate = qi.PlainDate.from(localParts(timestamps.at(-1), timeZone).date);
    const dailyCoverage = [];
    const allGaps = [];
    for (let cursor = firstDate; qi.PlainDate.compare(cursor, lastDate) <= 0; cursor = cursor.add({ days: 1 })) {
      const date = cursor.toString();
      const day = dayInterval(date, timeZone);
      const intervals = [...visits, ...journeys].flatMap((event) => {
        const value = eventInterval(event.interval.start, event.interval.end, day);
        return value ? [value] : [];
      });
      const gaps = gapsForDay(intervals, day);
      allGaps.push(...gaps);
      const coveredMs = coveredMilliseconds(intervals);
      const coveragePercent = coveredMs / (day.endMs - day.startMs) * 100;
      const issueCount = [...visits, ...journeys].filter((event) => event.interval.start && localParts(event.interval.start, timeZone).date === date && (event.interval.startUncertain || event.interval.endUncertain)).length;
      dailyCoverage.push({
        date,
        coveredMs,
        dayLengthMs: day.endMs - day.startMs,
        coveragePercent,
        gapCount: gaps.length,
        longestGapMs: Math.max(0, ...gaps),
        confidence: Math.max(0, Math.round(coveragePercent - issueCount * 8)),
        issueCount
      });
    }
    const issues = [];
    journeys.forEach((journey) => {
      const duration = durationMilliseconds(journey.interval.start, journey.interval.end);
      if (duration && journey.distanceMeters) {
        const speedKph = journey.distanceMeters / duration * 3600;
        if (speedKph > 350) issues.push({ code: "impossible-speed", severity: "high", at: journey.interval.start, entityId: journey.id, description: `Journey implies ${Math.round(speedKph)} km/h.`, evidence: { speedKph: Math.round(speedKph), distanceMeters: journey.distanceMeters } });
        if (journey.distanceMeters > 2e6) issues.push({ code: "implausible-distance", severity: "medium", at: journey.interval.start, entityId: journey.id, description: "Journey exceeds 2,000 km and should be reviewed.", evidence: { distanceMeters: journey.distanceMeters } });
      }
    });
    const ordered = [...visits, ...journeys].filter((event) => event.interval.start && event.interval.end).sort((a2, b2) => a2.interval.start.localeCompare(b2.interval.start));
    for (let index = 1; index < ordered.length; index += 1) {
      const prior = ordered[index - 1];
      const current = ordered[index];
      const from = eventCoordinates(prior, "end");
      const to2 = eventCoordinates(current, "start");
      const elapsed = Date.parse(current.interval.start) - Date.parse(prior.interval.end);
      if (!from || !to2 || elapsed <= 0) continue;
      const distance = haversineMeters(from, to2);
      const speedKph = distance / elapsed * 3600;
      if (speedKph > 1e3) issues.push({ code: "teleportation", severity: "high", at: current.interval.start, entityId: current.id, description: `Successive records imply ${Math.round(speedKph)} km/h.`, evidence: { speedKph: Math.round(speedKph), distanceMeters: Math.round(distance), elapsedMs: elapsed } });
    }
    visits.filter((visit) => !visit.interval.start || !visit.interval.end).forEach((visit) => issues.push({ code: "unclosed-visit", severity: "medium", at: visit.interval.start, entityId: visit.id, description: "Visit has a missing start or end time.", evidence: {} }));
    const duplicatePlaceCandidates = [];
    for (let left = 0; left < places.length; left += 1) {
      for (let right = left + 1; right < places.length; right += 1) {
        const leftPlace = places[left];
        const rightPlace = places[right];
        if (!leftPlace.coordinates || !rightPlace.coordinates || leftPlace.id === rightPlace.id) continue;
        const distanceMeters = haversineMeters(leftPlace.coordinates, rightPlace.coordinates);
        if (distanceMeters <= 75) duplicatePlaceCandidates.push({ leftPlaceId: leftPlace.id, rightPlaceId: rightPlace.id, distanceMeters });
      }
    }
    const sourceScores = /* @__PURE__ */ new Map();
    visits.forEach((visit) => sourceScores.set(visit.source.sourceName, [...sourceScores.get(visit.source.sourceName) ?? [], scoreVisit(visit).score]));
    journeys.forEach((journey) => sourceScores.set(journey.source.sourceName, [...sourceScores.get(journey.source.sourceName) ?? [], scoreJourney(journey).score]));
    const totalCovered = dailyCoverage.reduce((sum, day) => sum + day.coveredMs, 0);
    const totalAvailable = dailyCoverage.reduce((sum, day) => sum + day.dayLengthMs, 0);
    const placeById = new Map(places.map((place) => [place.id, place]));
    const unknownByYear = /* @__PURE__ */ new Map();
    visits.filter((visit) => visit.interval.start && (!placeById.has(visit.placeId) || /^unknown/i.test(placeById.get(visit.placeId)?.name ?? ""))).forEach((visit) => {
      const year = localParts(visit.interval.start, timeZone).year;
      unknownByYear.set(year, (unknownByYear.get(year) ?? 0) + 1);
    });
    return {
      summary,
      selectedRangeCoveragePercent: totalAvailable ? totalCovered / totalAvailable * 100 : 0,
      dailyCoverage,
      gaps: summarizeDistribution(allGaps),
      gapDurationsMs: allGaps,
      issues: issues.sort((left, right) => (right.at ?? "").localeCompare(left.at ?? "")),
      duplicatePlaceCandidates: duplicatePlaceCandidates.sort((left, right) => left.distanceMeters - right.distanceMeters),
      ageOfImportedDataMs: Math.max(0, now - Date.parse(timestamps.at(-1))),
      trackingQualityBySource: [...sourceScores.entries()].map(([sourceName, scores]) => ({ sourceName, events: scores.length, meanConfidence: scores.reduce((sum, score) => sum + score, 0) / scores.length })),
      unknownPlacesByYear: [...unknownByYear.entries()].map(([year, count]) => ({ year, visits: count })).sort((a2, b2) => a2.year - b2.year)
    };
  }
  function buildDataQualitySummary(places, visits, journeys) {
    const placeById = new Map(places.map((place) => [place.id, place]));
    const sortedVisits = [...visits].filter((visit) => visit.interval.start).sort((a2, b2) => a2.interval.start.localeCompare(b2.interval.start));
    let overlaps = 0;
    for (let index = 1; index < sortedVisits.length; index += 1) {
      const priorEnd = sortedVisits[index - 1]?.interval.end;
      const start = sortedVisits[index]?.interval.start;
      if (priorEnd && start && start < priorEnd) overlaps += 1;
    }
    const recordKeys = [...visits, ...journeys].map((event) => `${event.source.sourceName}|${event.source.recordPath}`);
    const duplicateRecords = recordKeys.length - new Set(recordKeys).size;
    const impossibleSpeedEvents = journeys.filter((journey) => {
      const duration = durationMilliseconds(journey.interval.start, journey.interval.end);
      return Boolean(duration && journey.distanceMeters && journey.distanceMeters / duration * 3600 > 350);
    }).length;
    const ordered = [...visits, ...journeys].filter((event) => event.interval.start && event.interval.end).sort((a2, b2) => a2.interval.start.localeCompare(b2.interval.start));
    let teleportationEvents = 0;
    for (let index = 1; index < ordered.length; index += 1) {
      const prior = ordered[index - 1];
      const current = ordered[index];
      const from = eventCoordinates(prior, "end");
      const to2 = eventCoordinates(current, "start");
      const elapsed = Date.parse(current.interval.start) - Date.parse(prior.interval.end);
      if (from && to2 && elapsed > 0 && haversineMeters(from, to2) / elapsed * 3600 > 1e3) teleportationEvents += 1;
    }
    const timestamps = [...visits, ...journeys].flatMap((event) => [event.interval.start, event.interval.end]).filter((value) => value !== null).sort();
    return {
      visits: visits.length,
      journeys: journeys.length,
      invalidOrMissingCoordinates: visits.filter((visit) => !visit.coordinates).length,
      unclosedVisits: visits.filter((visit) => !visit.interval.start || !visit.interval.end).length,
      overlappingVisits: overlaps,
      unknownPlaces: visits.filter((visit) => !placeById.has(visit.placeId) || placeById.get(visit.placeId)?.name === "Unknown place").length,
      uncertainTravelModes: journeys.filter((journey) => journey.travelMode === "UNKNOWN").length,
      impossibleSpeedEvents,
      teleportationEvents,
      implausibleDistanceJourneys: journeys.filter((journey) => (journey.distanceMeters ?? 0) > 2e6).length,
      timezoneAnomalies: [...visits, ...journeys].filter((event) => event.interval.start && event.interval.end && (!Number.isFinite(Date.parse(event.interval.start)) || !Number.isFinite(Date.parse(event.interval.end)) || Date.parse(event.interval.end) < Date.parse(event.interval.start))).length,
      lowConfidenceVisits: visits.filter((visit) => scoreVisit(visit).score < 60).length,
      lowConfidenceJourneys: journeys.filter((journey) => scoreJourney(journey).score < 60).length,
      duplicateRecords,
      visitConfidence: summarizeDistribution(visits.map((visit) => scoreVisit(visit).score)),
      journeyConfidence: summarizeDistribution(journeys.map((journey) => scoreJourney(journey).score)),
      mostRecentImportedDataDate: timestamps.at(-1) ?? null
    };
  }

  // src/analytics/replay.ts
  function isHome2(place) {
    return Boolean(place && (place.semanticType?.toUpperCase() === "HOME" || place.name.trim().toLowerCase() === "home"));
  }
  function publicTransport(mode) {
    return /(BUS|TRAIN|RAIL|TRAM|SUBWAY|TRANSIT|FERRY)/i.test(mode);
  }
  function walking(mode) {
    return /WALK|ON_FOOT/i.test(mode);
  }
  function clippedInterval(start, end, lower, upper) {
    if (!start || !end) return null;
    const startMs = Math.max(Date.parse(start), lower);
    const endMs = Math.min(Date.parse(end), upper);
    return Number.isFinite(startMs) && Number.isFinite(endMs) && endMs > startMs ? { startMs, endMs } : null;
  }
  function routeBounds(journeys) {
    const points = journeys.flatMap((journey) => journey.path.map((point) => point.coordinates));
    if (points.length === 0) return null;
    return {
      minimum: {
        latitude: Math.min(...points.map((point) => point.latitude)),
        longitude: Math.min(...points.map((point) => point.longitude))
      },
      maximum: {
        latitude: Math.max(...points.map((point) => point.latitude)),
        longitude: Math.max(...points.map((point) => point.longitude))
      }
    };
  }
  function buildReplayPlan(date, timeZone, places, visits, journeys, longGapMs = 60 * 6e4) {
    const day = dayInterval(date, timeZone);
    const placeById = new Map(places.map((place) => [place.id, place]));
    const segments = [
      ...visits.flatMap((visit) => {
        const clipped2 = clippedInterval(visit.interval.start, visit.interval.end, day.startMs, day.endMs);
        return clipped2 ? [{ kind: "visit", ...clipped2, visit, place: placeById.get(visit.placeId) ?? null }] : [];
      }),
      ...journeys.flatMap((journey) => {
        const clipped2 = clippedInterval(journey.interval.start, journey.interval.end, day.startMs, day.endMs);
        return clipped2 ? [{ kind: "journey", ...clipped2, journey }] : [];
      })
    ].sort((left, right) => left.startMs - right.startMs || left.endMs - right.endMs);
    const pausePoints = [];
    segments.forEach((segment, index) => {
      if (segment.kind === "visit") {
        pausePoints.push({ atMs: segment.startMs, reason: "arrival", description: `Arrived at ${segment.place?.name ?? "a place"}` });
        pausePoints.push({ atMs: segment.endMs, reason: "departure", description: `Left ${segment.place?.name ?? "a place"}` });
      }
      const previous = segments[index - 1];
      if (previous && segment.startMs - previous.endMs >= longGapMs) {
        pausePoints.push({ atMs: previous.endMs, reason: "long-gap", description: `Tracking gap of ${Math.round((segment.startMs - previous.endMs) / 6e4)} minutes` });
      }
      if (previous?.kind === "journey" && segment.kind === "journey" && previous.journey.travelMode !== segment.journey.travelMode) {
        pausePoints.push({ atMs: segment.startMs, reason: "mode-change", description: `Travel mode changed to ${segment.journey.travelMode}` });
      }
    });
    pausePoints.sort((left, right) => left.atMs - right.atMs);
    return { date, timeZone, startMs: day.startMs, endMs: day.endMs, segments, pausePoints, routeBounds: routeBounds(journeys) };
  }
  function interpolate(left, right, progress) {
    return {
      latitude: left.latitude + (right.latitude - left.latitude) * progress,
      longitude: left.longitude + (right.longitude - left.longitude) * progress
    };
  }
  function coordinatesAt(segment, atMs) {
    if (segment.kind === "visit") return segment.visit.coordinates ?? segment.place?.coordinates ?? null;
    const path = segment.journey.path;
    if (path.length === 0) return null;
    if (path.length === 1) return path[0]?.coordinates ?? null;
    const progress = Math.max(0, Math.min(1, (atMs - segment.startMs) / (segment.endMs - segment.startMs)));
    const scaled = progress * (path.length - 1);
    const index = Math.min(path.length - 2, Math.floor(scaled));
    return interpolate(path[index].coordinates, path[index + 1].coordinates, scaled - index);
  }
  function replayStateAt(plan, atMs) {
    const boundedAt = Math.max(plan.startMs, Math.min(plan.endMs, atMs));
    const activeSegment = plan.segments.find((segment) => boundedAt >= segment.startMs && boundedAt < segment.endMs) ?? null;
    let cumulativeDistanceMeters = 0;
    let cumulativeOutsideHomeMs = 0;
    let cumulativeWalkingMs = 0;
    let cumulativePublicTransportMs = 0;
    let cumulativeStationaryMs = 0;
    plan.segments.forEach((segment) => {
      const elapsed = Math.max(0, Math.min(boundedAt, segment.endMs) - segment.startMs);
      if (elapsed <= 0) return;
      const segmentDuration = segment.endMs - segment.startMs;
      if (segment.kind === "visit") {
        cumulativeStationaryMs += elapsed;
        if (!isHome2(segment.place)) cumulativeOutsideHomeMs += elapsed;
      } else {
        cumulativeOutsideHomeMs += elapsed;
        cumulativeDistanceMeters += (segment.journey.distanceMeters ?? 0) * elapsed / segmentDuration;
        if (walking(segment.journey.travelMode)) cumulativeWalkingMs += elapsed;
        if (publicTransport(segment.journey.travelMode)) cumulativePublicTransportMs += elapsed;
      }
    });
    return {
      atMs: boundedAt,
      progress: (boundedAt - plan.startMs) / (plan.endMs - plan.startMs),
      activeSegment,
      coordinates: activeSegment ? coordinatesAt(activeSegment, boundedAt) : null,
      elapsedInSegmentMs: activeSegment ? boundedAt - activeSegment.startMs : 0,
      cumulativeDistanceMeters,
      cumulativeOutsideHomeMs,
      cumulativeWalkingMs,
      cumulativePublicTransportMs,
      cumulativeStationaryMs
    };
  }
  function nextPausePoint(plan, afterMs, enabledReasons) {
    return plan.pausePoints.find((point) => point.atMs > afterMs && enabledReasons.has(point.reason)) ?? null;
  }

  // src/analytics/place-discovery.ts
  var DEFAULT_PLACE_DISCOVERY_SETTINGS = {
    minimumDwellMs: 10 * 6e4,
    minimumDistinctVisitDays: 3,
    urbanRadiusMeters: 30,
    suburbanRadiusMeters: 50,
    ruralRadiusMeters: 75,
    minimumTotalDurationMs: 60 * 6e4,
    environment: "suburban"
  };
  function radius(settings) {
    return settings.environment === "urban" ? settings.urbanRadiusMeters : settings.environment === "rural" ? settings.ruralRadiusMeters : settings.suburbanRadiusMeters;
  }
  function wellDefined(place) {
    return Boolean(place && (place.googlePlaceId || place.category || place.boundary || place.name !== "Unknown place" && !place.id.startsWith("place_")));
  }
  function clusterVisits(candidates, radiusMeters) {
    const cellDegrees = radiusMeters / 111320;
    const buckets = /* @__PURE__ */ new Map();
    const parent = candidates.map((_2, index) => index);
    const find = (index) => parent[index] === index ? index : parent[index] = find(parent[index]);
    const unite = (left, right) => {
      const leftRoot = find(left);
      const rightRoot = find(right);
      if (leftRoot !== rightRoot) parent[rightRoot] = leftRoot;
    };
    candidates.forEach((candidate, index) => {
      const y2 = Math.floor(candidate.coordinates.latitude / cellDegrees);
      const x2 = Math.floor(candidate.coordinates.longitude / cellDegrees);
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          const nearby = buckets.get(`${y2 + dy}:${x2 + dx}`) ?? [];
          nearby.forEach((otherIndex) => {
            if (haversineMeters(candidate.coordinates, candidates[otherIndex].coordinates) <= radiusMeters) unite(index, otherIndex);
          });
        }
      }
      const key = `${y2}:${x2}`;
      buckets.set(key, [...buckets.get(key) ?? [], index]);
    });
    const clusters = /* @__PURE__ */ new Map();
    candidates.forEach((candidate, index) => {
      const root = find(index);
      clusters.set(root, [...clusters.get(root) ?? [], candidate]);
    });
    return [...clusters.values()];
  }
  function inferClassification(uniqueDays, medianDurationMs, totalDurationMs, radiusMeters, nearestDistance, transitModes) {
    if (nearestDistance !== null && nearestDistance <= Math.max(40, radiusMeters)) {
      return { classification: "likely-duplicate", reason: `The cluster overlaps a known place about ${Math.round(nearestDistance)} metres away.`, confidence: 88 };
    }
    if (nearestDistance !== null && nearestDistance <= radiusMeters * 2 && radiusMeters > 45) {
      return { classification: "gps-scatter", reason: "The coordinate spread looks like GPS scatter around a nearby saved place.", confidence: 74 };
    }
    if (transitModes >= Math.max(2, uniqueDays / 2) && (medianDurationMs ?? Infinity) <= 30 * 6e4) {
      return { classification: "public-transport-interchange", reason: "Repeated short stops coincide with public-transport journeys.", confidence: 76 };
    }
    if (uniqueDays >= 3 && totalDurationMs >= 60 * 6e4) {
      return { classification: "likely-meaningful-place", reason: `Repeated dwell was recorded on ${uniqueDays} separate days.`, confidence: Math.min(95, 60 + uniqueDays * 4) };
    }
    if (uniqueDays === 1) return { classification: "one-off-location", reason: "The location appears on only one day.", confidence: 55 };
    return { classification: "uncertain", reason: "The cluster repeats, but the available evidence is limited.", confidence: 45 };
  }
  function discoverPlaces(places, visits, journeys, timeZone, settings = DEFAULT_PLACE_DISCOVERY_SETTINGS) {
    const placeById = new Map(places.map((place) => [place.id, place]));
    const candidates = visits.flatMap((visit) => {
      const durationMs = durationMilliseconds(visit.interval.start, visit.interval.end);
      if (!visit.coordinates || durationMs === null || durationMs < settings.minimumDwellMs || wellDefined(placeById.get(visit.placeId))) return [];
      return [{ visit, coordinates: visit.coordinates, durationMs }];
    });
    const known = places.filter((place) => wellDefined(place) && place.coordinates);
    const clusteringRadius = radius(settings);
    return clusterVisits(candidates, clusteringRadius).flatMap((cluster) => {
      const starts = cluster.flatMap((candidate) => candidate.visit.interval.start ? [candidate.visit.interval.start] : []).sort();
      const uniqueDays = new Set(starts.map((start) => localParts(start, timeZone).date)).size;
      const totalDurationMs = cluster.reduce((sum, candidate) => sum + candidate.durationMs, 0);
      if (uniqueDays < settings.minimumDistinctVisitDays || totalDurationMs < settings.minimumTotalDurationMs || starts.length === 0) return [];
      const centre = coordinateCentroid(cluster.map((candidate) => candidate.coordinates));
      if (!centre) return [];
      const nearestKnownPlaces = known.map((place) => ({ placeId: place.id, distanceMeters: haversineMeters(centre, place.coordinates) })).sort((left, right) => left.distanceMeters - right.distanceMeters).slice(0, 3);
      const medianDurationMs = median(cluster.map((candidate) => candidate.durationMs));
      const transitModes = journeys.filter((journey) => /(BUS|TRAIN|RAIL|TRAM|SUBWAY|TRANSIT|FERRY)/i.test(journey.travelMode) && cluster.some((candidate) => {
        const start = candidate.visit.interval.start;
        return start && journey.interval.end && Math.abs(Date.parse(start) - Date.parse(journey.interval.end)) < 45 * 6e4;
      })).length;
      const inferred = inferClassification(uniqueDays, medianDurationMs, totalDurationMs, clusteringRadius, nearestKnownPlaces[0]?.distanceMeters ?? null, transitModes);
      const visitIds = cluster.map((candidate) => candidate.visit.id).sort();
      return [{
        id: entityId("suggested-place", visitIds),
        centre,
        radiusMeters: Math.max(clusteringRadius, estimatedRadiusMeters(cluster.map((candidate) => candidate.coordinates)) ?? 0),
        visitIds,
        visitCount: cluster.length,
        uniqueDays,
        totalDurationMs,
        medianDurationMs,
        firstVisitAt: starts[0],
        mostRecentVisitAt: starts.at(-1),
        nearestKnownPlaces,
        confidence: inferred.confidence,
        classification: inferred.classification,
        reason: inferred.reason
      }];
    }).sort((left, right) => right.confidence - left.confidence || right.totalDurationMs - left.totalDurationMs);
  }

  // src/model/corrections.ts
  function clonePlace(place) {
    return { ...place, coordinates: place.coordinates ? { ...place.coordinates } : null, tags: [...place.tags], sourceReferences: [...place.sourceReferences] };
  }
  function applyCorrections(sourcePlaces, sourceVisits, commands) {
    const undone = new Set(commands.filter((command) => command.type === "undo").map((command) => command.targetCommandId));
    const active = commands.filter((command) => command.type !== "undo" && !undone.has(command.id)).sort((left, right) => left.revision - right.revision || left.createdAt.localeCompare(right.createdAt));
    const places = new Map(sourcePlaces.map((place) => [place.id, clonePlace(place)]));
    const visits = new Map(sourceVisits.map((visit) => [visit.id, { ...visit }]));
    const aliases = {};
    const resolveAlias = (placeId) => {
      let resolved = placeId;
      const seen = /* @__PURE__ */ new Set();
      while (aliases[resolved] && !seen.has(resolved)) {
        seen.add(resolved);
        resolved = aliases[resolved];
      }
      return resolved;
    };
    active.forEach((command) => {
      if (command.type === "rename-place") {
        const place = places.get(resolveAlias(command.placeId));
        if (place) place.name = command.name;
      } else if (command.type === "categorise-place") {
        const place = places.get(resolveAlias(command.placeId));
        if (place) place.category = command.category;
      } else if (command.type === "move-place") {
        const place = places.get(resolveAlias(command.placeId));
        if (place) place.coordinates = { ...command.coordinates };
      } else if (command.type === "change-boundary") {
        const place = places.get(resolveAlias(command.placeId));
        if (place) place.boundary = command.boundary;
      } else if (command.type === "ignore-place") {
        const place = places.get(resolveAlias(command.placeId));
        if (place) place.ignored = command.ignored;
      } else if (command.type === "update-place-notes") {
        const place = places.get(resolveAlias(command.placeId));
        if (place) {
          place.notes = command.notes;
          place.tags = [...command.tags];
        }
      } else if (command.type === "reassign-visit") {
        const visit = visits.get(command.visitId);
        if (visit && places.has(resolveAlias(command.placeId))) visit.placeId = resolveAlias(command.placeId);
      } else if (command.type === "merge-places") {
        const targetId = resolveAlias(command.targetPlaceId);
        const target = places.get(targetId) ?? places.get(resolveAlias(command.sourcePlaceIds[0] ?? ""));
        if (!target) return;
        if (!places.has(targetId)) places.set(targetId, { ...clonePlace(target), id: targetId });
        const mergedTarget = places.get(targetId);
        mergedTarget.name = command.name;
        command.sourcePlaceIds.forEach((sourceId) => {
          const resolvedSource = resolveAlias(sourceId);
          if (resolvedSource === targetId) return;
          aliases[resolvedSource] = targetId;
          const source = places.get(resolvedSource);
          if (source) source.ignored = true;
          visits.forEach((visit) => {
            if (resolveAlias(visit.placeId) === targetId || visit.placeId === resolvedSource) visit.placeId = targetId;
          });
        });
      } else if (command.type === "split-place") {
        places.set(command.newPlace.id, clonePlace(command.newPlace));
        const selected = new Set(command.visitIds);
        visits.forEach((visit) => {
          if (selected.has(visit.id) && resolveAlias(visit.placeId) === resolveAlias(command.sourcePlaceId)) visit.placeId = command.newPlace.id;
        });
      }
    });
    visits.forEach((visit) => {
      visit.placeId = resolveAlias(visit.placeId);
    });
    return { places: [...places.values()], visits: [...visits.values()], aliases };
  }

  // src/persistence/database.ts
  var DATABASE_NAME = "PlacesTrackerAnalyticsDB";
  var DATABASE_VERSION = 2;
  function requestResult(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed."));
    });
  }
  function openPlacesDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains("corrections")) database.createObjectStore("corrections", { keyPath: "id" });
        if (!database.objectStoreNames.contains("annotations")) database.createObjectStore("annotations", { keyPath: "id" });
        if (!database.objectStoreNames.contains("annotation-rules")) database.createObjectStore("annotation-rules", { keyPath: "id" });
        if (!database.objectStoreNames.contains("suggestion-decisions")) database.createObjectStore("suggestion-decisions", { keyPath: "suggestionId" });
        if (!database.objectStoreNames.contains("analytics-cache")) database.createObjectStore("analytics-cache", { keyPath: "key" });
        if (!database.objectStoreNames.contains("settings")) database.createObjectStore("settings", { keyPath: "key" });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error("Unable to open the places database."));
    });
  }
  async function put(storeName, value) {
    const database = await openPlacesDatabase();
    try {
      const transaction = database.transaction(storeName, "readwrite");
      await requestResult(transaction.objectStore(storeName).put(value));
    } finally {
      database.close();
    }
  }
  async function getAll(storeName) {
    const database = await openPlacesDatabase();
    try {
      return await requestResult(database.transaction(storeName, "readonly").objectStore(storeName).getAll());
    } finally {
      database.close();
    }
  }
  async function get(storeName, key) {
    const database = await openPlacesDatabase();
    try {
      return await requestResult(database.transaction(storeName, "readonly").objectStore(storeName).get(key));
    } finally {
      database.close();
    }
  }
  async function remove(storeName, key) {
    const database = await openPlacesDatabase();
    try {
      const transaction = database.transaction(storeName, "readwrite");
      await requestResult(transaction.objectStore(storeName).delete(key));
    } finally {
      database.close();
    }
  }
  var placesPersistence = {
    putCorrection: (command) => put("corrections", command),
    getCorrections: () => getAll("corrections"),
    putAnnotation: (annotation) => put("annotations", annotation),
    getAnnotations: () => getAll("annotations"),
    putAnnotationRule: (rule) => put("annotation-rules", rule),
    deleteAnnotationRule: (id) => remove("annotation-rules", id),
    getAnnotationRules: () => getAll("annotation-rules"),
    putSuggestionDecision: (decision) => put("suggestion-decisions", decision),
    getSuggestionDecisions: () => getAll("suggestion-decisions"),
    putCache: (record2) => put("analytics-cache", record2),
    getCache: (key) => get("analytics-cache", key),
    getCacheRecords: () => getAll("analytics-cache")
  };

  // src/analytics/boundaries.ts
  function pointInsideBoundary(point, boundary) {
    if (boundary.kind === "circle") return haversineMeters(point, boundary.centre) <= boundary.radiusMeters;
    const vertices = boundary.vertices;
    if (vertices.length < 3) return false;
    let inside = false;
    for (let index = 0, previous = vertices.length - 1; index < vertices.length; previous = index, index += 1) {
      const currentPoint = vertices[index];
      const previousPoint = vertices[previous];
      const crosses = currentPoint.latitude > point.latitude !== previousPoint.latitude > point.latitude && point.longitude < (previousPoint.longitude - currentPoint.longitude) * (point.latitude - currentPoint.latitude) / (previousPoint.latitude - currentPoint.latitude) + currentPoint.longitude;
      if (crosses) inside = !inside;
    }
    return inside;
  }
  function previewBoundaryChange(visits, current, proposed) {
    const located = visits.filter((visit) => visit.coordinates !== null);
    const currentlyInsideVisitIds = current ? located.filter((visit) => pointInsideBoundary(visit.coordinates, current)).map((visit) => visit.id) : [];
    const proposedInsideVisitIds = located.filter((visit) => pointInsideBoundary(visit.coordinates, proposed)).map((visit) => visit.id);
    const currentSet = new Set(currentlyInsideVisitIds);
    const proposedSet = new Set(proposedInsideVisitIds);
    return {
      currentlyInsideVisitIds,
      proposedInsideVisitIds,
      enteringVisitIds: proposedInsideVisitIds.filter((id) => !currentSet.has(id)),
      leavingVisitIds: currentlyInsideVisitIds.filter((id) => !proposedSet.has(id))
    };
  }

  // src/analytics/journeys.ts
  function pathLegs(journey) {
    const legs = [];
    for (let index = 1; index < journey.path.length; index += 1) {
      const previous = journey.path[index - 1];
      const current = journey.path[index];
      if (!previous.at || !current.at) continue;
      const durationMs = Date.parse(current.at) - Date.parse(previous.at);
      if (durationMs <= 0) continue;
      const distanceMeters = haversineMeters(previous.coordinates, current.coordinates);
      legs.push({ startAt: previous.at, endAt: current.at, durationMs, distanceMeters, speedKph: distanceMeters / durationMs * 3600, start: previous.coordinates, end: current.coordinates });
    }
    return legs;
  }
  function calculatedDistance(journey) {
    if (journey.path.length < 2) return null;
    let total = 0;
    for (let index = 1; index < journey.path.length; index += 1) total += haversineMeters(journey.path[index - 1].coordinates, journey.path[index].coordinates);
    return total;
  }
  function routeCells(journey, precision = 1e-3) {
    return new Set(journey.path.map((point) => `${Math.round(point.coordinates.latitude / precision)}:${Math.round(point.coordinates.longitude / precision)}`));
  }
  function similarity(left, right) {
    if (left.size === 0 || right.size === 0) return 0;
    const intersection = [...left].filter((value) => right.has(value)).length;
    const union = (/* @__PURE__ */ new Set([...left, ...right])).size;
    return intersection / union * 100;
  }
  function buildJourneyAnalytics(journey) {
    const durationMs = durationMilliseconds(journey.interval.start, journey.interval.end);
    const legs = pathLegs(journey);
    const pauses = legs.filter((leg) => leg.speedKph < 1 && leg.durationMs >= 6e4).map((leg) => ({ startAt: leg.startAt, endAt: leg.endAt, durationMs: leg.durationMs, coordinates: leg.start }));
    const pauseDurationMs = pauses.reduce((sum, pause) => sum + pause.durationMs, 0);
    const distance = journey.distanceMeters ?? calculatedDistance(journey);
    const first = journey.path[0]?.coordinates;
    const last = journey.path.at(-1)?.coordinates;
    const straightLineDistanceMeters = first && last ? haversineMeters(first, last) : null;
    const plausibleSpeeds = legs.map((leg) => leg.speedKph).filter((speed) => speed <= 350);
    return {
      journeyId: journey.id,
      startPlaceId: journey.startPlaceId,
      endPlaceId: journey.endPlaceId,
      startAt: journey.interval.start,
      endAt: journey.interval.end,
      durationMs,
      movingDurationMs: durationMs === null ? null : Math.max(0, durationMs - pauseDurationMs),
      stationaryDurationMs: durationMs === null ? null : pauseDurationMs,
      recordedDistanceMeters: journey.distanceMeters,
      calculatedDistanceMeters: calculatedDistance(journey),
      straightLineDistanceMeters,
      averageSpeedKph: durationMs && distance ? distance / durationMs * 3600 : null,
      medianSpeedKph: median(legs.map((leg) => leg.speedKph)),
      maximumPlausibleSpeedKph: plausibleSpeeds.length ? Math.max(...plausibleSpeeds) : null,
      travelMode: journey.travelMode,
      travelModeConfidence: scoreJourney(journey).score,
      routeDirectness: distance && straightLineDistanceMeters !== null && distance > 0 ? straightLineDistanceMeters / distance : null,
      recordedMinusStraightMeters: distance !== null && straightLineDistanceMeters !== null ? distance - straightLineDistanceMeters : null,
      pauses,
      pauseDurationMs,
      dataQualityScore: scoreJourney(journey).score
    };
  }
  function buildWalkingAnalytics(journey, previousJourneys) {
    if (!/WALK|ON_FOOT/i.test(journey.travelMode)) return null;
    const metrics = buildJourneyAnalytics(journey);
    const distance = metrics.recordedDistanceMeters ?? metrics.calculatedDistanceMeters;
    const duration = metrics.movingDurationMs;
    const walkingLegs = pathLegs(journey).filter((leg) => leg.speedKph >= 1 && leg.speedKph <= 15);
    const currentCells = routeCells(journey);
    const comparable = previousJourneys.filter((other) => other.id !== journey.id && /WALK|ON_FOOT/i.test(other.travelMode)).map((other) => ({ journeyId: other.id, similarityPercent: similarity(currentCells, routeCells(other)) })).sort((left, right) => right.similarityPercent - left.similarityPercent);
    const previouslyTravelled = new Set(previousJourneys.filter((other) => other.id !== journey.id && /WALK|ON_FOOT/i.test(other.travelMode)).flatMap((other) => [...routeCells(other)]));
    const reused = [...currentCells].filter((cell) => previouslyTravelled.has(cell)).length;
    const previousPercent = currentCells.size ? reused / currentCells.size * 100 : null;
    const elevations = journey.path.flatMap((point) => point.coordinates.altitudeMeters === void 0 ? [] : [point.coordinates.altitudeMeters]);
    const elevationGain = journey.path.slice(1).reduce((sum, point, index) => {
      const previous = journey.path[index]?.coordinates.altitudeMeters;
      const current = point.coordinates.altitudeMeters;
      return previous === void 0 || current === void 0 ? sum : sum + Math.max(0, current - previous);
    }, 0);
    return {
      distanceMeters: distance,
      durationMs: duration,
      averagePaceMinutesPerKilometre: distance && duration ? duration / 6e4 / (distance / 1e3) : null,
      medianPaceMinutesPerKilometre: median(walkingLegs.map((leg) => 60 / leg.speedKph)),
      fastestSustainedPaceMinutesPerKilometre: percentile(walkingLegs.map((leg) => 60 / leg.speedKph), 0.1),
      longestPauseMs: Math.max(0, ...metrics.pauses.map((pause) => pause.durationMs)),
      pauseCount: metrics.pauses.length,
      routeNoveltyPercent: previousPercent === null ? null : 100 - previousPercent,
      percentagePreviouslyTravelled: previousPercent,
      mostSimilarWalks: comparable.slice(0, 3),
      startingElevationMeters: elevations[0] ?? null,
      endingElevationMeters: elevations.at(-1) ?? null,
      elevationGainMeters: elevations.length >= 2 ? elevationGain : null
    };
  }
  function buildPublicTransportAnalytics(journey, allJourneys, places) {
    if (!/(BUS|TRAIN|RAIL|TRAM|SUBWAY|TRANSIT|FERRY)/i.test(journey.travelMode)) return null;
    const durationMs = durationMilliseconds(journey.interval.start, journey.interval.end);
    const placeIds = new Set(places.map((place) => place.id));
    const confidence = scoreJourney(journey).score;
    const sameRouteCount = allJourneys.filter((other) => other.id !== journey.id && other.startPlaceId === journey.startPlaceId && other.endPlaceId === journey.endPlaceId && other.travelMode === journey.travelMode).length;
    const priorTransit = [...allJourneys].filter((other) => other.id !== journey.id && other.interval.end && journey.interval.start && other.interval.end <= journey.interval.start && /(BUS|TRAIN|RAIL|TRAM|SUBWAY|TRANSIT|FERRY)/i.test(other.travelMode)).sort((a2, b2) => b2.interval.end.localeCompare(a2.interval.end))[0];
    const transferTimeMs = priorTransit?.interval.end && journey.interval.start ? Date.parse(journey.interval.start) - Date.parse(priorTransit.interval.end) : null;
    const plausibleTransfer = transferTimeMs !== null && transferTimeMs >= 0 && transferTimeMs <= 60 * 6e4 && (priorTransit?.endPlaceId === journey.startPlaceId || !priorTransit?.endPlaceId || !journey.startPlaceId);
    return {
      likelyBoardingPlaceId: journey.startPlaceId && placeIds.has(journey.startPlaceId) ? journey.startPlaceId : null,
      likelyAlightingPlaceId: journey.endPlaceId && placeIds.has(journey.endPlaceId) ? journey.endPlaceId : null,
      waitingTimeMs: null,
      timeAboardMs: durationMs,
      transferCount: plausibleTransfer ? 1 : 0,
      transferTimeMs: plausibleTransfer ? transferTimeMs : null,
      likelyService: null,
      confidence: Math.min(confidence, journey.startPlaceId && journey.endPlaceId ? 85 : 60),
      explanation: sameRouteCount ? `This origin, destination and mode recur in ${sameRouteCount} other journeys; no exact service is claimed.` : "The mode is recorded, but there is not enough evidence to identify an exact service."
    };
  }

  // src/analytics/annotations.ts
  var VISIT_PURPOSES = ["Study", "Meal", "Coffee", "Shopping", "Exercise", "Walk", "Social", "Appointment", "Waiting", "Travel", "Errand", "Sightseeing", "Accommodation", "Other"];
  function matchesAnnotationRule(visit, rule) {
    if (!rule.enabled) return false;
    if (rule.placeId && visit.placeId !== rule.placeId) return false;
    const duration = durationMilliseconds(visit.interval.start, visit.interval.end);
    if (rule.minimumDurationMs !== null && (duration === null || duration < rule.minimumDurationMs)) return false;
    if (rule.maximumDurationMs !== null && (duration === null || duration > rule.maximumDurationMs)) return false;
    return true;
  }
  function emptyAnnotation(visitId) {
    return {
      id: entityId("annotation", visitId),
      visitId,
      purpose: null,
      activity: null,
      satisfaction: null,
      noise: null,
      crowding: null,
      airQuality: null,
      spending: null,
      foodAndDrink: [],
      people: [],
      note: "",
      tags: [],
      wouldReturn: null,
      planned: null,
      detectedPlaceCorrect: null
    };
  }
  function applyAnnotationRules(visits, rules) {
    return visits.flatMap((visit) => {
      const matching = rules.filter((rule) => matchesAnnotationRule(visit, rule));
      if (matching.length === 0) return [];
      const annotation = matching.reduce((current, rule) => ({ ...current, ...rule.set, id: current.id, visitId: current.visitId }), emptyAnnotation(visit.id));
      return [annotation];
    });
  }
  function mergeAnnotations(generated, manual) {
    const merged = new Map(generated.map((annotation) => [annotation.visitId, { ...annotation }]));
    manual.forEach((annotation) => merged.set(annotation.visitId, { ...merged.get(annotation.visitId) ?? emptyAnnotation(annotation.visitId), ...annotation }));
    return [...merged.values()];
  }
  function copyAnnotationToVisits(annotation, visitIds) {
    return visitIds.map((visitId) => ({ ...annotation, id: entityId("annotation", visitId), visitId, foodAndDrink: [...annotation.foodAndDrink], people: [...annotation.people], tags: [...annotation.tags] }));
  }

  // src/analytics/routines.ts
  function isHome3(place) {
    return Boolean(place && (place.semanticType?.toUpperCase() === "HOME" || place.name.trim().toLowerCase() === "home"));
  }
  function minuteOfDay(timestamp, timeZone) {
    const zoned = qi.Instant.from(timestamp).toZonedDateTimeISO(timeZone);
    return zoned.hour * 60 + zoned.minute + zoned.second / 60;
  }
  function band(values) {
    const finite = values.filter((value) => value !== null && Number.isFinite(value));
    const summary = summarizeDistribution(finite);
    return { count: finite.length, p10: summary.p10, p25: summary.p25, median: summary.median, p75: summary.p75, p90: summary.p90 };
  }
  function datesBetween(first, last) {
    const result = [];
    let date = qi.PlainDate.from(first);
    const end = qi.PlainDate.from(last);
    while (qi.PlainDate.compare(date, end) <= 0) {
      result.push(date.toString());
      date = date.add({ days: 1 });
    }
    return result;
  }
  function commonSequences(observations) {
    const counts2 = /* @__PURE__ */ new Map();
    observations.filter((row) => row.sequence.length > 0).forEach((row) => {
      const key = row.sequence.join("");
      const current = counts2.get(key);
      counts2.set(key, current ? { ...current, count: current.count + 1 } : { placeIds: row.sequence, count: 1 });
    });
    return [...counts2.values()].sort((left, right) => right.count - left.count || left.placeIds.join().localeCompare(right.placeIds.join())).slice(0, 5);
  }
  function summarizeRows(rows) {
    return {
      observations: rows.length,
      departureMinute: band(rows.map((row) => row.departureMinute)),
      returnMinute: band(rows.map((row) => row.returnMinute)),
      placesVisited: band(rows.map((row) => row.placesVisited)),
      timeOutsideHomeMs: band(rows.map((row) => row.timeOutsideHomeMs)),
      journeyDurationMs: band(rows.map((row) => row.journeyDurationMs)),
      commonSequences: commonSequences(rows)
    };
  }
  function buildRoutineAnalysis(timeZone, places, visits, journeys) {
    const eventTimes = [...visits.flatMap((visit) => [visit.interval.start, visit.interval.end]), ...journeys.flatMap((journey) => [journey.interval.start, journey.interval.end])].filter((value) => Boolean(value));
    if (eventTimes.length === 0) return { firstDate: null, lastDate: null, observations: [], weekdays: [], overall: summarizeRows([]) };
    const dates = eventTimes.map((timestamp) => localParts(timestamp, timeZone).date).sort();
    const placeById = new Map(places.map((place) => [place.id, place]));
    const observations = datesBetween(dates[0], dates.at(-1)).map((date) => {
      const dayVisits = visits.filter((visit) => visit.interval.start && localParts(visit.interval.start, timeZone).date === date).sort((left, right) => left.interval.start.localeCompare(right.interval.start));
      const dayJourneys = journeys.filter((journey) => journey.interval.start && localParts(journey.interval.start, timeZone).date === date);
      const firstOutside = dayVisits.find((visit) => !isHome3(placeById.get(visit.placeId)));
      let lastOutsideIndex = -1;
      for (let index = dayVisits.length - 1; index >= 0; index -= 1) {
        if (!isHome3(placeById.get(dayVisits[index].placeId))) {
          lastOutsideIndex = index;
          break;
        }
      }
      const returnHome = lastOutsideIndex < 0 ? void 0 : dayVisits.slice(lastOutsideIndex + 1).find((visit) => isHome3(placeById.get(visit.placeId)));
      const sequence = dayVisits.map((visit) => visit.placeId).filter((placeId, index, all) => index === 0 || all[index - 1] !== placeId);
      const summary = buildSelectedDaySummary(date, timeZone, places, dayVisits, dayJourneys);
      return {
        date,
        dayOfWeek: qi.PlainDate.from(date).dayOfWeek,
        departureMinute: firstOutside?.interval.start ? minuteOfDay(firstOutside.interval.start, timeZone) : null,
        returnMinute: returnHome?.interval.start ? minuteOfDay(returnHome.interval.start, timeZone) : null,
        placesVisited: new Set(dayVisits.map((visit) => visit.placeId)).size,
        timeOutsideHomeMs: summary.timeOutsideHomeMs,
        journeyDurationMs: dayJourneys.reduce((sum, journey) => sum + (journey.interval.start && journey.interval.end ? Math.max(0, Date.parse(journey.interval.end) - Date.parse(journey.interval.start)) : 0), 0),
        sequence,
        summary
      };
    });
    return {
      firstDate: dates[0],
      lastDate: dates.at(-1),
      observations,
      weekdays: Array.from({ length: 7 }, (_2, index) => ({ dayOfWeek: index + 1, ...summarizeRows(observations.filter((row) => row.dayOfWeek === index + 1)) })),
      overall: summarizeRows(observations)
    };
  }
  function routinePercentile(values, value) {
    if (values.length === 0) return 50;
    const below = values.filter((candidate) => candidate < value).length;
    const equal = values.filter((candidate) => candidate === value).length;
    return (below + equal * 0.5) / values.length * 100;
  }
  function routineThreshold(values, probability) {
    return percentile(values, probability);
  }

  // src/analytics/anomalies.ts
  function median2(values) {
    if (values.length === 0) return null;
    const sorted = [...values].sort((a2, b2) => a2 - b2);
    const centre = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[centre] : (sorted[centre - 1] + sorted[centre]) / 2;
  }
  function severity(rank) {
    const tail = Math.min(rank, 100 - rank);
    return tail <= 1 ? "extreme" : tail <= 5 ? "unusual" : "notable";
  }
  function finding(args) {
    return { ...args, severity: severity(args.percentileRank) };
  }
  function comparableRows(target, routine) {
    return routine.observations.filter((row) => row.date < target.date && row.dayOfWeek === target.dayOfWeek).slice(-52);
  }
  function detectDayAnomalies(date, routine) {
    const target = routine.observations.find((row) => row.date === date);
    if (!target) return [];
    const history = comparableRows(target, routine);
    if (history.length < 4) return [];
    const metrics = [
      { key: "departure", title: "Home departure time", value: target.departureMinute, values: history.flatMap((row) => row.departureMinute === null ? [] : [row.departureMinute]), unit: "minutes after midnight" },
      { key: "return", title: "Return-home time", value: target.returnMinute, values: history.flatMap((row) => row.returnMinute === null ? [] : [row.returnMinute]), unit: "minutes after midnight" },
      { key: "places", title: "Places visited", value: target.placesVisited, values: history.map((row) => row.placesVisited), unit: "places" },
      { key: "outside", title: "Time outside home", value: target.timeOutsideHomeMs, values: history.map((row) => row.timeOutsideHomeMs), unit: "milliseconds" },
      { key: "journeys", title: "Journey time", value: target.journeyDurationMs, values: history.map((row) => row.journeyDurationMs), unit: "milliseconds" },
      { key: "gap", title: "Largest tracking gap", value: target.summary.largestTrackingGapMs, values: history.map((row) => row.summary.largestTrackingGapMs), unit: "milliseconds" }
    ];
    return metrics.flatMap((metric) => {
      if (metric.value === null || metric.values.length < 4) return [];
      const rank = routinePercentile(metric.values, metric.value);
      if (rank > 10 && rank < 90) return [];
      const baseline = median2(metric.values);
      return [finding({
        id: `day_${date}_${metric.key}`,
        date,
        type: `day-${metric.key}`,
        title: metric.title,
        explanation: `${metric.value.toLocaleString()} ${metric.unit}; historical median ${baseline?.toLocaleString() ?? "unavailable"}; ${rank.toFixed(1)}th percentile among ${metric.values.length} earlier matching weekdays.`,
        value: metric.value,
        historicalMedian: baseline,
        percentileRank: rank,
        confidence: Math.min(98, 55 + metric.values.length * 2),
        comparableDates: history.slice(-5).map((row) => row.date),
        entityId: null
      })];
    });
  }
  function detectVisitAnomalies(timeZone, visits, places) {
    const placeById = new Map(places.map((place) => [place.id, place]));
    const byPlace = /* @__PURE__ */ new Map();
    visits.forEach((visit) => byPlace.set(visit.placeId, [...byPlace.get(visit.placeId) ?? [], visit]));
    return [...byPlace.entries()].flatMap(([placeId, placeVisits]) => {
      const sorted = placeVisits.filter((visit) => visit.interval.start).sort((a2, b2) => a2.interval.start.localeCompare(b2.interval.start));
      const result = [];
      sorted.forEach((visit, index) => {
        const duration = durationMilliseconds(visit.interval.start, visit.interval.end);
        const prior = sorted.slice(0, index);
        const priorDurations = prior.flatMap((candidate) => {
          const value = durationMilliseconds(candidate.interval.start, candidate.interval.end);
          return value === null ? [] : [value];
        });
        if (duration !== null && priorDurations.length >= 5) {
          const rank = routinePercentile(priorDurations, duration);
          if (rank <= 5 || rank >= 95) result.push(finding({
            id: `visit_${visit.id}_duration`,
            date: localParts(visit.interval.start, timeZone).date,
            type: "visit-duration",
            title: `Unusual visit to ${placeById.get(placeId)?.name ?? "a place"}`,
            explanation: `This visit lasted ${Math.round(duration / 6e4)} minutes, the ${rank.toFixed(1)}th percentile among ${priorDurations.length} earlier visits here.`,
            value: duration,
            historicalMedian: median2(priorDurations),
            percentileRank: rank,
            confidence: Math.min(97, 60 + priorDurations.length * 2),
            comparableDates: prior.slice(-5).map((candidate) => localParts(candidate.interval.start, timeZone).date),
            entityId: visit.id
          }));
        }
        const previous = prior.at(-1);
        if (previous?.interval.end && visit.interval.start) {
          const gap = Date.parse(visit.interval.start) - Date.parse(previous.interval.end);
          const historicalGaps = prior.slice(1).flatMap((candidate, priorIndex) => {
            const end = prior[priorIndex]?.interval.end;
            return end && candidate.interval.start ? [Date.parse(candidate.interval.start) - Date.parse(end)] : [];
          });
          if (historicalGaps.length >= 4) {
            const rank = routinePercentile(historicalGaps, gap);
            if (rank >= 95) result.push(finding({
              id: `visit_${visit.id}_return`,
              date: localParts(visit.interval.start, timeZone).date,
              type: "return-after-gap",
              title: `Return to ${placeById.get(placeId)?.name ?? "a place"} after a long interval`,
              explanation: `${Math.round(gap / 864e5)} days since the prior visit, the ${rank.toFixed(1)}th percentile for this place.`,
              value: gap,
              historicalMedian: median2(historicalGaps),
              percentileRank: rank,
              confidence: Math.min(96, 58 + historicalGaps.length * 2),
              comparableDates: prior.slice(-5).map((candidate) => localParts(candidate.interval.start, timeZone).date),
              entityId: visit.id
            }));
          }
        }
      });
      return result;
    });
  }
  function detectJourneyAnomalies(timeZone, journeys) {
    const byRouteMode = /* @__PURE__ */ new Map();
    journeys.forEach((journey) => {
      const key = `${journey.startPlaceId ?? "?"}|${journey.endPlaceId ?? "?"}|${journey.travelMode}`;
      byRouteMode.set(key, [...byRouteMode.get(key) ?? [], journey]);
    });
    return [...byRouteMode.values()].flatMap((group) => group.sort((a2, b2) => (a2.interval.start ?? "").localeCompare(b2.interval.start ?? "")).flatMap((journey, index, sorted) => {
      const duration = durationMilliseconds(journey.interval.start, journey.interval.end);
      const priorDurations = sorted.slice(0, index).flatMap((candidate) => {
        const value = durationMilliseconds(candidate.interval.start, candidate.interval.end);
        return value === null ? [] : [value];
      });
      if (duration === null || !journey.interval.start || priorDurations.length < 5) return [];
      const rank = routinePercentile(priorDurations, duration);
      if (rank < 95) return [];
      return [finding({
        id: `journey_${journey.id}_duration`,
        date: localParts(journey.interval.start, timeZone).date,
        type: "journey-duration",
        title: `Unusually long ${journey.travelMode.toLowerCase()} journey`,
        explanation: `${Math.round(duration / 6e4)} minutes, the ${rank.toFixed(1)}th percentile among ${priorDurations.length} earlier comparable journeys.`,
        value: duration,
        historicalMedian: median2(priorDurations),
        percentileRank: rank,
        confidence: Math.min(97, 60 + priorDurations.length * 2),
        comparableDates: sorted.slice(Math.max(0, index - 5), index).flatMap((candidate) => candidate.interval.start ? [localParts(candidate.interval.start, timeZone).date] : []),
        entityId: journey.id
      })];
    }));
  }
  function detectRoutineSequenceAnomalies(routine) {
    return routine.observations.flatMap((row, index, all) => {
      if (row.sequence.length < 2) return [];
      const prior = all.slice(0, index).filter((candidate) => candidate.dayOfWeek === row.dayOfWeek && candidate.sequence.length >= 2);
      if (prior.length < 8) return [];
      const key = row.sequence.join("");
      const matches = prior.filter((candidate) => candidate.sequence.join("") === key).length;
      if (matches > 0) return [];
      return [finding({
        id: `sequence_${row.date}`,
        date: row.date,
        type: "unusual-place-sequence",
        title: "Unusual place sequence",
        explanation: `This sequence had not appeared among ${prior.length} earlier matching weekdays.`,
        value: 0,
        historicalMedian: null,
        percentileRank: 0,
        confidence: Math.min(94, 60 + prior.length),
        comparableDates: prior.slice(-5).map((candidate) => candidate.date),
        entityId: null
      })];
    });
  }
  function detectPlaceInactivityAnomalies(timeZone, visits, places) {
    const latest = visits.flatMap((visit) => visit.interval.end ?? visit.interval.start ? [visit.interval.end ?? visit.interval.start] : []).sort().at(-1);
    if (!latest) return [];
    const placeById = new Map(places.map((place) => [place.id, place]));
    const byPlace = /* @__PURE__ */ new Map();
    visits.forEach((visit) => {
      if (visit.interval.start) byPlace.set(visit.placeId, [...byPlace.get(visit.placeId) ?? [], visit]);
    });
    return [...byPlace.entries()].flatMap(([placeId, rows]) => {
      const sorted = rows.sort((a2, b2) => a2.interval.start.localeCompare(b2.interval.start));
      if (sorted.length < 5) return [];
      const gaps = sorted.slice(1).flatMap((visit, index) => {
        const end = sorted[index]?.interval.end;
        return end ? [Date.parse(visit.interval.start) - Date.parse(end)] : [];
      });
      const lastAt = sorted.at(-1).interval.end ?? sorted.at(-1).interval.start;
      const currentGap = Date.parse(latest) - Date.parse(lastAt);
      const rank = routinePercentile(gaps, currentGap);
      if (currentGap < 90 * 864e5 || rank < 95) return [];
      return [finding({
        id: `inactive_${placeId}`,
        date: localParts(latest, timeZone).date,
        type: "formerly-frequent-place",
        title: `${placeById.get(placeId)?.name ?? "A formerly frequent place"} is no longer being visited`,
        explanation: `${Math.round(currentGap / 864e5)} days since the last visit; longer than ${rank.toFixed(1)}% of earlier intervals after ${sorted.length} visits.`,
        value: currentGap,
        historicalMedian: median2(gaps),
        percentileRank: rank,
        confidence: Math.min(96, 62 + gaps.length * 3),
        comparableDates: sorted.slice(-5).map((visit) => localParts(visit.interval.start, timeZone).date),
        entityId: placeId
      })];
    });
  }
  function detectRoutineShiftAnomalies(routine) {
    if (routine.observations.length < 16) return [];
    const recent = routine.observations.slice(-4);
    const baseline = routine.observations.slice(-16, -4);
    const recentMedian = median2(recent.map((row) => row.timeOutsideHomeMs));
    const baselineValues = baseline.map((row) => row.timeOutsideHomeMs);
    const baselineMedian = median2(baselineValues);
    if (recentMedian === null || baselineMedian === null || baselineMedian === 0) return [];
    const change = (recentMedian - baselineMedian) / baselineMedian * 100;
    if (Math.abs(change) < 40) return [];
    const date = recent.at(-1).date;
    const rank = routinePercentile(baselineValues, recentMedian);
    return [finding({
      id: `routine_shift_${date}`,
      date,
      type: "routine-shift",
      title: "Recent time-outside-home routine changed",
      explanation: `The latest four-day median is ${Math.abs(change).toFixed(0)}% ${change > 0 ? "higher" : "lower"} than the preceding 12-day median.`,
      value: recentMedian,
      historicalMedian: baselineMedian,
      percentileRank: rank,
      confidence: 82,
      comparableDates: baseline.slice(-5).map((row) => row.date),
      entityId: null
    })];
  }
  function detectAllAnomalies(timeZone, routine, places, visits, journeys) {
    return [
      ...routine.observations.flatMap((row) => detectDayAnomalies(row.date, routine)),
      ...detectVisitAnomalies(timeZone, visits, places),
      ...detectJourneyAnomalies(timeZone, journeys),
      ...detectRoutineSequenceAnomalies(routine),
      ...detectPlaceInactivityAnomalies(timeZone, visits, places),
      ...detectRoutineShiftAnomalies(routine)
    ].sort((left, right) => right.date.localeCompare(left.date) || right.confidence - left.confidence);
  }

  // src/analytics/comparisons.ts
  function compare(value, baseline) {
    if (value === null || baseline === null) return { value, differenceFromBaseline: null, percentageDifferenceFromBaseline: null };
    const difference = value - baseline;
    return { value, differenceFromBaseline: difference, percentageDifferenceFromBaseline: baseline === 0 ? null : difference / baseline * 100 };
  }
  function histogramMedian(histogram2) {
    const total = histogram2.reduce((sum, value) => sum + value, 0);
    if (total === 0) return null;
    const target = total / 2;
    let cumulative = 0;
    for (let index = 0; index < histogram2.length; index += 1) {
      cumulative += histogram2[index] ?? 0;
      if (cumulative >= target) return index;
    }
    return null;
  }
  function comparePlaces(placeIds, places, visits, journeys, timeZone) {
    const profiles = placeIds.flatMap((id) => {
      const place = places.find((candidate) => candidate.id === id);
      return place ? [buildPlaceProfile(place, visits, journeys, timeZone, Date.now(), places)] : [];
    });
    const baseline = profiles[0];
    if (!baseline) return [];
    return profiles.map((profile) => ({
      place: profile.place,
      visitCount: compare(profile.visitCount, baseline.visitCount),
      uniqueDays: compare(profile.uniqueVisitDays, baseline.uniqueVisitDays),
      totalDurationMs: compare(profile.totalDurationMs, baseline.totalDurationMs),
      medianDurationMs: compare(profile.duration.median, baseline.duration.median),
      lowConfidenceVisits: compare(profile.lowConfidenceVisits, baseline.lowConfidenceVisits),
      medianArrivalHour: histogramMedian(profile.arrivalHours),
      topPreviousPlaceId: profile.commonPreviousPlaces[0]?.placeId ?? null,
      topNextPlaceId: profile.commonNextPlaces[0]?.placeId ?? null
    }));
  }
  function compareJourneys(journeyIds, journeys) {
    const selected = journeyIds.flatMap((id) => {
      const journey = journeys.find((candidate) => candidate.id === id);
      return journey ? [{ journey, metrics: buildJourneyAnalytics(journey) }] : [];
    });
    const baseline = selected[0];
    if (!baseline) return [];
    return selected.map(({ journey, metrics }) => ({
      journey,
      durationMs: compare(metrics.durationMs, baseline.metrics.durationMs),
      distanceMeters: compare(metrics.recordedDistanceMeters ?? metrics.calculatedDistanceMeters, baseline.metrics.recordedDistanceMeters ?? baseline.metrics.calculatedDistanceMeters),
      averageSpeedKph: compare(metrics.averageSpeedKph, baseline.metrics.averageSpeedKph),
      routeDirectness: compare(metrics.routeDirectness, baseline.metrics.routeDirectness),
      pauses: compare(metrics.pauses.length, baseline.metrics.pauses.length),
      dataQualityScore: compare(metrics.dataQualityScore, baseline.metrics.dataQualityScore)
    }));
  }

  // src/analytics/search.ts
  function inRange(value, range) {
    if (!range) return true;
    if (value === null || !Number.isFinite(value)) return false;
    return (range.minimum === void 0 || value >= range.minimum) && (range.maximum === void 0 || value <= range.maximum);
  }
  function timestampMatches(timestamp, range, timeZone) {
    if (!range) return true;
    if (!timestamp) return false;
    const date = localParts(timestamp, timeZone).date;
    return (!range.start || date >= range.start) && (!range.end || date <= range.end);
  }
  function minuteOfDay2(timestamp, timeZone) {
    if (!timestamp) return null;
    const zoned = qi.Instant.from(timestamp).toZonedDateTimeISO(timeZone);
    return zoned.hour * 60 + zoned.minute;
  }
  function searchTimeline(query, timeZone, places, visits, journeys, annotations) {
    const placeById = new Map(places.map((place) => [place.id, place]));
    const annotationByVisit = new Map(annotations.map((annotation) => [annotation.visitId, annotation]));
    const firstVisitByPlace = /* @__PURE__ */ new Map();
    const previousVisitGap = /* @__PURE__ */ new Map();
    const lastEndByPlace = /* @__PURE__ */ new Map();
    [...visits].filter((visit) => visit.interval.start).sort((a2, b2) => a2.interval.start.localeCompare(b2.interval.start)).forEach((visit) => {
      if (!firstVisitByPlace.has(visit.placeId)) firstVisitByPlace.set(visit.placeId, visit.interval.start);
      const priorEnd = lastEndByPlace.get(visit.placeId);
      if (priorEnd) previousVisitGap.set(visit.id, Date.parse(visit.interval.start) - Date.parse(priorEnd));
      if (visit.interval.end) lastEndByPlace.set(visit.placeId, visit.interval.end);
    });
    const matchingVisits = visits.filter((visit) => {
      const place = placeById.get(visit.placeId);
      const annotation = annotationByVisit.get(visit.id);
      const first = firstVisitByPlace.get(visit.placeId);
      return timestampMatches(visit.interval.start, query.dateRange, timeZone) && (!query.placeIds || query.placeIds.includes(visit.placeId)) && (!query.placeCategories || Boolean(place?.category && query.placeCategories.includes(place.category))) && inRange(durationMilliseconds(visit.interval.start, visit.interval.end), query.visitDurationMs) && inRange(minuteOfDay2(visit.interval.start, timeZone), query.arrivalMinute) && inRange(minuteOfDay2(visit.interval.end, timeZone), query.departureMinute) && (!query.daysOfWeek || Boolean(visit.interval.start && query.daysOfWeek.includes(localParts(visit.interval.start, timeZone).dayOfWeek))) && (query.unknownPlace === void 0 || query.unknownPlace === !place) && (query.newPlace === void 0 || query.newPlace === Boolean(first && first === visit.interval.start)) && (query.annotated === void 0 || query.annotated === Boolean(annotation)) && (!query.tags || query.tags.every((tag) => Boolean(annotation?.tags.includes(tag) || place?.tags.includes(tag)))) && (!query.purposes || Boolean(annotation?.purpose && query.purposes.includes(annotation.purpose))) && inRange(annotation?.spending ?? null, query.spending) && inRange(previousVisitGap.get(visit.id) ?? null, query.revisitIntervalMs) && (!query.geographicArea || Boolean(visit.coordinates && pointInsideBoundary(visit.coordinates, query.geographicArea))) && inRange(visit.confidence?.score ?? null, query.confidence);
    });
    const matchingJourneys = journeys.filter((journey) => timestampMatches(journey.interval.start, query.dateRange, timeZone) && (!query.daysOfWeek || Boolean(journey.interval.start && query.daysOfWeek.includes(localParts(journey.interval.start, timeZone).dayOfWeek))) && (!query.travelModes || query.travelModes.some((mode) => journey.travelMode.toUpperCase().includes(mode.toUpperCase()))) && inRange(journey.distanceMeters, query.journeyDistanceMeters) && inRange(durationMilliseconds(journey.interval.start, journey.interval.end), query.journeyDurationMs) && inRange(journey.confidence?.score ?? null, query.confidence) && (!query.geographicArea || journey.path.some((point) => pointInsideBoundary(point.coordinates, query.geographicArea))));
    const matchingPlaceIds = /* @__PURE__ */ new Set([...matchingVisits.map((visit) => visit.placeId), ...matchingJourneys.flatMap((journey) => [journey.startPlaceId, journey.endPlaceId]).filter((id) => Boolean(id))]);
    return { visits: matchingVisits, journeys: matchingJourneys, places: places.filter((place) => matchingPlaceIds.has(place.id)) };
  }

  // src/analytics/period-summary.ts
  function add(record2, key, value) {
    record2[key] = (record2[key] ?? 0) + value;
  }
  function isHome4(place) {
    return Boolean(place && (place.semanticType?.toUpperCase() === "HOME" || place.name.trim().toLowerCase() === "home"));
  }
  function interval2(start, end) {
    return start && end ? { startMs: Date.parse(start), endMs: Date.parse(end) } : null;
  }
  function buildPeriodSummary(startDate, endDate, timeZone, places, visits, journeys) {
    const range = { startMs: dayInterval(startDate, timeZone).startMs, endMs: dayInterval(endDate, timeZone).endMs };
    const previousRange = { startMs: range.startMs - (range.endMs - range.startMs), endMs: range.startMs };
    const placeById = new Map(places.map((place) => [place.id, place]));
    const timeByCategoryMs = {};
    const timeByTravelModeMs = {};
    const distanceByTravelModeMeters = {};
    const journeysByTravelMode = {};
    const placeRows = /* @__PURE__ */ new Map();
    let timeAtHomeMs = 0;
    let timeOutsideHomeMs = 0;
    visits.forEach((visit) => {
      const visitInterval = interval2(visit.interval.start, visit.interval.end);
      if (!visitInterval) return;
      const duration = overlappingMilliseconds(visitInterval, range);
      if (duration <= 0) return;
      const place = placeById.get(visit.placeId);
      if (isHome4(place)) timeAtHomeMs += duration;
      else timeOutsideHomeMs += duration;
      add(timeByCategoryMs, place?.category || "Unknown place", duration);
      placeRows.set(visit.placeId, [...placeRows.get(visit.placeId) ?? [], duration]);
    });
    const journeyDurations = [];
    const journeyDistances = [];
    const selectedJourneys = [];
    const routeCounts = /* @__PURE__ */ new Map();
    journeys.forEach((journey) => {
      const journeyInterval = interval2(journey.interval.start, journey.interval.end);
      if (!journeyInterval) return;
      const duration = overlappingMilliseconds(journeyInterval, range);
      if (duration <= 0) return;
      timeOutsideHomeMs += duration;
      journeyDurations.push(duration);
      selectedJourneys.push(journey);
      if (journey.distanceMeters !== null) journeyDistances.push(journey.distanceMeters);
      add(timeByTravelModeMs, journey.travelMode, duration);
      add(journeysByTravelMode, journey.travelMode, 1);
      if (journey.distanceMeters !== null) add(distanceByTravelModeMeters, journey.travelMode, journey.distanceMeters * duration / Math.max(1, journeyInterval.endMs - journeyInterval.startMs));
      const key = `${journey.startPlaceId ?? "Unknown"} \u2192 ${journey.endPlaceId ?? "Unknown"}`;
      routeCounts.set(key, (routeCounts.get(key) ?? 0) + 1);
    });
    const firstByPlace = /* @__PURE__ */ new Map();
    visits.forEach((visit) => {
      if (visit.interval.start) firstByPlace.set(visit.placeId, Math.min(firstByPlace.get(visit.placeId) ?? Infinity, Date.parse(visit.interval.start)));
    });
    const route = [...routeCounts.entries()].sort((a2, b2) => b2[1] - a2[1])[0];
    const previousPlaceCounts = /* @__PURE__ */ new Map();
    visits.forEach((visit) => {
      const visitInterval = interval2(visit.interval.start, visit.interval.end);
      if (visitInterval && overlappingMilliseconds(visitInterval, previousRange) > 0) previousPlaceCounts.set(visit.placeId, (previousPlaceCounts.get(visit.placeId) ?? 0) + 1);
    });
    const placeChanges = [.../* @__PURE__ */ new Set([...placeRows.keys(), ...previousPlaceCounts.keys()])].map((placeId) => {
      const currentVisits = placeRows.get(placeId)?.length ?? 0;
      const previousVisits = previousPlaceCounts.get(placeId) ?? 0;
      return { placeId, currentVisits, previousVisits, percentageChange: previousVisits === 0 ? null : (currentVisits - previousVisits) / previousVisits * 100 };
    }).sort((a2, b2) => Math.abs(b2.percentageChange ?? (b2.currentVisits ? 100 : -100)) - Math.abs(a2.percentageChange ?? (a2.currentVisits ? 100 : -100)));
    const home = places.find((place) => isHome4(place) && place.coordinates);
    const mostDistant = home?.coordinates ? places.filter((place) => place.coordinates && placeRows.has(place.id)).map((place) => ({ id: place.id, distance: haversineMeters(home.coordinates, place.coordinates) })).sort((a2, b2) => b2.distance - a2.distance)[0] : void 0;
    const longestJourney = selectedJourneys.filter((journey) => journey.interval.start && journey.interval.end).sort((a2, b2) => Date.parse(b2.interval.end) - Date.parse(b2.interval.start) - (Date.parse(a2.interval.end) - Date.parse(a2.interval.start)))[0];
    const previouslySeenCells = new Set(journeys.filter((journey) => journey.interval.start && Date.parse(journey.interval.start) < range.startMs).flatMap((journey) => journey.path.map((point) => `${Math.round(point.coordinates.latitude * 1e3)}:${Math.round(point.coordinates.longitude * 1e3)}`)));
    const currentCells = new Set(selectedJourneys.flatMap((journey) => journey.path.map((point) => `${Math.round(point.coordinates.latitude * 1e3)}:${Math.round(point.coordinates.longitude * 1e3)}`)));
    const novelCells = [...currentCells].filter((cell) => !previouslySeenCells.has(cell)).length;
    return {
      startDate,
      endDate,
      durationMs: range.endMs - range.startMs,
      timeAtHomeMs,
      timeOutsideHomeMs,
      timeByCategoryMs,
      timeByTravelModeMs,
      distanceByTravelModeMeters,
      journeysByTravelMode,
      journeyDuration: summarizeDistribution(journeyDurations),
      journeyDistance: summarizeDistribution(journeyDistances),
      placeMetrics: [...placeRows.entries()].map(([placeId, durations]) => ({ placeId, visits: durations.length, totalDurationMs: durations.reduce((sum, value) => sum + value, 0), medianDurationMs: summarizeDistribution(durations).median })).sort((a2, b2) => b2.totalDurationMs - a2.totalDurationMs),
      newPlaceIds: [...placeRows.keys()].filter((placeId) => {
        const first = firstByPlace.get(placeId);
        return first !== void 0 && first >= range.startMs && first < range.endMs;
      }),
      noLongerVisitedPlaceIds: [...previousPlaceCounts.keys()].filter((placeId) => !placeRows.has(placeId)),
      placeChanges,
      mostDistantPlaceId: mostDistant?.id ?? null,
      longestJourneyId: longestJourney?.id ?? null,
      routeNoveltyPercent: currentCells.size ? novelCells / currentCells.size * 100 : null,
      mostFrequentOriginDestination: route ? { key: route[0], count: route[1] } : null
    };
  }

  // src/analytics/cache.ts
  var ANALYTICS_VERSION = "places-analytics-v1";
  function stableStringify(value) {
    if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
    if (value && typeof value === "object") return `{${Object.entries(value).sort(([a2], [b2]) => a2.localeCompare(b2)).map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`).join(",")}}`;
    return JSON.stringify(value);
  }
  function fnv1a(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }
  function buildAnalyticsCacheKey(timeline, operation, settings = {}, editRevision = 0) {
    const identity = {
      analyticsVersion: ANALYTICS_VERSION,
      schemaVersion: timeline.schemaVersion,
      importFingerprint: timeline.importSession.fingerprint,
      operation,
      settings,
      editRevision
    };
    return `${ANALYTICS_VERSION}:${operation}:${fnv1a(stableStringify(identity))}`;
  }

  // src/analytics/selected-day-context.ts
  var METRICS = ["timeAtHomeMs", "timeOutsideHomeMs", "totalDistanceMeters", "placesVisited", "journeys", "walkingDurationMs", "publicTransportDurationMs", "trackingCoveragePercent", "largestTrackingGapMs"];
  function comparison(label, target, values) {
    const baseline = median(values);
    if (baseline === null) return { label, sampleSize: 0, value: null, difference: null, percentageDifference: null };
    const difference = target - baseline;
    return { label, sampleSize: values.length, value: baseline, difference, percentageDifference: baseline === 0 ? null : difference / baseline * 100 };
  }
  function buildSelectedDayContext(date, timeZone, places, visits, journeys) {
    const selected = buildSelectedDaySummary(date, timeZone, places, visits, journeys);
    const targetDate = qi.PlainDate.from(date);
    const earliestTimestamp = [...visits, ...journeys].flatMap((event) => event.interval.start ? [event.interval.start] : []).sort()[0];
    const earliestDate = earliestTimestamp ? qi.PlainDate.from(localParts(earliestTimestamp, timeZone).date) : targetDate;
    const history = [];
    for (let cursor = earliestDate; qi.PlainDate.compare(cursor, targetDate) < 0; cursor = cursor.add({ days: 1 })) history.push(buildSelectedDaySummary(cursor.toString(), timeZone, places, visits, journeys));
    const targetDayOfWeek = targetDate.dayOfWeek;
    const sameWeekday = history.filter((row) => qi.PlainDate.from(row.date).dayOfWeek === targetDayOfWeek);
    const previousTwelve = sameWeekday.slice(-12);
    const targetMonth = date.slice(0, 7);
    const sameMonth = history.filter((row) => row.date.slice(0, 7) === targetMonth);
    const targetYear = date.slice(0, 4);
    const sameYear = history.filter((row) => row.date.slice(0, 4) === targetYear);
    const previousDay = history.filter((row) => row.date === targetDate.subtract({ days: 1 }).toString());
    const previousWeek = history.filter((row) => row.date === targetDate.subtract({ weeks: 1 }).toString());
    return {
      selected,
      metrics: METRICS.map((key) => {
        const value = selected[key];
        const historical = history.map((row) => row[key]);
        return {
          key,
          value,
          percentileRank: percentileRank(historical, value),
          historicalSampleSize: historical.length,
          comparisons: [comparison("Previous day", value, previousDay.map((row) => row[key])), comparison("Same weekday last week", value, previousWeek.map((row) => row[key])), comparison("Previous 12 matching weekdays", value, previousTwelve.map((row) => row[key])), comparison("Monthly median", value, sameMonth.map((row) => row[key])), comparison("Annual median", value, sameYear.map((row) => row[key]))]
        };
      })
    };
  }
  function buildDayEventFeed(date, timeZone, places, visits, journeys, anomalies = []) {
    const placeById = new Map(places.map((place) => [place.id, place]));
    const firstVisitByPlace = /* @__PURE__ */ new Map();
    visits.forEach((visit) => {
      if (visit.interval.start && (!firstVisitByPlace.has(visit.placeId) || visit.interval.start < firstVisitByPlace.get(visit.placeId))) firstVisitByPlace.set(visit.placeId, visit.interval.start);
    });
    const events = [];
    visits.filter((visit) => visit.interval.start && localParts(visit.interval.start, timeZone).date === date).forEach((visit) => {
      const name = placeById.get(visit.placeId)?.name ?? "Unknown place";
      events.push({ at: visit.interval.start, type: firstVisitByPlace.get(visit.placeId) === visit.interval.start ? "new-place" : "arrival", title: `Arrived at ${name}`, detail: firstVisitByPlace.get(visit.placeId) === visit.interval.start ? "First recorded visit" : "Recorded visit", entityId: visit.id });
      if (visit.interval.end) events.push({ at: visit.interval.end, type: "departure", title: `Left ${name}`, detail: visit.interval.endUncertain ? "Departure time is uncertain" : "Recorded departure", entityId: visit.id });
      if (visit.confidence && visit.confidence.score < 60) events.push({ at: visit.interval.start, type: "low-confidence", title: `Low-confidence visit at ${name}`, detail: `${visit.confidence.score}/100 \u2014 ${visit.confidence.components.map((component) => component.explanation).join(", ")}`, entityId: visit.id });
    });
    journeys.filter((journey) => journey.interval.start && localParts(journey.interval.start, timeZone).date === date).forEach((journey) => events.push({ at: journey.interval.start, type: "journey", title: `${journey.travelMode.replaceAll("_", " ")} journey`, detail: `${placeById.get(journey.startPlaceId ?? "")?.name ?? "Unknown"} \u2192 ${placeById.get(journey.endPlaceId ?? "")?.name ?? "Unknown"}`, entityId: journey.id }));
    anomalies.filter((anomaly) => anomaly.date === date).forEach((anomaly) => events.push({ at: `${date}T12:00:00Z`, type: "unusual", title: anomaly.title, detail: anomaly.explanation, entityId: anomaly.entityId }));
    return events.sort((left, right) => left.at.localeCompare(right.at));
  }

  // src/analytics/worker-jobs.ts
  async function calculateIntelligenceJob(input, report = () => {
  }, isCancelled = () => false) {
    report({ progress: 0.05, stage: "Preparing daily observations" });
    if (isCancelled()) throw new DOMException("Analysis cancelled", "AbortError");
    await Promise.resolve();
    const routine = buildRoutineAnalysis(input.timeZone, input.timeline.places, input.timeline.visits, input.timeline.journeys);
    report({ progress: 0.5, stage: "Finding unusual days and events" });
    if (isCancelled()) throw new DOMException("Analysis cancelled", "AbortError");
    await Promise.resolve();
    const anomalies = detectAllAnomalies(input.timeZone, routine, input.timeline.places, input.timeline.visits, input.timeline.journeys);
    report({ progress: 0.78, stage: "Scoring data quality" });
    if (isCancelled()) throw new DOMException("Analysis cancelled", "AbortError");
    await Promise.resolve();
    const dataQuality = buildDataQualityDashboard(input.timeline.places, input.timeline.visits, input.timeline.journeys, input.timeZone);
    const selectedDayContext = input.selectedDate ? buildSelectedDayContext(input.selectedDate, input.timeZone, input.timeline.places, input.timeline.visits, input.timeline.journeys) : null;
    report({ progress: 1, stage: "Analysis ready" });
    return { routine, anomalies, dataQuality, selectedDayContext };
  }

  // src/analytics/place-operations.ts
  function previewPlaceMerge(placeIds, places, visits) {
    const selectedPlaces = places.filter((place) => placeIds.includes(place.id));
    const selectedVisits = visits.filter((visit) => placeIds.includes(visit.placeId));
    const coordinates = selectedVisits.flatMap((visit) => visit.coordinates ? [visit.coordinates] : []);
    const centre = coordinateCentroid(coordinates.length ? coordinates : selectedPlaces.flatMap((place) => place.coordinates ? [place.coordinates] : []));
    const radius2 = estimatedRadiusMeters(coordinates);
    return {
      sourcePlaceIds: [...placeIds],
      combinedVisitCount: selectedVisits.length,
      combinedDurationMs: selectedVisits.reduce((sum, visit) => sum + (visit.interval.start && visit.interval.end ? Math.max(0, Date.parse(visit.interval.end) - Date.parse(visit.interval.start)) : 0), 0),
      proposedCentre: centre,
      proposedRadiusMeters: radius2,
      conflictingNames: [...new Set(selectedPlaces.map((place) => place.name))],
      conflictingCategories: [...new Set(selectedPlaces.flatMap((place) => place.category ? [place.category] : []))],
      googlePlaceIds: [...new Set(selectedPlaces.flatMap((place) => place.googlePlaceId ? [place.googlePlaceId] : []))],
      possibleOutlierVisitIds: centre && radius2 !== null ? selectedVisits.filter((visit) => visit.coordinates && haversineMeters(centre, visit.coordinates) > Math.max(75, radius2 * 0.8)).map((visit) => visit.id) : []
    };
  }
  function coordinateGroups(visits, radiusMeters) {
    const groups = [];
    visits.filter((visit) => visit.coordinates).forEach((visit) => {
      const group = groups.find((items) => items.some((item) => item.coordinates && haversineMeters(item.coordinates, visit.coordinates) <= radiusMeters));
      if (group) group.push(visit);
      else groups.push([visit]);
    });
    return groups.sort((a2, b2) => b2.length - a2.length);
  }
  function suggestCoordinateSplit(visits, radiusMeters = 50) {
    const groups = coordinateGroups(visits, radiusMeters);
    const secondary = groups[1];
    if (!secondary || secondary.length < 1) return null;
    return { method: "coordinates", visitIds: secondary.map((visit) => visit.id), explanation: `${secondary.length} visits form a separate coordinate cluster at least ${radiusMeters} m from the main cluster.` };
  }
  function suggestDateRangeSplit(visits, startDate, endDate) {
    const selected = visits.filter((visit) => visit.interval.start && (!startDate || visit.interval.start.slice(0, 10) >= startDate) && (!endDate || visit.interval.start.slice(0, 10) <= endDate));
    return selected.length ? { method: "date-range", visitIds: selected.map((visit) => visit.id), explanation: `${selected.length} visits fall within the requested date range.` } : null;
  }
  function suggestDurationSplit(visits, thresholdMinutes) {
    const rows = visits.flatMap((visit) => visit.interval.start && visit.interval.end ? [{ visit, durationMs: Date.parse(visit.interval.end) - Date.parse(visit.interval.start) }] : []);
    const summary = summarizeDistribution(rows.map((row) => row.durationMs));
    const thresholdMs = thresholdMinutes === void 0 ? summary.p75 === null || summary.interquartileRange === null ? null : summary.p75 + 1.5 * summary.interquartileRange : thresholdMinutes * 6e4;
    if (thresholdMs === null) return null;
    const selected = rows.filter((row) => row.durationMs >= thresholdMs);
    return selected.length ? { method: "duration", visitIds: selected.map((row) => row.visit.id), explanation: `${selected.length} visits last at least ${Math.round(thresholdMs / 6e4)} minutes.` } : null;
  }
  return __toCommonJS(browser_api_exports);
})();
