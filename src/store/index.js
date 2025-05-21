import vue from 'vue'
import Vuex from 'vuex'
import router from "../router";
vue.use(Vuex)

function addNewRoute(menuList) {
    // 清空旧路由（避免重复添加）
    const parentRoute = router.options.routes.find(r => r.path.toLowerCase() === '/index')
    if (parentRoute) parentRoute.children = []

    // 动态注册新路由
    menuList.forEach(menu => {
        router.addRoute('index', { // 父路由的name
            path: `/${menu.menuClick.toLowerCase()}`,
            name: menu.menuClick,
            meta: { title: menu.menuName },
            component: () => import(`@/components/${menu.menuComponent}`)
        })
    })

}

export default new Vuex.Store({
    state:{
        menu:[]
    },
    mutations:{
        setMenu(state,menuList){
            state.menu = menuList

            addNewRoute(menuList)
        }
    },
    getters:{
        getMenu(state){
            return state.menu
        }
    }
})
