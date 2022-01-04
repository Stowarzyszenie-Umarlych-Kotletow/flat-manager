import React from 'react';
import renderer from 'react-test-renderer';
import {HomeScreen} from "../src/Accounts/HomeScreen";
import store from "../src/store";
import {Provider} from 'react-redux';

test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><HomeScreen/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});