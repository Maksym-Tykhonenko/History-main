import {StyleSheet, Text, View, Image} from 'react-native';
import {Color} from '../../../colors/color';

const OffIcon = () => {
  return (
    <View
      style={{
        // backgroundColor: focused ? Color.deepGreen : Color.lightBlue,
        padding: 12,
        borderRadius: 12,
        backgroundColor: Color.lightBlue,
      }}>
      <Image
        source={require('../../../assets/icon/off.png')}
        style={{
          width: 30,
          height: 30,
          tintColor: Color.deepRed,
          // tintColor: focused ? Color.gold : Color.white,
          // tintColor:
        }}
      />
    </View>
  );
};

export default OffIcon;

const styles = StyleSheet.create({});
