import { Xtate } from 'xtate';
import axios from 'axios';

const store = new Xtate({}, true);

store.actionAsync('UPDATE_DOG_IMAGE', async function (xtate) {
  return await axios.get('https://dog.ceo/api/breeds/image/random');
});

export default store;
