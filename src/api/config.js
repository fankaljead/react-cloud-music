import axios from "axios";

// export const baseUrl = "http://127.0.0.1:4000";
export const baseUrl = "https://music-api-five.vercel.app";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err, "网络错误");
  }
);

export { axiosInstance };
