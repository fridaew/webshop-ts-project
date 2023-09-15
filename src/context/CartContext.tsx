import { useContext,createContext, useState, useEffect } from "react";
import ShoppingCart from "../components/ShoppingCart";


// creating a react context called CartContext, context is helping to share data and functions between components
const CartContext = createContext({} as CartContext)


  interface CartProviderProps {
    children: React.ReactNode
  }

function useShoppingCart() {
  return useContext(CartContext)
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<cartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  
  function getQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  function increaseQuantity(id: number) {
    setCartItems((currItems) => {
      const updatedItems = currItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Save the updated cart items
      return updatedItems;
    });
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      const updatedItems = currItems.filter((item) => item.id !== id)
      localStorage.setItem('cartItems', JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  function decreaseQuantity(id: number) {
    setCartItems((currItems) => {
      const updatedItems = currItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove items with quantity 0 or less
      localStorage.setItem('cartItems', JSON.stringify(updatedItems)); 
      return updatedItems;
    });
  }

  function addItemToCart(id: number) {
    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item.id === id);

      if (existingItem) {
        const updatedItems = currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Save the updated cart items
        return updatedItems;
      } else {
        const updatedItems = [...currItems, { id, quantity: 1 }];
        localStorage.setItem('cartItems', JSON.stringify(updatedItems)); 
        return updatedItems;
      }
    });
  }

  return (
    <CartContext.Provider value={{ getQuantity, increaseQuantity, decreaseQuantity, removeFromCart, addItemToCart, cartItems, cartQuantity, openCart, closeCart }}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </CartContext.Provider>
  )
}
export default useShoppingCart;



