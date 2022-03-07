"use strict";
exports.id = 710;
exports.ids = [710];
exports.modules = {

/***/ 3710:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6695);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_cart_cart_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4273);
/* harmony import */ var _store_product_product_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6450);
/* harmony import */ var _store_order_order_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6868);
/* harmony import */ var _store_user_user_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6444);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store_user_user_actions__WEBPACK_IMPORTED_MODULE_5__, _store_order_order_actions__WEBPACK_IMPORTED_MODULE_4__, _store_product_product_actions__WEBPACK_IMPORTED_MODULE_3__]);
([_store_user_user_actions__WEBPACK_IMPORTED_MODULE_5__, _store_order_order_actions__WEBPACK_IMPORTED_MODULE_4__, _store_product_product_actions__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__);






const AllActions = {
    ..._store_cart_cart_actions__WEBPACK_IMPORTED_MODULE_2__,
    ..._store_product_product_actions__WEBPACK_IMPORTED_MODULE_3__,
    ..._store_order_order_actions__WEBPACK_IMPORTED_MODULE_4__,
    ..._store_user_user_actions__WEBPACK_IMPORTED_MODULE_5__
};
const useActions = ()=>{
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useDispatch)();
    return (0,redux__WEBPACK_IMPORTED_MODULE_1__.bindActionCreators)(AllActions, dispatch);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useActions);

});

/***/ }),

/***/ 4273:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "addProductToCart": () => (/* binding */ addProductToCart),
  "changeProductCount": () => (/* binding */ changeProductCount),
  "getCart": () => (/* binding */ getCart),
  "removeProductFromCart": () => (/* binding */ removeProductFromCart)
});

;// CONCATENATED MODULE: ./app/helpers/functions.ts
const calcSubPrice = (product)=>product.count * product.item.price
;
const calcTotalPrice = (products)=>{
    return products.reduce((ac, cur)=>{
        return ac += cur.subPrice;
    }, 0);
};

// EXTERNAL MODULE: ./app/store/cart/cart.slice.ts
var cart_slice = __webpack_require__(8674);
;// CONCATENATED MODULE: ./app/store/cart/cart.actions.ts


const getCart = ()=>(dispatch)=>{
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            localStorage.setItem('cart', JSON.stringify({
                products: [],
                totalPrice: 0
            }));
            cart = {
                product: [],
                totalPrice: 0
            };
        }
        dispatch((0,cart_slice/* getCartSuccess */.hn)(cart));
    }
;
const addProductToCart = (product)=>(dispatch)=>{
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            };
        }
        let newProduct = {
            item: product,
            count: 1,
            subPrice: +product.price
        };
        cart.products.push(newProduct);
        cart.totalPrice = calcTotalPrice(cart.products);
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch((0,cart_slice/* getCartSuccess */.hn)(cart));
    }
;
const removeProductFromCart = (id)=>(dispatch)=>{
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            };
        }
        cart.products = cart.products.filter((item)=>item.item.id !== id
        );
        cart.totalPrice = calcTotalPrice(cart.products);
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch((0,cart_slice/* getCartSuccess */.hn)(cart));
    }
;
const changeProductCount = (count, id)=>(dispatch)=>{
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.products = cart.products.map((product)=>{
            if (product.item.id === id) {
                product.count = count;
                product.subPrice = calcSubPrice(product);
            }
            return product;
        });
        cart.totalPrice = calcTotalPrice(cart.products);
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch((0,cart_slice/* getCartSuccess */.hn)(cart));
    }
;


/***/ }),

/***/ 6868:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getOrders": () => (/* binding */ getOrders),
/* harmony export */   "addOrder": () => (/* binding */ addOrder)
/* harmony export */ });
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1492);
/* harmony import */ var _firebase_fireConsts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3915);
/* harmony import */ var _order_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5296);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_firebase_fireConsts__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_0__]);
([_firebase_fireConsts__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_0__] = __webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__);



const getOrders = ()=>async (dispatch)=>{
        try {
            const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.query)(_firebase_fireConsts__WEBPACK_IMPORTED_MODULE_1__/* .orderRef */ .O, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.orderBy)('date'));
            dispatch((0,_order_slice__WEBPACK_IMPORTED_MODULE_2__/* .getOrdersLoading */ .NF)());
            // const { data } = await axios.get(`${API}/orders`);
            const data = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.getDocs)(q);
            dispatch((0,_order_slice__WEBPACK_IMPORTED_MODULE_2__/* .getOrdersSuccess */ .w_)(data.docs));
        } catch (e) {
            dispatch((0,_order_slice__WEBPACK_IMPORTED_MODULE_2__/* .getOrdersError */ .jK)(JSON.stringify(e)));
        }
    }
;
const addOrder = (order)=>async (dispatch)=>{
        try {
            // await axios.post(`${API}/orders`, order);
            const docRef = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.addDoc)(_firebase_fireConsts__WEBPACK_IMPORTED_MODULE_1__/* .orderRef */ .O, order);
            console.log('Document written with ID: ', docRef.id);
            dispatch(getOrders());
        } catch (e) {
            dispatch((0,_order_slice__WEBPACK_IMPORTED_MODULE_2__/* .getOrdersError */ .jK)(JSON.stringify(e)));
        }
    }
