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

export const update = (newType)=>{
    return{
        type:"update",
        newValue:newType
    }
}

