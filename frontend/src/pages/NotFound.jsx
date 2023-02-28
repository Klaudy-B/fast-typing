import { Link } from "react-router-dom";
const NotFound = () => {
    document.title = 'Page not found';
    return <>
        <h1>Page not found.</h1>
        <div>Back to the <Link to='/'>homepage</Link>.</div>
    </>
}
 
export default NotFound;