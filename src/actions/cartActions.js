import { ADD_TO_CART, REMOVE_FROM_CART } from './types';

export const addToCart = (items, product) => (dispath) => {
  let productAlreadyInCart = false;
  const cartItems = items.slice();
  cartItems.forEach((item) => {
    if (item.id === product.id) {
      productAlreadyInCart = true;
      item.count++;
    }
  });
  if (!productAlreadyInCart) {
    cartItems.push({ ...product, count: 1 });
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  return dispath({
    type: ADD_TO_CART,
    payload: { items: cartItems },
  });
};

export const removeFromCart = (items, item) => (dispath) => {
  const cartItems = items.slice().filter((elm) => elm.id !== item.id);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  return dispath({
    type: REMOVE_FROM_CART,
    payload: {
      items: cartItems,
    },
  });
};
