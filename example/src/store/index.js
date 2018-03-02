import { Xtate } from 'xtate';

const initialXtate = { articles: [ {id: 1, text: "Initial Article!"} ] }

const store = new Xtate(initialXtate)

// No need for Spread Operators like in Redux, i'm already giving you a copy of the store, modify that object as you whish!
// No need for Switch and Cases like in Redux, just add different actions as functions
// No need to return the default state like in Redux
// ReactEmitter is calling just the correct action, not like Redux who calls every reducer! 

store.action('SAVE_ARTICLE', function(xtate, payload) {
    xtate.articles.push(payload)
    return xtate;
})

store.action('DELETE_ARTICLE', function(xtate, payload) {
    xtate.articles.splice(payload, 1)
    return xtate;
})

export default store