import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import useConfirm from '../hooks/useConfirm';
import { fetchBuyByPoint } from '../service/api';
const PointStorePaymentScreen = ({ route, navigation }) => {
  const { item, pointInfo } = route.params;
  const [finalPrice, setFinalPrice] = useState(0);
  const buyByPoint = async () => {
    const result = await fetchBuyByPoint({
      price: pointInfo.needPoint,
      amount: pointInfo.stockCount,
      itemId: item.itemId,
      usePoint: pointInfo.needPoint,
    });
    navigation.navigate('MyPageTicketScreen');
  };
  return (
    <PointStorePaymentComponent>
      <PaymentInfoContainer>
        <PaymentInfoHeaderText>결제 정보</PaymentInfoHeaderText>
        <PaymentInfoSubContainer>
          <PaymentInfoTitle numberOfLines={1} ellipsizeMode="tail">
            {item.itemName}
          </PaymentInfoTitle>
          <PaymentInfoAddress numberOfLines={1} ellipsizeMode="tail">
            {item.itemPosition}
          </PaymentInfoAddress>
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
          <PaymentPoint>
            {new Intl.NumberFormat().format(
              pointInfo.stockCount * item.itemPrice,
            )}{' '}
            포인트
          </PaymentPoint>
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
          <PaymentBuyPoint style={{ color: '#CA7FFE' }}>
            {pointInfo.havePoint - pointInfo.needPoint} P
          </PaymentBuyPoint>
        </PaymentRemainingPointContainer>
      </PaymentBuyContainer>
      <BuyButton activeOpacity={0.6} onPress={() => buyByPoint()}>
        <BuyButtonText>구매하기</BuyButtonText>
      </BuyButton>
    </PointStorePaymentComponent>
  );
};

export default PointStorePaymentScreen;

const PointStorePaymentComponent = styled.View`
  background: #f7f7f8;
  height: 100%;
  flex: 1;
`;

const PaymentInfoContainer = styled.View`
  background-color: #ffffff;
  padding: 10px 24px 24px 24px;
`;

const PaymentInfoHeaderText = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 24px;
`;

const PaymentInfoSubContainer = styled.View`
  border-radius: 4px;
  border: 1px solid #b5b5b5;
  padding: 20px 30px;
`;

const PaymentInfoTitle = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

const PaymentInfoAddress = styled.Text`
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  color: #b5b5b5;
  margin-bottom: 10px;
`;

const PaymentItemCount = styled.Text`
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  text-align: right;
`;

const PaymentPoint = styled.Text`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  color: #ca7ffe;
  margin-top: 8px;
  text-align: right;
`;

const PaymentBuyContainer = styled.View`
  background-color: #ffffff;
  padding: 24px;
  margin-top: 16px;
`;

const PaymentBuyHeaderText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
`;

const PaymentBuyPointContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #b5b5b5;
  padding-bottom: 18px;
`;

const PaymentRemainingPointContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PaymentBuyPoint = styled.Text`
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  margin-top: 16px;
`;

const PaymentBuyPointNum = styled.Text`
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  margin-top: 16px;
  text-align: right;
`;

const BuyButton = styled.TouchableOpacity`
  width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
  background-color: #4f4f4f;
  position: absolute;
  bottom: 0;
`;

const BuyButtonText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  color: #ffffff;
`;
