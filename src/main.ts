import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: 'my-rdv-app.firebaseapp.com',

  projectId: 'my-rdv-app',

  storageBucket: 'my-rdv-app.appspot.com',

  messagingSenderId: '930167273442',

  appId: '1:930167273442:web:bc080dccc7ccd61023abbb',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

createApp(App).mount('#app');
