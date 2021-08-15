import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  useEffect(()=>{

    const sendData =async ()=>{
      dispatch(uiActions.showNotification({
        status:'Pending',
        title:"Sending...",
        message:"Sending Cart Data!"
      }))


     const response = await fetch('https://food-order-bf696-default-rtdb.firebaseio.com/cart.json',{
        method:"PUT",
        body:JSON.stringify(cart)
      })
        if(!response.ok){
          throw new Error('Sending Data failed ...')
        }
      const data = response.json()
    }

    
  },[cart])
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
