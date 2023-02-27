import React, { useState, useEffect } from "react";
import { Stack, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputDefault, { Name } from "../InputDefault";

interface FormProps {
  mode: "login" | "signup";
}

const Form = ({ mode }: FormProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const outraPagina = () => {
    if (mode === "login") {
      navigate("/signup");
    } else {
      navigate("/");
    }
  };

  //eu pego o valor digitado e pego o nome do campo
  //do tipo Name so pode receber os valores que estão nesse type, dai o massa é porque vai mudar o estado somente daquele cara que foi digitado
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

    if (mode === "signup") {
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
    }

    if (mode === "login") {
      if (
        !password
      ) {
        //so para mudar a cor
        setErrorPassword(true);
      } else {
        setErrorPassword(false);
      }
    }
  }, [email, password, repassword, mode]);

  const createAccount = () => {
    const newUser = {
      email,
      password,
      recados: [],
    };
    console.log(newUser);
  };

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
