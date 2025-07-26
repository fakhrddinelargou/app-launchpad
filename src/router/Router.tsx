
import {   QueryClientProvider , QueryClient } from "@tanstack/react-query"

import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Login from '../auth/Login'

import Register from '../auth/Register'
import Layout from "../auth/Layout"

import ForgotPassword from "../auth/forgotPassword"
import ResetPassword from "../auth/ResetPassword"
import LayoutProfile from "../auth/LayoutProfile"
import ProfileInfo from "../pages/pagesProfil/ProfileInfo"
import EmailPassword from "../pages/pagesProfil/EmailPassword"
import Notifications from "../pages/pagesProfil/Notification"
import Businesses from "../pages/pagesProfil/Businesses"
import Integration from "../pages/pagesProfil/Integration"
import ProtectedRoute from "./ProtectedRoute"
import GuestOnlyRoute from "./GuestOnlyRoute"
import NotFound from "../pages/NotFound"
import Dashboard from "../pages/Dashboard"

const router = createBrowserRouter([
      {
    index : true,
    element :
     <GuestOnlyRoute>

       <Login/>
     </GuestOnlyRoute>
  },
        {
    path : "/login",

    element :
    <GuestOnlyRoute>
      <Login/>
    </GuestOnlyRoute>
  },
    {
    path : "/register",
    element :
    <GuestOnlyRoute>
      <Register/>
    </GuestOnlyRoute>
  },
  {
path : "/request-password",
element : 
<GuestOnlyRoute>
<ForgotPassword/>

</GuestOnlyRoute>
  },
  {
path : "/reset-password",
element :
<GuestOnlyRoute>

<ResetPassword/>
</GuestOnlyRoute>
  },
  {
    path:"/",
 element : <Layout/>,
 children:[
  {
path:"analytics/dashboard",

  element: 
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
 
  


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
  },
  {
    path : "*",
    element:<NotFound/>
  }
])


function Router(){


    const queryClient = new QueryClient({
      defaultOptions:{
        queries:{
          refetchOnWindowFocus:false
        }
      }
    })
   return(
    <>
    <QueryClientProvider client={queryClient}>
 <RouterProvider router={router}/>
    </QueryClientProvider>
  
    </>
   )
        
        
}

export default Router