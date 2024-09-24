import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Image, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import KakaoMap from '../component/map/KakaoMap';
import * as Location from 'expo-location';
import {
  fetchlocationBasedList,
  fetchLocationBasedChallengeList,
  fetchCheckChallenge,
} from '../service/api';
import styled from 'styled-components/native';
import useAlert from '../hooks/useAlert';
import { getDistance } from '../component/common/GetDistance';

const MapScreen = ({ route, navigation }) => {
  const [coords, setCoords] = useState(null);
  const [tourList, setTourList] = useState([]);
  const [challengeList, setChallengList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [layerPopFlag, setLayerPopFlag] = useState(false);
  const [tourInfo, setTourInfo] = useState({});
  const [showAlert, AlertComponent] = useAlert();

  const tourType = {
    12: '관광지',
    14: '문화시설',
    15: '축제공연행사',
    25: '여행코스',
    28: '레포츠',
    32: '숙박',
    38: '쇼핑',
    39: '음식점',
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      if (route.params?.coords) {
        let _coords = route.params?.coords;
        setCoords(_coords);
      } else {
        reloadCurrentLocation();
      }
    })();
  }, []);

  useEffect(() => {
    if (coords != null) {
      searchTourList();
      // searchChallengList();
    }
  }, [coords]);

  async function reloadCurrentLocation() {
    let _location = await Location.getCurrentPositionAsync();
    let _coords = _location.coords;
    _coords = {
      longitude: 127.758664,
      latitude: 37.858039,
    };

    setCoords(_coords);
  }

  async function searchTourList() {
    console.log('coords   >> ', coords);
    const sendData = {
      mapX: coords.longitude,
      mapY: coords.latitude,
    };

    const apiResponseData = await fetchlocationBasedList(sendData);

    const rdHeader = apiResponseData.response.header;
    const rdBody = apiResponseData.response.body;
    if (rdHeader.resultCode == '0000') {
      if (rdBody.items != '') {
        setTourList(rdBody.items.item);
      } else {
        setTourList([]);
      }
    }
  }

  async function searchChallengList() {
    const sendData = {
      lon: coords.longitude,
      lat: coords.latitude,
    };

    const responseData = await fetchLocationBasedChallengeList(sendData);

    console.log(' searchChallengList responseData   :', responseData);

    setChallengList(responseData.aroundChallenges);
  }

  // 관광지 상세정보 조회
  // async function searchTourDetailInfo() {
  //   const sendData = {
  //     mapX: coords.longitude,
  //     mapY: coords.latitude,
  //   };
  //   const apiResponseData = await fetchlocationBasedList(sendData);
  //   const rdHeader = apiResponseData.response.header;
  //   const rdBody = apiResponseData.response.body;
  //   if (rdHeader.resultCode == '0000') {
  //     setTourList(rdBody.items.item);
  //   }
  // }

  // '자세히보기' 클릭 시 해당 관광지 상세 페이지로 이동
  function moveToDetail(obj) {
    // console.log(obj);
    navigation.navigate('MainDetailScreen', {
      contentId: obj.contentid,
    });
  }

  // ‘포토챌린지 참여하기' 클릭 시 해당 포토챌린지 작성화면으로 이동
  async function writeChallenge(obj) {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      showAlert({
        title: '포토챌린지 오류!',
        msg: '위치 권한이 허용되지 않았습니다.',
      });
      return;
    }

    // let _location = await Location.getCurrentPositionAsync();
    // if(getDistance(_location.coords.latitude, _location.coords.longitude, obj.mapy, obj.mapx) > 1000) {
    //   showAlert({
    //     title: '포토챌린지 작성 불가',
    //     msg: '관광지로 조금 더 가까이 이동해 주세요!',
    //   });
    //   return;
    // }

    const response = await fetchCheckChallenge(obj.contentid);
    if (response) {
      showAlert({
        title: '히든 포토챌린지 발견 ✌️',
        msg: '히든 포토챌린지에 참여하면\n더 많은 포인트를 얻을 수 있어요!',
        onOk: () => {
          navigation.navigate('photoChallengeDetail', {
            challengeInfo: {
              challengeName: obj.title,
              contentId: obj.contentid,
              areaCode: obj.areacode,
              addr: obj.addr1 || '',
            },
          });
        },
      });
    } else {
      navigation.navigate('photoChallengeWrite', {
        challengeInfo: {
          challengeName: obj.title,
          contentId: obj.contentid,
          areaCode: obj.areacode,
          addr: obj.addr1 || '',
        },
      });
    }
  }

  // 마커 클릭 시
  function getMarkerInfo(obj) {
    console.log('getMarkerInfo', obj);
    setLayerPopFlag(obj != undefined);
    setTourInfo(obj || {});
  }

  return (
    <Container>
      <StatusBar barStyle="default" />
      {errorMsg ? (
        <ErrorText>{errorMsg}</ErrorText>
      ) : !coords ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <KakaoMap
          coords={coords}
          tourList={tourList}
          challengeList={challengeList}
          style={{ flex: 1 }}
          setCoords={setCoords}
          getMarkerInfo={getMarkerInfo}
        />
      )}
      <FloatBtnContent layerPopFlag={layerPopFlag}>
        <RefreshBtn onPress={searchTourList}>
          <RefreshBtnText>이 지역에서 재 검색하기</RefreshBtnText>
        </RefreshBtn>
        <CurrentBtn onPress={reloadCurrentLocation}>
          <CurrentBtnImage source={require('../assets/icon-current.png')} />
        </CurrentBtn>
      </FloatBtnContent>
      {layerPopFlag ? (
        <DetailBottomSheet>
          <DetailInfoView>
            <DetailInfoImage
              source={
                tourInfo.firstimage
                  ? { uri: tourInfo.firstimage }
                  : require('../assets/tripture-main-no-content.png')
              }
            />
            <DetailInfoContView>
              <DetailInfoTitle>
                <Text
                  style={{ fontSize: 16, fontFamily: 'Bold', marginRight: 4 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {tourInfo.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Semibold',
                    color: '#878787',
                  }}
                >
                  {tourType[tourInfo.contenttypeid]}
                </Text>
              </DetailInfoTitle>
              <Text
                style={{ fontFamily: 'Medium', color: '#9C9C9C', width: '90%' }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {tourInfo.addr1}
              </Text>
            </DetailInfoContView>
          </DetailInfoView>
          <DetailBtnView>
            <BttmShtDetailBtn onPress={() => moveToDetail(tourInfo)}>
              <BttmShtDetailBtnText>자세히 보기</BttmShtDetailBtnText>
            </BttmShtDetailBtn>
            <BttmShtChllngBtn onPress={() => writeChallenge(tourInfo)}>
              <BttmShtChllngBtnText>포토챌린지 참여하기</BttmShtChllngBtnText>
            </BttmShtChllngBtn>
          </DetailBtnView>

          <AlertComponent />
        </DetailBottomSheet>
      ) : (
        ''
      )}
    </Container>
  );
};

