import React, { Component } from 'react';
import util from '../util';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      showCheckout: false,
    };
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  };
  render() {
    const { cartItems } = this.props;
    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          'Basket is empty'
        ) : (
          <div>
            You have {cartItems.length} items in the basket. <hr />
          </div>
        )}
        {cartItems.length > 0 && (
          <div>
            <ul style={{ marginLeft: -25 }}>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <b>{item.title}</b> X {item.count} = {item.price * item.count}
                  <button
                    style={{ float: 'right' }}
                    className="btn btn-danger btn-xs"
                    onClick={() => this.props.removeFromCart(this.props.cartItems, item)}>
                    X
                  </button>
                  <br />
                </li>
              ))}
            </ul>
            <b>Sum: {util.formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}</b>
            <button
              onClick={() => {
                this.setState({ showCheckout: true });
              }}
              className="btn btn-primary">
              Proceed
            </button>
          </div>
        )}
        {this.state.showCheckout && (
          <div className="cart">
            <form onSubmit={this.createOrder}>
              <ul className="form-container">
                <li>
                  <label>Email</label>
                  <input name="email" type="email" required onChange={this.handleInput}></input>
                </li>
                <li>
                  <label>Name</label>
                  <input name="name" type="text" required onChange={this.handleInput}></input>
                </li>
                <li>
                  <label>Address</label>
                  <input name="address" type="text" required onChange={this.handleInput}></input>
                </li>
                <li>
                  <button className="button primary" type="submit" onClick={() => alert('Thanks')}>
                    Checkout
                  </button>
                </li>
              </ul>
            </form>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
});
export default connect(mapStateToProps, { removeFromCart })(Basket);
