import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import StackNavigation from './navigation/Stack';
import { Provider } from 'react-redux';
import store from './redux/store';

import Footer from './component/common/Footer';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safearea}>
        <NavigationContainer>
          <MainContent />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

function MainContent() {
  const routeName = useNavigationState((state) => state?.routes[state.index]?.name);
  const screensWithoutFooter = ['LoginScreen', 'SignUpScreen', 'SignUpAgreeScreen', 
    'passwordFind', 'photoChallengeDetail', 'photoChallengeWrite',
    'pointStoreDetail', 'pointStorePayment'];
  const showFooter = !screensWithoutFooter.includes(routeName);

  return (
    <>
      <StackNavigation />
      {showFooter && <Footer />} 
    </>
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
