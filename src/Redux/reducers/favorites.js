const initialState ={

    arr:[]
}

const FavoriteSongsReducer =  (state=initialState, action) =>{
        if(action.type==="add"){
            
            return { 
                ...state,
                arr: [...state.arr,action.item],
            }
        }

        if(action.type==="remove"){
          const filtered = state.arr.filter((item)=>{
              if(item.id!==action.item.id){
                return item
              }
          })
          return {
              ...state,
              arr:filtered
          }
        }

        return {
           ...state,
           
        }
}

export default FavoriteSongsReducer;