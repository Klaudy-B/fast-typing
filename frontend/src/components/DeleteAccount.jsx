import { Form, useActionData, Link } from "react-router-dom";

const DeleteAccount = () => {
    document.title = 'Delete account';
    const data = useActionData();
    const deleteAccount = ()=>{
        document.getElementsByClassName('delete-account').hidden = true;
        document.getElementsByClassName('delete-account-form').hidden = false;
    }
    return <>
    <div className="delete-account">
        If you do this you will lose all your records. Do you want to delete your account?<br />
        <button onClick={deleteAccount}>I want to delete my account</button>
    </div>
    <Form className="delete-account-form" method="post" action="/settings/delete-account" hidden={true}>
        <label>Type in your password:</label><br />
        <input type="password" name="password" required />
        {data&&data.errorFields&&<div className="error-message">{data.errorFields.password}</div>}
        <button>Delete my account</button>
        {data&&data.success&&<div className="success-message">
            {data.success}<br />
            <Link to='/'>Done</Link>
            </div>}
    </Form>
    </>
}
 
export default DeleteAccount;