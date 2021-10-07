import FavoriteSongsReducer from "./favorites"

import {combineReducers} from "redux"

const allReducers = combineReducers({
    favorites:FavoriteSongsReducer
    
})

export default allReducers;