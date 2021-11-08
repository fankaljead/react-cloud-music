import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get("/banner");
};

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized");
};

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (category, alpha, count, area) => {
  return axiosInstance.get(
    `/artist/list?type=${category}&area=${area}&initial=${alpha.toLowerCase()}&offset=${count}`
  );
};

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};
