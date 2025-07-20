
import {   QueryClientProvider , QueryClient } from "@tanstack/react-query"

import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Login from '../components/Login'

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
import LayoutProfile from "./LayoutProfile"
import ProfileInfo from "../../pages/pagesProfil/ProfileInfo"
import EmailPassword from "../../pages/pagesProfil/EmailPassword"
import Notifications from "../../pages/pagesProfil/notification"
import Businesses from "../../pages/pagesProfil/Businesses"
import Integration from "../../pages/pagesProfil/Integration"

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
  },
  {
    path:"/",
    element : <LayoutProfile/>,
    children : [
      {
        path : "/ProfileInfo",
        element : <ProfileInfo/>
      },
        {
        path : "/emailpassword",
        element : <EmailPassword/>
      },
      {
        path : "/notification",
        element : <Notifications />
      },
      {
        path : "/businesses",
        element : <Businesses/>
      },
      {
        path : "/integration",
        element : <Integration/>
      }
    ]
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