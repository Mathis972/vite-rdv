import { createRouter, createWebHashHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Account from '../pages/Account.vue';

const routes = [
  { path: '/hello', component: HelloWorld },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/account', component: Account, name: 'account', props: true },
];

const router = createRouter({ history: createWebHashHistory(), routes });
export default router;
