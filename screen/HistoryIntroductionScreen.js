import React, {useRef, useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, View, AppState} from 'react-native';
import {IntroLayout} from '../components/layout';
import {Color} from '../colors/color';
import {
  playBackgroundMusic,
  resetPlayer,
} from '../components/ui/speaker/setupPlayer';

const HistoryIntroductionScreen = ({navigation}) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        await playBackgroundMusic();
        setIsPlayerReady(true);
      } catch (error) {
        //console.error('Error initializing player:', error);
        setIsPlayerReady(true); // Set to true even if there's an error, so the app can render
      }
    };

    initializePlayer();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        resetPlayer();
      } else if (nextAppState === 'active') {
        playBackgroundMusic();
      }
    });

    return () => {
      subscription.remove();
      resetPlayer();
    };
  }, []);
  ///////
  const fadeAnimWelcome = useRef(new Animated.Value(0)).current;
  const scaleAnimWelcome = useRef(new Animated.Value(0.5)).current;
  const slideAnimWelcome = useRef(new Animated.Value(-50)).current;

  const fadeAnimMain = useRef(new Animated.Value(0)).current;
  const scaleAnimMain = useRef(new Animated.Value(0.5)).current;
  const slideAnimMain = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnimWelcome, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimWelcome, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimWelcome, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnimMain, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimMain, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimMain, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => navigation.navigate('TabNavigator'));
  }, [
    fadeAnimWelcome,
    scaleAnimWelcome,
    slideAnimWelcome,
    fadeAnimMain,
    scaleAnimMain,
    slideAnimMain,
  ]);

  return (
    <IntroLayout>
      <Animated.Text
        style={[
          styles.introText,
          {
            opacity: fadeAnimWelcome,
            transform: [
              {scale: scaleAnimWelcome},
              {translateY: slideAnimWelcome},
            ],
          },
        ]}>
        Welcome to
      </Animated.Text>
      <Animated.Text
        style={[
          styles.introText,
          {
            opacity: fadeAnimMain,
            transform: [{scale: scaleAnimMain}, {translateY: slideAnimMain}],
          },
        ]}>
        History Quest Christchurch
      </Animated.Text>
      <Animated.Text style={[styles.subText, {opacity: fadeAnimMain}]}>
        Your adventure through time starts here!
      </Animated.Text>
    </IntroLayout>
  );
};

export default HistoryIntroductionScreen;

const styles = StyleSheet.create({
  introText: {
    fontSize: 46,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    // color: '#4A90E2',
    // color: Color.deepBlue,
    color: Color.white,
  },
  subText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    // color: '#7F8C8D',
    color: Color.gold,
    fontWeight: '700',
  },
});
