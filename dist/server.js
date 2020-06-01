/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server-dev.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/server-dev.js":
/*!**********************************!*\
  !*** ./src/server/server-dev.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../webpack.dev.config.js */ \"./webpack.dev.config.js\");\n/* harmony import */ var _webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_3__);\n/*\n * Copyright 2018 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\"); you may not use this file except\n * in compliance with the License. You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software distributed under the\n * License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either\n * express or implied. See the License for the specific language governing permissions and\n * limitations under the License.\n */\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\n\n\n\n // Import the express lirbary\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n\nvar http = __webpack_require__(/*! http */ \"http\");\n\nvar https = __webpack_require__(/*! https */ \"https\");\n\nvar admin = __webpack_require__(/*! firebase-admin */ \"firebase-admin\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar app = express(),\n    DIST_DIR = __dirname,\n    INDEX_HTML_FILE = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(DIST_DIR, 'index.html'),\n    WELCOME_HTML_FILE = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(DIST_DIR, 'welcome.html'),\n    compiler = webpack__WEBPACK_IMPORTED_MODULE_1___default()(_webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_3___default.a); // Support JSON-encoded bodies.\n\napp.use(bodyParser.json()); // Support URL-encoded bodies.\n\napp.use(bodyParser.urlencoded({\n  extended: true\n})); // Support cookie manipulation.\n\napp.use(cookieParser()); // // If a user is signed in, redirect to profile page.\n// app.use(checkIfSignedIn('/',));\n// Serve static content from public folder.\n//app.use('/', express.static('public'));\n// Attach CSRF token on each request.\n\napp.use(attachCsrfToken('/', 'csrfToken', (Math.random() * 100000000000000000).toString()));\napp.use(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2___default()(compiler, {\n  publicPath: _webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_3___default.a.output.publicPath\n}));\n/**\n * Renders the profile page and serves it in the response.\n * @param {string} endpoint The get profile endpoint.\n * @param {!Object} req The expressjs request.\n * @param {!Object} res The expressjs response.\n * @param {!firebase.auth.DecodedIdToken} decodedClaims The decoded claims from verified\n *     session cookies.\n * @return {!Promise} A promise that resolves on success.\n */\n\nfunction serveContentForUser(endpoint, req, res, decodedClaims) {\n  // Lookup the user information corresponding to cookie and return the profile data for the user.\n  return admin.auth().getUser(decodedClaims.sub).then(function (userRecord) {\n    var html = '<!DOCTYPE html>' + '<html>' + '<meta charset=\"UTF-8\">' + '<link href=\"style.css\" rel=\"stylesheet\" type=\"text/css\" media=\"screen\" />' + '<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">' + '<title>Sample Profile Page</title>' + '<body>' + '<div id=\"container\">' + '  <h3>Welcome to CS9, ' + (userRecord.displayName || 'N/A') + '</h3>' + '  <div id=\"loaded\">' + '    <div id=\"main\">' + '      <div id=\"user-signed-in\">' + // Show user profile information.\n    '        <div id=\"user-info\">' + '          <div id=\"photo-container\">' + (userRecord.photoURL ? '      <img id=\"photo\" src=' + userRecord.photoURL + '>' : '') + '          </div>' + '          <div id=\"name\">' + userRecord.displayName + '</div>' + '          <div id=\"email\">' + userRecord.email + ' (' + (userRecord.emailVerified ? 'verified' : 'unverified') + ')</div>' + '          <div class=\"clearfix\"></div>' + '        </div>' + '        <p>' + // Append button for sign out.\n    '          <button id=\"sign-out\" onClick=\"window.location.assign(\\'/logout\\')\">Sign Out</button>' + // Append button for deletion.\n    '          <button id=\"delete-account\" onClick=\"window.location.assign(\\'/delete\\')\">' + 'Delete account</button>' + '        </p>' + '      </div>' + '    </div>' + '  </div>' + '</div>' + '</body>' + '</html>';\n    res.set('Content-Type', 'text/html');\n    res.end(html);\n  });\n}\n/**\n * Attaches a CSRF token to the request.\n * @param {string} url The URL to check.\n * @param {string} cookie The CSRF token name.\n * @param {string} value The CSRF token value to save.\n * @return {function} The middleware function to run.\n */\n\n\nfunction attachCsrfToken(url, cookie, value) {\n  return function (req, res, next) {\n    if (req.url == url) {\n      res.cookie(cookie, value);\n    }\n\n    next();\n  };\n}\n/**\n * Checks if a user is signed in and if so, redirects to profile page.\n * @param {string} url The URL to check if signed in.\n * @return {function} The middleware function to run.\n */\n\n\nfunction checkIfSignedIn(url) {\n  return function (req, res, next) {\n    if (req.url == url) {\n      var accessToken = res.credential.accessToken;\n      var sessionCookie = req.cookies.session || ''; // User already logged in. Redirect to profile page.\n\n      admin.auth().verifySessionCookie(sessionCookie).then(function (decodedClaims) {\n        res.redirect('/welcome.html?access_token=' + accessToken);\n      })[\"catch\"](function (error) {\n        next();\n      });\n    } else {\n      next();\n    }\n  };\n} // Initialize Admin SDK.\n\n\nadmin.initializeApp({\n  credential: admin.credential.cert('serviceAccountKeys.json')\n});\n/** Get profile endpoint. */\n\napp.get('/profile', function (req, res) {\n  // Get session cookie.\n  var sessionCookie = req.cookies.session || ''; // Get the session cookie and verify it. In this case, we are verifying if the\n  // Firebase session was revoked, user deleted/disabled, etc.\n\n  admin.auth().verifySessionCookie(sessionCookie, true\n  /** check if revoked. */\n  ).then(function (decodedClaims) {\n    // Serve content for signed in user.\n    return serveContentForUser('/profile', req, res, decodedClaims);\n  })[\"catch\"](function (error) {\n    // Force user to login.\n    res.redirect('/');\n  });\n});\n/** Session login endpoint. */\n\napp.post('/sessionLogin', function (req, res) {\n  // Get ID token and CSRF token.\n  var idToken = req.body.idToken.toString();\n  var csrfToken = req.body.csrfToken.toString();\n  console.log(\"csrf token on post for /sessionLogin: \" + csrfToken); // Guard against CSRF attacks.\n\n  if (!req.cookies || csrfToken !== req.cookies.csrfToken) {\n    res.status(401).send('UNAUTHORIZED REQUEST!');\n    return;\n  } // Set session expiration to 5 days.\n\n\n  var expiresIn = 60 * 60 * 24 * 5 * 1000; // Create the session cookie. This will also verify the ID token in the process.\n  // The session cookie will have the same claims as the ID token.\n  // We could also choose to enforce that the ID token auth_time is recent.\n\n  admin.auth().verifyIdToken(idToken).then(function (decodedClaims) {\n    // In this case, we are enforcing that the user signed in in the last 5 minutes.\n    if (new Date().getTime() / 1000 - decodedClaims.auth_time < 5 * 60) {\n      return admin.auth().createSessionCookie(idToken, {\n        expiresIn: expiresIn\n      });\n    }\n\n    throw new Error('UNAUTHORIZED REQUEST!');\n  }).then(function (sessionCookie) {\n    // Note httpOnly cookie will not be accessible from javascript.\n    // secure flag should be set to true in production.\n    var options = {\n      maxAge: expiresIn,\n      httpOnly: true,\n      secure: false\n      /** to test in localhost */\n\n    };\n    res.cookie('session', sessionCookie, options);\n    res.end(JSON.stringify({\n      status: 'success'\n    }));\n  })[\"catch\"](function (error) {\n    res.status(401).send('UNAUTHORIZED REQUEST!');\n  });\n});\n/** User signout endpoint. */\n\napp.get('/logout', function (req, res) {\n  // Clear cookie.\n  var sessionCookie = req.cookies.session || '';\n  res.clearCookie('session'); // Revoke session too. Note this will revoke all user sessions.\n\n  if (sessionCookie) {\n    admin.auth().verifySessionCookie(sessionCookie, true).then(function (decodedClaims) {\n      return admin.auth().revokeRefreshTokens(decodedClaims.sub);\n    }).then(function () {\n      // Redirect to login page on success.\n      res.redirect('/');\n    })[\"catch\"](function () {\n      // Redirect to login page on error.\n      res.redirect('/');\n    });\n  } else {\n    // Redirect to login page when no session cookie available.\n    res.redirect('/');\n  }\n});\n/** User delete endpoint. */\n\napp.get('/delete', function (req, res) {\n  var sessionCookie = req.cookies.session || '';\n  res.clearCookie('session');\n\n  if (sessionCookie) {\n    // Verify user and then delete the user.\n    admin.auth().verifySessionCookie(sessionCookie, true).then(function (decodedClaims) {\n      return admin.auth().deleteUser(decodedClaims.sub);\n    }).then(function () {\n      // Redirect to login page on success.\n      res.redirect('/');\n    })[\"catch\"](function () {\n      // Redirect to login page on error.\n      res.redirect('/');\n    });\n  } else {\n    // Redirect to login page when no session cookie available.\n    res.redirect('/');\n  }\n});\nvar PORT = process.env.PORT || 8080;\napp.listen(PORT, function () {\n  console.log(\"App listening to \".concat(PORT, \"....\"));\n  console.log('Press Ctrl+C to quit server.');\n});\n\n//# sourceURL=webpack:///./src/server/server-dev.js?");

