import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDlUNF69sFNTRX8Ma0O4cUfMsgS6E5tpH0",
  authDomain: "notification-458e4.firebaseapp.com",
  projectId: "notification-458e4",
  storageBucket: "notification-458e4.firebasestorage.app",
  messagingSenderId: "31601725663",
  appId: "1:31601725663:web:e9f57ea76c15a138be996a"
};

// ⚠️ Warning: Firebase client configuration is exposed to the browser.
// Ensure your Firebase security rules are properly configured.

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
