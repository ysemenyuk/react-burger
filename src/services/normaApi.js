import checkResponse from '../utils/checkResponse.js';
const NORMA_BASE_URL = 'https://norma.nomoreparties.space/api';

const normaApi = {
  fetchIngredients: async () =>
    await fetch(`${NORMA_BASE_URL}/ingredients`).then(checkResponse),
  createOrder: async (data) =>
    await fetch(`${NORMA_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ ingredients: data }),
    }).then(checkResponse),
};

export default normaApi;
