import Xtate from 'xtate';

const initialXtate = { articles: [ {id: 1, text: 'Article'} ] };

const store = new Xtate(initialXtate);

export const saveArticle = store.action('SAVE_ARTICLE', function (state, payload) {
  state.articles.push(payload);
  Object.assign({}, state).articles.push({id: -1, text: 'hahaha'});
  return state;
});

export const deleteArticle = store.action('DELETE_ARTICLE', function (state, payload) {
  state.articles.splice(payload, 1);
  return state;
});

export default store;
