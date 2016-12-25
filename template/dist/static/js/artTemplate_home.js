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

	__webpack_require__(1);
	var template = __webpack_require__(5);
	var tpl = __webpack_require__(10);
	var data = [
	    {
	        title: 'The Data'
	    },
	    {
	        title: 'The Template'
	    },
	    {
	        title: 'The Result'
	    }
	];
	var render = template.compile(tpl);
	document.querySelector('article ul').innerHTML = render({data, data});



/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * artTemplate[NodeJS]
	 * https://github.com/aui/artTemplate
	 * Released under the MIT, BSD, and GPL Licenses
	 */

	var node = __webpack_require__(6);
	var template = __webpack_require__(9);
	module.exports = node(template);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var path = __webpack_require__(7);

	module.exports = function (template) {

		var cacheStore = template.cache;
		var defaults = template.defaults;
		var rExtname;

		// 提供新的配置字段
		defaults.base = '';
		defaults.extname = '.html';
		defaults.encoding = 'utf-8';

		function compileFromFS(filename) {
			// 加载模板并编译
			var source = readTemplate(filename);

			if (typeof source === 'string') {
				return template.compile(source, {
					filename: filename
				});
			}
		}

		// 重写引擎编译结果获取方法
		template.get = function (filename) {
			
		    var fn;


		    if (cacheStore.hasOwnProperty(filename)) {
		        // 使用内存缓存
		        fn = cacheStore[filename];
		    } else {
				fn = compileFromFS(filename);
		    }

		    return fn;
		};

		
		function readTemplate (id) {
		    id = path.join(defaults.base, id + defaults.extname);
		    
		    if (id.indexOf(defaults.base) !== 0) {
		        // 安全限制：禁止超出模板目录之外调用文件
		        throw new Error('"' + id + '" is not in the template directory');
		    } else {
		        try {
		            return fs.readFileSync(id, defaults.encoding);
		        } catch (e) {}
		    }
		}


		// 重写模板`include``语句实现方法，转换模板为绝对路径
		template.utils.$include = function (filename, data, from) {
		    
		    from = path.dirname(from);
		    filename = path.join(from, filename);
		    
		    return template.renderFile(filename, data);
		}


		// express support
		template.__express = function (file, options, fn) {

		    if (typeof options === 'function') {
		        fn = options;
		        options = {};
		    }


			if (!rExtname) {
				// 去掉 express 传入的路径
				rExtname = new RegExp((defaults.extname + '$').replace(/\./g, '\\.'));
			}


		    file = file.replace(rExtname, '');

		    options.filename = file;
		    fn(null, template.renderFile(file, options));
		};


		return template;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 8 */
/***/ function(module, exports) {

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

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * artTemplate - Template Engine
	 * https://github.com/aui/artTemplate
	 * Released under the MIT, BSD, and GPL Licenses
	 */
	 
	!(function () {


	/**
	 * 模板引擎
	 * @name    template
	 * @param   {String}            模板名
	 * @param   {Object, String}    数据。如果为字符串则编译并缓存编译结果
	 * @return  {String, Function}  渲染好的HTML字符串或者渲染方法
	 */
	var template = function (filename, content) {
	    return typeof content === 'string'
	    ?   compile(content, {
	            filename: filename
	        })
	    :   renderFile(filename, content);
	};


	template.version = '3.0.0';


	/**
	 * 设置全局配置
	 * @name    template.config
	 * @param   {String}    名称
	 * @param   {Any}       值
	 */
	template.config = function (name, value) {
	    defaults[name] = value;
	};



	var defaults = template.defaults = {
	    openTag: '<%',    // 逻辑语法开始标签
	    closeTag: '%>',   // 逻辑语法结束标签
	    escape: true,     // 是否编码输出变量的 HTML 字符
	    cache: true,      // 是否开启缓存（依赖 options 的 filename 字段）
	    compress: false,  // 是否压缩输出
	    parser: null      // 自定义语法格式器 @see: template-syntax.js
	};


	var cacheStore = template.cache = {};


	/**
	 * 渲染模板
	 * @name    template.render
	 * @param   {String}    模板
	 * @param   {Object}    数据
	 * @return  {String}    渲染好的字符串
	 */
	template.render = function (source, options) {
	    return compile(source)(options);
	};


	/**
	 * 渲染模板(根据模板名)
	 * @name    template.render
	 * @param   {String}    模板名
	 * @param   {Object}    数据
	 * @return  {String}    渲染好的字符串
	 */
	var renderFile = template.renderFile = function (filename, data) {
	    var fn = template.get(filename) || showDebugInfo({
	        filename: filename,
	        name: 'Render Error',
	        message: 'Template not found'
	    });
	    return data ? fn(data) : fn;
	};


	/**
	 * 获取编译缓存（可由外部重写此方法）
	 * @param   {String}    模板名
	 * @param   {Function}  编译好的函数
	 */
	template.get = function (filename) {

	    var cache;
	    
	    if (cacheStore[filename]) {
	        // 使用内存缓存
	        cache = cacheStore[filename];
	    } else if (typeof document === 'object') {
	        // 加载模板并编译
	        var elem = document.getElementById(filename);
	        
	        if (elem) {
	            var source = (elem.value || elem.innerHTML)
	            .replace(/^\s*|\s*$/g, '');
	            cache = compile(source, {
	                filename: filename
	            });
	        }
	    }

	    return cache;
	};


	var toString = function (value, type) {

	    if (typeof value !== 'string') {

	        type = typeof value;
	        if (type === 'number') {
	            value += '';
	        } else if (type === 'function') {
	            value = toString(value.call(value));
	        } else {
	            value = '';
	        }
	    }

	    return value;

	};


	var escapeMap = {
	    "<": "&#60;",
	    ">": "&#62;",
	    '"': "&#34;",
	    "'": "&#39;",
	    "&": "&#38;"
	};


	var escapeFn = function (s) {
	    return escapeMap[s];
	};

	var escapeHTML = function (content) {
	    return toString(content)
	    .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
	};


	var isArray = Array.isArray || function (obj) {
	    return ({}).toString.call(obj) === '[object Array]';
	};


	var each = function (data, callback) {
	    var i, len;        
	    if (isArray(data)) {
	        for (i = 0, len = data.length; i < len; i++) {
	            callback.call(data, data[i], i, data);
	        }
	    } else {
	        for (i in data) {
	            callback.call(data, data[i], i);
	        }
	    }
	};


	var utils = template.utils = {

		$helpers: {},

	    $include: renderFile,

	    $string: toString,

	    $escape: escapeHTML,

	    $each: each
	    
	};/**
	 * 添加模板辅助方法
	 * @name    template.helper
	 * @param   {String}    名称
	 * @param   {Function}  方法
	 */
	template.helper = function (name, helper) {
	    helpers[name] = helper;
	};

	var helpers = template.helpers = utils.$helpers;




	/**
	 * 模板错误事件（可由外部重写此方法）
	 * @name    template.onerror
	 * @event
	 */
	template.onerror = function (e) {
	    var message = 'Template Error\n\n';
	    for (var name in e) {
	        message += '<' + name + '>\n' + e[name] + '\n\n';
	    }
	    
	    if (typeof console === 'object') {
	        console.error(message);
	    }
	};


	// 模板调试器
	var showDebugInfo = function (e) {

	    template.onerror(e);
	    
	    return function () {
	        return '{Template Error}';
	    };
	};


	/**
	 * 编译模板
	 * 2012-6-6 @TooBug: define 方法名改为 compile，与 Node Express 保持一致
	 * @name    template.compile
	 * @param   {String}    模板字符串
	 * @param   {Object}    编译选项
	 *
	 *      - openTag       {String}
	 *      - closeTag      {String}
	 *      - filename      {String}
	 *      - escape        {Boolean}
	 *      - compress      {Boolean}
	 *      - debug         {Boolean}
	 *      - cache         {Boolean}
	 *      - parser        {Function}
	 *
	 * @return  {Function}  渲染方法
	 */
	var compile = template.compile = function (source, options) {
	    
	    // 合并默认配置
	    options = options || {};
	    for (var name in defaults) {
	        if (options[name] === undefined) {
	            options[name] = defaults[name];
	        }
	    }


	    var filename = options.filename;


	    try {
	        
	        var Render = compiler(source, options);
	        
	    } catch (e) {
	    
	        e.filename = filename || 'anonymous';
	        e.name = 'Syntax Error';

	        return showDebugInfo(e);
	        
	    }
	    
	    
	    // 对编译结果进行一次包装

	    function render (data) {
	        
	        try {
	            
	            return new Render(data, filename) + '';
	            
	        } catch (e) {
	            
	            // 运行时出错后自动开启调试模式重新编译
	            if (!options.debug) {
	                options.debug = true;
	                return compile(source, options)(data);
	            }
	            
	            return showDebugInfo(e)();
	            
	        }
	        
	    }
	    

	    render.prototype = Render.prototype;
	    render.toString = function () {
	        return Render.toString();
	    };


	    if (filename && options.cache) {
	        cacheStore[filename] = render;
	    }

	    
	    return render;

	};




	// 数组迭代
	var forEach = utils.$each;


	// 静态分析模板变量
	var KEYWORDS =
	    // 关键字
	    'break,case,catch,continue,debugger,default,delete,do,else,false'
	    + ',finally,for,function,if,in,instanceof,new,null,return,switch,this'
	    + ',throw,true,try,typeof,var,void,while,with'

	    // 保留字
	    + ',abstract,boolean,byte,char,class,const,double,enum,export,extends'
	    + ',final,float,goto,implements,import,int,interface,long,native'
	    + ',package,private,protected,public,short,static,super,synchronized'
	    + ',throws,transient,volatile'

	    // ECMA 5 - use strict
	    + ',arguments,let,yield'

	    + ',undefined';

	var REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g;
	var SPLIT_RE = /[^\w$]+/g;
	var KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
	var NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
	var BOUNDARY_RE = /^,+|,+$/g;
	var SPLIT2_RE = /^$|,+/;


	// 获取变量
	function getVariable (code) {
	    return code
	    .replace(REMOVE_RE, '')
	    .replace(SPLIT_RE, ',')
	    .replace(KEYWORDS_RE, '')
	    .replace(NUMBER_RE, '')
	    .replace(BOUNDARY_RE, '')
	    .split(SPLIT2_RE);
	};


	// 字符串转义
	function stringify (code) {
	    return "'" + code
	    // 单引号与反斜杠转义
	    .replace(/('|\\)/g, '\\$1')
	    // 换行符转义(windows + linux)
	    .replace(/\r/g, '\\r')
	    .replace(/\n/g, '\\n') + "'";
	}


	function compiler (source, options) {
	    
	    var debug = options.debug;
	    var openTag = options.openTag;
	    var closeTag = options.closeTag;
	    var parser = options.parser;
	    var compress = options.compress;
	    var escape = options.escape;
	    

	    
	    var line = 1;
	    var uniq = {$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1};
	    


	    var isNewEngine = ''.trim;// '__proto__' in {}
	    var replaces = isNewEngine
	    ? ["$out='';", "$out+=", ";", "$out"]
	    : ["$out=[];", "$out.push(", ");", "$out.join('')"];

	    var concat = isNewEngine
	        ? "$out+=text;return $out;"
	        : "$out.push(text);";
	          
	    var print = "function(){"
	    +      "var text=''.concat.apply('',arguments);"
	    +       concat
	    +  "}";

	    var include = "function(filename,data){"
	    +      "data=data||$data;"
	    +      "var text=$utils.$include(filename,data,$filename);"
	    +       concat
	    +   "}";

	    var headerCode = "'use strict';"
	    + "var $utils=this,$helpers=$utils.$helpers,"
	    + (debug ? "$line=0," : "");
	    
	    var mainCode = replaces[0];

	    var footerCode = "return new String(" + replaces[3] + ");"
	    
	    // html与逻辑语法分离
	    forEach(source.split(openTag), function (code) {
	        code = code.split(closeTag);
	        
	        var $0 = code[0];
	        var $1 = code[1];
	        
	        // code: [html]
	        if (code.length === 1) {
	            
	            mainCode += html($0);
	         
	        // code: [logic, html]
	        } else {
	            
	            mainCode += logic($0);
	            
	            if ($1) {
	                mainCode += html($1);
	            }
	        }
	        

	    });
	    
	    var code = headerCode + mainCode + footerCode;
	    
	    // 调试语句
	    if (debug) {
	        code = "try{" + code + "}catch(e){"
	        +       "throw {"
	        +           "filename:$filename,"
	        +           "name:'Render Error',"
	        +           "message:e.message,"
	        +           "line:$line,"
	        +           "source:" + stringify(source)
	        +           ".split(/\\n/)[$line-1].replace(/^\\s+/,'')"
	        +       "};"
	        + "}";
	    }
	    
	    
	    
	    try {
	        
	        
	        var Render = new Function("$data", "$filename", code);
	        Render.prototype = utils;

	        return Render;
	        
	    } catch (e) {
	        e.temp = "function anonymous($data,$filename) {" + code + "}";
	        throw e;
	    }



	    
	    // 处理 HTML 语句
	    function html (code) {
	        
	        // 记录行号
	        line += code.split(/\n/).length - 1;

	        // 压缩多余空白与注释
	        if (compress) {
	            code = code
	            .replace(/\s+/g, ' ')
	            .replace(/<!--[\w\W]*?-->/g, '');
	        }
	        
	        if (code) {
	            code = replaces[1] + stringify(code) + replaces[2] + "\n";
	        }

	        return code;
	    }
	    
	    
	    // 处理逻辑语句
	    function logic (code) {

	        var thisLine = line;
	       
	        if (parser) {
	        
	             // 语法转换插件钩子
	            code = parser(code, options);
	            
	        } else if (debug) {
	        
	            // 记录行号
	            code = code.replace(/\n/g, function () {
	                line ++;
	                return "$line=" + line +  ";";
	            });
	            
	        }
	        
	        
	        // 输出语句. 编码: <%=value%> 不编码:<%=#value%>
	        // <%=#value%> 等同 v2.0.3 之前的 <%==value%>
	        if (code.indexOf('=') === 0) {

	            var escapeSyntax = escape && !/^=[=#]/.test(code);

	            code = code.replace(/^=[=#]?|[\s;]*$/g, '');

	            // 对内容编码
	            if (escapeSyntax) {

	                var name = code.replace(/\s*\([^\)]+\)/, '');

	                // 排除 utils.* | include | print
	                
	                if (!utils[name] && !/^(include|print)$/.test(name)) {
	                    code = "$escape(" + code + ")";
	                }

	            // 不编码
	            } else {
	                code = "$string(" + code + ")";
	            }
	            

	            code = replaces[1] + code + replaces[2];

	        }
	        
	        if (debug) {
	            code = "$line=" + thisLine + ";" + code;
	        }
	        
	        // 提取模板中的变量名
	        forEach(getVariable(code), function (name) {
	            
	            // name 值可能为空，在安卓低版本浏览器下
	            if (!name || uniq[name]) {
	                return;
	            }

	            var value;

	            // 声明模板变量
	            // 赋值优先级:
	            // [include, print] > utils > helpers > data
	            if (name === 'print') {

	                value = print;

	            } else if (name === 'include') {
	                
	                value = include;
	                
	            } else if (utils[name]) {

	                value = "$utils." + name;

	            } else if (helpers[name]) {

	                value = "$helpers." + name;

	            } else {

	                value = "$data." + name;
	            }
	            
	            headerCode += name + "=" + value + ",";
	            uniq[name] = true;
	            
	            
	        });
	        
	        return code + "\n";
	    }
	    
	    
	};



	// 定义模板引擎的语法


	defaults.openTag = '{{';
	defaults.closeTag = '}}';


	var filtered = function (js, filter) {
	    var parts = filter.split(':');
	    var name = parts.shift();
	    var args = parts.join(':') || '';

	    if (args) {
	        args = ', ' + args;
	    }

	    return '$helpers.' + name + '(' + js + args + ')';
	}


	defaults.parser = function (code, options) {

	    // var match = code.match(/([\w\$]*)(\b.*)/);
	    // var key = match[1];
	    // var args = match[2];
	    // var split = args.split(' ');
	    // split.shift();

	    code = code.replace(/^\s/, '');

	    var split = code.split(' ');
	    var key = split.shift();
	    var args = split.join(' ');

	    

	    switch (key) {

	        case 'if':

	            code = 'if(' + args + '){';
	            break;

	        case 'else':
	            
	            if (split.shift() === 'if') {
	                split = ' if(' + split.join(' ') + ')';
	            } else {
	                split = '';
	            }

	            code = '}else' + split + '{';
	            break;

	        case '/if':

	            code = '}';
	            break;

	        case 'each':
	            
	            var object = split[0] || '$data';
	            var as     = split[1] || 'as';
	            var value  = split[2] || '$value';
	            var index  = split[3] || '$index';
	            
	            var param   = value + ',' + index;
	            
	            if (as !== 'as') {
	                object = '[]';
	            }
	            
	            code =  '$each(' + object + ',function(' + param + '){';
	            break;

	        case '/each':

	            code = '});';
	            break;

	        case 'echo':

	            code = 'print(' + args + ');';
	            break;

	        case 'print':
	        case 'include':

	            code = key + '(' + split.join(',') + ');';
	            break;

	        default:

	            // 过滤器（辅助方法）
	            // {{value | filterA:'abcd' | filterB}}
	            // >>> $helpers.filterB($helpers.filterA(value, 'abcd'))
	            // TODO: {{ddd||aaa}} 不包含空格
	            if (/^\s*\|\s*[\w\$]/.test(args)) {

	                var escape = true;

	                // {{#value | link}}
	                if (code.indexOf('#') === 0) {
	                    code = code.substr(1);
	                    escape = false;
	                }

	                var i = 0;
	                var array = code.split('|');
	                var len = array.length;
	                var val = array[i++];

	                for (; i < len; i ++) {
	                    val = filtered(val, array[i]);
	                }

	                code = (escape ? '=' : '=#') + val;

	            // 即将弃用 {{helperName value}}
	            } else if (template.helpers[key]) {
	                
	                code = '=#' + key + '(' + split.join(',') + ');';
	            
	            // 内容直接输出 {{value}}
	            } else {

	                code = '=' + code;
	            }

	            break;
	    }
	    
	    
	    return code;
	};



	// RequireJS && SeaJS
	if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	        return template;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	// NodeJS
	} else if (typeof exports !== 'undefined') {
	    module.exports = template;
	} else {
	    this.template = template;
	}

	})();

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<% data.forEach(function(item, index) { %>    <li><b><%- index %></b><%- item.title %></li><% }) %>"

/***/ }
/******/ ]);