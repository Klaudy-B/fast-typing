import { useActionData, Form, Link } from "react-router-dom";
import { placeholders, setTitle, urls } from "../scripts/helpers";

const Signup = () => {
    setTitle('Sign up');
    const data = useActionData();
    if(data&&data.success){
        return <div className="success-message">
            <span>{data.success} Click <Link to={`${urls.settings}${urls.verifyEmail}`}>here</Link> to verify your email.<br />
            You can do it later in settings/verify my email.</span>
            <Link to={urls.home}>I will do it later</Link>
        </div>
    }
    return <>
        <Form id="signup-form" method="post" action={urls.signup}>
            <input type="text" name="username" placeholder={placeholders.username} required />
            {data&&data.errorFields&&data.errorFields.username&& <div className="error-message">{data.errorFields.username}</div>}
            <input type="email" name="email" placeholder={placeholders.email} required />
            {data&&data.errorFields&&data.errorFields.email&&<div className="error-message">{data.errorFields.email}</div>}
            <input type="password" name="password1" placeholder={placeholders.password} required />
            {
            data&&data.errorFields&&data&&data.errorFields&& data.errorFields.password1&&
            <div className="error-message">{data&&data.errorFields&& data.errorFields.password1}</div>
            }
            <input type="password" name="password2" placeholder={placeholders.passwordConformation} required />
            {data&&data.errorFields&&data.errorFields.password2&&
            <div className="error-message">{data.errorFields.password2}</div>
            }
            <button>Sign up</button>
        </Form>
        <div className="signup">
        Already have an account? <Link to={`${urls.login}${urls.username}`}>Log in</Link>.
        </div>
    </>
}
 
export default Signup;