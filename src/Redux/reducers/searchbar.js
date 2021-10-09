const initialState ={
  value:"",
  type:""
}

const SearchbarReducer =  (state=initialState, action) =>{
        if(action.type==="update"){
            
            return { 
                type:action.newValue
                
            }
        }

        return {
            ...state,
        }
            
        
}

export default SearchbarReducer;