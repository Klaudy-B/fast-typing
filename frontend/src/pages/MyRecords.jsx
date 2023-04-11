import { useEffect, useReducer } from "react";
import { reducer } from "../scripts/helpers";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Loading from "../components/Loading";
import { setTitle, urls } from "../scripts/helpers";

const MyRecords = () => {
    setTitle('My records');
    const [ records, dispatch ] = useReducer(reducer, {loading: true});
    useEffect(
        ()=>{
            fetch(`${import.meta.env.VITE_BACKEND}${urls.backend.records}${urls.backend.myRecords}`, {
                credentials: 'include'
            })
            .then(res=>res.json())
            .then(data=>dispatch({...data, loading: false}))
            .catch(error=>dispatch({error: error.message, loading: false}))
        },
        []
    )
    if(records.error){
        throw Error(records.error);
    }
    if(records.loading){
        return <Loading />
    }
    return <div className="records">
        <ul>
            <li>
                <b>Easy :</b> {records.easy.value} character{records.easy.value>1?'s': ''} by second<br />
                <b>Registered :</b> {formatDistanceToNow(new Date(records.easy.updatedAt), {addSuffix: true})}
            </li>
            <li>
                <b>Medium :</b> {records.medium.value} character{records.medium.value>1?'s': ''} by second<br />
                <b>Registered :</b> {formatDistanceToNow(new Date(records.medium.updatedAt), {addSuffix: true})}
            </li>
            <li>
                <b>Hard :</b> {records.hard.value} character{records.hard.value>1?'s': ''} by second<br />
                <b>Registered :</b> {formatDistanceToNow(new Date(records.hard.updatedAt), {addSuffix: true})}
            </li>
        </ul>
    </div>
}
 
export default MyRecords;