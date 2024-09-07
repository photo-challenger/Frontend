import React, { useState, useEffect } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { fetchLogin, fetchProfileEditForm } from '../../service/api';

const ProfileEditScreen = ({ route, navigation }) => {
  const [profileInfo, setProfileInfo] = useState({});
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState();
  const [checkPasswordIsValid, setCheckPasswordIsValid] = useState();

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  useEffect(() => {
    if (password !== '') {
      setPasswordValid(passwordRegex.test(password));
    }
  }, [password]);

  useEffect(() => {
    // fetchLogin();
    getProfileEditForm();
  }, []);

  const getProfileEditForm = async () => {
    const result = await fetchProfileEditForm();
    // console.log('🚀 ~ result:', result);
    setProfileInfo(result);
  };
  useEffect(() => {
    if (checkPassword !== '') {
      setCheckPasswordIsValid(password === checkPassword);
    }
  }, [checkPassword]);

  return (
    <ProfileEditComponent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <Animated.View style={[styles.animatedSheet]}>
          <Animated.ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="always"
          >
            <ProfileHeaderText>프로필</ProfileHeaderText>
            <ProfileDetailContainer>
              <View style={{ position: 'relative' }}>
                <ProfileImage source={{ uri: profileInfo.profileImgName }} />
                <ProfileImageEditButton activeOpacity={0.8}>
                  <ProfileImageEditImage
                    source={require('../../assets/profile-edit-icon.png')}
                  />
                </ProfileImageEditButton>
              </View>
              <ProfileNicknameContainer>
                <ProfileNickname>{profileInfo.profileNickname}</ProfileNickname>
                {profileInfo.loginType == 'KAKAO' ? (
                  <KakaoImage
                    source={require('../../assets/kakao-profile.png')}
                  />
                ) : null}
              </ProfileNicknameContainer>
            </ProfileDetailContainer>

            <ProfileNicknameHeaderText>닉네임</ProfileNicknameHeaderText>
            <NicknameInputContent>
              <NicknameInput
                placeholder="닉네임을 입력하세요."
                placeholderTextColor={'#B5B5B5'}
                onChangeText={(text) => setNickname(text)}
              />
            </NicknameInputContent>

            <ProfileNicknameHeaderText>이메일</ProfileNicknameHeaderText>
            <EmailInputContent>
              <NicknameInput
                placeholder={profileInfo.loginEmail}
                placeholderTextColor={'#5F5F5F'}
                editable={false}
              />
            </EmailInputContent>

            {profileInfo.loginType == 'SELF' ? (
              <>
                <ProfileNicknameHeaderText>
                  현재 비밀번호
                </ProfileNicknameHeaderText>
                <NicknameInputContent>
                  <NicknameInput
                    placeholder="사용 중인 비밀번호를 입력해주세요."
                    placeholderTextColor={'#B5B5B5'}
                    onChangeText={(text) => setCurrentPassword(text)}
                  />
                </NicknameInputContent>

                <ProfileNicknameHeaderText>
                  새로운 비밀번호
                </ProfileNicknameHeaderText>
                <PasswordContent passwordValid={passwordValid}>
                  <NicknameInput
                    placeholder="특수문자, 숫자 포함 8자 이상 입력해주세요."
                    placeholderTextColor={'#B5B5B5'}
                    onChangeText={(text) => setPassword(text)}
                  />
                </PasswordContent>

                <ProfileNicknameHeaderText>
                  비밀번호 확인
                </ProfileNicknameHeaderText>
                <View>
                  <PasswordCheckContent
                    checkPasswordIsValid={checkPasswordIsValid}
                  >
                    <NicknameInput
                      placeholder="비밀번호를 다시 한 번 입력해주세요."
                      placeholderTextColor={'#B5B5B5'}
                      onChangeText={(text) => setCheckPassword(text)}
                    />
                  </PasswordCheckContent>
                </View>
              </>
            ) : null}
          </Animated.ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </ProfileEditComponent>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flexGrow: 1,
  },
  animatedSheet: {
    flexGrow: 1,
  },
  scrollView: {
    padding: 24,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 24, // 스크롤 여유 공간을 위한 추가 패딩
  },
});

const ProfileEditComponent = styled.View`
  background-color: #f7f7f8;
  height: 100%;
`;

const ProfileHeaderText = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
`;

const ProfileDetailContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  margin-bottom: 16px;
`;

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border: 6px solid #ca7ffe;
  border-radius: 90px;
`;

const ProfileImageEditButton = styled.TouchableOpacity`
  background-color: #4f4f4f;
  width: 36px;
  height: 36px;
  border-radius: 30px;
  position: absolute;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`;

const ProfileImageEditImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const ProfileNickname = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
`;

const ProfileNicknameContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const KakaoImage = styled.Image`
  height: 25px;
  width: 12%;
  margin-left: 5px;
`;

const ProfileNicknameHeaderText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 20px;
`;

const NicknameInputContent = styled.View`
  display: flex;
  height: 40px;
  border-radius: 8px;
  background: #ffffff;
  flex-direction: row;
  border: 1px solid #ca7ffe;
  margin-bottom: 20px;
`;

const EmailInputContent = styled.View`
  display: flex;
  height: 40px;
  border-radius: 8px;
  background: rgba(128, 128, 128, 0.1);
  flex-direction: row;
  border: 1px solid #b5b5b5;
  margin-bottom: 20px;
`;

const NicknameInput = styled.TextInput`
  padding-left: 16px;
`;

const PasswordContent = styled.View`
  display: flex;
  height: 40px;
  border-radius: 8px;
  background: #ffffff;
  flex-direction: row;
  border: 1px solid
    ${(props) =>
      props.passwordValid === undefined || props.passwordValid === null
        ? '#CA7FFE'
        : props.passwordValid
        ? '#0046B8'
        : '#CB1400'};
  margin-bottom: 20px;
`;

const PasswordCheckContent = styled.View`
  display: flex;
  height: 40px;
  border-radius: 8px;
  background: #ffffff;
  flex-direction: row;
  border: 1px solid
    ${(props) =>
      props.checkPasswordIsValid === undefined ||
      props.checkPasswordIsValid === null
        ? '#CA7FFE'
        : props.checkPasswordIsValid
        ? '#0046B8'
        : '#CB1400'};
  margin-bottom: 20px;
`;
