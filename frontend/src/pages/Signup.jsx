import { useActionData, Form, Link } from "react-router-dom";

const Signup = () => {
    document.title = 'Sign up';
    const data = useActionData();
    if(data&&data.success){
        return <div className="success-message">
            {data.sccess} Click <Link to='settings/verify-email'>here</Link> to verify your email.<br />
            <Link to='/'>I will do it later</Link>
        </div>
    }
    return (
        <Form method="post" action="/signup">
            <label>Username:</label>
            <input type="text" name="username" required />
            <div className="username error-message">{data&&data.errorFields&& data.errorFields.username}</div>
            <label>Your email:</label>
            <input type="email" name="email" required />
            {data&&data.errorFields&&<div className="error-message">{data.errorFields.email}</div>}
            <label>Password:</label>
            <input type="password" name="password1" required />
            <div className="password1 error-message">{data&&data.errorFields&& data.errorFields.password1}</div>
            <label>Confirm Password:</label>
            <input type="password" name="password2" required />
            <div className="password2 error-message">{data&&data.errorFields&& data.errorFields.password2}</div>
            <button>Sign up</button>
        </Form>
    )
}
 
export default Signup;