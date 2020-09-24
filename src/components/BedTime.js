import React, {useState} from "react";
import {connect} from "react-redux"
import {createSlep} from "../Action/sleepAction"


const BedTime=(props)=>{
    const [time, setTime]= useState()


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
export default connect(null,{createSlep})(BedTime);