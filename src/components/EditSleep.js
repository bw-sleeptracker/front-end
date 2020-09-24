import React, { useState } from "react";
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
  const { push } = useHistory();

  // changing all the valuse
  const changeHandler = (e) => {
    e.persist();
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };
console.log(props)
  const submitHandeler = (e) => {
    e.preventDefault();
    axiosWithAuth() .put(`day/${props.activeLogId}`, { ...entry, setEntry })
      .then((res) => {
      console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTime = (time) => {
    axiosWithAuth()
      .delete(`day/:id ${time.id}`)
      .then((res) => {
        console.log(res);
        const deletTime = entry.filter((e) => e.id !== time.id);
        deleteTime(deletTime);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="form" onSubmit={submitHandeler}>
      <div className="form-group">
        <label>
          <input type="time" value={entry.wake_time} name="wake_time" onChange={changeHandler} />
        </label>
        <label className="col-sm-2 col-form-label">
          Wake Score
          <select
            class="fa"
            name="wake_score"
            value={entry.wake_score}
            onChange={changeHandler}
          >
            <option value="">…Select One …</option>
            <option value={1}>Bad </option>
            <option value={2}> Meh</option>
            <option value={3}>Okay</option>
            <option value={4}>Good</option>
          </select>
        </label>

        <label className="col-sm-2 col-form-label">
          Day Score
          <select
            class="fa"
            name="day_score"
            value={entry.day_score}
            onChange={changeHandler}
          >
            <option value="">…Select One …</option>
            <option value={1}>Bad </option>
            <option value={2}> Meh</option>
            <option value={3}>Okay</option>
            <option value={4}>Good</option>
          </select>
        </label>

        <div className="form-input-group-prepend">
          <label className="col-sm-2 col-form-label">
            Bedtime Score
            <select
              class="fa"
              name="bedtime_score"
              value={entry.bedtime_score}
              onChange={changeHandler}
            >
              <option value="">…Select One …</option>
              <option value={1}>Bad </option>
              <option value={2}> Meh</option>
              <option value={3}>Okay</option>
              <option value={4}>Good</option>
            </select>
          </label>
        </div>

        <button className="btn btn-info" type="onubmit">
          Edit
        </button>
      </div>
    </form>
  );
};
const mapStateToProps=state=>{
  return{activeLogId:state.activeLogId}
}
const mapDispatchToPrios = {
  createSlep,
};

export default connect(mapStateToProps, mapDispatchToPrios)(EditSleep);
