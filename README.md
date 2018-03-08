# Xtate

![see module on NPM](https://nodei.co/npm/xtate.png?downloads=true&downloadRank=true&stars=true)

over-complexed-boiler-plate-free state management library for React/React Native

NOTE: I'm actively working on this project so if you find any issues, please, open an issue and i will check it out very quick

### Setting up Xtate

First install xtate by running ```yarn add xtate``` or ```npm install xtate```

Now let's wrap our App component with the StoreProvider component from Xtate and pass the initial store to it:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StoreProvider } from 'xtate';

ReactDOM.render(
    <StoreProvider store={{ articles: [] }}>
        <App />
    </StoreProvider>
    , document.getElementById('root'));
```

#### Connecting the needed components to the store

Import the Connect function from Xtate and pass your components to it to connect them to the store so they automatically refresh when the store state changes.

```javascript
import React from 'react';
import { Connect } from 'xtate';

class App extends React.Component {

  render() {
    return <div></div>;
  }
}

export default Connect(App);
```

### Creating Actions

Declare the functions you want to use as actions to be dispatched to the store, just type a function that returns the next state of your application. A payload is any parameter we pass to that action so it can create the new state. 

This action adds new articles to the store state:

```javascript

export function saveArticle(prevState, payload) {
    return { ...prevState, articles: [...prevState.articles, payload] }; // Don't mutate the store state. Return a new one
}
```

* No need for Switch and Cases like in Redux, just add different actions as functions
* Xtate doesn't call every single function you mapped, like Redux does with reducers, you will tell which one is the correct action
* No need to add other dependencies for async functions (like data fetching)
* No need to create Constant strings to reference actions. The reference to those actions is the function itself!

### Accessing store state

You can access your store state with "this.props.store". This object will be the one you passed to the StoreProvider in the "Setting up Xtate" section. 

```javascript

import React from 'react';
import { Connect } from 'xtate';

class App extends React.Component {

  render() {
    return <ul>{this.props.store.articles.map(a => <li>{a.text}</li>)}</ul>;
  }
}

export default Connect(App);
```

### Dispatching actions

We need to import the actions we want to dispatch. An action is just a funcion that returns the next state of the store. In the "Creating Actions" section we created a simple one that saves new articles, we have to import that function to dispatch it. To dispatch an action we call the function: ```this.props.dispatch```, this function receives the action and the payload, which in this case is the new article to be saved.

```javascript

import React from 'react';
import { Connect } from 'xtate';
import { saveArticle } from './actions/articleActions'; // importing the action we created

class App extends React.Component {

  addNewArticle = () => {
    let articles = this.props.store.articles;
    this.props.dispatch(saveArticle, { id: 2, text: 'Article' }); // dispatching the action, a new article will be saved in the store
   }

  render() {
    return (
      <div>
        <button onClick={this.addNewArticle}>Add Article</button>

        // Rendering the store articles array. New articles will show up when the "addNewArticle" function is called.
        <ul>{this.props.store.articles.map(a => <li key={a.id}>{a.text + ' ' + a.id}</li>)}</ul>
      </div>

    );
  }
}

export default Connect(App);
```

### Asynchrony (Let's just use... javascript)

If you need asynchronous executions, like data fetching from an API, just use the great async and await keywords the language already gave us, no need to learn new concepts or installing new dependencies

```javascript
import axios from 'axios';

export async function updateDogImage(prevState, payload) {
    const dog = await axios.get('https://dog.ceo/api/breeds/image/random');
    return { ...prevState, image: dog.data.message };
}
```

This is an async function defined in a React component which dispatchs our async action:

```javascript
  getNewDogImage = async () => {
    try {
      await this.props.dispatch(updateDogImage)
    } catch (ex) {
      console.log(ex);
    }
  }
```
