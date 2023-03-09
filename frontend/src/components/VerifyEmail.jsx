import { useContext } from "react";
import { useActionData, Form, Link } from "react-router-dom";
import { UserContext } from "../context";

const VerifyEmail = () => {
    const { verified, email } = useContext(UserContext);
    const data = useActionData();
    if(!data&&verified){
        return <div className="success-message">Your email is already verified.</div>
    }
    return <Form method="post" action="/settings/verify-email">
        {!data&&<>
        We will send you a verification code to your email address, {email}.
        Once you recieve the code, you will be prompt to type it in.
        <button>Send me the code</button></>}
        {data&&data.codeSent&&<>
        <input type="text" name="verification-code" placeholder="Type in the code you recieved here" required /><br />
        <button>Submit</button>
        {data.noMatch&&<div className="error-message">{data.noMatch}</div>}
        </>}
        {data&&data.success&&
        <div className="success-message">
            {data.success}<br />
            <Link to='/'>Done</Link>
            </div>}
        {data&&data.error&&<div className="error-message">{data.error}</div>}
    </Form>
}
 
export default VerifyEmail;