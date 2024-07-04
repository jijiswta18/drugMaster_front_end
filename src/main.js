import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import Swal from 'sweetalert2';
import store from './store'
import VueAxios from 'vue-axios'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.min.css'



Vue.use(router)
Vue.use(VueAxios, axios)

Vue.prototype.$axios = axios;
Vue.prototype.$swal = Swal;

Vue.config.productionTip = false



axios.defaults.baseURL = '';

// Set default proxy for Axios

axios.defaults.proxy = {
  host: '172.19.96.143',
  port: 9090
};


// axios.defaults.baseURL = 'http://172.19.107.54:8080';


// axios.defaults.headers.common = {
//   "Content-Type": "application/json",
//   'X-Requested-With': 'XMLHttpRequest',
  
// };

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
