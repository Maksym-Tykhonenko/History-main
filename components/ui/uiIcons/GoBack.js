import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../../../colors/color';

const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{position: 'absolute', bottom: 50, right: 70}}>
      <Image
        source={require('../../../assets/icon/back.png')}
        style={{width: 50, height: 50, tintColor: Color.white + 90}}
      />
    </TouchableOpacity>
  );
};

export default GoBack;

const styles = StyleSheet.create({});
