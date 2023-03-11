import { useActionData, Form, Link } from "react-router-dom";

const Signup = () => {
    document.title = 'Sign up';
    const data = useActionData();
    if(data&&data.success){
        return <div className="success-message">
            {data.success} Click <Link to='/settings/verify-email'>here</Link> to verify your email. You can do it later in settings/verify my email.<br />
            <Link to='/'>I will do it later</Link>
        </div>
    }
    return <>
        <Form method="post" action="/signup">
            <label>Username:</label>
            <input type="text" name="username" required />
            {data&&data.errorFields&&
            <div className="error-message">{data&&data.errorFields&& data.errorFields.username}</div>
            }
            <label>Your email:</label>
            <input type="email" name="email" placeholder="xyz@example.com" required />
            {data&&data.errorFields&&<div className="error-message">{data.errorFields.email}</div>}
            <label>Password:</label>
            <input type="password" name="password1" required />
            {data&&data.errorFields&&
            <div className="error-message">{data&&data.errorFields&& data.errorFields.password1}</div>
            }
            <label>Confirm the password:</label>
            <input type="password" name="password2" required />
            {data&&data.errorFields&&
            <div className="error-message">{data&&data.errorFields&& data.errorFields.password2}</div>
            }
            <button>Sign up</button>
        </Form>
        <div className="signup">
        Already have an account? <Link to='/login/username'>Log in</Link>.
        </div>
    </>
}
 
export default Signup;