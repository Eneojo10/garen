import { Outlet, Navigate } from "react-router";

const PrivateRoutes = () => {
  let auth = {'token':localStorage.getItem('token')}

  return(
    auth.token ? <Outlet/> : <Navigate to="/"/>
    
  )
}

export default PrivateRoutes;