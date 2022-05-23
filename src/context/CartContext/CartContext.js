import React, {useEffect} from "react"

const CartContext = React.createContext();
const {Provider} = CartContext

const CartProvider = ({children}) => {

  // if the cart is in the localStorage use it, if not initialize it
  const initialState = JSON.parse(localStorage.getItem("cart")) || [];

  const [cart, setCart] = React.useState(initialState)

  // every time that the cart it's modified we store their value in the localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item, count) => {
    if(isInCart(item.id)) {
      //Modify order
      const newCart = cart.map(cartItem => {
        if(cartItem.id === item.id) {
            cartItem.quantity=count
        }
        return cartItem
      })
      setCart(newCart)
    }
    else {
      //Add to cart if not exist
      setCart([...cart, {...item, quantity: +count}])
    }
    
  }

  const removeItem = (id) => {
    const newCart = cart.filter((carItem) => carItem.id !== id);
    setCart(newCart);
  }

  const clear = () => {
    setCart([])
  }

  const isInCart = (id) => {
    return cart.find(item => item.id === id)
  }


  return (
    <Provider value={{
      addItem,
      removeItem,
      clear,
      isInCart,
      cart,
    }}>{children}</Provider>
  )
}

export {CartContext, CartProvider}