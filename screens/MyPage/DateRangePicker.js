import React, { useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';

const formatDate = (date) => {
	if (!(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }
	
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

const DateRangePicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date'); // 'date' or 'time'
  const [isStartDatePicker, setIsStartDatePicker] = useState(true);

  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowPicker(Platform.OS === 'ios');

    if (isStartDatePicker) {
      if (props.endDate < currentDate) {
        props.setEndDate(currentDate);
      }
      props.setStartDate(currentDate);
    } else {
      if (currentDate < props.startDate) {
        // Prevent setting end date before start date
        alert("End date cannot be before the start date.");
      } else {
        props.setEndDate(currentDate);
      }
    }
  };

  const showDatePicker = (isStart) => {
    setIsStartDatePicker(isStart);
    setShowPicker(true);
  };

  return (
    <DurationButtonContainer>
      <DateButton onPress={() => showDatePicker(true)} title="Select Start Date">
				<DateButtonText>{formatDate(props.startDate)}</DateButtonText>
			</DateButton>
      {/* startDate.toLocaleDateString() */}
			<Text style={{color:  '#7A7A7A'}}>{' - '}</Text>
      <DateButton onPress={() => showDatePicker(false)} title="Select End Date">
				<DateButtonText>{formatDate(props.endDate)}</DateButtonText>
			</DateButton>
      {/* endDate.toLocaleDateString() */}

      {showPicker && (
        <DateTimePicker
          value={isStartDatePicker ? props.startDate : props.endDate}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}
    </DurationButtonContainer>
  );
};

export default DateRangePicker;

const DurationButtonContainer = styled.View`
  display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const DurationImage = styled.Image`
	width: 20px;
	height: 20px;
`

const DateButton = styled.TouchableOpacity`
	background-color: #85889914;
	border-radius: 5px;
	padding: 5px 10px;
`

const DateButtonText = styled.Text`
	font-size: 11px;
	font-style: normal;
	font-weight: 500;
	color: #7A7A7A;
`