
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({allowedRoles,Outlet})  {
    const {currentUser} = useSelector(state => state.auth);
    console.log("🚀 ~ RequireAuth ~ user:", currentUser)
    const location = useLocation();

    return currentUser?.role === allowedRoles || currentUser?.role === 'ADMIN' ? <Outlet/>
    : currentUser ? <Navigate to="/404" state={{from: location.pathname}}/> : <Navigate to="/auth/login" state={{from: location.pathname}}/>
}

export default RequireAuth;