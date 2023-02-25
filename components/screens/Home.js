/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import SearchBar from './SearchBar';
import {useSelector, useDispatch} from 'react-redux';
import Ion from 'react-native-vector-icons/Ionicons';
import {showContact} from '../redux/redux';
import {FilterSearch, checkInternet, intervalCheck} from '../Utils/Function';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  let dataArray = useSelector(state => state.arr);
  const [search, setSearch] = useState('');
  const [Filterresult, setFilterResult] = useState([]);

  const getData = () => {
    fetch('https://contact.herokuapp.com/contact')
      .then(response => response.json())
      .then(json => {
        dispatch(showContact(json.data));
        setFilterResult(json.data);
      });
    return dataArray;
  };

  useEffect(() => {
    getData();
    checkInternet();
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    checkInternet();
    getData();
  }, []);

  intervalCheck();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <Ion
          style={styles.refresh}
          onPress={() => {
            getData();
            setSearch('');
            ToastAndroid.show('Refreshed', ToastAndroid.SHORT);
          }}
          name="refresh-outline"
        />
      </View>

      <View>
        <SearchBar
          clear={() => FilterSearch('', dataArray, setFilterResult, setSearch)}
          search={search}
          setSearch={text =>
            FilterSearch(text, dataArray, setFilterResult, setSearch)
          }
        />
      </View>

      <View style={styles.flatlistView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Filterresult.sort((a, b) =>
            a.firstName.localeCompare(b.firstName),
          )}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => {
            return (
              <View style={styles.flatcontainer}>
                <TouchableOpacity
                  testID="EditButton"
                  onPress={() => {
                    navigation.navigate('EditContact', {
                      itemID: item.id,
                      firstName: item.firstName,
                      lastName: item.lastName,
                      age: item.age,
                      photo: item.photo,
                    });
                  }}>
                  <View style={styles.contactList}>
                    {item.photo === 'N/A' ? (
                      <Ion name="person" style={styles.peopleIcon} />
                    ) : (
                      <Image
                        style={styles.imagePhoto}
                        source={{uri: `${item.photo}`}}
                      />
                    )}
                    <Text style={styles.contactName}>
                      {item.firstName} {item.lastName}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          testID="myButton"
          style={styles.addButtonPlus}
          onPress={() => {
            navigation.navigate('AddContact');
          }}>
          <Ion name="add" style={styles.addButton} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    width: '60%',
    marginRight: '1.2%',
  },
  headerTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: '500',
    marginTop: 5,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    fontSize: 40,
    backgroundColor: '#00ae78',
    color: '#f8ffff',
    padding: 10,
    borderRadius: 50,
    bottom: 20,
    right: 13,
  },
  contactList: {
    flexDirection: 'row',
    marginHorizontal: 25,
    marginLeft: 18,
    marginVertical: 13,
  },
  contactName: {
    fontSize: 20,
    color: '#2C3333',
    fontWeight: '500',
    marginLeft: 15,
    textAlign: 'center',
    alignSelf: 'center',
  },
  peopleIcon: {
    fontSize: 23,
    color: '#f8ffff',
    padding: 10,
    backgroundColor: '#dee1e6',
    borderRadius: 50,
  },
  imagePhoto: {
    width: 47,
    height: 47,
    borderRadius: 50,
  },
  flatcontainer: {
    justifyContent: 'center',
    flexGrow: 0,
  },
  flatlistView: {
    flex: 1,
  },
  addButtonPlus: {
    alignItems: 'flex-end',
  },
  refresh: {
    fontSize: 32,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    color: '#2C3333',
  },
});

export default Home;
