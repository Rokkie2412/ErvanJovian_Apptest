import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/screens/Home";
import EditContact from "./components/screens/EditContact";
import FlashMessage from "react-native-flash-message";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import reduxStore from './components/redux/store'
import AddContacts from "./components/screens/AddContact";
const App = () => {
  const stack = createNativeStackNavigator()
  const {store,persistor} = reduxStore()
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
            <stack.Screen name="Home" component={Home}/>
            <stack.Screen name="AddContact" component={AddContacts}/>
            <stack.Screen name="EditContact" component={EditContact}/>
          </stack.Navigator>
          <FlashMessage position='top'/>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App