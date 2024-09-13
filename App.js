import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer, useNavigationState, useScrollToTop } from '@react-navigation/native';
import StackNavigation from './navigation/Stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as Font from 'expo-font';
import { setCustomText } from "react-native-global-props";

import Footer from './component/common/Footer';

export default function App() {
  const [fontsLoaded, setFontLoaded]= useState(false);

  useEffect(() => {
    // 폰트를 비동기로 로드
    const loadFonts = async () => {
      setFontLoaded(true);
      await Font.loadAsync({
        Bold: require("./assets/fonts/Pretendard-Bold.otf"),  // Pretendard 폰트 경로
        Medium: require("./assets/fonts/Pretendard-Medium.otf"),
        Regular: require("./assets/fonts/Pretendard-Regular.otf"),
        Semibold: require("./assets/fonts/Pretendard-SemiBold.otf")
      });

      // 전역 폰트 스타일 설정
      const customTextProps = {
        style: {
          fontFamily: "Pretendard",
        },
      };
      setCustomText(customTextProps);
      setFontLoaded(false);
    };

    loadFonts();
  }, []);

  if(fontsLoaded) {
    return null;
  }

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
