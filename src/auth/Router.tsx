
import {   QueryClientProvider , QueryClient } from "@tanstack/react-query"

import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Login from '../components/Login'
import Profil from '../components/Profil'
import Register from '../components/Register'
import Layout from "./Layout"
import Dashboard from "../../pages/Dashboard"
import Orders from "../../pages/Orders"
import Products from "../../pages/Products"
import Suppliers from "../../pages/Suppliers"
import Customers from "../../pages/Customers"
import Analytics from "../../pages/Analytics"
import ForgotPassword from "../components/forgotPassword"
import ResetPassword from "../components/ResetPassword"
const router = createBrowserRouter([
      {
    path : "/",
    element : <Login/>
  },
        {
    path : "/login",
    element : <Login/>
  },
    {
    path : "/profil",
    element : <Profil/>
  },
    {
    path : "/register",
    element : <Register/>
  },
  {
path : "/request-password",
element : <ForgotPassword/>
  },
  {
path : "/reset-password",
element : <ResetPassword/>
  },
  {
    path:"/",
 element : <Layout/>,
 children:[
  {
path:"dashboard",
element: <Dashboard/>

  },
    {
path:"orders",
element: <Orders/>

  },
    {
path:"products",
element: <Products/>

  },
      {
path:"suppliers",
element: <Suppliers/>

  },
        {
path:"customers",
element: <Customers/>

  },
        {
path:"analytics",
element: <Analytics/>

  },

 ],
  }
])


function Router(){


    const queryClient = new QueryClient()
   return(
    <>
    <QueryClientProvider client={queryClient}>
 <RouterProvider router={router}/>
    </QueryClientProvider>
  
    </>
   )
        
        
}

export default Router