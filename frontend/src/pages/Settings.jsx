import { Link, Outlet } from "react-router-dom";
import { setTitle, urls } from "../scripts/helpers";

const Settings = () => {
    setTitle('Settings');
    return <>
        <ul>
            <li><Link to={`${urls.settings}${urls.username}`}>Change my username</Link></li>
            <li><Link to={`${urls.settings}${urls.password}`}>Change my password</Link></li>
            <li><Link to={`${urls.settings}${urls.verifyEmail}`}>Verify my email</Link></li>
            <li><Link to={`${urls.settings}${urls.changeEmail}`}>Change my email</Link></li>
            <li><Link to={`${urls.settings}${urls.logout}`}>Log out</Link></li>
            <li><Link to={`${urls.settings}${urls.deleteAccount}`}>Delete my account</Link></li>
        </ul>
        <Outlet />
    </>
}
 
export default Settings;