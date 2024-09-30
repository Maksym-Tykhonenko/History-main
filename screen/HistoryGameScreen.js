import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Color} from '../colors/color';
import {GoBack} from '../components/ui/uiIcons';

const {height} = Dimensions.get('window');
const HEIGHT = height * 0.3;

const QuizDescriptionScreen = ({navigation}) => {
  return (
    <ImageBackground
      // source={require('../assets/cardBG/church.jpg')}
      source={require('../assets/newbg/bg.png')}
      blurRadius={4}
      style={styles.background}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Chronicles of Time</Text>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Step into Christchurch Through Time, an immersive journey where
            history, culture, and modern life blend together. Explore the city's
            evolution through interactive zones, each representing a unique
            chapter in Christchurch’s story.
          </Text>
          <Text style={styles.descriptionText}>
            Your exploration begins now!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('HistoryMapScreen')}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: HEIGHT}}></View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 0.8,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Color.deepBlue,
    textAlign: 'center',
    marginBottom: 20,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 30,
    color: Color.deepBlue,
    lineHeight: 38,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 25,
    width: '45%',
    backgroundColor: Color.deepBlue,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default QuizDescriptionScreen;
