(window.webpackJsonp=window.webpackJsonp||[]).push([["app"],{0:function(t,e,n){t.exports=n("56d7")},"0503":function(t,e,n){},"0f4e":function(t,e,n){},"121f":function(t,e,n){},"1be0":function(t,e,n){},"1bea":function(t,e,n){},2644:function(t,e,n){},"274b":function(t,e,n){"use strict";n("0503")},"43cc":function(t,e,n){"use strict";n("121f")},"449c":function(t,e,n){},"4cf4":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),s=(n("ac1f"),n("5319"),{name:"loginDialog",data:function(){return{visible:!0,form:{phone:"",password:""}}},methods:{submitOK:function(){var t=this,e=this.form;this.$http.login(e).then((function(e){console.log(e),t.$message({message:"登录成功",type:"success"}),t.handleClose(),t.$router.go(0)})).catch((function(e){console.log(e),t.$message({message:"登录失败",type:"error"})}))},handleClose:function(){this.visible=!1,this.$emit("change")}}}),a=n("2877"),o={name:"topbarVue",components:{loginDialog:Object(a.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{title:"登录网易云",visible:t.visible,width:"450px","append-to-body":""},on:{"update:visible":function(e){t.visible=e},close:t.handleClose}},[n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px",inline:!1,size:"normal"}},[n("el-form-item",{attrs:{label:"手机号"}},[n("el-input",{attrs:{type:"text",autocomplete:""},model:{value:t.form.phone,callback:function(e){t.$set(t.form,"phone",e)},expression:"form.phone"}})],1),n("el-form-item",{attrs:{label:"密码"}},[n("el-input",{attrs:{type:"password",autocomplete:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitOK(e)}},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1)],1),n("span",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.submitOK}},[t._v("登录")]),n("el-button",{attrs:{size:"small"},on:{click:t.handleClose}},[t._v("取消")])],1)],1)}),[],!1,null,null,null).exports},data:function(){return{query:"",loginDialogVisible:!1}},methods:{loginDialogOpen:function(){this.loginDialogVisible=!0},loginDialogChange:function(){this.loginDialogVisible=!1},search:function(){this.query?(this.$store.commit("setQuery",this.query),this.$router.replace({name:"search",query:{keywords:this.query}})):this.$message({message:"请输入有效内容",type:"warning"})},go:function(t){this.$router.go(t)}}},r=(n("274b"),Object(a.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"top-container"},[n("div",{staticClass:"left-box"},[t._m(0),n("div",{staticClass:"history-wrapper"},[n("span",{staticClass:"iconfont icon-arrow-left",on:{click:function(e){return t.go(-1)}}}),n("span",{staticClass:"iconfont icon-arrow-right",on:{click:function(e){return t.go(1)}}})])]),n("div",{staticClass:"right-box"},[n("el-button",{staticClass:"button-login",attrs:{type:"primary",size:"small"},on:{click:t.loginDialogOpen}},[t._v("登录")]),n("div",{staticClass:"el-input el-input--small el-input--prefix"},[n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.query,expression:"query",modifiers:{trim:!0}}],staticClass:"el-input__inner",attrs:{type:"text",autocomplete:"off",placeholder:"搜索"},domProps:{value:t.query},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)},input:function(e){e.target.composing||(t.query=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),t._m(1)])],1),t.loginDialogVisible?n("loginDialog",{on:{change:t.loginDialogChange}}):t._e()],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"icon-wrapper"},[e("a",{attrs:{href:"http://musicapi.gausszhou.top",target:"__blank"}},[this._v("后台接口")]),e("a",{staticStyle:{color:"#409eff",margin:"0 10px"},attrs:{href:"https://github.com/gausszhou/music",target:"__blank"}},[this._v("项目地址")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"el-input__prefix"},[e("i",{staticClass:"el-input__icon el-icon-search"})])}],!1,null,"4f2c118a",null).exports),c={name:"playList",methods:{playMusic:function(t,e){this.$store.dispatch("playMusic",t),this.$store.commit("setIndex",e)}}},l=(n("43cc"),Object(a.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"play-list"},[n("div",{staticClass:"play-list-title"},[t._v("播放列表")]),n("div",{staticClass:"play-list-control"},[n("div",{staticClass:"total"},[t._v("总"+t._s(t.$store.state.playList.length)+"首")]),t._m(0),t._m(1)]),n("ul",{staticClass:"play-list-box"},t._l(t.$store.state.playList,(function(e,i){return n("li",{key:e.id,staticClass:"song-item overEllipsis"},[n("span",{staticClass:"name overEllipsis"},[t._v(t._s(e.name))]),e.mvid?n("span",{staticClass:"mv-tag"},[t._v("MV")]):t._e(),t._l(e.author,(function(e,i){return n("span",{key:i,staticClass:"author"},[t._v(t._s(e.name)+".")])})),n("span",{staticClass:"album overEllipsis"},[t._v(t._s(e.albumname))]),n("a",{staticClass:"iconfont play-button",class:i==t.$store.state.activeIndex?"icon-pause-mobile":"icon-play-mobile",attrs:{href:"javascript:;"},on:{click:function(n){return t.playMusic(e,i)}}})],2)})),0)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"subscribe"},[e("i"),this._v(" 收藏全部 ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"clearall"},[e("i"),this._v(" 清空全部 ")])}],!1,null,"2fb206f0",null).exports),u=(n("a9e3"),{name:"lyric",props:{time:{type:[Number,String],default:function(){return 0}}},data:function(){return{index:0}},computed:{lyric:function(){return this.$store.state.lyric}},watch:{time:function(t){for(var e=0;e<this.lyric.length;e++)t>this.lyric[e].time&&(this.index=e)}}}),m=(n("e5a1"),Object(a.a)(u,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"lyric"},[e("div",[this._v(this._s(this.$store.state.lyric[this.index].word||""))])])}),[],!1,null,"2a0d4891",null).exports),d={name:"songDrawer",data:function(){return{bar:n("b819"),disc:n("6743")}}},f=(n("e600"),{name:"audioVue",components:{playList:l,lyric:m,songDrawer:Object(a.a)(d,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"songDrawer"},[e("div",{staticClass:"player_con",class:{playing:this.$store.state.isPlay}},[e("img",{staticClass:"play_bar",attrs:{src:this.bar}}),e("img",{staticClass:"disc autoRotate",attrs:{src:this.disc}}),e("img",{staticClass:"cover autoRotate",attrs:{src:this.$store.state.song.picUrl}})])])}),[],!1,null,"2617baf6",null).exports},props:{},data:function(){return{mode:0,modeList:[{mode:0,class:"icon-mode-loop",label:"列表循环"},{mode:1,class:"icon-mode-single",label:"单曲循环"},{mode:2,class:"icon-mode-order",label:"顺序播放"},{mode:3,class:"icon-mode-random",label:"随机播放"}],currentTime:0,totalTime:0,amount:0,volume:50,playSpeed:1,loaded:!1,orderList:[],current:-1,lyricVisible:!1,isSlider:!1,songDrawerVisible:!1}},computed:{isPlay:function(){return this.$store.state.isPlay},song:function(){return this.$store.state.song},playList:function(){return this.$store.state.playList}},watch:{song:{handler:function(){this.loaded=!1},deep:!0}},mounted:function(){this.$refs.audio.volume=this.volume/100},methods:{loadeddata:function(){this.loaded=!0},swtichMode:function(){this.mode=(this.mode+this.modeList.length+1)%this.modeList.length},switchSong:function(t){var e=0;switch(this.mode){case 0:e=t,this.setSong(e);break;case 1:e=0,this.setSong(e);break;case 2:this.$store.state.activeIndex<this.$store.state.playList.length-1&&(e=1,this.setSong(e));break;case 3:e=Math.floor(Math.random()*this.$store.state.playList.length),-1==t?(this.current,this.current,e=this.orderList[this.current]||-1,this.setSong(e)):(this.orderList.push(e),this.current++,this.setSong(e))}},setSong:function(t){var e=this.$store.state.playList,n=this.$store.state.activeIndex;if(e.length>1){this.$refs.audio.pause(),this.$store.commit("setIsPlay",!1);var i=e[n=(n+e.length+t)%e.length];this.$store.dispatch("playMusic",i),this.$store.commit("setIndex",n)}},toggleSong:function(){this.isPlay?(this.$store.commit("setIsPlay",!1),this.$refs.audio.pause()):this.song.audioUrl&&(this.$store.commit("setIsPlay",!0),this.$refs.audio.play())},toggleLyric:function(){this.song.audioUrl&&this.$store.state.lyric.length&&(this.lyricVisible=!this.lyricVisible)},mouseup:function(){var t=this;setTimeout((function(){t.isSlider=!1}),100)},changeProgress:function(t){this.isSlider=!0,this.$refs.audio.currentTime=t*this.totalTime/100,this.amount=t},changevolume:function(t){this.$refs.audio.volume=t/100},onAudioTimeUpdate:function(){this.loaded&&(this.totalTime=this.$refs.audio.duration,this.currentTime=this.$refs.audio.currentTime,this.isSlider||(this.amount=100*this.currentTime/this.totalTime),this.amount>=100&&this.switchSong(1))},openDrawer:function(){this.$store.commit("setMenuVisible",!this.$store.state.menuVisible)},toggleSongDrawer:function(){this.songDrawerVisible=!this.songDrawerVisible},closeSongDrawer:function(){this.songDrawerVisible=!1}}}),p=(n("b8f8"),Object(a.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"audio-box"},[n("div",{staticClass:"audio-bar",on:{mouseup:t.mouseup}},[n("div",{staticClass:"song-info"},[n("div",{staticClass:"img-box",class:{show:t.song.picUrl,open:t.songDrawerVisible},on:{click:function(e){return t.toggleSongDrawer()}}},[n("i",{staticClass:"iconfont arrow arrow-left icon-arrow-left-bottom"}),n("i",{staticClass:"iconfont arrow arrow-right icon-arrow-right-top"}),n("img",{staticClass:"img",class:{running:t.isPlay&&!t.songDrawerVisible},attrs:{src:t.song.picUrl}})]),n("div",{staticClass:"name-box"},[n("div",{staticClass:"overEllipsis song-name ft_16"},[t._v(t._s(t.song.name))]),n("div",t._l(t.song.author,(function(e,i){return n("span",{key:i,staticClass:"overEllipsis song-author ft_14"},[t._v(t._s(e.name)+" ")])})),0)])]),n("div",{staticClass:"song-control"},[n("div",{staticClass:"switch-control"},[n("i",{staticClass:"iconfont ft_28 button-control",class:t.modeList[t.mode].class,on:{click:t.swtichMode}}),n("i",{staticClass:"iconfont button-control ft_28 icon-pre",on:{click:function(e){return t.switchSong(-1)}}}),n("i",{staticClass:"iconfont button-control button-toggle ft_28",class:t.isPlay?"icon-pause":"icon-play",on:{click:function(e){return t.toggleSong()}}}),n("i",{staticClass:"iconfont button-control ft_28 icon-next",on:{click:function(e){return t.switchSong(1)}}}),n("i",{staticClass:"button-control ft_20 button-lyric",on:{click:t.toggleLyric}},[t._v("词")])]),n("div",{staticClass:"progress display-flex"},[n("span",{staticClass:"tiem"},[t._v(t._s(t._f("stotime")(t.currentTime)))]),n("el-slider",{staticClass:"control-progress",attrs:{"show-tooltip":!1},on:{change:t.changeProgress},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}}),n("span",{staticClass:"time"},[t._v(t._s(t._f("stotime")(t.totalTime)))])],1)]),n("div",{staticClass:"list-control display-flex"},[n("div",{staticClass:"flex_1"}),n("i",{staticClass:"iconfont ft_28 icon-volume"}),n("el-slider",{staticClass:"control-volume",attrs:{"show-tooltip":!1},on:{change:function(e){return t.changevolume(t.volume)}},model:{value:t.volume,callback:function(e){t.volume=e},expression:"volume"}}),n("i",{staticClass:"iconfont ft_28 button-menu icon-menu",on:{click:function(e){return t.openDrawer()}}})],1)]),n("audio",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"audio",attrs:{src:t.song.audioUrl,autoplay:""},on:{timeupdate:t.onAudioTimeUpdate,loadeddata:t.loadeddata}}),n("transition-group",{attrs:{name:"fade"}},[t.$store.state.menuVisible?n("playList",{key:"playList"}):t._e(),t.lyricVisible?n("lyric",{key:"lyric",attrs:{time:t.currentTime}}):t._e()],1),n("transition",{attrs:{name:"drawer"}},[t.songDrawerVisible?n("songDrawer",{key:"songDrawer",on:{change:function(e){return t.closeSongDrawer()}}}):t._e()],1)],1)}),[],!1,null,"cca68f62",null).exports),h={name:"sidebarVue"},g=(n("6b46"),{name:"index",components:{audioVue:p,sidebarVue:Object(a.a)(h,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"nav"},[e("ul",[e("li",[e("router-link",{class:{"router-link-active":this.$route.path.includes("music")},attrs:{to:{name:"recommend"}}},[e("span",{staticClass:"iconfont"}),this._v(" 发现音乐 ")])],1),e("li",[e("router-link",{class:{"router-link-active":this.$route.path.includes("video")},attrs:{to:{name:"latestMV"}}},[e("span",{staticClass:"iconfont"}),this._v(" 发现视频 ")])],1)])])}),[],!1,null,"41d0b376",null).exports}}),b=(n("a48d"),{name:"App",components:{topbarVue:r,indexVue:Object(a.a)(g,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"index-container"},[e("sidebar-vue",{staticClass:"side"}),e("div",{staticClass:"main"},[e("router-view")],1),e("audio-vue")],1)}),[],!1,null,"bb3e180c",null).exports},watch:{"$store.state.message":{handler:function(t){this.$message({message:t,type:"error"})}}}}),v=Object(a.a)(b,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("topbar-vue"),e("index-vue")],1)}),[],!1,null,null,null).exports,y=(n("baa5"),n("d3b7"),n("8c4f")),_=n("323e"),w=n.n(_);n("a5d8");i.default.use(y.a);var C=[{path:"*",redirect:{name:"recommend"}},{name:"music",path:"/music",component:function(){return n.e("chunk-01c9e274").then(n.bind(null,"aa6a"))},children:[{name:"recommend",path:"recommend",component:function(){return n.e("chunk-2d20ff16").then(n.bind(null,"b67c"))},meta:{title:"推荐"}},{name:"songSheet",path:"songSheet",component:function(){return n.e("chunk-2d0be69c").then(n.bind(null,"2fc5"))},meta:{title:"歌单"}},{name:"anchorStation",path:"anchorStation",component:function(){return n.e("chunk-2d0c26c6").then(n.bind(null,"49f1"))},meta:{title:"电台"}},{name:"rankList",path:"rankList",component:function(){return n.e("chunk-2d237523").then(n.bind(null,"fb2c"))},meta:{title:"排行榜"}},{name:"singer",path:"singer",component:function(){return n.e("chunk-2d0dacc4").then(n.bind(null,"6cab"))},meta:{title:"歌手"}},{name:"latestMusic",path:"latestMusic",component:function(){return n.e("chunk-2d21eaf9").then(n.bind(null,"d72b"))},meta:{title:"最新音乐"}}]},{name:"video",path:"/video",component:function(){return n.e("chunk-bc7671ae").then(n.bind(null,"007b"))},children:[{name:"latestMV",path:"latestMV",component:function(){return n.e("chunk-2d2167aa").then(n.bind(null,"c348"))},meta:{title:"最新MV"}},{name:"allMV",path:"allMV",component:function(){return n.e("chunk-2d210a2e").then(n.bind(null,"b978"))},meta:{title:"全部MV"}}]},{name:"search",path:"/search",component:function(){return Promise.all([n.e("npm.core-js"),n.e("chunk-38beda31")]).then(n.bind(null,"efe3"))},meta:{title:"搜索结果|"}},{name:"detail",path:"/detail",component:function(){return n.e("chunk-2d0dd7f4").then(n.bind(null,"8248"))},children:[{name:"detailMV",path:"detailMV",component:function(){return n.e("chunk-2d230c34").then(n.bind(null,"ee53"))},meta:{title:"MV详情"}},{name:"detailSongSheet",path:"detailSongSheet",component:function(){return n.e("chunk-2d0db491").then(n.bind(null,"6ee1"))},meta:{title:"歌单详情"}},{name:"detailSinger",path:"detailSinger",component:function(){return n.e("chunk-2d0c034e").then(n.bind(null,"4194"))},meta:{title:"歌手详情"}}]}];var k,$=new y.a({mode:"hash",base:(k=location.pathname,k.substring(0,k.lastIndexOf("/")+1)),routes:C});w.a.configure({showSpinner:!1}),$.beforeEach((function(t,e,n){w.a.start(),n()})),$.afterEach((function(){w.a.done()}));var x=$,S=n("2f62"),V=(n("d81d"),n("fb6a"),n("466d"),n("1276"),{setMessage:function(t,e){t.message=e},setSong:function(t,e){t.song=e},setPlayList:function(t,e){t.playList=e},setIsPlay:function(t,e){t.isPlay=e},setIsShow:function(t,e){t.isShow=e},setQuery:function(t,e){t.query=e},setMenuVisible:function(t,e){t.menuVisible=e},setIndex:function(t,e){t.activeIndex=e},setLyric:function(t,e){var n=e.split("\n"),i=/^\[.*]/,s=n.map((function(t){var e=t.match(i)&&t.match(i)[0]&&t.match(i)[0].slice(1,-1)||null;if(e){var n=e.split(":");return{time:e=60*parseInt(n[0])+parseInt(n[1]),word:t.split(i)[1]}}return{time:9999,word:"..."}}));t.lyric=s}}),L=(n("4160"),n("b0c0"),n("159b"),n("96cf"),n("1da1")),D=(n("b64b"),n("25f0"),n("bc3a")),I=n.n(D);function M(t){if(!t||"[object Object]"!=Object.prototype.toString.call(t))return"";var e="?";return Object.keys(t).forEach((function(n){"[object Object]"===Object.prototype.toString.call(t[n])||"[object Array]"===Object.prototype.toString.call(t[n])?e+=n+"="+JSON.stringify(t[n])+"&":e+=n+"="+t[n]+"&"})),e.substr(0,e.length-1)}I.a.defaults.setTimeout,I.a.defaults.headers.post["Content-Type"]="application/json";var O="https://musicapi.gausszhou.top",P={login:function(t){return I.a.get(O+"/login/cellphone"+M(t))},getSongUrl:function(t){return I.a.get(O+"/song/url"+M(t))},getSongDetail:function(t){return I.a.get(O+"/song/detail"+M(t))},getMVUrl:function(t){return I.a.get(O+"/mv/url"+M(t))},getMVDetail:function(t){return I.a.get(O+"/mv/detail"+M(t))},getLyric:function(t){return I.a.get(O+"/lyric"+M(t))},getSearch:function(t){return I.a.get(O+"/search"+M(t))},getBanner:function(t){return I.a.get(O+"/banner"+M(t))},getPersonalized:function(t){return I.a.get(O+"/personalized"+M(t))},getPrivatecontent:function(t){return I.a.get(O+"/personalized/privatecontent"+M(t))},getNewSong:function(t){return I.a.get(O+"/personalized/newsong"+M(t))},getNewMV:function(t){return I.a.get(O+"/personalized/mv"+M(t))},getTopPlayListDetail:function(t){return I.a.get(O+"/top/playlist/highquality"+M(t))},getTopPlayList:function(t){return I.a.get(O+"/top/playlist"+M(t))},getDJBanner:function(t){return I.a.get(O+"/dj/banner"+M(t))},getDJRecommend:function(t){return I.a.get(O+"/dj/personalize/recommend"+M(t))},getTopList:function(t){return I.a.get(O+"/toplist"+M(t))},getArtistList:function(t){return I.a.get(O+"/artist/list"+M(t))},getTopSong:function(t){return I.a.get(O+"/top/song"+M(t))},getMVFirst:function(t){return I.a.get(O+"/mv/first"+M(t))},getMVAll:function(t){return I.a.get(O+"/mv/all"+M(t))},getSimiMV:function(t){return I.a.get(O+"/simi/mv"+M(t))},getCommentMV:function(t){return I.a.get(O+"/comment/mv"+M(t))},getPlayListDetail:function(t){return I.a.get(O+"/playlist/detail"+M(t))},getCommentPlayList:function(t){return I.a.get(O+"/comment/playlist"+M(t))},getCommentHot:function(t){return I.a.get(O+"/comment/hot"+M(t))}},j={getMusic:function(t,e){return Object(L.a)(regeneratorRuntime.mark((function n(){var i,s,a,o,r,c,l,u,m;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i=e.name,s=e.albumname||"",a=e.picUrl||"",o="",r=[e.author],c=e.musicId||e.id,t.commit("setIsPlay",!1),n.next=9,P.getSongUrl({id:c}).then((function(e){e.data.data[0].url?(o=e.data.data[0].url,P.getLyric({id:c}).then((function(e){var n=e.data.lrc.lyric;t.commit("setLyric",n)}))):t.commit("setMessage","歌曲资源获取失败！！！当前时间"+Date.now())}));case 9:if(a&&r[0]&&s){n.next=12;break}return n.next=12,P.getSongDetail({ids:c}).then((function(t){s=t.data.songs[0].al.name,a=t.data.songs[0].al.picUrl,r=t.data.songs[0].ar}));case 12:l={name:i,albumname:s,picUrl:a,audioUrl:o,author:r,musicId:c},u=JSON.parse(JSON.stringify(t.state.playList)),m=!0,u.forEach((function(e,n){e.musicId==l.musicId&&(m=!1,t.commit("setIndex",n))})),m&&o&&(u.push(l),t.commit("setIndex",u.length-1)),o&&(t.commit("setSong",l),t.commit("setPlayList",u),t.commit("setIsPlay",!0),t.commit("setIsShow",!0));case 18:case"end":return n.stop()}}),n)})))()},playMusic:function(t,e){return Object(L.a)(regeneratorRuntime.mark((function n(){var i,s,a,o,r,c,l;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i=e.name,s=e.albumname,a=e.picUrl,o=e.audioUrl,r=e.author,c=e.musicId,n.next=8,P.getSongUrl({id:c}).then((function(e){e.data.data[0].url&&(o=e.data.data[0].url,P.getLyric({id:c}).then((function(e){var n=e.data.lrc.lyric;t.commit("setLyric",n)})))}));case 8:l={name:i,albumname:s,picUrl:a,audioUrl:o,author:r,musicId:c},o&&(t.commit("setSong",l),t.commit("setIsPlay",!0),t.commit("setIsShow",!0));case 10:case"end":return n.stop()}}),n)})))()}};i.default.use(S.a);var E=new S.a.Store({state:{message:"",song:{},playList:[],activeIndex:0,isPlay:!1,isShow:!1,query:"",menuVisible:!1,lyric:[]},mutations:V,actions:j,modules:{}}),T=n("5c96"),U=n.n(T),z=(n("0fae"),n("1be0"),n("4cf4"),n("2644"),n("7fd9"),{}),q=(n("99af"),n("4de4"),n("b680"),{install:function(t){t.filter("uppercase",(function(t){return t.toUpperCase()})),t.filter("lowercase",(function(t){return t.toLowerCase()})),t.filter("mstotime",(function(t){var e=t,n=parseInt(e/1e3/60);n=n<10?"0"+n:n;var i=parseInt(e/1e3%60);return i=i<10?"0"+i:i,"".concat(n,":").concat(i)})),t.filter("stotime",(function(t){var e=t,n=parseInt(e/60);n=n<10?"0"+n:n;var i=parseInt(e%60);return i=i<10?"0"+i:i,"".concat(n,":").concat(i)})),t.filter("numbertocount",(function(t){return t>1e4?t>1e8?(t/1e8).toFixed(1)+"亿":(t/1e4).toFixed(1)+"万":t})),t.filter("timestamp",(function(t){var e=new Date(t).toISOString();return e.slice(0,10)+" "+e.slice(11,19)}))}}),N=q;i.default.use(U.a),i.default.prototype.$http=P,i.default.prototype.$tools=z,i.default.use(N),i.default.config.productionTip=!1,new i.default({el:"#app",router:x,store:E,render:function(t){return t(v)},components:{App:v}}).$mount("#app")},6743:function(t,e,n){t.exports=n.p+"img/player_disc.png"},"6b05":function(t,e,n){},"6b46":function(t,e,n){"use strict";n("9d56")},"7fd9":function(t,e,n){},"9d56":function(t,e,n){},a48d:function(t,e,n){"use strict";n("0f4e")},b819:function(t,e,n){t.exports=n.p+"img/player_bar.png"},b8f8:function(t,e,n){"use strict";n("6b05")},e5a1:function(t,e,n){"use strict";n("449c")},e600:function(t,e,n){"use strict";n("1bea")}},[[0,"runtime","npm.core-js","npm.element-ui","npm.vue","vendors~app"]]]);