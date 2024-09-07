import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have react-native-vector-icons installed.

const NearestCardItem = ({
  imageUrl,
  region,
  place,
  distance,
  participants,
}) => {
  return (
    <CardContainer>
      <CardImage source={imageUrl} />
      <TopLeftOverlay>{distance}</TopLeftOverlay>
      <BottomLeftOverlay>
        <LocationTag>{region}</LocationTag>
        <Title>{place}</Title>
      </BottomLeftOverlay>
      <BottomRightOverlay>
        <MaterialIcons name="person" size={14} color="#FFFFFF" />
        <ParticipantsText>{participants}</ParticipantsText>
      </BottomRightOverlay>
    </CardContainer>
  );
};

const CardContainer = styled.View`
  width: 200px;
  height: 246px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

const CardImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const TopLeftOverlay = styled.Text`
  position: absolute;
  top: 8px;
  left: 8px;
  color: #fff;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.28px;
`;

const BottomLeftOverlay = styled.View`
  position: absolute;
  bottom: 15px;
  left: 8px;
`;

const LocationTag = styled.Text`
  background-color: #ca7ffe;
  color: #ffffff;
  border-radius: 50px;
  margin-bottom: 4px;
  display: inline-flex;
  padding: 6px 14px;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.154px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.96px;
`;

const BottomRightOverlay = styled.View`
  position: absolute;
  bottom: 15px;
  right: 8px;
  flex-direction: row;
  align-items: center;
  background-color: #d9d9d9;
  padding: 2px 6px;
  border-radius: 8px;
`;

const ParticipantsText = styled.Text`
  color: #ffffff;
  margin-left: 4px;
  font-size: 12px;
`;

export default NearestCardItem;
