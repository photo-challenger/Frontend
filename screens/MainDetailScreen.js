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
import * as Location from 'expo-location';
import {
  fetchDetailCommon,
  fetchContentBookmark,
  fetchCheckContentBookmark,
  fetchCheckChallenge,
  fetchCheckWrittenPost,
} from '../service/api';
import useAlert from '../hooks/useAlert';
import { getDistance } from '../component/common/GetDistance';

const MainDetailScreen = ({ route, navigation }) => {
  const { contentId } = route.params;
  const [regionDetailContent, setRegionDetailContent] = useState();
  const [clickBookmark, setClickBookmark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isWrittenPost, setIsWrittenPost] = useState();
  const [showAlert, AlertComponent] = useAlert();

  useEffect(() => {
    const getRegionDetailContent = async () => {
      try {
        setLoading(true);
        const apiResponseData = await fetchDetailCommon(contentId);
        const checkResponse = await fetchCheckContentBookmark(contentId);
        const checkWrittenPost = await fetchCheckWrittenPost(contentId);
        setRegionDetailContent(apiResponseData);
        setClickBookmark(checkResponse);
        setIsWrittenPost(checkWrittenPost);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch region detail content:', error);
      }
    };

    getRegionDetailContent();
  }, [contentId]);

  const handleBookmarkClick = async () => {
    const response = await fetchContentBookmark(contentId);

    if (response === 'Bookmark Save Successful') {
      setClickBookmark(true);
    } else {
      setClickBookmark(false);
    }
  };

  const moveToMap = () => {
    navigation.navigate('map', {
      coords: {
        longitude: regionDetailContent.mapx,
        latitude: regionDetailContent.mapy,
      },
    });
  };

  const moveToChallengeWrite = async (obj) => {
    const response = await fetchCheckChallenge(contentId);
    if (response) {
      showAlert({
        title: '히든 포토챌린지 발견 ✌️',
        msg: '히든 포토챌린지에 참여하면\n더 많은 포인트를 얻을 수 있어요!',
        onOk: () => {
          navigation.navigate('photoChallengeWrite', {
            challengeInfo: {
              challengeName: obj.title,
              contentId: obj.contentid,
              areaCode: obj.areacode,
              addr: obj.addr1 || '',
            },
          });
        },
      });
      return;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      showAlert({
        title: '포토챌린지 오류!',
        msg: '위치 권한이 허용되지 않았습니다.',
      });
      return;
    }

    let _location = await Location.getCurrentPositionAsync();
    if (
      getDistance(
        _location.coords.latitude,
        _location.coords.longitude,
        obj.mapy,
        obj.mapx,
      ) > 1000
    ) {
      showAlert({
        title: '포토챌린지 작성 불가',
        msg: '관광지로 조금 더 가까이 이동해 주세요!',
      });
      return;
    }

    navigation.navigate('photoChallengeWrite', {
      challengeInfo: {
        challengeName: obj.title,
        contentId: obj.contentid,
        areaCode: obj.areacode,
        addr: obj.addr1 || '',
      },
    });
  };

  if (loading) {
    return (
      <MainDetailContainer
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <ActivityIndicator size={'large'} color={'#CA7FFE'} />
      </MainDetailContainer>
    );
  }

  return (
    <MainDetailContainer>
      <Animated.View style={[styles.animatedSheet]}>
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="always"
        >
          {regionDetailContent && (
            <>
              <RegionDetailContainer>
                <RegionDetailImage
                  source={
                    regionDetailContent.firstimage === ''
                      ? require('../assets/tripture-main-no-content.png')
                      : { uri: regionDetailContent.firstimage }
                  }
                />

                <BookmarkWrapper onPress={handleBookmarkClick}>
                  {clickBookmark ? (
                    <BookmarkImage
                      source={require('../assets/select-content-bookmark.png')}
                    />
                  ) : (
                    <BookmarkImage
                      source={require('../assets/content-bookmark.png')}
                    />
                  )}
                </BookmarkWrapper>

                <RegionNameContainer>
                  {regionDetailContent.addr1 === '' ? null : (
                    <View style={{ position: 'absolute', top: -28 }}>
                      <RegionDetailText>
                        {regionDetailContent.addr1.split(' ')[0]}
                      </RegionDetailText>
                    </View>
                  )}
                  <RegionDetailName
                    isImage={regionDetailContent.firstimage !== ''}
                  >
                    {regionDetailContent.title}
                  </RegionDetailName>
                  {regionDetailContent.addr1 === '' ? null : (
                    <RegionDetailAddress
                      isImage={regionDetailContent.firstimage !== ''}
                    >
                      {regionDetailContent.addr1}
                    </RegionDetailAddress>
                  )}
                </RegionNameContainer>
              </RegionDetailContainer>
              <DescriptionContainer>
                <RegionDetailHeaderText>이곳은요</RegionDetailHeaderText>
                <Text style={{ fontFamily: 'Regular', lineHeight: 21 }}>
                  {regionDetailContent.overview}
                </Text>
              </DescriptionContainer>
            </>
          )}
        </Animated.ScrollView>
        <ButtonContainer>
          {!isWrittenPost && (
            <ChallengeButton
              onPress={() => moveToChallengeWrite(regionDetailContent)}
            >
              <ChallengeText>챌린지 참여</ChallengeText>
            </ChallengeButton>
          )}
          <MapButton onPress={moveToMap} isWrittenPost={isWrittenPost}>
            <MapButtonText>지도보기</MapButtonText>
          </MapButton>
        </ButtonContainer>
      </Animated.View>

      <AlertComponent />
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
    flex: 1,
  },
  scrollView: {
    flexGrow: 1, // Changed from flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 76,
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

const BookmarkWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 14px;
  right: 16px;
`;

const BookmarkImage = styled.Image`
  width: 35px;
  height: 35px;
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
  color: ${(props) => (props.isImage ? '#ffffff' : '#000000')};
  margin-bottom: 2px;
  margin-top: 9px;
  padding-right: 16px;
`;

const RegionDetailAddress = styled.Text`
  font-family: Regular;
  font-size: 14px;
  font-style: normal;
  color: ${(props) => (props.isImage ? '#ffffff' : '#000000')};
  padding-right: 16px;
`;

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
  width: 100%;
  flex-direction: row;
  position: absolute;
  bottom: 0;
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
  width: ${(props) => props.isWrittenPost ? "100%" : "50%"};
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
