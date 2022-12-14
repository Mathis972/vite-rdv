import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import Account from '@/pages/Account.vue';
import Appointment from '@/pages/Appointment.vue';

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/account', component: Account, name: 'account' },
  { path: '/rdv', component: Appointment, name: 'rdv' },
];

export default createRouter({ history: createWebHistory(), routes });
