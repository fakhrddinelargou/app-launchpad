
import {   QueryClientProvider , QueryClient } from "@tanstack/react-query"

import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Login from '../components/Login'

import Register from '../components/Register'
import Layout from "./Layout"
import Dashboard from "../../pages/Dashboard"
import ForgotPassword from "../components/forgotPassword"
import ResetPassword from "../components/ResetPassword"
import LayoutProfile from "./LayoutProfile"
import ProfileInfo from "../../pages/pagesProfil/ProfileInfo"
import EmailPassword from "../../pages/pagesProfil/EmailPassword"
import Notifications from "../../pages/pagesProfil/Notification"
import Businesses from "../../pages/pagesProfil/Businesses"
import Integration from "../../pages/pagesProfil/Integration"
import ProtectedRoute from "../components/ProtectedRoute"
import GuestOnlyRoute from "../components/GuestOnlyRoute"
import NotFound from "../components/NotFound"

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
path:"dashboard",
element:
<ProtectedRoute>

  <Dashboard/>
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