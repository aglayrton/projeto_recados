import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import InputDefault, { Name } from "../../components/InputDefault";
import { Recado } from "../../types/recadoType";
import { User } from "../../types/userType";

const Home = () => {
  const [userLogged, setUserLogged] = useState<User | null>(
    JSON.parse(localStorage.getItem("usuarioLogado") ?? "null")
  );
  const [listaUsuarios, setListaUsuarios] = useState<User[]>(
    JSON.parse(localStorage.getItem("listaUser") ?? "[]")
  );
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged) {
      alert("Precisa está logado no sistema!");
      navigate("/");
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(userLogged));
  }, [navigate, userLogged]);

  const logout = () => {
    localStorage.removeItem("usuarioLogado");
    const index = listaUsuarios.findIndex((u) => u.email === userLogged?.email);
    listaUsuarios[index] = userLogged ? userLogged : listaUsuarios[index];
    setListaUsuarios(listaUsuarios);
    localStorage.setItem("listaUser", JSON.stringify(listaUsuarios));

    navigate("/");
  };

  const mudarInput = (value: string, key: Name) => {
    switch (key) {
      case "description":
        setDescription(value);
        break;
      case "details":
        setDetail(value);
        break;
      default:
    }
  };

  const handleSave = () => {
    if (description !== "" && detail !== "") {
      const novoRecado: Recado = {
        id: uuid(),
        description: description,
        detail: detail,
      };
      if (userLogged) {
        //uso esse if para descartar a parte do undefined
        setUserLogged({
          ...userLogged,
          recados: [...userLogged.recados, novoRecado],
        });
      }
      handleClear();
      alert("Recado salvo com sucesso!");
    } else {
      alert("Preencha os campos");
    }
  };

  const handleEdit = (id: string, description: string, details: string) => {
    setDescription(description);
    setDetail(details);
    setId(id);
  };

  const handleClear = () => {
    setDescription("");
    setDetail("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        flexDirection='row'
        justifyContent='right'
        style={{ marginBottom: "30px", padding: "10px" }}
      >
        <Grid item>
          <h1>Hello, {userLogged?.email}</h1>
        </Grid>
        <Grid item>
          <Button variant='contained' color='warning' onClick={logout}>
            Sair
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        columnSpacing={3}
        alignContent='center'
        padding={5}
        gap={2}
      >
        <Grid item xs={12} sm={4}>
          <InputDefault
            name={"description"}
            type={"text"}
            label={"Assunto"}
            value={description}
            handleChange={mudarInput}
            color={"secondary"}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputDefault
            name={"details"}
            type={"text"}
            label={"Details"}
            value={detail}
            handleChange={mudarInput}
            color={"secondary"}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant='contained' color='success' onClick={handleSave}>
            {id === "" ? "Salvar" : "Atualizar"}
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='right'>Descrição</TableCell>
                  <TableCell align='right'>Detalhamento</TableCell>
                  <TableCell align='right'>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userLogged &&
                  userLogged.recados.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align='right'>{row.description}</TableCell>
                      <TableCell align='right'>{row.detail}</TableCell>
                      <TableCell align='right'>
                        <Button
                          variant='text'
                          color='info'
                          onClick={() =>
                            handleEdit(row.id, row.description, row.detail)
                          }
                        >
                          Editar
                        </Button>
                        <Button variant='text' color='error'>
                          Apagar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
