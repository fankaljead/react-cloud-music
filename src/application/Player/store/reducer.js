import * as actionTypes from "./constants";
import { fromJS } from "immutable";
import { playMode } from "../../../api/config";
import { findIndex } from "../../../api/utils";

// mock一份playList，后面直接从 redux 拿，现在只是为了调试播放效果。
// const list = [
//   {
//     ftype: 0,
//     djId: 0,
//     a: null,
//     cd: "01",
//     crbt: null,
//     no: 1,
//     st: 0,
//     rt: "",
//     cf: "",
//     alia: ["手游《梦幻花园》苏州园林版推广曲"],
//     rtUrls: [],
//     fee: 0,
//     s_id: 0,
//     copyright: 0,
//     h: {
//       br: 320000,
//       fid: 0,
//       size: 9400365,
//       vd: -45814,
//     },
//     mv: 0,
//     al: {
//       id: 84991301,
//       name: "拾梦纪",
//       picUrl:
//         "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
//       tns: [],
//       pic_str: "109951164627180052",
//       pic: 109951164627180050,
//     },
//     name: "拾梦纪",
//     l: {
//       br: 128000,
//       fid: 0,
//       size: 3760173,
//       vd: -41672,
//     },
//     rtype: 0,
//     m: {
//       br: 192000,
//       fid: 0,
//       size: 5640237,
//       vd: -43277,
//     },
//     cp: 1416668,
//     mark: 0,
//     rtUrl: null,
//     mst: 9,
//     dt: 234947,
//     ar: [
//       {
//         id: 12084589,
//         name: "妖扬",
//         tns: [],
//         alias: [],
//       },
//       {
//         id: 12578371,
//         name: "金天",
//         tns: [],
//         alias: [],
//       },
//     ],
//     pop: 5,
//     pst: 0,
//     t: 0,
//     v: 3,
//     id: 1416767593,
//     publishTime: 0,
//     rurl: null,
//   },
// ];

const handleDeleteSong = (state, song) => {
  // 也可用 loadsh 库的 deepClone 方法。这里深拷贝是基于纯函数的考虑，不对参数 state 做修改
  const playList = JSON.parse(JSON.stringify(state.get("playList").toJS()));
  const sequenceList = JSON.parse(
    JSON.stringify(state.get("sequencePlayList").toJS())
  );
  let currentIndex = state.get("currentIndex");
  // 找对应歌曲在播放列表中的索引
  const fpIndex = findIndex(song, playList);
  // 在播放列表中将其删除
  playList.splice(fpIndex, 1);
  // 如果删除的歌曲排在当前播放歌曲前面，那么 currentIndex--，让当前的歌正常播放
  if (fpIndex < currentIndex) currentIndex--;

  // 在 sequenceList 中直接删除歌曲即可
  const fsIndex = findIndex(song, sequenceList);
  sequenceList.splice(fsIndex, 1);

  return state.merge({
    playList: fromJS(playList),
    sequencePlayList: fromJS(sequenceList),
    currentIndex: fromJS(currentIndex),
  });
};

const handleInsertSong = (state, song) => {
  const playList = JSON.parse(JSON.stringify(state.get("playList").toJS()));
  const sequenceList = JSON.parse(
    JSON.stringify(state.get("sequencePlayList").toJS())
  );

  if (!playList.length && !sequenceList.length) {
    return state.merge({
      playList: fromJS([song]),
      sequencePlayList: fromJS([song]),
      currentIndex: fromJS(0),
    });
  }
  let currentIndex = state.get("currentIndex");
  // 看看有没有同款
  let fpIndex = findIndex(song, playList);
  // 如果是当前歌曲直接不处理
  if (fpIndex === currentIndex && currentIndex !== -1) return state;
  currentIndex++;
  // 把歌放进去，放到当前播放曲目的下一个位置
  playList.splice(currentIndex, 0, song);
  // 如果列表中已经存在要添加的歌，暂且称它 oldSong
  if (fpIndex > -1) {
    // 如果 oldSong 的索引在目前播放歌曲的索引小，那么删除它，同时当前 index 要减一
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1);
      currentIndex--;
    } else {
      // 否则直接删掉 oldSong
      playList.splice(fpIndex + 1, 1);
    }
  }
  // 同理，处理 sequenceList
  let sequenceIndex = findIndex(playList[currentIndex], sequenceList) + 1;
  let fsIndex = findIndex(song, sequenceList);
  // 插入歌曲
  sequenceList.splice(sequenceIndex, 0, song);
  if (fsIndex > -1) {
    // 跟上面类似的逻辑。如果在前面就删掉，index--; 如果在后面就直接删除
    if (sequenceIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1);
      sequenceIndex--;
    } else {
      sequenceList.splice(fsIndex + 1, 1);
    }
  }
  return state.merge({
    playList: fromJS(playList),
    sequencePlayList: fromJS(sequenceList),
    currentIndex: fromJS(currentIndex),
  });
};

const defaultState = fromJS({
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  // sequencePlayList: list,
  // playList: list,
  mode: playMode.sequence,
  currentIndex: 0,
  showPlayList: false,
  currentSong: {},
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      return state.set("currentSong", action.data);
    case actionTypes.SET_FULL_SCREEN:
      return state.set("fullScreen", action.data);
    case actionTypes.SET_PLAYING_STATE:
      return state.set("playing", action.data);
    case actionTypes.SET_SEQUENCE_PLAYLIST:
      return state.set("sequencePlayList", action.data);
    case actionTypes.SET_PLAYLIST:
      return state.set("playList", action.data);
    case actionTypes.SET_PLAY_MODE:
      return state.set("mode", action.data);
    case actionTypes.SET_CURRENT_INDEX:
      return state.set("currentIndex", action.data);
    case actionTypes.SET_SHOW_PLAYLIST:
      return state.set("showPlayList", action.data);
    case actionTypes.DELETE_SONG:
      return handleDeleteSong(state, action.data);
    case actionTypes.INSERT_SONG:
      return handleInsertSong(state, action.data);
    default:
      return state;
  }
};

export default reducer;
