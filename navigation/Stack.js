import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../screens/MapScreen';
import CommunityScreen from '../screens/CommunityScreen';
import CommunityDetail from '../screens/CommunityDetail';
import PointStoreScreen from '../screens/PointStoreScreen';
import PointStoreDetail from '../screens/PointStoreDetail';
import PhotoChallengeScreen from '../screens/PhotoChallengeScreen';
import PhotoChallengeDetail from '../screens/PhotoChallengeDetail';
import PhotoChallengeWrite from '../screens/PhotoChallengeWrite';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PointStorePaymentScreen from '../screens/PointStorePaymentScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const naviOption = ({ route }) => ({
    headerBackVisible: false,
    headerLeft: ({ onPress }) => (
      <PrevButton onPress={onPress}>
        <ButtonImage
          source={require('../assets/btn-back.png')}
          resizeMode="cover"
        />
      </PrevButton>
    ),
    headerTitle: ({ children }) => <Title>{children}</Title>,
    headerRight: ({ onPress }) => (
      <CloseButton onPress={onPress}>
        <ButtonImage
          source={require('../assets/btn-close.png')}
          resizeMode="cover"
        />
      </CloseButton>
    ),
    headerTitleAlign: 'center',
    headerShown: route.params?.headerVisible !== false,
  });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PointStorePaymentScreen"
        component={PointStorePaymentScreen}
        options={naviOption}
      />
      <Stack.Screen
        name="PointStore"
        component={PointStoreScreen}
        options={naviOption}
      />
      <Stack.Screen
        name="PointStoreDetail"
        component={PointStoreDetail}
        options={naviOption}
      />
      <Stack.Screen
        name="PhotoChallenge"
        component={PhotoChallengeScreen}
        options={naviOption}
      />
      <Stack.Screen
        name="PhotoChallengeDetail"
        component={PhotoChallengeDetail}
        options={naviOption}
      />
      <Stack.Screen
        name="PhotoChallengeWrite"
        component={PhotoChallengeWrite}
        options={naviOption}
      />
      <Stack.Screen
        name="community"
        component={CommunityScreen}
        options={naviOption}
      />
      <Stack.Screen
        name="communityDetail"
        component={CommunityDetail}
        options={naviOption}
      />
      <Stack.Screen
        name="map"
        component={MapScreen}
        options={naviOption}
        initialParams={{ headerVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const PrevButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

const ButtonImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.36px;
  color: #373737;
`;
