import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mockStore } from "./utils/test-utils";
import store from "../src/store";
import { ModalPortal } from 'react-native-modals';
import { CreateTransactionGroup } from '../src/Transactions/CreateTransactionGroup';
import { TransactionCard } from '../src/Transactions/TransactionCard';
import { TransactionManagementView } from '../src/Transactions/TransactionManagementView';
import { UploadBillModal } from '../src/Transactions/UploadBillPhoto';


let transactionGroup = { 
  id: 1,
  paid_by: 123,
  total: 45,
  date: '21-01-2022',
  title: 'Zakupy Carefour',
  transactions: [
    {
      id: 1,
      name: "ciasteczka",
      total: 10,
      shares: [
        {id: 123, percentage : 60, resolved: true},
        {id: 124, percentage : 40, resolved: false},
      ],
    }
  ],
  participants: [
    123, 122
  ]
};

test('CreateTransactionGroup Screen renders correctly', () => {
  const tree = renderer.create(<Provider store={mockStore()}><CreateTransactionGroup /><ModalPortal/></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});


test('TransactionCard Screen renders correctly', () => {
  const tree = renderer.create(<Provider store={mockStore()}><TransactionCard transactionGroup={{transactionGroup}} /><ModalPortal/></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('TransactionManagementView Screen renders correctly', () => {
  const tree = renderer.create(<Provider store={mockStore()}><TransactionManagementView /><ModalPortal/></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('UploadBillModal Screen renders correctly', () => {
  const tree = renderer.create(<Provider store={mockStore()}><UploadBillModal /><ModalPortal/></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});