import { NavLink } from 'react-router-dom'
import {Nav} from 'react-bootstrap'
import useShoppingCart from '../context/CartContext'

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart()
  
  return (
    <nav className='navbar'>
      <Nav>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-bar-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0zM4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z" />
        </svg>
        <NavLink to='/' className='nav-text-link'>View store</NavLink>
      </Nav>

      <button onClick={openCart}
        className='rounded-cirkle'>
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
        </svg>
        <div className='rounded-circle justify-content-center ' style={{ color: 'gray', width: '1.4rem', height: '1.4rem', position: 'absolute', bottom: 30, right: 0, transform: 'translate(35%, 35%)', background: 'white' }}>
          {cartQuantity}
        </div>
      </button>
    </nav>
  )
}

export default Navbar