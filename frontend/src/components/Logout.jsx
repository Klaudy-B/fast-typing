import { useActionData, Form, Navigate } from "react-router-dom";

const Logout = () => {
    const data = useActionData();
    if(data&&data.ok){
        return <Navigate to='/' replace={true} />
    }
    return <Form method="post" action="/settings/logout">
    <button>Log out</button>
</Form>
}
 
export default Logout;