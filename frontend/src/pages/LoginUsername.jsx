import { Form, Navigate, useActionData, Link } from "react-router-dom";
import { placeholders, setTitle, urls } from "../scripts/helpers";

const LoginUsername = () => {
    setTitle('Log in');
    const data = useActionData();
    if(data&&data.password){
        return <Navigate to={`${urls.login}${urls.password}`} />
    }
    if(data&&data.error){
        throw Error(data.error);
    }
        return <>
        <Form id="login-username-form" method="post" action={`${urls.login}${urls.username}`}>
            <input type="text" name="username" placeholder={placeholders.username} required />
            {data&&data.errorFields&&data.errorFields.username&&<div className="error-message">{data.errorFields.username}</div>}
            <button>Continue</button>
        </Form>
        <div className="signup">
        Don't have an account yet? <Link to='/signup'>Sign up</Link>.
        </div>
        <br />
        <Link to={urls.forgotUsername}>I forgot my username</Link>
        </>
}
 
export default LoginUsername;