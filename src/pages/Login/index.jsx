import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Redirect, useHistory } from "react-router-dom";
import api from "../../services/api";

const Login = ({ autenticated, setAutenticated }) => {
  const history = useHistory();

  const formSchema = yup.object().shape({
    email: yup.string().required("Informe o seu email").email("Email inválido"),
    password: yup.string().required("Cadastre uma senha").min(6, "Senha fraca"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    api
      .post("/sessions", data)
      .then((response) => {
        console.log(response);
        localStorage.setItem(
          "@kenziehub:token",
          JSON.stringify(response.data.token)
        );
        localStorage.setItem(
          "@kenziehub:user",
          JSON.stringify(response.data.user)
        );
        setAutenticated(true)
        console.log("sucesso");
        history.push("/perfil");
      })
      .catch((_) => console.log("erro"));
  };

  if(autenticated){
    return <Redirect to="/perfil"/>
  }

  return (
    <>
      <h2>Kenzie Hub</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" {...register("email")} />
        <p>{errors.email?.message}</p>

        <input type="password" placeholder="Senha" {...register("password")} />
        <p>{errors.password?.message}</p>

        <button type="submit">Entrar</button>
      </form>
      <Link to="/cadastro">Não tem uma conta ?</Link>
      </>
  );
};
export default Login;
