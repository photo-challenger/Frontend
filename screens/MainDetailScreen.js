import React, { useState, useEffect, useSyncExternalStore } from 'react';
import {
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  ActivityIndicator,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import {
  fetchDetailCommon,
  fetchIsPhotoChallenge,
  fetchLogin,
} from '../service/api';

const MainDetailScreen = ({ route, navigation }) => {
  const { contentId } = route.params;
  const [regionDetailContent, setRegionDetailContent] = useState();
  const [isPhotoChallenge, setIsPhotoChallenge] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRegionDetailContent = async () => {
      try {
        setLoading(true);
        const apiResponseData = await fetchDetailCommon(contentId);
        const isPhotoChallenge = await fetchIsPhotoChallenge(contentId);
        setRegionDetailContent(apiResponseData);
        setIsPhotoChallenge(isPhotoChallenge);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch region detail content:', error);
      }
    };

    getRegionDetailContent();
  }, [contentId]);

  const moveDetail = () => {
    navigation.navigate('MainRegionTabScreen');
  };

  const moveToMap = () => {
    navigation.navigate('map', {
      coords: {
        longitude: regionDetailContent.mapx,
        latitude: regionDetailContent.mapy,
      },
    });
  };

  if (loading) {
    return (
      <MainDetailContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'#CA7FFE'} />
      </MainDetailContainer>
    )
  }

  return (
    <MainDetailContainer>
      <Animated.View
        style={[styles.animatedSheet]}
      >
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="always"
        >
          {regionDetailContent && (
            <>
              <RegionDetailContainer>
                <RegionDetailImage source={regionDetailContent.firstimage === '' ? (require('../assets/tripture-main-no-content.png'))
                  : ({ uri: regionDetailContent.firstimage })} />

                <RegionNameContainer>
                  {regionDetailContent.addr1 === '' ? null : (
                    <View style={{ position: 'absolute', top: -28 }}>
                      <RegionDetailText>
                        {regionDetailContent.addr1.split(' ')[0]}
                      </RegionDetailText>
                    </View>
                  )}
                  <RegionDetailName isImage={regionDetailContent.firstimage !== ''}>
                    {regionDetailContent.title}
                  </RegionDetailName>
                  {regionDetailContent.addr1 === '' ? null : (
                    <RegionDetailAddress isImage={regionDetailContent.firstimage !== ''}>
                      {regionDetailContent.addr1}
                    </RegionDetailAddress>
                  )}
                </RegionNameContainer>
              </RegionDetailContainer>
              <DescriptionContainer>
                <RegionDetailHeaderText>이곳은요</RegionDetailHeaderText>
                <Text style={{ fontFamily: 'Regular', lineHeight: 21 }}>{regionDetailContent.overview}</Text>
              </DescriptionContainer>
            </>
          )}
        </Animated.ScrollView>
        <ButtonContainer>
          <ChallengeButton>
            <ChallengeText>챌린지 참여</ChallengeText>
          </ChallengeButton>
          <MapButton onPress={moveToMap}>
            <MapButtonText>지도보기</MapButtonText>
          </MapButton>
        </ButtonContainer>
      </Animated.View>
    </MainDetailContainer>
  );
};

export default MainDetailScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  animatedSheet: {
    maxHeight: '100%',
  },
  scrollView: {
    flexGrow: 1, // Changed from flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 24,
  },
});

const MainDetailContainer = styled.View`
  background: #f7f7f8;
  height: 100%;
`;

const RegionDetailImage = styled.Image`
  width: 100%;
  height: 452px;
  border-radius: 12px;
`;

const RegionDetailContainer = styled.View`
  position: relative;
`;

const RegionNameContainer = styled.View`
  position: absolute;
  bottom: 14px;
  left: 16px;
`;

const RegionDetailText = styled.Text`
  font-family: Medium;
  font-size: 14px;
  font-style: normal;
  color: #ffffff;
  background-color: #ca7ffe;
  padding: 6px 14px;
  border-radius: 50px;
  line-height: 19px;
`;

const RegionDetailName = styled.Text`
  font-family: Medium;
	font-size: 24px;
	font-style: normal;
	color: ${(props) => props.isImage ? '#ffffff' : '#000000'};
	margin-bottom: 2px;
	margin-top: 9px;
	padding-right: 16px;
`

const RegionDetailAddress = styled.Text`
  font-family: Regular;
	font-size: 14px;
	font-style: normal;
	color: ${(props) => props.isImage ? '#ffffff' : '#000000'};
	padding-right: 16px;
`

const DescriptionContainer = styled.View`
  padding: 12px 0 12px 0;
`;

const RegionDetailHeaderText = styled.Text`
  font-family: Semibold;
  font-size: 18px;
  font-style: normal;
  margin-bottom: 12px;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const ChallengeButton = styled.TouchableOpacity`
  height: 76px;
  width: 50%;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

const ChallengeText = styled.Text`
  font-family: Bold;
  font-size: 18px;
  font-style: normal;
  color: #ca7ffe;
`;

const MapButton = styled.TouchableOpacity`
  height: 76px;
  width: 50%;
  background-color: #4f4f4f;
  justify-content: center;
  align-items: center;
`;

const MapButtonText = styled.Text`
  font-family: Bold;
  font-size: 18px;
  font-style: normal;
  color: #ffffff;
`;
