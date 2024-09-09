import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import {
  fetchMyBookmarkSightList,
  fetchMyBookmarkPostList,
} from '../../service/api';
import Animated from 'react-native-reanimated';
import ScrollWrapper from '../../component/common/ScrollWrapper';

const ScrapComponent = ({ route, navigation }) => {
  const [contentList, setContentList] = useState([]);
  const [scrapChallengeList, setScrapChallengeList] = useState([]);

  const [myContentPageNo, setMyContentPageNo] = useState(0);
  const [myContentTotPageCnt, setMyContentTotPageCnt] = useState(null);
  const [myPostPageNo, setMyPostPageNo] = useState(0);
  const [myPostTotPageCnt, setMyPostTotPageCnt] = useState(null);

  const getBookmarkContentList = async (pageNum) => {
    setMyContentPageNo(pageNum);

    const resultData = await fetchMyBookmarkSightList({
      page: pageNum,
    });
    console.log('fetchMyBookmarkSightList pageNum  >> ', pageNum);

    if (pageNum === 0) {
      setContentList(resultData.myContentResponseList);
      setMyContentTotPageCnt(resultData.totalPages);
    } else {
      setContentList(resultData.myContentResponseList.concat(contentList));
    }

    console.log('contentList   : ', contentList);
  };

  const getBookmarkChallengeList = async (pageNum) => {
    setMyPostPageNo(pageNum);

    const resultData = await fetchMyBookmarkPostList({
      page: pageNum,
    });
    console.log('fetchMyBookmarkPostList pageNum  >> ', pageNum);

    if (pageNum === 0) {
      setScrapChallengeList(resultData.myPhotoChallengeResponseList);
      setMyPostTotPageCnt(resultData.totalPages);
    } else {
      setScrapChallengeList(
        resultData.myPhotoChallengeResponseList.concat(scrapChallengeList),
      );
    }
  };

  const moveToHome = () => {
    // navigation.navigate('home');
  };

  const movePostDetail = (id) => {
    navigation.navigate('communityDetail', { postId: id });
  };

  const movePostList = () => {
    navigation.navigate('community');
  };

  useEffect(() => {
    getBookmarkContentList(0);
    getBookmarkChallengeList(0);
  }, []);

  return (
    <ChallengeTabContainer>
      <Animated.View style={[styles.animatedSheet]}>
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="always"
          nestedScrollEnabled={true}
        >
          <ScrapContentContainer>
            <ScrapContentHeaderText>내가 저장한 관광지</ScrapContentHeaderText>
            {contentList.length !== 0 ? (
              <ScrollWrapper
                loadMoreData={getBookmarkContentList}
                totalPageNo={myContentTotPageCnt}
                currPageNo={myContentPageNo}
                nestedScrollEnabled={true}
              >
                <ScrapContentListContainer>
                  {contentList &&
                    contentList.map((content, index) => (
                      <ScrapContentSubContainer
                        key={content.contentId}
                        activeOpacity={0.7}
                      >
                        <ScrapContentImageUpCircle />
                        <ScrapContentImageDownCircle />
                        <ScrapContentImage
                          source={{ uri: content.contentImage }}
                        />
                        <ScrapContentDetailContainer>
                          <ScrapContentTitle
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {content.contentTitle}
                          </ScrapContentTitle>
                          <ScrapContentAddress
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {content.contentAddress}
                          </ScrapContentAddress>
                        </ScrapContentDetailContainer>
                        <ScrapContentDash />
                        <ScrapContentChevronImageContainer>
                          <ScrapContentChevronImage
                            source={require('../../assets/big-white-chevron-right.png')}
                          />
                        </ScrapContentChevronImageContainer>
                      </ScrapContentSubContainer>
                    ))}
                </ScrapContentListContainer>
              </ScrollWrapper>
            ) : (
              <NoChallengeListContainer>
                <NoChallengeListText>
                  아직 저장한 관광지가 없어요.{'\n'}
                  마음에 드는 관광지를{'\n'}
                  저장해보세요.
                </NoChallengeListText>
                <NoChallengeButton>
                  <NoChallengeButtonText onPress={moveToHome}>
                    관광지 둘러보기
                  </NoChallengeButtonText>
                </NoChallengeButton>
              </NoChallengeListContainer>
            )}
          </ScrapContentContainer>
          <ScrapChallengeContainer>
            <ScrapChallengeHeaderText>
              내가 저장한 챌린지
            </ScrapChallengeHeaderText>
            {scrapChallengeList.length !== 0 ? (
              <ScrollWrapper
                loadMoreData={getBookmarkChallengeList}
                totalPageNo={myPostTotPageCnt}
                currPageNo={myPostPageNo}
                nestedScrollEnabled={true}
              >
                <ChallengeImageContainer>
                  {scrapChallengeList &&
                    scrapChallengeList.map((challengeImage) => (
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
                  아직 저장한 챌린지가 없어요.{'\n'}
                  마음에 드는 챌린지를{'\n'}
                  저장해보세요.
                </NoChallengeListText>
                <NoChallengeButton onPress={movePostList}>
                  <NoChallengeButtonText>챌린지 구경하기</NoChallengeButtonText>
                </NoChallengeButton>
              </NoChallengeListContainer>
            )}
          </ScrapChallengeContainer>
        </Animated.ScrollView>
      </Animated.View>
    </ChallengeTabContainer>
  );
};

export default ScrapComponent;

const styles = StyleSheet.create({
  animatedSheet: {
    maxHeight: '100%',
  },
  scrollView: {
    flexGrow: 1, // Changed from flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingLeft: 24,
    paddingRight: 24,
  },
});

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
  width: 140px;
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

const ChallengeTabContainer = styled.View`
  background-color: #f7f7f8;
  height: 100%;
`;

const ScrapContentHeaderText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  margin-top: 33px;
  margin-bottom: 20px;
`;

const ScrapContentListContainer = styled.View``;
const ScrapContentContainer = styled.View`
  max-height: 400;
`;

const ScrapContentSubContainer = styled.TouchableOpacity`
  position: relative;
  z-index: 0;
  margin-bottom: 8px;
`;

const ScrapContentImage = styled.Image`
  height: 100px;
  border-radius: 8px;
`;

const ScrapContentImageUpCircle = styled.View`
  background-color: #f7f7f8;
  position: absolute;
  z-index: 1;
  width: 30px;
  height: 20px;
  border-bottom-left-radius: 80px;
  border-bottom-right-radius: 80px;
  top: -10px;
  right: 60px;
`;

const ScrapContentImageDownCircle = styled.View`
  background-color: #f7f7f8;
  position: absolute;
  z-index: 1;
  width: 30px;
  height: 20px;
  border-top-left-radius: 80px;
  border-top-right-radius: 80px;
  bottom: -10px;
  right: 60px;
`;

const ScrapContentDetailContainer = styled.View`
  position: absolute;
  z-index: 1;
  padding: 8px 16px;
  width: 80%;
`;

const ScrapContentTitle = styled.Text`
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2px;
`;

const ScrapContentAddress = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: #ffffff;
`;

const ScrapContentChevronImageContainer = styled.View`
  position: absolute;
  z-index: 1;
  top: 38px;
  right: 24px;
`;

const ScrapContentDash = styled.View`
  position: absolute;
  z-index: 1;
  border-left-width: 2px;
  padding-left: 21px;
  border-style: dashed;
  border-color: #ffffff;
  height: 80%;
  right: 53px;
  top: 10px;
`;

const ScrapContentChevronImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const ScrapChallengeHeaderText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  margin-top: 39px;
  margin-bottom: 20px;
`;
const ScrapChallengeContainer = styled.View``;
