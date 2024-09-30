import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Color} from '../colors/color';
import {TabLaout} from '../components/layout';

const CityHaractersScreen = () => {
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedUserName = await AsyncStorage.getItem('userName');
        const savedUserImage = await AsyncStorage.getItem('userImage');
        if (savedUserName) setUserName(savedUserName);
        if (savedUserImage) setUserImage(savedUserImage);
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    loadUserData();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userName', userName);
      if (userImage) await AsyncStorage.setItem('userImage', userImage);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save user data', error);
    }
  };

  const handleImagePicker = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setUserImage(response.assets[0].uri);
      }
    });
  };

  const renderForm = () => (
    <View style={styles.formContainer}>
      <TouchableOpacity onPress={handleImagePicker} style={styles.imagePicker}>
        {userImage ? (
          <Image source={{uri: userImage}} style={styles.userImage} />
        ) : (
          <Text style={styles.imagePickerText}>Pick an Image</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={userName}
        onChangeText={setUserName}
        placeholderTextColor={Color.whiteasf}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );

  const renderUserData = () => (
    <View style={styles.userDataContainer}>
      {userImage && (
        <Image source={{uri: userImage}} style={styles.userImage} />
      )}
      <Text style={styles.userName}>{userName}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setIsEditing(true)}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <TabLaout>
      <SafeAreaView style={styles.container}>
        {isEditing || !userName ? renderForm() : renderUserData()}
      </SafeAreaView>
    </TabLaout>
  );
};

export default CityHaractersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: 20,
    backgroundColor: Color.deepBlue + 70,
    borderRadius: 10,
    // paddingTop: 50,
    // marginTop: 100,
  },
  formContainer: {
    // width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  imagePicker: {
    width: 200,
    height: 100,
    borderRadius: 50,
    backgroundColor: Color.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    color: Color.white,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  input: {
    width: '60%',
    padding: 10,
    // borderColor: Color.lightBlue,
    borderColor: Color.lightGreen,
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 20,
    color: Color.white,
    fontSize: 26,
    marginTop: 50,
  },
  saveButton: {
    backgroundColor: Color.gold,
    padding: 15,
    borderRadius: 10,
  },
  saveButtonText: {
    color: Color.lightGreen,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  userDataContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.gold,
    marginVertical: 20,
  },
  editButton: {
    backgroundColor: Color.gold,
    padding: 15,
    borderRadius: 10,
  },
  editButtonText: {
    color: Color.lightGreen,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
