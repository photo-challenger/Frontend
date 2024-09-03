import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Modal, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import {
	fetchCommunityDetail,
	fetchDeletePost,
	fetchSaveBookmark,
} from '../../service/api';
import Animated from 'react-native-reanimated';

const ChallengeComponent = ({ route, navigation }) => {
	const [challengeLevel, setChallengeLevel] = useState("Lv.1 찰칵 루키");
	const [challengeImageList, setChallengeImageList] = useState([

	]);

	const [commentList, setCommentList] = useState([
	]);

	const moveChallengeState = () => {
		navigation.navigate('챌린지 참여 현황');
	};

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
					<ChallengeLevelContainer>
						<View>
							<ChallengeLevelText>{route.params.profileNickname}님은 지금,</ChallengeLevelText>
							<ChallengeLevelSubText>{challengeLevel}</ChallengeLevelSubText>
						</View>
						<CurrentChallengeButton onPress={moveChallengeState}>
							<CurrentChallengeButtonText>챌린지 참여 현황 보러가기</CurrentChallengeButtonText>
							<CurrentChallengeButtonImage source={require('../../assets/white-chevron-right.png')} />
						</CurrentChallengeButton>
					</ChallengeLevelContainer>
					<ChallengePostContainer>
						<ChallengePostHeaderText>작성한 게시글</ChallengePostHeaderText>
						{challengeImageList.length !== 0 ? (
							<ChallengeImageContainer>
								{challengeImageList && challengeImageList.map((challengeImage) => (
									<TouchableOpacity
										key={challengeImage.postId}
										onPress={() => moveDetail(challengeImage.postId)}
									>
										<ChallengeImage source={{ uri: challengeImage.postImgName }} />
									</TouchableOpacity>
								))}
							</ChallengeImageContainer>
						) : (
							<NoChallengeListContainer>
								<NoChallengeListText>
									아직 작성된 글이 없어요.{'\n'}
									진행 중인 챌린지를 확인하고{'\n'}
									도전해보세요.
								</NoChallengeListText>
								<NoChallengeButton>
									<NoChallengeButtonText>다른 글 보러가기</NoChallengeButtonText>
								</NoChallengeButton>
							</NoChallengeListContainer>
						)}
					</ChallengePostContainer>
					<CommentContainer>
						<CommentHeaderText>작성한 댓글</CommentHeaderText>
						{commentList.length !== 0 ? (
							<CommentDetailContainer>
								{commentList && commentList.map((comment) => (
									<CommentDetailSubContainer key={comment.commentId}>
										<CommentText
											numberOfLines={2}
											ellipsizeMode="tail"
										>{comment.commentContent}</CommentText>
										<CommentDurationText>{comment.commentCalculatedDate.split(' ')[0]} 전</CommentDurationText>
									</CommentDetailSubContainer>
								))}
							</CommentDetailContainer>
						) : (
							<NoChallengeListContainer>
								<NoChallengeListText>
									아직 작성된 댓글이 없어요.{'\n'}
									진행 중인 챌린지를 둘러보고{'\n'}
									댓글을 작성해 보세요.
								</NoChallengeListText>
								<NoChallengeButton>
									<NoChallengeButtonText>다른 글 보러가기</NoChallengeButtonText>
								</NoChallengeButton>
							</NoChallengeListContainer >
						)}
					</CommentContainer>
				</Animated.ScrollView>
			</Animated.View>
		</ChallengeTabContainer>
	)
}

export default ChallengeComponent;

const styles = StyleSheet.create({
	animatedSheet: {
		maxHeight: '100%',
	},
	scrollView: {
		flexGrow: 1, // Changed from flex: 1
	},
	scrollViewContent: {
		flexGrow: 1,
	},
});

const ChallengeTabContainer = styled.View`
	background-color: #F7F7F8;
	height: 100%;
`

const ChallengeLevelContainer = styled.View`
	background-color: #CA7FFE;
	height: 140px;
	padding: 12px 24px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-top: 12px;
`

const ChallengeLevelText = styled.Text`
	font-size: 24px;
	font-style: normal;
	font-weight: 500;
	color: #FFFFFF;
`

const ChallengeLevelSubText = styled.Text`
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	color: #DAFF7C;
`

const CurrentChallengeButton = styled.TouchableOpacity`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const CurrentChallengeButtonImage = styled.Image`
	width: 16px;
	height: 16px;
	margin-left: 8px;
`

const CurrentChallengeButtonText = styled.Text`
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 22px;
	color: #F7F7F8;
`

const ChallengePostContainer = styled.View`
	padding: 20px 24px;
`

const ChallengePostHeaderText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
	margin-bottom: 20px;
`

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
	width: 156px;
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

const CommentContainer = styled.View`
	margin-top: 10px;
`


const CommentHeaderText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
	margin-left: 24px;
	margin-bottom: 8px;
`

const CommentDetailContainer = styled.View``

const CommentDetailSubContainer = styled.View`
	background-color: #FFFFFF;
	width: 100%;
	height: 80px;
	padding: 16px 24px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const CommentText = styled.Text`
	flex: 1;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
`

const CommentDurationText = styled.Text`
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	color: #B5B5B5;
	margin-left: 7px;
`