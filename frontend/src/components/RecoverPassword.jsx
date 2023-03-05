import { Form, useActionData } from "react-router-dom";

const RecoverPassword = () => {
    const data = useActionData();
        return <Form method="post" action="/settings/forgot-password/recover-password">
        <label>New password:</label>
        <input type="password" name="new-password" required />
        {data&&data.errorFields&& <div className="error-message">{data.errorFields.password2}</div>}
        <label>Confirm new password:</label>
        <input type="password" name="new-password-confirmation" required />
        {data&&data.errorFields&& <div className="error-message">{data.errorFields.password3}</div>}
        <button>Change password</button>
        {data&&data.success&&<div className="success-message">{data.success}</div>}
        {data&&data.error&&<div className="error-message">{data.error}</div>}
    </Form>
}
 
export default RecoverPassword;