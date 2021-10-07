import styled from "styled-components"
const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    height: auto;
    display: flex;
   // align-items: center;
    justify-content: center;
    background-color:#222222;
    
    
`
const SongsContainer = styled.ul`
width: 2048px;
height:auto;
display: flex;
flex-direction:column;
align-items: center;
overflow: auto;
background-image: url("https://wallpaperaccess.com/full/4729119.png");
opacity: 0.95;
margin-top: 50px;

`

const Songs= styled.li`
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
margin: 10px auto;
border-radius: 50px;
background-color: #A0A0A0;
`

const SongInfo=styled.div`
width:500px;
height:auto;
display: flex;
flex-direction: column;
background-color: #f8f8d9;
opacity: 0.95;

     p{
        font-size: 20px;
    }

    span{
        font-size: 25px;
        font-weight: bold;
    }

`

const FullSong=styled.a`
width: auto;
height:40px;
background-color: white;
border-radius: 20px;
display: flex;
align-items: center;
margin-left:10px;
justify-content: center;
cursor: pointer;
    p{
        font-size: 20px;
    }

`

const FavoriteSong=styled.div`
    margin-right: 10px;
    cursor: pointer;
    svg{
        font-size: 40px;
        fill: ${props=>props.color};
        
    }
`

const Button=styled.button`
    width: auto;
    height: 80px;
    font-size: 35px;
    position: fixed;
    top: 130px;
    right: 460px;
    border-radius: 30px;
    z-index:3;
    cursor: pointer;
    

`


export {Button,FullSong,FavoriteSong,SongInfo,ActionButtons,SongCover,SongsContainer,Container,Songs}