import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Image, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import KakaoMap from '../component/map/KakaoMap';
import * as Location from 'expo-location';
import { fetchlocationBasedList } from '../service/api';
import styled from 'styled-components/native';

const MapScreen = ({ route, navigation }) => {
  const [coords, setCoords] = useState(null);
  const [tourList, setTourList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [layerPopFlag, setLayerPopFlag] = useState(false);
  const [tourInfo, setTourInfo] = useState({});

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

      reloadCurrentLocation();
    })();
  }, []);

  useEffect(() => {
    if (coords != null) {
      searchTourList();
    }
  }, [coords]);

  async function reloadCurrentLocation() {
    let _location = await Location.getCurrentPositionAsync();
    let _coords = _location.coords;
    // _coords = {
    //   longitude: 126.9270184,
    //   latitude: 37.5266715,
    // };

    setCoords(_coords);
  }

  async function searchTourList() {
    console.log('coords   >> ', coords);
    const sendData = {
      mapX: coords.longitude,
      mapY: coords.latitude,
    };

    const apiResponseData = await fetchlocationBasedList(sendData);

    console.log('apiResponseData  >> ', apiResponseData);
    const rdHeader = apiResponseData.response.header;
    const rdBody = apiResponseData.response.body;
    if (rdHeader.resultCode == '0000') {
      console.log('rdbody items :  ', rdBody.items);
      if (rdBody.items != '') {
        setTourList(rdBody.items.item);
      } else {
        setTourList([]);
      }
    }
  }

  // 관광지 상세정보 조회
  async function searchTourDetailInfo() {
    const sendData = {
      mapX: coords.longitude,
      mapY: coords.latitude,
    };
    const apiResponseData = await fetchlocationBasedList(sendData);
    const rdHeader = apiResponseData.response.header;
    const rdBody = apiResponseData.response.body;
    if (rdHeader.resultCode == '0000') {
      setTourList(rdBody.items.item);
    }
  }

  // '자세히보기' 클릭 시 해당 관광지 상세 페이지로 이동
  function moveToDetail() {}

  // ‘포토챌린지 참여하기' 클릭 시 해당 포토챌린지 작성화면으로 이동
  function writeChallenge() {}

  // 마커 클릭 시
  function getMarkerInfo(obj) {
    console.log('getMarkerInfo', obj);
    setLayerPopFlag(obj != undefined);
    setTourInfo(obj || {});

    // todo : 해당 관광지 조회 api 호출
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
              source={tourInfo.firstimage ? { uri: tourInfo.firstimage } : ''}
            />
            <DetailInfoContView>
              <Text>{tourInfo.title}</Text>
              <Text>{tourType[tourInfo.contenttypeid]}</Text>
              <Text>{tourInfo.addr1}</Text>
            </DetailInfoContView>
          </DetailInfoView>
          <DetailBtnView>
            <BttmShtDetailBtn onPress={moveToDetail}>
              <BttmShtDetailBtnText>자세히 보기</BttmShtDetailBtnText>
            </BttmShtDetailBtn>
            <BttmShtChllngBtn onPress={writeChallenge}>
              <BttmShtChllngBtnText>포토챌린지 참여하기</BttmShtChllngBtnText>
            </BttmShtChllngBtn>
          </DetailBtnView>
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
  width: 147px;
  height: 38px;
  justify-content: center;
  align-items: center;
`;

const RefreshBtnText = styled.Text`
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;

const CurrentBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 30px;
  background-color: #ffffff;
  width: 46px;
  height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

const CurrentBtnImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const DetailBottomSheet = styled.View`
  display: flex;
  width: 328px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  margin: 16px;
  background-color: #fff;
  position: absolute;
  bottom: 0px;
  justify-content: center;
`;

const BttmShtDetailBtn = styled.TouchableOpacity`
  width: 130px;
  padding: 12px 9px;
  justify-content: center;
  align-items: center;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid #ca7ffe;
  background: #fefefe;
`;

const BttmShtDetailBtnText = styled.Text`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.28px;
  color: #ca7ffe;
`;

const BttmShtChllngBtn = styled.TouchableOpacity`
  width: 130px;
  padding: 12px 9px;
  justify-content: center;
  align-items: center;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid #ca7ffe;
  background: #ca7ffe;
`;

const BttmShtChllngBtnText = styled.Text`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.28px;
  color: #ffff;
`;

const DetailBtnView = styled.View`
  flex-direction: row;
`;

const DetailInfoView = styled.View`
  display: flex;
  width: 300px;
  align-self: stretch;
  flex-direction: row;
`;

const DetailInfoContView = styled.View`
  margin-left: 12px;
`;

const DetailInfoImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 12px;
`;
