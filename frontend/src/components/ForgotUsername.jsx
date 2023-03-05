import { useActionData, Form } from "react-router-dom";

const ForgotUsername = () => {
    const data = useActionData();
    return <>
    Type in the username you remember.
    <Form method='post' action='/settings/forgot-username'>
        <input type="text" name="username" required />
        <button>Search for a match</button>
        {data&&<div>{data.length} Result{data.length>1?"s":""}:
                {data.map((username, index)=><div key={index}>{username.username}</div>)}
            </div>}
    </Form>
    </>
}
 
export default ForgotUsername;