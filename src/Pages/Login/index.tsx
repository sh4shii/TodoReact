import React, { useState, useContext, useEffect } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import AuthContext, { AuthType } from "../../Contexts/authContext";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import img from '../../toDo.png'

const Login: React.FC = () => {
  const { setUserData } = useContext(AuthContext) as AuthType;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if( email.trim().length===0 || password.trim().length===0)return

    const response = await axios.post(
      "https://todo-backend-50fin.vercel.app/api/user/login",
      {
        email: email.trim(),
        password: password.trim(),
      }
    );

    if (response.status === 200) {
      const setToken = await localStorage.setItem("token", response.data);
      navigate('/')
    } else {
      console.log("Error");
    }
  };

  const token=localStorage.getItem("token");

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  useEffect(()=>
  {
    if(token!=null)navigate('/')
  },[token])

  return (
    <S.Page>
      <S.LeftSide>
       <S.Img src={img}></S.Img>
      </S.LeftSide>
      <S.RightSide>
        <S.Title>Sign in</S.Title>
        <S.Subtitle>
          Please, insert your informations to access your tasks.
        </S.Subtitle>
        <S.FieldName>Email</S.FieldName>
        <S.InputField
          value={email}
          id="email"
          onChange={handleEmail}
          placeholder="Insert your email"
        ></S.InputField>
        <S.FieldName>Password</S.FieldName>
        <S.InputField
          placeholder="Insert your password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></S.InputField>
        <Link to="/">
          <S.SignIn onClick={handleLogin}>Sign In</S.SignIn>
        </Link>
        <S.Subtitle>
          Don't have an account?{" "}
          <a
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </a>
        </S.Subtitle>
      </S.RightSide>
    </S.Page>
  );
};

export default Login;
