import request from '../utils/request';

export function loginIn(user){
    return request('/wechat/user/login',{
        method:'POST',
        body:JSON.stringify(user)
    })
}