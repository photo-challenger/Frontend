import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components';
import {
  fetchPopularCommunityList,
  fetchSearchCommnunityRegion,
} from '../service/api';

const CommunityScreen = ({ route, navigation }) => {
  const [text, onChangeText] = useState('');
  const [challList, setchallList] = useState([]);

  useEffect(() => {
    getCommunityList();
  }, []);

  async function getCommunityList() {
    console.log('useEffect!!');
    const apiResponseData = await fetchPopularCommunityList({ page: 0 });
    console.log(' apiResponseData   :', apiResponseData);
    setchallList(apiResponseData?.popularCalculateDtoList);
  }

  async function searchRegion() {
    const apiResponseData = await fetchSearchCommnunityRegion({
      searchOne: '',
    });
    console.log(' apiResponseData   :', apiResponseData);
    setchallList(apiResponseData?.searchResponseList);
  }

  const moveDetail = () => {
    navigation.navigate('communityDetail');
  };

  return (
    <ListContainer>
      <SearchContent>
        <SearchIconImg
          source={require('../assets/icon-search.png')}
          onChangeText={onChangeText}
        />
        <SearchInput placeholder="어떤 여행지를 찾으세요?" />
      </SearchContent>

      <ImageListContainer>
        {challList.map((item) => (
          <ImageItem
            source={item.postImgName}
            onPress={moveDetail(item.postId)}
          />
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
  width: 30%;
  height: 102px;
  margin: 3px 1.5px;
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

  &::placeholder {
    color: #b5b5b5;
  }
`;
