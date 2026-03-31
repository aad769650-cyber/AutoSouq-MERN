import React from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MAinLAyout'
import Home from './components/Home'
import About from './components/About'
import AutoSouqSellCar from './User/SellCAr'
import Contact from './components/Contact'
import Detail from './components/Detail'
import NewCars from './components/NewCars'
import OldCars from './components/OldCars'

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
  path:"/new-cars",
  element:<NewCars></NewCars>
},
{
  path:"/used-cars",
  element:<OldCars></OldCars>
},
  {
    path:"/contact-us",
    element:<Contact></Contact>
  },
  {
    path:"/car/:id",
    element:<Detail></Detail>
  },




])



  return (
<RouterProvider router={router}></RouterProvider>



)
}

export default App