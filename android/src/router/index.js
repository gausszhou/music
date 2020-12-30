import Vue from "vue";
import VueRouter from "vue-router";

// 注册路由插件 VueRouter 使其全局可用
Vue.use(VueRouter);

const routes = [
  // 首页重定向
  {
    path: "/",
    redirect: { name: 'login' }
  },
  {
    name: "login",
    path: '/login',
    component: () => import("@/views/login.vue")
  },
  {
    name: "index",
    path: '/index',
    component: () => import("@/views/index.vue"),
    children: [
      {
        name: "music",
        path: 'music',
        component: () => import("@/views/music.vue"),
        children: [
          {
            name: "home",
            path: 'home',
            component: () => import("@/components/music/home.vue")
          },
          {
            name: "search",
            path: 'search',
            component: () => import("@/components/music/search.vue")
          },
          {
            name: "detail",
            path: 'detail',
            component: () => import("@/components/music/detail.vue")
          },
        ]
      },
      {
        name: "youdao",
        path: 'youdao',
        component: () => import("@/views/youdao.vue"),
      },
      {
        name: "note",
        path: 'note',
        component: () => import("@/views/note.vue"),
      },
    ],
  },
];

// 路由路径拼接
routes.forEach(route => {
  route.path = route.path || "/" + route.name || "";
});

// 路径自动获取函数
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
// 切换路由的时候滚动条复位
router.afterEach(() => {
  window.scrollTo(0, 0);
});
// 导出路由
export default router;
