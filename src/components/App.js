
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import GlobalStyle from "./utils/globalStyles"

/*components*/
import Home from "./Home"
import Favorites from "./Favorites"
function App() {
  
  return (
  <Router>    
    <GlobalStyle />
      <Switch>
          <Route path='/' exact>
              <Home />
          </Route>
          <Route path='/favorites' exact>
              <Favorites />
          </Route>
      </Switch>
  </Router>
    
  )
}

export default App;
