import {StyleSheet, Text, View, Image} from 'react-native';
import {Color} from '../../../colors/color';

const QuizIcon = ({focused}) => {
  return (
    <View
      style={{
        backgroundColor: focused ? Color.deepGreen : Color.lightBlue,
        padding: 12,
        borderRadius: 12,
      }}>
      <Image
        source={require('../../../assets/icon/quiz.png')}
        style={{
          width: 30,
          height: 30,
          tintColor: focused ? Color.gold : Color.white,
        }}
      />
    </View>
  );
};

export default QuizIcon;

const styles = StyleSheet.create({});
