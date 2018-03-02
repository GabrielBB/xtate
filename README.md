# Xtate

![see module on NPM](https://nodei.co/npm/xtate.png?downloads=true&downloadRank=true&stars=true)

over-complexed-boiler-plate-free state managment library for React/React Native
 
## THIS LIBRARY IS STILL IN DEVELOPMENT, DON'T TRY TO USE IT. BUT STAY TUNED!
## Usage

## Configure your store with the actions you want to dispatch from your components, no need for reducers, just type a function that returns a state

### No need for Spread Operators like in Redux, you decide if you want immutability, modify that object as you whish!
### No need for Switch and Cases like in Redux, just add different actions as functions
### No need to return the default state like in Redux
### Xtate doesn't call every single function you mapped, like Redux does with reducers, Xtate knows which one to call!
### No need for props mapping, global state comes in a separate object
### No need to wrap your App component with a "Provider" Tag

```javascript
import { Xtate } from 'xtate';

const initialXtate = { articles: [] }

const store = new Xtate(initialXtate)

store.action('SAVE_ARTICLE', function(state, payload) {
    state.articles.push(payload)
    return state;
})

store.action('DELETE_ARTICLE', function(state, payload) {
    state.articles.splice(payload, 1)
    return state;
})

export default store
```

## And you're done! You read it correctly: You're done. Now just Import your store to your App component. You can access your store state with "this.props.global" and dispatch your actions with "store.dispatch"

```javascript
import React, { Component } from 'react';
import store from './store/index'

class App extends Component {
  // The global application state comes from this.props.global and normal parameters are in this.props.local
  addNewArticle = () => {
    store.dispatch('SAVE_ARTICLE', { id: 2, text: "Article" })
  }

  }

  render() {
    return (
      <div>
        <button onClick={this.addNewArticle}>Add Article</button>
        <ul>{this.props.global.articles.map(a => <li key={a.id}>{a.id + ' - ' + a.text}</li>)}</ul>
      </div>

    );
  }
}

// For the best optimization, this Component will be re-rendered only when these actions are triggered. This will be optional
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

![](https://media.giphy.com/media/BCdj4KMUer5mZbAyZV/giphy.gif)

### State time travelling coming soon and more boiler-plate-free features!
