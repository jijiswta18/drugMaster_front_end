import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'


import LoginView from '../views/LoginView.vue'
import LayoutView from '../views/LayoutView.vue'
import PageNotFound from '../views/NotFound.vue'

import DrugAll from '../views/drug/DrugAll.vue'
import DrugById from '../views/drug/drugDetail/DrugById.vue'
import MedicineRules from '../views/medicine/MedicineRules.vue'
import ReceiveRules from '../views/receive/ReceiveRules.vue'




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
 
    beforeEnter (to, from, next) {

      store.dispatch('checkLogin')
      if(store.state.user){
        next()  
      }else{
        next({ name: 'login' })
      }

    },
    // beforeEnter (to, from, next) {

    //   store.dispatch('checkLogin')
    //   if(store.state.user === true){
    //     next()  
    //   }else{
    //     next({ name: 'login' })
    //   }

    // },

    children: [
   
      {
        path: '/drug',
        name: 'drug-all',
        component: DrugAll
      },
      {
        path: '/drug/:id',
        name: 'drug-detail',
        component: DrugById
      },
      
      {
        path: '/medicine/',
        name: 'medicine-rules',
        component: MedicineRules
      },

      {
        path: '/receive/',
        name: 'receive-rules',
        component: ReceiveRules
      },
    ]
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: PageNotFound },

]


const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
