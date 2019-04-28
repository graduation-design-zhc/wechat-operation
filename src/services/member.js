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
    return request('/wechat/authorize?returnUrl=http://f7dddd06.ngrok.io/auth/member');
}

export function getMemberByOpenId(openId) {
    return request(`/wechat/member/getMember?openId=${openId}`);
}