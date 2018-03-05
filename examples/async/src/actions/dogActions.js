import axios from 'axios';

export async function updateDogImage(state, payload) {
    const dog = await axios.get('https://dog.ceo/api/breeds/image/random');
    return { ...state, image: dog.data.message };
}

export function clearDogData(state, payload) {
    return { ...state, image: null };
}