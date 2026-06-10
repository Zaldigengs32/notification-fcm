import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted:', authStatus);
      } else {
        console.log('Notification permission denied');
      }
    };

    const getFcmToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
      } catch (error) {
        console.log('Error getting FCM token:', error);
      }
    };

    const unsubscribeForeground = messaging().onMessage(
      async (remoteMessage) => {
        console.log('📩 Pesan diterima di foreground:', remoteMessage);
        Alert.alert(
          remoteMessage.notification?.title || 'Notifikasi',
          remoteMessage.notification?.body || 'Pesan baru diterima',
        );
      },
    );

    requestUserPermission();
    getFcmToken();

    return () => {
      unsubscribeForeground();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🔔 FCM Ready di Android!</Text>
    </View>
  );
}
