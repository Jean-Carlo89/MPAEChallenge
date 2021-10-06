
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

/*components*/
import Home from "./Home"

function App() {
  
  return (
  <Router>    
      <Switch>
          <Route path='/' exact>
              <Home />
          </Route>
      </Switch>
  </Router>
    
  )
}

export default App;
