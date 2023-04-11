import { Form, useActionData } from "react-router-dom";
import { placeholders, setTitle, urls } from "../scripts/helpers";

const RecoverPassword = () => {
    setTitle('Recover password');
    const data = useActionData();
        return <Form id="recover-password-form" method="post" action={`${urls.settings}${urls.recoverPassword}`}>
        <input type="password" name="new-password" placeholder={placeholders.newPassword} required />
        {data&&data.errorFields&&data.errorFields.password2&& <div className="error-message">{data.errorFields.password2}</div>}
        <input type="password" name="new-password-confirmation" placeholder={placeholders.newPasswordConfirmation} 
        required />
        {data&&data.errorFields&&data.errorFields.password3&& <div className="error-message">{data.errorFields.password3}</div>}
        <button>Change password</button>
        {data&&data.success&&<div className="success-message">{data.success}</div>}
        {data&&data.error&&<div className="error-message">{data.error}</div>}
    </Form>
}
 
export default RecoverPassword;