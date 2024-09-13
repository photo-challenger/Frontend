import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

const PrivacyPolicy = () => {
	return (
		<Animated.ScrollView style={{ padding: 24 }}>
			<View style={{ paddingBottom: 48 }}>
				<HeaderText>개인정보처리방침{'\n'}</HeaderText>
				<SubHeaderText>1. 개인정보 수집 항목 및 수집 방법</SubHeaderText>
				<SubHeaderText>{'\n'}(1) 수집 항목</SubHeaderText>
				<ContentText>{'\t'}• 회원가입 시 수집하는 정보 (이메일, 비밀번호)
					{'\n\t'}• 서비스 이용 과정에서 수집되는 정보 (위치정보, 업로드한 사진)</ContentText>
				<SubHeaderText>{'\n'}(2) 수집 방법</SubHeaderText>
				<ContentText>{'\t'}• 회원가입 및 서비스 이용 시 사용자가 직접 제공 (이메일 주소)
					{'\n\t'}• 서비스 이용 과정에서 자동으로 수집</ContentText>
				<SubHeaderText>{'\n'}2. 개인정보의 수집 및 이용 목적</SubHeaderText>
				<ContentText>{'\t'}• 이메일주소: 회원 확인, 이용동의 확인 및 원활한 서비스 제공을 위한 기본 정보
				{'\n\t'}• 서비스 이용 기록, 이동 궤적 정보(GPS로그, GPS 궤적 기록, 위치정보): 서비스 이용현황 통계/분석활용
				{'\n\t'}• 아이디, 서비스 이용 기록, 최종접속 로그, 프로그램 버전정보: 서비스 상담 및 서비스 관련 오류 내용 확인을 위한 기초 데이터</ContentText>
				<SubHeaderText>{'\n'}3. 개인정보의 보유 및 이용 기간</SubHeaderText>
				<ContentText>{'\t'}• 회원 탈퇴 시까지 보유
					{'\n\t'}• 관련 법령에 따라 일정 기간 동안 보관이 필요한 경우 (예: 전자상거래법에 따른 거래 기록)</ContentText>
				<SubHeaderText>{'\n'}4. 개인정보의 제3자 제공</SubHeaderText>
				<ContentText>{'\t'}트립쳐는 회원들의 개인정보를 수집 당시 동의받은 범위 내에서만 사용하며, 회원의 사전동의 없이는 해당 범위를 초과하여 개인정보를 이용하거나 외부에 공개 또는 제공하지 않습니다
					{'\n\n\t\t'}• 제휴관광지
					{'\n\t\t\t'}◦ 제 3자의 이용 목적: 해당 장소에 대한 챌린지 수행 및 포인트 제공 서비스를 위한 이용 목적
					{'\n\t\t\t'}◦제공하는 개인정보 항목: 이메일 주소
					{'\n\t\t\t'}◦제공받는 자의 보유, 이용기간: 회원탈퇴시까지
					{'\n\n\t\t'}• 특산품 판매처
					{'\n\t\t\t'}◦제 3자의 이용 목적: 해당 장소에 대한 챌린지 수행 및 포인트 제공 서비스를 위한 이용 목적
					{'\n\t\t\t'}◦제공하는 개인정보 항목: 이메일 주소
					{'\n\t\t\t'}◦제공받는 자의 보유, 이용기간: 회원탈퇴시까지</ContentText>
				<SubHeaderText>{'\n'}5. 개인위치정보의 처리</SubHeaderText>
				<ContentText>{'\t'}위치정보의 보호 및 이용 등에 관한 법률에 따라 회원의 개인위치정보를 안전하게 관리합니다.
					{'\n\n\t\t'}1. 개인위치정보의 수집·이용·제공사실 확인자료의 보유근거 및 보유기간
					{'\n\n'}트립쳐는 위치정보의 보호 및 이용 등에 관한 법률 제16조 제2항에 근거하여 회원의 수집·이용·제공 사실 확인자료를 위치정보시스템에 자동 기록하며, 이를 6개월 이상 보관하고 있습니다.
					{'\n\n\t\t'}1. 개인위치정보의 파기 절차 및 방법
					{'\n\n'}회사는 개인위치정보의 처리목적이 달성된 경우, 개인위치정보를 재생이 불가능한 방법으로 안전하게 파기하고 있습니다. 전자적 파일 형태는 복구 및 재생이 불가능한 기술적인 방법으로 파기하며, 출력물 등은 분쇄하거나 소각하는 방식으로 파기합니다.
					{'\n\n\t\t'}1. 개인위치정보의 제3자 제공에 관한 사항
					{'\n\n'}트립쳐는 회원의 사전 동의 없이 개인위치정보를 제3자에게 제공하지 않으며, 회원가 지정한 제3자에게 개인위치정보를 제공하는 경우 매회 개인위치정보주체에게 제공받는자, 제공일시 및 제공목적을 즉시 통보하고 있습니다.
					{'\n\n\t\t'}1. 개인위치정보의 보호조치에 관한 사항
					{'\n\n'}트립쳐는 회원의 개인위치정보를 안전하게 보호하기 위한 보호조치를 마련 및 적용하고 있습니다.</ContentText>
				<SubHeaderText>{'\n'}6. 개인정보의 안전성 확보 조치</SubHeaderText>
				<ContentText>{'\t'}• 암호화된 통신 제공 (SSL/TLS)
					{'\n\t'}• 정기적인 보안 점검 및 모니터링</ContentText>
				<SubHeaderText>{'\n'}7. 사용자의 권리 및 행사 방법</SubHeaderText>
				<ContentText>{'\t'}• 개인정보 열람, 수정, 삭제 요청
					{'\n\t'}• 마케팅 정보 수신 거부 및 회원 탈퇴 요청</ContentText>
				<SubHeaderText>{'\n'}8. 개인정보 보호책임자 및 연락처</SubHeaderText>
				<ContentText>{'\t'}• 서비스 운영 책임자 및 연락처 명시
					{'\n\t'}• syyoon3342@gmail.com</ContentText>
				<SubHeaderText>{'\n'}9. 개인정보처리방침 변경에 대한 공지</SubHeaderText>
				<ContentText>{'\t'}• 약관 변경 시 최소 7일 전 공지</ContentText>
			</View>
		</Animated.ScrollView>)
}

export default PrivacyPolicy;

const HeaderText = styled.Text`
    font-family: Bold;
    font-size: 16px;
    text-align: center;
`

const SubHeaderText = styled.Text`
	font-family: Semibold;
  font-size: 14px;
`

const ContentText = styled.Text`
	font-family: Medium;
`