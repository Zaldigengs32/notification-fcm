import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import NotificationScreen from './pages/P9_2_Notification/NotificationScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <NotificationScreen />
    </SafeAreaView>
  );
}
