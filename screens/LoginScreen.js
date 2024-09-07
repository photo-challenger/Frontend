import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Modal, View, Image, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/user';
import styled from 'styled-components/native';
import {
	fetchCommunityDetail,
	fetchDeletePost,
	fetchSaveBookmark,
	fetchPopularCommunityList,
	fetchLogin
} from '../service/api';
import useAlert from '../hooks/useAlert';

const LoginScreen = ({ route, navigation }) => {
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [showAlert, AlertComponent] = useAlert();
	const dispatch = useDispatch();

	const [checkBoxValue, setCheckBoxValue] = useState(false);
	const toggleCheckBox = () => {
		setCheckBoxValue(!checkBoxValue);
	};

	const CheckBox = (props) => {
		return (
			<CheckBoxContainer checkBoxValue={checkBoxValue} onPress={toggleCheckBox}>
				{props.checkBoxValue === true ? <CheckBoxIconImage source={require('../assets/check.png')} /> : null}
			</CheckBoxContainer>
		);
	};

	const handleLoginFetch = async () => {
		const response = await fetchLogin(userEmail, userPassword, checkBoxValue);

		if (response === '존재하지 않는 이메일입니다.' || response === '비밀번호가 맞지 않습니다.') {
			showAlert({
				title: "로그인 오류",
				msg: response,
				onOk: async function () {
					navigation.goBack();
				}
			});
		} else {
			dispatch(login({ sessionId: response }));
			navigation.navigate('MainScreen');
		}
	}

	const moveSignUp = (id) => {
		navigation.navigate('SignUpScreen');
	};

	return (
		<LoginContainer>
			<LogoImageContainer>
				<LoginLogoImage source={require('../assets/tripture.png')} />
			</LogoImageContainer>
			<EmailText>이메일</EmailText>
			<SearchContent>
				<SearchInput
					placeholder="이메일을 입력해주세요."
					onChangeText={(text) => setUserEmail(text)}
					placeholderTextColor={"#B5B5B5"}
				/>
			</SearchContent>

			<EmailText>비밀번호</EmailText>
			<SearchContent>
				<SearchInput
					placeholder="비밀번호를 입력해주세요."
					placeholderTextColor={"#B5B5B5"}
					onChangeText={(text) => setUserPassword(text)}
					secureTextEntry={true}
				/>
			</SearchContent>

			<AutoLoginCheckBoxContainer>
				<CheckBox checkBoxValue={checkBoxValue} />
				<AutoLoginText>자동 로그인</AutoLoginText>
			</AutoLoginCheckBoxContainer>
			<LoginButton activeOpacity={0.8} onPress={handleLoginFetch}>
				<LoginButtonText>로그인</LoginButtonText>
			</LoginButton>

			<SubButtonContainer>
				<SubButton activeOpacity={0.8}>
					<SubButtonText>아이디 찾기</SubButtonText>
				</SubButton>
				<SubButton activeOpacity={0.8}>
					<SubButtonText>비밀번호 찾기</SubButtonText>
				</SubButton>
			</SubButtonContainer>

			<KakaoButton activeOpacity={0.5}>
				<KakaoButtonText>카카오 로그인 하기</KakaoButtonText>
			</KakaoButton>
			<SignUpButton activeOpacity={0.5} onPress={moveSignUp}>
				<KakaoButtonText>회원가입</KakaoButtonText>
			</SignUpButton>

			<NoticeTextContainer>
				<NoticeText>로그인 시 {' '}</NoticeText>
				<TermsOfUseButton><TermsOfUseButtonText>이용약관</TermsOfUseButtonText></TermsOfUseButton><NoticeText>과{' '}</NoticeText>
				<TermsOfUseButton><TermsOfUseButtonText>개인정보처리방침</TermsOfUseButtonText></TermsOfUseButton>
				<NoticeText>에 동의하게 됩니다.</NoticeText>
			</NoticeTextContainer>
		</LoginContainer>
	);
};

export default LoginScreen;

const LoginContainer = styled.View`
  background: #fff;
  padding: 20px;
  height: 100%;
`;

const LogoImageContainer = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
	margin-top: 84px;
	margin-bottom: 76px;
`

const LoginLogoImage = styled.Image`
  width: 242.274px;
	height: 88.577px;
`

const EmailText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
	color: #5F5F5F;
`
const SearchContent = styled.View`
  display: flex;
  height: 40px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #DEDEDE;
	margin-top: 4px;
	margin-bottom: 28px;
`;

const SearchInput = styled.TextInput`
	padding-top: 9px;
	padding-bottom: 9px;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
`;

const AutoLoginCheckBoxContainer = styled.View`
	display: flex;
	flex-direction: row;
`

const CheckBoxContainer = styled.TouchableOpacity`
	border: 1.5px solid ${(props) => props.checkBoxValue ? "#CA7FFE" : "#B5B5B5"};
	width: 24px;
	height: 24px;	
	border-radius: 5px;
	background-color: ${(props) => props.checkBoxValue ? "#CA7FFE" : "#FFFFFF"};
	align-items: center;
	justify-content: center;
`

const CheckBoxIconImage = styled.Image`
	width: 18px;
	height: 18px;
`

const AutoLoginText = styled.Text`
	color: #B5B5B5;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	margin-left: 6px;
`

const LoginButton = styled.TouchableOpacity`
	margin-top: 22px;
	background-color: #4F4F4F;
	height: 40px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
`

const LoginButtonText = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	color: #FFFFFF;
`

const SubButtonContainer = styled.View`
	display: flex;
	flex-direction: row;
	margin-top: 14px;
	justify-content: flex-end;
`

const SubButton = styled.TouchableOpacity`
	margin-left: 24px;
`

const SubButtonText = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	color: #4F4F4F;
`

const KakaoButton = styled.TouchableOpacity`
	height: 40px;
	background-color: #FEE500;
	border-radius: 8px;
	margin-top: 20px;
	align-items: center;
	justify-content: center;
`

const KakaoButtonText = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
`

const SignUpButton = styled.TouchableOpacity`
	height: 40px;
	background-color: #F7F7F8;
	border-radius: 8px;
	margin-top: 8px;
	align-items: center;
	justify-content: center;
	margin-bottom: 85px;
`

const NoticeTextContainer = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
`

const NoticeText = styled.Text`
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	color: #B5B5B5;
`

const TermsOfUseButton = styled.TouchableOpacity`
	border-bottom-width: 1px;
  border-bottom-color: #DEDEDE;
	padding-bottom: 2px;
`

const TermsOfUseButtonText = styled.Text`
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	color: #B5B5B5;
`