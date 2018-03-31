import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './components/App';
import { StoreProvider } from '../../lib/xtate';

Enzyme.configure({ adapter: new Adapter() })

test('Check Store is provided and Store changes are reflected in the component', () => {

  const appWrapper = mount(<StoreProvider store={{ articles: [] }}><App /></StoreProvider>);

  expect(appWrapper.text().indexOf('No Articles to show') === -1).toBeFalsy();

  appWrapper.find('button').simulate('click');

  return new Promise((resolve) => setTimeout(resolve, 1000)).then(r => {
    expect(appWrapper.text().indexOf('No Articles to show') === -1).toBeTruthy();
  });

});
