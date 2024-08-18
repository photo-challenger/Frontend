import React, { useState, useEffect } from 'react';
import { Modal, View, Image } from 'react-native';
import styled from 'styled-components/native';

const CommunityDetail = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <CommunityDetailContainer>
      <TopBox>
        <UserProfile>
          <UserImage source={require('../assets/img-profile.jpg')} />
          <UserInfo>
            <UserName>트립처</UserName>
            <UserLevel>Level 1 초보 챌린저</UserLevel>
          </UserInfo>
        </UserProfile>
        <SettingButton onPress={openModal}>
          <Image
            source={require('../assets/btn-dots.png')}
            style={{ width: 24, height: 24 }}
          />
        </SettingButton>
      </TopBox>

      <ImageGrid>
        <MainImage source={require('../assets/img-beach.png')} />
      </ImageGrid>

      <ContentBox>
        <ContentText>
          여행은 새로운 경험과 추억을 선사하지만, 올바른 준비가 필수입니다. 이번
          블로그 포스트에서는 여행자가 가져가야 할 10가지 필수 아이템을 상세히
          소개합니다.
        </ContentText>
      </ContentBox>

      <LocationBox>
        <LocationImage source={require('../assets/img-beach.png')} />
        <LocationDetails>
          <LocationName>우도</LocationName>
          <LocationType>섬</LocationType>
        </LocationDetails>
        <MoreButton>
          <Image
            source={require('../assets/btn-arrow.png')}
            style={{ width: 24, height: 24 }}
          />
        </MoreButton>
      </LocationBox>

      <ScoreBox>
        <LikeBox>
          <Image
            source={require('../assets/icon-like.png')}
            style={{ width: 24, height: 24 }}
          />
          <ScoreText>0</ScoreText>
        </LikeBox>
        <CommentBox>
          <Image
            source={require('../assets/icon-annotation.png')}
            style={{ width: 24, height: 24 }}
          />
          <ScoreText>0</ScoreText>
        </CommentBox>
      </ScoreBox>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <ModalContainer>
          <ModalContent>
            <ModalOption onPress={closeModal}>
              <ModalIcon source={require('../assets/icon-edit.png')} />
              <ModalText>수정하기</ModalText>
            </ModalOption>
            <ModalOption onPress={closeModal}>
              <ModalIcon source={require('../assets/icon-report.png')} />
              <ModalText>신고하기</ModalText>
            </ModalOption>
            <ModalOption onPress={closeModal}>
              <ModalIcon source={require('../assets/icon-save.png')} />
              <ModalText>저장하기</ModalText>
            </ModalOption>
            <ModalOption onPress={closeModal}>
              <ModalIcon source={require('../assets/icon-delete.png')} />
              <ModalText>삭제하기</ModalText>
            </ModalOption>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </CommunityDetailContainer>
  );
};

export default CommunityDetail;

const CommunityDetailContainer = styled.View`
  background: #fff;
  padding: 20px;
  height: 100%;
`;

const TopBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const UserProfile = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UserInfo = styled.View`
  margin-left: 10px;
`;

const UserImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const UserName = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 16px;
`;

const UserLevel = styled.Text`
  color: #999;
  font-size: 14px;
`;

const SettingButton = styled.TouchableOpacity``;

const ImageGrid = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const MainImage = styled.Image`
  width: 100%;
  height: 238px;
  border-radius: 8px;
`;

const ContentBox = styled.View`
  margin-bottom: 20px;
`;

const ContentText = styled.Text`
  color: #333;
  font-size: 14px;
  line-height: 20px;
`;

const LocationBox = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: #f1f2f9;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const LocationImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 8px;
`;

const LocationDetails = styled.View`
  flex: 1;
  margin-left: 10px;
`;

const LocationName = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 14px;
`;

const LocationType = styled.Text`
  color: #666;
  font-size: 12px;
`;

const MoreButton = styled.TouchableOpacity``;

const ScoreBox = styled.View`
  flex-direction: row;
`;

const LikeBox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const CommentBox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 0px 8px;
`;

const ScoreText = styled.Text`
  margin-left: 5px;
  color: #666;
  font-size: 14px;
  padding-left: 8px;
`;

/* Modal Styles */
const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  background-color: #ffffff;
  padding: 16px 0;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  align-items: stretch;
`;

const ModalOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
`;

const ModalIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

const ModalText = styled.Text`
  font-size: 16px;
  color: #333;
`;
