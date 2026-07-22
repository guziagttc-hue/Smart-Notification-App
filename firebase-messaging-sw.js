importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDlUNF69sFNTRX8Ma0O4cUfMsgS6E5tpH0",
  authDomain: "notification-458e4.firebaseapp.com",
  projectId: "notification-458e4",
  storageBucket: "notification-458e4.firebasestorage.app",
  messagingSenderId: "31601725663",
  appId: "1:31601725663:web:e9f57ea76c15a138be996a"
});

const messaging = firebase.messaging();
