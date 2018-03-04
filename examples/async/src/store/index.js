import Xtate from 'xtate';
import axios from 'axios';

const store = new Xtate({});

export const updateDogImage = store.actionAsync('UPDATE_DOG_IMAGE', async function (state, payload) {
  const dog = await axios.get('https://dog.ceo/api/breeds/image/random');

  return { image: dog.data.message };
});

export const clearDogData = store.action('CLEAR_DOG_DATA', function (state, payload) {
  state.image = null;
  return state;
});

export default store;
