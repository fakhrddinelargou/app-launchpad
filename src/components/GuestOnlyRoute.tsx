
import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"


type Props = {
    children : ReactNode
} 

export default function GuestOnlyRoute({children} : Props) {

    const token = localStorage.getItem('token')

    if(token){
        return <Navigate to="/analytics/dashboard"/>
    }
    return children

}