import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { HomeScreen } from "../src/Accounts/HomeScreen";
import { mockStore } from "./utils/test-utils";

test('renders correctly', () => {
    const tree = renderer.create(<Provider store={mockStore()}><HomeScreen /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});