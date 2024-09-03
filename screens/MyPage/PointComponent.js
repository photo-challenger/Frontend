import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Modal, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import {
    fetchCommunityDetail,
    fetchDeletePost,
    fetchSaveBookmark,
} from '../../service/api';
import Animated from 'react-native-reanimated';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DateRangePicker from './DateRangePicker';

const PointComponent = ({ route, navigation }) => {
    const [myPoint, setMyPoint] = useState(1000);
    const [startDate, setStartDate] = useState(new Date('2024-09-02'));
    const [endDate, setEndDate] = useState(new Date('2024-09-03'));
    const [pointHistory, setPointHistory] = useState([]);

    return (
        <ChallengeTabContainer>
            <Animated.View
                style={[styles.animatedSheet]}
            >
                <Animated.ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}
                    keyboardShouldPersistTaps="always"
                >
                    <PointHeaderText>나의 포인트 현황</PointHeaderText>
                    <PointContainer>
                        <PointSubText>이번 달에 내가 모은 포인트</PointSubText>
                        <PointSubContainer>
                            <PointNumText>{new Intl.NumberFormat().format(myPoint)}</PointNumText>
                            <PointText>포인트</PointText>
                        </PointSubContainer>
                        <MyTicketContainer activeOpacity={0.5}>
                            <MyTicketText>나의 티켓 보관함</MyTicketText>
                            <MyTicketChevronImage source={require('../../assets/gray-chevron-right.png')} />
                        </MyTicketContainer>
                    </PointContainer>
                    <PointHistoryContainer>
                        <PointHeaderContainer>
                            <PointHistoryHeaderText>사용 및 적립 내역</PointHistoryHeaderText>
                            <DateRangePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
                        </PointHeaderContainer>
                        {pointHistory.length !== 0 ? (
                            <View>
                                {pointHistory && pointHistory.map((point, index) => (
                                    <PointHistorySubContainer key={index}>
                                        <PointHistoryHeaderContainer>
                                            <PointHistoryTitle>{point.pointTitle}</PointHistoryTitle>
                                            <PointHistoryDuration>{point.pointDate.replace(/-/g, ".")}</PointHistoryDuration>
                                        </PointHistoryHeaderContainer>
                                        <PointHistoryNum>{point.pointChange} point</PointHistoryNum>
                                    </PointHistorySubContainer>
                                ))}
                            </View>
                        ) : (
                            <NoChallengeListContainer>
                                <NoChallengeListText>포인트 사용 및 적립 내역이{'\n'}존재하지 않습니다.</NoChallengeListText>
                            </NoChallengeListContainer>
                        )}
                    </PointHistoryContainer>
                </Animated.ScrollView>
            </Animated.View>
        </ChallengeTabContainer>
    )
}

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
`

const NoChallengeListText = styled.Text`
	text-align: center;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	color: #B3B3B3;
`

const ChallengeTabContainer = styled.View`
	background-color: #F7F7F8;
	height: 100%;
`

const PointHeaderText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
	margin: 33px 0 16px 24px;
`

const PointContainer = styled.View`
	background-color: #FFFFFF;
	border-radius: 8px;
	margin: 0 16px 35px 16px;
	padding: 16px 24px;
	elevation: 2;
`

const PointSubText = styled.Text`
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	color: #7A7A7A;
`

const PointSubContainer = styled.View`
	border-bottom-width: 1.5px;
	border-bottom-color: #B5B5B5;
	padding-bottom: 10px;
	display: flex;
	flex-direction: row;
	align-items: flex-end;
`

const PointNumText = styled.Text`
	font-size: 40px;
	font-style: normal;
	font-weight: 500;
	color: #CA7FFE;
`

const PointText = styled.Text`
	font-size: 24px;
	font-style: normal;
	font-weight: 500;
	color: #CA7FFE;
	margin-left: 4px;
	padding-bottom: 8px;
`

const MyTicketContainer = styled.TouchableOpacity`
	margin-top: 11px;
	display: flex;
	flex-direction: row;
`

const MyTicketText = styled.Text`
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
`

const MyTicketChevronImage = styled.Image`
	width: 24px;
	height: 24px;
	margin-left: 2px;
`

const PointHistoryContainer = styled.View`
	background-color: #FFFFFF;
	padding: 8px 24px;
`

const PointHeaderContainer = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

const PointHistoryHeaderText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
`

const PointHistorySubContainer = styled.View`
	padding: 16px 0 16px 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const PointHistoryHeaderContainer = styled.View``

const PointHistoryTitle = styled.Text`
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	margin-bottom: 8px;
`

const PointHistoryDuration = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	color: #7A7A7A;
`

const PointHistoryNum = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	color: #CA7FFE;
`