import {useState} from "react"
import axios from  "axios"
import Player from "./utils/Player"
import {MdFavorite} from "react-icons/md"
import { useEffect } from "react"
import {useHistory} from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSelector,useDispatch} from "react-redux"
import{add,remove} from "../Redux/actions/index"
import {Button,FullSong,FavoriteSong,SongInfo,ActionButtons,SongCover,SongsContainer,Container,Songs} from "./utils/globalComponents"
import Loader from "react-loader-spinner";
import "./utils/css/loader.css"
import Searchbar from "./Searchbar"

export default function Home(){
    const history = useHistory()
    const favorite = useSelector(state=>state.favorites);
   
    const dispatch = useDispatch();
    const [hasMore,setHasMore] = useState(true)
    const [loading,setLoading] = useState(true)
    const [songs,setSongs] = useState([])
    const [favorites,setFavorites]= useState([])

   
   useEffect(()=>{
    axios.get("http://localhost:4000/allData")
    .then((response)=>{
       const allData = response.data
       console.log(allData)
      })
   },[])

   function Search(){
    axios.get("http://localhost:4000/allData")
    .then((response)=>{
       const allData = response.data
       console.log(allData)
      })
   }
   
    useEffect(()=>{
        axios.get("http://localhost:4000/topSongs?index=0")
        .then((response)=>{
            const song = response.data.tracks.data
            updateFavorites(song)
            setLoading(false)
          })
    },[])

    useEffect(()=>{
      updateFavorites()
    },[favorite])

   
    function updateFavorites(first){
        let tracks;
        if(first){
            tracks=first
        }else{
            tracks=songs
        }

        let favoriteObj = {}
        favorite.arr.forEach((item)=>{
            favoriteObj[item.id]=true
        })

        const newFavorites=tracks.map((item)=>{
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
        setSongs(newFavorites)
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


   function Test(){
        
    
    }

      

      function getMinutes(time){
        const minutes = Math.floor(time / 60);

        const seconds = time - minutes * 60;

        return `${minutes}:${seconds}`
      }

      function toSong(song){
        window.open(song.link, '_blank').focus();
      }

      function fetchData(){
        axios.get(`http://localhost:4000/topSongs?index=${songs.length}`)
        .then((response)=>{
            const answer  =  response.data.tracks.data      
            if(answer.length<10){
                setHasMore(false)
            }
            setSongs([...songs,...answer])
        })
      }
   
      return(
        <>
            <Container>
            <Button onClick={()=>history.push("/favorites")}>Ir para favoritos</Button>
            <Searchbar search={Search} songs={songs} setSongs={setSongs} setLoading={setLoading}/>
            <SongsContainer >
                    
                
                {
                    loading 
                    ? <Loader
                    type="Circles"
                    color="#00BFFF"
                    height={250}
                    width={250}
                    className="loader"
                    />
                    : <InfiniteScroll
                            dataLength={songs.length}
                            loader={<h4>Carregando mais músicas...</h4>}
                            className="scroller"
                            next={fetchData}
                            hasMore={hasMore}
                            >
                
                            {songs?.map((song)=>{
                                return(
                                    <Songs key = {song.id} >
                                        <SongCover background=  {song.cover_big || song.album.cover_big }/>
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
                        </InfiniteScroll>
                }

                    
                </SongsContainer>
            </Container>
        </>
  )
}
                        

                            


