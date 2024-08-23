import Vue from "vue"
import VueRouter from "vue-router"
import store from "../store/index.js"


import LoginView from "../views/LoginView.vue"
import LayoutView from "../views/LayoutView.vue"
import PageNotFound from "../views/NotFound.vue"

import DrugAll from "../views/drug/DrugAll.vue"
import DrugNotify from "../views/drug/DrugNotify.vue"
import MedicineRules from "../views/medicine/MedicineRules.vue"
import ReceiveRules from "../views/receive/ReceiveRules.vue"




Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { 
      path: "/",
      component: LayoutView,
      meta: { requiresAuth: true }, 
      children: [
    
        {
          path: '',
          name: "drug-all",
          component: DrugAll
        },
        
        {
          path: 'drug-notify',
          name: "drug-notify",
          component: DrugNotify
        },
        
        
        {
          path: "medicine",
          name: "medicine-rules",
          component: MedicineRules
        },

        {
          path: "receive",
          name: "receive-rules",
          component: ReceiveRules
        },
      ]
    },

    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },

    { path: "/:pathMatch(.*)*", name: "NotFound", component: PageNotFound },
  ]
})




router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the route requires authentication
    store.dispatch('checkLogin');

    // Check if the user is authenticated
    if (!store.getters.isLoggedIn) {
      next('/login'); // Redirect to login page if not authenticated
    } else {
      next(); // Proceed to the route
    }
  } else if (to.name === 'Login') {
    // If navigating to the login page, clear store and proceed
    store.dispatch('clearUserData'); // Replace with your Vuex action to clear user data
    next();
  } else {
    next(); // Continue to other routes
  }
});

// const router = new VueRouter({
//   mode: "history",
//   // base: process.env.BASE_URL,
//   routes
// })


export default router
