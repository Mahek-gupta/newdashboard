export const intialState = {
    // name: "",
    email: "",
    password: "",
    confirmPassword: ""
}

 export const dataReducer=(state, action)=>{
      console.log('datareducer')
    if(action.type === "EMAILSET_DATA"){
        return {...state, email: action.payload}
    }
    if(action.type === "PASSWORDSET_DATA"){
        return {...state, password: action.payload}
    }
    if(action.type === "CONFIRM_PASSWORDSET_DATA"){
        return {...state, confirmPassword: action.payload}
    }
    return state
}