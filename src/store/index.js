import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    user: null,
  }
}

export default new Vuex.Store({

  plugins: [new VuexPersistence().plugin],
  state: getDefaultState(),

  getters: {
    user (state) {
      return state.user
    },
  },
  mutations: {
    authUser (state, data) {
      state.user = data
    },
    clearAuthUser (state){
      state.user = null
      localStorage.removeItem('token')

      localStorage.removeItem('expirationDate')

    }
  },
  actions: {

    async login ( {commit}, authData){

      let path = await `/RestfulWS/username/${authData.username}/password/${authData.password}`

      let response =  await axios.get(path , {
        headers: {
               // remove headers
             }
           }).then(res => {
             console.log(res);
           }).catch(err => {
             console.log(err.response);
           });

    //   const expirationTime = await 1000 * 60 * 60; // 1 hour

    //   const now = await Date.now();
    console.log(response);

      await commit('authUser', 'response.data.userdata')
    //   await commit('authUser', response.data.userdata)

    //   await localStorage.setItem('token', response.data.token) 

    //   await localStorage.setItem("expirationDate", now + expirationTime);

    },
   
    async logout({commit}){

      let path = await '/api/logout'
      // let response =  await axios.post(path)
      // let response =  await axios.post(path,{user_id: authData.user_id})
      let response =  await axios.post(path)

      console.log(response);

      commit('clearAuthUser')
    },

    checkLogin({ commit }){
      

      const expiration = localStorage.getItem('expirationDate');

      if(expiration < Date.now()){
        console.log('expire','now')
        commit('clearAuthUser')
        return
      }

    },

  },
  modules: {
  }
})