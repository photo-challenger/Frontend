import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import styled from 'styled-components/native';
import GestureRecognizer from 'react-native-swipe-gestures';
import NearestCardItem from '../component/challenge/NearestCardItem';
import PopularCardItem from '../component/challenge/PopularCardItem';
import {
  fetchLogin,
  fetchSurroundingChallenge,
  fetchPopularChallenge,
  fetchUserTotalPoint,
} from '../service/api';

const { width } = Dimensions.get('window');

const PhotoChallengeScreen = ({ route, navigation }) => {
  const [surrondChallengList, setSurrondChallengList] = useState([]);
  const [popularChallengList, setPopularChallengList] = useState([]);
  const [myPoint, setMyPoint] = useState(0);

  const [surroundCurrIndex, setSurroundCurrIndex] = useState(0);
  const [popularCurrIndex, setPopularCurrIndex] = useState(0);

  // Separate translateX values for each section
  const translateXSurround = useRef(new Animated.Value(0)).current;
  const translateXPopular = useRef(new Animated.Value(0)).current;

  // Animation functions for each section
  const animateToSurroundIndex = (index) => {
    Animated.spring(translateXSurround, {
      toValue: -index * (width * 0.5 + 10), // Adjust to desired width
      useNativeDriver: true,
    }).start();
  };

  const animateToPopularIndex = (index) => {
    Animated.spring(translateXPopular, {
      toValue: -index * (width * 0.5 + 10), // Adjust to desired width
      useNativeDriver: true,
    }).start();
  };

  // Swipe handlers for surrounding challenges
  const onSurroundSwipeLeft = () => {
    if (surroundCurrIndex < surrondChallengList.length - 1) {
      const newIndex = surroundCurrIndex + 1;
      setSurroundCurrIndex(newIndex);
      animateToSurroundIndex(newIndex);
    }
  };

  const onSurroundSwipeRight = () => {
    if (surroundCurrIndex > 0) {
      const newIndex = surroundCurrIndex - 1;
      setSurroundCurrIndex(newIndex);
      animateToSurroundIndex(newIndex);
    }
  };

  // Swipe handlers for popular challenges
  const onPopularSwipeLeft = () => {
    if (popularCurrIndex < popularChallengList.length - 1) {
      const newIndex = popularCurrIndex + 1;
      setPopularCurrIndex(newIndex);
      animateToPopularIndex(newIndex);
    }
  };

  const onPopularSwipeRight = () => {
    if (popularCurrIndex > 0) {
      const newIndex = popularCurrIndex - 1;
      setPopularCurrIndex(newIndex);
      animateToPopularIndex(newIndex);
    }
  };

  // Fetching data functions
  const getSurroundingChallenge = async () => {
    const surronds = await fetchSurroundingChallenge();
    setSurrondChallengList(surronds);
    getPopularChallenge();
  };

  const getPopularChallenge = async () => {
    const populars = await fetchPopularChallenge();
    setPopularChallengList(populars);
  };

  const getMyTotalPoint = async () => {
    const res = await fetchUserTotalPoint();
    setMyPoint(res);

    getSurroundingChallenge();
  };

  const moveChallegeDetail = (id) => {
    navigation.navigate('photoChallengeDetail', { challengeId: id });
  };

  const movePostDetail = (id) => {
    navigation.navigate('communityDetail', { postId: id });
  };

  useEffect(() => {
    // fetchLogin();
    getMyTotalPoint();
  }, []);

  return (
    <Container>
      {/* Points Section */}
      <PointsContainer>
        <PointsDetails>
          <PointsLabel>챌린지로 내가 모은 포인트</PointsLabel>
          <PointsValue>
            {myPoint} <PointsText>포인트</PointsText>
          </PointsValue>
        </PointsDetails>
        <PointsLink>전체 내역 보기</PointsLink>
      </PointsContainer>

      {/* 주변 포토챌린지 */}
      <SectionTitle>주변 포토챌린지</SectionTitle>
      <GestureContainer
        onSwipeLeft={onSurroundSwipeLeft}
        onSwipeRight={onSurroundSwipeRight}
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}
      >
        <AnimatedCarouselContainer
          style={{ transform: [{ translateX: translateXSurround }] }}
        >
          {surrondChallengList.map((item, index) => (
            <NearestCardWrapper
              key={item.challengeId}
              active={index === surroundCurrIndex}
            >
              <TouchableOpacity
                onPress={() => moveChallegeDetail(item.challengeId)}
              >
                <NearestCardItem
                  imageUrl={{ uri: item.challengeImgName }}
                  region={item.challengeRegion}
                  place={item.challengePoint}
                  distance={item.distance_meter + 'm'}
                  participants={item.participants}
                />
              </TouchableOpacity>
            </NearestCardWrapper>
          ))}
        </AnimatedCarouselContainer>
      </GestureContainer>

      {/* 인기 포토챌린지 */}
      <SectionTitle>인기 포토챌린지</SectionTitle>
      <GestureContainer
        onSwipeLeft={onPopularSwipeLeft}
        onSwipeRight={onPopularSwipeRight}
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}
      >
        <AnimatedCarouselContainer
          style={{ transform: [{ translateX: translateXPopular }] }}
        >
          {popularChallengList.map((item, index) => (
            <PopularCardWrapper
              key={item.postId}
              active={index === popularCurrIndex}
            >
              <TouchableOpacity onPress={() => movePostDetail(item.postId)}>
                <PopularCardItem
                  imageUrl={{ uri: item.postImgName }}
                  place={item.challengePoint}
                />
              </TouchableOpacity>
            </PopularCardWrapper>
          ))}
        </AnimatedCarouselContainer>
      </GestureContainer>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f8f8f8;
`;

const PointsContainer = styled.View`
  background-color: #ca7ffe;
  padding: 24px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
`;

const PointsDetails = styled.View`
  flex-direction: column;
`;

const PointsLabel = styled.Text`
  color: #000;
  font-size: 14px;
`;

const PointsValue = styled.Text`
  color: #daff7c;
  font-size: 28px;
  font-weight: bold;
`;

const PointsText = styled.Text`
  font-size: 16px;
`;

const PointsLink = styled.Text`
  color: #ffffff;
  font-size: 12px;
`;

const SectionTitle = styled.Text`
  padding: 8px 24px;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.36px;
`;

const GestureContainer = styled(GestureRecognizer)`
  flex: 1;
  justify-content: center;
  height: 320px;
  padding-left: 24px;
  margin: 0;
`;

const AnimatedCarouselContainer = styled(Animated.View)`
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;

const NearestCardWrapper = styled.View`
  width: ${width * 0.5}px;
  margin-horizontal: 10px;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  transform: ${(props) => (props.active ? 'scale(1)' : 'scale(0.9)')};
`;

const PopularCardWrapper = styled.View`
  width: ${width * 0.3}px;
  margin-horizontal: 10px;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  transform: ${(props) => (props.active ? 'scale(1)' : 'scale(0.9)')};
`;

export default PhotoChallengeScreen;