export default MapScreen;

const Container = styled.View`
  flex: 1;
  background-color: #f7f8fa;
`;

const FloatBtnContent = styled.View`
  position: absolute;
  bottom: ${(props) => (props.layerPopFlag ? '210px' : '30px')};
  left: 0;
  right: 0;
  align-items: center;
`;

const RefreshBtn = styled.TouchableOpacity`
  background-color: #ffffff;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 50px;
  elevation: 3;
  height: 38px;
  justify-content: center;
  align-items: center;
`;

const RefreshBtnText = styled.Text`
  font-family: Regular;
  color: #4c53f5;
  font-size: 16px;
  line-height: 18px;
`;

const CurrentBtn = styled.TouchableOpacity`
  position: absolute;
  right: 30px;
  background-color: #ffffff;
  width: 46px;
  height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  elevation: 3;
  z-index: 1;
`;

const CurrentBtnImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const DetailBottomSheet = styled.View`
  display: flex;
  width: 100%;
  padding: 16px 24px;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  position: absolute;
  bottom: 0px;
  justify-content: center;
  border-radius: 12px 12px 0 0;
`;

const BttmShtDetailBtn = styled.TouchableOpacity`
  width: 48.5%;
  height: 50px;
  padding: 12px 9px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #ca7ffe;
  background: #fefefe;
`;

const BttmShtDetailBtnText = styled.Text`
  font-family: SemiBold;
  font-size: 14px;
  font-style: normal;
  letter-spacing: -0.28px;
  color: #ca7ffe;
`;

const BttmShtChllngBtn = styled.TouchableOpacity`
  width: 48.5%;
  height: 50px;
  padding: 12px 9px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  border-radius: 8px;
  border: 1px solid #ca7ffe;
  background: #ca7ffe;
`;

const BttmShtChllngBtnText = styled.Text`
  font-family: SemiBold;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.28px;
  color: #ffff;
`;

const DetailBtnView = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

const DetailInfoView = styled.View`
  display: flex;
  width: 300px;
  align-self: stretch;
  flex-direction: row;
`;

const DetailInfoContView = styled.View`
  margin-left: 12px;
  width: 90%;
`;

const DetailInfoTitle = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DetailInfoImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 12px;
`;
