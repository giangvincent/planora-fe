import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useSettingsStore } from '@/stores/settings';

import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const settingsStore = useSettingsStore(pinia);
settingsStore.setTheme(settingsStore.themePreference);

app.mount('#app');
