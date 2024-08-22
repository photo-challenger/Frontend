import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const AlertPop = ({ visible, onClose, title, message, buttonText }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Overlay>
        <AlertContainer>
          <AlertContent>
            <AlertTitle>{title}</AlertTitle>
            <AlertMessage>{message}</AlertMessage>
          </AlertContent>

          <AlertButton onPress={onClose}>
            <ButtonText>{buttonText}</ButtonText>
          </AlertButton>
        </AlertContainer>
      </Overlay>
    </Modal>
  );
};

export default AlertPop;

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

const AlertButton = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  padding: 10px 20px;
  background-color: #ca7ffe;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-size: 14px;
  color: white;
  font-weight: bold;
`;
