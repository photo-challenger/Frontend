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
  fetchLogin,
  fetchMyPostList,
  fetchMyCommentList,
} from '../../service/api';
import Animated from 'react-native-reanimated';
import ScrollWrapper from '../../component/common/ScrollWrapper';
import { useSelector } from 'react-redux';

const ChallengeComponent = ({ route, navigation }) => {
  const [loading, setLoading] = useState(route.params?.loading);
  const [challengeLevel, setChallengeLevel] = useState('Lv.1 찰칵 루키');
  const [myPostImageList, setMyPostImageList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [challengeImageList, setChallengeImageList] = useState([]);

  const [myPostPageNo, setMyPostPageNo] = useState(0);
  const [myPostTotPageCnt, setmyPostTotPageCnt] = useState(null);
  const [myCommentPageNo, setMyCommentPageNo] = useState(0);
  const [myCommentTotPageCnt, setmyCommentTotPageCnt] = useState(null);

  const userInfo = useSelector((state) => state.user.userInfo);

  const moveChallengeState = () => {
    navigation.navigate('challengeState');
  };

  const getMyPostList = async (pageNum) => {
    setMyPostPageNo(pageNum);

    let sendData = {
      page: pageNum,
    };

    const resultData = await fetchMyPostList(sendData);

    console.log('pageNum  >> ', pageNum);
    console.log('resultList  >> ', resultData.myPostResponses);

    if (pageNum === 0) {
      setMyPostImageList(resultData.myPostResponses);
      setmyPostTotPageCnt(resultData.totalPages);
    } else {
      setMyPostImageList(resultData.myPostResponses.concat(myPostImageList));
    }
  };

  const getMyCommentList = async (pageNum) => {
    setMyCommentPageNo(pageNum);

    let sendData = {
      page: pageNum,
    };

    const resultData = await fetchMyCommentList(sendData);

    console.log('fetchMyCommentList pageNum  >> ', pageNum);
    console.log(
      'fetchMyCommentList resultList  >> ',
      resultData.myCommentResponses,
    );

    if (pageNum === 0) {
      setCommentList(resultData.myCommentResponses);
      setmyCommentTotPageCnt(resultData.totalPages);
    } else {
      setCommentList(resultData.myCommentResponses.concat(commentList));
    }
  };

  const movePostDetail = (id) => {
    navigation.navigate('communityDetail', { postId: id });
  };

  const movePostList = () => {
    navigation.navigate('community');
  };

  useEffect(() => {
    getMyPostList(0);
    getMyCommentList(0);
  }, [route.params]);

  return (
    <ChallengeTabContainer>
      <Animated.View style={[styles.animatedSheet]}>
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="always"
          nestedScrollEnabled={true}
        >
          <ChallengeLevelContainer>
            <View>
              <ChallengeLevelText>
                {userInfo.profileNickname}님은 지금,
              </ChallengeLevelText>
              <ChallengeLevelSubText>{challengeLevel}</ChallengeLevelSubText>
            </View>
            <CurrentChallengeButton onPress={moveChallengeState}>
              <CurrentChallengeButtonText>
                챌린지 참여 현황 보러가기
              </CurrentChallengeButtonText>
              <CurrentChallengeButtonImage
                source={require('../../assets/white-chevron-right.png')}
              />
            </CurrentChallengeButton>
          </ChallengeLevelContainer>
          <ChallengePostContainer>
            <ChallengePostHeaderText>작성한 게시글</ChallengePostHeaderText>
            {myPostImageList.length !== 0 ? (
              <ScrollWrapper
                loadMoreData={getMyPostList}
                totalPageNo={myPostTotPageCnt}
                currPageNo={myPostPageNo}
                nestedScrollEnabled={true}
              >
                <ChallengeImageContainer>
                  {myPostImageList &&
                    myPostImageList.map((challengeImage) => (
                      <TouchableOpacity
                        key={challengeImage.postId}
                        onPress={() => movePostDetail(challengeImage.postId)}
                      >
                        <ChallengeImage
                          source={{ uri: challengeImage.postImgName }}
                        />
                      </TouchableOpacity>
                    ))}
                </ChallengeImageContainer>
              </ScrollWrapper>
            ) : (
              <NoChallengeListContainer>
                <NoChallengeListText>
                  아직 작성된 글이 없어요.{'\n'}
                  진행 중인 챌린지를 확인하고{'\n'}
                  도전해보세요.
                </NoChallengeListText>
                <NoChallengeButton onPress={() => movePostList()}>
                  <NoChallengeButtonText>
                    다른 글 보러가기
                  </NoChallengeButtonText>
                </NoChallengeButton>
              </NoChallengeListContainer>
            )}
          </ChallengePostContainer>
          <CommentContainer>
            <CommentHeaderText>작성한 댓글</CommentHeaderText>
            {commentList.length !== 0 ? (
              <ScrollWrapper
                loadMoreData={getMyCommentList}
                totalPageNo={myCommentTotPageCnt}
                currPageNo={myCommentPageNo}
                nestedScrollEnabled={true}
              >
                <CommentListContainer>
                  {commentList &&
                    commentList.map((comment) => (
                      <CommentDetailSubContainer
                        key={comment.commentId}
                        onPress={() => movePostDetail(comment.postId)}
                      >
                        <CommentText numberOfLines={2} ellipsizeMode="tail">
                          {comment.commentContent}
                        </CommentText>
                        <CommentDurationText>
                          {comment.commentCalculatedDate.split(' ')[0]} 전
                        </CommentDurationText>
                      </CommentDetailSubContainer>
                    ))}
                </CommentListContainer>
              </ScrollWrapper>
            ) : (
              <NoChallengeListContainer>
                <NoChallengeListText>
                  아직 작성된 댓글이 없어요.{'\n'}
                  진행 중인 챌린지를 둘러보고{'\n'}
                  댓글을 작성해 보세요.
                </NoChallengeListText>
                <NoChallengeButton onPress={() => movePostList()}>
                  <NoChallengeButtonText>
                    다른 글 보러가기
                  </NoChallengeButtonText>
                </NoChallengeButton>
              </NoChallengeListContainer>
            )}
          </CommentContainer>
        </Animated.ScrollView>
      </Animated.View>
    </ChallengeTabContainer>
  );
};

export default ChallengeComponent;

const styles = StyleSheet.create({
  animatedSheet: {
    maxHeight: '100%',
  },
  scrollView: {
    flexGrow: 1, // Changed from flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

const ChallengeTabContainer = styled.View`
  background-color: #f7f7f8;
  height: 100%;
`;

const ChallengeLevelContainer = styled.View`
  background-color: #ca7ffe;
  height: 140px;
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 12px;
`;

const ChallengeLevelText = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  color: #ffffff;
`;

const ChallengeLevelSubText = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  color: #daff7c;
`;

const CurrentChallengeButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CurrentChallengeButtonImage = styled.Image`
  width: 16px;
  height: 16px;
  margin-left: 8px;
`;

const CurrentChallengeButtonText = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  color: #f7f7f8;
`;

const ChallengePostContainer = styled.View`
  padding: 20px 24px;
  max-height: 400px;
`;

const ChallengePostHeaderText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 20px;
`;

const NoChallengeListContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const NoChallengeListText = styled.Text`
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #b3b3b3;
`;

const NoChallengeButton = styled.TouchableOpacity`
  width: 156px;
  height: 41px;
  border: 1px solid #ca7ffe;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;

const NoChallengeButtonText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: #ca7ffe;
  line-height: 39px;
`;

const ChallengeImageContainer = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ChallengeImage = styled.Image`
  width: 30%;
  height: 110.9px;
  margin: 2px;
  border-radius: 8px;
  aspect-ratio: 1;
`;

const CommentContainer = styled.View`
  margin-top: 10px;
`;

const CommentHeaderText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  margin-left: 24px;
  margin-bottom: 8px;
`;

const CommentListContainer = styled.View``;

const CommentDetailSubContainer = styled.View`
  background-color: #ffffff;
  width: 100%;
  height: 80px;
  padding: 16px 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CommentText = styled.Text`
  flex: 1;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

const CommentDurationText = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: #b5b5b5;
  margin-left: 7px;
`;
