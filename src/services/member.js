import request from '../utils/request'

export function queryMemberList(){
    return request('/wechat/member/list')
}

export function deleteMember(memberId) {
    return request(`/wechat/member/delete?memberId=${memberId}`, {method: 'POST'})
}

export function updateMember(member) {
    return request('/wechat/member/update', {
        method: 'POST',
        body: JSON.stringify(member)
    })
}

export function memberAuthorize(){
    return request('/wechat/authorize?returnUrl=http://25b7dded.ngrok.io/auth/member');
}

export function getMemberByOpenId(openId) {
    return request(`/wechat/member/getMember?openId=${openId}`);
}

export function addBalance(option) {
    return request('/wechat/member/addBalance', {
        method: 'POST',
        body: JSON.stringify(option)
    })
}

export function getCardLogList() {
    return request('/wechat/member/getAllCardLog');
}