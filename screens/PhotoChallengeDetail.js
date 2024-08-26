import React, { useState, useRef, useEffect } from 'react';
import { Text, Image, Dimensions, Animated } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import styled from 'styled-components/native';
import { fetchChallengeDetail } from '../service/api';

const { width } = Dimensions.get('window');

const images = [
  {
    uri: 'https://tripture.s3.ap-northeast-2.amazonaws.com/file/be_profile.jpg',
    description:
      '경주 대릉원은 경주시 노동동과 황남동에 있는 신라 시대의 고분군을 말하며 노동동 고분군, 노서리 고분군, 황남동 고분군',
  },
  {
    uri: 'https://tripture.s3.ap-northeast-2.amazonaws.com/file/be_challenge.jpg',
    description: 'Image description 2',
  },
  {
    uri: 'https://tripture.s3.ap-northeast-2.amazonaws.com/file/be_profile.jpg',
    description: 'Image description 3',
  },
];

const PhotoChallengeDetail = ({ route, navigation }) => {
  const { postId } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [challengeDetail, setChallengeDetail] = useState({});
  const translateX = useRef(new Animated.Value(0)).current;

  const animateToIndex = (index) => {
    console.log('animateToIndex : ', index);
    console.log('currentIndex : ', currentIndex);
    Animated.spring(translateX, {
      toValue: -index * (width * 0.7 + 20),
      useNativeDriver: true,
    }).start();
  };

  const onSwipeLeft = () => {
    if (currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      console.log('onSwipeLeft newIndex   : ', newIndex);
      setCurrentIndex(newIndex);
      animateToIndex(newIndex);
    }
  };

  const onSwipeRight = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      animateToIndex(newIndex);
    }
  };

  useEffect(() => {
    getChallengeDetail();
  }, [challengeDetail]);

  async function getChallengeDetail() {
    const apiResponseData = await fetchChallengeDetail(postId);
    console.log(' apiResponseData   :', apiResponseData);
    setChallengeDetail(apiResponseData);
  }

  return (
    <Container>
      <TopText>부산, 해운대에서의 {'\n'}특별한 순간을 공유해주세요</TopText>
      <GestureContainer
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
      >
        <AnimatedCarouselContainer style={{ transform: [{ translateX }] }}>
          <ImageWrapper
            key={challengeDetail.challengeId}
            active={index === currentIndex}
          >
            <StyledImage source={{ uri: challengeDetail.challengeImgUrl }} />
          </ImageWrapper>
        </AnimatedCarouselContainer>
      </GestureContainer>
      <DescriptionContainer>
        <DescriptionTitle>이곳은요</DescriptionTitle>
        <Description>{images[currentIndex].description}</Description>
      </DescriptionContainer>
      <GuideContainer>
        <GuideTop>지금 참여하면</GuideTop>
        <GuideBottom>200 Point</GuideBottom>
      </GuideContainer>
      <ActionButton>
        <ButtonText>포토챌린지 참여하기</ButtonText>
      </ActionButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const TopText = styled.Text`
  margin-vertical: 12px;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.96px;
  padding-left: 24px;
`;

const GestureContainer = styled(GestureRecognizer)`
  flex: 1;
  justify-content: center;
  height: 320px; /* Set specific height or use flex properties */
  padding: 0;
  margin: 0;
`;

const AnimatedCarouselContainer = styled(Animated.View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
`;

const ImageWrapper = styled.View`
  width: ${width * 0.6}px;
  margin-horizontal: 12px;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  transform: ${(props) => (props.active ? 'scale(1)' : 'scale(0.9)')};
`;

const StyledImage = styled.Image`
  width: 272px;
  height: 300px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const DescriptionContainer = styled.View`
  display: flex;
  width: 100%;
  height: 122px;
  padding: 12px 24px;
  flex-direction: column;
  align-items: flex-start;
`;

const DescriptionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.36px;
  margin-bottom: 12px;
`;

const Description = styled.Text`
  height: 63px;
  font-size: 14px;
  color: #333;
  text-align: left;
`;

const GuideContainer = styled.View`
  width: 100%;
  height: 80px;
  padding: 14px 24px;
  flex-direction: column;
`;

const GuideTop = styled.Text`
  font-size: 16px;
  font-weight: 400;
`;

const GuideBottom = styled.Text`
  font-size: 22px;
  font-weight: 700;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #ca7ffe;
  padding-vertical: 15px;
  margin-top: 20px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.36px;
`;

export default PhotoChallengeDetail;
