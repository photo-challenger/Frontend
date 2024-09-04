import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styled, { StyleSheetManager } from 'styled-components';

const ChallengeStateScreen = ({ route, navigation }) => {
  const [profileInfo, setProfileInfo] = useState({
    "profileNickname": "짱구",
    "profileImgName": "https://tripture.s3.ap-northeast-2.amazonaws.com/file/be_profile.jpg",
    "loginEmail": "user1@example.com"
  });
  const [profileLevel, setProfileLevel] = useState("레벨1 찰칵 루키");
  const challengeEngList = ['inc', 'seo', 'gang', 'chung', 'jeon', 'gyeong'];
  const challengeList = ['인천 경기', '서울', '강원', '충청', '호남', '영남'];
  const [challengeStateList, setChallengeStateList] = useState({
    "inc": [0, 0],
    "seo": [0, 0],
    "jeon": [0, 0],
    "gang": [0, 0],
    "chung": [0, 0],
    "gyeong": [0, 0],
    "je": [0, 0]
  });

  return (
    <ListContainer>
      <ChallengeStateHeaderText>{profileInfo.profileNickname}님은 지금,{'\n'}{profileLevel.replace('레벨', 'Lv.')}</ChallengeStateHeaderText>
      <ChallengeStateSubHeaderText>총 2개 완료! 다음레벨까지 3개의 챌린지가 남았아요</ChallengeStateSubHeaderText>

      <ChallengeContainer>
        {challengeEngList.map((challenge, index) => (
          <ChallengeSubContainer>
            <ChallengeNameText>{challengeList[index]}</ChallengeNameText>
            <ChallengeStateNum><Text style={{ color: "#CA7FFE" }}>{challengeStateList[challenge][0]}</Text> / {challengeStateList[challenge][0]}</ChallengeStateNum>
          </ChallengeSubContainer>
        ))}
        <JeJuContainer>
          <ChallengeNameText>제주</ChallengeNameText>
          <ChallengeStateNum><Text style={{ color: "#CA7FFE" }}>{challengeStateList['je'][0]}</Text> / {challengeStateList['je'][0]}</ChallengeStateNum>
        </JeJuContainer>
      </ChallengeContainer>
      <InfoText>전체 챌린지를 완료하시면 5만 포인트를 드려요!</InfoText>
    </ListContainer>
  );
};

export default ChallengeStateScreen;

const ListContainer = styled.View`
  display: flex;
  background: #F7F7F8;
  height: 100%;
  padding: 20px 14px 20px 20px;
`;

const ChallengeStateHeaderText = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
`

const ChallengeStateSubHeaderText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 24px;
`

const ChallengeContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const ChallengeSubContainer = styled.View`
  background-color: #FFFFFF;
  height: 151px;
  width: 31.6%;
  border-radius: 10px;
  margin-right: 6px;
  margin-bottom: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ChallengeNameText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 10px;
`

const ChallengeIcon = styled.Image`
  width: 48px;
  height: 48px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const JeJuChallengeIcon = styled.Image`
  width: 35px;
  height: 35px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const ChallengeStateNum = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`

const JeJuContainer = styled.View`
  width: 98.5%;
  height: 100px;
  background-color: #FFFFFF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InfoText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  color: #B5B5B5;
  text-align: center;
  margin-top: 20px;
`
