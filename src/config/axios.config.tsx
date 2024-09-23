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
    if ([400, 422].includes(error.response?.status) && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default privateRequest;
