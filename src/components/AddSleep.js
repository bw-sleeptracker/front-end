import React, { useState, useEffect } from "react";
import {connect} from "react-redux"
import * as yup from "yup";

import {createSlep} from "../Action/sleepAction"


const AddSleep = (props) => {
  const [entry, setEntry] = useState({
    user_id: "",
    date: "",
    sleepStart: "",
    sleepEnd: "",
    moodBeforeSleep: 3
  });

  useEffect(()=>{
    console.log(entry)
},[entry])

  const [errors, setErrors] = useState({
    user_id: "",
    date: "",
    sleepStart: "",
    sleepEnd: "",
    moodBeforeSleep: "",
    moodAfterSleep: "",
  });


  const entrySchema = yup.object().shape({
    date: yup.string().required(),
    sleepStart: yup.string().required(),
    sleepEnd: yup.string().required(),
    duration: yup.string(),
    moodBeforeSleep: yup.string(),
  });


  const validateChange = (e) => {
    yup
      .reach(entrySchema, e.target.name)
      //what its looking for
      .validate(e.target.value)
      //using the errors
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const changeHandler = (e) => {
    e.persist();
    
    let newEntryData;
    if (e.target.type === "time") {
      var d = new Date();
      var ty = e.target.value;
      var newDate = new Date(d.toString().split(":")[0].slice(0, -2) + ty);
      console.log("time", newDate)


      newEntryData = {
        ...entry,
        [e.target.name]: newDate,
      };
    } else if (e.target.type === "date") {
      newEntryData = {
        ...entry,
        [e.target.name]: new Date(e.target.value),
      };
    } else {
      newEntryData = {
        ...entry,
        [e.target.name]: e.target.value,
      };
    }

    validateChange(e);
    setEntry(newEntryData);
  };

  const submitHandeler = (e) => {
    e.preventDefault();
    setEntry({
        date: "",
        sleepStart: "",
        sleepEnd: "",
        moodBeforeSleep: "",
      });
      props.createSlep(entry)
      console.log(submitHandeler)
   
  };

console.log(entry)

  return (
  
 <form className="form" onSubmit={submitHandeler}>
      
     <div className="form-group">
     <div className="input-group mb-3">
          <label className="date">
            Date:
            <input
              id="date"
              type="date"
              name="date"
              placeholder="01/01/2020"
              onChange={changeHandler}
            />
          </label>
          </div>
     
         
          <div className="time">
          <div className="input-group mb-3">
          <label className="col-sm-2 col-form-label">
          Sleep Starting:
            <input
            type="time"
              id="sleepStart"
              name="sleepStart"
              placeholder="9:00PM"
              onChange={changeHandler}
            />
          </label>
          </div>
       
          <div className="input-group mb-3">
          <label className="col-sm-2 col-form-label">
            Sleep Ending:
            <input  className="date"
            type="time"
              id="sleepEnd"
              name="sleepEnd"
              placeholder="01/02/2020"
              onChange={changeHandler}
            />
          </label>
          </div>
          </div>
       
         
          <div className="form-input-group-prepend">
          <label className="col-sm-2 col-form-label">
            Sleep Mood
            <select className="form-control form-control-sm"
              name="moodBeforeSleep"
              value={entry.moodBeforeSleep}
              onChange={changeHandler}
            >
                <option value="">…Select One …</option>
                <option value={1}>Bad </option>
                <option value={2}> Meh</option>
                <option value={3}>Okay</option>
                <option value={4}>Good</option>
            </select>{" "}
          </label>
          </div>
          
        
          <button className="btn btn-info">Add</button>
    </div>

 </form>

  );
};
const mapDispatchToPrios ={
    createSlep
}
 
export default connect (null, mapDispatchToPrios)(AddSleep)
