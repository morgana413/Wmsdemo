import VueRouter from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/components/MyLogin.vue'),
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('@/components/index.vue'),
        children: [
            {
                path: '/Home',
                name: 'home',
                meta:{
                    title:'首页'
                },
                component: () => import('../components/MyHome.vue')
            },
            {
                path: '/MyMain',
                name: 'main',
                component: () => import('@/components/MyMain.vue')
            },
            {
                path: '/admin',
                name: 'admin',
                meta:{
                    title:'管理员管理'
                },
                component: () => import('../components/admin/AdminManage.vue')
            },
            {
                path: '/user',
                name: 'user',
                meta:{
                    title:'用户管理'
                },
                component: () => import('../components/user/UserManage.vue')
            },
            {
                path: '/test',
                name: 'TestDemo',
                meta: { title: '测试页' },
                component: () => import('@/components/user/TestDemo.vue')
            }
        ]
    }
]
const router = new VueRouter({
    mode: 'history',
    routes
})
export function resetRouter() {
    router.matcher = new VueRouter({
        mode: 'history',
        routes:[]
    }).matcher
}
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err =>err)
}
export default router;