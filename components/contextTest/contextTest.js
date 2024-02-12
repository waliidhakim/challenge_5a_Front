'use client'
import React, {createContext, useState} from 'react';

export const DataContext = createContext();

const ContextProvider = props => {
    const [data, setData] = useState(122333);

    return(
        <DataContext.Provider value={{data}}>
            {props.children}
        </DataContext.Provider>
    )
}


export default ContextProvider;