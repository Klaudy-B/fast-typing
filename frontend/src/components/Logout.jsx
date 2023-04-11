import { useActionData, Form, Navigate } from "react-router-dom";
import { setTitle, urls } from "../scripts/helpers";

const Logout = () => {
    setTitle('Log out');
    const data = useActionData();
    if(data&&data.ok){
        return <Navigate to={urls.home} replace={true} />
    }
    return <Form id="logout" method="post" action={`${urls.settings}${urls.logout}`}>
        <span>Click the <b>Log out</b> button below to log out.</span>
    <button>Log out</button>
</Form>
}
 
export default Logout;