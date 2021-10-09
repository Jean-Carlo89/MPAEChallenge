import FavoriteSongsReducer from "./favorites"
import SearchbarReducer from "./searchbar"
import {combineReducers} from "redux"

const allReducers = combineReducers({
    favorites:FavoriteSongsReducer,
    searchbar:SearchbarReducer,
    
})

export default allReducers;