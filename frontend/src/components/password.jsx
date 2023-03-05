import { Form, useActionData, Link } from "react-router-dom";

const Password = () => {
    const data = useActionData();
    return <>
    <Form method="post" action="/settings/password">
        <label>Current password:</label>
        <input type="password" name="current-password" required />
        {data&&data.errorFields&& <div className="error-message">{data.errorFields.password1}</div>}
        <label>New password:</label>
        <input type="password" name="new-password" required />
        <label>confirm new password:</label>
        {data&&data.errorFields&& <div className="error-message">{data.errorFields.password2}</div>}
        <input type="password" name="new-password-confirmation" required />
        {data&&data.errorFields&& <div className="error-message">{data.errorFields.password3}</div>}
        <button>Change password</button>
        {data&&data.success&&<div className="success-message">{data.success}</div>}
    </Form>
    <Link to='/settings/forgot-password'>I forgot my password</Link>
    </>
}
 
export default Password;