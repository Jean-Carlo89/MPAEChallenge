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


export {Button,FullSong,FavoriteSong,SongInfo,ActionButtons,SongCover,SongsContainer,Container}