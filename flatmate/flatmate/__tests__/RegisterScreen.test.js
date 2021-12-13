import React from 'react';
import renderer from 'react-test-renderer';
import {parseData, RegisterScreen} from '../src/Accounts/RegisterScreen'

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
  const tree = renderer.create(<RegisterScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});