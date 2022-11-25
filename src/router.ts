import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import Account from '@/pages/Account.vue';

const routes = [
  { path: '/hello', component: HelloWorld, name: 'hello' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/account', component: Account, name: 'account' },
];

export default createRouter({ history: createWebHistory(), routes });
