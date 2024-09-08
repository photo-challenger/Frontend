import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components';
import ScrollWrapper from '../component/common/ScrollWrapper';
import {
  fetchLogin_before,
  fetchPointStoreList,
  fetchSearchPointStoreList,
} from '../service/api';

const PointStoreScreen = ({ route, navigation }) => {
  const [itemList, setItemList] = useState([]);

  const [open, setOpen] = useState(false);
  const [sortingValue, setSortingValue] = useState('itemViewCount');
  const [sortingItems, setSortingItems] = useState([
    { label: '최신순', value: 'itemDate' },
    { label: '조회순', value: 'itemViewCount' },
  ]);
  const [pageNo, setPageNo] = useState(0);
  const [totPageCnt, setTotPageCnt] = useState(null);
  const [searchStr, setSearchStr] = useState('');

  const moveDetail = (id) => {
    navigation.navigate('pointStoreDetail', { itemId: id });
  };

  const getPointStoreList = async (pageNum) => {
    setPageNo(pageNum);
    let sendData = {
      page: pageNo,
      criteria: sortingValue,
    };
    let resultData = {};
    let resultList = [];

    if (searchStr === '') {
      const a = await fetchLogin_before();
      console.log('🚀 ~ getPointStoreList ~ a:', a);
      resultData = await fetchPointStoreList(sendData);
      resultList = resultData.itemList;
    } else {
      sendData['searchOne'] = encodeURIComponent(searchStr);
      resultData = await fetchSearchPointStoreList(sendData);
      resultList = resultData.searchResponseList;
    }

    console.log('pageNo  >> ', pageNo);
    console.log('resultList  >> ', resultList);

    if (pageNo == 0) {
      setItemList(resultList);
      setTotPageCnt(resultData.totalPages);
    } else {
      setItemList(resultList.concat(itemList));
    }
  };

  const changeSorting = (val) => {
    setSortingItems(val);
    getPointStoreList(0);
  };

  // 입력시 즉시 조회
  const onInputSearchText = (str) => {
    console.log('onInputSearchText : ', str);
    setSearchStr(str);
  };

  // searchStr가 변경될 때마다 getPointStoreList 호출
  useEffect(() => {
    if (searchStr !== '') {
      getPointStoreList(0);
      console.log('searchStr : ', searchStr); // 업데이트된 searchStr 값
    } else {
      // fetchLogin();
      getPointStoreList(0);
    }
  }, [searchStr]);

  return (
    <Container>
      <SearchContent>
        <SearchIconImg source={require('../assets/icon-search.png')} />
        <SearchInput
          placeholder="원하시는 상품을 검색해 보세요!"
          onChangeText={onInputSearchText}
        />
      </SearchContent>

      <ItemListHeader>
        <ItemListText>상품 리스트</ItemListText>
        <View>
          <DropDownPicker
            open={open}
            value={sortingValue}
            items={sortingItems}
            setOpen={setOpen}
            setValue={setSortingValue}
            setItems={changeSorting}
            placeholder="Select an option"
            style={dropdownStyle}
            dropDownContainerStyle={dropdownContainerStyle}
            textStyle={textStyle}
            listMode="SCROLLVIEW"
            labelStyle={{ marginRight: -10 }}
            selectedItemLabelStyle={{ fontWeight: 'bold', paddingLeft: 10 }}
            ArrowDownIconComponent={() => (
              <ArrowIcon source={require('../assets/icon-dropdown.png')} />
            )}
            ArrowUpIconComponent={() => (
              <ArrowIcon source={require('../assets/icon-up.png')} />
            )}
            TickIconComponent={() => null}
          />
        </View>
      </ItemListHeader>
      <ScrollWrapper
        loadMoreData={getPointStoreList}
        totalPageNo={totPageCnt}
        currPageNo={pageNo}
      >
        <ListContainer>
          {itemList &&
            itemList.map((item) => (
              <ItemContainer
                key={item.itemId}
                onPress={() => moveDetail(item.itemId)}
              >
                <ImageItem source={{ uri: item.itemImgName }} />
                <ItemDetails>
                  <View>
                    <ItemName>{item.itemName}</ItemName>
                    <ItemAddress>{item.itemPosition}</ItemAddress>
                  </View>
                  <ItemPrice>
                    {new Intl.NumberFormat().format(item.itemPrice)}원
                  </ItemPrice>
                </ItemDetails>
              </ItemContainer>
            ))}
        </ListContainer>
      </ScrollWrapper>
    </Container>
  );
};

export default PointStoreScreen;

const Container = styled.View`
  display: flex;
  background: #f7f7f8;
  height: 100%;
`;

const ItemContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  padding: 20px 24px;
`;

const ImageItem = styled.Image`
  width: 30%;
  height: 112px;
  resizemode: 'contain';
  border-radius: 8px;
  aspect-ratio: 1;
  background-color: #f0f0f0;
  margin-right: 5%;
`;

const ItemDetails = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemName = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`;
const ItemAddress = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;
const ItemPrice = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`;

const SearchContent = styled.View`
  display: flex;
  height: 40px;
  padding: 9px 0px 9px 20px;
  margin: 55px 24px 30px 24px;
  border-radius: 8px;
  background: #ffffff;
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

const ListContainer = styled.View``;

const ItemListHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px 24px;
`;

const ItemListText = styled.Text`
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
`;

const dropdownStyle = {
  minHeight: 32,
  width: 80,
  backgroundColor: '#85889914',
  borderWidth: 0,
  fontSize: 14,
  paddingVertical: 5,
  paddingHorizontal: 8,
};

const dropdownContainerStyle = {
  borderWidth: 0,
  backgroundColor: '#85889914',
  width: 80,
};

const textStyle = {
  fontSize: 14,
  fontWeight: 500,
  color: '#7A7A7A',
  lineHeight: 20,
  textAlign: 'center',
};

const ArrowIcon = styled.Image`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`;
