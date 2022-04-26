/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_ocean_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_ocean_jpg__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Colors:\n- #A9C1D2 light steel blue\n- #FFFFFF plain white\n- #949D6A moss green\n- #2F2A3A raisin black */\n\n/* BODY  */\n* {\n  font-family: 'Quicksand', sans-serif;\n  margin: 0;\n}\n\nbody {\n  align-items: center;\n  background-color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  justify-content: flex-start;\n  width: 100vw;\n}\n\nmain {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n}\n\n.user-bookings, .possible-bookings {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: center;\n  overflow: auto;\n}\n\nh2 {\n  font-size: 30px;\n  margin: 40px 0px 40px 0px;\n  text-align: center;\n}\n\n/* HEADER  */\nh1 {\n  color: #2F2A3A;\n  font-size: 70px;\n  margin: 100px 100px 15px 100px;\n  text-align: center;\n}\n\nh3 {\n  font-size: 22px;\n  margin-bottom: 5px;\n  margin-top: 105px;\n}\n\nh4 {\n  font-size: 20px;\n  text-align: center;\n}\n\nheader {\n  align-items: flex-end;\n  background-color: #A9C1D2;\n  display: flex;\n  height: 24%;\n  justify-content: space-around;\n  margin: 0;\n  width: 100%;\n}\n\nbutton {\n  background-color: #2F2A3A;\n  border: none;\n  border-radius: 5px;\n  color: #FFFFFF;\n  height: 40px;\n  margin-bottom: 20px;\n  width: 120px;\n}\n\nbutton:hover {\n  cursor: pointer;\n  transform: scale(1.06);\n  transition: .6s;\n}\n\n.user-total-spent {\n  font-size: 20px;\n  margin-bottom: 15px;\n}\n\n.user-money {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n}\n\nlabel {\n  margin-bottom: 10px;\n}\n\n.search-fields {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  margin-bottom: -5px;\n}\n\n.inputs {\n  display: flex;\n  margin-bottom: 15px;\n}\n\n.calendar, .room-filter {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  padding: 10px;\n}\n\n/* MAIN  */\n.filter-subheading, .followup, .error {\n  font-size: 30px;\n  margin-top: 20px;\n  text-align: center;\n}\n\n.load-error {\n  color: red;\n  text-align: center;\n}\n\n.followup {\n  font-size: 20px;\n}\n\n.booking-thumbnail, .to-book-thumbnail {\n  align-items: center;\n  background-color: #A9C1D2;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);\n  display: flex;\n  flex-direction: column;\n  height: 200px;\n  justify-content: center;\n  margin: 20px;\n  width: 300px;\n}\n\n.to-book-thumbnail {\n  height: 300px;\n}\n\n.booking-info, .to-book-info, .book-button-display, .book-button-display {\n  align-items: center;\n  background-color: #FFFFFF;\n  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);\n  display: flex;\n  flex-direction: column;\n  height: 60%;\n  justify-content: center;\n  opacity: 0.8;\n  padding: 10px;\n  width: 68%;\n}\n\n.to-book-info {\n  margin-top: 15px;\n}\n\n.booked {\n  font-size: 22px;\n  margin-top: 15px;\n  text-align: center;\n}\n\n.filter-button {\n  height: 30px;\n  margin-left: 20px;\n  margin-top: 25px;\n  padding: 5px;\n  width: 60px;\n}\n\n.book-button {\n  background-color: #FFFFFF;\n  color: #2F2A3A;\n  font-size: 20px;\n  margin-top: 15px;\n}\n\n.login-page {\n  background-size: cover;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.4);\n  display: flex;\n  height: 100vh;\n  justify-content: center;\n  width: 100vw;\n}\n\n.login-form {\n  align-items: center;\n  background-color: #dce3e6;\n  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.4);\n  display: flex;\n  flex-direction: column;\n  height: 400px;\n  justify-content: center;\n  margin-top: 100px;\n  opacity: 1;\n  width: 600px;\n}\n\n.form-styling {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  height: 300px;\n  opacity: 1;\n  width: 200px;\n}\n\n.form-label {\n  font-size: 20px;\n  margin-top: 15px;\n}\n\n.form-heading {\n  font-size: 40px;\n  margin-bottom: 25px;\n}\n\n.login {\n  margin-top: 25px;\n}\n\n.user-error {\n  color: red;\n  text-align: center;\n}\n\n.hidden {\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;;;;wBAIwB;;AAExB,UAAU;AACV;EACE,oCAAoC;EACpC,SAAS;AACX;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,aAAa;EACb,2BAA2B;EAC3B,YAAY;AACd;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,uBAAuB;EACvB,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,yBAAyB;EACzB,kBAAkB;AACpB;;AAEA,YAAY;AACZ;EACE,cAAc;EACd,eAAe;EACf,8BAA8B;EAC9B,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;EACrB,yBAAyB;EACzB,aAAa;EACb,WAAW;EACX,6BAA6B;EAC7B,SAAS;EACT,WAAW;AACb;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,kBAAkB;EAClB,cAAc;EACd,YAAY;EACZ,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,eAAe;EACf,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,2BAA2B;EAC3B,aAAa;AACf;;AAEA,UAAU;AACV;EACE,eAAe;EACf,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,yDAA4C;EAC5C,sBAAsB;EACtB,2CAA2C;EAC3C,aAAa;EACb,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,2CAA2C;EAC3C,aAAa;EACb,sBAAsB;EACtB,WAAW;EACX,uBAAuB;EACvB,YAAY;EACZ,aAAa;EACb,UAAU;AACZ;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,iBAAiB;EACjB,gBAAgB;EAChB,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,sBAAsB;EACtB,yDAA4C;EAC5C,2CAA2C;EAC3C,aAAa;EACb,aAAa;EACb,uBAAuB;EACvB,YAAY;AACd;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,2CAA2C;EAC3C,aAAa;EACb,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,iBAAiB;EACjB,UAAU;EACV,YAAY;AACd;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,aAAa;EACb,UAAU;EACV,YAAY;AACd;;AAEA;EACE,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,aAAa;AACf","sourcesContent":["/* Colors:\n- #A9C1D2 light steel blue\n- #FFFFFF plain white\n- #949D6A moss green\n- #2F2A3A raisin black */\n\n/* BODY  */\n* {\n  font-family: 'Quicksand', sans-serif;\n  margin: 0;\n}\n\nbody {\n  align-items: center;\n  background-color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  justify-content: flex-start;\n  width: 100vw;\n}\n\nmain {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n}\n\n.user-bookings, .possible-bookings {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: center;\n  overflow: auto;\n}\n\nh2 {\n  font-size: 30px;\n  margin: 40px 0px 40px 0px;\n  text-align: center;\n}\n\n/* HEADER  */\nh1 {\n  color: #2F2A3A;\n  font-size: 70px;\n  margin: 100px 100px 15px 100px;\n  text-align: center;\n}\n\nh3 {\n  font-size: 22px;\n  margin-bottom: 5px;\n  margin-top: 105px;\n}\n\nh4 {\n  font-size: 20px;\n  text-align: center;\n}\n\nheader {\n  align-items: flex-end;\n  background-color: #A9C1D2;\n  display: flex;\n  height: 24%;\n  justify-content: space-around;\n  margin: 0;\n  width: 100%;\n}\n\nbutton {\n  background-color: #2F2A3A;\n  border: none;\n  border-radius: 5px;\n  color: #FFFFFF;\n  height: 40px;\n  margin-bottom: 20px;\n  width: 120px;\n}\n\nbutton:hover {\n  cursor: pointer;\n  transform: scale(1.06);\n  transition: .6s;\n}\n\n.user-total-spent {\n  font-size: 20px;\n  margin-bottom: 15px;\n}\n\n.user-money {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n}\n\nlabel {\n  margin-bottom: 10px;\n}\n\n.search-fields {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  margin-bottom: -5px;\n}\n\n.inputs {\n  display: flex;\n  margin-bottom: 15px;\n}\n\n.calendar, .room-filter {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  padding: 10px;\n}\n\n/* MAIN  */\n.filter-subheading, .followup, .error {\n  font-size: 30px;\n  margin-top: 20px;\n  text-align: center;\n}\n\n.load-error {\n  color: red;\n  text-align: center;\n}\n\n.followup {\n  font-size: 20px;\n}\n\n.booking-thumbnail, .to-book-thumbnail {\n  align-items: center;\n  background-color: #A9C1D2;\n  background-image: url(\"../images/ocean.jpg\");\n  background-size: cover;\n  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);\n  display: flex;\n  flex-direction: column;\n  height: 200px;\n  justify-content: center;\n  margin: 20px;\n  width: 300px;\n}\n\n.to-book-thumbnail {\n  height: 300px;\n}\n\n.booking-info, .to-book-info, .book-button-display, .book-button-display {\n  align-items: center;\n  background-color: #FFFFFF;\n  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);\n  display: flex;\n  flex-direction: column;\n  height: 60%;\n  justify-content: center;\n  opacity: 0.8;\n  padding: 10px;\n  width: 68%;\n}\n\n.to-book-info {\n  margin-top: 15px;\n}\n\n.booked {\n  font-size: 22px;\n  margin-top: 15px;\n  text-align: center;\n}\n\n.filter-button {\n  height: 30px;\n  margin-left: 20px;\n  margin-top: 25px;\n  padding: 5px;\n  width: 60px;\n}\n\n.book-button {\n  background-color: #FFFFFF;\n  color: #2F2A3A;\n  font-size: 20px;\n  margin-top: 15px;\n}\n\n.login-page {\n  background-size: cover;\n  background-image: url(\"../images/ocean.jpg\");\n  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.4);\n  display: flex;\n  height: 100vh;\n  justify-content: center;\n  width: 100vw;\n}\n\n.login-form {\n  align-items: center;\n  background-color: #dce3e6;\n  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.4);\n  display: flex;\n  flex-direction: column;\n  height: 400px;\n  justify-content: center;\n  margin-top: 100px;\n  opacity: 1;\n  width: 600px;\n}\n\n.form-styling {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  height: 300px;\n  opacity: 1;\n  width: 200px;\n}\n\n.form-label {\n  font-size: 20px;\n  margin-top: 15px;\n}\n\n.form-heading {\n  font-size: 40px;\n  margin-bottom: 25px;\n}\n\n.login {\n  margin-top: 25px;\n}\n\n.user-error {\n  color: red;\n  text-align: center;\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/ocean.jpg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bookingsPromise": () => (/* binding */ bookingsPromise),
/* harmony export */   "roomsPromise": () => (/* binding */ roomsPromise),
/* harmony export */   "postBooking": () => (/* binding */ postBooking),
/* harmony export */   "getPromise": () => (/* binding */ getPromise),
/* harmony export */   "loadError": () => (/* binding */ loadError)
/* harmony export */ });
let loadError = document.querySelector('.load-error');

