(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2d0c26c6"],{"49f1":function(t,s,a){"use strict";a.r(s);a("fb6a");var n={name:"anchorStation",data:function(){return{DJBanners:[],list:[],songs:[],mvs:[]}},created:function(){this.getDJBanner(),this.getDJRecommend()},methods:{getDJBanner:function(){var t=this;this.$http.getDJBanner().then((function(s){t.DJBanners=s.data.data}))},getDJRecommend:function(){var t=this;this.$http.getDJRecommend({limit:6}).then((function(s){t.list=s.data.data.slice(0,5)}))}}},e=a("2877"),i=Object(e.a)(n,(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"discovery-container"},[a("el-carousel",{attrs:{interval:4e3,type:"card"}},t._l(t.DJBanners,(function(t,s){return a("el-carousel-item",{key:s},[a("img",{attrs:{src:t.pic,alt:""}})])})),1),a("div",{staticClass:"recommend"},[a("h3",{staticClass:"title"},[t._v("电台个性推荐")]),a("div",{staticClass:"items"},t._l(t.list,(function(s,n){return a("div",{key:n,staticClass:"item"},[a("div",{staticClass:"img-wrap"},[a("div",{staticClass:"desc-wrap"},[a("span",{staticClass:"desc"},[t._v(t._s(s.name))])]),a("img",{attrs:{src:s.picUrl,alt:""}}),a("span",{staticClass:"iconfont icon-play"})]),a("p",{staticClass:"name"},[t._v(t._s(s.rcmdText))])])})),0)])],1)}),[],!1,null,null,null);s.default=i.exports}}]);