import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components';

const PointStoreScreen = ({ route, navigation }) => {
  const [text, onChangeText] = useState('');
  const [itemList, setItemList] = useState([
    {"itemId": 2,
     "itemImgName": "https://tripture.s3.ap-northeast-2.amazonaws.com/file/be_item.png",
      "itemPrice": 2000,
      "itemName": "할머니 순대국 3000원 쿠폰",
      "itemPosition": "강원도 춘천시 어쩌구",
      "itemStock": 20},
      {"itemId": 1,
            "itemImgName": "https://tripture.s3.ap-northeast-2.amazonaws.com/file/be_item.png",
            "itemPrice": 1000,
            "itemName": "대둔산 케이블카 티켓 (왕복)",
            "itemPosition": "대둔산 어쩌구",
            "itemStock": 10}
  ]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('defalut');
  const [items, setItems] = useState([
    { label: '최신순', value: 'defalut' },
    { label: '조회순', value: 'viewCount' }
  ]);

  const moveDetail = (id) => {
    navigation.navigate('PointStoreDetail', { itemId: id });
  };

  return (
    <ListContainer>
      <SearchContent>
        <SearchIconImg source={require('../assets/icon-search.png')} />
        <SearchInput
          placeholder="원하시는 상품을 검색해 보세요!"
          onChangeText={(text) => onChangeText(text)}
        />
    </SearchContent>

    <ItemListHeader>
      <ItemListText>상품 리스트</ItemListText>
      <View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select an option"
          style={dropdownStyle}
          dropDownContainerStyle={dropdownContainerStyle}
          textStyle={textStyle}
          listMode="SCROLLVIEW"
          labelStyle={{ marginRight: -10 }}
          selectedItemLabelStyle={{ fontWeight: "bold", paddingLeft: 10 }}
          ArrowDownIconComponent={() => <ArrowIcon source={require('../assets/icon-dropdown.png')} />}
          ArrowUpIconComponent={() => <ArrowIcon source={require('../assets/icon-up.png')} />}
          TickIconComponent={() => null}
      />
      </View>
    </ItemListHeader>
      <View>
        {itemList && itemList.map((item) => (
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
              <ItemPrice>{new Intl.NumberFormat().format(item.itemPrice)}원</ItemPrice>
            </ItemDetails>
          </ItemContainer>
        ))}
      </View>
    </ListContainer>
  );
};

export default PointStoreScreen;

const ListContainer = styled.View`
  display: flex;
  background: #F7F7F8;
  height: 100%;
`;

const ItemContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  background-color: #FFFFFF;
  padding: 20px 24px;
`

const ImageItem = styled.Image`
  width: 30%;
  height: 112px;
  resizeMode: 'contain';
  border-radius: 8px;
  aspect-ratio: 1;
  background-color: #f0f0f0;
  margin-right: 5%;
`;

const ItemDetails = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ItemName = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`
const ItemAddress = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`
const ItemPrice = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`

const SearchContent = styled.View`
  display: flex;
  height: 40px;
  padding: 9px 0px 9px 20px;
  margin: 55px 24px 30px 24px;
  border-radius: 8px;
  background: #FFFFFF;
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

const ItemListHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px 24px;
`

const ItemListText = styled.Text`
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
`

const dropdownStyle = {
  minHeight: 32,
  width: 80,
  backgroundColor: '#85889914',
  borderWidth: 0,
  fontSize: 14,
  paddingVertical: 5, 
  paddingHorizontal: 8
};

const dropdownContainerStyle = {
  borderWidth: 0,
  backgroundColor: '#85889914',
  width: 80
};

const textStyle = {
  fontSize: 14,
  fontWeight: 500,
  color: '#7A7A7A',
  lineHeight: 20,
  textAlign: 'center'
};

const ArrowIcon = styled.Image`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`;
