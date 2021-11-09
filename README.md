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


## 歌单详情1 情感切页动画
使用第三方库 `react-transition-group`
```bash
yarn add react-transition-group
```

`Album/style.js` 样式应调整为
```js
export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: ${style["background-color"]};
  transform-origin: right bottom;
  &.fly-enter,
  &.fly-appear {
    transform: rotateZ(0deg) translate3d(100%, 0, 0);
  }
  &.fly-appear.fly-appear-active,
  &.fly-appear-done.fly-enter-done {
    transition: transform 0.3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit.fly-exit-active {
    transition: transform 0.3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`;
```

## 播放器 
js 中写 css 应该注意空格，有些空格会导致 css 失效
```js
`translate3d(${x}px, ${y}px, 0) scale(${scale})`;
```

TODO: 播放器4
https://juejin.cn/book/6844733816460804104/section/6844733816578244622