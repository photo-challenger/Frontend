import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, StyleSheet, KeyboardAvoidingView, Text, View, Image, ActivityIndicator, Platform, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { fetchSearchKeyword } from '../service/api';

const SearchItemComponent = ({ navigation, item }) => {

	const moveDetail = (id) => {
    navigation.navigate('MainDetailScreen', { contentId: id });
  };

	return (
		<SearchResultItem activeOpacity={0.6} onPress={() => moveDetail(item.contentid)}>
			<SearchResultItemDetail>
				{item.addr1 === '' ? (null) : (
					<>
					<SearchResultRegion>{item.addr1.split(' ')[0]}</SearchResultRegion>
					<View></View>
					</>
				)}
				<View>
					<SearchResultName numberOfLines={1} ellipsizeMode="tail">{item.title}</SearchResultName>
					{item.addr1 === '' ? (null) : (<SearchResultAddress numberOfLines={1} ellipsizeMode="tail">{item.addr1}</SearchResultAddress>)}
				</View>
			</SearchResultItemDetail>
			{item.firstimage === '' ? (<SearchResultImage source={require('../assets/tripture-no-content.png')} />) : (<SearchResultImage source={{ uri: item.firstimage }} />)}
		</SearchResultItem>
	)
}

const MainSearchScreen = ({ route, navigation }) => {
	const { query } = route.params;
	const [searchResult, setSearchResult] = useState([]);
	const [searchKeyword, setSearchKeyword] = useState(query);
	const [loading, setLoading] = useState(true);
	const [startLoading, setStartLoading] = useState(true);
	const [totalPage, setTotalPage] = useState(0);
	const [totalCount, setTotalCount] = useState(0);
	const [page, setPage] = useState(2);

	useEffect(() => {
		getSearchResult();
	}, []);

	const getSearchResult = async () => {
		try {
			setStartLoading(true);
			const apiResponseData = await fetchSearchKeyword(searchKeyword, 1);
			setSearchResult(apiResponseData.items.item);
			setTotalPage(Math.ceil(apiResponseData.totalCount / apiResponseData.numOfRows));
			setTotalCount(apiResponseData.totalCount);
		} catch (error) {
			console.error('Failed to fetch region detail content:', error);
		} finally {
			setStartLoading(false);
			setLoading(false);
		}
	};

	const getData = async () => {
		try {
			if (page <= totalPage) {
				setLoading(true);
				const apiResponseData = await fetchSearchKeyword(searchKeyword, page);
				setSearchResult(prevList => [...prevList, ...apiResponseData.items.item]);
				setPage(prevPage => prevPage + 1);
				setLoading(false);
			}
		} catch (error) {
			console.error('Failed to fetch region content:', error);
		}
	}

	const onEndReached = () => {
		if (!loading) {
			getData();
		}
	}

	if (startLoading) {
		return (
			<LoadingContainer>
				<ActivityIndicator size="large" color="#CA7FFE" />
			</LoadingContainer>
		);
	}

	const handleSearchSubmit = () => {
		setPage(2);
		setSearchResult([]);
		getSearchResult();
	};

	return (
		<MainSearchContainer>
			<SearchContainer>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<ChevronLeftImage source={require('../assets/btn-back.png')} />
				</TouchableOpacity>
				<SearchContent>
					<SearchInput
						value={searchKeyword}
						placeholder="어떤 여행지를 찾으세요?"
						onChangeText={(text) => setSearchKeyword(text)}
						placeholderTextColor={"#C4C7CE"}
						onSubmitEditing={() => handleSearchSubmit()}
					/>
				</SearchContent>
			</SearchContainer>
			<SearchHeaderText><Text style={{ color: "#CA7FFE", fontFamily: 'Bold' }}>{totalCount}개</Text>의 장소를 찾았어요.</SearchHeaderText>
			{Array.isArray(searchResult) && searchResult.length != 0 ? (
				<FlatList
					data={searchResult}
					renderItem={({ item }) => <SearchItemComponent item={item} navigation={navigation} />}
					keyExtractor={(item) => item.contentid}
					onEndReached={onEndReached}
					onEndReachedThreshold={0.6}
					style={styles.flatListStyle}
					ListFooterComponent={loading && (
						<View style={{ padding: 10 }}>
							<ActivityIndicator color="#CA7FFE" />
						</View>
					)}
				/>
			) : (
				<LoadingContainer>
					<Text style={{ color: "#858585" }}>검색 결과가 존재하지 않습니다.</Text>
				</LoadingContainer>
			)}
		</MainSearchContainer>
	);
};

export default MainSearchScreen;

const styles = StyleSheet.create({
	keyboardAvoidingView: {
		flex: 1,
	},
	animatedSheet: {
		maxHeight: '100%',
	},
	scrollView: {
		flexGrow: 1, // Changed from flex: 1
	},
	scrollViewContent: {
		flexGrow: 1,
	}
});

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MainSearchContainer = styled.View`
  background: #F7F7F8;
  height: 100%;
`;

const SearchContainer = styled.View`
	display: flex;
	flex-direction: row;
	margin: 30px 14px 0 14px;
	align-items: center;
`

const ChevronLeftImage = styled.Image`
	width: 32px;
	height: 32px;
`

const SearchContent = styled.View`
  display: flex;
  height: 42px;
  border-radius: 30px;
  background: #FFFFFF;
  border: 1.1px solid #666666;
	justify-content: center;
	padding: 8px 24px;
	background: #F7F7F8;
	flex: 1;
`;

const SearchInput = styled.TextInput`
	font-family: Regular;
  font-size: 14px;
  font-style: normal;
`;

const SearchHeaderText = styled.Text`
	font-family: Regular;
	font-size: 14px;
	font-style: normal;
	color: #858585;
	margin-left: 24px;
	margin-top: 18px;
	margin-bottom: 8px;
`

const SearchResultItem = styled.TouchableOpacity`
	display: flex;
	flex-direction: row;
	background-color: #FFFFFF;
	justify-content: space-between;
	padding: 20px 24px;
	border-bottom-width: 1px;
	border-bottom-color: #A6A6A6;
`

const SearchResultItemDetail = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 70%;
`

const SearchResultName = styled.Text`
	font-family: Bold;
	font-size: 18px;
	font-style: normal;
`

const SearchResultRegion = styled.Text`
	font-family: Semibold;
	font-size: 13px;
	font-style: normal;
	color: #FFFFFF;
	background-color: #B5B5B5;
	padding: 6px 14px;
	border-radius: 50px;
	margin-left: -2px;
	position: absolute;
`

const SearchResultAddress = styled.Text`
	font-family: Regular;
	font-size: 14px;
	font-style: normal;
	color: #A6A6A6;
`

const SearchResultImage = styled.Image`
	width: 85px;
	height: 85px;
	border-radius: 8px;
	margin-left: 15px;
`
