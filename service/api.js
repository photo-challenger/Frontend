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

export {
  fetchlocationBasedList,
  fetchPopularCommunityList,
  fetchSearchCommnunityRegion,
  fetchCommunityDetail,
  fetchSaveBookmark,
  fetchDeletePost,
  fetchLogin,
};
