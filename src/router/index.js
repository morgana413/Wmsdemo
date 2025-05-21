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
    }
]
const router = new VueRouter({
    mode: 'history',
    routes
})
export default router;