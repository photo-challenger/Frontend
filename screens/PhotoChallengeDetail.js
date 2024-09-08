import React, { useState, useRef, useEffect } from 'react';
import { Text, Image, Dimensions, Animated } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import styled from 'styled-components/native';
import { fetchChallengeDetail } from '../service/api';

const { width } = Dimensions.get('window');

const PhotoChallengeDetail = ({ route, navigation }) => {
  const { postId, challengeId } = route.params;
  const [challengeDetail, setChallengeDetail] = useState({});

  useEffect(() => {
    getChallengeDetail();
  }, []);

  async function getChallengeDetail() {
    const apiResponseData = await fetchChallengeDetail(challengeId);
    console.log(' apiResponseData   :', apiResponseData);
    setChallengeDetail(apiResponseData);
    console.log(challengeDetail);
  }

  function moveWrite() {
    navigation.navigate('photoChallengeWrite', {
      challengeInfo: challengeDetail,
    });
  }

  return (
    <Container>
      <TopText>
        {challengeDetail?.challengeName}에서의 {'\n'}특별한 순간을 공유해주세요
      </TopText>
      <ImageWrapper key={challengeDetail?.challengeId}>
        <StyledImage source={{ uri: challengeDetail?.challengeImgUrl }} />
      </ImageWrapper>
      <DescriptionContainer>
        <DescriptionTitle>이곳은요</DescriptionTitle>
        <Description>{challengeDetail?.challengeContent}</Description>
      </DescriptionContainer>
      <GuideContainer>
        <GuideTop>지금 참여하면</GuideTop>
        <GuideBottom>{challengeDetail?.challengePoint} Point</GuideBottom>
      </GuideContainer>
      <ActionButton onPress={() => moveWrite()}>
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