/***/ }),

/***/ "./webpack.dev.config.js":
/*!*******************************!*\
  !*** ./webpack.dev.config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var path = __webpack_require__(/*! path */ \"path\");\n\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nvar HtmlWebPackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\n\nmodule.exports = {\n  mode: 'development',\n  entry: {\n    main: './src/index.js'\n  },\n  output: {\n    path: path.join(__dirname, 'dist'),\n    publicPath: '/',\n    filename: '[name].js'\n  },\n  target: 'web',\n  devtool: 'source-map',\n  module: {\n    rules: [{\n      // Transpiles ES6-8 into ES5\n      test: /\\.(js|jsx)$/,\n      exclude: /node_modules/,\n      loader: \"babel-loader\"\n    }, {\n      // Loads the javacript into html template provided.\n      // Entry point is set below in HtmlWebPackPlugin in Plugins\n      test: /\\.html$/,\n      use: [{\n        loader: \"html-loader\" //options: { minimize: true }\n\n      }]\n    }, {\n      // Loads CSS into a file when you import it via Javascript\n      // Rules are set in MiniCssExtractPlugin\n      test: /\\.(sa|sc|c)ss$/,\n      use: [{\n        // Adds CSS to the DOM by injecting a `<style>` tag\n        loader: 'style-loader'\n      }, // Interprets `@import` and `url()` like `import/require()` and will resolve them\n      {\n        loader: 'css-loader'\n      }, {\n        // Loader for webpack to process CSS with PostCSS\n        loader: 'postcss-loader',\n        options: {\n          plugins: function plugins() {\n            return [__webpack_require__(/*! precss */ \"precss\"), __webpack_require__(/*! autoprefixer */ \"autoprefixer\")];\n          }\n        }\n      }, {\n        // Loads a SASS/SCSS file and compiles it to CSS\n        loader: 'sass-loader'\n      }]\n    }, {\n      test: /\\.(png|svg|jpg|gif)$/,\n      use: ['file-loader']\n    }]\n  },\n  plugins: [new HtmlWebPackPlugin({\n    template: \"./src/html/index.html\",\n    filename: \"./index.html\",\n    excludeChunks: ['server']\n  }), new HtmlWebPackPlugin({\n    template: \"./src/html/welcome.html\",\n    filename: \"./welcome.html\",\n    excludeChunks: ['server']\n  }), new webpack.NoEmitOnErrorsPlugin()]\n};\n\n//# sourceURL=webpack:///./webpack.dev.config.js?");

/***/ }),

/***/ "autoprefixer":
/*!*******************************!*\
  !*** external "autoprefixer" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"autoprefixer\");\n\n//# sourceURL=webpack:///external_%22autoprefixer%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "firebase-admin":
/*!*********************************!*\
  !*** external "firebase-admin" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"firebase-admin\");\n\n//# sourceURL=webpack:///external_%22firebase-admin%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//# sourceURL=webpack:///external_%22https%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "precss":
/*!*************************!*\
  !*** external "precss" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"precss\");\n\n//# sourceURL=webpack:///external_%22precss%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ })

/******/ });