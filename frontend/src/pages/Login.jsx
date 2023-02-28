import { Form, Navigate, useActionData } from "react-router-dom";

const Login = () => {
    document.title = 'Log in';
    const data = useActionData();
    if(data&&data.user){
        return <Navigate to='/' replace={true} />
    }
    return (
        <Form method="post" action="/login">
            <label>Username:</label>
            <input type="text" name="username" required />
            <label>Password:</label>
            <input type="password" name="password" required />
            <button>Log in</button>
            <div className="error-message">{data&&data.errorMessage&& data.errorMessage}</div>
        </Form>
    )
}
 
export default Login;