import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const IntroLayout = ({children}) => {
  return (
    <ImageBackground
      // source={require('../../assets/cardBG/intro.jpg')}
      source={require('../../assets/newbg/bg.png')}
      style={{flex: 1}}
      resizeMode="cover">
      <SafeAreaView style={{marginTop: '40%'}}></SafeAreaView>
      {children}
    </ImageBackground>
  );
};

export default IntroLayout;

const styles = StyleSheet.create({});
