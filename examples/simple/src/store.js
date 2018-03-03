import Xtate from 'xtate';

const initialXtate = { articles: [ {id: 1, text: 'Article'} ] };

const store = new Xtate(initialXtate);

store.action('SAVE_ARTICLE', function (xtate, payload) {
  xtate.articles.push(payload);
  return xtate;
});

store.action('DELETE_ARTICLE', function (xtate, payload) {
  xtate.articles.splice(payload, 1);
  return xtate;
});

export default store;
