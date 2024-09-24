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
  ToastAndroid,
} from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { fetchProfileEditForm, fetchProfileEdit } from '../../service/api';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../redux/user';
import ImagePickerProfile from '../../component/common/ImagePcikerProfile';
import useConfirm from '../../hooks/useConfirm';

const SaveButtonComponent = ({ onSave }) => (
  <SaveButton onPress={onSave}>
    <SaveText>저장</SaveText>
  </SaveButton>
);

const ProfileEditScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [profileInfo, setProfileInfo] = useState({});
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState();
  const [checkPasswordIsValid, setCheckPasswordIsValid] = useState();
  const [imageInfo, setImageInfo] = useState('');

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  useEffect(() => {
    if (password !== '') {
      setPasswordValid(passwordRegex.test(password));
    }
  }, [password]);

  // nickname, password, checkPassword, passwordValid;
  const [saveFlag, setSaveFlag] = useState(false);
  useEffect(() => {
    if (saveFlag) {
      saveData();
    }
  }, [saveFlag]);

  const saveData = async () => {
    if (passwordValid === false) {
      //비밀번호 정규식이 틀렸을 경우
      setSaveFlag(false);
      ToastAndroid.showWithGravity(
        '비밀번호는 특수문자, 숫자 포함 8자 이상 입력해주세요.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    } else if (checkPasswordIsValid === false) {
      //비밀번호 검사 틀렸을 경우
      setSaveFlag(false);
      ToastAndroid.showWithGravity(
        '새로운 비밀번호를 다시 확인해주세요.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }

    const rtn = {
      profileNickname:
        nickname == '' || nickname == null
          ? profileInfo.profileNickname
          : nickname,
      loginPw:
        password == '' || password == null ? profileInfo.loginPw : password,
      file: imageInfo ?? '',
    };
    // console.log('🚀 ~ saveData ~ rtn:', rtn);

    fetchProfileEdit(rtn)
      .then((result) => {
        ToastAndroid.showWithGravity(
          '저장했습니다.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        dispatch(
          updateUserProfile({
            profileImgName: result.profileImgName,
            profileNickname: result.profileNickname,
          }),
        );
      })
      .catch(() => {
        ToastAndroid.showWithGravity(
          '저장에 실패했습니다. 다시 한 번 확인해주세요.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setSaveFlag(false);
      })
      .finally(() => {
        navigation.push('mypage');
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveButtonComponent onSave={() => setSaveFlag(true)} />
      ),
    });

    getProfileEditForm();
  }, [navigation]);

  const getProfileEditForm = async () => {
    const result = await fetchProfileEditForm();
    setProfileInfo(result);
  };
  useEffect(() => {
    if (checkPassword !== '') {
      setCheckPasswordIsValid(password === checkPassword);
    }
  }, [checkPassword]);

  function setImageResult(rs) {
    console.log('Rs : ', rs.assets[0]);
    const file = {
      uri: rs.assets[0].uri,
      type: 'image/jpeg',
      name: rs.assets[0].fileName || rs.assets[0].uri.split('/').pop(),
    };
    setImageInfo(file);
  }

  return (
    <ProfileEditComponent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={styles.keyboardAvoidingView}
      >
        <Animated.View style={[styles.animatedSheet]}>
          <Animated.ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <ProfileHeaderText>프로필</ProfileHeaderText>
            <ProfileDetailContainer>
              <ImagePickerProfile
                callbackResult={setImageResult}
                profileImage={profileInfo.profileImgName}
              />
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
    paddingBottom: 30, // 스크롤 여유 공간을 위한 추가 패딩
  },
});

const ProfileEditComponent = styled.View`
  background-color: #f7f7f8;
  height: 100%;
`;

const ProfileHeaderText = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-family: Semibold;
`;

const ProfileDetailContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  margin-bottom: 16px;
`;

const ProfileNickname = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-family: Semibold;
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
  font-family: Bold;
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
  font-family: Regular;
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

const SaveText = styled.Text`
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-family: Bold;
  letter-spacing: -0.36px;
  color: #373737;
`;
const SaveButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
