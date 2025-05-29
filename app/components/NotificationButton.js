'use client';

import { useState, useEffect } from 'react';
import { getFCMToken, onMessageListener } from '../firebase/firebase';

export default function NotificationButton() {
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });

  useEffect(() => {
    async function getToken() {
      try {
        const token = await getFCMToken();
        if (token) {
          setTokenFound(true);
          // Token'ı backend'e gönderme işlemi burada yapılabilir
          console.log('FCM Token:', token);
        }
      } catch (error) {
        console.error('Token alınamadı:', error);
      }
    }

    if ('Notification' in window) {
      getToken();
    }
  }, []);

  useEffect(() => {
    if ('Notification' in window) {
      const unsubscribe = onMessageListener().then(payload => {
        setNotification({
          title: payload?.notification?.title,
          body: payload?.notification?.body
        });
      });

      return () => {
        unsubscribe && unsubscribe();
      };
    }
  }, []);

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getFCMToken();
        if (token) {
          setTokenFound(true);
          // Token'ı backend'e gönderme işlemi burada yapılabilir
          console.log('FCM Token:', token);
        }
      }
    } catch (error) {
      console.error('İzin alınamadı:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Push Notification Durumu</h2>
      {isTokenFound ? (
        <div className="text-green-600">Push bildirimleri aktif!</div>
      ) : (
        <button
          onClick={requestPermission}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Push Bildirimlerine İzin Ver
        </button>
      )}
      
      {notification.title && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">{notification.title}</h3>
          <p>{notification.body}</p>
        </div>
      )}
    </div>
  );
} 