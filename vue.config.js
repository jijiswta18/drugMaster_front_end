module.exports = {
  devServer: {
    proxy: {
      '^/api/': {
        target: 'http://172.20.5.171:9098', // Replace with your API base URL

      },
      '^/active_directory/': {
        target: 'http://172.19.107.54:8080', // Replace with your API base URL

      },
      
    },
  },
};

