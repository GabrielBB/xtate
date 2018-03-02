import React, { Component } from 'react';
import store from './store/index'

class App extends Component {

  // The global application state comes from this.props.global and normal parameters are in this.props.local
  addNewArticle = () => {
    let articles = this.props.global.articles;

    store.dispatch('SAVE_ARTICLE', { id: 2, text: "Article" })
  }

  render() {
    return (
      <div>
        <button onClick={this.addNewArticle}>Add Article</button>

        <ul>{this.props.global.articles.map(a => <li key={a.id}>{a.text + ' ' + a.id}</li>)}</ul>
      </div>

    )
  }
}

// This Component will be re-rendered only when these actions are triggered. This will be optional
export default store.connect(App, 'SAVE_ARTICLE', 'DELETE_ARTICLE');