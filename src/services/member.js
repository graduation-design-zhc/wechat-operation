import request from '../utils/request'

export function queryMemberList(){
    return request('/wechat/member/list')
}

export function deleteMember(memberId) {
    return request(`/wechat/member/delete?memberId=${memberId}`, {method: 'POST'})
}