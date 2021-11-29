import "./App.css";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import { Switch, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <div className="App-header">
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route exact path="/cadastro">
            <Cadastro/>
          </Route>
          <Route>
            <Perfil exact path="/perfil"/>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
