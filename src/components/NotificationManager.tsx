import { useEffect } from 'react';

export const NotificationManager = () => {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          // Here you would typically get the FCM token and send it to the server
        }
      }
    };

    requestNotificationPermission();
  }, []);

  return null;
};
