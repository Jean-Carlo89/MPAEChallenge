const initialState ={

    arr:[]
}

const FavoriteSongsReducer = (state=initialState, action) =>{
        if(action.type==="add"){
            return { 
                ...state,
                arr: [...state.arr,action.item],
            }
        }

        if(action.type==="remove"){
           return {
               ...state,
               arr:state.arr.filter((item)=>{
                return item!==action.item
            })

           }
        }

        return state
}

export default FavoriteSongsReducer;