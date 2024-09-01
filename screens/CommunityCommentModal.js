import React, { useRef, useState, useEffect } from 'react';
import { Modal, StatusBar, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const ModalTest = () => {
	// 댓글 리스트
	const [commentList, setCommentList] = useState([
		{
			"profileId": 1,
			"profileImgName": "https://tripture.s3.ap-northeast-2.amazonaws.com/file/be_profile.jpg",
			"nickname": "짱구",
			"commentCalculatedDate": "5일 전 작성",
			"commentContent": "This is a comment 1 on Post 1",
			"blockChk": false
		},
		{
			"profileId": 2,
			"profileImgName": "https://tripture.s3.ap-northeast-2.amazonaws.com/file/be_profile.jpg",
			"nickname": "gamja23",
			"commentCalculatedDate": "13일 전 작성",
			"commentContent": "This is a comment 2 on Post 1",
			"blockChk": true
		}
	]);


	const [modalVisible, setModalVisible] = useState(false);

	const inputRef = useRef(null);
	const focusOnInput = () => {
		setTimeout(() => {
			inputRef.current.focus();
		}, 0);
	};

	const handleKeyboardDidHide = () => {
		if (inputRef.current) {
			inputRef.current.blur(); // Remove focus when keyboard hides
		}
	};

	useEffect(() => {
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			handleKeyboardDidHide
		);

		return () => {
			keyboardDidHideListener.remove();
		};
	}, []);

	const openModal = () => {
		setModalVisible(true);
	};
	const closeModal = () => {
		Keyboard.dismiss();
		setModalVisible(false);
	};

	const InputComponent = () => (
		<SearchContent>
			<SearchIconImg source={require('../assets/comment-reply-button.png')} />
			<SearchInput
				ref={inputRef} // Connect the ref here
				placeholder="댓글 추가"
				placeholderTextColor="#C4C7CE"
			/>
		</SearchContent>
	);

	const Comment = ({ props, comment, onReplyPress }) => {
		// 대댓글 리스트
		const [commentReplayList, setCommentReplyList] = useState([
			{
				"profileId": 2,
				"profileImgName": "https://tripture.s3.ap-northeast-2.amazonaws.com/file/be_profile.jpg",
				"nickname": "짱구",
				"commentCalculatedDate": "12일 전 작성",
				"commentContent": "This is a nested comment 1 on Post 1",
				"blockChk": true
			},
			{
				"profileId": 2,
				"profileImgName": "https://tripture.s3.ap-northeast-2.amazonaws.com/file/be_profile.jpg",
				"nickname": "감자",
				"commentCalculatedDate": "11일 전 작성",
				"commentContent": "This is a nested comment 2 on Post 1",
				"blockChk": false
			}
		]);

		const [showReplies, setShowReplies] = useState(false);
		const toggleReplies = () => {
			setShowReplies(!showReplies);
		};

		const CommentReplyContainer = (props) => (
			<CommentReplyMapContainer>
				<CommentProfileImage source={{ uri: props.comment.profileImgName }} />
				<CommentDetailContainer>
					<CommentProfileContainer>
						<CommentProfileNickname>{props.comment.nickname}</CommentProfileNickname>
						<CommentDuration>{props.comment.commentCalculatedDate}</CommentDuration>
					</CommentProfileContainer>
					<CommentContent>{props.comment.commentContent}</CommentContent>
				</CommentDetailContainer>
			</CommentReplyMapContainer>
		);

		return (
			<CommentContainer key={comment.profileId}>
				<CommentProfileImage source={{ uri: comment.profileImgName }} />
				<CommentDetailContainer>
					<CommentReportContainer>
						<View>
							<CommentProfileContainer>
								<CommentProfileNickname>{comment.nickname}</CommentProfileNickname>
								<CommentDuration>{comment.commentCalculatedDate}</CommentDuration>
							</CommentProfileContainer>
							<CommentContent>{comment.commentContent}</CommentContent>
						</View>
						<TouchableOpacity>
							<CommentReportButtonImage source={require('../assets/alert-triangle.png')} />
						</TouchableOpacity>
					</CommentReportContainer>
					<CommentReplyButton activeOpacity={0.8} onPress={() => focusOnInput()} >
						<CommentReplyButtonText>답글 달기</CommentReplyButtonText>
					</CommentReplyButton>
					<CommentReplyMoreButton activeOpacity={0.8} onPress={toggleReplies} >
						<CommentReplyMore />
						{showReplies ? <CommentReplyMoreButtonText>답글 닫기</CommentReplyMoreButtonText> : <CommentReplyMoreButtonText>답글 더보기</CommentReplyMoreButtonText>}
					</CommentReplyMoreButton>
					<View>
						{showReplies && commentReplayList && (commentReplayList.map((comment, index) => (
							<CommentReplyContainer key={index} comment={comment} />
						)))}
					</View>
				</CommentDetailContainer>
			</CommentContainer>
		);
	};

	return (
		<ModalContainer>
			<TouchableOpacity onPress={openModal}>
				<Text>Modal Test</Text>
			</TouchableOpacity>
			<Modal
				visible={modalVisible}
				animationType='slide'
				transparent
				onRequestClose={closeModal}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.keyboardAvoidingView}
				>
					<View style={styles.modalContainer}>
						<StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.3)" />
						<Scrim onPress={() => closeModal()} />
						<CommentHeaderContainer>
							<CommentHeaderText>댓글 목록</CommentHeaderText>
							<CloseImageButton onPress={() => closeModal()}>
								<CloseImage source={require('../assets/btn-close.png')} />
							</CloseImageButton>
						</CommentHeaderContainer>
						<Animated.View
							style={[styles.animatedSheet]}
						>
							<Animated.ScrollView
								style={styles.scrollView}
								contentContainerStyle={styles.scrollViewContent}
								keyboardShouldPersistTaps="always"
							>
								{commentList.map((comment, index) => (
									<Comment key={index} comment={comment} onReplyPress={focusOnInput} focusOnInput={focusOnInput} />
								))}
							</Animated.ScrollView>
						</Animated.View>
					</View>
				</KeyboardAvoidingView>
				<View style={styles.inputContainer}>
					<InputComponent />
				</View>
			</Modal>
		</ModalContainer>
	);
};

