import * as productService from '../services/product'

export default {
    namespace: 'product',

    state: {
        productList: [],
        productCategoryList: [],
        product: {
            productId: "",
            productName: "",
            productPrice: null,
            productStock: "",
            productDescription: "",
            productImg: "",
            productStatus: null,
            categoryType: null,
        }
    },

    effects: {
        *getCategoryList({ }, { call, put }) {
            const result = yield call(productService.getCategoryList);
            yield put({ type: "getCategoryListRdu", payload: result });
        },
        *getProductListByCategoryType({ payload: categoryType }, { call, put }) {
            const result = yield call(productService.getProductByCategoryType, categoryType);
            yield put({ type: "getProductListByCategoryTypeRdu", payload: result });
        },
        *getProductByProductId({ payload: productId }, { call, put }) {
            const result = yield call(productService.getProductByProductId, productId);
            yield put({ type: "getProductByProductIdRdu", payload: result });
        }
    },

    reducers: {
        getCategoryListRdu(state, { payload: productCategoryList }) {
            return { ...state, productCategoryList };
        },
        getProductListByCategoryTypeRdu(state, { payload: productList }) {
            return { ...state, productList };
        },
        getProductByProductIdRdu(state, { payload: product }) {
            return { ...state, product };
        }
    },
}