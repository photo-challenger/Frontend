import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have react-native-vector-icons installed.
import { fetchDetailCommon } from '../../service/api';

const { width, height } = Dimensions.get('window');

const PopularCardItem = ({ imageUrl, place, contentId, likeCount }) => {
  const [contentDetail, setContentDetail] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getContentDetail = async () => {
      try {
        setLoading(true);
        const apiResponseData = await fetchDetailCommon(contentId);
        setContentDetail(apiResponseData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch getContentDetail:', error);
      }
    };

    getContentDetail();
  }, []);


  return (
    <CardContainer>
      <CardImage source={imageUrl} />
      <TopLeftOverlay>
        <Image 
          source={require('../../assets/icon-like-on.png')}
          style={{width: 24, height: 24}} />
        <LikeCountText>{likeCount}</LikeCountText>
      </TopLeftOverlay>
      <BottomLeftOverlay>
        {!loading && (
          <>
          <Title>{contentDetail.addr1.split(' ')[0]}</Title>
          <SubTitle numberOfLines={1} ellipsizeMode="tail">{contentDetail.title}</SubTitle>
          </>
        )}
      </BottomLeftOverlay>
    </CardContainer>
  );
};

const CardContainer = styled.View`
  width: ${width * 0.7}px;
  height: ${height * 0.5}px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

const CardImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const TopLeftOverlay = styled.View`
  position: absolute;
  top: 14px;
  right: 16px;
  display: flex;
  flex-direction: row;
`

const LikeCountText = styled.Text`
  color: #fff;
  font-family: Semibold;
  margin-left: 5px;
`

const BottomLeftOverlay = styled.View`
  position: absolute;
  bottom: 14px;
  left: 16px;
  width: 100%;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 14px;
  font-family: Semibold;
  letter-spacing: -0.36px;
  background-color: #CA7FFE;
  padding: 6px 14px;
  border-radius: 50px;
  position: absolute;
  bottom: 35px;
`;

const SubTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: Semibold;
  letter-spacing: -0.36px;
  border-radius: 50px;
`

export default PopularCardItem;
