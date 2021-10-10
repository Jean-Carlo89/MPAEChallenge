
import Player from "./utils/Player"
import {MdFavorite} from "react-icons/md"
import {Link,useHistory} from "react-router-dom"
import {Button,FullSong,FavoriteSong,SongInfo,ActionButtons,SongCover,SongsContainer,Container,Songs} from "./utils/globalComponents"
import {useSelector,useDispatch} from "react-redux"
import{add,remove} from "../Redux/actions/index"
import "./utils/css/loader.css"

import{AiOutlineHome} from "react-icons/ai"

export default function Favorites(){
   const history = useHistory()
   const favorite = useSelector(state=>state.favorites);
   const dispatch = useDispatch();
   const songs = favorite.arr

function getMinutes(time){
    const minutes = Math.floor(time / 60);

    const seconds = time - minutes * 60;

    return `${minutes}:${seconds}`
  }

  function toSong(song){
    window.open(song.link, '_blank').focus();
  }

  function Favorite(song){
    
     let includes = false

    for(let i=0; i<favorite.arr.length;i++){
        if(favorite.arr[i].id===song.id){
            includes=true
        }
    }

    if(includes===false){
        dispatch(add(song))
        return
    }else{
         dispatch(remove(song))
         return
    }
      
}


return(
    <>
        <Container>
        <Button onClick={()=>history.push("/")}><p>Ir para Tela principal</p> <AiOutlineHome/></Button>
            <SongsContainer >
                {songs?.map((song)=>{
                  return(
                    <Songs key = {song.id} >
                        <SongCover background={song.picture_big  || song.cover_big || song.album.cover_big }/>
                        <SongInfo>
                            {song.duration ?<p><span>Duração</span>: {getMinutes(song.duration)} </p> :null}
                            {song.title ? <p><span>Título</span>: {song.title} </p>:null}
                            <p><span>Cantor</span>: {song.name || song.artist.name} </p>
                            <ActionButtons>
                                <FullSong onClick={()=>toSong(song)}><p>Ver música completa</p></FullSong>
                                <Player url={song.preview}/>
                                <FavoriteSong onClick={()=>Favorite(song)}>{ !song.isFavorite ? <MdFavorite color={"black"}/> : <MdFavorite color={"red"}/> }</FavoriteSong>
                                </ActionButtons>
                        </SongInfo>
                    </Songs>
                  )
                })
                    
                }
            </SongsContainer>
        </Container>
    </>
)
}

                
           
            
                      
