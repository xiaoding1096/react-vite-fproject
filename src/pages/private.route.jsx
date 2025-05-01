import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/auth/auth.context";
import { useContext } from "react";


const PrivateRoute = (props) => {
   
    const { user } = useContext(AuthContext);
 
    if (user && user.id) {
        return (
            <>
                {props.children}
            </>)
    }
    return(
        <Navigate to="/login" replace/>
)
    
}

export default PrivateRoute;