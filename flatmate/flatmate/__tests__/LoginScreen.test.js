import React from 'react';
import renderer from 'react-test-renderer';
import {parseData, LoginScreen} from '../src/Accounts/LoginScreen'

test('Parse login data', () => {
  let data = parseData({username: "test", password: "test"});
  expect(data).toStrictEqual({"username": "test", "password": "test"});
});

test('renders correctly', () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});