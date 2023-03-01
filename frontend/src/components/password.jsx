import { Form, useActionData } from "react-router-dom";

const Password = () => {
    const data = useActionData();
    return <Form method="post" action="/settings/password">
        <label>Current password:</label>
        <input type="password" name="current-password" required />
        {data&&data.errorFields&& <div className="error-message">{data.errorFields.password1}</div>}
        <label>New password:</label>
        <input type="password" name="new-password" required />
        {data&&data.errorFields&& <div className="error-message">{data.errorFields.password2}</div>}
        <button>Change password</button>
        {data&&data.success&&<div className="success-message">{data.success}</div>}
    </Form>
}
 
export default Password;