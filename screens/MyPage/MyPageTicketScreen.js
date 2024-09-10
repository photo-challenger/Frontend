import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  fetchLogin,
  fetchMyTicketList,
  fetchMyUsedTicketList,
} from '../../service/api';

const Tab = createMaterialTopTabNavigator();

const TicketListComponent = ({ navigation }) => {
  const [itemList, setItemList] = useState([]);
  const getMyTicketList = async () => {
    const result = await fetchMyTicketList();
    // console.log('🚀 ~ result:', result);
    setItemList(result);
  };

  useEffect(() => {
    getMyTicketList();
  }, []);

  const moveDetail = (id) => {
    navigation.navigate('MyPageTicketUseScreen', { purchaseId: id });
  };

  return (
    <MyPageTicketComponent>
      {itemList.length !== 0 ? (
        <TicketListViewComponent>
          {itemList.map((item) => (
            <TicketListItem
              key={item.purchaseId}
              disabled={false}
              onPress={() => moveDetail(item.purchaseId)}
            >
              <TicketListDetailComponent>
                <TicketListItemDetailName>
                  {item.itemName}
                </TicketListItemDetailName>
                <TicketListItemDetailAddress>
                  {item.itemPosition}
                </TicketListItemDetailAddress>
              </TicketListDetailComponent>
              <TicketListLeftIcon
                source={require('../../assets/chevron-left.png')}
              />
            </TicketListItem>
          ))}
        </TicketListViewComponent>
      ) : (
        <TicketListViewComponent>
          <TicketListNotExistText>
            아직 구매한 티켓이 없어요{'\n'}
            포인트를 이용해서{'\n'}
            티켓을 구매해보세요.
          </TicketListNotExistText>
          <TicketListNotExistButton activeOpacity={0.9}>
            <TicketListNotExistButtonText>
              티켓 사러가기
            </TicketListNotExistButtonText>
          </TicketListNotExistButton>
        </TicketListViewComponent>
      )}
    </MyPageTicketComponent>
  );
};
const goToBuyTicket = () => {
  console.log('여기요');
  navigation.navigate('pointStore');
};

const UseTicketComponent = () => {
  const [itemUsedList, setItemList] = useState([]);
  const getMyTicketList = async () => {
    const result = await fetchMyUsedTicketList();
    // console.log('🚀 ~ result:', result);
    setItemList(result);
  };
  useEffect(() => {
    getMyTicketList();
  }, []);

  return (
    <MyPageTicketComponent>
      {itemUsedList.length !== 0 ? (
        <TicketListViewComponent>
          {itemUsedList.map((item) => (
            <TicketListItem
              key={item.purchaseId}
              disabled={true}
              activeOpacity={1}
            >
              <TicketListDetailComponent>
                <TicketListItemDetailName>
                  {item.itemName}
                </TicketListItemDetailName>
                <TicketListItemDetailAddress>
                  {item.itemPosition}
                </TicketListItemDetailAddress>
              </TicketListDetailComponent>
              <TicketListLeftIcon
                source={require('../../assets/chevron-left.png')}
              />
            </TicketListItem>
          ))}
        </TicketListViewComponent>
      ) : (
        <TicketListViewComponent>
          <TicketListNotExistText>
            아직 사용된 티켓이 없어요{'\n'}
            포인트를 이용해서{'\n'}
            티켓을 구매해보세요.
          </TicketListNotExistText>
          <TicketListNotExistButton
            activeOpacity={0.9}
            onPress={() => navigation.navigate('pointStore')}
          >
            <TicketListNotExistButtonText>
              티켓 사러가기
            </TicketListNotExistButtonText>
          </TicketListNotExistButton>
        </TicketListViewComponent>
      )}
    </MyPageTicketComponent>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <TabListContainer>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <TabListFirstView key={index} onPress={onPress} isFocused={isFocused}>
            <TabListFirstText isFocused={isFocused}>{label}</TabListFirstText>
          </TabListFirstView>
        );
      })}
    </TabListContainer>
  );
};

const MyPageTicketScreen = ({ route, navigation }) => {
  return (
    <MyPageTicketComponent>
      {/* tab List */}
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: '#000000', // 선택된 탭 아래의 Indicator 색상
            height: 3, // Indicator 높이
          },
        }}
      >
        <Tab.Screen name="티켓 리스트" component={TicketListComponent} />
        <Tab.Screen name="사용완료 티켓" component={UseTicketComponent} />
      </Tab.Navigator>
    </MyPageTicketComponent>
  );
};

export default MyPageTicketScreen;

const MyPageTicketComponent = styled.View`
  background-color: #f7f7f8;
  height: 100%;
  flex: 1;
`;
const TabListContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  padding-left: 24px;
`;

const TabListFirstView = styled.TouchableOpacity`
  margin-right: 20px;
  border-bottom-width: 2px;
  padding-bottom: 4px;
  border-bottom-color: ${(props) => (props.isFocused ? '#000000' : '#ADADAE')};
`;

const TabListFirstText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  color: ${(props) => (props.isFocused ? '#000000' : '#ADADAE')};
`;

/* 티켓 리스트 */
const TicketListViewComponent = styled.View`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TicketListItem = styled.TouchableOpacity`
  width: 88%;
  background-color: #ffffff;
  padding: 21px 5px;
  border-radius: 8px;
  margin-top: 8px;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TicketListDetailComponent = styled.View``;

const TicketListItemDetailName = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
`;

const TicketListItemDetailAddress = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-top: 6px;
`;

const TicketListLeftIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

/* 티켓 리스트 존재하지 않을 경우 */
const TicketListNotExistText = styled.Text`
  text-align: center;
  color: #b3b3b3;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-top: 25%;
`;

const TicketListNotExistButton = styled.TouchableOpacity`
  height: 40px;
  width: 30%;
  justify-content: center;
  align-items: center;
  background-color: #4f4f4f;
  margin: 0 auto;
  margin-top: 15%;
  border-radius: 8px;
`;

const TicketListNotExistButtonText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  line-height: 40px;
`;
