import React, { forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const BaseInput = forwardRef(
  ({ title, placeholder, readOnly, inputType, value, onChangeText }, ref) => {
    return (
      <Container>
        {title && <Title>{title}</Title>}
        <Input
          placeholder={placeholder}
          editable={!readOnly}
          keyboardType={inputType}
          placeholderTextColor="#C0C0C0"
          value={value}
          ref={ref}
          onChangeText={(text) => {
            onChangeText ? onChangeText(text) : function () {};
          }}
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
  font-size: 18px;
  margin-bottom: 4px;
  color: #5f5f5f;
  font-family: Semibold;
`;

const Input = styled.TextInput`
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

export default BaseInput;
