// action creatar
import {axiosWithAuth} from '../utils/axiosWithAuth'
export const SET_FORMVALUES="SET_FORMVALUES";
export const SUBMIT_FORM="SUBMIT_FORM";


export const getSleep=()=>(dispatch)=>{ 
   
    dispatch({ type: "SET_FORMVALUES" });
    axiosWithAuth.get(" https://sleep-tracker-backend.herokuapp.com/day/current-user")
    .then((res)=>{ dispatch({ type:SET_FORMVALUES,  payload:res.data });
    console.log(res)
})
}



export const createSlep=()=>(dispatch)=>{
    dispatch ({type: "SUBMIT_FORM"})
    axiosWithAuth()
    .post("https://sleep-tracker-backend.herokuapp.com/")
  
   
    
  
}     