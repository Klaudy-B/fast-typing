import { useReducer } from "react";
import {  useFetchNewRecord } from "../../hooks";
import { reducer } from "../../scripts/helpers";

const NewRecord = ({ record ,level, start }) => {
      const [ state, dispatch ] = useReducer(reducer, {rerender: false});
    if(state.error){
        throw Error(error);
    }
      if(!start){
        return;
    }
    if(record>0&&!state.rerender){
        useFetchNewRecord(level, dispatch, record);
    }
    if(state.rerender){
        return <div className="new-record">New record: {record}{(record>1)?' characters':' character'} by seconds</div>
    }
    if(record>0&&!state.rerender){
        return <div className="loading">Registering new record...</div>
    }else{
        return <></>
    }
}
 
export default NewRecord;