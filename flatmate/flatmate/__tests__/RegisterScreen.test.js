import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import {parseData, RegisterScreen} from '../src/Accounts/RegisterScreen'
import store from "../src/store";

test('Parse register data', () => {
    let data = parseData({
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

test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><RegisterScreen/> </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});
