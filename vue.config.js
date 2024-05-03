// const { defineConfig } = require('@vue/cli-service')


// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// module.exports defineConfig({
//   devServer: {
//     proxy: {
//       '/api': 'http://172.19.107.54:8080'
//     }
//   },
// })

// module.exports = {
//   transpileDependencies: ['vuetify'],
//   devServer: {
//     proxy: {
//         "/ldap" :{
//           target: "http://172.19.107.54:8080/ldap",
//           secure: false,
//           changeOrigin: true
//         }
   
//     }
//   }
 
// }

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://172.20.5.171:9098', // Replace with your API base URL

      },
      '^/active_directory': {
        target: 'http://172.19.107.54:8080', // Replace with your API base URL

      },
      // '^/ldap': {
      //   target: 'http://172.19.107.54:8080', // Replace with your API base URL

      // },
    },
  },
};