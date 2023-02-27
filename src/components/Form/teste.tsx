import React, { useState, useEffect } from "react";
import { Stack, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputDefault, { Name } from "../InputDefault";

interface FormProps {
  mode: "login" | "signup";
}

interface Recado {
  id: string;
  description: string;
  detail: string;
}

interface User {
  email: string;
  password: string;
  recados: Recado[];
}

const Form = ({ mode }: FormProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);

  const [listaUsuarios, setListaUsuarios] = useState<User[]>(
    JSON.parse(localStorage.getItem("listaUsuarios") ?? "[]")
  );

  const outraPagina = () => {
    if (mode === "login") {
      navigate("/signup");
    } else {
      navigate("/");
    }
  };

  const mudarInput = (value: string, key: Name) => {
    //faço o switch pra nao pegar todos diretamente
    switch (key) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "repassword":
        setRepassword(value);
        break;
      default:
    }
  };

  useEffect(() => {
    if (email.length < 3) {
      //so para mudar a cor
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    if (
      !password ||
      !repassword ||
      password.length < 3 ||
      password !== repassword
    ) {
      //so para mudar a cor
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  }, [email, password, repassword]);

  const createAccount = () => {
    const newUser = {
      email,
      password,
      recados: [],
    };
    //(copiamos o que ja tem na lista, e adicionamos mais um valor no final do estado)
    setListaUsuarios([...listaUsuarios, newUser]);//depois apaga por causa do if abaixo
    //ou setListaUsuarios((prev)=>[...prev, newUser]); que é a mesama coisa de cima
    const useExist = listaUsuarios.some((user) => user.email === newUser.email);
    if (!useExist) {
      setListaUsuarios([...listaUsuarios, newUser]);
      alert("usuario cadastrado! Você será redirecionado");
      setTimeout(() => {navigate("/")}, 1500)
    } else {
      alert("email já em uso");
    }
  };
  //crie um outro useEffect so para salvar e atualizar o localstorag quando criar as contas
  useEffect(() => {
    localStorage.setItem("listaUsers", JSON.stringify(listaUsuarios));
  }, [listaUsuarios]);

  return (
    <React.Fragment>
      {" "}
      <Stack spacing={2}>
        {mode == "login" && (
          <>
            <InputDefault
              name='email'
              label='Email'
              type='email'
              value={email}
              color={errorEmail ? "error" : "secondary"}
              handleChange={mudarInput}
            />
            <InputDefault
              name='password'
              label='Password'
              type='password'
              value={password}
              color={errorPassword ? "error" : "secondary"}
              handleChange={mudarInput}
            />
            <Button variant='contained' color='success'>
              Logar
            </Button>
            <Typography>
              Não tem conta?{" "}
              <Typography
                color='blue'
                variant='caption'
                onClick={() => outraPagina()}
              >
                Cadastra-se
              </Typography>
            </Typography>
          </>
        )}

        {mode == "signup" && (
          <>
            <InputDefault
              name='email'
              label='Email'
              type='email'
              value={email}
              color={errorEmail ? "error" : "secondary"}
              handleChange={mudarInput}
            />
            <InputDefault
              name='password'
              label='Password'
              type='password'
              value={password}
              color={errorPassword ? "error" : "secondary"}
              handleChange={mudarInput}
            />
            <InputDefault
              name='repassword'
              label='Password'
              type='password'
              value={repassword}
              color={errorPassword ? "error" : "secondary"}
              handleChange={mudarInput}
            />
            <Button
              variant='contained'
              color='success'
              disabled={errorEmail || errorPassword}
              onClick={createAccount}
            >
              Criar Conta
            </Button>
            <Button
              variant='contained'
              color='warning'
              onClick={() => outraPagina()}
            >
              Voltar
            </Button>
          </>
        )}
      </Stack>
    </React.Fragment>
  );
};

export default Form;
