import { Form, useActionData } from "react-router-dom";

const Username = () => {
    const data = useActionData();
    return <Form method="post" action="/settings/username">
        <label>New username:</label>
        <input type="text" name="new-username" />
        {data&&data.errorFields&& <div className="error-message">{data.errorFields.username}</div>}
        <label>Your current password:</label>
        <input type="password" name="password" />
        {data&&data.errorFields&& <div className="error-message">{data.errorFields.password}</div>}
        <button>Change username</button>
        {data&&data.success&&<div className="success-message">{data.success}</div>}
    </Form>
}
 
export default Username;