let getPromise = (url) => {
  return fetch(url)
  .then(response => response.json())
  .catch(err => {
    loadError.innerText = 'we\'re so sorry - there was an error loading your data, please try again later';
  });
};

let bookingsPromise = getPromise(`http://localhost:3001/api/v1/bookings`);
let roomsPromise = getPromise(`http://localhost:3001/api/v1/rooms`);

let postBooking = (bookingObj) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingObj)
  })
};




/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Room_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


class User {
  constructor(userObj) {
    this.id = userObj.id;
    this.name = userObj.name;
    this.bookingsIds = [];
    this.bookedRoomsInfo = [];
    this.totalSpent = 0;
  }

  addBookingsIds(bookings) {
    let ids = [];
    this.bookingsIds = [];

    bookings.forEach(reservation => {
      if (reservation.userID === this.id && !ids.includes(reservation.id)) {
        ids.push(reservation.id);
        this.bookingsIds.push(reservation);
      };
    });
  };

  addBookedRoomInfo(rooms) {
    let allRooms = [];
    let bookedRooms = [];

    rooms.forEach(room => {
      allRooms.push(new _Room_js__WEBPACK_IMPORTED_MODULE_0__.default(room));
    });

    this.bookingsIds.forEach(room => {
      allRooms.forEach(room2 => {
        if (room.roomNumber === room2.number) {
          bookedRooms.push(room2);
          room2.date = room.date;
          room2.bookingID = room.id;
        }
      });
    });
    this.bookedRoomsInfo = bookedRooms;
  };

