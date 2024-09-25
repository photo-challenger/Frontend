import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  Modal,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { StyleSheetManager } from 'styled-components';
import { fetchProfileDelete, fetchLogout } from '../../service/api';
import useConfirm from '../../hooks/useConfirm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/user';
import { CommonActions } from '@react-navigation/native';

const ProfileDeleteScreen = ({ route, navigation }) => {
  const { nickname } = route.params;
  const dispatch = useDispatch();
  const [deleteInputValue, setDeleteInputValue] = useState('');
  const [showConfirm, ConfirmComponent] = useConfirm();

  const handleDeleteProfile = async () => {
    showConfirm({
      title: '회원탈퇴',
      msg: (
        <Text style={{ fontFamily: 'Bold' }}>
          정말 <Text style={{ color: '#CA7FFE' }}>Tripture</Text>를
          탈퇴하시겠어요?
        </Text>
      ),
      onOk: async function () {
        await AsyncStorage.clear();
        dispatch(logout());
        const response = await fetchProfileDelete();
        console.log(response);

        // 네비게이션 스택을 모두 초기화하고 LoginScreen으로 이동
        navigation.dispatch(
          CommonActions.reset({
            index: 0, // 스택의 첫 번째 화면으로 설정
            routes: [{ name: 'LoginScreen' }], // 이동할 화면
          }),
        );
      },
    });
  };

  return (
    <ProfileDeleteContainer>
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
            <DeleteHeaderText>
              {nickname}님,{'\n'}잠시만요!
            </DeleteHeaderText>
            <DeleteSubHeaderText>
              더 나은 트립처 서비스를 위해 탈퇴 사유를 알려주세요!
            </DeleteSubHeaderText>

            <SearchContent>
              <SearchInput
                placeholder="내용을 입력해주세요."
                placeholderTextColor={'#B5B5B5'}
                onChangeText={(text) => setDeleteInputValue(text)}
                multiline={true}
              />
            </SearchContent>

            <InfoHeaderText>탈퇴하시면,</InfoHeaderText>
            <InfoHeaderSubText>
              •{'  '}탈퇴를 하실 경우 어떤 경우에도 포인트 복구는{'\n   '}불가능
              합니다.{'\n'}•{'  '}탈퇴를 하실 경우 결제하신 서비스 이용 권한 및
              구매{'\n   '}내역을 포기한 것으로 간주됩니다.{'\n'}•{'  '}탈퇴
              시에는 회원님이 작성한 포스트, 댓글은 자동 삭제{'\n   '}됩니다.
            </InfoHeaderSubText>

            <CheckText>정말 탈퇴하시겠습니까?</CheckText>
          </Animated.ScrollView>
        </Animated.View>
        <DeleteButton
          deleteInputValue={deleteInputValue}
          activeOpacity={deleteInputValue !== '' ? 0.7 : 1}
          onPress={deleteInputValue !== '' ? handleDeleteProfile : null}
        >
          <DeleteButtonText>탈퇴하기</DeleteButtonText>
        </DeleteButton>
        <ConfirmComponent />
      </KeyboardAvoidingView>
    </ProfileDeleteContainer>
  );
};

export default ProfileDeleteScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flexGrow: 1,
  },
  animatedSheet: {
    flexGrow: 1,
  },
  scrollView: {
    paddingTop: 12,
    paddingLeft: 24,
    paddingRight: 24,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 24, // 스크롤 여유 공간을 위한 추가 패딩
  },
});

const ProfileDeleteContainer = styled.View`
  background: #f7f7f8;
  height: 100%;
`;

const DeleteHeaderText = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-family: Semibold;
`;

const DeleteSubHeaderText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-family: Medium;
`;

const SearchContent = styled.View`
  display: flex;
  height: 88px;
  padding: 12px 16px;
  border-radius: 8px;
  background: #ffffff;
  flex-direction: row;
  border: 1.6px solid #b5b5b5;
  margin-top: 24px;
`;
const SearchInput = styled.TextInput`
  font-size: 14px;
  font-style: normal;
  font-family: Medium;
  text-align-vertical: top;
`;

const InfoHeaderText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-family: Bold;
  color: #4f4f4f;
  margin-bottom: 5px;
  margin-top: 30px;
`;

const InfoHeaderSubText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-family: Medium;
  color: #4f4f4f;
  line-height: 21px;
`;

const CheckText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-family: Bold;
  color: #4f4f4f;
  position: absolute;
  bottom: 92px;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  background-color: ${(props) =>
    props.deleteInputValue !== '' ? '#4F4F4F' : '#B5B5B5'};
  width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
`;

const DeleteButtonText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-family: Bold;
  color: #ffffff;
`;
