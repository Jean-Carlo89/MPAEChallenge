export const add =  (song)=>{
    return{
        type:"add",
        item:song
    }
}

export const remove = (song)=>{
    return{
        type:"remove",
        item:song
    }
}