import { useEffect, useState } from "react";
import { Link, useActionData } from "react-router-dom";
import { errorMessage } from "scripts/helpers";
import Loading from "./Loading";

const VerifyEmail = () => {
    const data = useActionData();
    const [ state, setState ] = useState({});
    const [ error, setError ] = useState('');
    useEffect(
        ()=>{
            const abortSignal = new AbortController();
            fetch(`${import.meta.env.BACKEND}/auth/check-email`,{
                credentials: 'include',
                signal: abortSignal
            })
            .then(res=>{
                if(res.status === 500){
                    throw Error(errorMessage);
                }
                return res.json();
            })
            .then(data=>setState(data))
            .catch(error=> setError(error.message))

        return ()=>abortSignal.abort()
        },
        []
    )
    if(error){
        throw Error(error);
    }
    if(!state){
        return <Loading />
    }
    if(state.email){
        return <Form method="post" action="/settings/verifyEmail">
            {!data&&<button>Send me the code</button>}
            {data&&!data.success&&<><input type="text" name="verification-code" required /><br />
            <button>Submit</button></>}
            {data&&data.success&&<div className="success-message">Your email have been verified successfully.</div>}
        </Form>
    }
    if(state&&!state.email){
        return <div>
            You did not provided an email when you created your account. <Link to='/settings/add-email'>Add an email</Link>
        </div>
    }
}
 
export default VerifyEmail;