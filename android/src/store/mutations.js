export default {
  setIsPlaying(state, payload) {
    state.isPlaying = payload;
  },
  setIsShow(state, payload) {
    state.isShow = payload;
  },
  setSong(state, payload) {
    state.song = payload;
  },
  setPlayList(state, payload) {
    state.playList = payload;
  },
  setMenuVisible(state, payload) {
    state.menuVisible = payload;
  }
};
