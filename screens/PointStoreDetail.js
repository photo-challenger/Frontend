import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import useConfirm from '../hooks/useConfirm';
import { fetchPointStoreDetail, fetchLogin } from '../service/api';
const PointStoreDetail = ({ route, navigation }) => {
  const { itemId } = route.params;
  // const { itemId } = { itemId: 1 };
  const [modalVisible, setModalVisible] = useState(false);
  const [buyCount, setBuyCount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [item, setItem] = useState({});

  useEffect(() => {
    // fetchLogin();
    getItemDetail();
  }, []);

  async function getItemDetail() {
    const apiResponseData = await fetchPointStoreDetail(itemId);
    console.log(' apiResponseData   :', apiResponseData);
    setItem(apiResponseData);
  }

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
  };

  const movePayment = (itemId, buyCount) => {
    navigation.navigate('PointStorePaymentScreen', {
      itemId: itemId,
      itemCount: buyCount,
    });
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
          <ItemDetailPrice>
            {new Intl.NumberFormat().format(item.itemPrice)}원
          </ItemDetailPrice>
        </ItemDetailTitle>
      </ItemImageWrapper>

      <BottomOutContainer visible={modalVisible}>
        <ItemDescriptionContainer>
          <ItemDescriptionText>이곳은요</ItemDescriptionText>
          <ItemDescription>{item.itemDescription}</ItemDescription>
        </ItemDescriptionContainer>

        <ItemPurchaseButton activeOpacity={0.9} onPress={() => openModal()}>
          <PurchaseButtonText>구매하기</PurchaseButtonText>
        </ItemPurchaseButton>
      </BottomOutContainer>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onBackdropPress={() => exitModal()}
      >
        <ModalContainer>
          <TouchableOpacity
            style={{ height: '100%' }}
            onPress={() => exitModal()}
          ></TouchableOpacity>
          <ModalContent>
            <View style={{ paddingTop: 0, paddingLeft: 24, paddingRight: 24 }}>
              <ModalHeaderTextWrapper activeOpacity={1}>
                <ModalHeaderText>옵션 선택</ModalHeaderText>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => exitModal()}
                >
                  <ModalDragImage source={require('../assets/x-close.png')} />
                </TouchableOpacity>
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
                    onPress={() => minusCount()}
                  >
                    <ModalMinusImage source={require('../assets/minus.png')} />
                  </TouchableOpacity>
                  <ModalSelectCount>
                    <ModalSelectCountNum>{buyCount}</ModalSelectCountNum>
                  </ModalSelectCount>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setBuyCount(buyCount + 1)}
                  >
                    <ModalPlusImage source={require('../assets/plus.png')} />
                  </TouchableOpacity>
                </ModalSelectCountSubContainer>
              </ModalSelectCountContainer>
            </View>

            <ModalSelectContainer>
              <ModalSelectPriceContainer>
                <ModalFinalPrice>
                  {new Intl.NumberFormat().format(finalPrice)} point
                </ModalFinalPrice>
              </ModalSelectPriceContainer>
              <ModalSelectButton
                activeOpacity={0.8}
                onPress={() => movePayment(itemId, buyCount)}
              >
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
`;

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
`;

const ItemImageWrapper = styled.View`
  position: relative;
  z-index: 1;
  height: 60%;
  width: 100%;
`;

const BottomOutContainer = styled.View`
  flex: 1;
  background-color: ${({ visible }) =>
    visible ? 'rgba(0, 0, 0, 0.3)' : 'transparent'};
`;

const ItemImageOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ visible }) =>
    visible ? 'rgba(0, 0, 0, 0.3)' : 'transparent'};
  z-index: 2;
`;

const ItemImage = styled.Image`
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const ItemDetailTitle = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 24px;
  z-index: 1;
`;

const ItemDetailSubTitle = styled.View`
  margin-bottom: 36px;
`;
const ItemDetailName = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  color: #ffffff;
`;
const ItemDetailAddress = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #ffffff;
`;
const ItemDetailPrice = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  color: #ffffff;
`;

const ItemDescriptionContainer = styled.View`
  padding: 24px;
`;

const ItemDescriptionText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 14px;
`;

const ItemDescription = styled.Text``;

const ItemPurchaseButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #4f4f4f;
  justify-content: center;
  align-items: center;
`;

const PurchaseButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`;

/* Modal Styles */
const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const ModalDragImage = styled.Image`
  width: 30px;
  resizemode: contain;
`;

const ModalContent = styled.View`
  background-color: #ffffff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const ModalHeaderTextWrapper = styled.TouchableOpacity`
  padding: 8px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ModalHeaderText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
`;

const ModalDetailContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ModalDetailImage = styled.Image`
  width: 76.8px;
  height: 76.8px;
  resizemode: 'contain';
  border-radius: 95.04px;
`;

const ModalDetailSubContainer = styled.View`
  margin-left: 16px;
`;

const ModalDetailName = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`;

const ModalDetailAddress = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-top: 5.76px;
`;
const ModalSelectCountContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 20px 0;
  justify-content: space-between;
  align-items: center;
`;

const ModalSelectText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
`;

const ModalSelectCountSubContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ModalMinusImage = styled.Image`
  width: 20px;
  height: 20px;
  resizemode: 'contain';
`;

const ModalSelectCount = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 75px;
  border: 1px solid #b5b5b5;
  justify-content: center;
  align-items: center;
  margin: 0 24px;
`;

const ModalSelectCountNum = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  color: #4f4f4f;
`;

const ModalPlusImage = styled.Image`
  width: 20px;
  height: 20px;
  resizemode: 'contain';
`;

const ModalSelectContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ModalSelectPriceContainer = styled.View`
  width: 40%;
  justify-content: center;
  align-items: center;
`;

const ModalFinalPrice = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  color: #ca7ffe;
`;

const ModalSelectButton = styled.TouchableOpacity`
  width: 60%;
  height: 76px;
  justify-content: center;
  align-items: center;
  background-color: #4f4f4f;
`;

const ModalSelectButtonText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  color: #ffffff;
`;
