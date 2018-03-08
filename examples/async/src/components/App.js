import React from 'react';
import Button from './Button';
import DogDetail from './DogDetail';
import { StoreProvider } from 'xtate';

export default class App extends React.Component {

  render() {
    return (
      <StoreProvider>
        <Button />
        <DogDetail />
      </StoreProvider>
    );
  }
}

