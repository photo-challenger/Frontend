import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import KakaoMap from '../component/KakaoMap';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} />
      <Text style={styles.pageTitle}>Kakao Map</Text>
      <KakaoMap />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f7f8fa',
  },
  pageTitle: {
    marginBottom: 35,
    paddingHorizontal: 15,
    fontSize: 40,
    fontWeight: '600',
  },
});
