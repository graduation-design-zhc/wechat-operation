import * as memberService from '../services/member'

export default {
    namespace: 'member',

    state: {
        memberList: [],
        memberCardLogList: [],
        member: {
            memberId: "",
            openId: "",
            avatar: "",
            gender: 1,
            phone: "",
            nickname: "",
            birthday: "",
            createTime: "",
            updateTime: "",
            memberBalance: "",
            memberIntegral: ""
        },
        flag: null, //是否成功
        isBandPhone: false,
        redirectUrl: null,
        orderLogList: [],
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
            // window.open(result.url); //iphone无法跳转
            window.location = result.url;
        },
        *getMemberByOpenId({ payload: openId }, { call, put }) {
            const result = yield call(memberService.getMemberByOpenId, openId);
            yield put({ type: 'getMember', payload: result });
        },
        *getMemberByMemberId({ payload: memberId }, { call, put }) {
            const result = yield call(memberService.getMemberMemberId, memberId);
            yield put({ type: 'getMemberByMemberIdRdu', payload: result });
        },
        *getMemberByPhone({ payload: phone }, { call, put }) {
            const result = yield call(memberService.getMemberByPhone, phone);
            yield put({ type: 'getMemberByPhoneRdu', payload: result });
        },
        *addMemberBalance({ payload: balance }, { call, put }) {
            const result = yield call(memberService.addBalance, balance);
            yield put({ type: 'addMemberBalanceRdu', payload: result });
            yield put({ type: "queryMemberList", payload: {} });
        },
        *getCardLogList({ }, { call, put }) {
            const result = yield call(memberService.getCardLogList);
            yield put({ type: 'getAllCardLogRdu', payload: result });
        },
        *order({ payload: orderRequest }, { call, put }) {
            const result = yield call(memberService.order, orderRequest);
            yield put({ type: 'orderRdu', payload: result });
        },
        *getOrderLogList({ }, { call, put }) {
            const result = yield call(memberService.getOrderLogList);
            yield put({ type: 'getOrderLogListRdu', payload: result });
        },
        *getMemberListByPhone({ payload: phone }, { call, put }) {
            const result = yield call(memberService.getMemberListByPhone, phone);
            yield put({ type: 'getMemberListByPhoneRdu', payload: result });
        },
        *getOrderLogListByPhone({ payload: phone }, { call, put }) {
            const result = yield call(memberService.getOrderLogListByPhone, phone);
            yield put({ type: 'getOrderLogListByPhoneRdu', payload: result });
        },
        *getCardLogListByPhone({ payload: phone }, { call, put }) {
            const result = yield call(memberService.getCardLogListByPhone, phone);
            yield put({ type: 'getCardLogListByPhoneRdu', payload: result });
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
        getMemberByMemberIdRdu(state, { payload: member }) {
            return { ...state, member }
        },
        getMemberByPhoneRdu(state, { payload: member }) {
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
        },
        orderRdu(state, { payload: flag }) {
            return { ...state, flag }
        },
        getOrderLogListRdu(state, { payload: orderLogList }) {
            return { ...state, orderLogList }
        },
        getMemberListByPhoneRdu(state, { payload: memberList }) {
            return { ...state, memberList }
        },
        getOrderLogListByPhoneRdu(state, { payload: orderLogList }) {
            return { ...state, orderLogList }
        },
        getCardLogListByPhoneRdu(state, { payload: memberCardLogList }) {
            return { ...state, memberCardLogList }
        }
    },
}