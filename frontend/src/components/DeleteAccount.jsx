import { useState } from "react";
import { Form, useActionData, Link } from "react-router-dom";
import { placeholders, setTitle, urls } from "../scripts/helpers";

const DeleteAccount = () => {
    setTitle('Delete account');
    const data = useActionData();
    const [rerender, setRerender] = useState(false);
    if(rerender){
        return <Form id="delete-account-form" method="post" action={`${urls.settings}${urls.deleteAccount}`}>
        <input type="password" name="password" placeholder={placeholders.password} required />
        {data&&data.errorFields&&<div className="error-message">{data.errorFields.password}</div>}
        <button>Delete my account</button>
        {data&&data.success&&<div className="success-message">
            {data.success}<br />
            <Link to='/'>Done</Link>
            </div>}
            {(!data||data&&!data.success)&&<Link to={urls.settings}>Back</Link>}
    </Form>
    }
    return<div className="delete-account">
        If you do this you will lose all your records. Do you want to delete your account?<br />
        <button onClick={()=>{setRerender(true)}}>I want to delete my account</button>
    </div>
}
 
export default DeleteAccount;