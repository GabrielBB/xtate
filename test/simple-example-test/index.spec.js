import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './components/App';
import { StoreProvider } from '../../lib/xtate';

Enzyme.configure({ adapter: new Adapter() })

const appWrapper = mount(<StoreProvider store={{ articles: [] }}><App /></StoreProvider>);

test('Check that component is properly mounted', () => {
  expect(appWrapper.text()).toBe('No Articles to show');
});

test('Check that lowest component has access to the store', () => {
  expect(appWrapper.childAt(0).childAt(0).instance().context.xtate.store.articles)
    .toBeDefined()
});

test('Check that actions dispatching communicate the changes to the components', () => {
  appWrapper.find('button').simulate('click');
  return new Promise((resolve) => setTimeout(resolve, 1000)).then(r => {
    expect(appWrapper.text().indexOf('No Articles to show') === -1).toBeTruthy();

    expect(appWrapper.html()).toContain('<li>Article 1</li>');
  });
});
