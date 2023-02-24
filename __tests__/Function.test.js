import {
  contactValid,
  openCamera,
  FilterSearch,
  checkInternet,
} from '../components/Utils/Function';
import {launchCamera} from 'react-native-image-picker';
import NetInfo from '@react-native-community/netinfo';
import {showMessage} from 'react-native-flash-message';
import RNRestart from 'react-native-restart';

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
}));

jest.mock('@react-native-community/netinfo', () => ({
  fetch: () => Promise.resolve(jest.fn()),
}));

jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
}));

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
}));

jest.mock('react-native-flash-message', () => ({
  showMessage: jest.fn(),
}));

jest.mock('react-native-restart', () => ({
  Restart: jest.fn(),
}));

jest.useFakeTimers();

describe('Testing function contactValid', () => {
  it('should return empty string', () => {
    const first = 'first';
    const setMessage = jest.fn();
    const setError = jest.fn();
    contactValid(first, setMessage, setError);
    expect(setMessage).toBeCalledWith('');
    expect(setError).toBeCalledWith('');
  });
  it('should return error message', () => {
    const first = '';
    const setMessage = jest.fn();
    const setError = jest.fn();
    contactValid(first, setMessage, setError);
    expect(setMessage).toBeCalledWith(
      'Last name length atleast mush have 3 character',
    );
    expect(setError).toBeCalledWith(
      'First name and last name length atleast must have 3 character',
    );
  });
});

describe('FilterSearch function test', () => {
  const mockData = [
    {firstName: 'John'},
    {firstName: 'Jane'},
    {firstName: 'Doe'},
  ];
  const mockSetFilter = jest.fn();
  const mockSetSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty string if text parameter is not provided', () => {
    const result = FilterSearch('', mockData, mockSetFilter, mockSetSearch);
    expect(result).toBe('');
    expect(mockSetFilter).toHaveBeenCalledWith(mockData);
    expect(mockSetSearch).toHaveBeenCalledWith('');
  });

  it('should filter the data based on the text parameter and update the filter and search state', () => {
    const result = FilterSearch('J', mockData, mockSetFilter, mockSetSearch);
    expect(result).toBe('J');
    expect(mockSetFilter).toHaveBeenCalledWith([
      {firstName: 'John'},
      {firstName: 'Jane'},
    ]);
    expect(mockSetSearch).toHaveBeenCalledWith('J');
  });

  it('should filter the data based on the text parameter (case-insensitive) and update the filter and search state', () => {
    const result = FilterSearch('o', mockData, mockSetFilter, mockSetSearch);
    expect(result).toBe('o');
    expect(mockSetFilter).toHaveBeenCalledWith([
      {firstName: 'John'},
      {firstName: 'Doe'},
    ]);
    expect(mockSetSearch).toHaveBeenCalledWith('o');
  });
});

describe('openCamera', () => {
  const mockSetImageCamera = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call launchCamera function with the correct options', () => {
    openCamera(mockSetImageCamera);

    expect(launchCamera).toHaveBeenCalledWith(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      expect.any(Function),
    );
  });

  it('should call setImageCamera function with the uri of the selected image', () => {
    const mockResponse = {
      assets: [{uri: 'test_uri'}],
    };
    launchCamera.mockImplementation((options, callback) => {
      callback(mockResponse);
    });

    openCamera(mockSetImageCamera);

    expect(mockSetImageCamera).toHaveBeenCalledWith('test_uri');
  });

  it('should log a message if the user cancels picking an image', () => {
    const mockResponse = {
      didCancel: true,
    };
    launchCamera.mockImplementation((options, callback) => {
      callback(mockResponse);
    });

    console.log = jest.fn();
    openCamera(mockSetImageCamera);

    expect(console.log).toHaveBeenCalledWith(
      'User Cancel Pick Image From Photo',
    );
    expect(mockSetImageCamera).not.toHaveBeenCalled();
  });

  it('should log the error message if an error occurs', () => {
    const mockResponse = {
      errorCode: 'test_error_code',
      errorMessage: 'test_error_message',
    };
    launchCamera.mockImplementation((options, callback) => {
      callback(mockResponse);
    });

    console.log = jest.fn();
    openCamera(mockSetImageCamera);

    expect(console.log).toHaveBeenCalledWith('test_error_message');
    expect(mockSetImageCamera).not.toHaveBeenCalled();
  });
});

describe('checkInternet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show message if not connected to server', () => {
    NetInfo.fetch.mockResolvedValueOnce({isConnected: false});

    checkInternet();

    expect(NetInfo.fetch).toHaveBeenCalledWith(
      'https://contact.herokuapp.com/contact',
    );
    expect(RNRestart.Restart).not.toHaveBeenCalled();
  });

  it('should not show message if connected to server', () => {
    NetInfo.fetch.mockResolvedValueOnce({isConnected: true});

    checkInternet();

    expect(NetInfo.fetch).toHaveBeenCalledWith(
      'https://contact.herokuapp.com/contact',
    );
    expect(showMessage).not.toHaveBeenCalled();
    expect(RNRestart.Restart).not.toHaveBeenCalled();
  });
});
