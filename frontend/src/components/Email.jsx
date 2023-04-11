import { useActionData, Form, Link } from "react-router-dom";
import { placeholders, setTitle, urls } from "../scripts/helpers";

const Email = () => {
    setTitle('Change email');
    const data = useActionData();
    return <Form id="email-form" method="post" action={`${urls.settings}${urls.changeEmail}`}>
        <input type="email" name="email" placeholder={placeholders.newEmail} required />
        {data&&data.errorFields&&data.errorFields.email&&<div className="error-message">{data.errorFields.email}</div>}
        <input type="password" name="password" placeholder={placeholders.password} required />
        {data&&data.errorFields&&data.errorFields.password&&<div className="error-message">{data.errorFields.password}</div>}
        <button>Change email</button>
        {data&&data.success&&
        <div className="success-message">
            <span>{data.success} Click <Link to={`${urls.settings}${urls.verifyEmail}`}>here</Link> to verify your email.</span>
        </div>}
    </Form>
}
 
export default Email;