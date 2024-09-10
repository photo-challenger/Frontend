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
import {
  fetchLogout
} from '../../service/api';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/user';
import useAlert from '../../hooks/useAlert';
import useConfirm from '../../hooks/useConfirm';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = ({ route, navigation }) => {
  const profileInfo = route.params;
  const dispatch = useDispatch();
  const [showConfirm, ConfirmComponent] = useConfirm();
  const [showAlert, AlertComponent] = useAlert();

  const moveProfileEdit = () => {
    navigation.navigate('프로필 수정');
  };

  const moveProfileDelete = () => {
    navigation.navigate('profileDelete', { nickname: profileInfo.profileNickname });
  };

  const moveTermsOfService = () => {
    navigation.navigate('MyPageTermsOfServiceScreen', { type: 'service' });
  };

  const movePrivacyPolicy = () => {
    navigation.navigate('MyPageTermsOfServiceScreen', { type: 'privacy' });
  };

  const handleLogout = () => {
    showConfirm({
      title: '로그아웃 안내',
      msg: '앱에서 로그아웃 하시겠어요?',
      onOk: async function () {
        await AsyncStorage.clear();
        dispatch(logout());
        const response = await fetchLogout();
        console.log(response);
        navigation.navigate('LoginScreen');
      },
    });
  }

  return (
    <SettingScreenComponent>
      <SettingProfileContainer>
        <SettingHeaderProfileText>프로필</SettingHeaderProfileText>
        <SettingProfileSubContainer>
          <SettingProfileImage source={{ uri: profileInfo.profileImgName }} />
          <ProfileDetailContainer>
            <SettingProfileNickname>
              {profileInfo.profileNickname}
            </SettingProfileNickname>
            <SettingProfileEmail>{profileInfo.loginEmail}</SettingProfileEmail>
            <SettingProfileEditButton
              activeOpacity={0.7}
              onPress={moveProfileEdit}
            >
              <SettingProfileEditButtonText>
                프로필 수정
              </SettingProfileEditButtonText>
              <SettingProfileEditButtonImage
                source={require('../../assets/gray-chevron-right.png')}
              />
            </SettingProfileEditButton>
          </ProfileDetailContainer>
        </SettingProfileSubContainer>
      </SettingProfileContainer>

      <SettingCategoryContainer>
        <SettingHeaderText>문의</SettingHeaderText>
        <SettingCategorySubContainer activeOpacity={0.5}>
          <SettingCategoryText>문의하기</SettingCategoryText>
        </SettingCategorySubContainer>
      </SettingCategoryContainer>

      <SettingCategoryContainer>
        <SettingHeaderText>앱 정보</SettingHeaderText>
        <SettingCategorySubContainer
          activeOpacity={1}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <SettingCategoryText>버전 정보</SettingCategoryText>
          <SettingCategoryText>v1.0.0</SettingCategoryText>
        </SettingCategorySubContainer>
      </SettingCategoryContainer>

      <SettingCategoryContainer>
        <SettingHeaderText>약관 및 정책</SettingHeaderText>
        <SettingCategorySubContainer activeOpacity={0.5} onPress={moveTermsOfService}>
          <SettingCategoryText>서비스 이용약관</SettingCategoryText>
        </SettingCategorySubContainer>
        <SettingCategorySubContainer activeOpacity={0.5} onPress={movePrivacyPolicy}>
          <SettingCategoryText>개인정보 처리방침</SettingCategoryText>
        </SettingCategorySubContainer>
      </SettingCategoryContainer>

      <SettingCategoryContainer>
        <SettingHeaderText>계정 정보</SettingHeaderText>
        <SettingCategorySubContainer activeOpacity={0.5} onPress={handleLogout}>
          <SettingCategoryText>로그아웃</SettingCategoryText>
        </SettingCategorySubContainer>
        <SettingCategorySubContainer
          activeOpacity={0.5}
          onPress={moveProfileDelete}
        >
          <SettingCategoryText>탈퇴하기</SettingCategoryText>
        </SettingCategorySubContainer>
      </SettingCategoryContainer>

      <ConfirmComponent />
    </SettingScreenComponent>
  );
};

export default SettingScreen;

const SettingScreenComponent = styled.View`
  background-color: #ffffff;
  height: 100%;
`;

const SettingProfileContainer = styled.View`
  padding: 24px;
`;

const SettingHeaderProfileText = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 28px;
`;

const SettingProfileSubContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const SettingProfileImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 80px;
  border: 5px solid #ca7ffe;
`;

const ProfileDetailContainer = styled.View`
  margin-left: 16px;
`;

const SettingProfileNickname = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
`;

const SettingProfileEmail = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: #7a7a7a;
  marging-bottom: 12px;
`;

const SettingProfileEditButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

const SettingProfileEditButtonText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: #7a7a7a;
  line-height: 18px;
`;

const SettingProfileEditButtonImage = styled.Image`
  width: 20px;
  height: 20px;
  margin-left: 3px;
`;

const SettingCategoryContainer = styled.View`
  border-bottom-width: 0.9px;
  border-bottom-color: #b5b5b5;
`;

const SettingHeaderText = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  color: #4f4f4f;
  padding: 12px 24px 0 24px;
`;

const SettingCategorySubContainer = styled.TouchableOpacity`
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(181, 181, 181, 0.5);
`;

const SettingCategoryText = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: #373737;
  padding-left: 24px;
  padding-right: 24px;
`;

const VersionText = styled.Text``;
