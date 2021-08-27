import checkResponse from '../utils/checkResponse.js';
import { NORMA_BASE_URL } from '../utils/constants.js';

const normaApi = {
  getIngredients: async () => await fetch(`${NORMA_BASE_URL}/ingredients`).then(checkResponse),
};

export default normaApi;
