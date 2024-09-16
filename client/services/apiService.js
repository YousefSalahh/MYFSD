import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/';

// Request interceptor
axios.interceptors.request.use(
  function (config) {
    const accessToken =
      localStorage.getItem("jwt") && localStorage.getItem("jwt");
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };

    config.headers.common = headers;
    config.baseURL = baseUrl;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
