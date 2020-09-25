import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { createSlep } from "../Action/sleepAction";

const EditSleep = (props) => {
  const [entry, setEntry] = useState({
    wake_time: "",
    wake_score: "",
    day_score: "",
    bedtime_score: "",
  });
  const [activeLog, setActiveLog]=useState()
  const { push } = useHistory();

useEffect(()=>{
  axiosWithAuth().get('day/current-user')
  .then (res=> {
    console.log(res.data)
    setActiveLog(res.data[0])
  })
  .catch (err => console.log(err))
},[])

  // changing all the valuse
  const changeHandler = (e) => {
    e.persist();
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };
  console.log(props);
  const submitHandeler = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`day/${activeLog.id}`, { ...entry, setEntry })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTime = (time) => {
    axiosWithAuth()
      .delete(`day/:id ${time.id}`)
      .then((res) => { console.log(res); })
      .catch((err) => { console.log(err); });
  };

  return (
    <form className="form" onSubmit={submitHandeler}>
      <div className="form-group">
        <label>
          Wake Time
          <input
            className="bedTimeinput1"
            type="time"
            value={entry.wake_time}
            name="wake_time"
            onChange={changeHandler}
          />
        </label>

        <div className="score">
        <label className="editlab" >
            Wake Score:
            <select
              className="bedTimeinput1"
              name="wake_score"
              value={entry.wake_score}
              onChange={changeHandler}
            >
              <option value="">…select…</option>
              <option value={1}>Bad </option>
              <option value={2}> Meh</option>
              <option value={3}>Okay</option>
              <option value={4}>Good</option>
            </select>
          </label>

          <label className="editlab" >
            Day Score:
            <select
              className="bedTimeinput1"
              name="day_score"
              value={entry.day_score}
              onChange={changeHandler}
            >
              <option value="">…select…</option>
              <option value={1}>Bad </option>
              <option value={2}> Meh</option>
              <option value={3}>Okay</option>
              <option value={4}>Good</option>
            </select>
          </label>

          <label className="editlab" >
          Bedtime Score:
            <select
              className="bedTimeinput1"
              name="bedtime_score"
              value={entry.bedtime_score}
              onChange={changeHandler}
            >
              <option value="">…select…</option>
              <option value={1}>Bad </option>
              <option value={2}> Meh</option>
              <option value={3}>Okay</option>
              <option value={4}>Good</option>
            </select>
          </label>
        </div>
      </div>
      <button className="bedtimeBtn1" type="onubmit">
        {" "}
        Edit
      </button>
    </form>
  );
};
const mapStateToProps = (state) => {
  return { activeLogId: state.activeLogId };
};
const mapDispatchToPrios = {
  createSlep,
};

export default connect(mapStateToProps, mapDispatchToPrios)(EditSleep);