export default ModalTest;

const styles = StyleSheet.create({
	keyboardAvoidingView: {
		flex: 1,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		justifyContent: 'flex-end',
	},
	animatedSheet: {
		backgroundColor: 'white',
		paddingLeft: 16,
		paddingRight: 16,
		maxHeight: '80%',
	},
	scrollView: {
		flexGrow: 1, // Changed from flex: 1
	},
	scrollViewContent: {
		paddingTop: 16,
		flexGrow: 1,
	},
	inputContainer: {
		padding: 10,
		borderTopWidth: 1,
		borderTopColor: '#E0E0E0',
		backgroundColor: 'white'
	},
});

const Scrim = styled.TouchableOpacity`
  flex: 1;
`;

const ModalContainer = styled.View`
	flex: 1;
`

const CommentHeaderContainer = styled.View`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: center;
	align-items: center;
	padding: 16px;
	border-radius: 16px 16px 0 0;
	background-color: white;
`
const CloseImageButton = styled.TouchableOpacity`
	position: absolute;
	right: 16px;
	top: 16px;
`

const CloseImage = styled.Image`
	width: 28px;
	height: 28px;
`

const CommentHeaderText = styled.Text`
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
`

const CommentContainer = styled.View`
	margin-bottom: 32px;
  display: flex;
  flex-direction: row;
`

const CommentProfileImage = styled.Image`
	width: 35px;
	height: 35px;
	border-radius: 35px;
	margin-right: 8px;
`

const CommentDetailContainer = styled.View`
	flex: 1;
	margin-top: -3px;
`

const CommentProfileContainer = styled.View`
	display: flex;
	flex-direction: row;
`

const CommentProfileNickname = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	margin-bottom: 3px;
	margin-right: 8px;
`

const CommentDuration = styled.Text`
	font-size: 12px;
	font-style: normal;
	font-weight: 500;
	color: #A9A9A9;
`

const CommentContent = styled.Text`
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
`

const CommentReplyButton = styled.TouchableOpacity`
	margin-top: 5px;
	display: flex;
	flex-direction: row;
`

const CommentReplyButtonText = styled.Text`
	font-size: 12px;
	ont-style: normal;
	font-weight: 500;
	color: #666666;
`

const CommentReplyMore = styled.View`
	width: 8%;
	height: 1px;
	background-color: #EFF2F4;
	margin-right: 10px;
`

const CommentReplyMoreButton = styled.TouchableOpacity`
  margin-top: 8px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const CommentReplyMoreButtonText = styled.Text`
  font-size: 12px;
  color: #666666;
`;

const SearchContent = styled.View`
  display: flex;
  height: 40px;
	width: 100%;
  padding: 9px 0px 9px 20px;
  border-radius: 99px;
  background: #FFFFFF;
  flex-direction: row;
	border: 1px solid #C4C7CE;
`;

const SearchIconImg = styled.Image`
  width: 20px;
  height: 20px;
`;

const SearchInput = styled.TextInput`
  padding-left: 10px;
	flex: 1;
`;

const CommentReplyMapContainer = styled.View`
  display: flex;
	margin-top: 32px;
  flex-direction: row;
`

const CommentReportContainer = styled.View`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;
`

const CommentReportButtonImage = styled.Image`
	width: 16px;
height: 16px;
`