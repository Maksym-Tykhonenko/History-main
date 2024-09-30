import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const TabLaout = ({children}) => {
  return (
    <ImageBackground
      // source={require('../../assets/cardBG/church.jpg')}
      source={require('../../assets/newbg/bg.png')}
      blurRadius={4}
      style={styles.mainImage}>
      {/* <SafeAreaView></SafeAreaView> */}
      {children}
    </ImageBackground>
  );
};

export default TabLaout;

const styles = StyleSheet.create({
  mainImage: {flex: 1,
    resizeMode: 'cover',},
});
