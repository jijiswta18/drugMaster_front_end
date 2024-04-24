// import Vue from 'vue';
// import Vuetify from 'vuetify/lib/framework';
// import th from 'vuetify/lib/locale/th';

// Vue.use(Vuetify);

// export default new Vuetify({
//     lang: {
//       locales: { th },
//       current: 'th',
//     },
//   icons: {
//     iconfont: 'fa',
//   },
// });

import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
      },
});
