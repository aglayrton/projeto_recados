import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userLogged, setUserLogged] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
      alert("Precisa está logado no sistema!");
      navigate("/");
    } else {
      setUserLogged(usuarioLogado);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  return (
    <React.Fragment>
      <h1>{userLogged}</h1>
      <h2 onClick={logout}>sair</h2>
    </React.Fragment>
  );
};

export default Home;
