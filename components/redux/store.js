import { createStore } from "redux";
import { mainReducer } from "./redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig={
    key:'root',
    storage:AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig,mainReducer)

export default() => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return{ store, persistor }
}
