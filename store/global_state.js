import { createContext, useEffect, useReducer } from "react";
import reducers from "./reducers";
import { getData } from "../utils/fetch_data";

export const DataContent = createContext()

export const DataProvider =  ({children}) => {

    const initial_state =  {notify: {}, auth: {}};
    const [state, dispatch] = useReducer(reducers, initial_state);

    useEffect(()=>{
        const firstLogin = localStorage.getItem("first_login");
        if(firstLogin){
            getData('auth/access_token').then(res => {
                if(res.err) return localStorage.removeItem("first_login")
                dispatch({ 
                    type: "AUTH",
                    payload: {
                        token: res.access_token,
                        user: res.user
                    }
                })
            })
        }
    })

    return(
        <DataContent.Provider value={{state, dispatch}}>
            {children}
        </DataContent.Provider>
    )
}