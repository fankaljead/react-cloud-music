import React, { useEffect, useContext } from "react";
import Horizen from "../../baseUI/horizen-item";
import { categoryTypes, alphaTypes, singerAreas } from "../../api/config";
import { NavContainer, ListContainer, List, ListItem } from "./style";
import Scroll from "./../../baseUI/scroll/index";
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList,
} from "./store/actionCreators";
import { connect } from "react-redux";
import LazyLoad, { forceCheck } from "react-lazyload";
import Loading from "../../baseUI/loading";
import {
  CategoryDataContext,
  CHANGE_ALPHA,
  CHANGE_AREA,
  CHANGE_CATEGORY,
  Data,
} from "./data";
import { renderRoutes } from "react-router-config";



//mock 数据
// const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
//   return {
//     picUrl:
//       "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
//     name: "隔壁老樊",
//     accountId: 277313426,
//   };
// });

// 渲染函数，返回歌手列表
// const renderSingerList = () => {
//   return (
//     <List>
//       {singerList.map((item, index) => {
//         return (
//           <ListItem key={item.accountId + "" + index}>
//             <div className="img_wrapper">
//               <img
//                 src={`${item.picUrl}?param=300x300`}
//                 width="100%"
//                 height="100%"
//                 alt="music"
//               />
//             </div>
//             <span className="name">{item.name}</span>
//           </ListItem>
//         );
//       })}
//     </List>
//   );
// };

function Singers(props) {
  // let [category, setCategory] = useState("");
  // const [alpha, setAlpha] = useState("");
  // const [area, setArea] = useState("-1");
  const { data, dispatch } = useContext(CategoryDataContext);
  const { category, alpha, area } = data.toJS();
  const {
    getHotSingerDispatch,
    updateDispatch,
    pullDownRefreshDispatch,
    pullUpRefreshDispatch,
    songsCount
  } = props;
  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount,
  } = props;

  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch();
    }
    console.log("enterloading:", enterLoading);
    // eslint-disable-next-line
  }, []);

  let handleUpdateAlpha = (val) => {
    // setAlpha(val);
    dispatch({ type: CHANGE_ALPHA, data: val });
    console.log("alpha:", val);
    updateDispatch(category, val, area);
  };

  let handleUpdateArea = (val) => {
    // setArea(val);
    dispatch({ type: CHANGE_AREA, data: val });
    updateDispatch(category, alpha, val);
  };

  let handleUpdateCategory = (val) => {
    // setCategory(val);
    dispatch({ type: CHANGE_CATEGORY, data: val });
    updateDispatch(val, alpha, area);
    console.log("category:", val);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === "", pageCount, area);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha, area);
  };

  const enterDetail = (id) => {
    props.history.push(`/singers/${id}`);
  };

  const renderSingerList = () => {
    const list = singerList ? singerList.toJS() : [];
    return (
      <List>
        {list.map((item, index) => {
          return (
            <ListItem
              key={item.accountId + "" + index}
              onClick={() => {
                enterDetail(item.id);
              }}
            >
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require("./singer.png")}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div>
      <Data>
        <NavContainer>
          <Horizen
            list={singerAreas}
            title={"地区: "}
            handleClick={(val) => handleUpdateArea(val)}
            oldVal={area}
          ></Horizen>
          <Horizen
            list={categoryTypes}
            title={"分类 (默认热门)"}
            handleClick={(val) => handleUpdateCategory(val)}
            oldVal={category}
          ></Horizen>
          <Horizen
            list={alphaTypes}
            title={"首字母: "}
            handleClick={(val) => handleUpdateAlpha(val)}
            oldVal={alpha}
          ></Horizen>
        </NavContainer>

        <ListContainer play={songsCount}>
          <Scroll
            pullUp={handlePullUp}
            pullDown={handlePullDown}
            pullUpLoading={pullUpLoading}
            pullDownLoading={pullDownLoading}
            onScroll={forceCheck}
          >
            {renderSingerList()}
          </Scroll>
          <Loading show={enterLoading}></Loading>
        </ListContainer>
      </Data>

      {renderRoutes(props.route.routes)}
    </div>
  );
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(["singers", "singerList"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
  pageCount: state.getIn(["singers", "pageCount"]),
  songsCount: state.getIn(["player", "playList"]).size,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha, area) {
      dispatch(changePageCount(0)); //由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true)); //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha, area));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count, area) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha, area));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha, area) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0)); //属于重新获取数据
      if (category === "" && alpha === "" && area === "") {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha, area));
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
