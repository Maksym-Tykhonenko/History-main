import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import {Color} from '../colors/color';
import {GoBack} from '../components/ui/uiIcons';
// import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using this icon library

const LevelScreen = ({route, navigation}) => {
  const {levelData} = route.params;

  const startQuiz = difficulty => {
    navigation.navigate('QuizScreen', {levelData, difficulty});
  };

  return (
    <ImageBackground
      // source={require('../assets/cardBG/church.jpg')}
      source={require('../assets/newbg/bg.png')}
      blurRadius={4}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Chronicles of Time</Text>

        <View style={styles.guideContainer}>
          <Image
            source={require('../assets/cardBG/James.png')}
            style={styles.avatar}
          />
          <Text style={styles.guideName}>James Bartlett</Text>
        </View>

        <ScrollView style={styles.storyContainer}>
          <Text style={styles.storyText}>{levelData.story}</Text>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.easyButton]}
            onPress={() => startQuiz('easy')}>
            {/* <Icon name="star-o" size={20} color="white" /> */}
            <Text style={styles.buttonText}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.hardButton]}
            onPress={() => startQuiz('hard')}>
            {/* <Icon name="star" size={20} color="white" /> */}
            <Text style={styles.buttonText}>Hard</Text>
          </TouchableOpacity>
        </View>
      </View>
      <GoBack />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // resizeMode: 'cover',
  },
  container: {
    flex: 0.8,
    padding: 20,
    // backgroundColor: 'rgba(255,255,255,0.7)',
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    // color: Color.darkGreen,
    color: Color.deepBlue,
    textAlign: 'center',
    marginBottom: 20,
  },
  guideContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: '80%',
    height: 200,
    borderRadius: 25,
    marginRight: 10,
  },
  guideName: {
    fontSize: 22,
    fontWeight: 'bold',
    // color: Color.gold,
    color: Color.deepBlue,
    marginVertical: 10,
  },
  storyContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  storyText: {
    fontSize: 16,
    // color: Color.darkGreen,
    color: Color.deepBlue,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 25,
    width: '45%',
  },
  easyButton: {
    // backgroundColor: Color.gold,
    backgroundColor: Color.lightBlue,
  },
  hardButton: {
    // backgroundColor: Color.darkGreen,
    backgroundColor: Color.deepBlue,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default LevelScreen;
