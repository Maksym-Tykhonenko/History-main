import React, {useState, forwardRef, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Vibration,
  ImageBackground,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Color} from '../colors/color';
import {useHistoryContext} from '../store/storeContext';
import {useNavigation} from '@react-navigation/native';
import {CITY_ICON} from '../data/cityIconData';
import {GoBack, GoBackMap, ResetGame} from '../components/ui/uiIcons';

const initialRegion = {
  latitude: -43.53205162938437,
  longitude: 172.6360443730743,
  latitudeDelta: 0.0362,
  longitudeDelta: 0.0361,
};

const HistoryMapScreen = forwardRef((props, ref) => {
  const [region, setRegion] = useState(initialRegion);
  const {
    gameData,
    calculateTotalScores,
    canUnlockNextLevelWithHardScore,
    unlockNextLevelWithHardScore,
  } = useHistoryContext();
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [totalScores, setTotalScores] = useState({easyTotal: 0, hardTotal: 0});

  useEffect(() => {
    const scores = calculateTotalScores();
    setTotalScores(scores);
  }, [gameData]);

  const getIconForItem = itemId => {
    const iconData = CITY_ICON.find(icon => icon.id === itemId);
    return iconData ? iconData.icon : null;
  };

  const zoomIn = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    });
  };

  const zoomOut = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 1.1,
      longitudeDelta: region.longitudeDelta * 1.1,
    });
  };

  const navigateToLocation = coordinates => {
    mapRef.current.animateToRegion(
      {
        ...coordinates,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000,
    );
  };

  const renderCard = ({item}) => (
    <TouchableOpacity
      style={[
        styles.card,
        item.isLocked && styles.lockedCard,
        selectedCard === item.id && styles.selectedCard,
      ]}
      onPress={() => {
        if (!item.isLocked) {
          navigateToLocation(item.coordinates);
          setSelectedCard(item.id);
        }
      }}
      disabled={item.isLocked}>
      <Text style={styles.cardText}>{item.name}</Text>
      {/* <Text style={styles.coordsText}>
        Lat: {item.coordinates.latitude.toFixed(4)}, Lon:{' '}
        {item.coordinates.longitude.toFixed(4)}
      </Text> */}
      {!item.isLocked && (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Easy: {item.quizScore.easy}/10</Text>
          <Text style={styles.scoreText}>Hard: {item.quizScore.hard}/10</Text>
        </View>
      )}
      {selectedCard === item.id && !item.isLocked && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.levelButton}
            onPress={() => {
              navigation.navigate('LevelScreen', {levelData: item});
              Vibration.vibrate();
            }}>
            <Text style={styles.levelButtonText}>Start Level</Text>
          </TouchableOpacity>
          {canUnlockNextLevelWithHardScore(item.id) && (
            <TouchableOpacity
              style={[styles.levelButton, styles.unlockButton]}
              onPress={() => {
                unlockNextLevelWithHardScore(item.id);
                setSelectedCard(null);
              }}>
              <Text style={styles.levelButtonText}>Unlock Next (16 Hard)</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/newbg/bg.png')}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.totalScoreContainer}>
          <Text style={styles.totalScoreText}>
            Total Easy Score: {totalScores.easyTotal}
          </Text>
          <Text style={styles.totalScoreText}>
            Total Hard Score: {totalScores.hardTotal}
          </Text>
        </View>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          // language="en"

          mapType="standard"
          onRegionChangeComplete={setRegion}>
          {gameData.map(item => {
            const icon = getIconForItem(item.id);
            return (
              <Marker
                key={item.id}
                coordinate={item.coordinates}
                title={item.name}
                opacity={item.isLocked ? 0.5 : 1}>
                {icon && (
                  <Image
                    source={icon}
                    style={[
                      styles.markerIcon,
                      item.isLocked && styles.lockedMarkerIcon,
                    ]}
                  />
                )}
              </Marker>
            );
          })}
        </MapView>
        <View style={styles.buttonContainerMap}>
          <TouchableOpacity style={styles.buttonMap} onPress={zoomIn}>
            <Text style={styles.buttonTextMap}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonMap} onPress={zoomOut}>
            <Text style={styles.buttonTextMap}>-</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={gameData}
          renderItem={renderCard}
          keyExtractor={item => item.id}
          style={styles.cardList}
          showsVerticalScrollIndicator={false}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginBottom: 20,
            justifyContent: 'space-around',
          }}>
          <ResetGame />
          <GoBackMap />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
});

export default HistoryMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.lightGreen + 90,
    // backgroundColor: Color.gold,
    padding: 3,
  },
  safeArea: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '40%', // Reduced map height to accommodate the vertical list
    borderRadius: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  buttonContainerMap: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: '80%',
    // marginTop: 10,
    position: 'absolute',
    top: '30%',
    gap: 20,
    right: 20,
  },
  buttonTextMap: {
    fontSize: 20,
    color: 'white',
  },
  buttonMap: {
    backgroundColor: Color.lightBlue,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  button: {
    backgroundColor: Color.lightBlue,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  cardList: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: Color.lightBlue,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  coordsText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  scoreText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  levelButton: {
    backgroundColor: Color.deepBlue,
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  levelButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  unlockButton: {
    backgroundColor: Color.gold,
  },
  markerIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  lockedCard: {
    opacity: 0.5,
  },
  lockedMarkerIcon: {
    opacity: 0.7,
  },
  selectedCard: {
    borderColor: Color.deepBlue,
    borderWidth: 3,
  },
  totalScoreContainer: {
    backgroundColor: Color.deepBlue,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalScoreText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
