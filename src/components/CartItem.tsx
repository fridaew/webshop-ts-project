import { useEffect, useState } from 'react';
import useShoppingCart from '../context/CartContext';
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

const CartItem = ({ id, quantity }: cartItem) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useShoppingCart();
  const [product, setProduct] = useState<Product | null>(null);

  // Retrieve the product from local storage when the component mounts
  useEffect(() => {
    const item = localStorage.getItem('fetchedProducts');
    const parsedItem = item ? JSON.parse(item) : null;
    if (parsedItem) {

      const productById: Product | undefined = parsedItem.find(
        (product: Product) => product.id === id
      );
      if (productById) {
        // set the product data in state
        setProduct(productById);
      }
    }
  }, [id]);

  if (!product) {
    return <div>Product not found in local storage.</div>;
  }
  return (

    <>
      <div className='mt-auto'>
        <img src={product.image} alt="" width={55} height={65} />
        <NavLink to={`/products/${product.id}`}>
          <h3 className='cart-h3'>{product.title}</h3>
        </NavLink>
        <div className='d-flex align-items-center'>
          <div className='d-flex align-items-center justify-content-center' style={{ gap: '.5rem' }}>
            <Button onClick={() => decreaseQuantity(product.id)} style={{ color: 'black' }}>-</Button>
            <div>
              <span className='fs-3'>{quantity}</span>
            </div>
            <Button onClick={() => increaseQuantity(product.id)} style={{ color: 'black' }}>+</Button>
          </div>
        </div>
        <p className='price-in-cart'>{quantity} x ${product.price}</p>
      </div>
      <Button variant='danger' size='sm' className='remove-cart-btn' onClick={() => removeFromCart(product.id)}> Remove</Button>
      <hr />
    </>
  );
};

export default CartItem