// Firebase App (the core Firebase SDK) is always required and must be listed first
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
self.firebaseConfig = {
  apiKey: 'AIzaSyBwVfrs6ulZg00sHT5TX67CvZ-l00kjEhI',
  authDomain: 'web-push-65bbe.firebaseapp.com',
  projectId: 'web-push-65bbe',
  storageBucket: 'web-push-65bbe.firebasestorage.app',
  messagingSenderId: '183431696806',
  appId: '1:183431696806:web:e0c490ab9426667798ff67'
};

// Initialize Firebase
firebase.initializeApp(self.firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Arka planda mesaj alındı:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/notification-icon.png',
    badge: '/badge-icon.png',
    data: payload.data
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
}); 