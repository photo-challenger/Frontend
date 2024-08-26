import React, { useEffect, useState } from 'react';
import { ScrollView, View, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import NearestCardItem from '../component/challenge/NearestCardItem';
import PopularCardItem from '../component/challenge/PopularCardItem';
import {
  fetchSurroundingChallenge,
  fetchLogin,
  fetchPopularChallenge,
} from '../service/api';

const { width } = Dimensions.get('window');

const PhotoChallengeScreen = ({ route, navigation }) => {
  const [surrondChallengList, setSurrondChallengList] = useState([]);
  const [popularChallengList, setPopularChallengList] = useState([]);

  const getSurroundingChallenge = async () => {
    const surronds = await fetchSurroundingChallenge();
    console.log('surronds : ', surronds);
    setSurrondChallengList(surronds);
    getPopularChallenge();
  };

  const getPopularChallenge = async () => {
    const populars = await fetchPopularChallenge();
    console.log('populars : ', populars);
    setPopularChallengList(populars);
  };

  const moveDetail = (id) => {
    navigation.navigate('PhotoChallengeDetail', { postId: id });
  };

  useEffect(() => {
    getSurroundingChallenge();
  }, []);

  return (
    <Container>
      {/* Points Section */}
      <PointsContainer>
        <PointsDetails>
          <PointsLabel>챌린지로 내가 모은 포인트</PointsLabel>
          <PointsValue>
            1,500 <PointsText>포인트</PointsText>
          </PointsValue>
        </PointsDetails>
        <PointsLink>전체 내역 보기</PointsLink>
      </PointsContainer>

      {/* 주변 포토챌린지 */}
      <SectionTitle>주변 포토챌린지</SectionTitle>
      <SwiperContainer>
        <Swiper
          showsPagination={false}
          loop={true}
          horizontal={true}
          pagingEnabled={false}
        >
          {surrondChallengList.map((item, index) => (
            <Slide>
              <TouchableOpacity
                key={item.challengeId}
                onPress={() => moveDetail(item.challengeId)}
              >
                <NearestCardItem
                  imageUrl={{ uri: item.challengeImgName }}
                  region={item.challengeRegion}
                  place={item.challengePoint}
                  distance={item.distance_meter + 'm'}
                  participants={item.participants}
                />
              </TouchableOpacity>
            </Slide>
          ))}
        </Swiper>
      </SwiperContainer>

      {/* 인기 포토챌린지 */}
      <SectionTitle>인기 포토챌린지</SectionTitle>
      <SwiperContainer>
        <Swiper showsPagination={false} loop={false} horizontal={true}>
          {popularChallengList.map((item, index) => (
            <Slide>
              <PopularCardItem
                imageUrl={{ uri: item.postImgName }}
                place={item.challengePoint}
              />
            </Slide>
          ))}
        </Swiper>
      </SwiperContainer>
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
  font-weight: 600;
  letter-spacing: -0.36px;
`;

const SwiperContainer = styled.View`
  height: 246px;
  margin-top: 10px;
`;

const Slide = styled.View`
  flex: 1;
  position: relative;
  width: ${width * 0.5}px;
  margin-right: 15px;
  padding: 0px !important;
`;

export default PhotoChallengeScreen;
