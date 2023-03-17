import { useEffect } from "react";
import { errorMessage } from "./scripts/helpers";

export const useFetchRecordAndWords = async (level, dispatch)=>{
    try{
        let res = await fetch(`${import.meta.env.VITE_BACKEND}/records/${level}/personal-record`,{
        credentials: 'include'
        })
        if(res.status === 500){
            return dispatch({ error: errorMessage, loading: true})
        }
        const record = await res.json();
        res = await fetch(`${import.meta.env.VITE_BACKEND}/words/${level}`,{
            credentials: 'include'
        })
        if(res.status === 500){
            return dispatch({ error: errorMessage, loading: true});
        }
        const data = await res.json();
        if(data.error){
            throw Error(data.error);
        }
        return dispatch({ record, charactersList: data.charactersList, seconds: data.seconds, loading: false});
    }catch(error){
        return dispatch({ error: error.message, loading: true});
    }
}
export const useFetchNewRecord = async(level, dispatch, record)=>{
    try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/records/${level}/set-record`,{
            method: 'POST',
            body: JSON.stringify({ newRecord: record }),
            credentials: 'include',
            headers: {'content-type': 'application/json'}
        })
        if(res.status === 500){
            return dispatch({error: errorMessage, rerender: false});
        }
        const data = await res.json();
        if(data.error){
            throw Error(data.error);
        }
        return dispatch({rerender: true});
       }catch(error){
        return dispatch({error: error.message, rerender: false});
       }
}
export const useFetch = (error, seed, level, dispatch, callBack)=>{
    useEffect(
        ()=>{
            callBack(level, dispatch);
        },
        [seed]
    )
    if(error){
        throw Error(error);
    }
}