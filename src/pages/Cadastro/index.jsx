import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Redirect, useHistory,Link } from "react-router-dom";
import api from "../../services/api";

const Cadastro = ({autenticated}) => {
  const history = useHistory();

  const formSchema = yup.object().shape({
    email: yup.string().required("Informe o seu email").email("Email inválido"),
    password: yup.string().required("Cadastre uma senha").min(6, "Senha fraca"),
    name: yup.string().required("Informe seu nome"),
    bio: yup.string().required("Insira uma biografia"),
    contact: yup.string().required("Insira um número de telefone"),
    course_module: yup.string().required("Qual seu modulo"),
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
      .post("/users", data)
      .then((response) => {
        console.log(response);
        console.log("sucesso");
        history.push("/")
      })
      .catch((_)=>console.log("erro"));
  };

  if(autenticated){
    return <Redirect to="/perfil"/>
  }

  return (
    <>
      <h2>Cadastro de usuário</h2>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Email" {...register("email")} />
          <p>{errors.email?.message}</p>

          <input type="text" placeholder="Senha" {...register("password")} />
          <p>{errors.password?.message}</p>

          <input type="text" placeholder="Nome" {...register("name")} />
          <p>{errors.name?.message}</p>

          <input
            type="text"
            text
            placeholder="Biografia"
            {...register("bio")}
          />
          <p>{errors.bio?.message}</p>

          <input type="text" placeholder="Contato" {...register("contact")} />
          <p>{errors.contact?.message}</p>

          <input
            type="text"
            placeholder="Modulo"
            {...register("course_module")}
          />
          <p>{errors.course_module?.message}</p>

          <button type="submit">Cadastrar</button>
        </form>
      </div>

      <Link to="/">Já tenho uma conta</Link>
    </>
  );
};

export default Cadastro;
