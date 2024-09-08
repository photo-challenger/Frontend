import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/Stack';
import { Provider } from 'react-redux';
import store from './redux/store';

import Footer from './component/common/Footer';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safearea}>
        <NavigationContainer>
          <StackNavigation />
          <Footer />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
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
