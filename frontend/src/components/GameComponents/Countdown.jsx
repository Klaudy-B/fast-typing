import { useState, useEffect } from "react";
import Loading from "../Loading";

const Countdown = ({ setStart, loading }) => {
    const [ count, setCount ] = useState(3);
    useEffect(
        ()=>{
            if(loading){
                return;
            }
            if(count===0){
                setStart(true);
                return;
            }
            if(count>0){
                const timer = setTimeout(
                    ()=>{
                        setCount((count)=>count-1);
                    },
                    1000
                )
                return ()=>clearTimeout(timer);
            }
        },
        [count, loading]
    )
    if(loading){
        return <Loading />
    }
    if(count){
        return <div className="countdown">Start typing in { count }</div>
    }else{
        <></>
    }
}
 
export default Countdown;