import { useEffect } from 'react';

export const useNotification = () => {
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const sendNotification = (enabled: boolean, title: string, body: string) => {
    if (enabled && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  };

  const playSound = (enabled: boolean) => {
    if (!enabled) return;
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1);
  };

  return { sendNotification, playSound };
};
