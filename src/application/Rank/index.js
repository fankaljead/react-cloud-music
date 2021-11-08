import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRankList } from "./store";
import { filterIndex } from "../../api/utils";
import { renderRoutes } from "react-router-config";
import { List, ListItem, SongList, Container } from "./style";
import { EnterLoading } from "./../Singers/style";
import Scroll from "../../baseUI/scroll/index";
import Loading from "../../baseUI/loading";

function Rank(props) {
  const { rankList: list, loading } = props;
  const { getRankListDataDispatch } = props;

  let rankList = list ? list.toJS() : [];

  useEffect(() => {
    getRankListDataDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  // const enterDetail = (name) => {
  //   const idx = filterIdx(name);
  //   if (idx === null) {
  //     alert("暂无相关数据");
  //     return;
  //   }
  // };

  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`);
  };

  // 渲染榜单列表函数，传入 global 变量来区分不同布局方式
  const renderRankList = (list, global) => {
    // console.log(global);
    // console.log(list);
    return (
      <List globalRank={global}>
        {list.map((item, index) => {
          return (
            <ListItem
              key={item.coverImgId + "" + index} // key 唯一
              tracks={item.tracks}
              onClick={() => enterDetail(item)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };

  let displayStyle = loading ? { display: "none" } : { display: "" };

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            {" "}
            官方榜{" "}
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            {" "}
            全球榜{" "}
          </h1>
          {renderRankList(globalList, true)}
          {loading ? (
            <EnterLoading>
              <Loading></Loading>
            </EnterLoading>
          ) : null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(["rank", "rankList"]),
  loading: state.getIn(["rank", "loading"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
