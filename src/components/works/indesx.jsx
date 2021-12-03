import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import api from "../../services/api";
import { useEffect } from "react";

const Works = () => {
  const formSchema = yup.object().shape({
    title: yup.string().required("insira o nome do trabalho"),
    description: yup.string().required("descreva o trabalho"),
    deploy_url: yup.string().required("insira o status"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const token = JSON.parse(localStorage.getItem("@kenziehub:token")) || "";

  const [works, setWorks] = useState([]);

  const loadWorks = () => {
    const user = JSON.parse(localStorage.getItem("@kenziehub:user")) || "";
    api
      .get(`/users/${user.id}`)
      .then((response) => {
        setWorks(response.data.works);
      })
      .catch((_) => console.log("erro"));
  };

  useEffect(() => {
    loadWorks();
  }, [works]);

  const addWorks = (data) => {
    api
      .post("/users/works", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response)
        loadWorks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const remove = (idWork) => {
    api
      .delete(`/users/works/${idWork}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => {
        loadWorks();
      })
      .catch((_) => console.log("erro"));
  };
  return (
    <>
      <div className="techs">
        <h2>Meus trabalhos</h2>
        <form onSubmit={handleSubmit(addWorks)}>
          <input type="text" placeholder="Nome" {...register("title")} />
          <p>{errors.title?.message}</p>

          <input type="text" placeholder="Descrição" {...register("description")} />
          <p>{errors.description?.message}</p>

          <input type="text" placeholder="URL" {...register("deploy_url")} />
          <p>{errors.deploy_url?.message}</p>

          <button type="submit">Adicionar</button>
        </form>
        <ul>
          {works.map((work) => (
            <div key={work.id} className="list_work">
              <li>{work.title}</li>
              <span>{work.description}</span>
              <a href={work.deploy_url}>Acessar</a>
              <button onClick={() => remove(work.id)}>Remover</button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Works;
