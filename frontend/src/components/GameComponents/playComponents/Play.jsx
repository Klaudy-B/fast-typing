import { useReducer, useContext } from "react";
import { useParams } from "react-router-dom";
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
      <header>
      <div className="level">Level: { useParams().level }</div>
      <div className="player-name">Player: {useContext(UserContext).user}</div>
      </header>
      <div className="record">Current record: {
        state.loading?<Loading />:
        <>{ state.record.value } {state.record.value>1 ?'characters':'character'} by second</>
        }
      </div>
        <PlayContent loading={state.loading} record={state.record&&state.record.value} charactersList={state.charactersList} seconds={state.seconds} level={useParams().level} />
      <button disabled={state.loading} onClick={()=>location.reload()}>Restart</button>
  </>
  
}
export default Play;
