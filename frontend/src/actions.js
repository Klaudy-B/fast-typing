import { errorMessage } from "./scripts/helpers";

export const loginAction = async ({ request })=>{
    const button = document.querySelector('form > button');
    button.disabled = true;
    button.innerText = 'Logging in...';
    const formData = await request.formData();
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/login`,{
        method: request.method,
        body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get('password')
        }),
        credentials: 'include',
        headers: {
            "content-type": "application/json"
        }
    })
    if(res.status === 500){
        throw Error(errorMessage);
    }
    const data = await res.json();
    button.disabled = false;
    button.innerText = 'Log in';
    return data;
}

export const signupAction = async ({ request })=>{
    const button = document.querySelector('form > button');
    button.disabled = true;
    button.innerText = 'Signing up...';
    const formData = await request.formData();
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/signup`,{
        method: request.method,
        body: JSON.stringify({
            username: formData.get('username'),
            password1: formData.get('password1'),
            password2: formData.get('password2')
        }),
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(res.status === 500){
        throw Error(errorMessage);
    }
    const data = await res.json();
    button.disabled = false;
    button.innerText = 'Sign in';
    return data;
}

export const logoutAction = async ()=>{
    const button = document.querySelector('form > button');
    button.disabled = true;
    button.innerText = 'Logging out...';
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/logout`, {
        credentials: 'include'
    })
    button.disabled = false;
    button.innerText = 'Log out';
    if(!res.ok){
        throw Error(errorMessage);
    }
    return {ok: true};
}

export const usernameAction = async ({ request })=>{
    const button = document.querySelector('form > button');
    button.disabled = true;
    button.innerText = 'Changing your username...';
    const formData = await request.formData();
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/change-username`,{
        method: request.method,
        body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get('password')
        }),
        credentials: 'include',
        headers: {
            "content-type": "application/json"
        }
    })
    if(res.status === 500){
        throw Error(errorMessage);
    }
    const data = await res.json();
    button.disabled = false;
    button.innerText = 'Change username';
    return data;
}