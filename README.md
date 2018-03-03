# Xtate

![see module on NPM](https://nodei.co/npm/xtate.png?downloads=true&downloadRank=true&stars=true)

over-complexed-boiler-plate-free state management library for React/React Native

## Usage

Configure your store with the actions you want to dispatch from your components, just type a function that returns the next state of your application:

```javascript
import Xtate from 'xtate';

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

* No need for Spread Operators like in Redux, you decide if you want immutability, modify that object as you wish
* No need for Switch and Cases like in Redux, just add different actions as functions
* No need to return the default state like Redux requires
* Xtate doesn't call every single function you mapped, like Redux does with reducers, Xtate knows which one to call
* No need for component props mapping, global state comes in a separate object
* No need to add other dependencies for async functions

You can access your store state with "this.props.global" and dispatch your actions with "store.dispatch"

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

export default store.connect(App);
```

If you need asynchronous executions, like calling an API, just use "actionAsync" instead of "action". For example:

```javascript
store.actionAsync('GET_DOG_IMAGES', async function (xtate) {
  return await axios.get('https://dog.ceo/api/breeds/image/random');
});
```

<img src="https://media.giphy.com/media/BCdj4KMUer5mZbAyZV/giphy.gif" width="800" height="300"/>

### More boiler-plate-free features coming soon!