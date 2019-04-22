import * as memberService from '../services/member'

export default {
    namespace: 'member',

    state: {
        memberList: [],
        flag:false, //请求是否成功
    },

    effects: {
        *queryMemberList({ }, { call, put }) {
            const result = yield call(memberService.queryMemberList);
            yield put({ type: "getMemberList", payload: result })
        },
        *deleteMemberByMemberId({ payload: memberId }, { call, put }) {
            const result = yield call(memberService.deleteMember, memberId);
            yield put({ type: "deleteMember", payload: result });
            yield put({ type: "queryMemberList", payload: {} })
        },
    },

    reducers: {
        getMemberList(state, { payload: memberList }) {
            return { ...state, memberList };
        },
        deleteMember(state, { payload: flag }) {
            return { ...state, flag };
        }
    },
}