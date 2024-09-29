import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import {
  fetchMyDurationPointList,
  fetchUserTotalPoint,
} from '../../service/api';
import Animated from 'react-native-reanimated';
import DateRangePicker from './DateRangePicker';
import ScrollWrapper from '../../component/common/ScrollWrapper';
import { useFocusEffect, useNavigationState } from '@react-navigation/native';

const PointComponent = ({ navigation }) => {
  const [myPoint, setMyPoint] = useState(0);
  const [startDate, setStartDate] = useState(new Date('2024-09-02'));
  const [endDate, setEndDate] = useState(new Date('2024-09-03'));
  const [pointHistory, setPointHistory] = useState([]);
  const [myPointPageNo, setMyPointPageNo] = useState(0);
  const [myPointTotPageCnt, setmyPointTotPageCnt] = useState(null);

  const navigationState = useNavigationState(state => state);

  const moveMyPageTicketScreen = () => {
    navigation.navigate('MyPageTicketScreen');
  };

  const getMyPoint = async () => {
    const totPoint = await fetchUserTotalPoint();
    setMyPoint(totPoint);
  };

  const getPointHistory = async (pageNum) => {
    setMyPointPageNo(pageNum);

    let sendData = {
      page: pageNum,
      startDate: startDate,
      endDate: endDate,
    };

    const resultData = await fetchMyDurationPointList(sendData);

    console.log('fetchMyDurationPointList pageNum  >> ', pageNum);

    if (pageNum === 0) {
      setPointHistory(resultData.pointDtos);
      setmyPointTotPageCnt(resultData.totalPages - 1);
    } else {
      setPointHistory(prevList => [...prevList, ...resultData.pointDtos]);
    }
  };

  const changeStartDateFomat = (str) => {
    let _year = '';
    let _month = '';
    let _date = '';
    if (str === undefined) {
      _year = new Date().getFullYear();
      _month = new Date().getMonth();
      _date = new Date().getDate();
    } else {
      _year = new Date(str).getFullYear();
      _month = new Date(str).getMonth();
      _date = new Date(str).getDate();
    }

    const formattedStartDate = `${String(_year)}-${String(_month + 1).padStart(
      2,
      '0',
    )}-${String(_date).padStart(2, '0')}`;

    setStartDate(formattedStartDate);
  };

  const changeEndDateFomat = (str) => {
    let _year = '';
    let _month = '';
    let _date = '';
    if (str === undefined) {
      _year = new Date().getFullYear();
      _month = new Date().getMonth();
      _date = new Date().getDate();
    } else {
      _year = new Date(str).getFullYear();
      _month = new Date(str).getMonth();
      _date = new Date(str).getDate();
    }

    const formattedEndDate = `${String(_year)}-${String(_month + 1).padStart(
      2,
      '0',
    )}-${String(_date).padStart(2, '0')}`;

    setEndDate(formattedEndDate);
  };

  useEffect(() => {
    // startDate와 endDate가 변경될 때마다 호출
    if (startDate && endDate) {
      getPointHistory(0);
    }
  }, [startDate, endDate]);

  useFocusEffect(
    useCallback(() => {
      if (navigationState.index === 1) {
        getMyPoint();
        changeStartDateFomat();
        changeEndDateFomat();
      }
    }, [navigationState])
  );

  return (
    <ChallengeTabContainer>
      <Animated.View style={[styles.animatedSheet]}>
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="always"
          nestedScrollEnabled={true}
        >
          <PointHeaderText>나의 포인트 현황</PointHeaderText>
          <PointContainer>
            <PointSubText>지금까지 내가 모은 포인트</PointSubText>
            <PointSubContainer>
              <PointNumText>{myPoint}</PointNumText>
              <PointText>포인트</PointText>
            </PointSubContainer>
            <MyTicketContainer
              activeOpacity={0.5}
              onPress={moveMyPageTicketScreen}
            >
              <MyTicketText>나의 티켓 보관함</MyTicketText>
              <MyTicketChevronImage
                source={require('../../assets/gray-chevron-right.png')}
              />
            </MyTicketContainer>
          </PointContainer>
          <PointHistoryContainer>
            <PointHeaderContainer>
              <PointHistoryHeaderText>사용 및 적립 내역</PointHistoryHeaderText>
              {startDate && endDate ? (
                <DateRangePicker
                  startDate={new Date(startDate)}
                  endDate={new Date(endDate)}
                  setStartDate={(val) => changeStartDateFomat(val)}
                  setEndDate={(val) => changeEndDateFomat(val)}
                />
              ) : null}
            </PointHeaderContainer>
            {pointHistory.length !== 0 ? (
              <ScrollWrapper
                loadMoreData={getPointHistory}
                totalPageNo={myPointTotPageCnt}
                currPageNo={myPointPageNo}
                nestedScrollEnabled={true}
              >
                <View>
                  {pointHistory &&
                    pointHistory.map((point, index) => (
                      <PointHistorySubContainer key={index}>
                        <PointHistoryHeaderContainer>
                          <PointHistoryTitle>
                            {point.pointTitle}
                          </PointHistoryTitle>
                          <PointHistoryDuration>
                            {point.pointDate.replace(/-/g, '.')}
                          </PointHistoryDuration>
                        </PointHistoryHeaderContainer>
                        <PointHistoryNum>
                          {point.pointChange} point
                        </PointHistoryNum>
                      </PointHistorySubContainer>
                    ))}
                </View>
              </ScrollWrapper>
            ) : (
              <NoChallengeListContainer>
                <NoChallengeListText>
                  포인트 사용 및 적립 내역이{'\n'}존재하지 않습니다.
                </NoChallengeListText>
              </NoChallengeListContainer>
            )}
          </PointHistoryContainer>
        </Animated.ScrollView>
      </Animated.View>
    </ChallengeTabContainer>
  );
};

export default PointComponent;

const styles = StyleSheet.create({
  animatedSheet: {
    maxHeight: '100%',
  },
  scrollView: {
    flexGrow: 1, // Changed from flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

const NoChallengeListContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const NoChallengeListText = styled.Text`
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #b3b3b3;
`;

const ChallengeTabContainer = styled.View`
  background-color: #f7f7f8;
  height: 100%;
`;

const PointHeaderText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  margin: 33px 0 16px 24px;
`;

const PointContainer = styled.View`
  background-color: #ffffff;
  border-radius: 8px;
  margin: 0 16px 35px 16px;
  padding: 16px 24px;
  elevation: 2;
`;

const PointSubText = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: #7a7a7a;
`;

const PointSubContainer = styled.View`
  border-bottom-width: 1.5px;
  border-bottom-color: #b5b5b5;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const PointNumText = styled.Text`
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  color: #ca7ffe;
`;

const PointText = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  color: #ca7ffe;
  margin-left: 4px;
  padding-bottom: 8px;
`;

const MyTicketContainer = styled.TouchableOpacity`
  margin-top: 11px;
  display: flex;
  flex-direction: row;
`;

const MyTicketText = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`;

const MyTicketChevronImage = styled.Image`
  width: 24px;
  height: 24px;
  margin-left: 2px;
`;

const PointHistoryContainer = styled.View`
  background-color: #ffffff;
  padding: 8px 24px;
  max-height: 400px;
`;

const PointHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PointHistoryHeaderText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
`;

const PointHistorySubContainer = styled.View`
  padding: 16px 0 16px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PointHistoryHeaderContainer = styled.View`
  flex: 1;
`;

const PointHistoryTitle = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 8px;
`;

const PointHistoryDuration = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #7a7a7a;
`;

const PointHistoryNum = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: #ca7ffe;
`;
