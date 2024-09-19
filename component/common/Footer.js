import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import styled from 'styled-components/native';

const Footer = () => {
  const navigation = useNavigation();
  const routeName = useNavigationState((state) => state?.routes[state.index]?.name);
  const [selectedItem, setSelectedItem] = useState('home');

  useEffect(() => {
    console.log(routeName);
    if (routeName === 'main' ||
      routeName === 'photoChallenge' ||
      routeName === 'community' ||
      routeName === 'pointStore' ||
      routeName === 'mypage') {
      setSelectedItem(routeName);
    }
  }, [routeName]);

  const handlePress = (item) => {
    setSelectedItem(item);

    switch (item) {
      case 'main':
        navigation.navigate('main');
        break;
      case 'photoChallenge':
        navigation.navigate('photoChallenge');
        break;
      case 'community':
        navigation.navigate('community');
        break;
      case 'pointStore':
        navigation.navigate('pointStore');
        break;
      case 'mypage':
        navigation.navigate('mypage');
        break;
    }
  };

  return (
    <FooterContainer>
      <FooterItem activeOpacity={0.7} onPress={() => handlePress('main')}>
        <FooterImg
          source={
            selectedItem === 'main'
              ? require('../../assets/icon-home-selected.png') // 선택된 경우
              : require('../../assets/home-01.png')
          }
          selected={selectedItem === 'main'}
        />
        <FooterItemText isSelected={selectedItem === 'main'}>홈</FooterItemText>
      </FooterItem>
      <FooterItem activeOpacity={0.7} onPress={() => handlePress('photoChallenge')}>
        <FooterImg
          source={
            selectedItem === 'photoChallenge'
              ? require('../../assets/icon-challenge-selected.png') // 선택된 경우
              : require('../../assets/image-02.png')
          }
          selected={selectedItem === 'photoChallenge'}
        />
        <FooterItemText isSelected={selectedItem === 'photoChallenge'}>
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
          selected={selectedItem === 'community'}
        />
        <FooterItemText isSelected={selectedItem === 'community'}>
          커뮤니티
        </FooterItemText>
      </FooterItem>
      <FooterItem activeOpacity={0.7} onPress={() => handlePress('pointStore')}>
        <FooterImg
          source={
            selectedItem === 'pointStore'
              ? require('../../assets/icon-gift-selected.png') // 선택된 경우
              : require('../../assets/gift-01.png')
          }
          selected={selectedItem === 'pointStore'}
        />
        <FooterItemText isSelected={selectedItem === 'pointStore'}>
          포인트상점
        </FooterItemText>
      </FooterItem>
      <FooterItem activeOpacity={0.7} onPress={() => handlePress('mypage')}>
        <FooterImg
          source={
            selectedItem === 'mypage'
              ? require('../../assets/icon-my-selected.png') // 선택된 경우
              : require('../../assets/user-02.png')
          }
          selected={selectedItem === 'mypage'}
        />
        <FooterItemText isSelected={selectedItem === 'mypage'}>
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
  font-family: Bold;
  margin-top: 8%;
  color: ${(props) => (props.isSelected ? '#CA7FFE' : '#000000')};
  opacity: ${(props) => (props.isSelected ? 1 : 0.3)};
`;

const FooterImg = styled.Image`
  width: 27px;
  height: 27px;
  resizemode: 'contain';
  opacity: ${(props) => (props.selected ? 1 : 0.3)};
`;
