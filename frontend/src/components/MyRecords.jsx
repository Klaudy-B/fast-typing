import { useEffect, useReducer } from "react";
import { reducer } from "../scripts/helpers";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import Loading from "./Loading";

const MyRecords = () => {
    const [ records, dispatch ] = useReducer(reducer, {});
    useEffect(
        ()=>{
            fetch(`${import.meta.env.VITE_BACKEND}/records/my-records`, {
                credentials: 'include'
            })
            .then(res=>res.json())
            .then(data=>dispatch(data))
        },
        []
    )
    if(records.error){
        throw Error(error);
    }
    if(!records){
        return <Loading />
    }
    return <div className="records">
        <ul>
            <li>
                Easy: {records.easy.value}<br />
                Registered: {formatDistanceToNow(new Date(records.easy.updatedAt), {addSuffix: true})}
            </li>
            <li>
                Medium: {records.medium.value}<br />
                Registered: {formatDistanceToNow(new Date(records.medium.updatedAt), {addSuffix: true})}
            </li>
            <li>
                Hard: {records.hard.value}<br />
                Registered: {formatDistanceToNow(new Date(records.hard.updatedAt), {addSuffix: true})}
            </li>
        </ul>
    </div>
}
 
export default MyRecords;