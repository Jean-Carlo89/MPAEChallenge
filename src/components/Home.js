import {useState} from "react"
import axios from  "axios"
import Player from "./utils/Player"
import {MdFavorite} from "react-icons/md"
import { useEffect } from "react"
import {useHistory} from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSelector,useDispatch} from "react-redux"
import{add,remove, updateType} from "../Redux/actions/index"
import {Button,FullSong,FavoriteSong,SongInfo,ActionButtons,SongCover,SongsContainer,Container,Songs} from "./utils/globalComponents"
import Loader from "react-loader-spinner";
import "./utils/css/loader.css"
import Searchbar from "./Searchbar"
import{BsFillStarFill} from "react-icons/bs"

export default function Home(){
    const history = useHistory()
    const favorite = useSelector(state=>state.favorites);
    
    const type = useSelector(state=>state.searchbar.type);
    const value = useSelector(state=>state.searchbar.value);
    const dispatch = useDispatch();
   
    const [hasMore,setHasMore] = useState(true)
    const [loading,setLoading] = useState(true)
    const [songs,setSongs] = useState([])
    const [favorites,setFavorites]= useState([])



    useEffect(()=>{
        searchToptracks()
    },[])


    useEffect(()=>{
        if(type==="Top tracks"){
            searchToptracks()
            return
        }

            setLoading(true)
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/allData?type=${type}&search=${value}`,{})
            .then((response)=>{
                console.log("entrou aqui")
                
                const song = response.data.data
                
                
                console.log(song)
                
               
               setSongs(updateFavorites(song))
                
                setLoading(false)
            
            })
      },[type])


      function searchToptracks(){
        setLoading(true)
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/topSongs?index=0`)
        .then((response)=>{
            
            setSongs(updateFavorites(response.data.tracks.data))
            // setLoading(false)
            setLoading(false)
          })
      }

   
   
    useEffect(()=>{
     setSongs(updateFavorites())
     //updateFavorites()
    },[favorite])


   
    function updateFavorites(first){
        console.log('entrou no favorites')
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
       return newFavorites
       // setSongs(newFavorites)
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


      function getMinutes(time){
        const minutes = Math.floor(time / 60);

        const seconds = time - minutes * 60;

        return `${minutes}:${seconds}`
      }

      function toSong(song){
        window.open(song.link, '_blank').focus();
      }

      function fetchData(){
       console.log(type)

       
       
       if(type==="Top tracks" || type ==="initial"){
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/topSongs?index=${songs.length}`)
        .then((response)=>{
            const answer  =  response.data.tracks.data  
            console.log(answer)    
            if(answer.length<10){
                setHasMore(false)
            }

            setSongs(updateFavorites([...songs,...answer]))
            //setSongs([...songs,...answer])
           
        })
       }else{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/allData?type=${type}&search=${value}&index=${songs.length}`)
        .then((response)=>{
            
            const answer  =  response.data.data   
            console.log(answer) 
            if(answer.length<10){
                setHasMore(false)
            }
            setSongs(updateFavorites([...songs,...answer]))
            //setSongs([...songs,...answer])
        })
       }
        
      }
   
      return(
        <>
            <Container>
            <Button onClick={()=>history.push("/favorites")}><p>Ir para favoritos </p><BsFillStarFill/></Button>
            <Searchbar songs={songs} setSongs={setSongs} setLoading={setLoading} updateFavorites={updateFavorites}/>
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
                            dataLength={songs?.length}
                            loader={<h4>Carregando mais músicas...</h4>}
                            className="scroller"
                            next={fetchData}
                            hasMore={hasMore}
                            >
                
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
                        </InfiniteScroll>
                }

                    
                </SongsContainer>
            </Container>
        </>
  )
}
                        

                            


