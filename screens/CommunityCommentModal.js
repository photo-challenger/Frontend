import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { fetchCommentReplyList, fetchCommentList, fetchComment } from '../service/api';
import { useSelector } from 'react-redux';

const CommunityCommentModal = ({ commentModalVisible, setCommentModalVisible, postId, navigation }) => {
  // 댓글 리스트
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [replyCommentId, setReplyCommentId] = useState(0);
  const [replyCommentNickname, setReplyCommentNickname] = useState('');
  const [replyCommentIndex, setReplyCommentIndex] = useState();
  const userInfo = useSelector((state) => state.user.userInfo);

  const flatListRef = useRef(null);  // FlatList를 참조할 ref
  const inputRef = useRef(null);
  const focusOnInput = (commentId, nickname, index) => {
    setReplyCommentId(commentId);
    setReplyCommentNickname(nickname);
    setReplyCommentIndex(index);

    setTimeout(() => {
      inputRef.current.focus();
    }, 0);

    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const resetModalState = useCallback(() => {
    setCommentList([]);
    setReplyCommentId(0);
    setPage(0);
    setFirstLoading(true);
    setTotalPage(0);
  }, []);

  const handleKeyboardDidHide = () => {
    if (inputRef.current) {
      setReplyCommentId(0);
      setReplyCommentNickname('');

      inputRef.current.blur(); // Remove focus when keyboard hides
    }
  };

  // 신고하기
  const reportComment = (commentId) => {
    // 신고하기 화면으로 이동
    setCommentModalVisible(false);
    navigation.navigate('report', {
      reportType: 'comment',
      postOrCommentId: commentId,
    });
  };

  const fetchAllCommentList = async () => {
    if (page <= totalPage) {
      console.log(page)
      setLoading(true);
      const apiResponseData = await fetchCommentList(postId, page);
      setCommentList(prevList => [...prevList, ...apiResponseData?.result]);
      setTotalPage(apiResponseData.totalPages);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
      setFirstLoading(false);
    }
  }

  useEffect(() => {
    if(commentModalVisible) {
      resetModalState();
      fetchAllCommentList();
    }
  }, [commentModalVisible]);

  useEffect((index) => {
    if (firstLoading) {
      fetchAllCommentList();
    }
  }, [firstLoading]);

  const onEndReached = () => {
    if (!loading) {
      fetchAllCommentList();
    }
  }

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);


  const closeModal = () => {
    Keyboard.dismiss();
    setCommentModalVisible(false);
  };

  const InputComponent = () => (
    <SearchContent>
      <SearchIconImg source={require('../assets/comment-reply-button.png')} />
      <SearchInput
        ref={inputRef} // Connect the ref here
        placeholder="댓글 추가"
        placeholderTextColor="#C4C7CE"
        onSubmitEditing={(e) => handleLeaveComment(e.nativeEvent.text)}
      />
    </SearchContent>
  );

  const handleLeaveComment = async (content) => {
    const apiResponseData = await fetchComment(replyCommentId, postId, content);
    console.log(apiResponseData);

    resetModalState();
    inputRef.current.clear();
    setFirstLoading(true);
  }

  const Comment = ({ item, onReplyPress, index }) => {
    // 대댓글 리스트
    const [commentReplayList, setCommentReplyList] = useState([]);

    const getCommentReplyList = async (commentId) => {
      const apiResponseData = await fetchCommentReplyList(commentId);
      setCommentReplyList(apiResponseData?.result);
    };

    const [showReplies, setShowReplies] = useState(false);
    const toggleReplies = () => {
      setShowReplies(!showReplies);
    };

    const CommentReplyContainer = (props) => (
      !props.comment.blockChk && (<CommentReplyMapContainer>
        {props.comment.profileImgName.split('/').pop() !== 'default' ? (<CommentProfileImage source={{ uri: props.comment.profileImgName }} />) 
        : (<CommentProfileImage source={require('../assets/profile-default-image.png')} />)}
        <CommentDetailContainer>
          <CommentReportContainer>
            <View>
              <CommentProfileContainer>
                <CommentProfileNickname>
                  {props.comment.nickname}
                </CommentProfileNickname>
                <CommentDuration>
                  {props.comment.commentCalculatedDate}
                </CommentDuration>
              </CommentProfileContainer>
              <CommentContent>{props.comment.commentContent}</CommentContent>
            </View>
            {props.comment.nickname !== userInfo.profileNickname &&
              <TouchableOpacity onPress={() => reportComment(props.comment.commentId)}>
                <CommentReportButtonImage
                  source={require('../assets/alert-triangle.png')}
                />
              </TouchableOpacity>}
          </CommentReportContainer>
        </CommentDetailContainer>
      </CommentReplyMapContainer>
    ));

    return (!item.blockChk && (
      <CommentContainer key={item.profileId}>
        {item.profileImgName.split('/').pop() !== 'default' ? (<CommentProfileImage source={{ uri: item.profileImgName }} />)
          : (<CommentProfileImage source={require('../assets/profile-default-image.png')} />)}
        <CommentDetailContainer>
          <CommentReportContainer>
            <View>
              <CommentProfileContainer>
                <CommentProfileNickname>
                  {item.nickname}
                </CommentProfileNickname>
                <CommentDuration>
                  {item.commentCalculatedDate}
                </CommentDuration>
              </CommentProfileContainer>
              <CommentContent>{item.commentContent}</CommentContent>
            </View>
            {item.nickname !== userInfo.profileNickname &&
              <TouchableOpacity onPress={() => reportComment(item.commentId)}>
                <CommentReportButtonImage
                  source={require('../assets/alert-triangle.png')}
                />
              </TouchableOpacity>}
          </CommentReportContainer>
          <CommentReplyButton
            activeOpacity={0.8}
            onPress={() => focusOnInput(item.commentId, item.nickname, index)}
          >
            <CommentReplyButtonText>답글 달기</CommentReplyButtonText>
          </CommentReplyButton>
          <CommentReplyMoreButton
            activeOpacity={0.8}
            onPress={() => {
              getCommentReplyList(item.commentId);
              toggleReplies();
            }}
          >
            <CommentReplyMore />
            {showReplies ? (
              <CommentReplyMoreButtonText>답글 닫기</CommentReplyMoreButtonText>
            ) : (
              <CommentReplyMoreButtonText>
                답글 더보기
              </CommentReplyMoreButtonText>
            )}
          </CommentReplyMoreButton>
          <View>
            {showReplies &&
              commentReplayList &&
              commentReplayList.map((item, index) => (
                <CommentReplyContainer key={index} comment={item} />
              ))}
          </View>
        </CommentDetailContainer>
      </CommentContainer>
    ));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ModalContainer>
        <Modal
          visible={commentModalVisible}
          animationType="slide"
          transparent
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <StatusBar
              barStyle="light-content"
              backgroundColor="rgba(0, 0, 0, 0.3)"
            />
            <Scrim onPress={() => closeModal()} />
            <CommentHeaderContainer>
              <CommentHeaderText>댓글 목록</CommentHeaderText>
              <CloseImageButton onPress={() => closeModal()}>
                <CloseImage source={require('../assets/btn-close.png')} />
              </CloseImageButton>
            </CommentHeaderContainer>

            {firstLoading ? (<View style={{ backgroundColor: '#FFFFFF', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color={'#CA7FFE'} />
            </View>) : commentList.length !== 0 ? (
              <FlatList
                data={commentList}
                renderItem={({ item, index }) => <Comment item={item} onReplyPress={focusOnInput} focusOnInput={focusOnInput} index={index} />}
                keyExtractor={(item, index) => `${item.commentId}-${index}`}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.6}
                style={styles.flatListStyle}
                ref={flatListRef}
                ListFooterComponent={loading && (
                  <View style={{ padding: 10 }}>
                    <ActivityIndicator color="#CA7FFE" />
                  </View>
                )}
                extraData={commentList}
              />
            ) : (
              <View style={{ backgroundColor: '#FFFFFF', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 15, textAlign: 'center', color: '#7A7A7A' }}>댓글이 존재하지 않습니다.{'\n'}게시물에 다른 유저의 포토 챌린지에 대한{'\n'}댓글을 남겨보세요!</Text>
              </View>
            )}
          </View>

          <View style={styles.inputContainer}>
            {replyCommentId != 0 ? (
              <View style={{ marginLeft: 15, marginBottom: 10 }}>
                <Text><Text style={{ color: '#CA7FFE' }}>{replyCommentNickname}</Text>님에게 답글 보내는 중</Text>
              </View>
            ) : (null)}
            <InputComponent />
          </View>
        </Modal>
      </ModalContainer>
    </KeyboardAvoidingView>
  );
};

export default CommunityCommentModal;

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
    maxHeight: '80%',
    flex: 1,
  },
  scrollView: {
    flexGrow: 1, // Changed from flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  inputContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  flatListStyle: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    flex: 1,
  }
});

