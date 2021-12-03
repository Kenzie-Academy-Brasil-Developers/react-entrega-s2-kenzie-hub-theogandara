import Techs from "../../components/techs/indesx";
import Works from "../../components/works/indesx";
import { Redirect } from "react-router-dom";

const Perfil = ({ autenticated }) => {
  if (!autenticated) {
    return <Redirect to="/" />;
  }

  const user = JSON.parse(localStorage.getItem("@kenziehub:user")) || "";

  console.log(user)

  return (
    <>
      <nav>
        <h2>Kenzie Hub</h2> <img src={user.avatar_url} alt="foto de perfil"></img>
      </nav>

      <div className="container">
        <Techs />
        <Works />

        <div className="perfil">
          <h2>Perfil</h2>
          <div className="list">
            Ligar agora
            <h4>{user.contact}</h4>
          </div>
          <div className="list">
            Enviar email
            <h4>{user.email}</h4>
          </div>
          <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Sair
      </button>
        </div>
      </div>
    </>
  );
};
export default Perfil;
