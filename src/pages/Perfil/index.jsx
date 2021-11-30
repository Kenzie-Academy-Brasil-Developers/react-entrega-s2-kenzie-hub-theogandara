import { Redirect} from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
import { useEffect } from "react";

const Perfil = ({autenticated}) => {

  const [techs, setTechs] = useState([])

  const token = JSON.parse(localStorage.getItem("@kenziehub:token")) || ""

  console.log(token)
  console.log(techs)

  const loadTechs = () =>{
    const user = JSON.parse(localStorage.getItem("@kenziehub:user")) || ""
    api
    .get(`/users/${user.id}`)
    .then((response)=>{
      setTechs(response.data.techs)
      console.log(response.data)
    })
    .catch((_) => console.log("Você não está logado"));
  }

  useEffect(()=>{
    loadTechs()
  },[])

  if(!autenticated){
    return <Redirect to="/"/>
  }

  return (
    <>
      <h2>Seja bem vindo</h2>
    </>
  );
};
export default Perfil;
