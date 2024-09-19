import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StatusBar, StyleSheet, KeyboardAvoidingView, Text, View, Image, ActivityIndicator, Platform, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  fetchAreaBasedList,
} from '../service/api';

const Tab = createMaterialTopTabNavigator();

const RegionItemComopnent = React.memo(({ navigation, item }) => {
  const moveDetail = (id) => {
    navigation.navigate('MainDetailScreen', { contentId: id });
  };

  return (
    <RegionItemContainer activeOpacity={0.6} onPress={() => moveDetail(item.contentid)}>
      {item.firstimage === '' ? (<RegionImage source={require('../assets/tripture-no-content.png')}/>) 
      : (<RegionImage source={{ uri: item.firstimage }} />)}
      <RegionTextContainer>
        <View style={{ maxWidth: '90%' }}>
          <RegionName numberOfLines={1} ellipsizeMode="tail">{item.title}</RegionName>
          <RegionAddress numberOfLines={1} ellipsizeMode="tail">{item.addr1}</RegionAddress>
        </View>
      </RegionTextContainer>
    </RegionItemContainer>
  )
});

const RegionComponent = ({ route, navigation }) => {
  const [regionContentList, setRegionContentList] = useState([]);
  const [startLoading, setStartLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [page, setPage] = useState(2);
  const [totalPage, setTotalPage] = useState(0);
  const { region } = route.params;

  useFocusEffect(
    useCallback(() => {
      if (hasLoaded) return;

      const getRegionContent = async () => {
        try {
          setStartLoading(true);
          const apiResponseData = await fetchAreaBasedList(region, 1);
          setRegionContentList(apiResponseData.items.item);
          setTotalPage(Math.ceil(apiResponseData.totalCount / apiResponseData.numOfRows));
        } catch (error) {
          console.error('Failed to fetch region content:', error);
        } finally {
          setStartLoading(false);
          setLoading(false);
          setHasLoaded(true);
        }
      };

      getRegionContent();
    }, [region, hasLoaded])
  );

  const getData = async () => {
    try {
      if (page <= totalPage) {
        setLoading(true);
        const apiResponseData = await fetchAreaBasedList(region, page);
        setRegionContentList(prevList => [...prevList, ...apiResponseData.items.item]);
        setPage(prevPage => prevPage + 1);
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch region content:', error);
    }
  }

  const onEndReached = () => {
    if (!loading) {
      getData();
    }
  }

  if (startLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#CA7FFE" />
      </LoadingContainer>
    );
  }

  return (
    <RegionContainer>
      <FlatList
        data={regionContentList}
        renderItem={({ item }) => <RegionItemComopnent item={item} navigation={navigation} />}
        keyExtractor={(item) => item.contentid}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.6}
        style={styles.flatListStyle}
        ListFooterComponent={loading && (
          <View style={{ padding: 10 }}>
            <ActivityIndicator color="#CA7FFE" />
          </View>
        )}
      />
    </RegionContainer>
  );
}

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <TabListContainer>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row' }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title !== undefined ? options.title : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          return (
            <TabListFirstView
              key={index}
              onPress={onPress}
              isFocused={isFocused}
              activeOpacity={0.5}
            >
              <TabListFirstText isFocused={isFocused}>{label}</TabListFirstText>
            </TabListFirstView>
          );
        })}
      </ScrollView>
    </TabListContainer>
  );
};

