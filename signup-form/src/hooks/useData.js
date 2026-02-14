import React, { useReducer } from 'react'
import { dataReducer, intialState } from '../reducer/dataReducer'

const useData = () => {
console.log('usedata') 
    const [state, dispatch] = useReducer(dataReducer, intialState)
    const emailFunction = (signData)=>{
        dispatch({type: "EMAILSET_DATA", payload:signData});   }
    const passwordFunction = (signData)=>{
        dispatch({type: "PASSWORDSET_DATA", payload:signData})    }
    const confirmPasswordFunction = (signData)=>{
        dispatch({type: "CONFIRM_PASSWORDSET_DATA", payload:signData})    }

  return {emailFunction, passwordFunction, confirmPasswordFunction, state}
}

export default useData