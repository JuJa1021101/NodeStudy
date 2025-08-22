import { createRouter, createWebHashHistory } from 'vue-router';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/home',
      component: () => import('../views/Home.vue'),
      meta: {
        isAuth: true,
      },
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      component: () => import('../views/Register.vue'),
    },
  ],
});

// 路由拦截
router.beforeEach((to, from, next) => {
  //判断是否需要登录权限
  if (to.meta.isAuth) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      ElMessage.error({
        message: '请先登录',
        type: 'error',
      });
      router.push('./login');
    }
  } else {
    next();
  }
});
export default router;