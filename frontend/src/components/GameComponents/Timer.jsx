import { useState, useEffect } from "react";
import { calculateSpeedAtTimeup } from "../../scripts/typingSpeedCheck";

const Timer = ({ setBlock, seconds, start, block}) => {
    const [count, setCount] = useState(seconds);
    let startTime;
    useEffect(
        ()=>{
            if(!start||block){
                return;
            }
            if(count===undefined){
                setCount(seconds);
                return;
            }
            if(count>0){
                startTime = Date.now();
                const timer = setTimeout(() => {
                    setCount((Math.round(count-((Date.now()-startTime)/1000))));
                }, 1000);
                return ()=>clearTimeout(timer);
            }
            if(count===0){
                calculateSpeedAtTimeup(seconds);
                setBlock(true);
            }
        },
        [count, start]
    )
    return <div className="timer">{count>0&&!block&&count}</div>
}
 
export default Timer;