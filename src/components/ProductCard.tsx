import { NavLink } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap'
import useShoppingCart from '../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ product }: { product: Product }) => { // specify the product prop as an object with the shape of the Product
  const [heartColor, setHeartColor] = useState('currentColor');
  const { addItemToCart, openCart } = useShoppingCart();

  const handleAddToCart = () => {
    addItemToCart(product.id);

    openCart()
  };

  const toggleHeartColor = () => {
    setHeartColor(heartColor === 'currentColor' ? 'red' : 'currentColor');
  };


  return (
    <Card className='card'>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill={heartColor} className="bi bi-heart-fill" viewBox="0 0 16 16" onClick={toggleHeartColor}>
        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
      </svg>
      <NavLink to={`/products/${product.id}`}>
        <li className='product-card'>
          <p className='productCategory'>{product.category}</p>
          <img src={product.image} alt={product.title} className='product-img' />
          <div className='product-text-info'>
            <h2 className='product-title'>{product.title}</h2>
          </div>
        </li>
      </NavLink>
      <p className='product-price'>{"$" + product.price}</p>
      <Button onClick={handleAddToCart} className='button-container'>Add to Cart <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
      </svg></Button>
    </Card>
  );
}

export default ProductCard;


