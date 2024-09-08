import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/Stack';

import Footer from './component/common/Footer';

export default function App() {
  return (
    <SafeAreaView style={styles.safearea}>
      <NavigationContainer>
        <StackNavigation />
        <Footer />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: '#242424',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
