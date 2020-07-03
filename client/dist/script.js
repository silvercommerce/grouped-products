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
/******/ 	__webpack_require__.p = "/home/morven/Projects/silvercommerce-sandbox/vendor/silvercommerce/grouped-products";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/scripts.js":
/*!*******************************!*\
  !*** ./client/src/scripts.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function(document, window) {\n\t/**\n\t * Better cross browser support for XHR, thanks to this post:\n\t * https://stackoverflow.com/questions/3470895/small-ajax-javascript-library\n\t * for the idea\n\t */\n    function create_xhr()\n    {\n\t\tvar xhr;\n\t\tif (window.ActiveXObject) {\n\t\t\ttry {\n\t\t\t\txhr = new ActiveXObject(\"Microsoft.XMLHTTP\");\n\t\t\t} catch(e) {\n\t\t\t\talert(e.message);\n\t\t\t\txhr = null;\n\t\t\t}\n\t\t} else {\n\t\t\txhr = new XMLHttpRequest();\n\t\t}\n\n\t\treturn xhr;\n\t}\n\n\t/**\n\t * Create a xhr request to retrieve field data and update select field\n\t * \n\t * @param {input} price_field the current product field\n\t */\n    function xhr_request(price_field)\n    {\n        var classname = price_field.dataset.productpriceclassname;\n        var url = price_field.dataset.url;\n        var xhr = create_xhr();\n\n        if (typeof classname === 'undefined' && typeof url === 'undefined') {\n            return;\n        }\n\n\t\t// Handle json response\n\t\txhr.onreadystatechange = function() {\n\t\t\tvar price_elements = document.getElementsByClassName(classname);\n\t\t\tvar x;\n\n\t\t\tfor (x = 0; x < price_elements.length; x++) {\n\t\t\t\tvar cur_price = price_elements[x];\n\n\t\t\t\tif (xhr.readyState === 1) {\n\t\t\t\t\tcur_price.style.opacity = 0.5;\n\t\t\t\t}\n\t\n\t\t\t\tif (xhr.readyState === 4) {\n\t\t\t\t\tcur_price.style.opacity = 1;\n\t\t\t\t\tcur_price.innerHTML = xhr.response;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\txhr.open('GET', url, true)\n\t\txhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');\n\t\txhr.send();\n    }\n\n    var price_fields = document.querySelectorAll('[data-productpriceclassname]');\n    var i;\n\n    for (i = 0; i < price_fields.length; i++) {\n        var curr_price = price_fields[i];\n        curr_price.onchange = function() {\n            xhr_request(this);\n        }\n    }\n}(document, window));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jbGllbnQvc3JjL3NjcmlwdHMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL3NjcmlwdHMuanM/MTRkYiJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oZG9jdW1lbnQsIHdpbmRvdykge1xuXHQvKipcblx0ICogQmV0dGVyIGNyb3NzIGJyb3dzZXIgc3VwcG9ydCBmb3IgWEhSLCB0aGFua3MgdG8gdGhpcyBwb3N0OlxuXHQgKiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDcwODk1L3NtYWxsLWFqYXgtamF2YXNjcmlwdC1saWJyYXJ5XG5cdCAqIGZvciB0aGUgaWRlYVxuXHQgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVfeGhyKClcbiAgICB7XG5cdFx0dmFyIHhocjtcblx0XHRpZiAod2luZG93LkFjdGl2ZVhPYmplY3QpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHhociA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XG5cdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0eGhyID0gbnVsbDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0eGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHhocjtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSB4aHIgcmVxdWVzdCB0byByZXRyaWV2ZSBmaWVsZCBkYXRhIGFuZCB1cGRhdGUgc2VsZWN0IGZpZWxkXG5cdCAqIFxuXHQgKiBAcGFyYW0ge2lucHV0fSBwcmljZV9maWVsZCB0aGUgY3VycmVudCBwcm9kdWN0IGZpZWxkXG5cdCAqL1xuICAgIGZ1bmN0aW9uIHhocl9yZXF1ZXN0KHByaWNlX2ZpZWxkKVxuICAgIHtcbiAgICAgICAgdmFyIGNsYXNzbmFtZSA9IHByaWNlX2ZpZWxkLmRhdGFzZXQucHJvZHVjdHByaWNlY2xhc3NuYW1lO1xuICAgICAgICB2YXIgdXJsID0gcHJpY2VfZmllbGQuZGF0YXNldC51cmw7XG4gICAgICAgIHZhciB4aHIgPSBjcmVhdGVfeGhyKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjbGFzc25hbWUgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB1cmwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuXHRcdC8vIEhhbmRsZSBqc29uIHJlc3BvbnNlXG5cdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHByaWNlX2VsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc25hbWUpO1xuXHRcdFx0dmFyIHg7XG5cblx0XHRcdGZvciAoeCA9IDA7IHggPCBwcmljZV9lbGVtZW50cy5sZW5ndGg7IHgrKykge1xuXHRcdFx0XHR2YXIgY3VyX3ByaWNlID0gcHJpY2VfZWxlbWVudHNbeF07XG5cblx0XHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlID09PSAxKSB7XG5cdFx0XHRcdFx0Y3VyX3ByaWNlLnN0eWxlLm9wYWNpdHkgPSAwLjU7XG5cdFx0XHRcdH1cblx0XG5cdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuXHRcdFx0XHRcdGN1cl9wcmljZS5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHRcdFx0XHRjdXJfcHJpY2UuaW5uZXJIVE1MID0geGhyLnJlc3BvbnNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpXG5cdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcblx0XHR4aHIuc2VuZCgpO1xuICAgIH1cblxuICAgIHZhciBwcmljZV9maWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcm9kdWN0cHJpY2VjbGFzc25hbWVdJyk7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgcHJpY2VfZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjdXJyX3ByaWNlID0gcHJpY2VfZmllbGRzW2ldO1xuICAgICAgICBjdXJyX3ByaWNlLm9uY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB4aHJfcmVxdWVzdCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbn0oZG9jdW1lbnQsIHdpbmRvdykpOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./client/src/scripts.js\n");

/***/ }),

/***/ 0:
/*!*************************************!*\
  !*** multi ./client/src/scripts.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/morven/Projects/silvercommerce-sandbox/vendor/silvercommerce/grouped-products/client/src/scripts.js */"./client/src/scripts.js");


/***/ })

/******/ });