import { Form, useActionData } from "react-router-dom";

const Username = () => {
    const data = useActionData();
    return <Form method="post" action="/settings/username">
        <label>Your new username:</label>
        <input type="text" name="new-username" placeholder="Type in your new username here" required />
        {data&&data.errorFields&& <div className="error-message">{data.errorFields.username}</div>}
        <label>Your password:</label>
        <input type="password" name="password" placeholder="Type in your password here" required />
        {data&&data.errorFields&& <div className="error-message">{data.errorFields.password}</div>}
        <button>Change username</button>
        {data&&data.success&&<div className="success-message">{data.success}</div>}
    </Form>
}
 
export default Username;