// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this,
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2rAXy":[function(require,module,exports) {
var Refresh = require('react-refresh/runtime');
Refresh.injectIntoGlobalHook(window);
window.$RefreshReg$ = function() {
};
window.$RefreshSig$ = function() {
    return function(type) {
        return type;
    };
};

},{"react-refresh/runtime":"fNmB3"}],"gxs7s":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "69f74e7f31319ffd";
module.bundle.HMR_BUNDLE_ID = "5effcbcabe82868b"; // @flow
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets /*: {|[string]: boolean|} */ , acceptedAssets /*: {|[string]: boolean|} */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    // $FlowFixMe
    ws.onmessage = function(event /*: {data: string, ...} */ ) {
        checkedAssets = {
        } /*: {|[string]: boolean|} */ ;
        acceptedAssets = {
        } /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH
            );
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function(e) {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
        errorHTML += `\n      <div>\n        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">\n          🚨 ${diagnostic.message}\n        </div>\n        <pre>\n          ${stack}\n        </pre>\n        <div>\n          ${diagnostic.hints.map((hint)=>'<div>' + hint + '</div>'
        ).join('')}\n        </div>\n      </div>\n    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    link.getAttribute('href').split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"7Jy99":[function(require,module,exports) {
"use strict";
function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function _typeof1(obj1) {
        return typeof obj1;
    };
    else _typeof = function _typeof2(obj1) {
        return obj1 && typeof Symbol === "function" && obj1.constructor === Symbol && obj1 !== Symbol.prototype ? "symbol" : typeof obj1;
    };
    return _typeof(obj);
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../utils");
var _patterns = require("../patterns");
function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function _getRequireWildcardCache1() {
        return cache;
    };
    return cache;
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") return {
        "default": obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
        else newObj[key] = obj[key];
    }
    newObj["default"] = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf1(o1, p1) {
        o1.__proto__ = p1;
        return o1;
    };
    return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return _possibleConstructorReturn(this, result);
    };
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) return call;
    return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf1(o1) {
        return o1.__proto__ || Object.getPrototypeOf(o1);
    };
    return _getPrototypeOf(o);
}
function _defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
var HAS_NAVIGATOR = typeof navigator !== 'undefined';
var IS_IPAD_PRO = HAS_NAVIGATOR && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
var IS_IOS = HAS_NAVIGATOR && (/iPad|iPhone|iPod/.test(navigator.userAgent) || IS_IPAD_PRO) && !window.MSStream;
var HLS_SDK_URL = 'https://cdn.jsdelivr.net/npm/hls.js@VERSION/dist/hls.min.js';
var HLS_GLOBAL = 'Hls';
var DASH_SDK_URL = 'https://cdnjs.cloudflare.com/ajax/libs/dashjs/VERSION/dash.all.min.js';
var DASH_GLOBAL = 'dashjs';
var FLV_SDK_URL = 'https://cdn.jsdelivr.net/npm/flv.js@VERSION/dist/flv.min.js';
var FLV_GLOBAL = 'flvjs';
var MATCH_DROPBOX_URL = /www\.dropbox\.com\/.+/;
var MATCH_CLOUDFLARE_STREAM = /https:\/\/watch\.cloudflarestream\.com\/([a-z0-9]+)/;
var REPLACE_CLOUDFLARE_STREAM = 'https://videodelivery.net/{id}/manifest/video.m3u8';
var FilePlayer1 = /*#__PURE__*/ function(_Component) {
    _inherits(FilePlayer2, _Component);
    var _super = _createSuper(FilePlayer2);
    function FilePlayer2() {
        var _this;
        _classCallCheck(this, FilePlayer2);
        for(var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++)_args[_key] = arguments[_key];
        _this = _super.call.apply(_super, [
            this
        ].concat(_args));
        _defineProperty(_assertThisInitialized(_this), "onReady", function() {
            var _this$props;
            return (_this$props = _this.props).onReady.apply(_this$props, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onPlay", function() {
            var _this$props2;
            return (_this$props2 = _this.props).onPlay.apply(_this$props2, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onBuffer", function() {
            var _this$props3;
            return (_this$props3 = _this.props).onBuffer.apply(_this$props3, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onBufferEnd", function() {
            var _this$props4;
            return (_this$props4 = _this.props).onBufferEnd.apply(_this$props4, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onPause", function() {
            var _this$props5;
            return (_this$props5 = _this.props).onPause.apply(_this$props5, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onEnded", function() {
            var _this$props6;
            return (_this$props6 = _this.props).onEnded.apply(_this$props6, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onError", function() {
            var _this$props7;
            return (_this$props7 = _this.props).onError.apply(_this$props7, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onEnablePIP", function() {
            var _this$props8;
            return (_this$props8 = _this.props).onEnablePIP.apply(_this$props8, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onDisablePIP", function(e) {
            var _this$props9 = _this.props, onDisablePIP = _this$props9.onDisablePIP, playing = _this$props9.playing;
            onDisablePIP(e);
            if (playing) _this.play();
        });
        _defineProperty(_assertThisInitialized(_this), "onPresentationModeChange", function(e) {
            if (_this.player && _utils.supportsWebKitPresentationMode(_this.player)) {
                var webkitPresentationMode = _this.player.webkitPresentationMode;
                if (webkitPresentationMode === 'picture-in-picture') _this.onEnablePIP(e);
                else if (webkitPresentationMode === 'inline') _this.onDisablePIP(e);
            }
        });
        _defineProperty(_assertThisInitialized(_this), "onSeek", function(e) {
            _this.props.onSeek(e.target.currentTime);
        });
        _defineProperty(_assertThisInitialized(_this), "mute", function() {
            _this.player.muted = true;
        });
        _defineProperty(_assertThisInitialized(_this), "unmute", function() {
            _this.player.muted = false;
        });
        _defineProperty(_assertThisInitialized(_this), "renderSourceElement", function(source, index) {
            if (typeof source === 'string') return(/*#__PURE__*/ _react["default"].createElement("source", {
                key: index,
                src: source
            }));
            return(/*#__PURE__*/ _react["default"].createElement("source", _extends({
                key: index
            }, source)));
        });
        _defineProperty(_assertThisInitialized(_this), "renderTrack", function(track, index) {
            return(/*#__PURE__*/ _react["default"].createElement("track", _extends({
                key: index
            }, track)));
        });
        _defineProperty(_assertThisInitialized(_this), "ref", function(player) {
            if (_this.player) // Store previous player to be used by removeListeners()
            _this.prevPlayer = _this.player;
            _this.player = player;
        });
        return _this;
    }
    _createClass(FilePlayer2, [
        {
            key: "componentDidMount",
            value: function componentDidMount() {
                this.props.onMount && this.props.onMount(this);
                this.addListeners(this.player);
                if (IS_IOS) this.player.load();
            }
        },
        {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                if (this.shouldUseAudio(this.props) !== this.shouldUseAudio(prevProps)) {
                    this.removeListeners(this.prevPlayer, prevProps.url);
                    this.addListeners(this.player);
                }
                if (this.props.url !== prevProps.url && !_utils.isMediaStream(this.props.url)) this.player.srcObject = null;
            }
        },
        {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.removeListeners(this.player);
                if (this.hls) this.hls.destroy();
            }
        },
        {
            key: "addListeners",
            value: function addListeners(player) {
                var _this$props10 = this.props, url = _this$props10.url, playsinline = _this$props10.playsinline;
                player.addEventListener('play', this.onPlay);
                player.addEventListener('waiting', this.onBuffer);
                player.addEventListener('playing', this.onBufferEnd);
                player.addEventListener('pause', this.onPause);
                player.addEventListener('seeked', this.onSeek);
                player.addEventListener('ended', this.onEnded);
                player.addEventListener('error', this.onError);
                player.addEventListener('enterpictureinpicture', this.onEnablePIP);
                player.addEventListener('leavepictureinpicture', this.onDisablePIP);
                player.addEventListener('webkitpresentationmodechanged', this.onPresentationModeChange);
                if (!this.shouldUseHLS(url)) // onReady is handled by hls.js
                player.addEventListener('canplay', this.onReady);
                if (playsinline) {
                    player.setAttribute('playsinline', '');
                    player.setAttribute('webkit-playsinline', '');
                    player.setAttribute('x5-playsinline', '');
                }
            }
        },
        {
            key: "removeListeners",
            value: function removeListeners(player, url) {
                player.removeEventListener('canplay', this.onReady);
                player.removeEventListener('play', this.onPlay);
                player.removeEventListener('waiting', this.onBuffer);
                player.removeEventListener('playing', this.onBufferEnd);
                player.removeEventListener('pause', this.onPause);
                player.removeEventListener('seeked', this.onSeek);
                player.removeEventListener('ended', this.onEnded);
                player.removeEventListener('error', this.onError);
                player.removeEventListener('enterpictureinpicture', this.onEnablePIP);
                player.removeEventListener('leavepictureinpicture', this.onDisablePIP);
                player.removeEventListener('webkitpresentationmodechanged', this.onPresentationModeChange);
                if (!this.shouldUseHLS(url)) // onReady is handled by hls.js
                player.removeEventListener('canplay', this.onReady);
            } // Proxy methods to prevent listener leaks
        },
        {
            key: "shouldUseAudio",
            value: function shouldUseAudio(props) {
                if (props.config.forceVideo) return false;
                if (props.config.attributes.poster) return false; // Use <video> so that poster is shown
                return _patterns.AUDIO_EXTENSIONS.test(props.url) || props.config.forceAudio;
            }
        },
        {
            key: "shouldUseHLS",
            value: function shouldUseHLS(url) {
                if (this.props.config.forceHLS) return true;
                if (IS_IOS) return false;
                return _patterns.HLS_EXTENSIONS.test(url) || MATCH_CLOUDFLARE_STREAM.test(url);
            }
        },
        {
            key: "shouldUseDASH",
            value: function shouldUseDASH(url) {
                return _patterns.DASH_EXTENSIONS.test(url) || this.props.config.forceDASH;
            }
        },
        {
            key: "shouldUseFLV",
            value: function shouldUseFLV(url) {
                return _patterns.FLV_EXTENSIONS.test(url) || this.props.config.forceFLV;
            }
        },
        {
            key: "load",
            value: function load(url) {
                var _this2 = this;
                var _this$props$config = this.props.config, hlsVersion = _this$props$config.hlsVersion, hlsOptions = _this$props$config.hlsOptions, dashVersion = _this$props$config.dashVersion, flvVersion = _this$props$config.flvVersion;
                if (this.hls) this.hls.destroy();
                if (this.dash) this.dash.reset();
                if (this.shouldUseHLS(url)) _utils.getSDK(HLS_SDK_URL.replace('VERSION', hlsVersion), HLS_GLOBAL).then(function(Hls) {
                    _this2.hls = new Hls(hlsOptions);
                    _this2.hls.on(Hls.Events.MANIFEST_PARSED, function() {
                        _this2.props.onReady();
                    });
                    _this2.hls.on(Hls.Events.ERROR, function(e, data) {
                        _this2.props.onError(e, data, _this2.hls, Hls);
                    });
                    if (MATCH_CLOUDFLARE_STREAM.test(url)) {
                        var id = url.match(MATCH_CLOUDFLARE_STREAM)[1];
                        _this2.hls.loadSource(REPLACE_CLOUDFLARE_STREAM.replace('{id}', id));
                    } else _this2.hls.loadSource(url);
                    _this2.hls.attachMedia(_this2.player);
                    _this2.props.onLoaded();
                });
                if (this.shouldUseDASH(url)) _utils.getSDK(DASH_SDK_URL.replace('VERSION', dashVersion), DASH_GLOBAL).then(function(dashjs) {
                    _this2.dash = dashjs.MediaPlayer().create();
                    _this2.dash.initialize(_this2.player, url, _this2.props.playing);
                    _this2.dash.on('error', _this2.props.onError);
                    if (parseInt(dashVersion) < 3) _this2.dash.getDebug().setLogToBrowserConsole(false);
                    else _this2.dash.updateSettings({
                        debug: {
                            logLevel: dashjs.Debug.LOG_LEVEL_NONE
                        }
                    });
                    _this2.props.onLoaded();
                });
                if (this.shouldUseFLV(url)) _utils.getSDK(FLV_SDK_URL.replace('VERSION', flvVersion), FLV_GLOBAL).then(function(flvjs) {
                    _this2.flv = flvjs.createPlayer({
                        type: 'flv',
                        url: url
                    });
                    _this2.flv.attachMediaElement(_this2.player);
                    _this2.flv.load();
                    _this2.props.onLoaded();
                });
                if (url instanceof Array) // When setting new urls (<source>) on an already loaded video,
                // HTMLMediaElement.load() is needed to reset the media element
                // and restart the media resource. Just replacing children source
                // dom nodes is not enough
                this.player.load();
                else if (_utils.isMediaStream(url)) try {
                    this.player.srcObject = url;
                } catch (e) {
                    this.player.src = window.URL.createObjectURL(url);
                }
            }
        },
        {
            key: "play",
            value: function play() {
                var promise = this.player.play();
                if (promise) promise["catch"](this.props.onError);
            }
        },
        {
            key: "pause",
            value: function pause() {
                this.player.pause();
            }
        },
        {
            key: "stop",
            value: function stop() {
                this.player.removeAttribute('src');
                if (this.dash) this.dash.reset();
            }
        },
        {
            key: "seekTo",
            value: function seekTo(seconds) {
                this.player.currentTime = seconds;
            }
        },
        {
            key: "setVolume",
            value: function setVolume(fraction) {
                this.player.volume = fraction;
            }
        },
        {
            key: "enablePIP",
            value: function enablePIP() {
                if (this.player.requestPictureInPicture && document.pictureInPictureElement !== this.player) this.player.requestPictureInPicture();
                else if (_utils.supportsWebKitPresentationMode(this.player) && this.player.webkitPresentationMode !== 'picture-in-picture') this.player.webkitSetPresentationMode('picture-in-picture');
            }
        },
        {
            key: "disablePIP",
            value: function disablePIP() {
                if (document.exitPictureInPicture && document.pictureInPictureElement === this.player) document.exitPictureInPicture();
                else if (_utils.supportsWebKitPresentationMode(this.player) && this.player.webkitPresentationMode !== 'inline') this.player.webkitSetPresentationMode('inline');
            }
        },
        {
            key: "setPlaybackRate",
            value: function setPlaybackRate(rate) {
                this.player.playbackRate = rate;
            }
        },
        {
            key: "getDuration",
            value: function getDuration() {
                if (!this.player) return null;
                var _this$player = this.player, duration = _this$player.duration, seekable = _this$player.seekable; // on iOS, live streams return Infinity for the duration
                // so instead we use the end of the seekable timerange
                if (duration === Infinity && seekable.length > 0) return seekable.end(seekable.length - 1);
                return duration;
            }
        },
        {
            key: "getCurrentTime",
            value: function getCurrentTime() {
                if (!this.player) return null;
                return this.player.currentTime;
            }
        },
        {
            key: "getSecondsLoaded",
            value: function getSecondsLoaded() {
                if (!this.player) return null;
                var buffered = this.player.buffered;
                if (buffered.length === 0) return 0;
                var end = buffered.end(buffered.length - 1);
                var duration = this.getDuration();
                if (end > duration) return duration;
                return end;
            }
        },
        {
            key: "getSource",
            value: function getSource(url) {
                var useHLS = this.shouldUseHLS(url);
                var useDASH = this.shouldUseDASH(url);
                var useFLV = this.shouldUseFLV(url);
                if (url instanceof Array || _utils.isMediaStream(url) || useHLS || useDASH || useFLV) return undefined;
                if (MATCH_DROPBOX_URL.test(url)) return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
                return url;
            }
        },
        {
            key: "render",
            value: function render() {
                var _this$props11 = this.props, url = _this$props11.url, playing = _this$props11.playing, loop = _this$props11.loop, controls = _this$props11.controls, muted = _this$props11.muted, config = _this$props11.config, width = _this$props11.width, height = _this$props11.height;
                var useAudio = this.shouldUseAudio(this.props);
                var Element1 = useAudio ? 'audio' : 'video';
                var style = {
                    width: width === 'auto' ? width : '100%',
                    height: height === 'auto' ? height : '100%'
                };
                return(/*#__PURE__*/ _react["default"].createElement(Element1, _extends({
                    ref: this.ref,
                    src: this.getSource(url),
                    style: style,
                    preload: "auto",
                    autoPlay: playing || undefined,
                    controls: controls,
                    muted: muted,
                    loop: loop
                }, config.attributes), url instanceof Array && url.map(this.renderSourceElement), config.tracks.map(this.renderTrack)));
            }
        }
    ]);
    return FilePlayer2;
}(_react.Component);
exports["default"] = FilePlayer1;
_defineProperty(FilePlayer1, "displayName", 'FilePlayer');
_defineProperty(FilePlayer1, "canPlay", _patterns.canPlay.file);

},{"react":"6TuXu","../utils":"dBiMp","../patterns":"jNNeN"}]},["2rAXy","gxs7s"], null, "parcelRequireb463")

//# sourceMappingURL=FilePlayer.be82868b.js.map
