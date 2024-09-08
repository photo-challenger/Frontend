import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
  publicUrl: process.env.REACT_PUBLIC_SERVER,
  apiUrl: process.env.REACT_API_SERVER,
  key: process.env.REACT_PUBLIC_KEY,
  lang: 'ko-KR',
};

const axiosInstance = axios.create({
  withCredentials: true,
});

const getSessionId = async () => {
  try {
    const sessionData = await AsyncStorage.getItem('userSessionData');
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      return parsedData.sessionId;
    }
  } catch (error) {
    console.log('Error getting sessionId:', error);
    return null;
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const sessionId = await getSessionId();
    if (sessionId) {
      config.headers['Authorization'] = `Bearer ${sessionId}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const setCookie = (cookie) => {
  axiosInstance.defaults.headers.Cookie = cookie;
};

const fetchLogin_before = async () => {
  try {
    const response = await axios.post('https://www.tripture.shop/login/true', {
      loginEmail: 'user1@example.com',
      loginPw: 'password1',
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchLogin = async (email, password, isAutoLogin) => {
  try {
    const response = await axiosInstance.post(
      `${config.apiUrl}login/${isAutoLogin}`,
      {
        loginEmail: email,
        loginPw: password,
      },
    );

    if (response.status === 200) {
      const setCookieHeader = response.headers['set-cookie'];
      let jsessionId = '';
      if (setCookieHeader) {
        if (isAutoLogin) {
          jsessionId = setCookieHeader[0]
            .split(';')
            .find((cookie) => cookie.trim().startsWith('mySessionId='))
            .split('=')[1];

          setCookie(`mySessionId=${jsessionId}`);
          await AsyncStorage.multiSet([
            ['loginTimestamp', new Date().getTime().toString()],
            ['userSessionData', JSON.stringify({ sessionId: jsessionId })],
          ]);
        } else {
          jsessionId = setCookieHeader[0]
            .split(';')
            .find((cookie) => cookie.trim().startsWith('JSESSIONID='))
            .split('=')[1];
          setCookie(`JSESSIONID=${jsessionId}`);
        }
      } else {
        console.warn('No JSESSIONID found in response');
      }

      return jsessionId;
    } else {
      if (response.data.status === 404) {
        return '존재하지 않는 이메일입니다.';
      } else if (response.data.status === 400) {
        return '비밀번호가 맞지 않습니다.';
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const fetchProfileEditForm = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}profile/edit`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const fetchDefaultProfile = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}profile/default`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const fetchMyTicketList = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}purchase/ItemsBeforeUse`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const fetchMyUsedTicketList = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}purchase/ItemsAfterUse`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const fetchMyTicketDetail = async (purchaseId) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}purchase/${purchaseId}/detail`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const fetchUseMyTicket = async (purchaseId) => {
  try {
    const response = await axios.post(
      `${config.apiUrl}purchase/${purchaseId}/use`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.status == 303) console.log('success using ticket');
    else console.error(error);
  }
};

async function fetchlocationBasedList(params) {
  let sendObj = params || {};
  sendObj.numOfRows = sendObj.numOfRows || 10;
  sendObj.pageNo = sendObj.pageNo || 1;
  sendObj.MobileOS = sendObj.MobileOS || 'ETC';
  sendObj.MobileApp = sendObj.MobileApp || 'Tripture';
  sendObj._type = sendObj._type || 'JSON';
  sendObj.listYN = sendObj.listYN || 'Y';
  sendObj.arrange = sendObj.arrange || 'A';
  sendObj.contentTypeId = sendObj.contentTypeId || '';
  sendObj.mapX = sendObj.mapX || 127.2178524;
  sendObj.mapY = sendObj.mapY || 37.2561572;
  sendObj.radius = sendObj.radius || 2000;

  const queryStr = new URLSearchParams(sendObj).toString();

  const response = await fetch(
    `${config.baseUrl}locationBasedList1?serviceKey=${config.key}&${queryStr}`,
  );

  return response.json();
}

