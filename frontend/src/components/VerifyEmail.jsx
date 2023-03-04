import { useContext } from "react";
import { useActionData } from "react-router-dom";
import { UserContext } from "../context";

const VerifyEmail = () => {
    const verified = useContext(UserContext).verified;
    const data = useActionData();
    if(verified){
        return <div className="success-message">Your email is already verified.</div>
    }
    return <Form method="post" action="/settings/verifyEmail">
        {!data&&<button>Send me the code</button>}
        {data&&data.codeSent&&<>
        <input type="text" name="verification-code" required /><br />
        <button>Submit</button>
        {data.noMatch&&<div className="error-message">{data.noMatch}</div>}
        </>}
        {data&&data.success&&<div className="success-message">{data.success}</div>}
        {data&&data.error&&<div className="error-message">{data.error}</div>}
    </Form>
}
 
export default VerifyEmail;