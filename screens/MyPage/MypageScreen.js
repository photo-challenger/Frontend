import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { fetchLogin, fetchDefaultProfile } from '../../service/api';
import Animated from 'react-native-reanimated';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DateRangePicker from './DateRangePicker';
import ChallengeComponent from './ChallengeComponent';
import PointComponent from './PointComponent';
import ScrapComponent from './ScrapComponent';

const Tab = createMaterialTopTabNavigator();

const MypageScreen = ({ route, navigation }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    getDefaultProfile();
  }, []);

  const getDefaultProfile = async () => {
    const result = await fetchDefaultProfile();
    console.log('🚀 ~ result:', result);
    setProfileInfo(result);
  };

  const moveDetail = (id) => {
    navigation.navigate('프로필 및 환경설정', profileInfo);
  };

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <TabListContainer>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.title !== undefined ? options.title : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          return (
            <TabListFirstView
              key={index}
              onPress={onPress}
              isFocused={isFocused}
            >
              <TabListFirstText isFocused={isFocused}>{label}</TabListFirstText>
            </TabListFirstView>
          );
        })}
      </TabListContainer>
    );
  };

  return (
    <MyPageScreen>
      <SettingImageContainer onPress={moveDetail}>
        <SettingImage source={require('../../assets/setting-icon.png')} />
      </SettingImageContainer>
      <MyPageHeaderContainer>
        <MyPageHeaderText>
          {profileInfo?.profileNickname}님, 트립처와 함께{'\n'}
          추억가득한 여행되세요!
        </MyPageHeaderText>
        <MyPageHeaderProfileImage
          source={{ uri: profileInfo?.profileImgName }}
        />
      </MyPageHeaderContainer>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: '#CA7FFE', // 선택된 탭 아래의 Indicator 색상
            height: 3, // Indicator 높이
          },
          lazy: true, // 탭이 처음 활성화될 때만 컴포넌트를 로드
          lazyPreloadDistance: 0,
        }}
      >
        <Tab.Screen
          name="챌린지"
          component={ChallengeComponent}
          initialParams={{ profileNickname: profileInfo?.profileNickname }}
        />
        <Tab.Screen name="포인트" component={PointComponent} />
        <Tab.Screen name="스크랩" component={ScrapComponent} />
      </Tab.Navigator>
    </MyPageScreen>
  );
};

export default MypageScreen;

const MyPageScreen = styled.View`
  background-color: #f7f7f8;
  height: 100%;
`;

const SettingImageContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 40px;
`;

const SettingImage = styled.Image`
  height: 48px;
  resize-mode: contain;
`;

const MyPageHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 24px;
`;

const MyPageHeaderText = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
`;

const MyPageHeaderProfileImage = styled.Image`
  height: 77px;
  width: 77px;
  border-radius: 77px;
`;

const TabListContainer = styled.View`
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
`;

const TabListFirstView = styled.TouchableOpacity`
  width: 33.3%;
  border-bottom-width: 2px;
  padding: 12px 39px;
  align-items: center;
  border-bottom-color: ${(props) => (props.isFocused ? '#CA7FFE' : '#F0F0F0')};
`;

const TabListFirstText = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: ${(props) => (props.isFocused ? '#000000' : '#ADADAE')};
`;
