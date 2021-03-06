import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from '../actions/types';
const initialState = { items: [], filteredItems: [], size: '', sort: '' };

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log(action);
      return {
        ...state,
        items: action.payload,
        filteredItems: action.payload,
      };
    case FILTER_PRODUCTS_BY_SIZE:
      return { ...state, size: action.payload.size, filteredItems: action.payload.items };
    case ORDER_PRODUCTS_BY_PRICE:
      return { ...state, sort: action.payload.sort, filteredItems: action.payload.items };
    default:
      return state;
  }
}
