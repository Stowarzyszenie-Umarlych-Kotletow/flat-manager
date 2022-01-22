import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mockStore } from "./utils/test-utils";
import store from "../src/store";
import { ModalPortal } from 'react-native-modals';
import App from '../src/App'

test('App Screen renders correctly', () => {
  const tree = renderer.create(<Provider store={mockStore()}><App /></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});