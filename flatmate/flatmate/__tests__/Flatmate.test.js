import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mockStore } from "./utils/test-utils";
import { ModalPortal } from 'react-native-modals';
import { AddUserToFlatModal } from '../src/Flatmate/AddUserToFlatModal';
import { BottomNavigationBar } from '../src/common/BottomNavigationBar';
import { CreateFlatModal } from '../src/Flatmate/CreateFlatModal';
import { DashboardScreen } from '../src/Flatmate/DashboardScreen';
import { ManageFlatsScreen } from '../src/Flatmate/ManageFlatsScreen';




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


