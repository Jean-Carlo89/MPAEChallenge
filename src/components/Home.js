import {useState} from "react"
import axios from  "axios"
import styled from "styled-components"

export default function Home(){
    const [songs,setSongs] = useState()
    
    function Test(){
        console.log("testei")
        axios.get("http://localhost:4000/topSongs")
        .then((response)=>{
          setSongs(response.data.tracks.data)
          console.log(response.data.tracks.data)
        })
      }
    
    return(
        <>
        <button onClick={Test}>test</button> 
    <Container>
      
        <SongsContainer>
            {songs?.map((song)=>{
                return(
                    <Songs key = {song.id} >
                        <SongCover background={song.album.cover_big}/>
                        <SongInfo>
                            Duração:{song.duration} Título:{song.title}
                            Cantor: {song.artist.name}
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

const SongInfo=styled.div`
width:500px;
height:auto;

`