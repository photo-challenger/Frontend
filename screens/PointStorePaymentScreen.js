import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import useConfirm from '../hooks/useConfirm';

const PointStorePaymentScreen = ({ route, navigation }) => {
	const { itemId, itemCount } = route.params;

	const [pointInfo, setPointInfo] = useState({
    "needPoint": 1000,
    "havePoint": 99400,
    "stockCount": 1
	});
	const [finalPrice, setFinalPrice] = useState(0);
	const [item, setItem] = useState(
		{
			"itemId": 1,
			"itemImgName": "https://tripture.s3.ap-northeast-2.amazonaws.com/file/be_item.png",
			"itemDescription": "경주 대릉원은 경주시 노동동과 황남동에 있는 신라 시대의 고분군을 말하며 노동동 고분군, 노서리 고분군, 황남동 고분군, 황오동 고분군, 인왕동 고분군으로 구성되어 있다. 노동동 고분군은 고신라 시대 무덤들로, 봉황대, 식리총, 금령총 등이 포함되어 있다. 봉황대는 밑둘레 230m, 직경 82m, 높이 22m로 황남대총 다음으로 규모가 큰 무덤으로 덧널을 설치한 돌무지덧널무덤이다. 노서리 고분군은 ...",
			"itemPrice": 1000,
			"itemName": "대둔산 케이블카 티켓 (왕복)",
			"itemPosition": "전라북도 완주군 운주면 대둔산공원길 57"
		});

	return (
		<PointStorePaymentComponent>
			<PaymentInfoContainer>
				<PaymentInfoHeaderText>결제 정보</PaymentInfoHeaderText>
				<PaymentInfoSubContainer>
					<PaymentInfoTitle numberOfLines={1} ellipsizeMode="tail">{item.itemName}</PaymentInfoTitle>
					<PaymentInfoAddress numberOfLines={1} ellipsizeMode="tail">{item.itemPosition}</PaymentInfoAddress>
					<PaymentBuyPointContainer>
						<View>
							<PaymentItemCount>구매 개수</PaymentItemCount>
							<PaymentItemCount>상품 가격</PaymentItemCount>
						</View>
						<View>
							<PaymentItemCount>{pointInfo.stockCount} 개</PaymentItemCount>
							<PaymentItemCount>{item.itemPrice} P</PaymentItemCount>
						</View>
					</PaymentBuyPointContainer>
					<PaymentPoint>{new Intl.NumberFormat().format(itemCount * item.itemPrice)} 포인트</PaymentPoint>
				</PaymentInfoSubContainer>
			</PaymentInfoContainer>
			<PaymentBuyContainer>
				<PaymentBuyHeaderText>포인트 현황</PaymentBuyHeaderText>
				<PaymentBuyPointContainer>
					<View>
						<PaymentBuyPoint>보유 포인트</PaymentBuyPoint>
						<PaymentBuyPoint>소멸 예정 포인트</PaymentBuyPoint>
					</View>
					<View>
						<PaymentBuyPointNum>{pointInfo.havePoint} P</PaymentBuyPointNum>
						<PaymentBuyPointNum>{pointInfo.needPoint} P</PaymentBuyPointNum>
					</View>
				</PaymentBuyPointContainer>
				<PaymentRemainingPointContainer>
					<PaymentBuyPoint>결제 후 남은 포인트</PaymentBuyPoint>
					<PaymentBuyPoint style={{color: '#CA7FFE'}}>{pointInfo.havePoint - pointInfo.needPoint} P</PaymentBuyPoint>
				</PaymentRemainingPointContainer>
			</PaymentBuyContainer>
			<BuyButton activeOpacity={0.6}>
				<BuyButtonText>구매하기</BuyButtonText>
			</BuyButton>
		</PointStorePaymentComponent>
	);
};

export default PointStorePaymentScreen;

const PointStorePaymentComponent = styled.View`
  background: #F7F7F8;
  height: 100%;
  flex: 1;
`;

const PaymentInfoContainer = styled.View`
	background-color: #FFFFFF;
	padding: 24px;
`

const PaymentInfoHeaderText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
	margin-bottom: 24px;
`

const PaymentInfoSubContainer = styled.View`
	border-radius: 4px;
	border: 1px solid #B5B5B5;
	padding: 16px 12px;
`

const PaymentInfoTitle = styled.Text`
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
`

const PaymentInfoAddress = styled.Text`
	font-size: 10px;
	font-style: normal;
	font-weight: 600;
	color: #B5B5B5;
	margin-bottom: 10px;
`

const PaymentItemCount = styled.Text`
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	text-align: right;
`

const PaymentPoint = styled.Text`
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	color: #CA7FFE;
	margin-top: 8px;
	text-align: right;
`

const PaymentBuyContainer = styled.View`
	background-color: #FFFFFF;
	padding: 24px;
	margin-top: 16px;
`

const PaymentBuyHeaderText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
`

const PaymentBuyPointContainer = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	border-bottom-width: 1px;
	border-bottom-color: #B5B5B5;
	padding-bottom: 18px;
`

const PaymentRemainingPointContainer = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

const PaymentBuyPoint = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	margin-top: 16px;
`

const PaymentBuyPointNum = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	margin-top: 16px;
	text-align: right;
`

const BuyButton = styled.TouchableOpacity`
	width: 100%;
	height: 80px;
	justify-content: center;
	align-items: center;
	background-color: #4F4F4F;
	position: absolute;
	bottom: 0;
`

const BuyButtonText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	color: #FFFFFF;
`
