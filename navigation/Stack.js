import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import MapScreen from '../screens/MapScreen';
import CommunityScreen from '../screens/CommunityScreen';
import CommunityDetail from '../screens/CommunityDetail';
import PointStoreScreen from '../screens/PointStoreScreen';
import PointStoreDetail from '../screens/PointStoreDetail';
import PhotoChallengeScreen from '../screens/PhotoChallengeScreen';
import PhotoChallengeDetail from '../screens/PhotoChallengeDetail';
import PhotoChallengeWrite from '../screens/PhotoChallengeWrite';
import ReportScreen from '../screens/report/ReportScreen';
import PointStorePaymentScreen from '../screens/PointStorePaymentScreen';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  const defaultHeaderLeft = () => (
    <PrevButton onPress={() => navigation.goBack()}>
      <ButtonImage
        source={require('../assets/btn-back.png')}
        resizeMode="cover"
      />
    </PrevButton>
  );

  const defaultHeaderRight = () => (
    <CloseButton onPress={() => navigation.goBack()}>
      <ButtonImage
        source={require('../assets/btn-close.png')}
        resizeMode="cover"
      />
    </CloseButton>
  );

  const naviOption = ({
    headerVisible,
    headerLeftVisible,
    headerRightVisible,
  }) => ({
    headerBackVisible: false,
    headerTitle: ({ children }) => <Title>{children}</Title>,
    headerTitleAlign: 'center',
    headerShown: headerVisible !== false, // 기본값 true
    headerLeft: headerLeftVisible === false ? null : defaultHeaderLeft, // headerLeft visible 여부
    headerRight: headerRightVisible === false ? null : defaultHeaderRight, // headerRight visible 여부
  });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="pointStore"
        component={PointStoreScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: false,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="pointStorePayment"
        component={PointStorePaymentScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
      />

      <Stack.Screen
        name="pointStoreDetail"
        component={PointStoreDetail}
        options={() => ({
          ...naviOption({
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="photoChallenge"
        component={PhotoChallengeScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: false,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="photoChallengeDetail"
        component={PhotoChallengeDetail}
        options={() => ({
          ...naviOption({
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="photoChallengeWrite"
        component={PhotoChallengeWrite}
        options={() => ({
          ...naviOption({
            headerLeftVisible: false,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="community"
        component={CommunityScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: false,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="communityDetail"
        component={CommunityDetail}
        options={() => ({
          ...naviOption({
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
      />
      <Stack.Screen
        name="map"
        component={MapScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: true,
            headerRightVisible: false,
          }),
        })}
        initialParams={{ headerVisible: false }}
      />
      <Stack.Screen
        name="report"
        component={ReportScreen}
        options={() => ({
          ...naviOption({
            headerLeftVisible: false,
            headerRightVisible: true,
          }),
        })}
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
