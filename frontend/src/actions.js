import { errorMessage } from "./scripts/helpers";

export const loginUsernameAction = async ({ request })=>{
    const button = document.querySelector('form > button');
    button.disabled = true;
    button.innerText = 'Please wait...';
    const formData = await request.formData();
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/login`,{
        method: request.method,
        body: JSON.stringify({
            username: formData.get('username'),
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
    button.innerText = 'Continue';
    return data;
}
export const loginPasswordAction = async ({ request })=>{
    const button = document.querySelector('form > button');
    button.disabled = true;
    button.innerText = 'Logging in...';
    const formData = await request.formData();
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/login`,{
        method: request.method,
        body: JSON.stringify({
            password: formData.get('password'),
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
            email: formData.get('email'),
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
        method: 'PATCH',
        body: JSON.stringify({
            username: formData.get('new-username'),
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

export const passwordAction = async ({ request })=>{
    const button = document.querySelector('form > button');
    button.disabled = true;
    button.innerText = 'Changing your password...';
    const formData = await request.formData();
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/change-password`,{
        method: 'PATCH',
        body: JSON.stringify({
            password1: formData.get('current-password'),
            password2: formData.get('new-password'),
            password3: formData.get('new-password-confirmation')
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
    button.innerText = 'Change password';
    return data;
}

export const EmailAction = async ({ request })=>{
    const button = document.querySelector('form > button');
    button.disabled = true;
    button.innerText = 'Changing email...';
    const formData = await request.formData();
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/change-email`,{
        method: 'PATCH',
        body: JSON.stringify({
            email: formData.get('email'),
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
    button.innerText = 'Change email';
    return data;
}

export const verifyEmailAction = async ({ request })=>{
    const button = document.querySelector('form > button');
    button.disabled = true;
    if(button.innerText === 'Submit'){
        button.innerText = 'Please wait...';
        const formData = await request.formData();
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/verify-email`,{
            method: request.method,
            body: JSON.stringify({
                verificationCode: formData.get('verification-code')
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
        button.innerText = 'Submit';
        return data;
    }
    if(button.innerText === 'Send me the code'){
        button.innerText = 'Please wait...';
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/verify-email`, {
            credentials: 'include'
        })
        if(res.status === 500){
            throw Error(errorMessage);
        }
        const data = await res.json();
        button.disabled = false;
        button.innerText = 'Send me the code';
        return data;
    }
}
export const forgotPasswordAction = async ({ request })=>{
    const button = document.querySelector('form > button');
    button.disabled = true;
    if(button.innerText === 'Submit'){
        button.innerText = 'Please wait...';
        const formData = await request.formData();
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/forgot-password`,{
            method: request.method,
            body: JSON.stringify({
                code: formData.get('code')
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
        button.innerText = 'Submit';
        return data;
    }
    if(button.innerText === 'Send me the code'){
        button.innerText = 'Please wait...';
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/forgot-password`, {
            credentials: 'include'
        })
        if(res.status === 500){
            throw Error(errorMessage);
        }
        const data = await res.json();
        button.disabled = false;
        button.innerText = 'Send me the code';
        return data;
    }
}
export const recoverPasswordAction = async ({ request })=>{
    const button = document.querySelector('form > button');
    button.disabled = true;
    button.innerText = 'Changing your password...';
    const formData = await request.formData();
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/recover-password`,{
        method: 'POST',
        body: JSON.stringify({
            password2: formData.get('new-password'),
            password3: formData.get('new-password-confirmation')
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
    button.innerText = 'Change password';
    return data;
}
export const forgotUsernameAction = async ({ request })=>{
    const button = document.querySelector('form > button');
    button.disabled = true;
    button.innerText = 'Searching...';
    const formData = await request.formData();
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/forgot-username`,{
        method: 'POST',
        body: JSON.stringify({
            username: formData.get('username'),
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
    button.innerText = 'Search for a match';
    return data;
}