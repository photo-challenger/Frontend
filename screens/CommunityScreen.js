import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import styled from 'styled-components';
import {
  fetchPopularCommunityList,
  fetchSearchCommnunityRegion,
} from '../service/api';

const { width } = Dimensions.get('window');
const itemWidth = width / 3 - 22.5;

const CommunityImageContainer = ({ item, navigation }) => {

  const moveDetail = (id) => {
    navigation.navigate('communityDetail', { postId: id });
  };

  return (
    <TouchableOpacity
      onPress={() => moveDetail(item.postId)}
    >
      <ImageItem source={{ uri: item.postImgName }} />
    </TouchableOpacity>
  )
}

const CommunityScreen = ({ route, navigation }) => {
  const [text, onChangeText] = useState('');
  const [challList, setchallList] = useState([]);
  const [startLoading, setStartLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (text === '') {
      handleSearchSubmit();
    }
  }, [text]);

  useEffect(() => {
    if (page === 0 && totalPage === 0 && challList.length === 0) {
      getData();
    }
  }, [page]);

  async function searchRegion() {
    handleSearchSubmit();
  }

  function handleSearchSubmit() {
    setPage(0);
    setTotalPage(0);
    setchallList([]);
  };

  const getData = async () => {
    try {
      if (page <= totalPage) {
        if (text !== "") {
          if (page === 0) {
            setStartLoading(true);
            const apiResponseData = await fetchSearchCommnunityRegion({
              searchOne: text,
              page: page,
            });
            setchallList(apiResponseData?.searchResponseList);
            setTotalPage(apiResponseData?.totalPages - 1);
          } else {
            setLoading(true);
            const apiResponseData = await fetchSearchCommnunityRegion({
              searchOne: text,
              page: page,
            });
            setchallList(prevList => [...prevList, ...apiResponseData?.searchResponseList]);
          }

          setPage(prevPage => prevPage + 1);
        } else {
          if (page === 0) {
            setStartLoading(true);
            const apiResponseData = await fetchPopularCommunityList({ page: page });
            setchallList(apiResponseData?.popularCalculateDtoList);
            setTotalPage(apiResponseData?.totalPages - 1);
          } else {
            setLoading(true);
            const apiResponseData = await fetchPopularCommunityList({ page : page });
            setchallList(prevList => [...prevList, ...apiResponseData?.popularCalculateDtoList]);
          }

          setPage(prevPage => prevPage + 1);
        }
      }
    } catch (error) {
      console.error('Failed to fetch region content:', error);
    } finally {
      setLoading(false);
      setStartLoading(false);
    }
  }

  const onEndReached = () => {
    if (!loading) {
      getData();
    }
  }

  return (
    <ListContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SearchContent>
        <SearchIconImg source={require('../assets/icon-search.png')} />
        <SearchInput
          placeholder="어떤 여행지를 찾으세요?"
          onChangeText={(text) => onChangeText(text)}
          onSubmitEditing={searchRegion}
          value={text}
        />
      </SearchContent>

      {startLoading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#CA7FFE" />
        </LoadingContainer>
      ) : (
        Array.isArray(challList) && challList.length != 0 ? (
            <ImageListContainer>
              <FlatList
                data={challList}
                renderItem={({ item }) => <CommunityImageContainer item={item} navigation={navigation} />}
                keyExtractor={(item, index) => item.postId.toString() + "-" + index}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.6}
                numColumns={3}
                ListFooterComponent={loading && (
                  <View style={{ padding: 10 }}>
                    <ActivityIndicator color="#CA7FFE" />
                  </View>
                )}
              />
            </ImageListContainer>
          ) : (
            <LoadingContainer>
              <Text style={{ color: "#858585", fontFamily: "Medium", fontSize: 15 }}>검색 결과가 존재하지 않습니다.</Text>
            </LoadingContainer>
          )
        )}
    </ListContainer>
  );
};

export default CommunityScreen;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const ListContainer = styled.View`
  display: flex;
  background: #fff;
  height: 100%;
`;
const ImageListContainer = styled.View`
  flex: 1;
  margin: 8px 24px;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const ImageItem = styled.Image`
  width: ${itemWidth}px;
  margin: 3px;
  border-radius: 8px;
  aspect-ratio: 1;
  background-color: #f0f0f0;
`;

const SearchContent = styled.View`
  display: flex;
  height: 40px;
  padding: 9px 0px 9px 20px;
  margin: 8px 24px;
  border-radius: 99px;
  background: #f2f3f7;
  flex-direction: row;
`;
const SearchIconImg = styled.Image`
  width: 20px;
  height: 20px;
`;
const SearchInput = styled.TextInput`
  padding-left: 10px;
  font-family: Regular;

  &::placeholder {
    color: #b5b5b5;
  }
`;
