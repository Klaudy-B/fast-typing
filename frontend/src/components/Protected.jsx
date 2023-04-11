import { useContext } from "react";
import { UserContext } from "../context";
import { Navigate } from "react-router-dom";
import { urls } from "../scripts/helpers";

const Protected = ({ children }) => {
    const { user } = useContext(UserContext);
    if(!user){
        return <Navigate to={`${urls.login}${urls.username}`} />
    }
    return children;
}
 
export default Protected;