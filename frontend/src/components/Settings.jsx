import { Form, useActionData, Navigate, Link, Outlet } from "react-router-dom";
import { logoutErrorMessage } from "../scripts/helpers";

const Settings = () => {
    document.title = 'Settings';
    return <>
        <ul>
            <li><Link to='username'>Change username</Link></li>
            <li><Link to='password'>Change password</Link></li>
            <li><Link to='logout'>Log out</Link></li>
        </ul>
        <Outlet />
    </>
}
 
export default Settings;