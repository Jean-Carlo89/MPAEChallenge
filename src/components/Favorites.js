import {useState} from "react"
import axios from  "axios"
import styled from "styled-components"
import Player from "./utils/Player"
import {GrFavorite} from "react-icons/gr"
import {MdOutlineFavoriteBorder,
MdOutlineFavorite,MdFavorite} from "react-icons/md"
import { useEffect } from "react"
import {Link,useHistory} from "react-router-dom"
import {Button,FullSong,FavoriteSong,SongInfo,ActionButtons,SongCover,SongsContainer,Container,Songs} from "./utils/globalComponents"
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSelector,useDispatch} from "react-redux"
import{add,remove} from "../Redux/actions/index"

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

  useEffect(()=>{
    console.log(favorite)
  },[favorite])

  function toSong(song){
    window.open(song.link, '_blank').focus();
  }

  function Favorite(song){
    console.log("favoritei")
    console.log(favorite.arr)
    console.log(favorite.arr.length)
    console.log(song)

     let includes = false

     console.log(song.id)

    for(let i=0; i<favorite.arr.length;i++){
      
        if(favorite.arr[i].id===song.id){
            console.log(favorite.arr[i].id)
            console.log(song.id)
            console.log(i)
            includes=true
        }
    }

    console.log(includes)
    if(includes===false){
        console.log("add")
     
        dispatch(add(song))
        return
    }else{
        console.log("remove")
      
         dispatch(remove(song))
         return
    }
      
}


return(
    <>
        <Container>
        <Button onClick={()=>history.push("/")}>Ir para Tela principal</Button>
            <SongsContainer >
                
           
            
                        {songs?.map((song)=>{
                            return(
                                <Songs key = {song.id} >
                                    <SongCover background={song.cover_big || song.album.cover_big}/>
                                    <SongInfo>
                                    {song.duration ?<p><span>Duração</span>: {getMinutes(song.duration)} </p> :null}
                                        <p><span>Título</span>: {song.title} </p>
                                        <p><span>Cantor</span>: {song.artist.name} </p>
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