const MainRegionTabScreen = ({ route, navigation }) => {
  const [bookmarkList, setBookmarkList] = useState();
  const RegionList = ['전체', '인천', '경기', '서울', '강원', '대전', '세종', '충청남도', '충청북도',
    '광주', '전라남도', '전북', '부산', '울산', '경상남도', '대구', '경상북도', '제주'];

  const initialRegionList = {
    "서울": "서울",
    "인천 경기": "인천",
    "강원": "강원",
    "충청": "대전",
    "호남": "광주",
    "영남": "부산",
    "제주": "제주"
  }

  const { initialRegion } = route.params || { initialRegion: '전체' };
  const paramsRegion = initialRegionList[initialRegion] || '전체';

  const onSearchSubmit = (searchText) => {
    // 검색 결과를 보여줄 새로운 화면으로 이동
    navigation.navigate('MainSearchScreen', { query: searchText });
  };

  return (
    <MainContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <StatusBar barStyle="light-content" backgroundColor="#CA7FFE" />
        <SearchContainer>
          <SearchContent>
            <SearchInput
              placeholder="어떤 여행지를 찾으세요?"
              onSubmitEditing={(e) => onSearchSubmit(e.nativeEvent.text)}
              placeholderTextColor={"#C4C7CE"}
            />
            <SearchIconImg source={require('../assets/icon-search-home.png')} />
          </SearchContent>
          {/* <TouchableOpacity>
            <MapIconImg source={require('../assets/map-01.png')} />
          </TouchableOpacity> */}
        </SearchContainer>
        <RegionTouristHeaderText>지역별 관광지</RegionTouristHeaderText>
        {/* tab List */}
        <Tab.Navigator
          initialRouteName={paramsRegion}
          tabBar={props => <CustomTabBar {...props} />}
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: '#000000', // 선택된 탭 아래의 Indicator 색상
              height: 3, // Indicator 높이
            },
          }}>
          {RegionList.map((region) => (
            <Tab.Screen key={region} name={region} component={RegionComponent} initialParams={{ region, bookmarkList }} />
          ))}
        </Tab.Navigator>

      </KeyboardAvoidingView>
    </MainContainer>
  );
};

export default MainRegionTabScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  animatedSheet: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1, // Changed from flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  flatListStyle: {
    padding: 24,
  }
});

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabListContainer = styled.View`
	display: flex;
	flex-direction: row;
	margin-top: 16px;
  padding-left: 12px;
  padding-right: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #CBCBCB;
`

const TabListFirstView = styled.TouchableOpacity`
	margin-left: 12px;
  margin-right: 12px;
	border-bottom-width: 2px;
	padding-bottom: 11px;
	border-bottom-color: ${(props) =>
    props.isFocused ? '#121212' : 'transparent'};
`

const TabListFirstText = styled.Text`
  font-family: ${(props) => (props.isFocused ? 'Bold' : 'Medium')};
	font-size: 16px;
  font-style: normal;
	color: #121212;
`

const MainContainer = styled.View`
  background: #F7F7F8;
  height: 100%;
`;

const SearchContainer = styled.View`
  background-color: #CA7FFE;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
  align-items: center;
`

const SearchContent = styled.View`
  display: flex;
  height: 52px;
  border-radius: 25px;
  background: #FFFFFF;
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
`

const SearchIconImg = styled.Image`
  width: 22px;
  height: 22px;
  margin-left: 8px;
`;

const SearchInput = styled.TextInput`
  font-family: Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

const RegionTouristHeaderText = styled.Text`
  font-family: Bold;
  font-size: 20px;
  font-style: normal;
  margin: 15px 0 18px 24px;
`

const RegionContainer = styled.View`
  flex: 1;
`

const RegionItemContainer = styled.TouchableOpacity`
  width: 100%;
  height: 208px;
  padding: 16px;
  background-color: #FFFFFF;
  border-radius: 12px;
  margin-bottom: 12px;
`;

const RegionTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RegionImage = styled.Image`
  height: 128px;
  width: 100%;
  border-radius: 8px;
`;

const RegionName = styled.Text`
  font-family: Bold;
  font-size: 16px;
  font-style: normal;
  margin-bottom: 1px;
  margin-top: 8px;
`;

const RegionAddress = styled.Text`
  font-family: Regular;
  font-size: 12px;
  font-style: normal;
  color: #A6A6A6;
`;

const BookmarkImage = styled.Image`
  width: 24px;
  height: 24px;
`;

