jest.useFakeTimers();
module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)',
    'node_modules/(?!(@react-native|react-native|react-native-flash-message)/)',
    "/node_modules/(?!vue-awesome)"
  ],
};
jest.mock('@react-navigation/native')
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks()
require('jest-fetch-mock').enableMocks()
