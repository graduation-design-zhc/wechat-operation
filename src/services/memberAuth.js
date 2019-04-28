import request from '../utils/request'

export function memberAuthorize(){
    return request('/wechat/authorize');
}