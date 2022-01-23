import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mockStore } from "./utils/test-utils";
import store from "../src/store";
import { ModalPortal } from 'react-native-modals';
import { validateForm, AddTaskModal } from '../src/components/tasks/AddTaskModal';
import { TaskDetailsModal } from '../src/components/tasks/TaskDetailsModal';
import { ViewCalendarScreen } from '../src/screens/tasks/ViewCalendarScreen';

import App from '../src/App'

test('Task data validation', () => {
  let data = {
      name: "test",
      deadline: new Date("2022-01-02"),
      users: [123, 412]
  }

  expect(validateForm(data)).toStrictEqual(true);
});


test('ViewCalendarScreen Screen renders correctly', () => {
  const tree = renderer.create(<Provider store={mockStore()}><ViewCalendarScreen /></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('AddTaskModal Screen renders correctly', () => {
  const tree = renderer.create(<Provider store={mockStore()}><AddTaskModal /><ModalPortal/></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TaskDetailsModal Screen renders correctly', () => {
  const tree = renderer.create(<Provider store={mockStore()}><TaskDetailsModal /><ModalPortal/></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});