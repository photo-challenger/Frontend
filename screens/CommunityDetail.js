import React, { useState, useEffect } from 'react';
import { Modal, View, Image, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import {
  fetchCommunityDetail,
  fetchDeletePost,
  fetchSaveBookmark,
  fetchAddPostLike,
} from '../service/api';
import useConfirm from '../hooks/useConfirm';

const CommunityDetail = ({ route, navigation }) => {
  const { postId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [showConfirm, ConfirmComponent] = useConfirm();

  const openModal = () => {
    setModalVisible(true);
  };

  // 수정하기
  const editPost = () => {
    // 수정하기 화면으로 이동
    setModalVisible(false);
  };

  // 신고하기
  const reportPost = () => {
    // 신고하기 화면으로 이동
    setModalVisible(false);
    navigation.navigate('report', {
      reportType: 'post',
      postOrCommentId: postId,
    });
  };

  // 저장하기
  const savePost = async () => {
    const result = await fetchSaveBookmark(postId);
    setIsBookmark(result.checkDeleteOrSave == 'Save');
    setModalVisible(false);
  };

  // 삭제하기
  const deletePost = () => {
    // 삭제하시겠습니까?
    showConfirm({
      msg: '삭제하시겠습니까?',
      onOk: async function () {
        // 삭제 API 호출
        const deleteCbData = await fetchDeletePost(postId);
        console.log(deleteCbData);
        // 화면 나가기
        navigation.goBack();
      },
    });

    setModalVisible(false);
  };

  async function getCommunityDetail() {
    try {
      const apiResponseData = await fetchCommunityDetail(postId);
      console.log(' apiResponseData   :', apiResponseData);
      setPostInfo(apiResponseData);
      setIsBookmark(apiResponseData.isSaveBookmark == 'true');
      setIsLike(apiResponseData.isLike === 'true');
    } catch (error) {
      console.error('Failed to fetch community detail:', error);
    } finally {
      setLoading(false);
    }
  }

  async function addPostLike() {
    const apiResponseData = await fetchAddPostLike(postId);
    setIsLike(apiResponseData.checkDeleteOrSave == 'Save');
  }

  useEffect(() => {
    getCommunityDetail();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <CommunityDetailContainer>
      <TopBox>
        <UserProfile>
          <UserImage source={{ uri: postInfo.profileImgUrl }} />
          <UserInfo>
            <UserName>{postInfo.nickname}</UserName>
            <UserLevel>{postInfo.level}</UserLevel>
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
        <MainImage source={{ uri: postInfo.imgUrl }} />
      </ImageGrid>

      <ContentBox>
        <ContentText>{postInfo.postContent}</ContentText>
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
        <LikeBox onPress={addPostLike}>
          <Image
            source={
              isLike
                ? require('../assets/icon-like-on.png')
                : require('../assets/icon-like.png')
            }
            style={{ width: 24, height: 24 }}
          />
          <ScoreText>{postInfo.postLikeCount}</ScoreText>
        </LikeBox>
        <CommentBox>
          <Image
            source={require('../assets/icon-annotation.png')}
            style={{ width: 24, height: 24 }}
          />
          <ScoreText>{postInfo.postCommentCount}</ScoreText>
        </CommentBox>
      </ScoreBox>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ModalContainer>
          <ModalContent>
            {postInfo.isMyPost == 'true' && (
              <ModalOption onPress={editPost}>
                <ModalIcon source={require('../assets/icon-edit.png')} />
                <ModalText>수정하기</ModalText>
              </ModalOption>
            )}
            {postInfo.isMyPost != 'true' && (
              <ModalOption onPress={reportPost}>
                <ModalIcon source={require('../assets/icon-report.png')} />
                <ModalText>신고하기</ModalText>
              </ModalOption>
            )}
            <ModalOption onPress={savePost}>
              <ModalIcon source={require('../assets/icon-save.png')} />
              <ModalText>저장하기</ModalText>
            </ModalOption>
            {postInfo.isMyPost == 'true' && (
              <ModalOption onPress={deletePost}>
                <ModalIcon source={require('../assets/icon-delete.png')} />
                <ModalText>삭제하기</ModalText>
              </ModalOption>
            )}
          </ModalContent>
        </ModalContainer>
      </Modal>

      <ConfirmComponent />
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
