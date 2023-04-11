import { Form, useActionData } from "react-router-dom";
import { placeholders, setTitle, urls } from "../scripts/helpers";

const Username = () => {
    setTitle('Change username');
    const data = useActionData();
    return <Form id="username-form" method="post" action={`${urls.settings}${urls.username}`}>
        <input type="text" name="new-username" placeholder={placeholders.newUsername} required />
        {data&&data.errorFields&&data.errorFields.username&& <div className="error-message">{data.errorFields.username}</div>}
        <input type="password" name="password" placeholder={placeholders.password} required />
        {data&&data.errorFields&&data.errorFields.password&& <div className="error-message">{data.errorFields.password}</div>}
        <button>Change username</button>
        {data&&data.success&&<div className="success-message">{data.success}</div>}
    </Form>
}
 
export default Username;