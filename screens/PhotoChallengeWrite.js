import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  Image,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import ImagePickerItem from '../component/common/ImagePickerItem';
import BaseInput from '../component/common/BaseInput';
import BaseTextarea from '../component/common/BaseTextArea';
import { fetchWritePost } from '../service/api';
import useAlert from '../hooks/useAlert';

const { width } = Dimensions.get('window');

const PhotoChallengeWrite = ({ route, navigation }) => {
  const { challengeInfo } = route.params;
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [imageInfo, setImageInfo] = useState('');
  const [showAlert, AlertComponent] = useAlert();

  useEffect(() => {
    //연도 : 2022
    const _year = String(new Date().getFullYear());
    //월 : 4
    const _month = String(new Date().getMonth() + 1);
    //일 : 19
    const _date = String(new Date().getDate());
    setVisitDate(
      `${_year}.${_month.padStart(2, '0')}.${_date.padStart(2, '0')}`,
    );

    console.log('visitDate : ', visitDate);
  }, []);

  function changeToDate(str) {
    let date = str.replace(/[^0-9]/g, '');
    date = date.length > 10 ? date.substr(0, 10) : date;
    const _year = date.substr(0, 4);
    const _month = date.substr(4, 2);
    const _date = date.substr(6, 2);

    if (date.length > 6) {
      date = `${_year}-${_month}-${_date}`;
    } else if (date.length > 4) {
      date = `${_year}-${_month}`;
    } else {
    }

    setVisitDate(date);
  }

  async function writeChallengeData() {
    if (!imageInfo) {
      showAlert({
        title: "포토 챌린지 오류!",
        msg: '사진 첨부는 필수 입니다!'
      });
    } else {
      const result = await fetchWritePost({
        postContent: content,
        contentId: challengeInfo.contentId,
        file: imageInfo,
        challengeName: challengeInfo.challengeName,
        areaCode: challengeInfo.areaCode
      });
  
      if(result === 'Post Add Successful') {
        showAlert({
          title: "포토 챌린지 참여 완료!",
          msg: '포토 챌린지가 참여 완료 되었습니다 :)',
          onOk: async function () {
            navigation.goBack();
          },
        });
      }
    }
  }

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
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container>
          <ImagePickerItem callbackResult={setImageResult} />

          <InputContainer>
            <BaseTextarea
              placeholder="문구를 작성해주세요"
              readOnly={false}
              inputType="default"
              onChangeText={(text) => setContent(text)}
            />

            <BaseInput
              title="위치"
              value={challengeInfo.addr}
              readOnly={true}
              inputType="default"
              onChangeText={setLocation}
            />
            <Title>참여한 챌린지</Title>
            <NameTextBox>
              <NameText>{challengeInfo.challengeName}</NameText>
            </NameTextBox>

            <Underline />
            <BaseInput
              title="다녀온 날짜"
              readOnly={true}
              placeholder="2024-01-01"
              inputType="numeric"
              value={visitDate}
              onChangeText={changeToDate}
            />
          </InputContainer>

          <ActionButton onPress={() => writeChallengeData()}>
            <ButtonText>챌린지 등록하기</ButtonText>
          </ActionButton>

          <AlertComponent />
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PhotoChallengeWrite;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ActionButton = styled.TouchableOpacity`
  height: 80px;
  bottom: 0;
  background-color: #ca7ffe;
  padding-vertical: 15px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 18px;
  letter-spacing: -0.36px;
  font-family: Bold;
`;

const InputContainer = styled.View`
  margin: 0px 24px;
`;

const Title = styled.Text`
  font-size: 18px;
  margin-bottom: 8px;
  color: #5f5f5f;
  font-family: Semibold;
`;

const Underline = styled.View`
  height: 1px;
  background-color: #e0e0e0;
  margin-top: 4px;
  margin-bottom: 16px;
`;

const NameTextBox = styled.View`
  border-radius: 4px;
  background: #b5b5b5;
  display: inline-flex;
  padding: 6px 14px;
  flex-direction: row;
  align-self: flex-start;
  margin-bottom: 4px;
`;

const NameText = styled.Text`
  color: #fff;
  text-align: left;
  font-size: 14px;
  font-style: normal;
  font-family: Semibold;
  letter-spacing: -0.154px;
`;
