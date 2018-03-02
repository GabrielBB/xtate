import React, { Component } from 'react';
import store from './store'

class App extends Component {

  // The global application state comes from this.props.global and normal parameters are in this.props.local
  addNewArticle = () => {
    let articles = this.props.global.articles;
    let lastId = articles.length > 0 ? articles[articles.length - 1].id + 1 : 1;

    store.dispatch('SAVE_ARTICLE', { id: lastId, text: "Article" })
  }

  removeLastArticle = () => {
    if (this.props.global.articles.length > 0) {
      store.dispatch('DELETE_ARTICLE', this.props.global.articles.length - 1)
    }

  }

  render() {

    const articles = this.props.global.articles.length === 0 ?
      <span>No Articles to show</span> :
      <ul>{this.props.global.articles.map(a => <li key={a.id}>{a.text + ' ' + a.id}</li>)}</ul>;

    return (
      <div>
        <button onClick={this.addNewArticle}>Add Article</button>
        <button onClick={this.removeLastArticle}>Remove Last Article</button>

        {articles}
      </div>

    );
  }
}

// This Component will be re-rendered only when these actions are triggered. This will be optional
export default store.connect(App, 'SAVE_ARTICLE', 'DELETE_ARTICLE');