import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapScreen from '../screens/MapScreen';
import CommunityScreen from '../screens/CommunityScreen';
import CommunityDetail from '../screens/CommunityDetail';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MainScreen from '../screens/MainScreen';
import MainRegionTabScreen from '../screens/MainRegionTabScreen';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import PhotoChallengeScreen from '../screens/PhotoChallengeScreen';
import PhotoChallengeDetail from '../screens/PhotoChallengeDetail';
import PhotoChallengeWrite from '../screens/PhotoChallengeWrite';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/user';
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('userSessionData');

        if (sessionData) {
          const savedTime = await AsyncStorage.getItem('loginTimestamp');

          if (savedTime) {
            const expirationPeriod = (3 * 30 * 24 * 60 * 60 * 1000) - (60 * 60 * 1000);
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - parseInt(savedTime, 10);
            
            if (elapsedTime >= expirationPeriod) {
              await AsyncStorage.multiRemove(['loginTimestamp', 'userSessionData']);
              setIsLoggedIn(false);
            } else {
              dispatch(login({ sessionId: sessionData }));
              setIsLoggedIn(true);
            }
          }
        } else if(user.sessionId !== '') {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#CA7FFE" />
      </LoadingContainer>
    );
  }

  const naviOption = ({ route }) => ({
    headerBackVisible: false,
    headerLeft: ({ onPress }) => (
      <PrevButton onPress={onPress}>
        <ButtonImage
          source={require('../assets/btn-back.png')}
          resizeMode="cover"
        />
      </PrevButton>
    ),
    headerTitle: ({ children }) => <Title>{children}</Title>,
    headerRight: ({ onPress }) => (
      <CloseButton onPress={onPress}>
        <ButtonImage
          source={require('../assets/btn-close.png')}
          resizeMode="cover"
        />
      </CloseButton>
    ),
    headerTitleAlign: 'center',
    headerShown: route.params?.headerVisible !== false,
  });


  return (
    <Stack.Navigator>
      {!isLoggedIn && (
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={naviOption} setIsLoggedIn={setIsLoggedIn}  initialParams={{ headerVisible: false }}
        />
      )}
      <Stack.Screen name="MainScreen" component={MainScreen} options={naviOption} />
      <Stack.Screen
        name="PhotoChallenge"
        component={PhotoChallengeScreen}
        options={naviOption}
      />
      <Stack.Screen
        name="MainRegionTabScreen"
        component={MainRegionTabScreen}
        options={naviOption}
        initialParams={{ headerVisible: false }}
      />
      <Stack.Screen
        name="PhotoChallengeDetail"
        component={PhotoChallengeDetail}
        options={naviOption}
      />
      <Stack.Screen
        name="PhotoChallengeWrite"
        component={PhotoChallengeWrite}
        options={naviOption}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={naviOption}
      />

      {/* <Stack.Screen
        name="community"
        component={CommunityScreen}
        options={naviOption}
      />
      <Stack.Screen
        name="communityDetail"
        component={CommunityDetail}
        options={naviOption}
      />
      <Stack.Screen
        name="map"
        component={MapScreen}
        options={naviOption}
        initialParams={{ headerVisible: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default StackNavigation;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const PrevButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

const ButtonImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.36px;
  color: #373737;
`;
