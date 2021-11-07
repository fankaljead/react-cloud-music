# 推荐模块1：打造炫酷轮播及列表
## 轮播组件开发
- `Recommend` 组件

- `Slider` 组件
    -   安装 `swiper` 插件
    ```bash
    yarn add swiper
    ```

    - 引入 CSS
    ```js
    // slider/index.js
    import "swiper/swiper.min.css";
    ```

## 分布拆解 `scroll` 组件
- 安装 `better-scroll`
```bash
yarn add better-scroll@next
```

## axios 请求封装
- 安装 
```bash
yarn add axios
```


## 一个在线的网易云 API 网站
```js
export const baseUrl = "https://music-api-five.vercel.app";
```

## 图片懒加载
- 安装 `react-lazyload`
```bash
yarn add react-lazyload
```


## 请求歌手分类数据
- 歌手分类数据
```js
// api/config.js
// 歌手种类
export const categoryTypes = [
  {
    name: "华语男",
    key: "1",
  },
  {
    name: "华语女",
    key: "2",
  },
  {
    name: "华语组合",
    key: "3",
  },
  {
    name: "欧美男",
    key: "4",
  },
  {
    name: "欧美女",
    key: "5",
  },
  {
    name: "欧美组合",
    key: "6",
  },
  {
    name: "日本男",
    key: "7",
  },
  {
    name: "日本女",
    key: "8",
  },
  {
    name: "日本组合",
    key: "9",
  },
  {
    name: "韩国男",
    key: "10",
  },
  {
    name: "韩国女",
    key: "11",
  },
  {
    name: "韩国组合",
    key: "12",
  },
  {
    name: "其他男歌手",
    key: "13",
  },
  {
    name: "其他女歌手",
    key: "14",
  },
  {
    name: "其他组合",
    key: "15",
  },
];

```

- 请求 URL 为 
```js
// api/request.js
export const getSingerListRequest = (category, alpha, count) => {
  return axiosInstance.get(
    `/artist/list?type=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
  );
};
```