import Perfil from "../pages/Perfil";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import { Switch, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Routes = () => {

    const [autenticated, setAutenticated] = useState(false)

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("@kenziehub:token"))
        if(token){
            return setAutenticated(true)
        }
    },[autenticated])

  return (
    <Switch>
      <Route exact path="/">
        <Login autenticated={autenticated} setAutenticated={setAutenticated}/>
      </Route>
      <Route exact path="/cadastro">
        <Cadastro autenticated={autenticated}/>
      </Route>
      <Route exact path="/perfil">
        <Perfil autenticated={autenticated}/>
      </Route>
    </Switch>
  );
};

export default Routes