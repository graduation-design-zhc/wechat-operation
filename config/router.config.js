export default [
    // operation
    {
        path:"/",
        component: '../layout/BasicLayout',
        routes: [
            {
                path: '/basic',
                routes: [
                    { path: '/basic/analysis', component: 'basic/analysis' },
                    { path: '/basic/monitor', component: 'basic/monitor' },
                    { path: '/basic/workplace', component: 'basic/workplace' }
                ]
            },
            {
                path: '/member',
                routes: [
                    { path: '/member/member', component: 'member/member' },
                    { path: '/member/order', component: 'member/order' },
                    { path: '/member/recharge', component: 'member/recharge' },
                    { path: '/member/orderLog', component: 'member/orderLog' },
                    { path: '/member/rechargeLog', component: 'member/rechargeLog' },
                ]
            }
        ]
    },
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          { path: '/user', redirect: '/user/login' },
          { path: '/user/login', component: './User/Login' },
        ],
    },
];