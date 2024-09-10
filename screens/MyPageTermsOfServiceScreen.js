import React, { useState, useEffect } from 'react';
import {
	TouchableOpacity,
	Modal,
	View,
	StyleSheet,
	Image,
	ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import TermsOfService from '../component/common/TermsOfService';
import PrivacyPolicy from '../component/common/PrivacyPolicy';

const MyPageTermsOfServiceScreen = ({ route, navigation }) => {
	const { type } = route.params;

	useEffect(() => {
		if(type === 'service') {
			navigation.setOptions({ headerTitle: '서비스 이용약관' });
		} else {
			navigation.setOptions({ headerTitle: '개인정보 처리방침' });
		}
	}, [navigation]);

	return (
		<SettingScreenComponent>
			{type === 'service' ? (<TermsOfService />) : (<PrivacyPolicy />)}
		</SettingScreenComponent>
	);
};

export default MyPageTermsOfServiceScreen;

const SettingScreenComponent = styled.View`
  background-color: #ffffff;
  height: 100%;
`;
