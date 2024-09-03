import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Modal, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import {
	fetchCommunityDetail,
	fetchDeletePost,
	fetchSaveBookmark,
} from '../../service/api';

const SettingScreen = ({ route, navigation }) => {
	const [profileInfo, setProfileInfo] = useState({
		"profileNickname": "짱구",
		"profileImgName": "https://tripture.s3.ap-northeast-2.amazonaws.com/file/be_profile.jpg",
		"loginEmail": "user1@example.com"
	});

	const moveProfileEdit = () => {
		navigation.navigate('프로필 수정', { loginType: "self" });
	};

	const moveProfileDelete = () => {
		navigation.navigate('회원 탈퇴', { nickname: profileInfo.profileNickname });
	};

	return (
		<SettingScreenComponent>
			<SettingProfileContainer>
				<SettingHeaderProfileText>프로필</SettingHeaderProfileText>
				<SettingProfileSubContainer>
					<SettingProfileImage source={{ uri : profileInfo.profileImgName }} />
					<ProfileDetailContainer>
						<SettingProfileNickname>{profileInfo.profileNickname}</SettingProfileNickname>
						<SettingProfileEmail>{profileInfo.loginEmail}</SettingProfileEmail>
						<SettingProfileEditButton activeOpacity={0.7} onPress={moveProfileEdit}>
							<SettingProfileEditButtonText>프로필 수정</SettingProfileEditButtonText>
							<SettingProfileEditButtonImage source={require('../../assets/gray-chevron-right.png')} />
						</SettingProfileEditButton>
					</ProfileDetailContainer>
				</SettingProfileSubContainer>
			</SettingProfileContainer>

			<SettingCategoryContainer>
				<SettingHeaderText>문의</SettingHeaderText>
				<SettingCategorySubContainer activeOpacity={0.5}>
					<SettingCategoryText>문의하기</SettingCategoryText>
				</SettingCategorySubContainer>
			</SettingCategoryContainer>

			<SettingCategoryContainer>
				<SettingHeaderText>앱 정보</SettingHeaderText>
				<SettingCategorySubContainer activeOpacity={1} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
					<SettingCategoryText>버전 정보</SettingCategoryText>
					<SettingCategoryText>v1.0.0</SettingCategoryText>
				</SettingCategorySubContainer>
			</SettingCategoryContainer>

			<SettingCategoryContainer>
				<SettingHeaderText>약관 및 정책</SettingHeaderText>
				<SettingCategorySubContainer activeOpacity={0.5}>
					<SettingCategoryText>서비스 이용약관</SettingCategoryText>
				</SettingCategorySubContainer>
				<SettingCategorySubContainer activeOpacity={0.5}>
					<SettingCategoryText>개인정보 처리방침</SettingCategoryText>
				</SettingCategorySubContainer>
			</SettingCategoryContainer>

			<SettingCategoryContainer>
				<SettingHeaderText>계정 정보</SettingHeaderText>
				<SettingCategorySubContainer activeOpacity={0.5}>
					<SettingCategoryText>로그아웃</SettingCategoryText>
				</SettingCategorySubContainer>
				<SettingCategorySubContainer activeOpacity={0.5} onPress={moveProfileDelete}>
					<SettingCategoryText>탈퇴하기</SettingCategoryText>
				</SettingCategorySubContainer>
			</SettingCategoryContainer>
		</SettingScreenComponent>
	);
};

export default SettingScreen;

const SettingScreenComponent = styled.View`
  background-color: #FFFFFF;
  height: 100%;
`;

const SettingProfileContainer = styled.View`
	padding: 24px;
`

const SettingHeaderProfileText = styled.Text`
	font-size: 24px;
	font-style: normal;
	font-weight: 500;
	margin-bottom: 28px;
`

const SettingProfileSubContainer = styled.View`
	display: flex;
	flex-direction: row;
`

const SettingProfileImage = styled.Image`
	width: 90px;
	height: 90px;
	border-radius: 80px;
	border: 5px solid #CA7FFE;
`

const ProfileDetailContainer = styled.View`
	margin-left: 16px;
`

const SettingProfileNickname = styled.Text`
	font-size: 24px;
	font-style: normal;
	font-weight: 500;
`

const SettingProfileEmail = styled.Text`
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	color: #7A7A7A;
	marging-bottom: 12px;
`

const SettingProfileEditButton = styled.TouchableOpacity`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 12px;
`

const SettingProfileEditButtonText = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	color: #7A7A7A;
	line-height: 18px;
`

const SettingProfileEditButtonImage = styled.Image`
	width: 20px;
	height: 20px;
	margin-left: 3px;
`

const SettingCategoryContainer = styled.View`
	border-bottom-width: 0.9px;
	border-bottom-color: #B5B5B5;
`

const SettingHeaderText = styled.Text`
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	color: #4F4F4F;
	padding: 12px 24px 0 24px;
`

const SettingCategorySubContainer = styled.TouchableOpacity`
	padding-top: 12px;
	padding-bottom: 12px;
	border-bottom-width: 1px;
	border-bottom-color: rgba(181, 181, 181, 0.5);
`

const SettingCategoryText = styled.Text`
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	color: #373737;
	padding-left: 24px;
	padding-right: 24px;
`

const VersionText = styled.Text``