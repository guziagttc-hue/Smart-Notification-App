import { useEffect } from 'react';
import { getToken } from 'firebase/messaging';
import { messaging } from '../lib/firebaseClient';

export const NotificationManager = () => {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          try {
            const token = await getToken(messaging, { 
              vapidKey: 'BDrjR3i7Mv7bVfH5-T8i7_aB7yG2cK5Xj8qH9zW4yT1eR7qK9mJ5cW8bZ2sL4xN9cT5hJ7qF3zL8wH1t5kY' 
            });
            console.log('FCM Token:', token);
            await fetch('/api/save-token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token }),
            });
          } catch (error) {
            console.error('Error getting FCM token:', error);
          }
        }
      }
    };

    requestNotificationPermission();
  }, []);

  return null;
};
