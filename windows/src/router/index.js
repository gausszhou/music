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
    name: 'music',
    path: '/music',
    component: () => import('@/views/music/index.vue'),
    children: [
      {
        name: 'recommend',
        path: 'recommend',
        component: () => import('@/views/music/recommend.vue'),
        meta: { title: '推荐' }
      },
      {
        name: 'songSheet',
        path: 'songSheet',
        component: () => import('@/views/music/songSheet.vue'),
        meta: { title: '歌单' }
      },
      {
        name: 'anchorStation',
        path: 'anchorStation',
        component: () => import('@/views/music/anchorStation.vue'),
        meta: { title: '电台' }
      },
      {
        name: 'rankList',
        path: 'rankList',
        component: () => import('@/views/music/rankList.vue'),
        meta: { title: '排行榜' }
      },
      {
        name: 'singer',
        path: 'singer',
        component: () => import('@/views/music/singer.vue'),
        meta: { title: '歌手' }
      },
      {
        name: 'latestMusic',
        path: 'latestMusic',
        component: () => import('@/views/music/latestMusic.vue'),
        meta: { title: '最新音乐' }
      },
    ]
  },
  {
    name: 'video',
    path: '/video',
    component: () => import('@/views/video/index.vue'),
    children: [
      {
        name: 'latestMV',
        path: 'latestMV',
        component: () => import('@/views/video/latestMV.vue'),
        meta: { title: '最新MV' }
      },
      {
        name: 'allMV',
        path: 'allMV',
        component: () => import('@/views/video/allMV.vue'),
        meta: { title: '全部MV' }
      }
    ]
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/search/index.vue'),
    meta: { title: '搜索结果|' }
  },
  {
    name: 'detail',
    path: '/detail',
    component: () => import('@/views/detail/index.vue'),
    children: [
      {
        name: 'detailMV',
        path: 'detailMV',
        component: () => import('@/views/detail/detailMV.vue'),
        meta: { title: 'MV详情' }
      },
      {
        name: 'detailSongSheet',
        path: 'detailSongSheet',
        component: () => import('@/views/detail/detailSongSheet.vue'),
        meta: { title: '歌单详情' }
      },
      {
        name: 'detailSinger',
        path: 'detailSinger',
        component: () => import('@/views/detail/detailSinger.vue'),
        meta: { title: '歌手详情' }
      },
    ]
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

//导入
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 关闭加载小圈圈的显示
NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();

});

// 导出路由
export default router;
