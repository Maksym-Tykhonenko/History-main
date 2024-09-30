import {Image, StyleSheet, Text, View} from 'react-native';
const CorrectIcon = () => {
  return (
    <Image
      source={require('../../../assets/icon/correct.png')}
      style={{width: 20, height: 20}}
    />
  );
};

export default CorrectIcon;

const styles = StyleSheet.create({});
