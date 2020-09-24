import React, {useState} from "react";
import {connect} from "react-redux"
import {createSlep} from "../Action/sleepAction"


const BedTime=(props)=>{
    const [time, setTime]= useState()
console.log(props.activeLogId)

const handelSubmit=(e)=>{
e.preventDefault();
props.createSlep({bedtime:time})
}
    return(
       <form onSubmit={handelSubmit}>
           <input 
           type="time" 
           value={time}
           onChange={(e)=>{
setTime(e.target.value)
           }}
           />
           <button type="submit">Create Sleep Log</button>
       </form>
    )
}

const mapStateToProps=state=>{
    return{activeLogId:state.activeLogId}
  }
 
  

  
export default connect(mapStateToProps,{createSlep})(BedTime);