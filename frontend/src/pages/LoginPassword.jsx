import { Form, Link, useActionData } from "react-router-dom";

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
        <input type="password" name="password" required />
        {data&&data.errorFields&&<div className="error-message">{data.errorFields.password}</div>}
        <button>log in</button>
    </Form>
    <Link to='/settings/forgot-password'>I forgot my password</Link>
    </>
    
}
 
export default LoginPassword;