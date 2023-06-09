import { useActionData, Form, Link, Navigate, useLoaderData } from "react-router-dom";
import { setTitle, placeholders, urls } from "../scripts/helpers";

const ForgotPassword = () => {
    setTitle('Forgot password');
    const { email } = useLoaderData();
    const data = useActionData();

    if(data&&data.authorized){
        return <Navigate to='/settings/recover-password' />
    }
    return <Form id="forgot-password-form" method="post" action={`${urls.settings}${urls.forgotPassword}`}>
    {!data&&<>
    We will send you a verification code to your email address, {email}.
    Once you recieve the code, you will be prompt to type it in.
    <button>Send me the code</button></>}
    {data&&data.codeSent&&<>
    <input type="text" name="verification-code" placeholder={placeholders.verificationCode} required /><br />
    <button>Submit</button>
    {data.noMatch&&<div className="error-message">{data.noMatch}</div>}
    </>}
    {data&&data.error&&<div className="error-message">{data.error}</div>}
</Form>
}
 
export default ForgotPassword;