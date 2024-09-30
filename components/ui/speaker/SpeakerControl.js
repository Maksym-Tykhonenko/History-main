import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import TrackPlayer, {
  Capability,
  State,
  Event,
  usePlaybackState,
} from 'react-native-track-player';
import {OffIcon, OnIcon} from '../control';
import {toggleBackgroundMusic} from './setupPlayer';
import {Color} from '../../../colors/color';

const SpeakerControl = () => {
  const [offState, setOffState] = useState(false);
  const playbackState = usePlaybackState();
  const isPlaying = playbackState === State.Playing;

  console.log(offState);

  const handleToggleSound = async () => {
    await toggleBackgroundMusic();
    setOffState(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleToggleSound}
        >
        {offState ? <OffIcon /> : <OnIcon />}
      </TouchableOpacity>
    </View>
  );
};

export default SpeakerControl;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
