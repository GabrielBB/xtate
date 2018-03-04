# Xtate

![see module on NPM](https://nodei.co/npm/xtate.png?downloads=true&downloadRank=true&stars=true)

over-complexed-boiler-plate-free state management library for React/React Native

NOTE: I'm actively working on this project so if you find any issues, please, open an issue and i will check it out very quick

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

export default store
```

* No need for Spread Operators like in Redux, making your code less readable, we don't need immutability (for time travelling purposes we will implement it in another way, coming soon)
* No need for Switch and Cases like in Redux, just add different actions as functions
* Xtate doesn't call every single function you mapped, like Redux does with reducers, Xtate knows which one to call
* No need for component props mapping, store object comes in a separate prop, which is called... store.
* No need to add other dependencies for async functions (like data fetching)

You can access your store state with "this.props.store" and dispatch your actions with "store.dispatch"

```javascript
import React, { Component } from 'react';
import store from './store/index'

class App extends Component {
  addNewArticle = () => {
    store.dispatch('SAVE_ARTICLE', { id: 2, text: "Article" })
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.addNewArticle}>Add Article</button>
        <ul>{this.props.store.articles.map(a => <li key={a.id}>{a.id + ' - ' + a.text}</li>)}</ul>
      </div>

    );
  }
}

export default store.connect(App);
```
## RECOMMENDED USAGE

The action function returns another function that internally calls the dispatch method for you! So you can declare your actions this way:

```javascript
import Xtate from 'xtate';

const initialXtate = { articles: [] }

const store = new Xtate(initialXtate)

export const saveArticle = store.action('SAVE_ARTICLE', function(state, payload) {
    state.articles.push(payload)
    return state;
})

export default store
```

Then in your component you can import your action and just call it like a normal function:

```javascript
import React, { Component } from 'react';
import store, { saveArticle } from './store/index'

class App extends Component {
  addNewArticle = () => {
    saveArticle({ id: 2, text: "Article" })
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.addNewArticle}>Add Article</button>
        <ul>{this.props.store.articles.map(a => <li key={a.id}>{a.id + ' - ' + a.text}</li>)}</ul>
      </div>

    );
  }
}

export default store.connect(App);
```

If you have a component that only dispatches actions but doesn't use the store to render itself then you don't even have to connect the component. For example:

```javascript
import React, { Component } from 'react';
import { saveArticle } from './store/index'

export default class App extends Component {
  addNewArticle = () => {
    saveArticle({ id: 2, text: "Article" })
    }
  }

  render() {
    return (<button onClick={this.addNewArticle}>Add Article</button>)
  }
}
```


### Asynchrony

If you need asynchronous executions, like data fetching from an API, just use "actionAsync" instead of "action". For example:

```javascript
store.actionAsync('GET_DOG_IMAGES', async function (xtate, payload) {
  return await axios.get('https://dog.ceo/api/breeds/image/random');
});
```

<img src="https://media.giphy.com/media/BCdj4KMUer5mZbAyZV/giphy.gif" width="800" height="300"/>

### Time travelling coming soon
