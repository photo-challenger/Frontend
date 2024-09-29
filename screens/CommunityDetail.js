import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import {
  fetchCommunityDetail,
  fetchDeletePost,
  fetchSaveBookmark,
  fetchAddPostLike,
  fetchDetailCommon,
} from '../service/api';
import useConfirm from '../hooks/useConfirm';
import CommunityCommentModal from './CommunityCommentModal';
import { useFocusEffect } from '@react-navigation/native';
import useAlert from '../hooks/useAlert';

const CommunityDetail = ({ route, navigation }) => {
  const { postId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [postInfo, setPostInfo] = useState(null);
  const [contentDetail, setContentDetail] = useState();
  const [loading, setLoading] = useState(true);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showConfirm, ConfirmComponent] = useConfirm();
  const [showAlert, AlertComponent] = useAlert();

  const tourType = {
    12: '관광지',
    14: '문화시설',
    15: '축제공연행사',
    25: '여행코스',
    28: '레포츠',
    32: '숙박',
    38: '쇼핑',
    39: '음식점',
  };

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  // 수정하기
  const editPost = () => {
    // 수정하기 화면으로 이동
    navigation.navigate('photoChallengeEdit', {
      postInfo: {
        postId: postId,
        imgUrl: postInfo.imgUrl,
        postContent: postInfo.postContent,
      },
    });
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
    showConfirm({
      title: "포토챌린지 삭제",
      msg: (
      <Text style={{ fontFamily: 'Bold' }}>삭제하시겠습니까?{'\n'}삭제된 후에는
        <Text style={{ color: '#CA7FFE', fontFamily: 'Bold' }}> 지급된 포인트가 사라집니다.</Text>
      </Text>),
      onOk: async function () {
        // 삭제 API 호출
        const response = await fetchDeletePost(postId);

        if(response === 'can\'t delete') {
          showAlert({
            title: "포토챌린지 삭제 오류!",
            msg: "고객님의 포인트가 부족해\n삭제가 불가능 합니다."
          });
        } else if(response === 'successful in deleting') {
          navigation.goBack();
        }
      },
    });

    setModalVisible(false);
  };

  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const openCommentModal = () => {
    setCommentModalVisible(true);
  };

  async function getCommunityDetail() {
    try {
      const apiResponseData = await fetchCommunityDetail(postId);
      console.log(' apiResponseData   :', apiResponseData);
      const contentDetailResponse = await fetchDetailCommon(
        apiResponseData.contentId,
      );
      setPostInfo(apiResponseData);
      setIsBookmark(apiResponseData.isSaveBookmark == 'true');
      setIsLike(apiResponseData.isLike === 'true');
      setContentDetail({
        contentId: contentDetailResponse.contentid,
        title: contentDetailResponse.title,
        type: tourType[contentDetailResponse.contenttypeid],
        image: contentDetailResponse.firstimage || '',
      });
      setLikeCount(apiResponseData.postLikeCount);
    } catch (error) {
      console.error('Failed to fetch community detail:', error);
    } finally {
      setLoading(false);
    }
  }

  const moveToDetail = (id) => {
    navigation.navigate('MainDetailScreen', { contentId: id });
  };

  async function addPostLike() {
    const apiResponseData = await fetchAddPostLike(postId);
    setIsLike(apiResponseData.checkDeleteOrSave == 'Save');

    if(apiResponseData.checkDeleteOrSave == 'Save') {
      setLikeCount(prevCount => prevCount + 1);
    } else {
      setLikeCount(prevCount => prevCount - 1);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getCommunityDetail();
    }, []),
  );

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#CA7FFE" />
      </LoadingContainer>
    );
  }

  return (
    <CommunityDetailContainer>
      <TopBox>
        <UserProfile>
          {postInfo.profileImgUrl.split('/').pop() !== 'default' ? (
            <UserImage source={{ uri: postInfo.profileImgUrl }} />
          ) : (
            <UserImage
              source={require('../assets/profile-default-image.png')}
            />
          )}
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
      <LocationBox
        activeOpacity={0.5}
        onPress={() => moveToDetail(contentDetail.contentId)}
      >
        <LocationImage
          source={
            contentDetail.image !== ''
              ? { uri: contentDetail.image }
              : require('../assets/profile-default-image.png')
          }
        />
        <LocationDetails>
          <LocationName>{contentDetail.title}</LocationName>
          <LocationType>{contentDetail.type}</LocationType>
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
          <ScoreText>{likeCount}</ScoreText>
        </LikeBox>
        <CommentBox onPress={openCommentModal}>
          <Image
            source={
              postInfo.postCommentCount == 0
                ? require('../assets/icon-annotation.png')
                : require('../assets/icon-annotation-on.png')
            }
            style={{ width: 24, height: 24 }}
          />
          <ScoreText>{postInfo.postCommentCount}</ScoreText>
        </CommentBox>
        <CommunityCommentModal
          commentModalVisible={commentModalVisible}
          setCommentModalVisible={setCommentModalVisible}
          postId={postId}
          navigation={navigation}
        />
      </ScoreBox>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={closeModal}>
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
              {postInfo.isMyPost != 'true' && (
                <ModalOption onPress={savePost}>
                  <ModalIcon source={require('../assets/icon-save.png')} />
                  <ModalText>저장하기</ModalText>
                </ModalOption>
              )}
              {postInfo.isMyPost == 'true' && (
                <ModalOption onPress={deletePost}>
                  <ModalIcon source={require('../assets/icon-delete.png')} />
                  <ModalText>삭제하기</ModalText>
                </ModalOption>
              )}
            </ModalContent>
          </ModalContainer>
        </TouchableWithoutFeedback>
      </Modal>

      <ConfirmComponent />
      <AlertComponent />
    </CommunityDetailContainer>
  );
};

export default CommunityDetail;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

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
  font-family: Bold;
  font-size: 16px;
`;

const UserLevel = styled.Text`
  color: #999;
  font-family: Medium;
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
  font-family: Medium;
  line-height: 16.8px;
`;

const LocationBox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: #f1f2f9;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const LocationImage = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 8px;
`;

const LocationDetails = styled.View`
  flex: 1;
  margin-left: 10px;
`;

const LocationName = styled.Text`
  color: #000;
  font-family: Bold;
  font-size: 14px;
`;

const LocationType = styled.Text`
  color: #666;
  font-size: 12px;
  font-family: Regular;
`;

const MoreButton = styled.TouchableOpacity``;

const ScoreBox = styled.View`
  flex-direction: row;
`;

const LikeBox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;

const CommentBox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 0px 8px;
`;

const ScoreText = styled.Text`
  margin-left: 3px;
  color: #666;
  font-size: 14px;
  padding-left: 8px;
  font-family: Bold;
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
  width: 22px;
  height: 22px;
  margin-right: 12px;
`;

const ModalText = styled.Text`
  font-size: 16px;
  color: #4f4f4f;
  line-height: 22px;
  font-family: Bold;
`;
