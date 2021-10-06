import {useState} from "react"
import axios from  "axios"
import styled from "styled-components"
import Player from "./utils/Player"
import {GrFavorite} from "react-icons/gr"
import {MdOutlineFavoriteBorder,
MdOutlineFavorite,MdFavorite} from "react-icons/md"
import { useEffect } from "react"


export default function Home(){
    const [songs,setSongs] = useState([])
    const [favorites,setFavorites] = useState([])
    
    
    useEffect(()=>{
        console.log("testei")
        axios.get("http://localhost:4000/topSongs")
        .then((response)=>{

           

          console.log(response.data.tracks.data)
          setSongs(response.data.tracks.data)
        })
        
    },[])
   
    function Test(){
        console.log("testei")
        axios.get("http://localhost:4000/topSongs")
        .then((response)=>{

           // const newSongs=

          console.log(response.data.tracks.data)
          setSongs(response.data.tracks.data)
        })
      }

       function Test2(){
            console.log(songs)
            console.log(favorites)
        }
    

      function getMinutes(time){
        const minutes = Math.floor(time / 60);

        const seconds = time - minutes * 60;

        return `${minutes}:${seconds}`
      }

    function Favorite(song){
        console.log("favoritei")
        setFavorites([...favorites,song])
        setSongs(songs)
    }

    function isFavorite(song){
        favorites?.forEach((s)=>{
            if(s===song){
                return true
            }
        })

        return false
    }
    
    return(
        <>
        <button onClick={Test}>test</button> 
        <button onClick={Test2}>test2</button> 
    <Container>
      
        <SongsContainer>
            {songs?.map((song)=>{
                return(
                    <Songs key = {song.id} >
                        <SongCover background={song.album.cover_big}/>
                        <SongInfo>
                            <p>Duração:{getMinutes(song.duration)} </p>
                            <p> Título:{song.title} </p>
                            <p>Duração:Cantor: {song.artist.name} </p>
                            <ActionButtons>
                            <FullSong>Ver música completa</FullSong>
                            <Player url={song.preview}/>
                            <FavoriteSong onClick={()=>Favorite(song)}>{ !song.isFavorite ? <MdFavorite color={"black"}/> : <MdFavorite color={"red"}/> }</FavoriteSong>

                            {/* <MdOutlineFavorite/>  */}

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

const Songs= styled.div`
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

const FullSong=styled.button`

height:30px;
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