async function fetchPopularCommunityList(params) {
  let sendObj = params || {};
  sendObj.page = sendObj.page || 0;

  const queryStr = new URLSearchParams(sendObj).toString();

  try {
    const response = await axiosInstance.get(
      `${config.apiUrl}/post/popularPost?${queryStr}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchCommunityDetail(postId) {
  try {
    const response = await axios.get(`${config.apiUrl}post/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchSearchCommnunityRegion(params) {
  let sendObj = params || {};
  sendObj.searchOne = sendObj.searchOne || '';

  const queryStr = new URLSearchParams(sendObj).toString();

  const response = await fetch(`${config.apiUrl}post/search?${queryStr}`);

  console.log('response  >> ', response);

  return response.json();
}

async function fetchSaveBookmark(postId) {
  try {
    const response = await axios.post(
      `${config.apiUrl}bookmark/save/photochallenge/${postId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchDeletePost(postId) {
  try {
    const response = await axios.post(`${config.apiUrl}post/delete/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchSignUp(params) {
  try {
    const response = await axiosInstance.get(`${config.apiUrl}login/new`);

    if (response.status === 200) {
      return response;
    } else {
      if (response.data.status === 400) {
        return response.data.message;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const regionCodes = {
  전체: '',
  서울: '1',
  인천: '2',
  대전: '3',
  대구: '4',
  광주: '5',
  부산: '6',
  울산: '7',
  세종: '8',
  경기: '31',
  강원: '32',
  충청북도: '33',
  충청남도: '34',
  경상북도: '35',
  경상남도: '36',
  전북: '37',
  전라남도: '38',
  제주: '39',
};

// 공공 API 연결
async function fetchAreaBasedList(region, page) {
  try {
    const apiResponseData = await axios.get(
      `${config.publicUrl}areaBasedList1?pageNo=${page}&MobileOS=AND&MobileApp=tripture&_type=json&areaCode=${regionCodes[region]}&serviceKey=${config.key}`,
    );
    const apiResult = apiResponseData.data.response;
    return apiResult.body;
  } catch (error) {
    console.error(error);
  }
}

async function fetchDetailCommon(contentId) {
  try {
    const apiResponseData = await axios.get(
      `${config.publicUrl}detailCommon1?MobileOS=AND&MobileApp=tripture&_type=json&contentId=${contentId}&defaultYN=Y&firstImageYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&serviceKey=${config.key}`,
    );
    const apiResult = apiResponseData.data;
    return apiResult.response.body.items.item[0];
  } catch (error) {
    console.error(error);
  }
}

async function fetchSearchKeyword(keyword, page) {
  try {
    const apiResponseData = await axios.get(
      `${config.publicUrl}searchKeyword1?pageNo=${page}&MobileOS=AND&MobileApp=tripture&_type=json&keyword=${keyword}&serviceKey=${config.key}`,
    );
    const apiResult = apiResponseData.data.response;
    return apiResult.body;
  } catch (error) {
    console.error(error);
  }
}

async function fetchIsPhotoChallenge(contentId) {
  try {
    const apiResponseData = await axios.get(
      `${config.apiUrl}challenge/check/${contentId}`,
    );
    return apiResponseData.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchPointStoreList(params) {
  try {
    let sendObj = params || {};
    sendObj.page = sendObj.page || '0';
    sendObj.criteria = sendObj.criteria || 'itemViewCount';

    const queryStr = new URLSearchParams(sendObj).toString();
    console.log('queryStr : ', queryStr);

    const response = await axios.get(`${config.apiUrl}item/list?${queryStr}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const fetchBuyItem = async (params) => {
  let sendObj = params || {};
  try {
    const response = await axios.post(`${config.apiUrl}item/buy`, sendObj);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.status == 400) {
      console.log(error);
      return -1;
    } else {
      console.error(error);
    }
  }
};

async function fetchSearchPointStoreList(params) {
  try {
    let sendObj = params || {};
    sendObj.searchOne = sendObj.searchOne || '';
    sendObj.page = sendObj.page || '0';
    sendObj.criteria = sendObj.criteria || 'itemViewCount';

    const queryStr = new URLSearchParams(sendObj).toString();

    console.log('queryStr : ', queryStr);

    const response = await axios.get(`${config.apiUrl}item/search?${queryStr}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchPointStoreDetail(itemId) {
  try {
    const response = await axios.get(`${config.apiUrl}item/detail/${itemId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 포토챌린지 > 주변 포토챌린지 상위 10개
async function fetchSurroundingChallenge(params) {
  try {
    let sendObj = params || {};
    sendObj.lat = sendObj.lat || 37.858039;
    sendObj.lon = sendObj.lon || 127.758664;
    const response = await axios.post(
      `${config.apiUrl}challenge/TopSurroundingChallenge`,
      sendObj,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 포토챌린지 > 인기 포토챌린지 상위 10개
async function fetchPopularChallenge() {
  try {
    const response = await axios.get(
      `${config.apiUrl}post/TopPopularPost?criteria=postLikeCount`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 사용자 총 포인트
async function fetchUserTotalPoint() {
  try {
    const response = await axios.get(`${config.apiUrl}profile/point`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchCommentReplyList(groupId) {
  try {
    const response = await axios.get(
      `${config.apiUrl}comment/nested/${groupId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 포토챌린지 > 포토챌린지 상세 정보 조회
async function fetchChallengeDetail(contentId) {
  console.log(`${config.apiUrl}challenge/challengeId/${contentId}`);
  try {
    const response = await axios.get(
      `${config.apiUrl}challenge/challengeId/${contentId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
async function fetchReport(params) {
  let sendObj = params || {};
  sendObj.reportType = sendObj.reportType || '';
  console.log(sendObj);
  try {
    const response = await axios.post(`${config.apiUrl}report/save`, sendObj);
    return response.data;
  } catch (error) {
    console.error(error);
  }

  console.log('response  >> ', response);

  return response.json();
}

// 마이페이지 > 프로필 및 환경설정 > 챌린지 탭 > 작성한 게시글
async function fetchMyPostList(params) {
  try {
    let sendObj = params || {};
    sendObj.page = sendObj.page || '0';

    const queryStr = new URLSearchParams(sendObj).toString();

    console.log('queryStr : ', queryStr);

    const response = await axios.get(
      `${config.apiUrl}post/myPostList?${queryStr}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 마이페이지 > 프로필 및 환경설정 > 챌린지 탭 > 작성한 댓글
async function fetchMyCommentList(params) {
  try {
    let sendObj = params || {};
    sendObj.page = sendObj.page || '0';

    const queryStr = new URLSearchParams(sendObj).toString();

    const response = await axios.get(
      `${config.apiUrl}comment/myCommentList?${queryStr}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 마이페이지 > 프로필 및 환경설정 > 챌린지 탭 > 챌린지 참여현황
async function fetchMyChallengeState() {
  try {
    const response = await axios.get(`${config.apiUrl}postCnt/cnt`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 마이페이지 > 프로필 및 환경설정 > 포틴트 탭 > 적립 내역
async function fetchMyDurationPointList(params) {
  try {
    let sendObj = params || {};
    sendObj.page = sendObj.page || '0';
    sendObj.startDate = sendObj.startDate || '';
    sendObj.endDate = sendObj.endDate || '';

    const queryStr = new URLSearchParams(sendObj).toString();
    console.log('queryStr  : ', queryStr);

    const response = await axios.get(`${config.apiUrl}point/list?${queryStr}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 마이페이지 > 프로필 및 환경설정 > 스크랩 탭 > 관광지
async function fetchMyBookmarkSightList(params) {
  try {
    let sendObj = params || {};
    sendObj.page = sendObj.page || '0';

    const queryStr = new URLSearchParams(sendObj).toString();
    console.log('queryStr  : ', queryStr);

    const response = await axios.get(
      `${config.apiUrl}bookmark/contents?${queryStr}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 마이페이지 > 프로필 및 환경설정 > 스크랩 탭 > 챌린지
async function fetchMyBookmarkPostList(params) {
  try {
    let sendObj = params || {};
    sendObj.page = sendObj.page || '0';

    const queryStr = new URLSearchParams(sendObj).toString();

    const response = await axios.get(
      `${config.apiUrl}bookmark/photoChallenges?${queryStr}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export {
  fetchLogin_before,
  fetchBuyItem,
  fetchUseMyTicket,
  fetchMyTicketDetail,
  fetchMyTicketList,
  fetchMyUsedTicketList,
  fetchPointStoreList,
  fetchSearchPointStoreList,
  fetchPointStoreDetail,
  fetchDefaultProfile,
  fetchProfileEditForm,
  fetchReport,
  fetchlocationBasedList,
  fetchCommentReplyList,
  fetchPopularCommunityList,
  fetchSearchCommnunityRegion,
  fetchCommunityDetail,
  fetchSaveBookmark,
  fetchDeletePost,
  fetchSurroundingChallenge,
  fetchPopularChallenge,
  fetchChallengeDetail,
  fetchLogin,
  fetchSignUp,
  fetchAreaBasedList,
  fetchDetailCommon,
  fetchSearchKeyword,
  fetchIsPhotoChallenge,
  fetchUserTotalPoint,
  fetchMyPostList,
  fetchMyCommentList,
  fetchMyChallengeState,
  fetchMyDurationPointList,
  fetchMyBookmarkSightList,
  fetchMyBookmarkPostList,
};
