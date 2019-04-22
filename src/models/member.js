import * as memberService from '../services/member'

export default {
    namespace: 'member',

    state: {
        memberList: [],
    },

    effects: {
        *queryMemberList({ }, { call, put }) {
            const result = yield call(memberService.queryMemberList);
            yield put({ type: "getMemberList", payload: result })
        },
        *deleteMember({ payload: memberId }, { call, put }) {
            const result = yield call(memberService.deleteMember, memberId);
            console.log(result);
            yield put({ type: "deleteMember", payload: result })
        },
    },

    reducers: {
        getMemberList(state, { payload: memberList }) {
            return { ...state, memberList };
        },
        deleteMember(state, { payload: result }) {
            return { ...state, result };
        }
    },
}