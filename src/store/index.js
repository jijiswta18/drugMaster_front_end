
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const getDefaultState = () => {
    return {
      user: null,
      sessionTimeout: null,
    }
  }
  
  export default new Vuex.Store({
  
    plugins: [new VuexPersistence().plugin],
    state: getDefaultState(),
    getters: {
      user (state) {
        return state.user
      },
      sessionTimeout(state){
          return state.sessionTimeout
      },
       
    },
    mutations: {
        authUser (state, data) {
            state.user = data
            console.log(state.user);
        },

        setSessionTimeout(state, timeout) {
            state.sessionTimeout = timeout
        },
        
        clearAuthUser (state){
          state.user = null
          state.sessionTimeout = null
          localStorage.removeItem('expirationDate')
    
        }
    },
    actions: {
  
      async login ( {commit}, authData){
  
        let ldapPath = `/ldap/RestfulWS/username/${authData.username}/password/${authData.password}`
                
        let response = await axios.get(ldapPath);

        console.log(response);

        const expirationTime = await 1000 * 60 * 60; // 1 hour
  
        const now = await Date.now();
  
        commit('authUser', response.data)

        commit('setSessionTimeout',  now + expirationTime)

       
        localStorage.setItem("expirationDate", now + expirationTime);

      },

      checkLogin({ commit }){

        const expiration = localStorage.getItem('expirationDate');
  
        if(expiration < Date.now()){
          console.log('expire','now')
          commit('clearAuthUser')
          return
        }
  
      },

      async logout({commit}){
        commit('clearAuthUser')
      },
   
  
    },
    modules: {
    }
  })
  
