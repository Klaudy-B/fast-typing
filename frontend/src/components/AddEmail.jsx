import { useActionData } from "react-router-dom";

const AddEmail = () => {
    const data = useActionData();
    return <Form method="post" action="/settings/add-email">
        <label>Your email:</label>
        <input type="email" name="email" required />
        <button>Add email</button>
        {data&&data.success&&<div>{data.succes} Click <Link to='/settings/verify-email'>here</Link> to verify your email.</div>}
        {data&&data.error&&<div>{data.error}</div>}
    </Form>
}
 
export default AddEmail;