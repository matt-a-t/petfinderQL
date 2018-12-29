const axios = require('axios');

module.exports = {
  makeIterable: data => (data.length > 0 ? data : [data]),

  doRequest: (endpoint, params) => {
    console.log(endpoint, JSON.stringify(params));
    return axios.get(endpoint, {
      params
    });
  }
};
