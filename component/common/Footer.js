import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import styled from 'styled-components/native';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterItem>
        <Image source={require('../../assets/icon-home.png')} />
        <FooterItemText>홈</FooterItemText>
      </FooterItem>
      <FooterItem>
        <Image source={require('../../assets/icon-challenge.png')} />
        <FooterItemText>포토챌린지</FooterItemText>
      </FooterItem>
      <FooterItem>
        <Image source={require('../../assets/icon-chat.png')} />
        <FooterItemText>커뮤니티</FooterItemText>
      </FooterItem>
      <FooterItem>
        <Image source={require('../../assets/icon-gift.png')} />
        <FooterItemText>포인트상점</FooterItemText>
      </FooterItem>
      <FooterItem>
        <Image source={require('../../assets/icon-my.png')} />
        <FooterItemText>마이페이지</FooterItemText>
      </FooterItem>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.View`
  display: 'flex';
  flex-direction: row;
  height: 85px;
  width: 100%;
  background: #fff;
`;

const FooterItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 20%;
  background: #fff;
`;

const FooterItemText = styled.Text`
  color: #ca7ffe;
`;
