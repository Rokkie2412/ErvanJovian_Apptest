import {showMessage} from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const FilterSearch = (text, data, setFilter, setSearch) => {
  if (text) {
    const newData = data.filter(item => {
      const itemData = item.firstName
        ? item.firstName.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilter(newData);
    setSearch(text);
  } else {
    setFilter(data);
    setSearch(text);
  }
  return text;
};

export const checkInternet = () => {
  NetInfo.fetch('https://contact.herokuapp.com/contact').then(networkState => {
    if (networkState.isConnected !== true) {
      showMessage({
        message: 'Not connected to server',
        description:
          'Connection Error Check Your Internet Connection, Press to restart app',
        floating: true,
        type: 'warning',
        icon: 'warning',
        animationDuration: 600,
        autoHide: false,
        onPress: () => {
          RNRestart.Restart();
        },
      });
    }
  });
};

export const intervalSet = () => {
  setInterval(() => {
    checkInternet();
    clearInterval(10000);
  }, 10000);
};

export const intervalCheck = () => {
  const interval = intervalSet();
  return interval;
};

export const openCamera = setImageCamera => {
  const option = {
    mediaType: 'photo',
    quality: 0.7,
  };
  launchCamera(option, res => {
    if (res.didCancel) {
      console.log('User Cancel Pick Image From Photo');
    } else if (res.errorCode) {
      console.log(res.errorMessage);
    } else {
      const data = res.assets[0];
      setImageCamera(data.uri);
    }
  });
};

export const openGallery = setImageCamera => {
  const option = {
    mediaType: 'photo',
    quality: 0.7,
  };
  launchImageLibrary(option, res => {
    if (res.didCancel) {
      console.log('User Cancel Image Picker');
    } else if (res.errorCode) {
      console.log(res.errorMessage);
    } else {
      const data = res.assets[0];
      setImageCamera(data.uri);
      console.log(data);
    }
  });
};

export const contactValid = (first, setMessage, setError) => {
  if (first.length < 3) {
    setError('First name and last name length atleast must have 3 character');
    setMessage('Last name length atleast mush have 3 character');
  } else {
    setMessage('');
    setError('');
  }
};
