import React, { useState, useRef, useEffect } from 'react';
import { Text, Image, Dimensions, Animated, View, ScrollView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import styled from 'styled-components/native';
import { fetchChallengeDetail } from '../service/api';

const { width } = Dimensions.get('window');

const PhotoChallengeDetail = ({ route, navigation }) => {
  const { challengeInfo } = route.params;
  const [challengeDetail, setChallengeDetail] = useState({});

  useEffect(() => {
    console.log(challengeInfo);
    getChallengeDetail();
  }, []);

  async function getChallengeDetail() {
    const apiResponseData = await fetchChallengeDetail(challengeInfo.contentId);
    console.log(' apiResponseData   :', apiResponseData);
    setChallengeDetail(apiResponseData);
    console.log(challengeDetail);
  }

  function moveWrite() {
    navigation.navigate('photoChallengeWrite', {
      challengeInfo: challengeInfo,
    });
  }

  return (
    <Container>
      <TopText>
        {challengeDetail?.challengeName}에서의{'\n'}특별한 순간을 공유해주세요
      </TopText>
      <ImageWrapper key={challengeDetail?.challengeId}>
        <StyledImage source={{ uri: challengeDetail?.challengeImgUrl }} />
      </ImageWrapper>

      <ScrollView>
        <DescriptionContainer>
          <DescriptionTitle>이곳은요</DescriptionTitle>
          <Description>{challengeDetail?.challengeContent}</Description>
        </DescriptionContainer>
      </ScrollView>

      <View style={{ elevation: 10, height: 1, backgroundColor: '#fff'}}></View>
      <GuideContainer>
        <GuideTop>지금 히든 챌린지에 참여하면,</GuideTop>
        <GuideBottom>{challengeDetail?.challengePoint} 포인트</GuideBottom>
      </GuideContainer>
      <ActionButton onPress={() => moveWrite()}>
        <ButtonText>포토챌린지 참여하기</ButtonText>
      </ActionButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f7f7f8;
`;

const TopText = styled.Text`
  margin-vertical: 12px;
  font-size: 24px;
  font-family: Semibold;
  letter-spacing: -0.96px;
  padding-left: 24px;
  line-height: 31.2px;
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
  width: 100%;
  align-items: center;
`;

const StyledImage = styled.Image`
  width: ${width * 0.8}px;
  height: ${width * 0.92}px;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-top: 16px;
`;

const DescriptionContainer = styled.View`
  padding: 12px 24px;
  background-color: #fff;
`;

const DescriptionTitle = styled.Text`
  font-size: 18px;
  font-family: Semibold;
  letter-spacing: -0.36px;
  margin-bottom: 12px;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #333;
  text-align: left;
  font-family: Regular;
  line-height: 21px;
  letter-spacing: -0.28px;
`;

const GuideContainer = styled.View`
  width: 100%;
  height: 80px;
  padding: 14px 24px;
  flex-direction: column;
  background: #fff;
`;

const GuideTop = styled.Text`
  font-size: 16px;
  font-family: Regular;
`;

const GuideBottom = styled.Text`
  font-size: 22px;
  font-family: Bold;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #ca7ffe;
  align-items: center;
  width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-family: Bold;
  letter-spacing: -0.36px;
`;

export default PhotoChallengeDetail;
