import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
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
    console.log(data);
  };

  return (
    <>
    <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" {...register("email")} />
        <p>{errors.email?.message}</p>

        <input type="text" placeholder="Senha" {...register("password")} />
        <p>{errors.password?.message}</p>

        <button type="submit" >ok</button>
      </form>
    </>
  );
};
export default Login;
