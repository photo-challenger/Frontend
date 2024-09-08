import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Animated } from 'react-native';

const ScrollWrapper = ({ children, loadMoreData, totalPageNo, currPageNo }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    // 바닥에 닿았을 때 페이징 콜백
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 2) {
      if (!isLoading && totalPageNo > currPageNo) {
        setIsLoading(true);
        loadMoreData(currPageNo + 1).then(() => {
          setIsLoading(false);
        });
      }
    }
  };

  return (
    <Animated.ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      nestedScrollEnabled={true}
    >
      {children}
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </Animated.ScrollView>
  );
};

export default ScrollWrapper;
