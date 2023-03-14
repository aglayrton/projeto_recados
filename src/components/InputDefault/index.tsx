import { TextField } from "@mui/material";
import React from "react";

interface InputDefaultProps {
  name: Name; //ante era string
  type: string;
  label: string;
  value: string;
  handleChange: (value: string, key: Name) => void; //(funcao que toda vez que o textfield modifica) o tipo dela pode ser Function
  //colocando o color depois que fizer o useEffect
  color: "error" | "secondary";
}

export type Name = "name" | "email" | "password" | "repassword" | "description" | "details";

//se eu fosse receber a funcao abaixo eu faria handleChange: ()=>React.ReactNode;
const InputDefault: React.FC<InputDefaultProps> = ({
  name,
  type,
  label,
  value,
  color,
  handleChange,
}) => {
  return (
    <React.Fragment>
      <TextField
        name={name}
        label={label}
        value={value}
        onChange={(e) => handleChange(e.target.value, name)}
        type={type}
        variant='outlined'
        color={color}
        fullWidth
      />
    </React.Fragment>
  );
};

export default InputDefault;
