import { Link, Outlet } from "react-router-dom";

const Settings = () => {
    document.title = 'Settings';
    return <>
        <ul>
            <li><Link to='username'>Change username</Link></li>
            <li><Link to='password'>Change password</Link></li>
            <li><Link to='logout'>Log out</Link></li>
            <li><Link to='verify-email'>Verify my email</Link></li>
            <li><Link to='change-email'>Change my email</Link></li>
        </ul>
        <Outlet />
    </>
}
 
export default Settings;