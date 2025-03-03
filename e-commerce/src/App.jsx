import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import ProductList from './components/ProductList'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux'
import { calculateBasket, removeFromBasket, setDrawer } from './redux/slices/basketSlice'
import { useEffect } from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";

function App() {
  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [])

  return (
    <PageContainer>
      <Header />
      <RouterConfig />
      <Loading />
      <Drawer className='drawer' anchor='right' open={drawer} onClose={() => dispatch(setDrawer())} aria-hidden={!drawer} sx={{
        "& .MuiDrawer-paper": {
          width: "300px", // Drawer genişliği
          backgroundColor: "#f1d9e1", // Arka plan rengi
          padding: "8px", // İç boşluk
        }
      }}>
        {
          products && products.map((product) => {
            return (
              <div className='basketProduct' key={product.id}>
                <div className='flex-row'>
                  <img src={product.image} alt="productImage" width={50} height={50} />
                  <div>
                    <p className='productDesc'>{product.title}</p>
                    <p className='productDesc' style={{ fontWeight: 700 }}>x{product.count}</p>
                    <p className='productPr'>{product.price} ₺</p>
                  </div>
                  <button onClick={() => dispatch(removeFromBasket(product.id))}>
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </div>
            )
          })
        }
        <div className='basketTotalAmount'>Toplam Tutar
          <p>
            {totalAmount.toFixed(2)} ₺
          </p>
        </div>
      </Drawer>
    </PageContainer>
  )
}

export default App
