import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Color} from '../../../colors/color';
import {useHistoryContext} from '../../../store/storeContext';


const ResetGame = () => {
  const {resetGameData} = useHistoryContext();
//   const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        resetGameData();
        // navigation.goBack();
      }}
      style={{
        alignSelf: 'flex-start',
      }}>
      <Image
        source={require('../../../assets/icon/restart.png')}
        style={{width: 50, height: 50, tintColor: Color.white }}
      />
    </TouchableOpacity>
  );
};

export default ResetGame;

const styles = StyleSheet.create({});
