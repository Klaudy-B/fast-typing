import { errorMessage } from "./scripts/helpers";

export const checkLoginStateLoader = async ()=>{
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/check-login-state`,{
        credentials: "include"
    })
    if(res.status === 500){
        throw Error(errorMessage);
    }
    return await res.json();
}
export const forgotPasswordLoader = async ()=>{
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/forgot-password-loader`,{
        credentials: "include"
    })
    if(res.status === 500){
        throw Error(errorMessage);
    }
    return await res.json();
}