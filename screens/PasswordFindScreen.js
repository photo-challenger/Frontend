import React, { useState, useEffect } from 'react';
import { TextInput, KeyboardAvoidingView, Platform, StyleSheet, Modal, View, Image, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import {
	fetchEmailAuthSend,
	fetchEmailAuthCheck,
	fetchPasswordFind
} from '../service/api';
import useAlert from '../hooks/useAlert';

const PasswordFindScreen = ({ route, navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [userEmail, setUserEmail] = useState('');
	const [emailAuthNum, setEmailAuthNum] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [checkUserPassword, setCheckUserPassword] = useState('');

	const [emailIsValid, setEmailIsValid] = useState();
	const [emailValidText, setEmailValidText] = useState();
	const [emailAuthNumIsValid, setEmailAuthNumIsValid] = useState();
	const [passwordIsValid, setPasswordIsValid] = useState();
	const [checkPasswordIsValid, setCheckPasswordIsValid] = useState();
	const [showAlert, AlertComponent] = useAlert();

	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	useEffect(() => {
		if (userEmail !== '') {
			if (emailRegex.test(userEmail)) {
				setEmailIsValid(true);
			} else {
				setEmailValidText("이메일 형식이 맞지 않습니다.");
				setEmailIsValid(false);
			}
		}
	}, [userEmail]);

	useEffect(() => {
		if (checkUserPassword !== '') {
			setCheckPasswordIsValid(userPassword === checkUserPassword);
		}
	}, [checkUserPassword]);

	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
	useEffect(() => {
		if (userPassword !== '') {
			setPasswordIsValid(passwordRegex.test(userPassword));
		}
	}, [userPassword]);

	const handleEmailAuthSend = async () => {
		if (emailIsValid && userEmail) {
			setIsLoading(true);
			const response = await fetchEmailAuthSend(userEmail);

			if (response) {
				showAlert({
					title: "인증번호 전송 완료",
					msg: "회원님의 이메일로 인증번호가 전송되었습니다.",
				});
				setIsLoading(false);
			}
		} else {
			showAlert({
				title: "이메일 형식을 확인해 주세요.",
				msg: "ex) username@example.com",
			});
		}
	}

	const handleEmailAuthCheck = async () => {
		if (emailAuthNum) {
			setIsLoading(true);
			const response = await fetchEmailAuthCheck(userEmail, emailAuthNum);

			if (response === 'true') {
				setEmailAuthNumIsValid(true);
			} else {
				showAlert({
					title: "이메일 인증 오류",
					msg: response,
				});
			}
			setIsLoading(false);
		} else {
			showAlert({
				title: "인증번호를 입력해 주세요.",
				msg: "이메일로 발송해 드린 인증번호를 확인해 주세요.",
			});
		}
	}

	const fetchPasswordChange = async () => {
		if(passwordIsValid && checkPasswordIsValid) {
			setIsLoading(true);
			const response = await fetchPasswordFind(userPassword, userEmail);

			if (response === 'Successfully changed password') {
				showAlert({
					title: "비밀번호 변경 성공!",
					msg: "비밀번호 변경이 완료되었습니다.",
					onOk: async function () {
						setIsLoading(false);
						navigation.goBack();
					},
				});
			} else if (response === '존재하지 않는 이메일입니다.') {
				showAlert({
					title: "비밀번호 변경 오류",
					msg: "tripture에 가입이 되지 않은 이메일 입니다.",
					onOk: async function () {
						setUserEmail('');
						setEmailAuthNum('');
						setUserPassword('');
						setCheckUserPassword('');
						setEmailIsValid();
						setPasswordIsValid();
						setEmailAuthNumIsValid();
						setCheckPasswordIsValid();
						setIsLoading(false);
					},
				});
			}
		} else {
			showAlert({
				title: "비밀번호 변경 오류",
				msg: "비밀번호의 형식이 맞는지, 비밀번호가 동일한지 확인해 주세요."
			});
		}
	}

	return (
		<PasswordFindContainer>
			{isLoading && (
				<LoadingContainer>
					<ActivityIndicator size="large" color="#CA7FFE" />
				</LoadingContainer>
			)}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardAvoidingView}
			>
				<Animated.View
				>
					<Animated.ScrollView
						style={styles.scrollView}
						contentContainerStyle={styles.scrollViewContent}
						keyboardShouldPersistTaps="always"
					>
						<PasswordFindHeaderText>비밀번호 찾기</PasswordFindHeaderText>

						<EmailAuthHeaderText>tripture를 가입하셨던 이메일을 입력해 주세요.</EmailAuthHeaderText>

						<SignUpInputContainer>
							<InputLabelText>이메일</InputLabelText>
							<EmailAuthContainer>
								<EmailInputContent>
									<TextInput
										placeholder="이메일을 입력해주세요."
										placeholderTextColor={"#5F5F5F"}
										onChangeText={(text) => setUserEmail(text)}
										value={userEmail}
										style={{fontFamily: 'Regular'}}
									/>
									{emailIsValid !== undefined && emailIsValid !== null ? (
										emailIsValid ? (
											<InputImage source={require('../assets/signUp-check-icon.png')} />
										) : (
											<InputImage source={require('../assets/signUp-warning-icon.png')} />
										)
									) : null}
								</EmailInputContent>
								<EmailButton activeOpacity={0.6} onPress={handleEmailAuthSend}>
									<EmailButtonText>인증 받기</EmailButtonText>
								</EmailButton>
							</EmailAuthContainer>
						</SignUpInputContainer>


						<SignUpInputContainer>
							<InputLabelText>인증번호</InputLabelText>
							<EmailAuthContainer>
								<EmailAuthInputContent emailAuthNumIsValid={emailAuthNumIsValid}>
									<TextInput
										placeholder="인증번호를 입력해주세요."
										placeholderTextColor={"#5F5F5F"}
										onChangeText={(text) => setEmailAuthNum(text)}
										value={emailAuthNum}
										style={{fontFamily: 'Regular'}}
									/>
									{emailAuthNumIsValid !== undefined && emailAuthNumIsValid !== null ? (
										emailAuthNumIsValid ? (
											<InputImage source={require('../assets/signUp-check-icon.png')} />
										) : (
											<InputImage source={require('../assets/signUp-warning-icon.png')} />
										)
									) : null}
								</EmailAuthInputContent>
								<EmailButton activeOpacity={0.6} onPress={handleEmailAuthCheck}>
									<EmailButtonText>인증 확인</EmailButtonText>
								</EmailButton>
							</EmailAuthContainer>
							{emailAuthNumIsValid !== undefined && emailAuthNumIsValid !== null ? (
								emailAuthNumIsValid ? (null) : (
									<EmailNotValidText>인증번호가 맞지 않습니다.</EmailNotValidText>
								)) : null}
						</SignUpInputContainer>

						{emailAuthNumIsValid && (
							<View style={{ flex: 1 }}>
								<EmailAuthHeaderText>새로운 비밀번호를 설정해 주세요!</EmailAuthHeaderText>
								<SignUpInputContainer>
									<InputLabelText>비밀번호 재설정</InputLabelText>
									<PasswordInputContent passwordIsValid={passwordIsValid}>
										<TextInput
											placeholder="특수문자, 숫자 포함 8자 이상 입력해주세요."
											placeholderTextColor={"#5F5F5F"}
											onChangeText={(text) => setUserPassword(text)}
											secureTextEntry={true}
											value={userPassword}
											style={{fontFamily: 'Regular'}}
										/>
										{passwordIsValid !== undefined && passwordIsValid !== null ? (
											passwordIsValid ? (
												<InputImage source={require('../assets/signUp-check-icon.png')} />
											) : (
												<InputImage source={require('../assets/signUp-warning-icon.png')} />
											)
										) : null}
									</PasswordInputContent>
									{passwordIsValid !== undefined && passwordIsValid !== null ? (
										passwordIsValid ? (null) : (
											<EmailNotValidText>비밀번호 형식이 맞지 않습니다.</EmailNotValidText>
										)) : null}
								</SignUpInputContainer>

								<SignUpInputContainer>
									<InputLabelText>비밀번호 확인</InputLabelText>
									<CheckPasswordInputContent checkPasswordIsValid={checkPasswordIsValid}>
										<TextInput
											placeholder="비밀번호를 다시 한 번 입력해주세요."
											placeholderTextColor={"#5F5F5F"}
											onChangeText={(text) => setCheckUserPassword(text)}
											secureTextEntry={true}
											value={checkUserPassword}
											style={{fontFamily: 'Regular'}}
										/>
										{checkPasswordIsValid !== undefined && checkPasswordIsValid !== null ? (
											checkPasswordIsValid ? (
												<InputImage source={require('../assets/signUp-check-icon.png')} />
											) : (
												<InputImage source={require('../assets/signUp-warning-icon.png')} />
											)
										) : null}
									</CheckPasswordInputContent>
									{checkPasswordIsValid !== undefined && checkPasswordIsValid !== null ? (
										checkPasswordIsValid ? (null) : (
											<EmailNotValidText>비밀번호가 같지 않습니다.</EmailNotValidText>
										)) : null}
								</SignUpInputContainer>

								<SignUpButton activeOpacity={0.6} onPress={fetchPasswordChange}>
									<SignUpButtonText>비밀번호 재설정</SignUpButtonText>
								</SignUpButton>
							</View>
						)}
						<AlertComponent />
					</Animated.ScrollView>
				</Animated.View>
			</KeyboardAvoidingView>
		</PasswordFindContainer>
	);
};

export default PasswordFindScreen;

const styles = StyleSheet.create({
	keyboardAvoidingView: {
		flex: 1,
		backgroundColor: 'transparent',
	},
	scrollView: {
		flexGrow: 1, // Changed from flex: 1
		backgroundColor: 'transparent',
	},
	scrollViewContent: {
		flexGrow: 1,
		backgroundColor: 'transparent',
		paddingBottom: 30
	}
});


const PasswordFindContainer = styled.View`
  background: #FFFFFF;
  padding: 20px;
  height: 100%;
`;

const LoadingContainer = styled.View`
	position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  z-index: 2;
`

const PasswordFindHeaderText = styled.Text`
  font-size: 25px;
  font-style: normal;
  font-family: Medium;
`

const EmailAuthHeaderText = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-family: Regular;
  margin-top: 20px;
  margin-bottom: 20px;
	color: #5F5F5F;
`

const InputLabelText = styled.Text`
	margin-bottom: 4px;
	font-size: 18px;
	font-style: normal;
	font-family: Semibold;
	color: #5F5F5F;
`

const EmailAuthContainer = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

const SignUpInputContainer = styled.View`
	margin-bottom: 20px;
`

const InputImage = styled.Image`
	width: 16px;
	height: 16px;
`

const EmailInputContent = styled.View`
  display: flex;
  height: 40px;
  background: #FFFFFF;
  flex-direction: row;
	border-bottom-width: 1px;
	border-bottom-color: ${(props) =>
		props.emailIsValid === undefined || props.emailIsValid === null ? "#DEDEDE" : props.emailIsValid ? "#0046B8" : "#CB1400"};
	flex: 1;
	align-items: center;
	justify-content: space-between;
`;

const EmailAuthInputContent = styled.View`
  display: flex;
  height: 40px;
  background: #FFFFFF;
  flex-direction: row;
	border-bottom-width: 1px;
	border-bottom-color: ${(props) =>
		props.emailAuthNumIsValid === undefined || props.emailAuthNumIsValid === null ? "#DEDEDE" : props.emailAuthNumIsValid ? "#0046B8" : "#CB1400"};
	flex: 1;
	align-items: center;
	justify-content: space-between;
`;

const PasswordInputContent = styled.View`
  display: flex;
  height: 40px;
  background: #FFFFFF;
  flex-direction: row;
	border-bottom-width: 1px;
	border-bottom-color: ${(props) =>
		props.passwordIsValid === undefined || props.passwordIsValid === null ? "#DEDEDE" : props.passwordIsValid ? "#0046B8" : "#CB1400"};
	flex: 1;
	align-items: center;
	justify-content: space-between;
`;

const CheckPasswordInputContent = styled.View`
  display: flex;
  height: 40px;
  background: #FFFFFF;
  flex-direction: row;
	border-bottom-width: 1px;
	border-bottom-color: ${(props) =>
		props.checkPasswordIsValid === undefined || props.checkPasswordIsValid === null ? "#DEDEDE" : props.checkPasswordIsValid ? "#0046B8" : "#CB1400"};
	flex: 1;
	align-items: center;
	justify-content: space-between;
`;

const EmailButton = styled.TouchableOpacity`
	width: 88px;
	height: 40px;
	background-color: #F2F3F7;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	margin-left: 16px;
`

const EmailButtonText = styled.Text`
	font-size: 14.5px;
	font-style: normal;
	font-family: Semibold;
	color: #999999;
	line-height: 40px;
`

const EmailNotValidText = styled.Text`
	font-size: 12px;
	font-style: normal;
	font-family: Regular;
	color: #CB1400;
	margin-top: 4px;
`

const SignUpButton = styled.TouchableOpacity`
	height: 40px;
	width: 100%;
	background-color: #4F4F4F;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	margin-top: 15px;
`

const SignUpButtonText = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-family: Semibold;
	color: #FFFFFF;
	line-height: 40px;
`