import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypes from "./store/actionCreators";
import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";
import { getSongUrl, isEmptyObject, shuffle, findIndex } from "../../api/utils";
import Toast from "../../baseUI/toast";
import { playMode } from "../../api/config";

function Player(props) {
  const {
    playing,
    fullScreen,
    currentIndex,
    currentSong: immutableCurrentSong,
    playList: immutablePlayList,
    mode,
    sequencePlayList: immutableSequencePlayList,
  } = props;

  const {
    toggleFullScreenDispatch,
    togglePlayingDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changePlayListDispatch,
    changeModeDispatch,
  } = props;

  let currentSong = immutableCurrentSong.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();
  const playList = immutablePlayList.toJS();

  // 目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [modeText, setModeText] = useState("");
  const toastRef = useRef();

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  // const [percent, setPercent] = useState(
  //   isNaN(currentTime / duration) ? 0 : currentTime / duration
  // );

  // let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  // let setPercent = () => {
  //   percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  // };

  // 绑定播放标签 ref
  const audieRef = useRef();

  //记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
  const [preSong, setPreSong] = useState({});

  useEffect(() => {
    changeCurrentIndexDispatch(0);
  });

  // mock一份playList，后面直接从 redux 拿，现在只是为了调试播放效果。
  // const playList = [
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

  // const currentSong = {
  //   al: {
  //     picUrl:
  //       "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg",
  //   },
  //   name: "木偶人",
  //   ar: [{ name: "薛之谦" }],
  // };

  useEffect(() => {
    if (!currentSong) {
      return;
    }
    changeCurrentDispatch(0);
    let current = playList[0];
    changeCurrentDispatch(current);
    audieRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      audieRef.current.play();
    });
    togglePlayingDispatch(true);
    setCurrentTime(0);
    setDuration((current.dt / 1000) | 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    playing ? audieRef.current.play() : audieRef.current.pause();
  }, [playing]);

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id
    )
      return;
    let current = playList[currentIndex];
    changeCurrentDispatch(current); //赋值currentSong
    setPreSong(current);

    // Unhandled rejectjion (AbortError): THE fetching process for the
    // media resource was aborted by the use agent at the user's request
    // 这里需要判断 src 是否和之前一样
    // audioRef.current.src = getSongUrl(current.id);
    let src = getSongUrl(current.id);
    if (!src === audieRef.current.src) {
      audieRef.current.src = src;
    }

    setTimeout(() => {
      audieRef.current.play();
    });
    togglePlayingDispatch(true); //播放状态
    setCurrentTime(0); //从头开始播放
    setDuration((current.dt / 1000) | 0); //时长
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playList, currentIndex]);

  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  };

  const updateTime = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const onProgressChange = (curPercent) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    // setPercent(isNaN(newTime / duration) ? 0 : newTime / duration);
    audieRef.current.currentTime = newTime;
    if (!playing) {
      togglePlayingDispatch(true);
    }
  };

  // 一首歌循环
  const handleLoop = () => {
    audieRef.current.currentTime = 0;
    // setPercent(isNaN(currentTime / duration) ? 0 : currentTime / duration);
    // actionTypes.changePlayingState(true);
    togglePlayingDispatch(true);
    audieRef.current.play();
    if (!playing) {
      togglePlayingDispatch(true);
    }
  };

  const handlePre = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) {
      index = playList.length - 1;
    }
    if (!playing) {
      togglePlayingDispatch(true);
    }
    changeCurrentIndexDispatch(index);
  };

  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) {
      index = 0;
    }
    if (!playing) {
      togglePlayingDispatch(true);
    }
    changeCurrentIndexDispatch(index);
  };

  const changeMode = () => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      // 顺序模式
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText("顺序循环");
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList);
      setModeText("单曲循环");
    } else if (newMode === 2) {
      // 随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText("随机播放");
    }
    changeModeDispatch(newMode);
    toastRef.current.show();
  };

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  };

  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          song={currentSong}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          playing={playing}
          percent={percent}
        />
      )}
      {isEmptyObject(currentSong) ? null : (
        <NormalPlayer
          song={currentSong}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          playing={playing}
          currentTime={currentTime}
          duration={duration}
          percent={percent}
          onProgressChange={onProgressChange}
          handlePre={handlePre}
          handleNext={handleNext}
          mode={mode}
          changeMode={changeMode}
        />
      )}
      <audio
        ref={audieRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
      ></audio>
      <Toast text={modeText} ref={toastRef}></Toast>
    </div>
  );
}

const mapStateToProps = (state) => ({
  fullScreen: state.getIn(["player", "fullScreen"]),
  playing: state.getIn(["player", "playing"]),
  currentSong: state.getIn(["player", "currentSong"]),
  showPlayList: state.getIn(["player", "showPlayList"]),
  mode: state.getIn(["player", "mode"]),
  currentIndex: state.getIn(["player", "currentIndex"]),
  playList: state.getIn(["player", "playList"]),
  sequencePlayList: state.getIn(["player", "sequencePlayList"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayingDispatch(data) {
      dispatch(actionTypes.changePlayingState(data));
    },
    toggleFullScreenDispatch(data) {
      dispatch(actionTypes.changeFullScreen(data));
    },
    togglePlayListDispatch(data) {
      dispatch(actionTypes.changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(index) {
      dispatch(actionTypes.changeCurrentIndex(index));
    },
    changeCurrentDispatch(data) {
      dispatch(actionTypes.changeCurrentSong(data));
    },
    changeModeDispatch(data) {
      dispatch(actionTypes.changePlayMode(data));
    },
    changePlayListDispatch(data) {
      dispatch(actionTypes.changePlayList(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));
