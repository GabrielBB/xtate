# Xtate

![see module on NPM](https://nodei.co/npm/xtate.png?downloads=true&downloadRank=true&stars=true)

Simple state managment for React/React Native
 
## THIS LIBRARY IS STILL IN DEVELOPMENT, DON'T TRY TO USE IT. BUT STAY TUNED!
## Usage

## Configure your store with the actions you want to dispatch from any React Component in your app:

```javascript
import { Xtate } from 'xtate';

const initialXtate = { articles: [ {id: 1, text: "Initial Article!"} ] }

const store = new Xtate(initialXtate)

// No need for Spread Operators like in Redux, i'm already giving you a copy of the store, modify that object as you whish!
// No need for Switch and Cases like in Redux, just add different actions as functions
// No need to return the default state like in Redux
// Xtate is calling just the correct action, not like Redux who calls every reducer! 

store.action('SAVE_ARTICLE', function(xtate, payload) {
    xtate.articles.push(payload)
    return xtate;
})

store.action('DELETE_ARTICLE', function(xtate, payload) {
    xtate.articles.splice(payload, 1)
    return xtate;
})

export default store
```

## Import your store to your App component. You can access your store state with "this.props.global" and dispatch your actions with "store.dispatch"

```javascript
import React, { Component } from 'react';
import store from './store/index'

class App extends Component {

  // The global application state comes from this.props.global and normal parameters are in this.props.local
  addNewArticle = () => {
    let articles = this.props.global.articles;
    store.dispatch('SAVE_ARTICLE', { id: 2, text: "Article" })
  }

  }

  render() {
    return (
      <div>
        <button onClick={this.addNewArticle}>Add Article</button>
        <ul>{this.props.global.articles.map(a => <li key={a.id}>{a.text + ' ' + a.id}</li>)}</ul>
      </div>

    );
  }
}

// This Component will be re-rendered only when these actions are triggered. This will be optional
export default store.connect(App, 'SAVE_ARTICLE', 'DELETE_ARTICLE');
```

## You don't need to add anything else when rendering your app:
  
 
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// No need to include a <Provider> ! Render your root component as usual
ReactDOM.render(<App />, document.getElementById('root'));
```
