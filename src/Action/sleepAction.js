// action creatar
import {axiosWithAuth} from '../utils/axiosWithAuth'

export const SET_FORMVALUES="SET_FORMVALUES";
export const SUBMIT_FORM="SUBMIT_FORM";


export const getSleep=()=>(dispatch)=>{ 
    dispatch({ type: "SET_FORMVALUES" });
    axiosWithAuth.get(" day/current-user")
    .then((res)=>{ dispatch({ type:SET_FORMVALUES,  payload:res.data });
    console.log(res)
})
}



export const createSlep=(day)=>(dispatch)=>{
    dispatch ({type: "POST_SLEEP_START"})
    axiosWithAuth()
    .post("day/current-user",day)
    .then(res=> {
        console.log(res)
        dispatch ({type: "POST_SLEEP_SUCCESS",payload:res.data})
    })
   .catch(err=>{
       console.log(err)
       dispatch ({type: "POST_SLEEP_ERROR",payload:err})
   })

} 
// day/current-user