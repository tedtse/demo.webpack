/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var imageQueue = [
	    'logo_123.png',
	    'logo_aiqiyi.png',
	    'logo_letv.png',
	    'logo_xl.png'
	];

	var imageList = document.querySelector('.image-list');
	var tpl = '';
	imageQueue.forEach(function (image) {
	    var src = __webpack_require__(1)("./" + image);
	    tpl += '<li><img src="' + src + '" /></li>';
	});
	imageList.innerHTML = tpl;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./logo_123.png": 2,
		"./logo_aiqiyi.png": 3,
		"./logo_letv.png": 4,
		"./logo_xl.png": 5,
		"./spr_load_bird.png": 6
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/images/549c5f7e8f6d8b77ace9002f235aa434.png";

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/images/3bbbf0f95213c9f2af4dbb6cbc3188e0.png";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/images/c9e9cdbb1ee18ff02250209f05e183ca.png";

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/images/aa97ada109968fa21ea341f186f9bc72.png";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/images/7a7445aa4a65d90e0103ecda49f72cc8.png";

/***/ }
/******/ ]);