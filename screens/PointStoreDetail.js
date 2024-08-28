import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import useConfirm from '../hooks/useConfirm';

const PointStoreDetail = ({ route, navigation }) => {
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

	const openModal = () => {
		setModalVisible(true);
	};

	const exitModal = () => {
		setModalVisible(false);
		setBuyCount(0);
		setFinalPrice(0);
	};

	const minusCount = () => {
		if (buyCount > 0) {
			setBuyCount(buyCount - 1);
		}
	}

	const movePayment = (id) => {
    navigation.navigate('PointStorePayment');
  };

	useEffect(() => {
		setFinalPrice(item.itemPrice * buyCount);
	}, [buyCount]);

	return (
		<ItemDetailComponent>
			<ItemImageWrapper>
				<ItemImageOverlay visible={modalVisible} />
				<ItemImage source={{ uri: item.itemImgName }} />

				<ItemDetailHeader>
					<ButtonImage
						source={require('../assets/btn-back.png')}
						resizeMode="cover"
					/>
					<ItemName>{item.itemName}</ItemName>
				</ItemDetailHeader>

				<ItemDetailTitle>
					<ItemDetailSubTitle>
						<ItemDetailName>{item.itemName}</ItemDetailName>
						<ItemDetailAddress>{item.itemPosition}</ItemDetailAddress>
					</ItemDetailSubTitle>
					<ItemDetailPrice>{new Intl.NumberFormat().format(item.itemPrice)}원</ItemDetailPrice>
				</ItemDetailTitle>
			</ItemImageWrapper>

			<BottomOutContainer visible={modalVisible}>
				<ItemDescriptionContainer>
					<ItemDescriptionText>이곳은요</ItemDescriptionText>
					<ItemDescription>{item.itemDescription}</ItemDescription>
				</ItemDescriptionContainer>

				<ItemPurchaseButton
					activeOpacity={0.9}
					onPress={() => openModal()}>
					<PurchaseButtonText>구매하기</PurchaseButtonText>
				</ItemPurchaseButton>
			</BottomOutContainer>


			<Modal 
				animationType="slide" 
				transparent={true} 
				visible={modalVisible}
				onBackdropPress={() => exitModal()}>
				<ModalContainer>
					<TouchableOpacity style={{height: '100%'}} onPress={() => exitModal()}></TouchableOpacity>
					<ModalContent>
						<View style={{ paddingTop: 0, paddingLeft: 24, paddingRight: 24 }}>
							<ModalExitContainer activeOpacity={0.9} onPress={() => exitModal()}>
								<ModalDragImage source={require('../assets/Drag-handle.png')} />
							</ModalExitContainer>
							<ModalHeaderTextWrapper activeOpacity={1} onPress={() => exitModal()}>
								<ModalHeaderText>옵션 선택</ModalHeaderText>
							</ModalHeaderTextWrapper>
							<ModalDetailContainer>
								<ModalDetailImage source={{ uri: item.itemImgName }} />
								<ModalDetailSubContainer>
									<ModalDetailName>{item.itemName}</ModalDetailName>
									<ModalDetailAddress>{item.itemPosition}</ModalDetailAddress>
								</ModalDetailSubContainer>
							</ModalDetailContainer>

							<ModalSelectCountContainer>
								<ModalSelectText>수량</ModalSelectText>
								<ModalSelectCountSubContainer>
									<TouchableOpacity
										activeOpacity={0.8}
										onPress={() => minusCount()}>
										<ModalMinusImage source={require('../assets/minus.png')} />
									</TouchableOpacity>
									<ModalSelectCount>
										<ModalSelectCountNum>{buyCount}</ModalSelectCountNum>
									</ModalSelectCount>
									<TouchableOpacity
										activeOpacity={0.8}
										onPress={() => setBuyCount(buyCount + 1)}>
										<ModalPlusImage source={require('../assets/plus.png')} />
									</TouchableOpacity>
								</ModalSelectCountSubContainer>
							</ModalSelectCountContainer>
						</View>

						<ModalSelectContainer>
							<ModalSelectPriceContainer>
								<ModalFinalPrice>{new Intl.NumberFormat().format(finalPrice)} point</ModalFinalPrice>
							</ModalSelectPriceContainer>
							<ModalSelectButton activeOpacity={0.8} onPress={() => movePayment()}>
								<ModalSelectButtonText>결제하기</ModalSelectButtonText>
							</ModalSelectButton>
						</ModalSelectContainer>
					</ModalContent>
				</ModalContainer>
			</Modal>

		</ItemDetailComponent>
	);
};

