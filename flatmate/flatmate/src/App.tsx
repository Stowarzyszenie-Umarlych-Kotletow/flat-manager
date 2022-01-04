import * as React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store, { persistor, useAppDispatch, useAppSelector} from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import RootContainer from "./RootContainer";
import { ModalPortal } from 'react-native-modals';


function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <RootContainer />
                <ModalPortal />
            </PersistGate>
        </Provider>
    );
}


export default App;