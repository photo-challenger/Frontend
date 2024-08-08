const config = {
  baseUrl: process.env.REACT_PUBLIC_SERVER,
  key: process.env.REACT_PUBLIC_KEY,
  lang: 'ko-KR',
};

async function fetchlocationBasedList(params) {
  let sendObj = params || {}
  sendObj.numOfRows = sendObj.numOfRows || 10
  sendObj.pageNo = sendObj.pageNo || 1
  sendObj.MobileOS = sendObj.MobileOS || "ETC"
  sendObj.MobileApp = sendObj.MobileApp || "Tripture"
  sendObj._type = sendObj._type || "JSON"
  sendObj.listYN = sendObj.listYN || "Y"
  sendObj.arrange = sendObj.arrange || "A"
  sendObj.contentTypeId = sendObj.contentTypeId || ""
  sendObj.mapX = sendObj.mapX || 127.2178524
  sendObj.mapY = sendObj.mapY || 37.2561572
  sendObj.radius = sendObj.radius || 2000

  const queryStr = new URLSearchParams(sendObj).toString();
  
  const response = await fetch(
    `${config.baseUrl}locationBasedList1?serviceKey=${config.key}&${queryStr}`,
  )

  return response.json();
}


export { fetchlocationBasedList};