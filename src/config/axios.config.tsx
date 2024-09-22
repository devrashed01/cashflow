import axios from "axios";

const privateRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

privateRequest.defaults.headers.common["Authorization"] =
  localStorage.getItem("token");

privateRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 400 && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default privateRequest;
