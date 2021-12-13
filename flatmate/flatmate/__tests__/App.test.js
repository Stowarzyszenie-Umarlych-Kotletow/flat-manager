import React from 'react';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<p> Test </p>).toJSON();
  expect(tree).toMatchSnapshot();
});