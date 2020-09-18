// * dependencies:
import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
//waiting the SleepLogList component to be made, or whatever it gets called.
import AddandEdit from "./AddandEdit";

const SleepLogPage = (props) => {
    
    const [AddandEdit, setAddandEdit] = useState([]);
        // fetch your sleep data from the server when the component mounts
        // set that data to the SleepLogList state property

  useEffect(()=> {
    axiosWithAuth()
    .get("data")
    .then(res => {
      console.log(res);
      setAddandEdit(res.data);
    }).catch(err=> {
      console.log(err);
    });
  }, []);

  useEffect(()=> {
    const getSleepLog = () => {
     axios
      .get("http://localhost:5000/api/sleep/")
      .then(res => {
        console.log(res);
        setAddandEdit(res.data);
      })
      .catch(error => console.log(error));
  };
  getSleepLog();
 }, []);


  return (
      //waiting the SleepLogList component to be made, or whatever it gets called.
    <>
      <h1>Just Making Magic!!!</h1>
      <AddandEdit sleep={addAndEdit} updateSleepLog={setAddandEdit} />
      
    </>
  );
};

export default SleepLogPage;
