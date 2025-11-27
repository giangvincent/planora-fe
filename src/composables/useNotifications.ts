import { localNotifications } from '@/services/notifications/local';
import { pushNotifications } from '@/services/notifications/push';

export function useNotifications() {
  async function requestPermission() {
    const granted = await localNotifications.requestPermission();
    if (granted) {
      await pushNotifications.subscribe();
    }
    return granted;
  }

  function notify(title: string, body?: string) {
    localNotifications.send(title, { body, icon: '/pwa-192x192.png' });
  }

  return {
    requestPermission,
    notify,
  };
}
