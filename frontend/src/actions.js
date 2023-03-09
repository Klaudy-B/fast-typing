import { errorMessage } from "./scripts/helpers";

export const action = async (request, initialString, loadingString, url, method, body)=>{
    const button = document.querySelector('form > button');
    button.disabled = true;
    button.innerText = loadingString;
    const formData = await request.formData();
    const res = await fetch(url,{
        method,
        body: JSON.stringify(body),
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
    button.innerText = initialString;
    return data;
}
export const verificationAction = async (request, verifyUrl, codeUrl)=>{
    const button = document.querySelector('form > button');
    button.disabled = true;
    if(button.innerText === 'Submit'){
        button.innerText = 'Please wait...';
        const formData = await request.formData();
        const res = await fetch(verifyUrl,{
            method: 'POST',
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
        const res = await fetch(codeUrl, {
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

export const loginUsernameAction = async ({ request })=>{
    const data = await action(request, 'Continue', 'Please wait...', `${import.meta.env.VITE_BACKEND}/auth/login`, 'POST', {
        username: formData.get('username'),
    });
    return data;
}
export const loginPasswordAction = async ({ request })=>{
    const data = await action(request, 'Log in', 'Logging in...', `${import.meta.env.VITE_BACKEND}/auth/login`, 'POST', {
        password: formData.get('password'),
    });
    return data;
}
export const signupAction = async ({ request })=>{
    const data = await action(request, 'Sign up', 'Signing up...', `${import.meta.env.VITE_BACKEND}/auth/signup`, 'POST', {
        username: formData.get('username'),
        email: formData.get('email'),
        password1: formData.get('password1'),
        password2: formData.get('password2')
    })
    return data;
}
export const logoutAction = async ()=>{
    const data = await action(request, 'Log out', 'Logging out...', `${import.meta.env.VITE_BACKEND}/auth/logout`, 'GET', {});
    return { ok: data.ok};
}
export const usernameAction = async ({ request })=>{
    const data = await action(request, 'Change username', 'Changing your username...', `${import.meta.env.VITE_BACKEND}/auth/change-username`, 'PATCH', {
        username: formData.get('new-username'),
        password: formData.get('password')
    });
    return data;
}
export const passwordAction = async ({ request })=>{
    const data = await action(request, 'Change password', 'Changing your password...', `${import.meta.env.VITE_BACKEND}/auth/change-password`, 'PATCH', {
        password1: formData.get('current-password'),
        password2: formData.get('new-password'),
        password3: formData.get('new-password-confirmation')
    })
    return data;
}
export const EmailAction = async ({ request })=>{
    const data = await action(request, 'Change email', 'Changing email...', `${import.meta.env.VITE_BACKEND}/auth/change-email`, 'PATCH', {
        email: formData.get('email'),
        password: formData.get('password')
    })
    return data;
}
export const recoverPasswordAction = async ({ request })=>{
    const data = await action(request, 'Change password', 'Changing your password...', `${import.meta.env.VITE_BACKEND}/auth/recover-password`, 'POST', {
        password2: formData.get('new-password'),
        password3: formData.get('new-password-confirmation')
    })
    return data;
}
export const forgotUsernameAction = async ({ request })=>{
    const data = await action(request, 'Search for a match', 'Searching...', `${import.meta.env.VITE_BACKEND}/auth/forgot-username`, 'POST', {
        username: formData.get('username'),
    })
    return data;
}

export const verifyEmailAction = async ({ request })=>{
    const data = await verificationAction(request, `${import.meta.env.VITE_BACKEND}/auth/verify-email`, `${import.meta.env.VITE_BACKEND}/auth/verify-email`);
    return data;
}
export const forgotPasswordAction = async ({ request })=>{
    const data = await verificationAction(request, `${import.meta.env.VITE_BACKEND}/auth/forgot-password`, `${import.meta.env.VITE_BACKEND}/auth/forgot-password`);
    return data;
}