import React, { createContext, useState } from "react";
import data from "/data.json";


export  const DessertContext = createContext()

const DessertProvider =  ({children}) =>{
    const [dessert, setDessert] = useState(data);
    
    

    return(
        <div>
            <DessertContext.Provider value ={{dessert,setDessert}}>
                {children}
            </DessertContext.Provider>
        </div>
    )
   
}

export default DessertProvider;
