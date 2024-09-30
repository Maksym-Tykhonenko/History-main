import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {TabLaout} from '../components/layout';
import {Library} from '../data/Library';
import {Color} from '../colors/color';
import {useHistoryContext} from '../store/storeContext';
import {launchImageLibrary} from 'react-native-image-picker';

const LibraryArticles = ({navigation}) => {
  const {newArticles, createNewArticle, deleteArticle} = useHistoryContext();
  const [newArticle, setNewArticle] = useState({
    image: null,
    // level: '',
    title: '',
    content: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = article => {
    navigation.navigate('ArticleDetail', {article});
  };

  const handleCreateArticle = () => {
    createNewArticle(newArticle);
    setNewArticle({image: null, title: '', content: ''});
    setModalVisible(false);
  };

  const handleDeleteArticle = article => {
    deleteArticle(article);
  };

  const handleImagePicker = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setNewArticle({...newArticle, image: {uri: response.assets[0].uri}});
      }
    });
  };

  const articles = [...newArticles, ...Library];

  return (
    <TabLaout>
      <SafeAreaView></SafeAreaView>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Create New Article</Text>
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {articles.map((article, index) => (
          <LibraryCard
            key={index}
            article={article}
            onPress={() => handlePress(article)}
            onDelete={() => handleDeleteArticle(article)}
            isDeletable={!Library.includes(article)}
          />
        ))}
      </ScrollView>
      <View style={{height: 100}}></View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalBackground}>
          <SafeAreaView></SafeAreaView>
          <ScrollView
            // style={styles.modalView}
            contentContainerStyle={styles.modalView}>
            <Text style={styles.modalText}>Create New Article</Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleImagePicker}>
              <Text style={styles.buttonText}>Pick Image</Text>
            </TouchableOpacity>
            {newArticle.image && (
              <Image
                source={{uri: newArticle.image.uri}}
                style={styles.previewImage}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newArticle.title}
              onChangeText={text => setNewArticle({...newArticle, title: text})}
            />
            {/* <TextInput
              style={styles.input}
              placeholder="Level"
              value={newArticle.level}
              onChangeText={text => setNewArticle({...newArticle, level: text})}
            /> */}
            <TextInput
              style={styles.input}
              placeholder="Content"
              value={newArticle.content}
              onChangeText={text =>
                setNewArticle({...newArticle, content: text})
              }
              multiline
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleCreateArticle}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </TabLaout>
  );
};

const LibraryCard = ({article, onPress, onDelete, isDeletable}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Image source={article.image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{article.title}</Text>
          {/* <Text style={styles.level}>Level: {article.level}</Text> */}
        </View>
      </TouchableOpacity>
      {isDeletable && (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LibraryArticles;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.deepBlue,
    marginBottom: 10,
    textAlign: 'center',
  },
  level: {
    fontSize: 16,
    color: Color.deepBlue,
  },
  createButton: {
    backgroundColor: Color.deepBlue,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: Color.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 10,
    padding: 10,
    width: '100%',
    borderRadius: 12,
    borderColor: Color.deepBlue,
    maxHeight:85
  },
  previewImage: {
    // width: 100,
    height: 140,
    marginBottom: 10,
    width: '60%',
    borderRadius: 12,
  },
  modalButton: {
    backgroundColor: Color.deepBlue,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    margin: 5,
    width: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
  },
});
