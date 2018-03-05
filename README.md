# Xtate

![see module on NPM](https://nodei.co/npm/xtate.png?downloads=true&downloadRank=true&stars=true)

over-complexed-boiler-plate-free state management library for React/React Native

NOTE: I'm actively working on this project so if you find any issues, please, open an issue and i will check it out very quick

## Usage

Declare the functions you want to use as actions to be dispatched to the store, just type a function that returns the next state of your application, using the payload parameter you will pass later:

```javascript
export function saveArticle(state, payload) {
    return { ...state, articles: [...state.articles, payload] };
}
```

* No need for Switch and Cases like in Redux, just add different actions as functions
* Xtate doesn't call every single function you mapped, like Redux does with reducers, you will tell which one is the correct action
* No need for component props mapping, store object comes in a separate prop, which is called... store.
* No need to add other dependencies for async functions (like data fetching)
* No need to create Constant strings to reference actions. The reference to those actions is the function itself!

You can access your store state with "this.props.store" and dispatch your actions with "this.props.dispatch"

```javascript
import React from 'react';
import store from './store';

// in this js file is the function we just declared, we need to import it
import { saveArticle } from './actions/articleActions';

class App extends React.Component {

  // Save a new article object, as you can see, we are telling the store which is the action we want to dispatch, the one we imported
  addNewArticle = () => {
    this.props.dispatch(saveArticle, { id: 1, text: 'Article' }); 
  }

  render() {
    return (
      <div>
        <button onClick={this.addNewArticle}>Add Article</button>
        <ul>{this.props.store.articles.map(a => <li key={a.id}>{a.text}</li>)}</ul>
      </div>

    );
  }
}

export default store.connect(App);

```

### Asynchrony (Let's just use... javascript)

If you need asynchronous executions, like data fetching from an API, just use the great async and await keywords the language already gave us, no need to learn new concepts or installing new dependencies

```javascript
import axios from 'axios';

export async function updateDogImage(state, payload) {
    const dog = await axios.get('https://dog.ceo/api/breeds/image/random');
    return { ...state, image: dog.data.message };
}
```
And dispatch it from your component, again, using async/await (you can also handle the promises the traditional way)

```javascript
import React from 'react';
import store from '../store/index'
import { updateDogImage } from '../actions/dogActions';

class Button extends React.Component {

  // Let's declare this function as async
  getNewDogImage = async () => {
    try {
      await this.props.dispatch(updateDogImage) // Passing the function we imported
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    return <button onClick={this.getNewDogImage}>Load random dog image</button>;
  }
}

export default store.connect(Button);
```

<img src="https://media.giphy.com/media/BCdj4KMUer5mZbAyZV/giphy.gif" width="800" height="300"/>
