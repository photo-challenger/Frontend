import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import styled from 'styled-components';
import Animated from 'react-native-reanimated';
import { fetchReport, fetchLogin } from '../../service/api';
const CommunityScreen = ({ route, navigation }) => {
  const { reportType, postOrCommentId } = {
    reportType: 'post',
    postOrCommentId: 2,
  };
  // const { reportType, postOrCommentId } = route.params;
  const [reportText, setReportText] = useState('');
  const reportTypeList = [
    '스팸 또는 광고',
    '혐오 발언 또는 폭력',
    '괴롭힘 또는 사이버 불링',
    '부적절한 콘텐츠',
    '개인 정보 침해',
  ];

  useEffect(() => {
    setReportText(reportType == 'comment' ? '댓글' : '게시물');
  }, []);

  const [selectedReportCategory, setSelectedReportCategory] =
    useState('스팸 또는 광고');
  const ReportPerTypeContainer = (props) => {
    const [showReplies, setShowReplies] = useState(false);
    const toggleReplies = () => {
      setSelectedReportCategory(props.type);
      setShowReplies(!showReplies);
    };

    return (
      <ReportTypePerContainer onPress={toggleReplies} showReplies={showReplies}>
        <ReportTypeText showReplies={showReplies}>{props.type}</ReportTypeText>
        {showReplies === true ? (
          <ReportSelectImage
            source={require('../../assets/check-circle.png')}
          />
        ) : null}
      </ReportTypePerContainer>
    );
  };

  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const toggleCheckBox = () => {
    setCheckBoxValue(!checkBoxValue);
  };

  const CheckBox = (props) => {
    return (
      <CheckBoxContainer checkBoxValue={checkBoxValue} onPress={toggleCheckBox}>
        {props.checkBoxValue === true ? (
          <CheckBoxIconImage source={require('../../assets/check.png')} />
        ) : null}
      </CheckBoxContainer>
    );
  };

  const [reportContent, setReportContent] = useState('');
  const report = async () => {
    // await fetchLogin();
    const result = await fetchReport({
      reportType: reportType,
      postOrCommentId: postOrCommentId,
      reportContent: reportContent || '',
      reportCategory: selectedReportCategory,
      reportBlockChk: checkBoxValue,
    });
    console.log(result);
    setModalVisible(false);
  };

  return (
    <ReportContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <Animated.View style={[styles.animatedSheet]}>
          <Animated.ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="always"
          >
            <ReportSubContainer>
              <ReportHeaderText>{reportText} 신고하기</ReportHeaderText>
              <ReportTypeTextContainer>
                <ReportTypeHeaderText>신고 유형 선택</ReportTypeHeaderText>
                <ReportTypeHeaderSubText>(필수 선택)</ReportTypeHeaderSubText>
              </ReportTypeTextContainer>
              <View>
                {reportTypeList.map((type) => (
                  <ReportPerTypeContainer type={type} />
                ))}
              </View>
              <ReportContentContainer>
                <ReportContentHeaderText>신고 내용</ReportContentHeaderText>
                <ReportContentHeaderSubText>
                  (필수 작성)
                </ReportContentHeaderSubText>
              </ReportContentContainer>

              <ReportContentInputWrap>
                <ReportContentInput
                  placeholder="신고 내용을 작성해 주세요."
                  multiline
                  placeholderTextColor="#B5B5B5"
                  onChange={(e) => setReportContent(e.nativeEvent.text)}
                />
              </ReportContentInputWrap>

              <ReportInfoContainer>
                <ReportInfoPerContainer>
                  <ReportInfoImage
                    source={require('../../assets/info-circle.png')}
                  />
                  <View style={{ flex: 1 }}>
                    <ReportInfoText>
                      신고해주신 내용은 관리자 검토 후 내부정책에 의거 조치가
                      진행됩니다.
                    </ReportInfoText>
                  </View>
                </ReportInfoPerContainer>
                <ReportInfoPerContainer>
                  <ReportInfoImage
                    source={require('../../assets/info-circle.png')}
                  />
                  <View style={{ flex: 1 }}>
                    <ReportInfoText>
                      신고 접수 후 패널티 조치까지 영업일 기준 최소 3일에서 최대
                      5일까지 소요될 수 있습니다.
                    </ReportInfoText>
                  </View>
                </ReportInfoPerContainer>
                <ReportInfoPerContainer>
                  <ReportInfoImage
                    source={require('../../assets/info-circle.png')}
                  />
                  <View style={{ flex: 1 }}>
                    <ReportInfoText>
                      신고 접수 후 패널티 조치까지 영업일 기준 최소 3일에서 최대
                      5일까지 소요될 수 있습니다.
                    </ReportInfoText>
                  </View>
                </ReportInfoPerContainer>
              </ReportInfoContainer>

              <ReportBlockHeaderText>차단 여부</ReportBlockHeaderText>
              <CheckBoxTextContainer>
                <CheckBox checkBoxValue={checkBoxValue} />
                <View style={{ marginLeft: 8, flex: 1 }}>
                  <BlockText>작성자의 {reportText} 차단</BlockText>
                  <BlockSubText>
                    해당 {reportText}이 차단되며, 확인 후 차단 여부는 상대방이
                    알 수 없습니다.
                  </BlockSubText>
                </View>
              </CheckBoxTextContainer>
            </ReportSubContainer>

            <SubmitButton activeOpacity={0.8} onPress={report}>
              <SubmitButtonText>제출하기</SubmitButtonText>
            </SubmitButton>
          </Animated.ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </ReportContainer>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  animatedSheet: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

const ReportContainer = styled.View`
  display: flex;
  background: #fff;
  height: 100%;
`;

const ReportSubContainer = styled.View`
  flex: 1;
  padding: 24px 24px 0 24px;
`;

const ReportHeaderText = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 45px;
`;

const ReportTypeTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ReportTypeHeaderText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-right: 5px;
`;

const ReportTypeHeaderSubText = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: #7a7a7a;
`;

const ReportTypePerContainer = styled.TouchableOpacity`
  height: 54px;
  width: 100%;
  background-color: ${(props) => (props.showReplies ? '#FFFFFF' : '#F7F7F8')};
  border: 2px solid ${(props) => (props.showReplies ? '#CA7FFE' : '#B5B5B5')};
  border-radius: 10px;
  margin-top: 10px;
  display: flex;
  padding: 0 16px 0 16px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const ReportTypeText = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 50px;
  color: ${(props) => (props.showReplies ? '#000000' : '#B5B5B5')};
`;

const ReportSelectImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const ReportContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 55px;
  margin-bottom: 15px;
  align-items: center;
`;

const ReportContentHeaderText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-right: 5px;
`;

const ReportContentHeaderSubText = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: #7a7a7a;
`;

const ReportContentInputWrap = styled.View`
  display: flex;
  width: 100%;
  height: 140px;
  padding: 12px 16px;
  border-radius: 8px;
  background: #f7f7f8;
  flex-direction: row;
  border: 2px solid #b5b5b5;
`;

const ReportContentInput = styled.TextInput`
  flex: 1;
  text-align-vertical: top;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

const ReportInfoContainer = styled.View`
  margin-top: 47px;
  background-color: #f2f3f7;
  border-radius: 10px;
  border: 2px solid #b5b5b5;
  padding: 0 20px 20px 20px;
`;

const ReportInfoPerContainer = styled.View`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ReportInfoImage = styled.Image`
  width: 12px;
  height: 12px;
  margin-right: 8px;
`;

const ReportInfoText = styled.Text`
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  color: #7a7a7a;
  line-height: 13px;
`;

const ReportBlockHeaderText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-top: 40px;
`;

const CheckBoxTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 18px;
  border-radius: 10px;
  border: 1px solid #b5b5b5;
  margin-top: 13px;
`;

const CheckBoxContainer = styled.TouchableOpacity`
  border: 2px solid ${(props) => (props.checkBoxValue ? '#CA7FFE' : '#B5B5B5')};
  width: 24px;
  height: 24px;
  border-radius: 5px;
  background-color: ${(props) => (props.checkBoxValue ? '#CA7FFE' : '#FFFFFF')};
  align-items: center;
  justify-content: center;
`;

const CheckBoxIconImage = styled.Image`
  width: 18px;
  height: 18px;
`;

const BlockText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 3px;
`;

const BlockSubText = styled.Text`
  color: #b5b5b5;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 80px;
  background-color: #4f4f4f;
  margin-top: 33px;
  align-items: center;
  justify-content: center;
`;

const SubmitButtonText = styled.Text`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  color: #ffffff;
`;
