import vue from 'vue'
import Vuex from 'vuex'
// import router from "../router/router";
vue.use(Vuex)
//添加动态路由
// function addNewRoute(menuList) {
//     // 防御性处理
//     const safeMenuList = Array.isArray(menuList) ? menuList : []
//
//     // 查找父路由
//     const parentRoute = router.options.routes.find(r => r.name.toLowerCase() === 'index')
//     if (!parentRoute) {
//         console.error('Parent route /index not found')
//         return
//     }
//
//     // 清空旧路由（保留非动态路由）
//     parentRoute.children = parentRoute.children.filter(r => !r.meta?.isDynamic)
//
//     // 添加新路由
//     safeMenuList.forEach(menu => {
//         if (!menu.menuClick || !menu.menuComponent) {
//             console.warn('Skipping invalid menu item:', menu)
//             return
//         }
//
//         const routeConfig = {
//             path: `${menu.menuClick.toLowerCase()}`,
//             name: menu.menuClick,
//             meta: {
//                 title: menu.menuName,
//                 isDynamic: true // 标记为动态路由
//             },
//             component: () => import(`@/components/${menu.menuComponent}`)
//         }
//
//         router.addRoute('index', routeConfig)
//     })
//
//     console.log('Updated routes:', router.getRoutes())
// }

export default new Vuex.Store({
    state: {
        menu: []
    },
    mutations: {
        setMenu(state, menuList) {
            const validMenu = Array.isArray(menuList) ? menuList : []
            state.menu = validMenu
            // addNewRoute(validMenu)
        }
    }
})
