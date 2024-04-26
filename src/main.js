import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
// import store from './store'
import VueAxios from 'vue-axios'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.min.css'


Vue.use(router)
Vue.use(VueAxios, axios)



Vue.config.productionTip = false

// axios.defaults.baseURL = '';


// axios.defaults.headers.common = {
//   "Content-Type": "application/json",
//   'X-Requested-With': 'XMLHttpRequest',
  
// };

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

new Vue({
  vuetify,
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
