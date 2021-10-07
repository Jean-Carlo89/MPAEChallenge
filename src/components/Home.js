import {useState} from "react"
import axios from  "axios"
import styled from "styled-components"
import Player from "./utils/Player"
import {GrFavorite} from "react-icons/gr"
import {MdOutlineFavoriteBorder,
MdOutlineFavorite,MdFavorite} from "react-icons/md"
import { useEffect } from "react"


import {useSelector,useDispatch} from "react-redux"
import{add,remove} from "../Redux/actions/index"

export default function Home(){

    const favorite = useSelector(state=>state.favorites);
    const dispatch = useDispatch();

    const [songs,setSongs] = useState([])

    useEffect(()=>{
        console.log("testei")
        axios.get("http://localhost:4000/topSongs")
        .then((response)=>{
            const song = response.data.tracks.data
            let favoriteObj = {}
        favorite.arr.forEach((item)=>{
            favoriteObj[item.id]=true
        })

        const newFavorites=song.map((item)=>{
            if(favoriteObj[item.id]){
                return(
                    {...item,isFavorite:true}
                )
            }else{
                return(
                    {...item,isFavorite:false}
                )
            }
        })
        console.log("inicial newFavorites")
         console.log(newFavorites)
        setSongs(newFavorites)
        })
        
    },[])

    useEffect(()=>{
        //return
        console.log("entrou no useEffect")
        console.log(favorite)
        let favoriteObj = {}
        favorite.arr.forEach((item)=>{
            favoriteObj[item.id]=true
        })
       console.log("objeto")
        console.log(favoriteObj)
        //return

        const newFavorites = songs.map((item)=>{
            if(favoriteObj[item.id]){
                return(
                    {...item,isFavorite:true}
                )
            }else{
                return(
                    {...item,isFavorite:false}
                )
            }
        })

         console.log(newFavorites)
      setSongs(newFavorites)
        
    },[favorite])



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
            //console.log(songs)
            console.log(favorite)
        }
    

      function getMinutes(time){
        const minutes = Math.floor(time / 60);

        const seconds = time - minutes * 60;

        return `${minutes}:${seconds}`
      }


    // function isFavorite(song){
    //     favorites?.forEach((s)=>{
    //         if(s===song){
    //             return true
    //         }
    //     })

    //     return false
    // }
    
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