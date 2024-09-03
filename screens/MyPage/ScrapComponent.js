import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Modal, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import {
	fetchCommunityDetail,
	fetchDeletePost,
	fetchSaveBookmark,
} from '../../service/api';
import Animated from 'react-native-reanimated';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DateRangePicker from './DateRangePicker';

const ScrapComponent = ({ route, navigation }) => {
	const [contentList, setContentList] = useState([]);

	const [scrapChallengeList, setScrapChallengeList] = useState([]);

	return (
		<ChallengeTabContainer>
			<Animated.View
				style={[styles.animatedSheet]}
			>
				<Animated.ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scrollViewContent}
					keyboardShouldPersistTaps="always"
				>
					<ScrapContentHeaderText>내가 저장한 관광지</ScrapContentHeaderText>
					{contentList.length !== 0 ? (
						<ScrapContentContainer>
							{contentList && contentList.map((content, index) => (
								<ScrapContentSubContainer key={content.contentId} activeOpacity={0.7}>
									<ScrapContentImageUpCircle />
									<ScrapContentImageDownCircle />
									<ScrapContentImage source={{ uri: content.contentImage }} />
									<ScrapContentDetailContainer>
										<ScrapContentTitle
											numberOfLines={1}
											ellipsizeMode="tail"
										>{content.contentTitle}</ScrapContentTitle>
										<ScrapContentAddress
											numberOfLines={1}
											ellipsizeMode="tail">{content.contentAddress}</ScrapContentAddress>
									</ScrapContentDetailContainer>
									<ScrapContentDash />
									<ScrapContentChevronImageContainer>
										<ScrapContentChevronImage source={require('../../assets/big-white-chevron-right.png')} />
									</ScrapContentChevronImageContainer>
								</ScrapContentSubContainer>
							))}
						</ScrapContentContainer>
					) : (
						<NoChallengeListContainer>
							<NoChallengeListText>아직 저장한 관광지가 없어요.{'\n'}
								마음에 드는 관광지를{'\n'}
								저장해보세요.
							</NoChallengeListText>
							<NoChallengeButton>
								<NoChallengeButtonText>관광지 둘러보기</NoChallengeButtonText>
							</NoChallengeButton>
						</NoChallengeListContainer>
					)}
					<ScrapChallengeHeaderText>내가 저장한 챌린지</ScrapChallengeHeaderText>
					{scrapChallengeList.length !== 0 ? (
						<ChallengeImageContainer>
							{scrapChallengeList && scrapChallengeList.map((challengeImage) => (
								<TouchableOpacity
									key={challengeImage.postId}
								>
									<ChallengeImage source={{ uri: challengeImage.postImgName }} />
								</TouchableOpacity>
							))}
						</ChallengeImageContainer>
					) : (
						<NoChallengeListContainer>
							<NoChallengeListText>아직 저장한 챌린지가 없어요.{'\n'}
								마음에 드는 챌린지를{'\n'}
								저장해보세요.
							</NoChallengeListText>
							<NoChallengeButton>
								<NoChallengeButtonText>챌린지 구경하기</NoChallengeButtonText>
							</NoChallengeButton>
						</NoChallengeListContainer>
					)}
				</Animated.ScrollView>
			</Animated.View>
		</ChallengeTabContainer>
	)
}

export default ScrapComponent;

const styles = StyleSheet.create({
	animatedSheet: {
		maxHeight: '100%',
	},
	scrollView: {
		flexGrow: 1, // Changed from flex: 1
	},
	scrollViewContent: {
		flexGrow: 1,
		paddingLeft: 24,
		paddingRight: 24
	},
});

const NoChallengeListContainer = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 12px;
	margin-top: 16px;
	margin-bottom: 16px;
`

const NoChallengeListText = styled.Text`
	text-align: center;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	color: #B3B3B3;
`

const NoChallengeButton = styled.TouchableOpacity`
	width: 140px;
	height: 41px;
	border: 1px solid #CA7FFE;
	border-radius: 6px;
	justify-content: center;
	align-items: center;
	margin-top: 12px;
`

const NoChallengeButtonText = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	color: #CA7FFE;
	line-height: 39px;
`

const ChallengeImageContainer = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`

const ChallengeImage = styled.Image`
	width: 30%;
  height: 110.9px;
  margin: 2px;
  border-radius: 8px;
  aspect-ratio: 1;
`

const ChallengeTabContainer = styled.View`
	background-color: #F7F7F8;
	height: 100%;
`

const ScrapContentHeaderText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
	margin-top: 33px;
	margin-bottom: 20px;
`

const ScrapContentContainer = styled.View`
`

const ScrapContentSubContainer = styled.TouchableOpacity`
	position: relative;
	z-index: 0;
	margin-bottom: 8px;
`

const ScrapContentImage = styled.Image`
	height: 100px;
	border-radius: 8px;
`

const ScrapContentImageUpCircle = styled.View`
	background-color: #F7F7F8;
	position: absolute;
	z-index: 1;
	width: 30px;
  height: 20px;
  border-bottom-left-radius: 80px;
  border-bottom-right-radius: 80px;
	top: -10px;
	right: 60px;
`

const ScrapContentImageDownCircle = styled.View`
	background-color: #F7F7F8;
	position: absolute;
	z-index: 1;
	width: 30px;
  height: 20px;
	border-top-left-radius: 80px;
	border-top-right-radius: 80px;
	bottom: -10px;
	right: 60px;
`

const ScrapContentDetailContainer = styled.View`
	position: absolute;
	z-index: 1;
	padding: 8px 16px;
	width: 80%;
`

const ScrapContentTitle = styled.Text`
	font-size: 22px;
	font-style: normal;
	font-weight: 700;
	color: #FFFFFF;
	margin-bottom: 2px;
`

const ScrapContentAddress = styled.Text`
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	color: #FFFFFF;
`

const ScrapContentChevronImageContainer = styled.View`
	position: absolute;
	z-index: 1;
	top: 38px;
	right: 24px;
`

const ScrapContentDash = styled.View`
	position: absolute;
	z-index: 1;
	border-left-width: 2px;
	padding-left: 21px;
	border-style: dashed;
	border-color: #FFFFFF;
	height: 80%;
	right: 53px;
	top: 10px;
`

const ScrapContentChevronImage = styled.Image`
	width: 24px;
	height: 24px;
`

const ScrapChallengeHeaderText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
	margin-top: 39px;
	margin-bottom: 20px;
`