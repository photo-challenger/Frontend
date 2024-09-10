import { useState } from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

export default function ImagePickerItem({ callbackResult, borderType }) {
  const [image, setImage] = useState(null);

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
    <View style={styles.container}>
      {image ? (
        <>
          <TouchableOpacity onPress={pickImage} style={styles.overlayButton} activeOpacity={0.8}>
          {borderType === 'circle' ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Image source={{ uri: image }} style={styles.image} />
          )}
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={pickImage} style={(borderType === 'circle') ? styles.buttonCircle : styles.buttonQuad} activeOpacity={0.8}>
          <Image source={require('../../assets/camera-icon.png')} style={styles.iconImage} />
          {borderType !== 'circle' && <Text style={styles.textStyle}>사진 추가</Text>}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * (0.75),
    height: width * (0.75),
    borderRadius: 5
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  buttonCircle: {
    backgroundColor: 'rgba(196, 196, 196, 0.45)',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'rgb(196, 196, 196)',
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonQuad: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgb(196, 196, 196)',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 30,
    height: 30
  },
  textStyle: {
    fontSize: 12,
    color: '#7A7A7A',
  }
});
