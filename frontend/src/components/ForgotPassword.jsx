import { useContext } from "react";
import { useActionData, Form, Link, Navigate } from "react-router-dom";
import { UserContext } from "../context";

const ForgotPassword = () => {
    const { verified, user } = useContext(UserContext);
    const data = useActionData();
    if(!data&&user&&!verified){
        return <div className="success-message">Your email is not verified. Click <Link to='/settings/verify-email'>here</Link> to verify your email first.</div>
    }
    if(data&&data.authorized){
        <Navigate to='/settings/forgot-password/recover-password' />
    }
    return <Form method="post" action="/settings/forgot-password">
    {!data&&<button>Send me the code</button>}
    {data&&data.codeSent&&<>
    <input type="text" name="code" required /><br />
    <button>Submit</button>
    {data.noMatch&&<div className="error-message">{data.noMatch}</div>}
    </>}
    {data&&data.error&&<div className="error-message">{data.error}</div>}
</Form>
}
 
export default ForgotPassword;