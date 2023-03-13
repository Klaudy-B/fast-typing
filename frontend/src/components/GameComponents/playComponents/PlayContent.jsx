import { useState, useRef } from "react";
import Countdown from "../Countdown";
import Timer from "../Timer";
import NewRecord from "../NewRecord";
import { evaluate } from "../../../scripts/typingSpeedCheck";


const PlayContent = ({ loading, record, charactersList, level, seconds })=>{
  const [newRecord, setNewRecord ] = useState(0);
  const [ block, setBlock ] = useState(false);
  const [ start, setStart ] = useState(false);
  const preInput = useRef('');
  return <div className="play">
    <Countdown setStart={ setStart } loading={loading} />
    {start&&!block &&<div className="go">Go!</div>}
    <Timer block={block} setBlock={setBlock} seconds={seconds} start={start} />
    <div className="wrapper">
      <div className="text-displayer">
      {charactersList&&start&&charactersList.map( (character, index)=> <span key={index}>{character}</span> )}
      </div>
      {start&&
        !block&&
        <textarea
        className="text-input"
        autoFocus
        onInput={ (e)=>{ evaluate(e, preInput, setBlock, seconds, record, setNewRecord) }}
        >
        </textarea>
      }
      <div className="cheat"></div>
      <div className="completion-message"></div>
    </div>
    {<NewRecord record={newRecord} level={level} start={start} />}
  </div>
}
 
export default PlayContent;