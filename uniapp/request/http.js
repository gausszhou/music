let baseUrl = "https://autumnfish.cn";
// https://binaryify.github.io/NeteaseCloudMusicApi/#/
let localUrl = "./mock"

const request = (url = '', data = {}, type = 'GET', header = {}) => {
  return new Promise((resolve, reject) => {
    uni.request({
      method: type,
      url,
      data,
      header,
      dataType: 'application/json',
    }).then((response) => {
      let [error, res] = response;
      resolve(res);
    }).catch(error => {
      let [err, res] = error;
      reject(err)
    })
  });
}


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



const http = {
  // login
  login: (params) => request(baseUrl + '/login/cellphone' + serialize(params)),
  // nethome
  getPersonalized: () => request(baseUrl + "/personalized"),
  getNewSong: () => request(baseUrl + "/personalized/newsong"),
  // netsearch
  getNetSearchHot: () => request(baseUrl + "/search/hot"),
  getNetSearchMusic: (params) => request(baseUrl + "/search" + serialize(params)),
  getNetAudioUrl: (params) => request(baseUrl + "/song/url" + serialize(params)),
  getNetMvUrl: (params) => request(baseUrl + "/mv/url" + serialize(params)),
  getNetDetail: (params) => request(baseUrl + "/song/detail" + serialize(params)),
  // youdao 
  getWordList:() => request(localUrl + "/word.json"),
}

export default http
