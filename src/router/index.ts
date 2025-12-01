import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/app/dashboard'
    },
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue')
        }
      ]
    },
    {
      path: '/app',
      component: () => import('@/components/layout/AppShell.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/app/DashboardView.vue')
        },
        {
          path: 'tasks',
          name: 'tasks',
          component: () => import('@/views/app/TasksView.vue')
        },
        {
          path: 'goals',
          name: 'goals',
          component: () => import('@/views/app/GoalsView.vue')
        },
        {
          path: 'calendar',
          name: 'calendar',
          component: () => import('@/views/app/CalendarView.vue')
        },
        {
          path: 'world',
          name: 'world',
          component: () => import('@/views/app/WorldView.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/app/ProfileView.vue')
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: () => import('@/views/app/NotificationsView.vue')
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/app/SettingsView.vue')
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Simple auth guard
  // if (to.meta.requiresAuth && !authStore.isAuthenticated) {
  //   next({ name: 'login' });
  // } else {
  //   next();
  // }

  // For now, allow access to ease development
  next();
});

export default router;
