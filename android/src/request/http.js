/* http配置,接口管理 */
// 引入axios
import axios from 'axios';
// 超时设置
axios.defaults.setTimeout == 5000;
// Post请求，默认类型
axios.defaults.headers.post['Content-Type'] = 'application/json';


function serialize(params) {
  if (!params || Object.prototype.toString.call(params) != "[object Object]") {
    return "";
  }
  let str = "?",
    keys = Object.keys(params);
  keys.forEach(k => {
    if (Object.prototype.toString.call(params[k]) === "[object Object]" || Object.prototype.toString.call(params[k]) ===
      "[object Array]") {
      str += k + "=" + JSON.stringify(params[k]) + "&";
    } else {
      str += k + "=" + params[k] + "&";
    }
  });
  return str.substr(0, str.length - 1);
}



let baseUrl = "http://netmusic.gausszhou.top";
// let baseUrl = "https://autumnfish.cn";

// 文档地址
// https://binaryify.github.io/NeteaseCloudMusicApi/#/
let localUrl = "./mock";

export default {
  // login
  login: (params) => axios.get(baseUrl + '/login/cellphone' + serialize(params)),
  // home
  getPersonalized: () => axios.get(baseUrl + "/personalized"),
  getNewSong: () => axios.get(baseUrl + "/personalized/newsong"),
  // search
  getSearchHot: () => axios.get(baseUrl + "/search/hot"),
  getSearch: (params) => axios.get(baseUrl + "/search" + serialize(params)),
  // 
  getSongUrl: (params) => axios.get(baseUrl + "/song/url" + serialize(params)),
  getMvUrl: (params) => axios.get(baseUrl + "/mv/url" + serialize(params)),
  getSongDetail: (params) => axios.get(baseUrl + "/song/detail" + serialize(params)),


  // 歌单详情 /playlist/detail id
  getPlayListDetail: (params) => axios.get(baseUrl + '/playlist/detail' + serialize(params)),
  // 获取歌曲详情 /song/detail?ids=347230,347231
  getSongDetail: (params) => axios.get(baseUrl + '/song/detail' + serialize(params)),
  // 获取歌单评论 /comment/playlist
  getCommentPlayList: (params) => axios.get(baseUrl + '/comment/playlist' + serialize(params)),
  // 获取热门评论  /comment/hot
  getCommentHot: (params) => axios.get(baseUrl + '/comment/hot' + serialize(params)),

  // youdao 
  getWordList: () => axios.get(localUrl + "/word.json"),
};

