export default [
    { path: '/auth/info', component: './member/memberAuth' },
    { path: '/auth/member', component: './member/memberHome' }, 
    // operation
    {
        path: "/",
        component: '../layouts/BasicLayout',
        routes: [
            // wechat
            { path: '/', redirect: '/wechat/analysis' },
            { path: 'puzzlecards', component: './puzzlecards' },
            {
                path: '/wechat',
                routes: [
                    { path: '/wechat/analysis', component: 'wechat/analysis' },
                    { path: '/wechat/monitor', component: 'wechat/monitor' },
                    { path: '/wechat/workplace', component: 'wechat/workplace' }
                ]
            },
            {
                path: '/member',
                routes: [
                    { path: '/member', redirect: 'member/member' },
                    { path: '/member/list', component: 'member/memberList' },
                    { path: '/member/order', component: 'member/order' },
                    { path: '/member/recharge', component: 'member/recharge' },
                    { path: '/member/orderLog', component: 'member/orderLog' },
                    { path: '/member/rechargeLog', component: 'member/rechargeLog' },
                ]
            },
            // {
            //     path: '/user',
            //     routes: [
            //         { path: '/user/userList', component: 'user/userList' }
            //     ]
            // }
        ]
    },
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login' },
            { path: '/user/login', component: './user/login' },
        ],
    },
];