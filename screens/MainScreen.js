import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  ActivityIndicator,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { fetchDefaultProfile, fetchLogin } from '../service/api';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../redux/user';

const MainScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({});
  const RegionList = ['인천 경기', '서울', '강원', '충청', '호남', '영남'];

  const images = {
    '인천 경기': require('../assets/inc.png'),
    서울: require('../assets/seo.png'),
    강원: require('../assets/gang.png'),
    충청: require('../assets/chung.png'),
    호남: require('../assets/jeon.png'),
    영남: require('../assets/gyeong.png'),
  };

  const getDefaultProfile = async () => {
    const result = await fetchDefaultProfile();

    dispatch(setUserProfile(result));
    setUserInfo(result);
  };

  const moveDetail = (region) => {
    navigation.navigate('MainRegionTabScreen', { initialRegion: region });
  };

  const onSearchSubmit = (searchText) => {
    navigation.navigate('MainSearchScreen', { query: searchText });
  };

  useEffect(() => {
    getDefaultProfile();
  }, []);

  return (
    <MainContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <StatusBar barStyle="light-content" backgroundColor="#CA7FFE" />
        <SearchContainer>
          <SearchContent>
            <SearchInput
              placeholder="어떤 여행지를 찾으세요?"
              onSubmitEditing={(e) => onSearchSubmit(e.nativeEvent.text)}
              placeholderTextColor={'#C4C7CE'}
            />
            <SearchIconImg source={require('../assets/icon-search-home.png')} />
          </SearchContent>
          <TouchableOpacity>
            <MapIconImg source={require('../assets/map-01.png')} />
          </TouchableOpacity>
        </SearchContainer>
        <Animated.View style={[styles.animatedSheet]}>
          <Animated.ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="always"
          >
            <HomeHeaderContainer>
              <HomeHeaderText>
                <Text style={{ fontWeight: 700 }}>
                  {userInfo?.profileNickname}님,
                </Text>{' '}
                트립처와 함께{'\n'}추억가득한 여행되세요!
              </HomeHeaderText>
            </HomeHeaderContainer>
            <View style={{ paddingTop: 16, paddingLeft: 24, paddingRight: 24 }}>
              <HomeHeaderSubText>어디로 여행가세요?</HomeHeaderSubText>

              <RegionContainer>
                {RegionList.map((region) => (
                  <RegionSubContainer
                    activeOpacity={0.5}
                    onPress={() => moveDetail(region)}
                    key={region}
                  >
                    <RegionNameText>{region}</RegionNameText>
                    {region === '서울' ? (
                      <SeoImage source={images[region]} />
                    ) : (
                      <RegionImage source={images[region]} />
                    )}
                  </RegionSubContainer>
                ))}
                <JejuContainer activeOpacity={0.5}>
                  <RegionNameText>제주</RegionNameText>
                  <JejuImage source={require('../assets/je.png')} />
                </JejuContainer>
              </RegionContainer>
            </View>
          </Animated.ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  animatedSheet: {
    maxHeight: '100%',
  },
  scrollView: {
    flexGrow: 1, // Changed from flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

const MainContainer = styled.View`
  background: #f7f7f8;
  height: 100%;
`;

const SearchContainer = styled.View`
  background-color: #ca7ffe;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
  align-items: center;
`;

const SearchContent = styled.View`
  display: flex;
  height: 52px;
  border-radius: 25px;
  background: #ffffff;
  flex-direction: row;
  padding: 8px 18px;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const MapIconImg = styled.Image`
  width: 30px;
  height: 30px;
  margin-left: 11px;
`;

const SearchIconImg = styled.Image`
  width: 22px;
  height: 22px;
  margin-left: 8px;
`;

const SearchInput = styled.TextInput`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

const HomeHeaderContainer = styled.View`
  padding: 18px 24px;
  background-color: #ffffff;
`;

const HomeHeaderText = styled.Text`
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 17px;
  margin-top: 10px;
`;

const HomeHeaderSubText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
`;

const RegionContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const RegionSubContainer = styled.TouchableOpacity`
  background-color: #ffffff;
  width: 31.5%;
  height: 151px;
  border-radius: 10px;
  margin-right: 6px;
  margin-bottom: 6px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const RegionNameText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`;

const RegionImage = styled.Image`
  height: 48px;
  object-fit: contain;
  margin-top: 20px;
`;

const SeoImage = styled.Image`
  height: 35px;
  object-fit: contain;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const JejuContainer = styled.TouchableOpacity`
  background-color: #ffffff;
  width: 98.5%;
  height: 100px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const JejuImage = styled.Image`
  height: 30px;
  object-fit: contain;
  margin-top: 15px;
`;
