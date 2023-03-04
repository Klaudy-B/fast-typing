import { useActionData, Form, Link } from "react-router-dom";

const Email = () => {
    const data = useActionData();
    return <Form method="post" action="/settings/change-email">
        <label>Your new email:</label>
        <input type="email" name="email" required />
        {data&&data.errorFields&&<div className="error-message">{data.errorFields.email}</div>}
        <label>Your current password:</label>
        <input type="password" name="password" required />
        {data&&data.errorFields&&<div className="error-message">{data.errorFields.password}</div>}
        <button>Change email</button>
        {data&&data.success&&<div className="success-message">{data.success} Click <Link to='/settings/verify-email'>here</Link> to verify your email.</div>}
    </Form>
}
 
export default Email;