import React, { useMemo, useState } from 'react';
import { WebView } from 'react-native-webview';
import { MAP_APP_KEY } from '@env';

const KakaoMap = (props) => {
  const tourList = props.tourList;
  const challengeList = props.challengeList;
  const currCoords = props.coords;
  const latitude = currCoords.latitude;
  const longitude = currCoords.longitude;

  const [centerCoords, setCenterCoords] = useState({
    latitude: props.coords.latitude,
    longitude: props.coords.longitude,
  });

  // Convert tourList to an array if it's a JSON string
  const positions_tour = Array.isArray(tourList)
    ? tourList
    : JSON.parse(tourList || '[]');
  const positions_chlng = Array.isArray(challengeList)
    ? challengeList
    : JSON.parse(challengeList || '[]');

  // console.log('positions_tour  >> ', positions_tour);
  // console.log('positions_chlng  >> ', positions_chlng);

  const html = useMemo(
    () => `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${MAP_APP_KEY}&libraries=services,clusterer,drawing"></script>
    </head>
    <body>
      <div id="map" style="width:100vw; height:100vh; position:absolute; top:0; left:0;"></div>
      <script type="text/javascript">
        (function () {
          var mapContainer = document.getElementById('map'), // Div to display the map
          mapOption = {
            center: new kakao.maps.LatLng(${latitude}, ${longitude}), // Map center coordinates
            level: 5 // Map zoom level
          };

          var map = new kakao.maps.Map(mapContainer, mapOption); // Create the map
          
          // Markers' positions
          const positions_tour = ${JSON.stringify(positions_tour)};
          const positions_chlng = ${JSON.stringify(positions_chlng)};
          
          // Marker image source
          const imageSrc_tour = 'https://tripture.s3.ap-northeast-2.amazonaws.com/staticResource/default_mark.png'
          const imageSrc_chlng = 'https://tripture.s3.ap-northeast-2.amazonaws.com/dummy/be_challenge.jpg'

          positions_tour.forEach(item => {
            var imageSize = new kakao.maps.Size(35, 40); 
            var latlng = new kakao.maps.LatLng(parseFloat(item.mapy), parseFloat(item.mapx));
            var markerImage = new kakao.maps.MarkerImage(imageSrc_tour, imageSize); 

            var marker = new kakao.maps.Marker({
              map: map,
              position: latlng,
              title: item.title,
              image: markerImage,
              clickable: true 
            });

            var content = '<div class="label" style="margin-top:10px"><span class="left"></span><span class="center" style="font-size:12px; color: #CA7FFE;font-weight: 500;font-family: Pretendard;">' + item.title + '</span><span class="right"></span></div>';

            var customOverlay = new kakao.maps.CustomOverlay({
              position: latlng,
              content: content
            });

            customOverlay.setMap(map);

            // 마커에 클릭이벤트를 등록
            kakao.maps.event.addListener(marker, 'click', function() {
              // Send marker details back to React Native
              window.ReactNativeWebView.postMessage(JSON.stringify({ marker: { title: item.title, mapx: item.mapx, mapy: item.mapy } }));
            });

            kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
              window.ReactNativeWebView.postMessage(JSON.stringify({
                mapClick: {
                  latitude: mouseEvent.latLng.getLat(),
                  longitude: mouseEvent.latLng.getLng()
                }
              }));
            });
          });

          positions_chlng.forEach(item => {
            var imageSize = new kakao.maps.Size(35, 40); 
            var latlng = new kakao.maps.LatLng(parseFloat(item.challengeLat), parseFloat(item.challengeLon));
            var markerImage = new kakao.maps.MarkerImage(imageSrc_chlng, imageSize); 

            var marker = new kakao.maps.Marker({
              map: map,
              position: latlng,
              title: item.challengeName,
              image: markerImage,
              clickable: true 
            });

            var content = '<div class="label" style="margin-top:10px"><span class="left"></span><span class="center" style="font-size:12px; color: #CA7FFE;font-weight: 500;font-family: Pretendard;">' + item.challengName + '</span><span class="right"></span></div>';

            var customOverlay = new kakao.maps.CustomOverlay({
              position: latlng,
              content: content
            });

            customOverlay.setMap(map);

            // 마커에 클릭이벤트를 등록
            kakao.maps.event.addListener(marker, 'click', function() {
              // Send marker details back to React Native
              window.ReactNativeWebView.postMessage(JSON.stringify({ marker: item }));
            });

            kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
              window.ReactNativeWebView.postMessage(JSON.stringify({
                mapClick: {
                  latitude: mouseEvent.latLng.getLat(),
                  longitude: mouseEvent.latLng.getLng(),
                  title: item.challengeName,
                  challengeId: item.challengeId, 
                  challengeName: item.challengeName
                }
              }));
            });
          });

          // 지도 드래그 이벤트 등록
          kakao.maps.event.addListener(map, 'dragend', function() {        
            var latlng = map.getCenter(); 
            const lat = latlng.getLat();
            const lng = latlng.getLng();
            
            // Send updated coordinates back to React Native
            window.ReactNativeWebView.postMessage(JSON.stringify({ latitude: lat, longitude: lng }));
          });
          
        })();
      </script>
    </body>
  </html>
  `,
    [positions_tour, positions_chlng],
  );

  const onMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log('data   :  ', data);
    if (data.latitude !== undefined) {
      setCenterCoords({
        latitude: data.latitude,
        longitude: data.longitude,
      });
      props.setCoords({
        latitude: data.latitude,
        longitude: data.longitude,
      });
    } else if (data.marker !== undefined) {
      let param = null;
      if (data.marker.mapx) {
        param = tourList.find((x) => {
          return x.mapx == data.marker.mapx;
        });
      } else if (data.marker.challengeLon) {
        param = challengeList.find((x) => {
          return x.challengeLon == data.marker.challengeLon;
        });
      }

      props.getMarkerInfo(param);
    } else if (data.mapClick !== undefined) {
      props.getMarkerInfo();
    }
  };

  return (
    <WebView
      source={{ html: html }}
      style={{ flex: 1 }}
      onMessage={onMessage}
      originWhitelist={['*']}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowFileAccess={true}
      allowFileAccessFromFileURLs={true}
      allowUniversalAccessFromFileURLs={true}
      allowingReadAccessToURL={'*'}
      mixedContentMode="always"
    />
  );
};

export default KakaoMap;
