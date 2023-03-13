import { Form, useActionData, Link } from "react-router-dom";

const Password = () => {
    const data = useActionData();
    return <>
    <Form method="post" action="/settings/password">
        <label>Your current password:</label>
        <input type="password" name="current-password" placeholder="Type in your current password here" required />
        {data&&data.errorFields&&data.errorFields.password1&& <div className="error-message">{data.errorFields.password1}</div>}
        <label>Your new password:</label>
        <input type="password" name="new-password" placeholder="Type in your new password here" required />
        {data&&data.errorFields&&data.errorFields.password2&& <div className="error-message">{data.errorFields.password2}</div>}
        <label>Confirm your new password:</label>
        <input type="password" name="new-password-confirmation" placeholder="Type in your new password again"
        required />
        {data&&data.errorFields&&data.errorFields.password3&& <div className="error-message">{data.errorFields.password3}</div>}
        <button>Change password</button>
        {data&&data.success&&<div className="success-message">{data.success}</div>}
    </Form>
    <Link to='/settings/forgot-password'>I forgot my password</Link>
    </>
}
 
export default Password;