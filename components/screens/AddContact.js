import React, {useState} from 'react';
import {
  Text,
  Pressable,
  View,
  StyleSheet,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Ion from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {addContact} from '../redux/redux';
import {openCamera, openGallery, contactValid} from '../Utils/Function';

const AddContacts = ({navigation}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [Error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Age, setAge] = useState('');
  const [imageCamera, setImageCamera] = useState('N/A');
  const dispatch = useDispatch();

  const checkingValidate = () => {
    if (firstName.length < 3 || LastName.length < 3 || Age === '') {
      showMessage({
        message: 'Edit Failed',
        description: errorMessage,
        animationDuration: 600,
        floating: true,
        type: 'warning',
        icon: 'warning',
      });
    } else {
      dispatch(addContact(firstName, LastName, Age, imageCamera));
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Pressable
          testID="backButton"
          onPress={() => navigation.navigate('Home')}>
          <Ion style={styles.backIcon} name="chevron-back-outline" />
        </Pressable>
        <Text style={styles.titleheader}>Save to contact</Text>
        <Pressable
          testID="submitButton"
          onPress={() => {
            checkingValidate();
          }}>
          <Ion style={styles.completeIcon} name="checkmark-sharp" />
        </Pressable>
      </View>
      <View style={styles.photoContainer}>
        <Pressable
          onPress={() => {
            Alert.alert('Choose Media for pick an image', 'Camera or Gallery', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel'),
              },
              {
                text: 'Camera',
                onPress: () => {
                  openCamera(setImageCamera);
                },
              },
              {
                text: 'Gallery',
                onPress: () => {
                  openGallery(setImageCamera);
                },
              },
            ]);
          }}>
          {imageCamera === 'N/A' ? (
            <Ion style={styles.person} name="person" />
          ) : (
            <Image source={{uri: imageCamera}} style={styles.imagePhoto} />
          )}
        </Pressable>
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          value={firstName}
          onChangeText={newFirst => {
            setFirstName(newFirst);
            contactValid(newFirst, setErrorMessage, setError);
          }}
          placeholder="Input Last Name"
          autoCapitalize={'none'}
          autoCorrect={false}
          style={styles.Lastname}
        />
        <TextInput
          value={LastName}
          onChangeText={newLast => {
            setLastName(newLast);
            contactValid(newLast, setErrorMessage, setError);
          }}
          placeholder="Input Last Name"
          autoCapitalize={'none'}
          autoCorrect={false}
          style={styles.Lastname}
        />
        <Text testID="textalert" style={styles.alertText}>
          {Error}
        </Text>
        <TextInput
          value={Age}
          onChangeText={newAge => {
            setAge(newAge);
            if (newAge === '') {
              setErrorMessage('Age must not be empty');
            }
          }}
          style={styles.age}
          placeholder="Age?"
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  alertText: {
    marginHorizontal: 32,
    fontSize: 11,
    color: '#000',
    marginVertical: 7,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 5,
  },
  backIcon: {
    padding: 10,
    fontSize: 30,
    color: '#2C3333',
    borderRadius: 40,
  },
  titleheader: {
    fontSize: 20,
    fontWeight: '600',
    padding: 10,
    color: '#2C3333',
  },
  completeIcon: {
    padding: 10,
    fontSize: 30,
    color: '#2C3333',
    borderRadius: 40,
  },
  person: {
    backgroundColor: '#EEEEEF',
    color: 'white',
    fontSize: 40,
    padding: 20,
    borderRadius: 100,
  },
  photoContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  InputContainer: {
    flex: 1,
  },
  Firstname: {
    backgroundColor: '#EFEFEE',
    borderRadius: 50,
    marginTop: 15,
    marginHorizontal: 12,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  Lastname: {
    color: '#2C3333',
    marginTop: 8,
    marginHorizontal: 35,
    fontWeight: 'bold',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  age: {
    marginTop: 8,
    marginHorizontal: 12,
    fontWeight: 'bold',
    width: 100,
    alignSelf: 'center',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  imagePhoto: {
    height: 90,
    width: 90,
    borderRadius: 50,
  },
});

export default AddContacts;
