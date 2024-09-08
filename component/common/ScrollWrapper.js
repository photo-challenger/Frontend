import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';

const ScrollWrapper = ({ children, loadMoreData, totalPageNo, currPageNo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0); // 페이지 번호

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    // 스크롤이 바닥에 닿으면 페이징처리
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height) {
      if (totalPageNo < currPageNo + 1) {
        setPage((prevPage) => prevPage + 1); // page 더하기
        if (!isLoading) {
          setIsLoading(true);
          loadMoreData(page).then(() => setIsLoading(false)); // 페이징 처리 콜백 호출
        }
      }
    }
  };

  return (
    <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
      {children}
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </ScrollView>
  );
};

export default ScrollWrapper;
