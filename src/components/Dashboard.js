import React from "react"
import {Link, useHistory} from "react-router-dom"

const Dashboard=()=>{
    const history=useHistory()

    const viewNav=()=>{
        history.push("/day-logs")
    }
    const createNav=()=>{
        history.push("/bedtime")
            }
    const updateNav=()=>{
        history.push("/editsleep")
                    }
    return(
        <div>
            <button onClick={viewNav}>View log</button>
            <button onClick={createNav}>Create log </button>
            <button onClick={updateNav}>Update log</button>
        </div>
    )
}
export default Dashboard;