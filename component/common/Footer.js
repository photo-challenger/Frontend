import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

const Footer = () => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePress = (item) => {
    setSelectedItem(item);

    switch (item) {
      case 'Home':
        // navigation.navigate('home');
        break;
      case 'challenge':
        navigation.navigate('photoChallenge');
        break;
      case 'community':
        navigation.navigate('community');
        break;
      case 'store':
        navigation.navigate('pointStore');
        break;
      case 'myPage':
        navigation.navigate('mypage');
        break;
    }
  };

  return (
    <FooterContainer>
      <FooterItem activeOpacity={0.7} onPress={() => handlePress('home')}>
        <FooterImg
          source={
            selectedItem === 'home'
              ? require('../../assets/icon-home-selected.png') // 선택된 경우
              : require('../../assets/home-01.png')
          }
        />
        <FooterItemText isSelected={selectedItem === 'home'}>홈</FooterItemText>
      </FooterItem>
      <FooterItem activeOpacity={0.7} onPress={() => handlePress('challenge')}>
        <FooterImg
          source={
            selectedItem === 'challenge'
              ? require('../../assets/icon-challenge-selected.png') // 선택된 경우
              : require('../../assets/image-02.png')
          }
        />
        <FooterItemText isSelected={selectedItem === 'challenge'}>
          포토챌린지
        </FooterItemText>
      </FooterItem>
      <FooterItem activeOpacity={0.7} onPress={() => handlePress('community')}>
        <FooterImg
          source={
            selectedItem === 'community'
              ? require('../../assets/icon-chat-selected.png') // 선택된 경우
              : require('../../assets/message-chat-circle.png')
          }
        />
        <FooterItemText isSelected={selectedItem === 'community'}>
          커뮤니티
        </FooterItemText>
      </FooterItem>
      <FooterItem activeOpacity={0.7} onPress={() => handlePress('store')}>
        <FooterImg
          source={
            selectedItem === 'store'
              ? require('../../assets/icon-gift-selected.png') // 선택된 경우
              : require('../../assets/gift-01.png')
          }
        />
        <FooterItemText isSelected={selectedItem === 'store'}>
          포인트상점
        </FooterItemText>
      </FooterItem>
      <FooterItem activeOpacity={0.7} onPress={() => handlePress('myPage')}>
        <FooterImg
          source={
            selectedItem === 'myPage'
              ? require('../../assets/icon-my-selected.png') // 선택된 경우
              : require('../../assets/user-02.png')
          }
        />
        <FooterItemText isSelected={selectedItem === 'myPage'}>
          마이페이지
        </FooterItemText>
      </FooterItem>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.View`
  display: 'flex';
  flex-direction: row;
  height: 10%;
  width: 100%;
  background: #fff;
`;

const FooterItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 100%;
  background: #fff;
`;

const FooterItemText = styled.Text`
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  margin-top: 8%;
  color: ${(props) => (props.isSelected ? '#CA7FFE' : '#000000')};
`;

const FooterImg = styled.Image`
  width: 27px;
  height: 27px;
  resizemode: 'contain';
`;
