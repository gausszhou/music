export default {
  setMessage(state, payload) {
    state.message = payload;
  },
  setSong(state, payload) {
    state.song = payload;
  },
  setPlayList(state, payload) {
    state.playList = payload;
  },
  setIsPlay(state, payload) {
    state.isPlay = payload;
  },
  setIsShow(state, payload) {
    state.isShow = payload;
  },
  setQuery(state, payload) {
    state.query = payload;
  },
  setMenuVisible(state, payload) {
    state.menuVisible = payload;
  },
  setIndex(state, payload) {
    state.activeIndex = payload;
  }
};
