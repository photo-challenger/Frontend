import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import useConfirm from '../hooks/useConfirm';

const PointStorePaymentScreen = ({ route, navigation }) => {
	// 추후 디자인 나온 후 수정
	const [modalVisible, setModalVisible] = useState(false);
	const [buyCount, setBuyCount] = useState(0);
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

	useEffect(() => {
		setFinalPrice(item.itemPrice * buyCount);
	}, [buyCount]);

	return (
		<PointStorePaymentComponent>
      <ButtonImageWrapper activeOpacity={0.8}>
			<ButtonImage
						source={require('../assets/btn-back.png')}
						resizeMode="cover"
					/>
			</ButtonImageWrapper>

			<PaymentUserInfoContainer>
				<PaymentHeaderText>현재 누적 포인트</PaymentHeaderText>
				<PaymentUserInfoSubContainer>
					<PaymenyUserInfoPointNum>1,500</PaymenyUserInfoPointNum>
					<PaymentUserInfoPointText>포인트</PaymentUserInfoPointText>
				</PaymentUserInfoSubContainer>
			</PaymentUserInfoContainer>
		</PointStorePaymentComponent>
	);
};

export default PointStorePaymentScreen;

const PointStorePaymentComponent = styled.View`
  background: #F7F7F8;
  height: 100%;
  flex: 1;
`;

const ButtonImageWrapper = styled.TouchableOpacity`
	position: absolute;
  top: 44px;
  left: 22px;
`

const ButtonImage = styled.Image`
	width: 32px;
	height: 32px;
`;

const PaymentUserInfoContainer = styled.View`
	background-color: #FFFFFF;
	width: 100%;
	height: 157px;
	margin-top: 84px;
	padding: 24px;
`

const PaymentHeaderText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	margin-bottom: 8px;
`

const PaymentUserInfoSubContainer = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const PaymenyUserInfoPointNum = styled.Text`
	font-family: Pretendard;
	font-size: 40px;
	font-style: normal;
	font-weight: 500;
	color: #CA7FFE;
`

const PaymentUserInfoPointText = styled.Text`
	font-size: 24px;
	font-style: normal;
	font-weight: 500;
	color: #CA7FFE;
	margin-left: 4px;
`

const PaymentFinalPriceContainer = styled.View``

const PaymentFinalPriceHeaderText = styled.Text``