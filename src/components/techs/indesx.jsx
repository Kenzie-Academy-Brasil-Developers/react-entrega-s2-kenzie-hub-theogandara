import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import api from "../../services/api";
import { useEffect } from "react";

const Techs = () => {
  const formSchema = yup.object().shape({
    title: yup.string().required("insira o nome da tecnologia"),
    status: yup.string().required("insira o status"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const token = JSON.parse(localStorage.getItem("@kenziehub:token")) || "";

  const [techs, setTechs] = useState([]);

  const loadTechs = () => {
    const user = JSON.parse(localStorage.getItem("@kenziehub:user")) || "";
    api
      .get(`/users/${user.id}`)
      .then((response) => {
        setTechs(response.data.techs);
      })
      .catch((_) => console.log("erro"));
  };

  useEffect(() => {
    loadTechs();
  }, [techs]);

  const addTechs = (data) => {
    api
      .post("/users/techs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        loadTechs();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const remove = (idTech) => {
    api
      .delete(`/users/techs/${idTech}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => {
        loadTechs();
      })
      .catch((_) => console.log("erro"));
  };
  return (
    <>
      <div className="techs">
        <h2>Minhas tecnologias</h2>
        <form onSubmit={handleSubmit(addTechs)}>
          <input type="text" placeholder="Titulo" {...register("title")} />
          <p>{errors.title?.message}</p>

          <input type="text" placeholder="Status" {...register("status")} />
          <p>{errors.status?.message}</p>

          <button type="submit">Adicionar</button>
        </form>
        <ul>
          {techs.map((tech) => (
            <div key={tech.id} className="list">
              <li>{tech.title}</li>
              <span>{tech.status}</span>
              <button onClick={() => remove(tech.id)}>Remover</button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Techs;
