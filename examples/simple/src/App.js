import React from 'react';
import store from './store';
import { deleteArticle, saveArticle } from './actions/articleActions';

class App extends React.Component {

  // The global application state comes from this.props.global and normal parameters are in this.props.local
  addNewArticle = () => {
    let articles = this.props.store.articles;
    let lastId = articles.length > 0 ? articles[articles.length - 1].id + 1 : 1;

    this.props.dispatch(saveArticle, { id: 1, text: 'Article' });
  }

  removeLastArticle = () => {
    if (this.props.store.articles.length > 0) {
      this.props.dispatch(deleteArticle, this.props.store.articles.length - 1);
    }

  }

  render() {

    const articles = this.props.store.articles.length === 0 ?
      <span>No Articles to show</span> :
      <ul>{this.props.store.articles.map(a => <li key={a.id}>{a.text + ' ' + a.id}</li>)}</ul>;

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
export default store.connect(App);
