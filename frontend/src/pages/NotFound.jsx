import { Link } from "react-router-dom";
import { setTitle, urls } from "../scripts/helpers";

const NotFound = () => {
    setTitle('Page not found');
    return <>
        <h1>Page not found.</h1>
        <div>Back to the <Link to={urls.home}>homepage</Link>.</div>
    </>
}
 
export default NotFound;