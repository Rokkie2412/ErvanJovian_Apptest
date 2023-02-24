import React from 'react';
import Home from '../components/screens/Home';
import {Provider} from 'react-redux';
import {mainReducer} from '../components/redux/redux';
import {createStore} from 'redux';
import {create} from 'react-test-renderer';

jest.mock('react-native-vector-icons/Ionicons', () => 'MockedIonicons');

jest.useFakeTimers();

jest.mock(
  'react-native-flash-message',
  () => 'Mockedreact-native-flash-message',
);

jest.mock(
  'react-native-image-picker',
  () => 'Mocked react-native-image-picker',
);

jest.mock('@react-native-community/netinfo', () => ({
  fetch: () => Promise.resolve(jest.fn()),
}));

const navigation = {
  navigate: jest.fn(),
};

const store = createStore(mainReducer, {status: 'default status'});
const tree = create(
  <Provider store={store}>
    <Home navigation={navigation} />
  </Provider>,
);

test('Snap test Home pages', () => {
  expect(tree).toMatchSnapshot();
});

test('navigation to Add Contact', () => {
  const button = tree.root.findByProps({testID: 'myButton'}).props;
  button.onPress();
  expect(navigation.navigate).toBeCalledWith('AddContact');
});
