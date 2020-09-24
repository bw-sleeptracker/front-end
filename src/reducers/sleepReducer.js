const initialState = {
  isLoading:false,
  error:"",
  sleepLog:{},
  activeLogId:""
  };
  
  const sleepReducer = (state = initialState, action) => {
    console.log(initialState)
    switch (action.type) {
      case "SET_FORMVALUES":
        return {
          ...state,
          formValues: action.payload
        };
      case "POST_SLEEP_START":
     return {
          ...state,
          isLoading: true };

          case "POST_SLEEP_SUCCESS":
            return {
                 ...state,
                 isLoading: false,
                 sleepLog:action.paylod, activeLogId:action.paylod.id};

                 case "POST_SLEEP_ERROR":
                  return {
                       ...state,
                       isLoading: false,
                       error:action.paylod };
      default:
        return state;
    }
  };
  
  export default sleepReducer;

