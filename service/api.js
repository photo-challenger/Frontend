import axios from 'axios';

const config = {
  publicUrl: process.env.REACT_PUBLIC_SERVER,
  apiUrl: process.env.REACT_API_SERVER,
  key: process.env.REACT_PUBLIC_KEY,
  lang: 'ko-KR',
};

const fetchLogin = async () => {
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
    const response = await axios.get(
      `${config.apiUrl}post/popularPost?${queryStr}`,
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

export {
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
  fetchAreaBasedList,
  fetchDetailCommon,
  fetchSearchKeyword,
  fetchIsPhotoChallenge,
  fetchUserTotalPoint,
};
