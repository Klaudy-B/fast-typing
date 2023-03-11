import { Form, Link, useActionData, Navigate } from "react-router-dom";

const LoginPassword = () => {
    const data = useActionData();
    if(data&&data.user){
        return <Navigate to='/' />
    }
    if(data&&data.error){
        throw Error(data.error);
    }
    return <>
    <Form method="post" action="/login/password">
        <label>Password:</label>
        <input type="password" name="password" placeholder="Type in your password here" required />
        {data&&data.errorFields&&<div className="error-message">{data.errorFields.password}</div>}
        <button>log in</button>
    </Form>
    <div className="signup">
        Don't have an account yet? <Link to='/signup'>Sign up</Link>.
    </div>
    <Link to='/settings/forgot-password'>I forgot my password</Link>
    </>
    
}
 
export default LoginPassword;