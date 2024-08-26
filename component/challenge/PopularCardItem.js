import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have react-native-vector-icons installed.

const PopularCardItem = ({ imageUrl, place }) => {
  return (
    <CardContainer>
      <CardImage source={imageUrl} />
      <BottomLeftOverlay>
        <Title>{place}</Title>
      </BottomLeftOverlay>
    </CardContainer>
  );
};

const CardContainer = styled.View`
  width: 120px;
  height: 168px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

const CardImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const BottomLeftOverlay = styled.View`
  position: absolute;
  bottom: 15px;
  left: 8px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.36px;
`;

export default PopularCardItem;
