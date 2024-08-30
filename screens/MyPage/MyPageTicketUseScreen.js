import React, { useState, useEffect } from 'react';
import { Modal, View, Image, ActivityIndicator, Text } from 'react-native';
import styled from 'styled-components/native';
import useConfirm from '../../hooks/useConfirm';

const MyPageTicketUseScreen = ({ route, navigation }) => {
	const [item, setItem] = useState(
		{
			"itemImgName": "https://tripture.s3.ap-northeast-2.amazonaws.com/file/be_item.png",
			"itemName": "짱구 초코비",
			"itemPosition": "초코비시 떡잎마을동 짱구네 집",
			"purchaseCount": 1,
			"purchaseCheck": true
		}
	);
	const [showConfirm, ConfirmComponent] = useConfirm();
	const [useCheck, setUseCheck] = useState(false);

	useEffect(() => {
		navigation.setOptions({ headerTitle: item.itemName });
	}, [navigation]);

	const useTicket = () => {
    // 삭제하시겠습니까?
    showConfirm({
			title: "잠시만요!",
      msg: 
				<Text>정말 티켓을 사용하시겠습니까?{"\n"} 사용된 티켓은{" "}
					<Text style={{color: "#CA7FFE"}}>환불</Text>이 불가합니다.
				</Text>,
			cancelText: '취소',
			okText: "사용할게요",
			onOk: async function () {
        // 티켓 사용 API 호출
				setUseCheck(true);
      },
    });
  };

	return (
		<MyPageTicketUseContainer>
			<TicketContainer>
				<TicketImage source={{ uri : item.itemImgName }}></TicketImage>
				<TicketDetailContainer>
					<TicketDetailSubContainer>
						<TicketName>{item.itemName}</TicketName>
						<TicketAddress>{item.itemPosition}</TicketAddress>
					</TicketDetailSubContainer>
					<TicketCount>{item.purchaseCount}매</TicketCount>
				</TicketDetailContainer>
				{useCheck ? (
					<TicketUseButton style={{backgroundColor: "#B5B5B5"}} activeOpacity={1}>
						<TicketUseButtonText>사용완료</TicketUseButtonText>
					</TicketUseButton>
				) :
				(
					<TicketUseButton activeOpacity={0.9} onPress={useTicket}>
						<TicketUseButtonText>사용하기</TicketUseButtonText>
						</TicketUseButton>
				)}
			</TicketContainer>
			<View>
				<AnnouncementText>꼭 확인해주세요.</AnnouncementText>
				<AnnouncementSubText>
					입장시 화면을 직원에게 보여주세요.{'\n'}
					사용하기 버튼을 누르면 환불이 어렵습니다.
				</AnnouncementSubText>
			</View>

			<ConfirmComponent />
		</MyPageTicketUseContainer>
	);
};

export default MyPageTicketUseScreen;

const MyPageTicketUseContainer = styled.View`
  background: #F7F7F8;
  height: 100%;
  flex: 1;
	flex-direction: column;
  align-items: center;
	justify-content: center;
`;

const TicketContainer = styled.View`
	width: 88%;
	height: 77%;
	background-color: #FFFFFF;
	border-radius: 12px;
`

const TicketDetailSubContainer = styled.View`
`

const TicketImage = styled.Image`
	width: 100%;
	height: 55%;
	border-radius: 12px 12px 0 0;
`

const TicketDetailContainer = styled.View`
	padding: 20px;
`

const TicketName = styled.Text`
	font-size: 22px;
	font-style: normal;
	font-weight: 700;
`

const TicketAddress = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
`

const TicketCount = styled.Text`
	font-size: 24px;
	font-style: normal;
	font-weight: 500;
	color: #CA7FFE;
	margin-top: 24px;
`

const TicketUseButton = styled.TouchableOpacity`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 13.2%;
	border-radius: 0 0 12px 12px;
	background-color: #4F4F4F;
	justify-content: center;
	align-items: center;
`

const TicketUseButtonText = styled.Text`
	color: #FFFFFF;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
`

const AnnouncementText = styled.Text`
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	color: #7A7A7A;
	margin-top: 26px;
	margin-bottom: 12px;
	text-align: center;
`

const AnnouncementSubText = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	color: #7A7A7A;
	text-align: center;
`