import * as loginServices from '../services/login.js';
import router from 'umi/router';
import {message} from 'antd';


export default {
    namespace: 'login',

    state: {
        status: undefined,
    },

    effects:{
        *login({payload:user},{call,put}){
            const result = yield call(loginServices.loginIn,{userName:user.userName,password:user.password});
            console.log("result>>>"+JSON.stringify(result));
            router.push("/wechat")
            // if(result.code==0){
            //     //console.log("code",result.code);
            //     yield put({type:'changeLoginStatus',payload:"error"})
            // }else{
            //     const authority = result.data;
            //     //console.log("权限",authority);
            //     localStorage.setItem("userName",user.userName);
            //     localStorage.setItem("userAuthority",authority);
            //     yield put({type:'changeLoginStatus',payload:undefined});
            //     router.push('/external/welcome');
            // }
        },
    },

    reducers: {
        changeLoginStatus(state, { payload:status }) {
            return {...state,status,};
        },
    },
};
