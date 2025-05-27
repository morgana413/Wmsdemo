import VueRouter from 'vue-router';

import store from '../store/store';

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
                    title:'个人首页'
                },
                component: () => import('../components/MyHome.vue')
            },
            {
                path: '/MyMain',
                name: 'main',
                meta:{
                    title:'首页'
                },
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
                path: '/storage',
                name: 'storage',
                meta:{
                    title:'仓库管理'
                },
                component: () => import('../components/storage/StorageManage.vue')
            },
            {
                path: '/goodstype',
                name: 'goodstype',
                meta:{
                    title:'物品分类管理'
                },
                component: () => import('../components/goodstype/goodstypeManage.vue')
            },
            {
                path: '/goods',
                name: 'goods',
                meta:{
                    title:'物品管理'
                },
                component: () => import('../components/goods/GoodsManage.vue')
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

store.commit('setMenu', routes.reduce((res, route) => {
    if (Array.isArray(route.children)) {
        res.push(...route.children.map(item => {
            return {
                menuName: item.meta && item.meta.title,
                menuClick: item.path
            }
        }))
    }
    return res
}, []))

export default router;