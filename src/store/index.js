import vue from 'vue'
import Vuex from 'vuex'
import router from "../router";
vue.use(Vuex)

function addNewRoute(menuList) {
    console.log(menuList)
    let routes = router.options.routes;
    console.log(routes);
    routes.forEach(routeItem => {
        if (routeItem.path == "/Index"){
            menuList.forEach(menu => {
                let childrenRoute ={
                    path: '/'+menu.menuClick,
                    name: menu.menuName,
                    meta:{
                        title:menu.menuName
                    },
                    component: () => import('../components/'+menu.menuComponent)
                }
                routeItem.children.push(childrenRoute)
            })
        }
    })
    router.addRoutes(routes)
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
