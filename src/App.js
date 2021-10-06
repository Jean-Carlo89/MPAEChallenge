import {useState} from "react"
import axios from  "axios"
function App() {
  const [songs,setSongs] = useState()
  
  function Test(){
    console.log("testei")
    axios.get("http://localhost:4000/topSongs")
    .then((response)=>{
      setSongs(response.data.tracks.data)
      console.log(response.data.tracks.data)
    })
  }

  return (
    <div className="App">
    <button onClick={Test}>test</button> 

    </div>
  );
}

export default App;
