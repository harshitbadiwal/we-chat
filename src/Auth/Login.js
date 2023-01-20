import {
  FormGroup,
  FormControl,
  Input,
  InputLabel,
  Typography,
  variant,
  Button,
  styled,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUserAuth } from "../context/AuthContext";
const initalVal = {
  name: "",
  username: "",
  email: "",
  phone: "",
};

const Container = styled(FormGroup)`
  width: 60%;
  margin: 5% auto 0 auto;
  border: 2px solid blue;
  display:flex;
  border-radius: 50px;
  padding: 2vw;
  & > div {
    margin: 15px;
    width: 80%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex:coloum ;
    margin: auto;
    margin-bottom: 25px;
  }
`;

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { Login } = useUserAuth();
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  
  const Loginuser = async () => {
    Login(email, password);

    // console.log(res);
    // navigate('/home')
  };

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{textAlign:"center"}}>login</Typography>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input name="email" onChange={(e) => setemail(e.target.value)} />
        </FormControl>

        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input
            name="password"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <Button variant="contained" onClick={() => Loginuser()}>
            login
          </Button>
        </FormControl>
      </Container>
      <Grid variant="h4" sx={{textAlign:"center"}}>
        Resgister Your Account <Link to={"/register  "}>Resgister</Link>
      </Grid>
    </>
  );
};

export default Login;
