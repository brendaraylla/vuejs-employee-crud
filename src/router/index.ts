import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login/login.view.vue';
import Home from '../views/home/home.view.vue';
import Employees from '../views/employees/employees.view.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '',
    component: Home,
    children: [
      {
        path: '/',
        name: 'employees',
        component: Employees,
        meta: {
          title: 'Employees',
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const roles = localStorage.getItem('user');
  if (roles || to.name === 'login') {
    next();
    return;
  }
  next({ name: 'login' });
});

export default router;
