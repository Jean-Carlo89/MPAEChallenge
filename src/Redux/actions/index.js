export const add =  (song)=>{
    return{
        type:"add",
        item:{...song,isFavorite:true}
    }
}

export const remove = (song)=>{
    return{
        type:"remove",
        item:song
    }
}

export const updateType = (newType)=>{
    return{
        type:"updateType",
        newValue:newType
    }
}

export const updateValue = (newType)=>{
    return{
        type:"updateValue",
        newValue:newType
    }
}

