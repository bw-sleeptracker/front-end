// * dependencies:
import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import moment from "moment";
//waiting the SleepLogList component to be made, or whatever it gets called.
// import AddandEdit from "./AddandEdit";

const SleepLogPage = (props) => {
    const [dayLogs, setDayLogs] = useState([]);
    const [weekLogs, setWeekLogs] = useState([]);
    const [monthLogs, setMonthLogs] = useState([]);
    const [view, setView] = useState('')

        // fetch your sleep data from the server when the component mounts
        // set that data to the SleepLogList state property

const getDays = () =>{
  axiosWithAuth()
  .get("day/current-user")
  .then(res => {
    console.log(res.data);
    setDayLogs(res.data)
  }).catch(err=> {
    console.log(err);
  });
  setView('day')
}
const getWeeks = () =>{
  axiosWithAuth()
  .get("week/current-user")
  .then(res => {
    console.log(res.data);
    setWeekLogs(res.data)
  }).catch(err=> {
    console.log(err);
  });
  setView('week')
}
const getMonths = () =>{
  axiosWithAuth()
  .get("month/current-user")
  .then(res => {
    console.log(res.data);
    setMonthLogs(res.data)
  }).catch(err=> {
    console.log(err);
  });
  setView('month')}
const dayView = (
    dayLogs && 
    dayLogs.map(log =>{
      return(
        <div id={log.id}>
          <p>Date: {moment(log.date).format("L")}</p>
          <p>Bedtime: {log.bedtime}</p>
          <p>Wake Time: {log.wake_time}</p>
          <p>Total Hours Slept: {log.total_hour_slept}</p>
          <p>Average Quality: {log.avarage_quality}</p>
        </div>
      )
    })
  )

  const weekView = (
    weekLogs && 
    weekLogs.map(log =>{
      return(
        <div id={log.id}>
          <p>Week of Year: {log.week_of_year}</p>
          <p>Average Hours Slept: {log.average_hours_slept}</p>
          <p>Average Quality: {log.avarage_quality}</p>
        </div>
      )
    })
  )

  const monthView = (
    monthLogs && 
    monthLogs.map(log =>{
      return(
        <div id={log.id}>
          <p>Month of Year: {log.month_of_year}</p>
          <p>Average Hours Slept: {log.average_hours_slept}</p>
          <p>Average Quality: {log.avarage_quality}</p>
        </div>
      )
    })
  )

  return (
      //waiting the SleepLogList component to be made, or whatever it gets called.
    <>
    <button onClick={getDays}>Show Days</button>
    <button onClick={getWeeks}>Show Weeks</button>
    <button onClick={getMonths}>Show Months</button>
    {
       view==="day" ?(dayView): view==="week" ? (weekView): view==="month" ? (monthView): (<p>Select Logs You Want to</p>)
    }
     
    </>
  );
};

export default SleepLogPage;
