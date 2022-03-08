"use strict";
exports.id = 77;
exports.ids = [77];
exports.modules = {

/***/ 8674:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C$": () => (/* binding */ cartReducer),
/* harmony export */   "hn": () => (/* binding */ getCartSuccess)
/* harmony export */ });
/* unused harmony export cartSlice */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
    products: [],
    totalPrice: 0
};
const cartSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'cart',
    initialState,
    reducers: {
        // 	addItem: (state, action: PayloadAction<ICart>) => {
        // 		state.products.push(action.payload);
        // 	},
        // removeItem: (state, action: PayloadAction<number>) => {
        // 	state.products = state.products.filter(
        // 		item => item.id !== action.payload
        // 	);
        // },
        getCartSuccess: (state, action)=>{
            return action.payload;
        }
    }
});
const cartReducer = cartSlice.reducer;
const { getCartSuccess  } = cartSlice.actions;


/***/ }),

/***/ 5296:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ky": () => (/* binding */ orderReducer),
/* harmony export */   "jK": () => (/* binding */ getOrdersError),
/* harmony export */   "NF": () => (/* binding */ getOrdersLoading),
/* harmony export */   "w_": () => (/* binding */ getOrdersSuccess)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
    orders: [],
    loading: false,
    error: null
};
const orderSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'order',
    initialState,
    reducers: {
        getOrdersLoading: (state)=>{
            state.loading = true;
        },
        getOrdersError: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        getOrdersSuccess: (state, action)=>{
            state.loading = false;
            state.error = null;
            state.orders = action.payload;
        }
    }
});
const orderReducer = orderSlice.reducer;
const { getOrdersError , getOrdersLoading , getOrdersSuccess  } = orderSlice.actions;


/***/ }),

/***/ 3791:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "p4": () => (/* binding */ productReducer),
/* harmony export */   "TQ": () => (/* binding */ getProductsError),
/* harmony export */   "Qu": () => (/* binding */ getProductsLoading),
/* harmony export */   "Oo": () => (/* binding */ getProductsSuccess)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
    products: [],
    loading: false,
    error: null
};
const productSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'product',
    initialState,
    reducers: {
        getProductsLoading: (state)=>{
            state.loading = true;
        },
        getProductsError: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        getProductsSuccess: (state, action)=>{
            state.loading = false;
            state.error = null;
            state.products = action.payload;
        }
    }
});
const productReducer = productSlice.reducer;
const { getProductsError , getProductsLoading , getProductsSuccess  } = productSlice.actions;


/***/ }),

/***/ 8726:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M3": () => (/* binding */ userReducer),
/* harmony export */   "Fi": () => (/* binding */ loginUserSuccess),
/* harmony export */   "yT": () => (/* binding */ loginUserError)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
    userInfo: null,
    error: null
};
const userSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'user',
    initialState,
    reducers: {
        loginUserSuccess: (state, action)=>{
            state.error = null;
            state.userInfo = action.payload;
        },
        loginUserError: (state, action)=>{
            state.error = action.payload;
        }
    }
});
const userReducer = userSlice.reducer;
const { loginUserSuccess , loginUserError  } = userSlice.actions;


/***/ })

};
;