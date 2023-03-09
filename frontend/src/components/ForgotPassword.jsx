import { useContext } from "react";
import { useActionData, Form, Link, Navigate } from "react-router-dom";
import { UserContext } from "../context";

const ForgotPassword = () => {
    const { verified, user, email } = useContext(UserContext);
    const data = useActionData();
    if(!data&&user&&!verified){
        return <div className="success-message">
        Your email is not verified. Click <Link to='/settings/verify-email'>here</Link> to verify your email first.
        </div>
    }
    if(data&&data.authorized){
        <Navigate to='/settings/recover-password' />
    }
    return <Form method="post" action="/settings/forgot-password">
    {!data&&<>
    We will send you a verification code to your email address, {email}.
    Once you recieve the code, you will be prompt to type it in.
    <button>Send me the code</button></>}
    {data&&data.codeSent&&<>
    <input type="text" name="code" placeholder="Type in the code you recieved here" required /><br />
    <button>Submit</button>
    {data.noMatch&&<div className="error-message">{data.noMatch}</div>}
    </>}
    {data&&data.error&&<div className="error-message">{data.error}</div>}
</Form>
}
 
export default ForgotPassword;