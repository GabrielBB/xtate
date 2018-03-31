import React from 'react';
import { Connect } from '../../../lib/xtate';
import { saveArticle } from '../actions/articleActions';

class App extends React.Component {

  addNewArticle = () => {
    let articles = this.props.store.articles;
    let lastId = articles.length > 0 ? articles[articles.length - 1].id + 1 : 1;

    this.props.dispatch(saveArticle, { id: lastId, text: 'Article' });

  }

  render() {
    return (
      <div>
        {
          this.props.store.articles.length === 0 ?
            <span>No Articles to show</span> :
            <ul>{this.props.store.articles.map(a => <li key={a.id}>{a.text + ' ' + a.id}</li>)}</ul>
        }

        <button onClick={this.addNewArticle} />
      </div>

    );
  }
}

export default Connect(App);
