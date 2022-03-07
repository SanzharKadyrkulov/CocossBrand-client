"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 6370:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(5184);
// EXTERNAL MODULE: ./app/store/cart/cart.slice.ts
var cart_slice = __webpack_require__(8674);
// EXTERNAL MODULE: ./app/store/order/order.slice.ts
var order_slice = __webpack_require__(5296);
// EXTERNAL MODULE: ./app/store/product/product.slice.ts
var product_slice = __webpack_require__(3791);
// EXTERNAL MODULE: ./app/store/user/user.slice.ts
var user_slice = __webpack_require__(8726);
;// CONCATENATED MODULE: ./app/store/store.ts





const store = (0,toolkit_.configureStore)({
    reducer: {
        cart: cart_slice/* cartReducer */.C$,
        // [productApi.reducerPath]: productApi.reducer
        product: product_slice/* productReducer */.p4,
        order: order_slice/* orderReducer */.Ky,
        user: user_slice/* userReducer */.M3
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: false
        })
});

;// CONCATENATED MODULE: ./pages/_app.tsx




function MyApp({ Component , pageProps  }) {
    return(/*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_.Provider, {
        store: store,
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "",
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        })
    }));
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 6022:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [77], () => (__webpack_exec__(6370)));
module.exports = __webpack_exports__;

})();