import { createContext } from "react";

export const EmpContext = createContext()

const EmpContextProvider = (props) => {
    const value = {
        
    }

    return (
        <EmpContext.Provider value={value}>
            {props.children}
        </EmpContext.Provider>
    )
}

export default EmpContextProvider