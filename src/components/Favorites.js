import {useState} from "react"
import axios from  "axios"
import styled from "styled-components"
import Player from "./utils/Player"
import {GrFavorite} from "react-icons/gr"
import {MdOutlineFavoriteBorder,
MdOutlineFavorite,MdFavorite} from "react-icons/md"
import { useEffect } from "react"
import {Link,useHistory} from "react-router-dom"

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

  function toSong(song){
    window.open(song.link, '_blank').focus();
  }

  function Favorite(song){
    console.log("favoritei")
    console.log(favorite.arr)
    console.log(favorite.arr.length)
    console.log(song)
    delete song.isFavorite
    
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
  }

    return(
        <>
       {/* // <button onClick={Test}>test</button> 
       // <button onClick={Test2}>test2</button>  */}
    <Container>
      
        <SongsContainer>
            
            <Button onClick={()=>history.push("/favorites")}>Ir para favoritos</Button>
            {songs?.map((song)=>{
                return(
                    <Songs key = {song.id} >
                        <SongCover background={song.album.cover_big}/>
                        <SongInfo>
                             <p>Duração:{getMinutes(song.duration)} </p>
                            <p>Título:{song.title} </p>
                            <p>Duração:Cantor: {song.artist.name} </p>
                            <ActionButtons>
                            <FullSong onClick={()=>toSong(song)}>Ver música completa</FullSong>
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

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    height: auto;
    display: flex;
   // align-items: center;
    justify-content: center;
    
`
const SongsContainer = styled.ul`
width: 1000px;
height:auto;
border: 1px solid red;
display: flex;
flex-direction:column;
align-items: center;

`

const Songs= styled.li`
border: 1px solid blue;
margin-bottom: 30px;
`
const SongCover=styled.div`
width:500px;
height:500px;
background-image: url(${props => props.background});
`

const ActionButtons = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 95%;
border:1px solid red;
margin: 10px auto;
background-color: #A0A0A0;


`

const SongInfo=styled.div`
width:500px;
height:auto;
display: flex;
flex-direction: column;


    p{
        font-size: 20px;
    }

`

const FullSong=styled.a`
width: 150px;
height:30px;
background-color: white;
border-radius: 20px;
display: flex;
align-items: center;
justify-content: center;
    p{
        font-size: 20px;
    }

`

const FavoriteSong=styled.div`
    margin-right: 10px;
    svg{
        font-size: 40px;
        fill: ${props=>props.color};
        
    }
`

const Button=styled.button`
    width: auto;
    height: 20px;
    font-size: 20px;

`