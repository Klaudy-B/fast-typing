import { useRouteError, Link, useLocation } from "react-router-dom";
import { setTitle, urls } from "../scripts/helpers";

const Oops = () => {
    setTitle('Oops');
    const path = useLocation().pathname;
    const error = useRouteError();
    console.log(error)
    return <>
        <h1>Oops!</h1>
        <h3>Something went wrong.</h3>
        {error&&error.message&&<div className="error-message">{ error.message }</div>}
        <div><Link to={urls.path}>Retry</Link></div>
    </>
}
 
export default Oops;