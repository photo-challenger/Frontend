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
import BaseTextarea from '../component/common/BaseTextArea';
import { fetchEditPost } from '../service/api';
import useAlert from '../hooks/useAlert';

const { width } = Dimensions.get('window');

const PhotoChallengeEdit = ({ route, navigation }) => {
  // const { postInfo } = route.params;
  const [postInfo, setPostInfo] = useState(route.params.postInfo);

  const [showAlert, AlertComponent] = useAlert();

  console.log('postInfo  :', postInfo);

  async function editPostData() {
    const result = await fetchEditPost({
      postId: postInfo.postId,
      postContent: postInfo.postContent,
    });

    if (result === 'Post modification successful') {
      showAlert({
        msg: '수정되었습니다 :)',
        onOk: async function () {
          navigation.goBack();
        },
      });
    }
  }

  const updateContent = (text) => {
    // 상태 업데이트
    setPostInfo({ ...postInfo, postContent: text });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
    >
      <Container>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 200 }}>

          <ImageWrapper>
            <PostImage source={{ uri: postInfo.imgUrl }} />
          </ImageWrapper>
          <EditText>내용 수정하기</EditText>
          <InputContainer>
            <BaseTextarea
              placeholder="수정할 내용을 작성해 주세요."
              readOnly={false}
              value={postInfo.postContent}
              inputType="default"
              onChangeText={updateContent}
            />
          </InputContainer>
        </ScrollView>


        <ActionButton onPress={() => editPostData()}>
          <ButtonText>수정 완료</ButtonText>
        </ActionButton>

        <AlertComponent />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default PhotoChallengeEdit;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ActionButton = styled.TouchableOpacity`
  position: absolute;
  height: 80px;
  width: 100%;
  bottom: 0;
  background-color: #4f4f4f;
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
  background-color: #f2f3f7;
  border-radius: 12px;
  padding: 0 24px 10px 24px;
`;

const ImageWrapper = styled.View`
  height: 262px;
  margin: 24px;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const EditText = styled.Text`
  font-size: 18px;
  font-family: Semibold;
  letter-spacing: -0.36px;
  margin-left: 24px;
  margin: 10px 0 8px 24px;
`
