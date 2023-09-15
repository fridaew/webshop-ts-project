
interface cartItem  {
    id: number
    quantity:number
   }


   interface CartContext  {
    openCart: () => void
    closeCart: () => void
    getQuantity: (id: number) => number
    increaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    addItemToCart: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: cartItem[]
  }

  interface ShoppingCartProps {
    isOpen: boolean;
  };

