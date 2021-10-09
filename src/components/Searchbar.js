import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux"
import { IoMdArrowDropdown } from 'react-icons/io';
import{update} from "../Redux/actions/index"

export default function Searchbar(props) {
    const [isOpen, setIsOpen] = useState(false);
  //const options = props.options
  
  
  const options = [{value:"Top tracks", id:4},{value:"artist",id:1},{value:"album",id:2},{value:"track",id:3}]
  
  const toggling = () => setIsOpen(!isOpen);

  function onOptionClicked(option)  {
   // props.setSelected(option);
   dispatch(update(option.value))
    setIsOpen(false);
  };
   
    const [value, setValue] = useState("");
    let searchRef = useRef();

    const type = useSelector(state=>state.searchbar.type);
   
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(type)
    },[])
    
    function handleKeyPress(e){
        console.log(e.key)
        if(e.key==="Enter"){
        //props.setLoading(true)

        axios.get(`http://localhost:4000/allData?type=${type}&search=${value}`)
        .then((response)=>{
            console.log("entrou aqui")
           
            const song = response.data
          //  updateFavorites(song)
         //   setLoadding(false)
         console.log(song.data)
         
         props.setSongs(song.data)
         //props.setLoading(false)
          })
        }
        
    }

    return (
        <SearchHolder ref={searchRef}> 
            <Input
                onKeyPress={(e)=>handleKeyPress(e)}
                ref={props.ref}
                placeholder="Search for a song..."
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
            <IoMdArrowDropdown onClick={()=>toggling()}/>

            <DropDownContainer>
                {isOpen 
                    
                    ? <DropDownListContainer>
                    <DropDownList>
                    {options.map(option => (
                        <ListItem onClick={()=>onOptionClicked(option)} key={option.id}>
                        {option.value}
                        </ListItem>
                    ))}
                    </DropDownList>
                </DropDownListContainer>
                :
                null
                }
                </DropDownContainer>
        </SearchHolder>
    )
}

const Input = styled.input`
    width:100%;
    height: 5rem;
    padding:1rem;
    border-radius: .5rem;
    outline: none;
    border: none;
    font-size: 1.8rem;
    @media(max-width: 750px) {
        box-shadow: 0 0 2rem black;
        width: 100%;
        height: 6rem;
        font-size: 2.1rem;
    }
`;


const DropDownContainer = styled.div`
  width: 10.5em;
  margin-right:-338px;
  width: 300px;
  z-index: 3;
  
`;

const SearchHolder = styled.div`
    display:flex;
    flex-direction: column;
    width: 40rem;
    position:relative;
    align-items: center;
    @media(max-width: 750px){
        width: 100%;
    }
    position: fixed;
    z-index: 4;

    svg{
        font-size: 80px;
        color: black;
        position: fixed;
        top: 0px;
        right: 1001px;
    }
`;

const DropDownListContainer = styled.div`
margin-left: 0;

`;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  z-index:2;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 30px;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled.li`
  list-style: none;
  z-index: 2;
  margin-bottom: 0.8em;
  text-transform: capitalize;
`;