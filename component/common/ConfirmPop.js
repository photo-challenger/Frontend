import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const ConfirmPop = ({
  visible,
  onOk,
  onCancel,
  title,
  message,
  okBtnText,
  cancelBtnText,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestOk={onOk}
      onRequestCancel={onCancel}
    >
      <Overlay>
        <AlertContainer>
          <AlertContent>
            <AlertTitle>{title}</AlertTitle>
            <AlertMessage>{message}</AlertMessage>
          </AlertContent>

          <ButtonWrap>
            <AlertButtonLeft onPress={onCancel}>
              <LeftButtonText>{cancelBtnText}</LeftButtonText>
            </AlertButtonLeft>
            <AlertButtonRight onPress={onOk}>
              <RightButtonText>{okBtnText}</RightButtonText>
            </AlertButtonRight>
          </ButtonWrap>
        </AlertContainer>
      </Overlay>
    </Modal>
  );
};

export default ConfirmPop;

// Styled components
const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const AlertContainer = styled.View`
  width: 332px;
  padding: 12px 20px;
  background-color: white;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const AlertContent = styled.View`
  margin-bottom: 16px;
`;

const AlertTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  font-weight: 700;
  margin: 8px;
  color: #000;
  text-align: center;
`;

const AlertMessage = styled.Text`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const ButtonWrap = styled.View`
  flex-direction: row;
`;

const AlertButtonLeft = styled.TouchableOpacity`
  height: 48px;
  width: 100px;
  padding: 10px 20px;
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #ca7ffe;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const LeftButtonText = styled.Text`
  font-size: 14px;
  color: #ca7ffe;
  font-weight: bold;
`;

const AlertButtonRight = styled.TouchableOpacity`
  height: 48px;
  width: 100px;
  padding: 10px 20px;
  background-color: #ca7ffe;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
`;

const RightButtonText = styled.Text`
  font-size: 14px;
  color: white;
  font-weight: bold;
`;
