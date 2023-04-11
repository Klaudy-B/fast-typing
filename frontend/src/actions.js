import { errorMessage } from "./scripts/helpers";

export const action = async (formId, initialString, loadingString, url, method, body)=>{
    try{
        const button = document.querySelector(`form#${formId} > button`);
        button.disabled = true;
        button.innerText = loadingString;
        let res;
        if(method === 'GET'){
            res = await fetch(url,{
                method,
                credentials: 'include',
            })
            if(res.status === 500){
                throw Error(errorMessage);
            }
            button.disabled = false;
            button.innerText = initialString;
            return {ok: res.ok};
        }
        res = await fetch(url,{
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
    }catch(error){
        console.log(error);
        return null;
    }
}
export const verificationAction = async (request, formId, verifyUrl, codeUrl)=>{
    try{
        const button = document.querySelector(`form#${formId} > button`);
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
    }catch(error){
        console.log(error);
        return null;
    }
}

export const loginUsernameAction = async ({ request })=>{
    const formData = await request.formData();
    const data = await action("login-username-form", 'Continue', 'Please wait...', `${import.meta.env.VITE_BACKEND}/auth/login`, 'POST', {
        username: formData.get('username'),
    });
    return data;
}
export const loginPasswordAction = async ({ request })=>{
    const formData = await request.formData();
    const data = await action("login-password-form", 'Log in', 'Logging in...', `${import.meta.env.VITE_BACKEND}/auth/login`, 'POST', {
        password: formData.get('password'),
    });
    return data;
}
export const signupAction = async ({ request })=>{
    const formData = await request.formData();
    const data = await action("signup-form", 'Sign up', 'Signing up...', `${import.meta.env.VITE_BACKEND}/auth/signup`, 'POST', {
        username: formData.get('username'),
        email: formData.get('email'),
        password1: formData.get('password1'),
        password2: formData.get('password2')
    })
    return data;
}
export const logoutAction = async ()=>{
    const data = await action("logout", 'Log out', 'Logging out...', `${import.meta.env.VITE_BACKEND}/auth/logout`, 'GET');
    return { ok: data.ok};
}
export const usernameAction = async ({ request })=>{
    const formData = await request.formData();
    const data = await action("username-form", 'Change username', 'Changing your username...', `${import.meta.env.VITE_BACKEND}/auth/change-username`, 'PATCH', {
        username: formData.get('new-username'),
        password: formData.get('password')
    });
    return data;
}
export const passwordAction = async ({ request })=>{
    const formData = await request.formData();
    const data = await action("password-form", 'Change password', 'Changing your password...', `${import.meta.env.VITE_BACKEND}/auth/change-password`, 'PATCH', {
        password1: formData.get('current-password'),
        password2: formData.get('new-password'),
        password3: formData.get('new-password-confirmation')
    })
    return data;
}
export const EmailAction = async ({ request })=>{
    const formData = await request.formData();
    const data = await action("email-form", 'Change email', 'Changing email...', `${import.meta.env.VITE_BACKEND}/auth/change-email`, 'PATCH', {
        email: formData.get('email'),
        password: formData.get('password')
    })
    return data;
}
export const recoverPasswordAction = async ({ request })=>{
    const formData = await request.formData();
    const data = await action("recover-password-form", 'Change password', 'Changing your password...', `${import.meta.env.VITE_BACKEND}/auth/recover-password`, 'POST', {
        password2: formData.get('new-password'),
        password3: formData.get('new-password-confirmation')
    })
    return data;
}
export const forgotUsernameAction = async ({ request })=>{
    const formData = await request.formData();
    const data = await action("forgot-username-form", 'Search for a match', 'Searching...', `${import.meta.env.VITE_BACKEND}/auth/forgot-username`, 'POST', {
        username: formData.get('username'),
    })
    return data;
}
export const deleteAccountAction = async ({ request })=>{
    const formData = await request.formData();
    const body = {
        password: formData.get('password')
    }
    const data = await action('delete-account-form', 'Delete my account', 'Deleting account...', `${import.meta.env.VITE_BACKEND}/auth/delete-account`, 'DELETE', body);
    return data;
}

export const verifyEmailAction = async ({ request })=>{
    const data = await verificationAction(request, "verify-email-form", `${import.meta.env.VITE_BACKEND}/auth/verify-email`, `${import.meta.env.VITE_BACKEND}/auth/verify-email`);
    return data;
}
export const forgotPasswordAction = async ({ request })=>{
    const data = await verificationAction(request, "forgot-password-form", `${import.meta.env.VITE_BACKEND}/auth/forgot-password`, `${import.meta.env.VITE_BACKEND}/auth/forgot-password`);
    return data;
}