  calculateTotalSpent(rooms) {
    this.totalSpent = 0;
    rooms.forEach(room => {
      this.bookingsIds.forEach(booking => {
        if (booking.roomNumber === room.number) {
          this.totalSpent += room.costPerNight;
        };
      });
    });
    this.totalSpent = this.totalSpent.toFixed(2);
    this.totalSpent = Number(this.totalSpent);
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Room {
  constructor(roomObj) {
    this.number = roomObj.number;
    this.type = roomObj.roomType;
    this.numBeds = roomObj.numBeds;
    this.bedSize = roomObj.bedSize;
    this.bidet = roomObj.bidet;
    this.costPerNight = roomObj.costPerNight;
    this.date = '';
    this.bookingID = '';
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Room);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Hotel {
  constructor(bookings, rooms) {
    this.allBookings = bookings;
    this.allRooms = rooms;
    this.roomsAvailByDate = [];
    this.roomsAvailByDateAndType = [];
  };

  checkForRoomsByDate(dateInput){
    let roomsBookedOnDay = [];
    let notAvailOnDate = [];
    let availOnDate = [];

    this.allBookings.forEach(booking => {
      if (booking.date === dateInput) {
        roomsBookedOnDay.push(booking);
      };
    });

    roomsBookedOnDay.forEach(booking => {
      if (!notAvailOnDate.includes(booking.roomNumber)) {
        notAvailOnDate.push(booking.roomNumber);
      };
    });

    this.allRooms.forEach(room => {
      if (!notAvailOnDate.includes(room.number)) {
        availOnDate.push(room);
      };
    });
    this.roomsAvailByDate = availOnDate;
  };

  checkForRoomsByDateAndType(typeInput, dateInput) {
    this.roomsAvailByDateAndType = [];
    let availDateAndType = [];

    this.checkForRoomsByDate(dateInput);

    if (typeInput === 'any') {
      this.roomsAvailByDateAndType = this.roomsAvailByDate;
    } else if (typeInput === 'suite') {
      this.roomsAvailByDate.forEach(room => {
        if (room.roomType === 'suite') {
          availDateAndType.push(room);
          this.roomsAvailByDateAndType = availDateAndType;
        }
      });
    } else if (typeInput === 'junior' || typeInput === 'residential' || typeInput === 'single') {
      this.roomsAvailByDate.forEach(room => {
        if (room.roomType.includes(typeInput)) {
          availDateAndType.push(room);
          this.roomsAvailByDateAndType = availDateAndType;
        };
      });
    };
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hotel);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _classes_User_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _classes_Hotel_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);





// Variables -------------------------------------------------------------------
let usersData;
let bookingsData;
let roomsData;
let currentUser;
let currentHotel;
let roomNumber;

// Query Selectors -------------------------------------------------------------
let userSum = document.querySelector('.user-total-spent');
let userMoney = document.querySelector('.user-money');
let userName = document.querySelector('.user-name');
let userBookingsThumbnails = document.querySelector('.user-bookings');
let bookPageButton = document.querySelector('.book-page-button');
let homePageButton = document.querySelector('.home-page-button');
let homePage = document.querySelector('.homepage');
let bookPage = document.querySelector('.book-page');
let greeting = document.querySelector('.greeting');
let searchFields = document.querySelector('.search-fields');
let dateInput = document.querySelector('input[type="date"]');
let filterButton = document.querySelector('.filter-button');
let possibleBookings = document.querySelector('.possible-bookings');
let emptySearchMessage = document.querySelector('.filter-subheading');
let followUp = document.querySelector('.followup');
let errorMessage = document.querySelector('.error');
let loginButton = document.querySelector('.login');
let username = document.querySelector('.username');
let password = document.querySelector('.password');
let userError = document.querySelector('.user-error');
let loginPage = document.querySelector('.login-page');
let header = document.querySelector('.header');

// Event Listeners -------------------------------------------------------------
bookPageButton.addEventListener('click', function() {
  renderBookingsPage();
});

homePageButton.addEventListener('click', function() {
  renderHomePage();
});

filterButton.addEventListener('click', function() {
  renderFilteredBookings();
});

possibleBookings.addEventListener('click', function(e) {
  event.preventDefault();
  if (e.target.classList.contains('book-button')) {
    updateBookingText(e.target.id);
    postToBookings(e.target.id);
  };
});

loginButton.addEventListener('click', function() {
  checkLogin();
});

// Event Handlers and Functions ------------------------------------------------
const showElement = elements => {
  elements.forEach(element => element.classList.remove("hidden"));
};

const hideElement = elements => {
  elements.forEach(element => element.classList.add("hidden"));
};

const loadInfo = () => {
  Promise.all(
    [
      (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.getPromise)(`http://localhost:3001/api/v1/customers/${findCustomerNum()}`),
      _apiCalls__WEBPACK_IMPORTED_MODULE_1__.bookingsPromise,
      _apiCalls__WEBPACK_IMPORTED_MODULE_1__.roomsPromise
    ]
  )
  .then(jsonArray => {
    usersData = jsonArray[0];
    bookingsData = jsonArray[1].bookings;
    roomsData = jsonArray[2].rooms;
    currentUser = new _classes_User_js__WEBPACK_IMPORTED_MODULE_2__.default(usersData);
    currentHotel = new _classes_Hotel_js__WEBPACK_IMPORTED_MODULE_3__.default(bookingsData, roomsData);
  })
  .then(result => {
    populateUserBookings(bookingsData);
    updateRoomInfo(roomsData);
    findUserTotalCost(roomsData);
    updateUserSum();
    updateUserName();
    displayBookedThumbnails();
    hideLogin();
  });
};

const renderBookingsPage = () => {
  findRoomsAvail();
  toggleBookPage();
  emptySearchMessage.innerText = '';
  followUp.innerText = '';
};

const renderHomePage = () => {
  updateUserSum();
  updateUserName();
  displayBookedThumbnails();
  hideElement([bookPage, homePageButton, searchFields]);
  showElement([homePage, bookPageButton, greeting, userMoney]);
};

const renderFilteredBookings = () => {
  event.preventDefault();
  findRoomsAvail();
  displayPossibleBookings();
};

const populateUserBookings = (bookings) => {
  currentUser.addBookingsIds(bookingsData);
  currentUser.addBookedRoomInfo(roomsData);
};

const findUserTotalCost = (rooms) => {
  currentUser.calculateTotalSpent(roomsData);
};

const updateUserSum = () => {
  userSum.innerText = `$${currentUser.totalSpent}`;
};

const updateUserName = () => {
  let name = currentUser.name.split(' ');
  let firstName = name[0];
  firstName = firstName.toLowerCase();
  userName.innerText = firstName;
};

const updateRoomInfo = (rooms) => {
  currentUser.addBookedRoomInfo(rooms);
};

const displayBookedThumbnails = () => {
  let bookingsHTML = "";
  currentUser.bookedRoomsInfo.forEach((booking) => {
    bookingsHTML += `<div class="booking-thumbnail" id=${booking.id}>
                <div class="booking-info">
                <p>room number: ${booking.number}</p>
                <p>date: ${booking.date}</p>
                <p>room type: ${booking.type}</p>
                <p>cost per night: $${booking.costPerNight}</p>
                </div>
                </div>`;
  });
  userBookingsThumbnails.innerHTML = bookingsHTML;
};

const toggleBookPage = () => {
  hideElement([bookPageButton, homePage, userMoney, greeting]);
  showElement([homePageButton, bookPage, searchFields]);
};

const findRoomsAvail = () => {
  let date = dateInput.value;
  date = date.split('-');
  date = date.join('/');
  let type = document.querySelector('#select1');
  type = type.value;
  currentHotel.checkForRoomsByDateAndType(type, date);
  displayPossibleBookings();
};

const displayPossibleBookings = () => {
  emptySearchMessage.innerText = '';
  followUp.innerText = '';
  let bookingsHTML = '';
  currentHotel.roomsAvailByDateAndType.forEach((room) => {
    bookingsHTML += `<div class="to-book-thumbnail">
                <div class="to-book-info room${room.number}" id=${room.number}>
                <p>room number: ${room.number}</p>
                <p>room type: ${room.roomType}</p>
                <p>number of beds: ${room.numBeds}</p>
                <p>bed size: ${room.bedSize}</p>
                <p>bidet: ${room.bidet}</p>
                <p>cost per night: $${room.costPerNight}</p>
                </div>
                <button class="book-button" id="btn${room.number}">book now</button>
                </div>`;
  });

  possibleBookings.innerHTML = bookingsHTML;

  if (currentHotel.roomsAvailByDateAndType.length === 0) {
    emptySearchMessage.innerText = 'we apologize - there are no rooms that match your current search';
    followUp.innerText = 'please change your seach parameters and try again!';
  };
};

const findIdHelper = (id) => {
  let newId = id.split('');
  let idToPass = newId.reduce((acc, letter) => {
    if (letter !== 'b' && letter !== 't' && letter !== 'n') {
      acc.push(letter);
    }
    return acc;
  }, []);
  let finalId = idToPass.join('');
  return finalId;
};

const updateBookingText = (id) => {
  let newId = findIdHelper(id);
  let textToChange = document.getElementById(`${newId}`);
  textToChange.innerHTML += `<p class="booked">you've booked this room!</p>`;

  let currentButton = document.getElementById(`${id}`);
  hideElement([currentButton]);
};

const postToBookings = (id) => {
  let date = dateInput.value;
  date = date.split('-');
  date = date.join('/');
  roomNumber = findIdHelper(id);
  roomNumber = Number(roomNumber);
  let obj = { "userID": currentUser.id, "date": date, "roomNumber": roomNumber };

  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.postBooking)(obj).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then((booking) => {
    errorMessage.innerText = '';
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.getPromise)(`http://localhost:3001/api/v1/bookings`)
    .then(jsonArray => {
      bookingsData = jsonArray.bookings;
      currentHotel = new _classes_Hotel_js__WEBPACK_IMPORTED_MODULE_3__.default(bookingsData, roomsData);
      populateUserBookings(bookingsData);
      updateRoomInfo(roomsData);
      findUserTotalCost(roomsData);
    })
    .catch(error => {
      errorMessage.innerText = 'we\'re sorry - there was a problem booking your room';
    });
  });
};

const checkLogin = () => {
  let num = findCorrectUsername();
  checkCustomerPassword();
  if (num > 0 && num < 51 && checkCustomerPassword() === true) {
    userError.innerText = '';
    loadInfo();
  } else {
    userError.innerText = 'please enter a valid username and password';
  };
};

const findCorrectUsername = () => {
  if (username.value.includes('customer')) {
    userError.innerText = '';
    return findCustomerNum();
  } else if (username.value.includes('manager')) {
    // allow for manager functionality here
  } else {
    userError.innerText = 'please enter a valid username and password';
  }
};

const findCustomerNum = () => {
  let userNum = username.value;
  userNum = userNum.split('');
  userNum.splice(0, 8);

  if (userNum[0] === '0') {
    userNum.splice(0, 1)
  }

  userNum = userNum.join('');

  if (userNum > 0 && userNum < 51) {
    userError.innerText = '';
    return userNum;
  } else {
    userError.innerText = 'please enter a valid username and password';
    return false;
  }
};

const checkCustomerPassword = () => {
  if (password.value === 'overlook2021') {
    return true;
  } else {
    return false;
  }
};

const hideLogin = () => {
  hideElement([loginPage]);
  showElement([header, homePage]);
};


// Manager page pseudocoding:
// First, build in functionality for a manager to login, and attach a different Fetch request to fire if it is a manager who logged in
// This different fetch request would need to get the same bookings and rooms data, but would need to fetch ALL users, instead of just a single user
// From there, load an empty dashboard and no bookings page functionality, styling should be very similar to user page
// I don't know if I want to change the inner html of the existing page, or build out an entire new page - will keep brainstorming?

// On the home page: Figure out how to check if the booking date has already passed and change the opacity of the thumbnail for bookings that HAVE already passed

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map