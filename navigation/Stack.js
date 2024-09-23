import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/user';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapScreen from '../screens/MapScreen';
import CommunityScreen from '../screens/CommunityScreen';
import CommunityDetail from '../screens/CommunityDetail';
import MypageScreen from '../screens/MyPage/MypageScreen';
import MyPageTicketScreen from '../screens/MyPage/MyPageTicketScreen';
import MyPageTicketUseScreen from '../screens/MyPage/MyPageTicketUseScreen';
import MyPageTermsOfServiceScreen from '../screens/MyPageTermsOfServiceScreen';
import PointStoreScreen from '../screens/PointStoreScreen';
import PointStoreDetail from '../screens/PointStoreDetail';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignUpAgreeScreen from '../screens/SignUpAgreeScreen';
import PasswordFindScreen from '../screens/PasswordFindScreen';
import MainScreen from '../screens/MainScreen';
import MainRegionTabScreen from '../screens/MainRegionTabScreen';
import MainSearchScreen from '../screens/MainSearchScreen';
import MainDetailScreen from '../screens/MainDetailScreen';
import PhotoChallengeScreen from '../screens/PhotoChallengeScreen';
import PhotoChallengeDetail from '../screens/PhotoChallengeDetail';
import PhotoChallengeWrite from '../screens/PhotoChallengeWrite';
import ReportScreen from '../screens/ReportScreen';
import PointStorePaymentScreen from '../screens/PointStorePaymentScreen';
import SettingScreen from '../screens/MyPage/SettingScreen';
import ProfileEditScreen from '../screens/MyPage/ProfileEditScreen';
import ChallengeStateScreen from '../screens/MyPage/ChallengeStateScreen';
import ProfileDeleteScreen from '../screens/MyPage/ProfileDeleteScreen';
import PhotoChallengeEdit from '../screens/PhotoChallengeEdit';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state) => state.user.value);
  const sessionId = useSelector((state) => state.user.value.sessionId);
  const dispatch = useDispatch();

  const defaultHeaderLeft = () => (
    <PrevButton onPress={() => navigation.goBack()}>
      <ButtonImage
        source={require('../assets/btn-back.png')}
        resizeMode="cover"
      />
    </PrevButton>
  );

  const defaultHeaderRight = () => (
    <CloseButton onPress={() => navigation.goBack()}>
      <ButtonImage
        source={require('../assets/btn-close.png')}
        resizeMode="cover"
      />
    </CloseButton>
  );

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('userSessionData');

        if (sessionData) {
          const savedTime = await AsyncStorage.getItem('loginTimestamp');

          if (savedTime) {
            const expirationPeriod =
              3 * 30 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000;
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - parseInt(savedTime, 10);

            if (elapsedTime >= expirationPeriod) {
              await AsyncStorage.multiRemove([
                'loginTimestamp',
                'userSessionData',
              ]);
              setIsLoggedIn(false);
            } else {
              dispatch(login({ sessionId: sessionData }));
              setIsLoggedIn(true);
            }
          }
        } else if (user.sessionId !== '') {
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

  const naviOption = ({
    headerVisible,
    headerLeftVisible,
    headerRightVisible,
    headerTitle,
    headerBackgroundColor,
  }) => ({
    headerBackVisible: false,
    headerTitle: headerTitle ? headerTitle : '',
    headerTitleAlign: 'center',
    headerShown: headerVisible !== false, // 기본값 true
    headerLeft: headerLeftVisible === false ? null : defaultHeaderLeft, // headerLeft visible 여부
    headerRight: headerRightVisible === false ? null : defaultHeaderRight, // headerRight visible 여부
    headerShadowVisible: false,
    headerTitleStyle: { color: '#373737', fontSize: 18, fontFamily: 'Bold' }, // 제목 스타일
    headerStyle: {
      backgroundColor: headerBackgroundColor
        ? headerBackgroundColor
        : '#FFFFFF', // Background color for the header
    },
  });

  return (
    <Stack.Navigator>
      {!isLoggedIn && (
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={() => ({
            ...naviOption({
              headerLeftVisible: true,
              headerRightVisible: false,
              headerVisible: false,
            }),
          })}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      <Stack.Screen
        name="main"
        component={MainScreen}
        options={() => ({
          ...naviOption({
            headerTitle: '홈',
            headerLeftVisible: false,
            headerRightVisible: false,
            headerVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={() => ({
          ...naviOption({
            headerTitle: '회원가입',
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="MainRegionTabScreen"
        component={MainRegionTabScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: false,
            headerRightVisible: false,
            headerVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="SignUpAgreeScreen"
        component={SignUpAgreeScreen}
        options={() => ({
          ...naviOption({
            headerTitle: '약관동의',
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="passwordFind"
        component={PasswordFindScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="MainDetailScreen"
        component={MainDetailScreen}
        options={() => ({
          ...naviOption({
            headerTitle: '홈',
            headerLeftVisible: true,
            headerRightVisible: false,
            headerBackgroundColor: '#F7F7F8',
          }),
        })}
      />
      <Stack.Screen
        name="MainSearchScreen"
        component={MainSearchScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: false,
            headerRightVisible: false,
            headerVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="mypage"
        component={MypageScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: true,
            headerRightVisible: false,
            headerVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="setting"
        component={SettingScreen}
        options={() => ({
          ...naviOption({
            headerTitle: '프로필 및 환경설정',
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="MyPageTermsOfServiceScreen"
        component={MyPageTermsOfServiceScreen}
        options={() => ({
          ...naviOption({
            headerTitle: '서비스 이용약관',
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="profileDelete"
        component={ProfileDeleteScreen}
        options={() => ({
          ...naviOption({
            headerTitle: '회원 탈퇴',
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="challengeState"
        component={ChallengeStateScreen}
        options={() => ({
          ...naviOption({
            headerTitle: '챌린지 참여 현황',
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
      />

      <Stack.Screen
        name="프로필 수정"
        component={ProfileEditScreen}
        options={() => ({
          ...naviOption({
            headerTitle: '프로필 수정',
            headerLeftVisible: true,
            headerRightVisible: '저장',
          }),
        })}
      />
      <Stack.Screen
        name="MyPageTicketScreen"
        component={MyPageTicketScreen}
        options={() => ({
          ...naviOption({
            headerTitle: '나의 티켓 보관함',
            headerLeftVisible: true,
            headerRightVisible: false,
            headerBackgroundColor: '#f7f7f8',
          }),
        })}
      />
      <Stack.Screen
        name="MyPageTicketUseScreen"
        component={MyPageTicketUseScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: true,
            headerRightVisible: false,
            headerBackgroundColor: '#f7f7f8',
          }),
        })}
      />
      <Stack.Screen
        name="pointStore"
        component={PointStoreScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: false,
            headerRightVisible: false,
            headerVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="pointStorePayment"
        component={PointStorePaymentScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="pointStoreDetail"
        component={PointStoreDetail}
        options={() => ({
          ...naviOption({
            headerLeftVisible: true,
            headerRightVisible: false,
            headerVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="photoChallenge"
        component={PhotoChallengeScreen}
        options={() => ({
          ...naviOption({
            headerTitle: '포토챌린지',
            headerLeftVisible: false,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="photoChallengeDetail"
        component={PhotoChallengeDetail}
        options={() => ({
          ...naviOption({
            headerTitle: '포토챌린지',
            headerLeftVisible: true,
            headerRightVisible: false,
            headerBackgroundColor: '#f7f7f8',
          }),
        })}
      />
      <Stack.Screen
        name="photoChallengeWrite"
        component={PhotoChallengeWrite}
        options={() => ({
          ...naviOption({
            headerTitle: '포토챌린지',
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="community"
        component={CommunityScreen}
        options={() => ({
          ...naviOption({
            headerTitle: '커뮤니티',
            headerLeftVisible: false,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="communityDetail"
        component={CommunityDetail}
        options={() => ({
          ...naviOption({
            headerTitle: '포토챌린지',
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="photoChallengeEdit"
        component={PhotoChallengeEdit}
        options={() => ({
          ...naviOption({
            headerTitle: '게시글 수정',
            headerLeftVisible: false,
            headerRightVisible: true,
          }),
        })}
      />
      <Stack.Screen
        name="report"
        component={ReportScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: false,
            headerRightVisible: true,
          }),
        })}
      />
      <Stack.Screen
        name="map"
        component={MapScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
        initialParams={{ headerVisible: false }}
      />
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
