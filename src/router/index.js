import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    children: [

      {
        // 图层
        path: '/WareHouseMain',
        name: 'WareHouseMain',
        component: () => import('../views/WareHouseMain.vue'),
      },
      {
        // 地图量算
        path: '/MeasureMap',
        name: 'MeasureMap',
        component: () => import('../views/MeasureMap.vue'),
      },
      {
        // 地图量算
        path: '/FmenHotMap',
        name: 'FmenHotMap',
        component: () => import('../views/FmenHotMap.vue'),
      },
      {
        // 地图量算
        path: '/FmenNearPlan',
        name: 'FmenNearPlan',
        component: () => import('../views/FmenNearPlan.vue'),
      },
      {
        // 地图量算
        path: '/FireBuffer',
        name: 'FireBuffer',
        component: () => import('../views/FireBuffer.vue'),
      },


    ],
  },
  {
    path: '/login',
    name: 'LoginUser',
    component: () => import('../views/LoginUser.vue'),
  },
]

const router = new VueRouter({
  routes,
})

// 路由导航
router.beforeEach((to, from, next) => {
  const username = sessionStorage.getItem('username')

  // console.log(username)

  if (to.path !== '/login' && username === null) next('/login')
  next()
})

export default router
