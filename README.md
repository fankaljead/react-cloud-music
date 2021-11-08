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

## 用 hooks 写一个简单的 redux


DONE: 下拉刷新没有保留地区，
https://juejin.cn/book/6844733816460804104/section/6844733816561516551