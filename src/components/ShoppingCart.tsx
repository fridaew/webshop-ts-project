import { Offcanvas, Stack } from 'react-bootstrap';
import useShoppingCart from '../context/CartContext';
import CartItem from './CartItem';

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart(); 

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end' scroll={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length === 0 ? ( 
          <p style={{color: 'firebrick'}}>Your cart is empty.</p> 
        ) : (
          <Stack>
            {cartItems.map((item) => ( 
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
