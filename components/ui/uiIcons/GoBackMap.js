import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../../../colors/color';

const GoBackMap = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={
        {
          // marginTop: 30,
          // alignSelf: 'flex-end',
          // marginRight: 70,
          // marginBottom: 20,
        }
      }>
      <Image
        source={require('../../../assets/icon/back.png')}
        style={{width: 50, height: 50, tintColor: Color.white}}
      />
    </TouchableOpacity>
  );
};

export default GoBackMap;

const styles = StyleSheet.create({});
