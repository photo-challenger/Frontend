import React, { forwardRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const BaseTextarea = forwardRef(
  ({ title, placeholder, readOnly, inputType, value, onChangeText }, ref) => {
    return (
      <Container>
        {title && <Title>{title}</Title>}
        <Textarea
          placeholder={placeholder}
          editable={!readOnly}
          keyboardType={inputType}
          placeholderTextColor="#C0C0C0"
          multiline={true}
          value={value}
          ref={ref}
          numberOfLines={4} // 기본 줄 수 설정 (필요에 따라 조정 가능)
          onChangeText={onChangeText} // 입력 값이 변경될 때마다 state 업데이트
        />
        <Underline />
      </Container>
    );
  },
);

const Container = styled.View`
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
  font-family: Semibold;
`;

const Textarea = styled.TextInput`
  font-size: 16px;
  color: #000;
  padding: 4px 0;
  font-family: Regular;
`;

const Underline = styled.View`
  height: 1px;
  background-color: #e0e0e0;
  margin-top: 4px;
`;

export default BaseTextarea;
