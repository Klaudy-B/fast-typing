import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../context";

const Settings = () => {
    document.title = 'Settings';
    return <>
        <ul>
            <li><Link to='username'>Change username</Link></li>
            <li><Link to='password'>Change password</Link></li>
            <li><Link to='logout'>Log out</Link></li>
            {useContext(UserContext).email?<li><Link to='verify-email'>Verify my email</Link></li>:<li><Link to='add-email'>Add an email</Link></li>}
        </ul>
        <Outlet />
    </>
}
 
export default Settings;