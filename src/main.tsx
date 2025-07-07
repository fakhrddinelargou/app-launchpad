import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {   QueryClientProvider , QueryClient } from "@tanstack/react-query"
import './index.css'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Login from './components/Login'
import Profil from './components/Profil'
import Register from './components/Register'
import App from './App'
// import App from './App.tsx'
const router = createBrowserRouter([
    {
    path : "/Home",
    element : <App/>
  },
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
])
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

 <RouterProvider router={router}/>
  
    </QueryClientProvider>
  </StrictMode>,
)
