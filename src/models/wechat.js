import * as wechatService from '../services/wechat'

export default {
    namespace: 'wechat',

    state: {
        menuList: [],
        flag: null,
    },

    effects: {
        *getMenuList({ }, { call, put }) {
            const result = yield call(wechatService.getMenuList);
            yield put({ type: "getMenuListRdu", payload: result });
        },
        *createMenu({payload: menuList}, {call, put}) {
            console.log(menuList)
            const result = yield call(wechatService.createMenu, menuList);
            yield put({ type: "createMenuRdu", payload: result });
        }
    },

    reducers: {
        getMenuListRdu(state, { payload: menuList }) {
            return { ...state, menuList };
        },
        createMenuRdu(state, {payload: flag}) {
            return { ...state, flag };
        }
    },
}