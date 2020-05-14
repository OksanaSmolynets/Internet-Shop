import React, { Component } from 'react';
import util from '../../util';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions';
import { Button, Card, Col, Row, Typography } from 'antd';
import { productCardLayout } from '../constants/productCardLayoutConstants';

import './productComponent.scss';

const { Text, Paragraph } = Typography;

class Products extends Component {
  componentWillMount() {
    this.props.fetchProducts();
  }
  render() {
    const productItems = this.props.products.map((product) => (
      <Col {...productCardLayout} key={product.id}>
        <a
          href={`#${product.id}`}
          onClick={() => this.props.addToCart(this.props.cartItems, product)}>
          <Card
            className="product-card"
            hoverable
            cover={<img src={`/products/${product.sku}_1.jpg`} alt={product.title} />}
            border={true}>
            <Paragraph ellipsis={{ rows: 2, expandable: true }}>
              <Text strong>{product.title}</Text>
            </Paragraph>
            <div className="card-body-info">
              <Text>{util.formatCurrency(product.price)}</Text>
              <Button onClick={() => this.props.addToCart(this.props.cartItems, product)}>
                Add To Card
              </Button>
            </div>
          </Card>
        </a>
      </Col>
    ));
    return (
      <div className="site-card-wrapper">
        <Row gutter={16}> {productItems}</Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.filteredItems,
  cartItems: state.cart.items,
});

export default connect(mapStateToProps, { fetchProducts, addToCart })(Products);