export default PointStoreDetail;

const ItemDetailComponent = styled.View`
  background: #fff;
  height: 100%;
	flex: 1;
`;

const ItemDetailHeader = styled.View`
	position: absolute;
  top: 44px;
  left: 0;
  right: 0; 
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center; 
  align-items: center;
  padding: 0 22px;
`

const ButtonImage = styled.Image`
	width: 32px;
	height: 32px;
	position: absolute;
  left: 22px;
`;

const ItemName = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
`

const ItemImageWrapper = styled.View`
	position: relative;
  z-index: 1;
  height: 60%;
  width: 100%;
`

const BottomOutContainer = styled.View`
	flex: 1;
	background-color: ${({ visible }) => (visible ? 'rgba(0, 0, 0, 0.3)' : 'transparent')};
`

const ItemImageOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ visible }) => (visible ? 'rgba(0, 0, 0, 0.3)' : 'transparent')};
  z-index: 2;
`;

const ItemImage = styled.Image`
  height: 100%;
	width: 100%;
	position: relative;
  z-index: 1;
`

const ItemDetailTitle = styled.View`
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 10px 24px;
	z-index: 1;
`

const ItemDetailSubTitle = styled.View`
	margin-bottom: 36px;
`
const ItemDetailName = styled.Text`
	font-size: 24px;
	font-style: normal;
	font-weight: 500;
	color: #FFFFFF;
`
const ItemDetailAddress = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	color: #FFFFFF;
`
const ItemDetailPrice = styled.Text`
	font-size: 24px;
	font-style: normal;
	font-weight: 500;
	color: #FFFFFF;
`

const ItemDescriptionContainer = styled.View`
	padding: 24px;
`

const ItemDescriptionText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
	margin-bottom: 14px;
`

const ItemDescription = styled.Text``

const ItemPurchaseButton = styled.TouchableOpacity`
	position: absolute;
	z-index: 1;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 80px;
	background-color: #4F4F4F;
	justify-content: center;
	align-items: center;
`

const PurchaseButtonText = styled.Text`
	color: #FFFFFF;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
`

/* Modal Styles */
const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const ModalDragImage = styled.Image`
	height: 5.5px;
	resizeMode: contain;
`

const ModalContent = styled.View`
  background-color: #ffffff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const ModalExitContainer = styled.TouchableOpacity`
	height: 24px;
	width: 100%;
	justify-content: center;
	align-items: center;
`

const ModalHeaderTextWrapper = styled.TouchableOpacity`
	padding: 24px 0;
`

const ModalHeaderText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
`

const ModalDetailContainer = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const ModalDetailImage = styled.Image`
	width: 76.8px;
	height: 76.8px;
	resizeMode: 'contain';
	border-radius: 95.04px;
`

const ModalDetailSubContainer = styled.View`
	margin-left: 16px;
`

const ModalDetailName = styled.Text`
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
`

const ModalDetailAddress = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	margin-top: 5.76px;
`
const ModalSelectCountContainer = styled.View`
	display: flex;
	flex-direction: row;
	padding: 20px 0;
	justify-content: space-between;
	align-items: center;
`

const ModalSelectText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
`

const ModalSelectCountSubContainer = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const ModalMinusImage = styled.Image`
	width: 20px;
	height: 20px;
	resizeMode: 'contain';
`

const ModalSelectCount = styled.View`
	width: 36px;
	height: 36px;
	border-radius: 75px;
	border: 1px solid #B5B5B5;
	justify-content: center;
	align-items: center;
	margin: 0 24px;
`

const ModalSelectCountNum = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	color: #4F4F4F;
`

const ModalPlusImage = styled.Image`
	width: 20px;
	height: 20px;
	resizeMode: 'contain';
`

const ModalSelectContainer = styled.View`
	display: flex;
	flex-direction: row;
	width: 100%;
`

const ModalSelectPriceContainer = styled.View`
	width: 40%;
	justify-content: center;
	align-items: center;
`

const ModalFinalPrice = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	color: #CA7FFE;
`

const ModalSelectButton = styled.TouchableOpacity`
	width: 60%;
	height: 76px;
	justify-content: center;
	align-items: center;
	background-color: #4F4F4F;
`

const ModalSelectButtonText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	color: #FFFFFF;
`