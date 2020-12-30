import http from "../request/http";
export default {
  getMusicUrl({ commit }, payload) {
    let params = {
      id: payload
    };
    http.getSongUrl(params).then(res => {
      let url = res.data.data[0].url;
      commit('setMusicUrl', url);
    });
  }
};
