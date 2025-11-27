import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useUserStore } from '@/stores/user.store';

import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Initialize user store (theme, etc.)
const userStore = useUserStore(pinia);

app.mount('#app');
