import React, { Component } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Basket from './components/Basket';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

class App extends Component {
  componentWillMount() {
    if (localStorage.getItem('cartItems')) {
      this.setState({ cartItems: JSON.parse(localStorage.getItem('cartItems')) });
    }
  }

  handleAddToCart = (e, product) => {
    this.setState((state) => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach((cp) => {
        if (cp.id === product.id) {
          cp.count += 1;
          productAlreadyInCart = true;
        }
      });
      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

  handleRemoveFromCart = (e, product) => {
    this.setState((state) => {
      const cartItems = state.cartItems.filter((a) => a.id !== product.id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <h1> E - commerce Shopping Cart Application </h1> <hr />
          <div className="row">
            <div className="col-md-9">
              <Filter />
              <hr />
              <Products />
            </div>
            <div className="col-md-3">
              <Basket />{' '}
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
