import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components';
import {
  fetchPopularCommunityList,
  fetchSearchCommnunityRegion,
} from '../service/api';

const { width } = Dimensions.get('window');
const itemWidth = width / 3 - 22.5;

const CommunityScreen = ({ route, navigation }) => {
  const [text, onChangeText] = useState('');
  const [challList, setchallList] = useState([]);

  useEffect(() => {
    getCommunityList();
  }, []);

  async function getCommunityList() {
    const apiResponseData = await fetchPopularCommunityList({ page: 0 });
    console.log(' apiResponseData   :', apiResponseData);
    setchallList(apiResponseData?.popularCalculateDtoList);
  }

  async function searchRegion() {
    console.log('text  : ', text);
    const apiResponseData = await fetchSearchCommnunityRegion({
      searchOne: text,
    });

    console.log(' apiResponseData   :', apiResponseData);

    setchallList(apiResponseData?.searchResponseList);
  }

  const moveDetail = (id) => {
    navigation.navigate('communityDetail', { postId: id });
  };

  return (
    <ListContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SearchContent>
        <SearchIconImg source={require('../assets/icon-search.png')} />
        <SearchInput
          placeholder="어떤 여행지를 찾으세요?"
          onChangeText={(text) => onChangeText(text)}
          onSubmitEditing={searchRegion}
        />
      </SearchContent>

      <ImageListContainer>
        {challList &&
          challList.map((item) => (
            <TouchableOpacity
              key={item.postId}
              onPress={() => moveDetail(item.postId)}
            >
              <ImageItem source={{ uri: item.postImgName }} />
            </TouchableOpacity>
          ))}
      </ImageListContainer>
    </ListContainer>
  );
};

export default CommunityScreen;

const ListContainer = styled.View`
  display: flex;
  background: #fff;
  height: 100%;
`;
const ImageListContainer = styled.View`
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
