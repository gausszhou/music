(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2d21eaf9"],{d72b:function(t,a,s){"use strict";s.r(a);s("fb6a");var n={name:"latestMusic",data:function(){return{tagList:[{tag:0,label:"全部"},{tag:7,label:"华语"},{tag:96,label:"欧美"},{tag:8,label:"日本"},{tag:16,label:"韩国"}],tag:"0",list:[],lists:[],total:100,page:1}},watch:{tag:function(){this.getTopSong()},page:function(t){this.list=this.lists.slice(10*(t-1),10*t)}},created:function(){this.getTopSong()},methods:{getTopSong:function(){var t=this,a={type:this.tag};this.$http.getTopSong(a).then((function(a){t.lists=a.data.data,t.list=t.lists.slice(10*(t.page-1),10*t.page)}))},getMusic:function(t){this.$store.dispatch("getMusic",t)},handleCurrentChange:function(t){this.page=t}}},i=s("2877"),e=Object(i.a)(n,(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"songs-container"},[s("div",{staticClass:"tab-bar"},t._l(t.tagList,(function(a,n){return s("span",{key:n,staticClass:"item",class:{active:t.tag==a.tag},on:{click:function(s){t.tag=a.tag}}},[t._v(t._s(a.label)+" |")])})),0),s("table",{staticClass:"el-table playlit-table"},[t._m(0),s("tbody",t._l(t.list,(function(a,n){return s("tr",{key:n,staticClass:"el-table__row"},[s("td",[t._v(t._s(n+1))]),s("td",[s("div",{staticClass:"img-wrap"},[s("img",{attrs:{src:a.album.picUrl,alt:""}}),s("span",{staticClass:"iconfont icon-play",on:{click:function(s){return t.getMusic(a)}}})])]),s("td",[s("div",{staticClass:"song-wrap"},[s("div",{staticClass:"name-wrap"},[s("span",[t._v(t._s(a.name))]),s("span",{staticClass:"iconfont icon-mv"})]),s("span")])]),s("td",[t._v(t._s(a.album.artists[0].name))]),s("td",[t._v(t._s(a.album.name))]),s("td",[t._v(t._s(t._f("mstotime")(a.duration)))])])})),0)]),s("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.total,"current-page":t.page,"page-size":10},on:{"current-change":t.handleCurrentChange}})],1)}),[function(){var t=this.$createElement,a=this._self._c||t;return a("thead",[a("th",[this._v("序号")]),a("th",[this._v("封面")]),a("th",[this._v("音乐标题")]),a("th",[this._v("歌手")]),a("th",[this._v("专辑")]),a("th",[this._v("时长")])])}],!1,null,null,null);a.default=e.exports}}]);