import * as memberService from '../services/member'

export default {
    namespace: 'member',

    state: {
        memberList: [],
        memberCardLogList: [],
        member: null,
        flag: false, //是否成功
        isBandPhone: false,
        redirectUrl: null,

    },

    effects: {
        *queryMemberList({ }, { call, put }) {
            const result = yield call(memberService.queryMemberList);
            yield put({ type: "getMemberList", payload: result });
        },
        *deleteMemberByMemberId({ payload: memberId }, { call, put }) {
            const result = yield call(memberService.deleteMember, memberId);
            yield put({ type: "deleteMember", payload: result });
            yield put({ type: "queryMemberList", payload: {} });
        },
        *updateMember({ payload: member }, { call, put }) {
            const result = yield call(memberService.updateMember, member);
            yield put({ type: "updateMemberInfo", payload: result });
            yield put({ type: "queryMemberList", payload: {} });
        },
        *memberAuthorize({ }, { call, put }) {
            const result = yield call(memberService.memberAuthorize);
            window.open(result.url);
        },
        *getMemberByOpenId({ payload: openId }, { call, put }) {
            const result = yield call(memberService.getMemberByOpenId, openId);
            yield put({ type: 'getMember', payload: result });
        },
        *addMemberBalance({ payload: balance }, { call, put }) {
            const result = yield call(memberService.addBalance, balance);
            yield put({ type: 'addMemberBalanceRdu', payload: result });
            yield put({ type: "queryMemberList", payload: {} });
        },
        *getCardLogList({ }, { call, put }) {
            const result = yield call(memberService.getCardLogList);
            yield put({ type: 'getAllCardLogRdu', payload: result });
        }
    },

    reducers: {
        getMemberList(state, { payload: memberList }) {
            return { ...state, memberList };
        },
        deleteMember(state, { payload: flag }) {
            return { ...state, flag };
        },
        updateMemberInfo(state, { payload: member }) {
            if (member != null && member.phone == null) {
                state.isBandPhone = true;
            } else {
                state.isBandPhone = false;
            }
            return { ...state, member }
        },
        getMember(state, { payload: member }) {
            if (member != null && member.phone == null) {
                state.isBandPhone = true;
            } else {
                state.isBandPhone = false;
            }
            return { ...state, member }
        },
        memberAuth(state, { payload: redirectUrl }) {
            return { ...state, redirectUrl }
        },
        addMemberBalanceRdu(state, { payload: flag }) {
            return { ...state, flag };
        },
        getAllCardLogRdu(state, { payload: memberCardLogList }) {
            return { ...state, memberCardLogList }
        }
    },
}