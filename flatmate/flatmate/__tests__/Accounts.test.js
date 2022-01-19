import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mockStore } from "./utils/test-utils";
import store from "../src/store";
import { ModalPortal } from 'react-native-modals';
import { parseRegisterData, RegisterScreen } from '../src/Accounts/RegisterScreen'
import { LoginScreen, parseLoginData } from '../src/Accounts/LoginScreen';
import { HomeScreen } from "../src/Accounts/HomeScreen";
import { ChangePasswordScreen } from "../src/Accounts/ChangePasswordScreen";
import { ManageScreenModal } from "../src/Accounts/ManageScreenModal"

test('Parse register data', () => {
    let data = parseRegisterData({
        firstName: "test",
        lastName: "test",
        username: "test",
        email: "test",
        password: "test"
    });
    expect(data).toStrictEqual({
        "firstName": "test",
        "lastName": "test",
        "username": "test",
        "email": "test",
        "password": "test"
    });
});

test('Parse login data', () => {
    let data = parseLoginData({username: "test", password: "test"});
    expect(data).toStrictEqual({"username": "test", "password": "test"});
});

test('RegisterScreen renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><RegisterScreen/> </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('HomeScreen renders correctly', () => {
    const tree = renderer.create(<Provider store={mockStore()}><HomeScreen /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('LoginScreen renders correctly', () => {
    const tree = renderer.create(<Provider store={store} ><LoginScreen /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('ChangePassword Screen renders correctly', () => {
    const tree = renderer.create(<Provider store={mockStore()}><ChangePasswordScreen /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('ManageScreenModal Screen renders correctly', () => {
    const tree = renderer.create(<Provider store={mockStore()}><ManageScreenModal /> <ModalPortal/> </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});

