import { useEffect, useState } from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';

export default function ImagePickerProfile({
  profileImage,
  callbackResult,
  borderType,
}) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(profileImage);
  }, [profileImage]);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    callbackResult(result);

    if (!result.canceled) {
      // 선택한 경우
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ position: 'relative' }}>
      <ProfileImage source={ profileImage !== "https://tripture.s3.ap-northeast-2.amazonaws.com/default" ? 
            { uri: profileImage }
            : require('../../assets/profile-default-image.png')} />
      <ProfileImageEditButton activeOpacity={0.8} onPress={pickImage}>
        <ProfileImageEditImage
          source={require('../../assets/profile-edit-icon.png')}
        />
      </ProfileImageEditButton>
    </View>
  );
}
const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border: 6px solid #ca7ffe;
  border-radius: 90px;
`;

const ProfileImageEditButton = styled.TouchableOpacity`
  background-color: #4f4f4f;
  width: 36px;
  height: 36px;
  border-radius: 30px;
  position: absolute;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`;

const ProfileImageEditImage = styled.Image`
  width: 24px;
  height: 24px;
`;
