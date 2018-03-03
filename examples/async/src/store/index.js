import { Xtate } from 'xtate';
import { axios } from 'axios';

const initialXtate = { dog: {} };

const store = new Xtate(initialXtate, true);

store.actionAsync('UPDATE_DOG_IMAGE', async function (xtate) {
  return await axios.get('https://dog.ceo/api/breeds/image/random');
});

export default store;
