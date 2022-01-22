import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mockStore } from "./utils/test-utils";
import { ModalPortal } from 'react-native-modals';
import { AddUserToFlatModal } from '../src/components/main/AddUserToFlatModal';
import { BottomNavigationBar } from '../src/components/main/BottomNavigationBar';
import { CreateFlatModal } from '../src/components/main/CreateFlatModal';
import { DashboardScreen } from '../src/screens/main/DashboardScreen';
import { ManageFlatsScreen } from '../src/screens/main/ManageFlatsScreen';




test('AddUserToFlatModal Screen renders correctly', () => {
    const tree =  renderer.create(<Provider store={mockStore()}><AddUserToFlatModal /> <ModalPortal/> </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('BottomNavigationBar Screen renders correctly', () => {
    const tree =  renderer.create(<Provider store={mockStore()}><BottomNavigationBar /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('CreateFlatModal Screen renders correctly', () => {
    const tree =  renderer.create(<Provider store={mockStore()}><CreateFlatModal /> <ModalPortal/> </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('DashboardScreen Screen renders correctly', () => {
    const tree =  renderer.create(<Provider store={mockStore()}><DashboardScreen /> <ModalPortal/> </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('ManageFlatsScreen Screen renders correctly', () => {
    const tree =  renderer.create(<Provider store={mockStore()}><ManageFlatsScreen /> <ModalPortal/> </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});


