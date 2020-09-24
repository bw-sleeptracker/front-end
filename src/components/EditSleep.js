import React, { useState } from "react";
import { connect } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { createSlep } from "../Action/sleepAction";

const EditSleep = ({ sleep, updateSleep }) => {
  const [entry, setEntry] = useState({
    wake_time: "",
    wake_score: "",
    day_score: "",
    bedtime_score: "",
  });
  const { push } = useHistory();

  const changeHandler = (e) => {
    e.persist();
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const submitHandeler = (e) => {
    e.preventDefault();
    axiosWithAuth .put(`day/:id`, { ...entry, setEntry })
      .then((res) => {
        updateSleep(
          sleep.map((color) => {
            if (color.id === res.id) {
              return res.data;
            }
            return color;
          })
        );
        push("/api/day");
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
          <input type="time" value={time} name="wake_time" onChange={} />
        </label>
        <label className="col-sm-2 col-form-label">
          Wake Score
          <select
            class="fa"
            name="wake_score"
            value={entry.moodBeforeSleep}
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
            value={entry.moodBeforeSleep}
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
              value={entry.moodBeforeSleep}
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

        <button className="btn btn-info" type="onsubmit">
          Edit
        </button>
      </div>
    </form>
  );
};
const mapDispatchToPrios = {
  createSlep,
};

export default connect(null, mapDispatchToPrios)(EditSleep);