const Scrim = styled.TouchableOpacity`
  flex: 1;
`;

const ModalContainer = styled.View`
  flex: 1;
`;

const CommentHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 16px 16px 0 0;
  background-color: #FFFFFF;
`;

const CloseImageButton = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 16px;
`;

const CloseImage = styled.Image`
  width: 28px;
  height: 28px;
`;

const CommentHeaderText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`;

const CommentContainer = styled.View`
  margin-bottom: 32px;
  display: flex;
  flex-direction: row;
  background-color: #FFFFFF;
`;

const CommentProfileImage = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 35px;
  margin-right: 8px;
`;

const CommentDetailContainer = styled.View`
  flex: 1;
  margin-top: -3px;
`;

const CommentProfileContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const CommentProfileNickname = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 3px;
  margin-right: 8px;
`;

const CommentDuration = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: #a9a9a9;
`;

const CommentContent = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

const CommentReplyButton = styled.TouchableOpacity`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
`;

const CommentReplyButtonText = styled.Text`
  font-size: 12px;
  ont-style: normal;
  font-weight: 500;
  color: #666666;
`;

const CommentReplyMore = styled.View`
  width: 8%;
  height: 1px;
  background-color: #eff2f4;
  margin-right: 10px;
`;

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
  background: #ffffff;
  flex-direction: row;
  border: 1px solid #c4c7ce;
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
`;

const CommentReportContainer = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const CommentReportButtonImage = styled.Image`
  width: 16px;
  height: 16px;
`;
