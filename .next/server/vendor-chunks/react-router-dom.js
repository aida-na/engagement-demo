"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-router-dom";
exports.ids = ["vendor-chunks/react-router-dom"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-router-dom/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-router-dom/dist/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\n * react-router-dom v7.1.1\n *\n * Copyright (c) Remix Software Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.md file in the root directory of this source tree.\n *\n * @license MIT\n */\n\nvar __defProp = Object.defineProperty;\nvar __getOwnPropDesc = Object.getOwnPropertyDescriptor;\nvar __getOwnPropNames = Object.getOwnPropertyNames;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __export = (target, all) => {\n  for (var name in all)\n    __defProp(target, name, { get: all[name], enumerable: true });\n};\nvar __copyProps = (to, from, except, desc) => {\n  if (from && typeof from === \"object\" || typeof from === \"function\") {\n    for (let key of __getOwnPropNames(from))\n      if (!__hasOwnProp.call(to, key) && key !== except)\n        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });\n  }\n  return to;\n};\nvar __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, \"default\"), secondTarget && __copyProps(secondTarget, mod, \"default\"));\nvar __toCommonJS = (mod) => __copyProps(__defProp({}, \"__esModule\", { value: true }), mod);\n\n// index.ts\nvar react_router_dom_exports = {};\n__export(react_router_dom_exports, {\n  HydratedRouter: () => import_dom.HydratedRouter,\n  RouterProvider: () => import_dom.RouterProvider\n});\nmodule.exports = __toCommonJS(react_router_dom_exports);\nvar import_dom = __webpack_require__(/*! react-router/dom */ \"(ssr)/./node_modules/react-router/dist/development/dom-export.js\");\n__reExport(react_router_dom_exports, __webpack_require__(/*! react-router */ \"(ssr)/./node_modules/react-router/dist/development/index.js\"), module.exports);\n// Annotate the CommonJS export names for ESM import in node:\n0 && (0);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9kaXN0L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2E7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0NBQWtDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsNEZBQTRGO0FBQ3pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGtCQUFrQixhQUFhOztBQUVuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsaUJBQWlCLG1CQUFPLENBQUMsMEZBQWtCO0FBQzNDLHFDQUFxQyxtQkFBTyxDQUFDLGlGQUFjO0FBQzNEO0FBQ0EsTUFBTSxDQUlMIiwic291cmNlcyI6WyIvVXNlcnMvYWlkYW5hL0RvY3VtZW50cy9HaXRIdWIvZW5nYWdlbWVudC1kZW1vL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItZG9tL2Rpc3QvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiByZWFjdC1yb3V0ZXItZG9tIHY3LjEuMVxuICpcbiAqIENvcHlyaWdodCAoYykgUmVtaXggU29mdHdhcmUgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS5tZCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cInVzZSBzdHJpY3RcIjtcbnZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19nZXRPd25Qcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBfX2hhc093blByb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIF9fZXhwb3J0ID0gKHRhcmdldCwgYWxsKSA9PiB7XG4gIGZvciAodmFyIG5hbWUgaW4gYWxsKVxuICAgIF9fZGVmUHJvcCh0YXJnZXQsIG5hbWUsIHsgZ2V0OiBhbGxbbmFtZV0sIGVudW1lcmFibGU6IHRydWUgfSk7XG59O1xudmFyIF9fY29weVByb3BzID0gKHRvLCBmcm9tLCBleGNlcHQsIGRlc2MpID0+IHtcbiAgaWYgKGZyb20gJiYgdHlwZW9mIGZyb20gPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGZyb20gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGZvciAobGV0IGtleSBvZiBfX2dldE93blByb3BOYW1lcyhmcm9tKSlcbiAgICAgIGlmICghX19oYXNPd25Qcm9wLmNhbGwodG8sIGtleSkgJiYga2V5ICE9PSBleGNlcHQpXG4gICAgICAgIF9fZGVmUHJvcCh0bywga2V5LCB7IGdldDogKCkgPT4gZnJvbVtrZXldLCBlbnVtZXJhYmxlOiAhKGRlc2MgPSBfX2dldE93blByb3BEZXNjKGZyb20sIGtleSkpIHx8IGRlc2MuZW51bWVyYWJsZSB9KTtcbiAgfVxuICByZXR1cm4gdG87XG59O1xudmFyIF9fcmVFeHBvcnQgPSAodGFyZ2V0LCBtb2QsIHNlY29uZFRhcmdldCkgPT4gKF9fY29weVByb3BzKHRhcmdldCwgbW9kLCBcImRlZmF1bHRcIiksIHNlY29uZFRhcmdldCAmJiBfX2NvcHlQcm9wcyhzZWNvbmRUYXJnZXQsIG1vZCwgXCJkZWZhdWx0XCIpKTtcbnZhciBfX3RvQ29tbW9uSlMgPSAobW9kKSA9PiBfX2NvcHlQcm9wcyhfX2RlZlByb3Aoe30sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pLCBtb2QpO1xuXG4vLyBpbmRleC50c1xudmFyIHJlYWN0X3JvdXRlcl9kb21fZXhwb3J0cyA9IHt9O1xuX19leHBvcnQocmVhY3Rfcm91dGVyX2RvbV9leHBvcnRzLCB7XG4gIEh5ZHJhdGVkUm91dGVyOiAoKSA9PiBpbXBvcnRfZG9tLkh5ZHJhdGVkUm91dGVyLFxuICBSb3V0ZXJQcm92aWRlcjogKCkgPT4gaW1wb3J0X2RvbS5Sb3V0ZXJQcm92aWRlclxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fdG9Db21tb25KUyhyZWFjdF9yb3V0ZXJfZG9tX2V4cG9ydHMpO1xudmFyIGltcG9ydF9kb20gPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyL2RvbVwiKTtcbl9fcmVFeHBvcnQocmVhY3Rfcm91dGVyX2RvbV9leHBvcnRzLCByZXF1aXJlKFwicmVhY3Qtcm91dGVyXCIpLCBtb2R1bGUuZXhwb3J0cyk7XG4vLyBBbm5vdGF0ZSB0aGUgQ29tbW9uSlMgZXhwb3J0IG5hbWVzIGZvciBFU00gaW1wb3J0IGluIG5vZGU6XG4wICYmIChtb2R1bGUuZXhwb3J0cyA9IHtcbiAgSHlkcmF0ZWRSb3V0ZXIsXG4gIFJvdXRlclByb3ZpZGVyLFxuICAuLi5yZXF1aXJlKFwicmVhY3Qtcm91dGVyXCIpXG59KTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-router-dom/dist/index.js\n");

/***/ })

};
;