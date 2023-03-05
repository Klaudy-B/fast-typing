import { Form, Navigate, useActionData, Link } from "react-router-dom";

const LoginUsername = () => {
    document.title = 'Log in';
    const data = useActionData();
    if(data&&data.password){
        return <Navigate to='/login/password' />
    }
    if(data&&data.error){
        throw Error(data.error);
    }
        return <>
        <Form method="post" action="/login/">
            <label>Username:</label>
            <input type="text" name="username" required />
            {data&&data.errorFields&&<div className="error-message">{data.errorFields.username}</div>}
            <button>Continue</button>
        </Form>
        <Link to='/settings/forgot-username'>I forgot my username</Link>
        </>
}
 
export default LoginUsername;