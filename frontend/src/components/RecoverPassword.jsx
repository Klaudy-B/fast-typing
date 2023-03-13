import { Form, useActionData } from "react-router-dom";

const RecoverPassword = () => {
    const data = useActionData();
        return <Form method="post" action="/settings/recover-password">
        <label>Your new password:</label>
        <input type="password" name="new-password" placeholder="Type in your new password here" required />
        {data&&data.errorFields&&data.errorFields.password2&& <div className="error-message">{data.errorFields.password2}</div>}
        <label>Confirm your new password:</label>
        <input type="password" name="new-password-confirmation" placeholder="Type in your new password again" 
        required />
        {data&&data.errorFields&&data.errorFields.password3&& <div className="error-message">{data.errorFields.password3}</div>}
        <button>Change password</button>
        {data&&data.success&&<div className="success-message">{data.success}</div>}
        {data&&data.error&&<div className="error-message">{data.error}</div>}
    </Form>
}
 
export default RecoverPassword;