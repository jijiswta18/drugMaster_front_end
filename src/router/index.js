import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DrugAll from '../views/drug/DrugAll.vue'
import DrugDetail from '../views/drug/DrugDetail.vue'

import LayoutView from '../views/LayoutView.vue'


Vue.use(VueRouter)

const routes = [

    {
    path: '/',
    name: 'login',
    component: LoginView
  },

  { 
    path: '/drug',
    component: LayoutView,
    // beforeEnter (to, from, next) {
      
      // store.dispatch('checkLogin')
      // if(store.state.user && store.state.user.roles == 'user'){
      //   next()      
      // }else{
      //   // console.log('==========');
      //   // next('/user/login')
      //   next({ name: 'userLogin' })
      // }

      children: [
        {
          path: '/drug',
          name: 'drug-all',
          component: DrugAll
        },
        {
          path: '/drug/:id',
          name: 'drug-detail',
          component: DrugDetail
        },
      ]
    },
  

  // {
  //   path: '/layout',
  //   name: 'layout',
  //   component: LayoutView,
  //   children: [
  //     {
  //       path: '/drug',
  //       name: 'drug-all',
  //       component: DrugAll
  //     },
  //     {
  //       path: '/drug/:id',
  //       name: 'drug-detail',
  //       component: DrugDetail
  //     },
  //   ]
  // },

  
  // {
  //   path: '/',
  //   name: 'login',
  //   component: LoginView
  // },
  
  // {
  //   path: '/drug',
  //   name: 'drug-all',
  //   component: DrugAll
  // },
  // {
  //   path: '/drug/:id',
  //   name: 'drug-detail',
  //   component: DrugDetail
  // },

  // {
  //   path: '/home',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
