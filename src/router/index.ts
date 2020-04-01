import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login/login.view.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/employees',
    name: 'employees',
    component: () => import('../views/employees/employees.view.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
