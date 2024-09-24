import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import styled, { StyleSheetManager } from 'styled-components';
import { fetchMyChallengeState } from '../../service/api';
import { useSelector } from 'react-redux';
import Animated from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const itemWidth = width / 3 - 17.5;

const ChallengeStateScreen = ({ route, navigation }) => {
  const { profileLevel } = route.params;
  const [profileInfo, setProfileInfo] = useState({});
  const userInfo = useSelector((state) => state.user.userInfo);
  const [profileTotalChallenge, setProfileTotalChallenge] = useState();
  const [levelNeedCount, setLevelNeedCount] = useState(0);
  const challengeEngList = ['inc', 'seo', 'gang', 'chung', 'jeon', 'gyeong'];
  const challengeList = ['인천 경기', '서울', '강원', '충청', '호남', '영남'];
  const challengeCoords = {
    inc: { longitude: '126.70525', latitude: '37.45600' },
    seo: { longitude: '126.97865', latitude: ' 37.56682' },
    jeon: { longitude: '127.25513', latitude: '37.42939' },
    gang: { longitude: '127.88868', latitude: '37.69716' },
    chung: { longitude: '127.38483', latitude: '36.35053' },
    gyeong: { longitude: '128.95328', latitude: '35.93588' },
    je: { longitude: '126.58150', latitude: '33.38231' },
  };
  const [challengeStateList, setChallengeStateList] = useState({
    inc: [0, 0],
    seo: [0, 0],
    jeon: [0, 0],
    gang: [0, 0],
    chung: [0, 0],
    gyeong: [0, 0],
    je: [0, 0],
  });

  const checkLevel = () => {
    if(profileLevel === '레벨1 찰칵 루키') {
      setLevelNeedCount(20 - profileTotalChallenge);
    } else if(profileLevel === '레벨2 챌린지 스타') {
      setLevelNeedCount(30 - profileTotalChallenge);
    }
  }

  const getMyChallengeState = async () => {
    const resultData = await fetchMyChallengeState();
    console.log(resultData);
    setProfileTotalChallenge(resultData.inc[0] + resultData.seo[0] + resultData.jeon[0] + resultData.gang[0]
      + resultData.chung[0] + resultData.gyeong[0] + resultData.je[0]);
  };

  const moveToMap = (loc) => {
    navigation.navigate('map', {
      coords: challengeCoords[loc],
    });
  };

  useEffect(() => {
    setProfileInfo(userInfo);
    getMyChallengeState();
  }, []);

  useEffect(() => {
    checkLevel();
  }, [profileTotalChallenge])

  const images = {
    '인천 경기': require('../../assets/inc.png'),
    '서울': require('../../assets/seo.png'),
    '강원': require('../../assets/gang.png'),
    '충청': require('../../assets/chung.png'),
    '호남': require('../../assets/jeon.png'),
    '영남': require('../../assets/gyeong.png'),
  };

  return (
    <ListContainer>
      <Animated.View style={[styles.animatedSheet]}>
          <Animated.ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="always"
          >
      <ChallengeStateHeaderText>
        {profileInfo.profileNickname}님은 지금,{'\n'}
        {profileLevel?.replace('레벨', 'Lv.')}
      </ChallengeStateHeaderText>
      <ChallengeStateSubHeaderText>
        총 {profileTotalChallenge}개 완료! {profileLevel === '레벨3 스냅 마스터' ? (<Text>Tripture 레벨 모두 달성!</Text>)
        : (<Text>다음 레벨까지 {levelNeedCount}개의 챌린지가 남았아요.</Text>)}
      </ChallengeStateSubHeaderText>

      <ChallengeContainer>
        {challengeEngList.map((challenge, index) => (
          <ChallengeSubContainer onPress={() => moveToMap(challenge)}>
            <ChallengeNameText>{challengeList[index]}</ChallengeNameText>
            <ChallengeIcon source={images[challengeList[index]]} />
            <ChallengeStateNum>
              {challengeStateList[challenge][0]}
            </ChallengeStateNum>
          </ChallengeSubContainer>
        ))}
        <JeJuContainer onPress={() => moveToMap('je')}>
          <ChallengeNameText>제주</ChallengeNameText>
          <JeJuChallengeIcon source={require('../../assets/je.png')} />
          <ChallengeStateNum count={challengeStateList['je'][0]}>
            {challengeStateList['je'][0]}
          </ChallengeStateNum>
        </JeJuContainer>
      </ChallengeContainer>
      <InfoText>히든 챌린지를 모두 완료하시면 1만 포인트를 드려요!</InfoText>
      </Animated.ScrollView>
        </Animated.View>
    </ListContainer>
  );
};

export default ChallengeStateScreen;

const styles = StyleSheet.create({
  animatedSheet: {
    flex: 1,
  },
  scrollView: {
    flex: 1, // Changed from flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

const ListContainer = styled.View`
  display: flex;
  background: #f7f7f8;
  height: 100%;
  padding: 20px 14px 20px 20px;
`;

const ChallengeStateHeaderText = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-family: Semibold;
`;

const ChallengeStateSubHeaderText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-family: Regular;
  margin-bottom: 24px;
`;

const ChallengeContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ChallengeSubContainer = styled.TouchableOpacity`
  background-color: #ffffff;
  height: 151px;
  width: ${itemWidth}px;
  border-radius: 10px;
  margin-right: 6px;
  margin-bottom: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChallengeNameText = styled.Text`
  font-size: 15px;
  font-family: Bold;
  margin-bottom: 10px;
`;

const ChallengeIcon = styled.Image`
  width: 35px;
  height: 35px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const JeJuChallengeIcon = styled.Image`
  width: 28px;
  height: 28px;
  margin-bottom: 5px;
`;

const ChallengeStateNum = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-family: Bold;
  color: ${(props) => (props.count > 0 ? '#CA7FFE' : '#B5B5B5')};
`;

const JeJuContainer = styled.TouchableOpacity`
  width: 98.5%;
  height: 100px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-family: Semibold;
  color: #b5b5b5;
  text-align: center;
  margin-top: 20px;
`;
