import React, {useEffect, useState, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HistoryProvider} from './store/storeContext';
import {
  ArticleDetailScreen,
  HistoryGameScreen,
  HistoryIntroductionScreen,
  HistoryMapScreen,
  LevelScren,
  LibraryArticles,
  QuizScreen,
} from './screen';
import CityHaractersScreen from './screen/CityHaractersScreen';
import {ArticleIcon, QuizIcon, UserIcon} from './components/ui/tabBtn';
import {Color} from './colors/color';
import {
  AppState,
  TouchableOpacity,
  Vibration,
  Dimensions,
  Animated,
  View,
} from 'react-native';
import SpeakerControl from './components/ui/speaker/SpeakerControl';
import HistoryQuestChristchurchProdactScreen from './screen/HistoryQuestChristchurchProdactScreen';

const {height} = Dimensions.get('window');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        title: '',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          borderRadius: 40,
          height: 80,
          paddingTop: height > 670 ? 35 : 10,
          backgroundColor: Color.deepBlue,
          overflow: 'hidden', // This is important for the BlurView
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="HistoryGameScreen"
        component={HistoryGameScreen}
        options={{tabBarIcon: ({focused}) => <QuizIcon focused={focused} />}}
      />
      <Tab.Screen
        name="userScreen"
        component={CityHaractersScreen}
        options={{tabBarIcon: ({focused}) => <UserIcon focused={focused} />}}
      />
      <Tab.Screen
        name="libraryArticles"
        component={LibraryArticles}
        options={{tabBarIcon: ({focused}) => <ArticleIcon focused={focused} />}}
      />
      <Tab.Screen
        name="Speaker"
        component={SpeakerControl}
        options={{
          tabBarIcon: () => <SpeakerControl />,
          tabBarButton: props => (
            <TouchableOpacity {...props} onPress={() => {}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function App() {
  const [route, setRoute] = useState(true);
  //console.log('route==>', route)

  ///////// Route
  const Route = ({isFatch}) => {
    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            initialParams={
              {
                //idfa: idfa,
                //sab1: sab1,
                //pid: pid,
                //uid: appsUid,
                //adToken: adServicesToken,
                //adAtribution: adServicesAtribution,
                //adKeywordId: adServicesKeywordId,
              }
            }
            name="HistoryQuestChristchurchProdactScreen"
            component={HistoryQuestChristchurchProdactScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'simple_push',
          animationDuration: 1000,
        }}>
        <Stack.Screen
          name="HistoryIntroductionScreen"
          component={HistoryIntroductionScreen}
        />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="HistoryMapScreen" component={HistoryMapScreen} />
        <Stack.Screen name="LevelScreen" component={LevelScren} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
      </Stack.Navigator>
    );
  };

  ///////// Louder
  const [louderIsEnded, setLouderIsEnded] = useState(false);
  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      }).start();
      //setLouderIsEnded(true);
    }, 3500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 8000);
  }, []);

  return (
    <HistoryProvider>
      <NavigationContainer>
        {!louderIsEnded ? (
          <View
            style={{
              position: 'relative',
              flex: 1,
              backgroundColor: 'rgba(0,0,0)',
            }}>
            <Animated.Image
              source={require('./assets/newLoaders/Loader1.png')}
              style={{
                //...props.style,
                opacity: appearingAnim,
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
            <Animated.Image
              source={require('./assets/newLoaders/Loader2.png')}
              style={{
                //...props.style,
                opacity: appearingSecondAnim,
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
          </View>
        ) : (
          <Route isFatch={route} />
        )}
      </NavigationContainer>
    </HistoryProvider>
  );
}

export default App;
