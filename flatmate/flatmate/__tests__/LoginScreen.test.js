import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import {LoginScreen, parseData} from '../src/Accounts/LoginScreen';
import store from "../src/store";

test('Parse login data', () => {
  let data = parseData({username: "test", password: "test"});
  expect(data).toStrictEqual({"username": "test", "password": "test"});
});

test('renders correctly', () => {
  const tree = renderer.create(<Provider store={store} ><LoginScreen /></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});