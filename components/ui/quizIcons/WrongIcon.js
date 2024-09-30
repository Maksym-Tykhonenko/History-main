import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const WrongIcon = () => {
  return (
    <Image
      source={require('../../../assets/icon/wrong.png')}
      style={{width: 20, height: 20}}
    />
  );
};

export default WrongIcon;

const styles = StyleSheet.create({});