;

});

/***/ }),

/***/ 6450:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getProducts": () => (/* binding */ getProducts),
/* harmony export */   "addProduct": () => (/* binding */ addProduct)
/* harmony export */ });
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1492);
/* harmony import */ var _firebase_fireConsts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3915);
/* harmony import */ var _product_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3791);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_firebase_fireConsts__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_0__]);
([_firebase_fireConsts__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_0__] = __webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__);



const getProducts = ()=>async (dispatch)=>{
        try {
            dispatch((0,_product_slice__WEBPACK_IMPORTED_MODULE_2__/* .getProductsLoading */ .Qu)());
            const data = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.getDocs)(_firebase_fireConsts__WEBPACK_IMPORTED_MODULE_1__/* .dressRef */ .U);
            console.log(data);
            // const { data } = await axios.get(`${API}/dress`);
            dispatch((0,_product_slice__WEBPACK_IMPORTED_MODULE_2__/* .getProductsSuccess */ .Oo)(data.docs));
        } catch (e) {
            dispatch((0,_product_slice__WEBPACK_IMPORTED_MODULE_2__/* .getProductsError */ .TQ)(JSON.stringify(e)));
        }
    }
;
const addProduct = (product)=>async (dispatch)=>{
        try {
            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.addDoc)(_firebase_fireConsts__WEBPACK_IMPORTED_MODULE_1__/* .dressRef */ .U, product);
            dispatch(getProducts());
        } catch (e) {
            dispatch((0,_product_slice__WEBPACK_IMPORTED_MODULE_2__/* .getProductsError */ .TQ)(JSON.stringify(e)));
        }
    }
;

});

/***/ }),

/***/ 6444:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loginWithGoogle": () => (/* binding */ loginWithGoogle),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "listenAuth": () => (/* binding */ listenAuth)
/* harmony export */ });
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(401);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _firebase_firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6211);
/* harmony import */ var _user_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8726);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_firebase_firebase__WEBPACK_IMPORTED_MODULE_2__, firebase_auth__WEBPACK_IMPORTED_MODULE_0__]);
([_firebase_firebase__WEBPACK_IMPORTED_MODULE_2__, firebase_auth__WEBPACK_IMPORTED_MODULE_0__] = __webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__);




const googleProvider = new firebase_auth__WEBPACK_IMPORTED_MODULE_0__.GoogleAuthProvider();
const loginWithGoogle = ()=>async (dispatch)=>{
        try {
            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signInWithPopup)(_firebase_firebase__WEBPACK_IMPORTED_MODULE_2__/* .auth */ .I, googleProvider);
        } catch (e) {
            dispatch((0,_user_slice__WEBPACK_IMPORTED_MODULE_3__/* .loginUserError */ .yT)(JSON.stringify(e)));
        }
    }
;
const logout = ()=>async (dispatch)=>{
        try {
            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signOut)(_firebase_firebase__WEBPACK_IMPORTED_MODULE_2__/* .auth */ .I);
        } catch (e) {
            dispatch((0,_user_slice__WEBPACK_IMPORTED_MODULE_3__/* .loginUserError */ .yT)(JSON.stringify(e)));
        }
    }
;
const listenAuth = ()=>async (dispatch)=>{
        (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
            (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.onAuthStateChanged)(_firebase_firebase__WEBPACK_IMPORTED_MODULE_2__/* .auth */ .I, (user)=>{
                dispatch((0,_user_slice__WEBPACK_IMPORTED_MODULE_3__/* .loginUserSuccess */ .Fi)(user));
            });
        }, []);
    }
;

});

/***/ }),

/***/ 3915:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": () => (/* binding */ dressRef),
/* harmony export */   "O": () => (/* binding */ orderRef)
/* harmony export */ });
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1492);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6211);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_firebase__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_0__]);
([_firebase__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_0__] = __webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__);


const dressRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, 'dress');
const orderRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, 'order');

});

/***/ }),

/***/ 6211:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ auth),
/* harmony export */   "db": () => (/* binding */ db)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3745);
/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9500);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(401);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1492);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_analytics__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, firebase_auth__WEBPACK_IMPORTED_MODULE_2__, firebase_app__WEBPACK_IMPORTED_MODULE_0__]);
([firebase_analytics__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, firebase_auth__WEBPACK_IMPORTED_MODULE_2__, firebase_app__WEBPACK_IMPORTED_MODULE_0__] = __webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__);
// Import the functions you need from the SDKs you need




const firebaseConfig = {
    apiKey: 'AIzaSyDe0Xh3TGYpgEyEy3wvTxzZLRLmj5DY-Ww',
    authDomain: 'cocossbrand.firebaseapp.com',
    projectId: 'cocossbrand',
    storageBucket: 'cocossbrand.appspot.com',
    messagingSenderId: '948339176307',
    appId: '1:948339176307:web:11521655b61456b49c8b06',
    measurementId: 'G-HDQPFWTWFJ'
};
// Initialize Firebase
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)(app);
const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getFirestore)(app);
const analytics = (0,firebase_analytics__WEBPACK_IMPORTED_MODULE_1__.getAnalytics)(app);

});

/***/ })

};
;