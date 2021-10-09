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
flex-wrap: wrap;

justify-content: center;
overflow: auto;
background-image: url("https://wallpaperaccess.com/full/4729119.png");
opacity: 0.95;
margin-top: 80px;

@media(max-width:2080px){
    //background-repeat:repeat-y;
   //background-repeat:repeat-x;
   width: 95%;
   background-size: 100% auto;
}

`

const Songs= styled.li`
border: 4px solid;
border-image:linear-gradient(227.91deg,#106AF2 0%,#00E0FF 100%) 1;
//display: inline-block;
//height: 738px;
//min-height: auto;
height: fit-content;
max-height:738px;
margin:20px 100px;

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
height: auto;
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
        margin:10px 0;
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
    right: 10%;
    border-radius: 30px;
    z-index:3;
    cursor: pointer;
    
    svg{
        display: none;
    }
   
    @media(max-width:800px){
        height: 40px;
        background-color: black;
        svg{
            color: yellow;
            display: block;
        }

        p{
            display: none;
        }
    }
    

`


export {Button,FullSong,FavoriteSong,SongInfo,ActionButtons,SongCover,SongsContainer,Container,Songs}