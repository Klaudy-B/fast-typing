import { useActionData, Form } from "react-router-dom";
import { placeholders, setTitle, urls } from "../scripts/helpers";

const ForgotUsername = () => {
    setTitle('Forgot username');
    const data = useActionData();
    return <>
    Type in the username you remember.
    <Form id="forgot-username-form" method='post' action='/forgot-username'>
        <input type="text" name="username" placeholder={placeholders.rememberUsername} required />
        <button>Search for a match</button>
        {data&&<div>{data.length} Result{data.length>1?"s":""}{data.length?":": ""}<br />
                {data.map((username, index)=><div key={index}><b>{username.username}</b></div>)}
            </div>}
    </Form>
    </>
}
 
export default ForgotUsername;