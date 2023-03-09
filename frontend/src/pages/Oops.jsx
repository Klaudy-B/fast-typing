import { useRouteError, Link } from "react-router-dom";

const Oops = () => {
    document.title = 'Oops';
    const error = useRouteError();
    return <>
        <h1>Oops!</h1>
        <h3>Something went wrong.</h3>
        <div className="error-message">{ error.message }</div>
        <div><Link to='/'>homepage</Link></div>
    </>
}
 
export default Oops;