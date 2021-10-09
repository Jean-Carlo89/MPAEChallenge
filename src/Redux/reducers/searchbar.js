const initialState ={
  value:"",
  type:"initial"
}

const SearchbarReducer =  (state=initialState, action) =>{
        if(action.type==="updateType"){
            
            return { 
                ...state,
                type:action.newValue
                
            }
        }

        if(action.type==="updateValue"){
            
            return { 
                ...state,
                value:action.newValue
                
                
            }
        }

        return {
            ...state,
        }
            
        
}

export default SearchbarReducer;