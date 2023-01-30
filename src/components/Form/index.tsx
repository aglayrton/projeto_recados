import React, { useState } from "react";
import { Stack, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface FormProps {
  mode: "login" | "signup";
}

const Form = ({ mode }: FormProps) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const outraPagina = () => {
    if (mode === "login") {
      navigate("/signup");
    } else {
      navigate("/");
    }
  };
  return (
    <React.Fragment>
      <Stack spacing={2}>
        {mode == "login" && (
          <>
            <TextField id='outlined-password-input' label='Email' type='text' />
            <TextField
              id='outlined-password-input'
              label='Password'
              type='password'
              autoComplete='current-password'
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
            <TextField
              id='outlined-password-input'
              label='Email'
              type='text'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              error={value.length > 1 && value.length <8 ? true : false}
              helperText={!value ? "Required" : ""}
            />
            <TextField
              id='outlined-password-input'
              label='Password'
              type='password'
              autoComplete='current-password'
            />
            <TextField
              id='outlined-password-input'
              label='Confirm Password'
              type='password'
              autoComplete='current-password'
            />
            <Button
              variant='contained'
              color='success'
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
