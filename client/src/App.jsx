import React from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MAinLAyout'
import Home from './components/Home'
import About from './components/About'
import AutoSouqSellCar from './User/SellCAr'
import Contact from './components/Contact'

const App = () => {


const router=createBrowserRouter([
  {
    path:"/",
    element:<MainLayout></MainLayout>,


    children:[{
      path:"/",
      element:<Home></Home>
    },
  {
    path:"/about",
    element:<About></About>
  }]
  },
  {
    path:"/sell-car",
    element:<AutoSouqSellCar></AutoSouqSellCar>
  },
  {
    path:"/contact-us",
    element:<Contact></Contact>
  },




])



  return (
<RouterProvider router={router}></RouterProvider>



)
}

export default App