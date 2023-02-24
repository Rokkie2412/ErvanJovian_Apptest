import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Search from 'react-native-vector-icons/Ionicons';

const SearchBarComponent = ({search, setSearch, searchSubmit, clear}) => {
  return (
    <View style={styles.searchContainer}>
      <Search style={styles.magnifyingGlass} name="search" size={28} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search contact"
        value={search}
        onChangeText={setSearch}
        style={styles.textInput}
        onEndEditing={searchSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    marginHorizontal: 20,
  },
  magnifyingGlass: {
    alignSelf: 'center',
    color: 'black',
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
});

export default SearchBarComponent;
