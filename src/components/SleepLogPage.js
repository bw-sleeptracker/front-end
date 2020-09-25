// * dependencies:
import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import moment from "moment";
import styled from 'styled-components';

const SleepLogPage = (props) => {
  const [mostRecentLog, setMostRecentLog] = useState({});
    const [dayLogs, setDayLogs] = useState([]);
    const [weekLogs, setWeekLogs] = useState([]);
    const [monthLogs, setMonthLogs] = useState([]);
    const [view, setView] = useState('')

        // fetch your sleep data from the server when the component mounts
        // set that data to the SleepLogList state property
        const getMostRecent = () =>{
          axiosWithAuth()
          .get("day/current-user")
          .then(res => {
            console.log(res.data);
            setMostRecentLog(res.data[0])
          }).catch(err=> {
            console.log(err);
          });
          setView('mostRecent')
        }

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
const bedtime = new Date(`2020-09-18T${log.bedtime}`).getTime()
const formattedBedTime = moment(bedtime).format('hh:mm:A')
const wakeTime = new Date(`2020-09-18T${log.wake_time}`).getTime()
const formattedWakeTime = moment(wakeTime).format('hh:mm:A')
      return(
        <div key={log.id}>
          <p>Date: {moment(log.date).format("L")}</p>
          <p>Bedtime: {formattedBedTime}</p>
          <p>Wake Time: {formattedWakeTime}</p>
          <p>Total Hours Slept: {log.total_hours_slept}</p>
          <p>Average Quality: {log.average_quality}</p>
        </div>
      )
    })
  )
  const bedtime = new Date(`2020-09-18T${mostRecentLog.bedtime}`).getTime()
const formattedBedTime = moment(bedtime).format('hh:mm:A')
const wakeTime = new Date(`2020-09-18T${mostRecentLog.wake_time}`).getTime()
const formattedWakeTime = moment(wakeTime).format('hh:mm:A')

  const mostRecentView = (
        <div >
          <p>Date: {moment(mostRecentLog.date).format("L")}</p>
          <p>Bedtime: {formattedBedTime}</p>
          <p>Wake Time: {formattedWakeTime}</p>
          <p>Total Hours Slept: {mostRecentLog.total_hours_slept}</p>
          <p>Average Quality: {mostRecentLog.average_quality}</p>
        </div>
      )

  const weekView = (
    weekLogs && 
    weekLogs.map(log =>{
      return(
        <div key={log.id}>
          <p>Week of Year: {log.week_of_year}</p>
          <p>Average Hours Slept: {log.average_hours_slept}</p>
          <p>Average Quality: {log.average_quality}</p>
        </div>
      )
    })
  )

  const monthView = (
    monthLogs && 
    monthLogs.map(log =>{
      return(
        <div key={log.id}>
          <p>Month of Year: {log.month_of_year}</p>
          <p>Average Hours Slept: {log.average_hours_slept}</p>
          <p>Average Quality: {log.average_quality}</p>
        </div>
      )
    })
  )

  return (
      //waiting the SleepLogList component to be made, or whatever it gets called.
    <>
    <Button onClick={getDays}>Show Days</Button>
    <Button onClick={getWeeks}>Show Weeks</Button>
    <Button onClick={getMonths}>Show Months</Button>
    <Button onClick={getMostRecent}>Show Most Recent</Button>
    {
       view==="day" ?(dayView): view==="week" ? (weekView): view==="month" ? (monthView): view==="mostRecent" ?(mostRecentView): (<p>Select Logs You Want to</p>)
    }
     
    </>
  );
};

const Button = styled.button`
  
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
// `
export default SleepLogPage;

