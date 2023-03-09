import { useContext } from "react";
import { UserContext } from "../context";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    const { user } = useContext(UserContext);
    if(!user){
        return <Navigate to='/login/username' />
    }
    return children;
}
 
export default Protected;