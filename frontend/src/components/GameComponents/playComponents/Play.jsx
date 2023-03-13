import { useReducer, useContext } from "react";
import { useParams } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { UserContext } from "../../../context";
import {  useFetchRecordAndWords, useFetch } from "../../../hooks";
import Loading from "../../Loading";
import { reducer } from "../../../scripts/helpers";
import PlayContent from "./PlayContent";

function Play() {
  document.title = 'play';
  const [ state, dispatch ] = useReducer(reducer, {loading: true});
  useFetch(state.error, useParams().level, dispatch, useFetchRecordAndWords);
    return <>
      <header className="play">
      <div className="level"><b>Level:</b> { useParams().level }</div>
      <div className="player-name"><b>Player:</b> {useContext(UserContext).user}</div>
      <div className="record"><b>Current record:</b> {
        state.loading?<Loading />:
        <>{ state.record.value } {state.record.value>1 ?'characters':'character'} by second</>
        }
      </div>
      <div className="record-date"><b>Registered:</b> {state.loading?<Loading />:
        <>{formatDistanceToNow(new Date(state.record.updatedAt), { addSuffix: true})}</>
        }</div>
      </header>
        <PlayContent loading={state.loading} record={state.record&&state.record.value} charactersList={state.charactersList} seconds={state.seconds} level={useParams().level} />
      <button disabled={state.loading} onClick={()=>location.reload()}>Restart</button>
  </>
  
}
export default Play;
