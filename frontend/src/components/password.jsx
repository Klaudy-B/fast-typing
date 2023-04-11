import { Form, useActionData, Link } from "react-router-dom";
import { placeholders, setTitle, urls } from "../scripts/helpers";

const Password = () => {
    setTitle('Change password');
    const data = useActionData();
    return <>
    <Form id="password-form" method="post" action={`${urls.settings}${urls.password}`}>
        <input type="password" name="current-password" placeholder={placeholders.password} required />
        {data&&data.errorFields&&data.errorFields.password1&& <div className="error-message">{data.errorFields.password1}</div>}
        <input type="password" name="new-password" placeholder={placeholders.newPassword} required />
        {data&&data.errorFields&&data.errorFields.password2&& <div className="error-message">{data.errorFields.password2}</div>}
        <input type="password" name="new-password-confirmation" placeholder={placeholders.newPasswordConfirmation}
        required />
        {data&&data.errorFields&&data.errorFields.password3&& <div className="error-message">{data.errorFields.password3}</div>}
        <button>Change password</button>
        {data&&data.success&&<div className="success-message">{data.success}</div>}
    </Form>
    <Link to={`${urls.settings}${urls.forgotPassword}`}>I forgot my password</Link>
    </>
}
 
export default Password;