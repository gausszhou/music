(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-38beda31"],{9690:function(t,s,a){"use strict";a("9ffd")},"9ffd":function(t,s,a){},efe3:function(t,s,a){"use strict";a.r(s);a("ac1f"),a("841c");var e={name:"search",data:function(){return{activeIndex:"songs",keywords:"",type:1,songList:[],playList:[],mvList:[],count:""}},watch:{"$store.state.query":{handler:function(){this.search()}},activeIndex:{handler:function(t){switch(t){case"songs":this.type=1;break;case"lists":this.type=1e3;break;case"mvs":this.type=1004}this.search()}}},created:function(){this.keywords=this.$route.query.keywords,this.search()},methods:{search:function(){var t=this,s=this.type;if(this.keywords){var a={keywords:this.keywords,type:s};this.$http.getSearch(a).then((function(a){switch(s){case 1:t.songList=a.data.result.songs,t.count=a.data.result.songCount;break;case 1e3:t.playList=a.data.result.playlists,t.count=a.data.result.playlistCount;break;case 1004:t.mvList=a.data.result.mvs,t.count=a.data.result.mvCount}}))}},playMusic:function(t){this.$store.dispatch("getMusicUrl",t.id)},toSongSheetDetail:function(t){this.$router.push({name:"detailSongSheet",query:{id:t.id}})},playMV:function(t){this.$router.push({name:"detailMV",query:{mvid:t.id}})}}},i=(a("9690"),a("2877")),n=Object(i.a)(e,(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"result-container"},[a("div",{staticClass:"title-wrap"},[a("h2",{staticClass:"title"},[t._v(t._s(t.keywords))]),a("span",{staticClass:"sub-title"},[t._v("找到"+t._s(t.count)+"个结果")])]),a("el-tabs",{model:{value:t.activeIndex,callback:function(s){t.activeIndex=s},expression:"activeIndex"}},[a("el-tab-pane",{attrs:{label:"歌曲",name:"songs"}},[a("h4",[t._v("双击歌曲播放")]),a("el-table",{staticClass:"songs-table",staticStyle:{width:"100%"},attrs:{lazy:!0,data:t.songList},on:{"row-dblclick":t.playMusic}},[a("el-table-column",{attrs:{prop:"name",label:"音乐标题"},scopedSlots:t._u([{key:"default",fn:function(s){return[a("span",[t._v(t._s(s.row.name))]),s.row.mvid?a("span",{staticClass:"iconfont mv-tag icon-mv"},[t._v("MV")]):t._e()]}}])}),a("el-table-column",{attrs:{prop:"artists[0].name",label:"歌手"}}),a("el-table-column",{attrs:{prop:"album.name",label:"专辑",width:"250"}}),a("el-table-column",{attrs:{prop:"duration",label:"时长",width:"150"},scopedSlots:t._u([{key:"default",fn:function(s){return[a("span",[t._v(t._s(t._f("mstotime")(s.row.duration)))])]}}])})],1)],1),a("el-tab-pane",{attrs:{label:"歌单",name:"lists"}},[a("div",{staticClass:"items"},t._l(t.playList,(function(s,e){return a("div",{key:e,staticClass:"item",on:{click:function(a){return t.toSongSheetDetail(s)}}},[a("div",{staticClass:"img-wrap"},[a("div",{staticClass:"num-wrap"},[t._v(" 播放量: "),a("span",{staticClass:"num"},[t._v(t._s(t._f("numbertocount")(s.playCount)))])]),a("img",{attrs:{src:s.coverImgUrl,alt:""}}),a("span",{staticClass:"iconfont icon-play"})]),a("p",{staticClass:"name"},[t._v(t._s(s.name))])])})),0)]),a("el-tab-pane",{attrs:{label:"MV",name:"mvs"}},[a("div",{staticClass:"items mv"},t._l(t.mvList,(function(s,e){return a("div",{key:e,staticClass:"item",on:{click:function(a){return t.playMV(s)}}},[a("div",{staticClass:"img-wrap"},[a("img",{attrs:{src:s.cover,alt:""}}),a("span",{staticClass:"iconfont icon-play"}),a("div",{staticClass:"num-wrap"},[a("div",{staticClass:"iconfont icon-play"}),a("div",{staticClass:"num"},[t._v(t._s(t._f("numbertocount")(s.playCount)))])]),a("span",{staticClass:"time"},[t._v(t._s(t._f("mstotime")(s.duration)))])]),a("div",{staticClass:"info-wrap"},[a("div",{staticClass:"name"},[t._v(t._s(s.name))]),a("div",{staticClass:"singer"},[t._v(t._s(s.artistName))])])])})),0)])],1)],1)}),[],!1,null,"aee6deda",null);s.default=n.exports}}]);