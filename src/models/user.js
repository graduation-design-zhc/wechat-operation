import userService from '../services/user'

export default {
    namespace: 'user',

    state: {
        userList: [],
    },

    effect: {
        *queryUserList({ }, { call, put }) {
            const result = yield call(userService.queryUserList);
            console.log(result);
            yield put({ type: "getUserList", payload: result.data })
        }
    },

    reducers: {
        getUserList(state, { payload: userList }) {
            return {...state, userList};
        }
    },
}