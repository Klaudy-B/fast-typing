import { Form, Link, useActionData, Navigate } from "react-router-dom";
import { setTitle, placeholders, urls } from "../scripts/helpers";

const LoginPassword = () => {
    setTitle('Login');
    const data = useActionData();
    if(data&&data.user){
        return <Navigate to={urls.home} />
    }
    if(data&&data.error){
        throw Error(data.error);
    }
    return <>
    <Form id="login-password-form" method="post" action={`${urls.login}${urls.password}`}>
        <input type="password" name="password" placeholder={placeholders.password} required />
        {data&&data.errorFields&&<div className="error-message">{data.errorFields.password}</div>}
        <button>log in</button>
    </Form>
    <div className="signup">
        Don't have an account yet? <Link to={urls.signup}>Sign up</Link>.
    </div>
    <br />
    <Link to={`${urls.settings}${urls.forgotPassword}`}>I forgot my password</Link>
    </>
    
}
 
export default LoginPassword;