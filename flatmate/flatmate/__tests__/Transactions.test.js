import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mockStore } from "./utils/test-utils";
import store from "../src/store";
import { ModalPortal } from 'react-native-modals';
import { CreateTransactionGroupModal } from '../src/components/transactions/CreateTransactionGroupModal';
import { TransactionCard } from '../src/components/transactions/TransactionCard';
import { TransactionManagementScreen } from '../src/screens/transactions/TransactionManagementScreen';
import { UploadBillModal } from '../src/components/transactions/UploadBillPhotoModal';


test('CreateTransactionGroupModal Screen renders correctly', () => {
  const tree = renderer.create(<Provider store={mockStore()}><CreateTransactionGroupModal /><ModalPortal/></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TransactionManagementView Screen renders correctly', () => {
  const tree = renderer.create(<Provider store={mockStore()}><TransactionManagementScreen /><ModalPortal/></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('UploadBillModal Screen renders correctly', () => {
  const tree = renderer.create(<Provider store={mockStore()}><UploadBillModal /><ModalPortal/></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});