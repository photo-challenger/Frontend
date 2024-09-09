import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import TermsOfService from '../component/common/TermsOfService';
import PrivacyPolicy from '../component/common/PrivacyPolicy';
import styled from 'styled-components';
import Animated from 'react-native-reanimated';
import { color } from 'react-native-elements/dist/helpers';

const SignUpAgreeScreen = ({ route, navigation }) => {
	const [termsOfService, setTermsOfService] = useState([]);
	const [personalInformation, setPersonalInformation] = useState([]);


	const moveDetail = (id) => {
		navigation.navigate('pointStoreDetail', { itemId: id });
	};

	const [checkBoxAll, setCheckBoxAll] = useState(false);
	const [checkBoxService, setCheckBoxService] = useState(false);
	const [checkBoxPersonal, setCheckBoxPersonal] = useState(false);
	const toggleCheckBox = (type) => {
		if (type === 'service') {
			setCheckBoxService(!checkBoxService);
		} else if (type === 'personal') {
			setCheckBoxPersonal(!checkBoxPersonal);
		} else {
			setCheckBoxAll(!checkBoxAll);

			if (!checkBoxAll) {
				setCheckBoxService(true);
				setCheckBoxPersonal(true);
			} else {
				setCheckBoxService(false);
				setCheckBoxPersonal(false);
			}
		}
	};

	const CheckBox = (props) => {
		return (
			<CheckBoxContainer checkBoxValue={props.checkBoxValue} onPress={() => toggleCheckBox(props.type)}>
				{props.checkBoxValue === true ? <CheckBoxIconImage source={require('../assets/check.png')} /> : null}
			</CheckBoxContainer>
		);
	};

	const moveSignUp = () => {
		navigation.navigate('회원가입');
	};

	return (
		<Container>
			<Animated.ScrollView>
				<CheckboxTextContainer>
					<CheckBox type={'all'} checkBoxValue={checkBoxAll} />
					<AllCheckText>서비스 이용약관 및 개인정보 처리방침을 모두 동의합니다.</AllCheckText>
				</CheckboxTextContainer>
				<CheckboxTextContainer>
					<CheckBox type={'service'} checkBoxValue={checkBoxService} />
					<TermsOfServiceHeaderText>서비스 이용약관 <Text style={{ color: '#CA7FFE' }}>(필수)</Text></TermsOfServiceHeaderText>
				</CheckboxTextContainer>
				<TermsOfServiceContent>
					<TermsOfService />
				</TermsOfServiceContent>
				<CheckboxTextContainer>
					<CheckBox type={'personal'} checkBoxValue={checkBoxPersonal} />
					<TermsOfServiceHeaderText>개인정보 처리방침<Text style={{ color: '#CA7FFE' }}>(필수)</Text></TermsOfServiceHeaderText>
				</CheckboxTextContainer>
				<TermsOfServiceContent>
					<PrivacyPolicy />
				</TermsOfServiceContent>
			</Animated.ScrollView>
			{checkBoxService && checkBoxPersonal ? (
				<NextButton isNext={true} activeOpacity={0.8} onPress={moveSignUp}>
					<NextButtonText>다음</NextButtonText>
				</NextButton>
			) : (
				<NextButton isNext={false} activeOpacity={1}>
					<NextButtonText>다음</NextButtonText>
				</NextButton>)
			}

		</Container>
	);
};

export default SignUpAgreeScreen;

const Container = styled.View`
  display: flex;
  background: #FFFFFF;
  height: 100%;
`;

const TermsOfServiceHeaderText = styled.Text`
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	flex-shrink: 1;
	line-height: 22px;
`

const TermsOfServiceContent = styled.View`
	width: 100%;
	background-color: #F7F7F8;
	height: 170px;
	margin-bottom: 10px;
`

const CheckboxTextContainer = styled.View`
	display: flex;
	flex-direction: row;
	padding: 20px;
`

const CheckBoxContainer = styled.TouchableOpacity`
	border: 1.5px solid ${(props) => props.checkBoxValue ? "#CA7FFE" : "#B5B5B5"};
	width: 24px;
	height: 24px;	
	border-radius: 5px;
	background-color: ${(props) => props.checkBoxValue ? "#CA7FFE" : "#FFFFFF"};
	align-items: center;
	justify-content: center;
	margin-right: 7px;
`

const CheckBoxIconImage = styled.Image`
	width: 18px;
	height: 18px;
`

const AllCheckText = styled.Text`
	font-size: 15px;
	font-style: normal;
	font-weight: 600;
	flex-shrink: 1;
`

const NextButton = styled.TouchableOpacity`
	position: absolute;
	width: 100%;
	height: 80px;
	bottom: 0;
	left: 0;
	background-color: ${(props) => props.isNext ? "#4F4F4F" : "#B5B5B5"};
	justify-content: center;
	align-items: center;
`

const NextButtonText = styled.Text`
	color: #FFFFFF;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
`
