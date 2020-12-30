import Vue from "vue";
import VueRouter from "vue-router";

// 注册路由插件 VueRouter 使其全局可用
Vue.use(VueRouter);

//  定义路由表
const routes = [
  // 首页重定向
  {
    path: "*",
    redirect: { name: 'recommend' }
  },
  {
    name: 'discoveryMusic',
    path: '/discoveryMusic',
    component: () => import('../views/discoveryMusic.vue'),
    children: [
      {
        name: 'recommend',
        path: 'recommend',
        component: () => import('../components/recommend.vue'),
      },
      {
        name: 'songSheet',
        path: 'songSheet',
        component: () => import('../components/songSheet.vue'),
      },
      {
        name: 'anchorStation',
        path: 'anchorStation',
        component: () => import('../components/anchorStation.vue'),
      },
      {
        name: 'rankList',
        path: 'rankList',
        component: () => import('../components/rankList.vue'),
      },
      {
        name: 'singer',
        path: 'singer',
        component: () => import('../components/singer.vue'),
      },
      {
        name: 'latestMusic',
        path: 'latestMusic',
        component: () => import('../components/latestMusic.vue'),
      },
    ]
  },
  {
    name: 'discoveryVideo',
    path: '/discoveryVideo',
    component: () => import('../views/discoveryVideo.vue'),
    children: [
      {
        name: 'latestMV',
        path: 'latestMV',
        component: () => import('../components/latestMV.vue'),
      },
      {
        name: 'allMV',
        path: 'allMV',
        component: () => import('../components/allMV.vue'),
      }
    ]
  },
  {
    name: 'searchResult',
    path: '/searchResult',
    component: () => import('../views/searchResult.vue'),
  },
  {
    name: 'detailMV',
    path: '/detailMV',
    component: () => import('../views/detailMV.vue'),
  },
  {
    name: 'detailSongSheet',
    path: '/detailSongSheet',
    component: () => import('../views/detailSongSheet.vue'),
  },
];


// 路径自动获取函数(部署Gitee项目时需要)
function getAbsolutePath() {
  let path = location.pathname;
  return path.substring(0, path.lastIndexOf('/') + 1);
}
// 最后创建路由对象，设置切换方式，设置路由得base，导入路由表
const router = new VueRouter({
  // 使用什么方式切换路由
  mode: "hash", //  history  hash
  // vue-router里提供了一个base的属性，代表应用的基目录
  base: getAbsolutePath(),
  routes
});

// 导出路由
export default router;
