import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { openDB } from 'idb';

const pinia = createPinia();

await openDB('appointments-store', 1, {
  upgrade(db) {
    db.createObjectStore('appointments');
  },
});

createApp(App).use(router).use(pinia).mount('#app');
