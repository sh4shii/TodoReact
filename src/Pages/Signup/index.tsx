import React, { useState, useContext } from "react";
import * as S from "./styles";
import Logo from "../../Img/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import AuthContext, { AuthType } from "../../Contexts/authContext";
import axios from "axios";
import img from '../../toDo.png'


const Signup: React.FC = () => {
  const { setUserData } = useContext(AuthContext) as AuthType;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const navigate = useNavigate();

  // function handleSignup() {
  //   // localStorage.setItem("@Project:email", email);
  //   // setUserData({ email });
  //   //https://todo-backend-50fin.vercel.app/api/signup

  //   const resp

  // }

  const handleSignup = async () => {

    if(name.trim().length===0 || email.trim().length===0 || password.trim().length===0)return
    const response = await axios.post(
      "https://todo-backend-50fin.vercel.app/api/user/signup",
      {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      }
    );

    console.log(response.data);

    // const response = await axios.get(
    //   "https://todo-backend-50fin.vercel.app/api/user"
    // );

    // console.log(response);
  };

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  return (
    <S.Page>
      <S.LeftSide>
      <S.Img src={img}></S.Img>
      </S.LeftSide>
      <S.RightSide>
        <S.Title>Sign up</S.Title>
        <S.Subtitle>
          Please, insert your informations to access your tasks.
        </S.Subtitle>
        <S.FieldName>Name</S.FieldName>
        <S.InputField
          placeholder="Insert your Name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></S.InputField>
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
          <S.SignIn onClick={handleSignup}>Sign Up</S.SignIn>
        </Link>
        <S.Subtitle>
          Already have an account?{" "}
          <a onClick={() => [navigate("/login")]}>Sign In</a>
        </S.Subtitle>
      </S.RightSide>
    </S.Page>
  );
};

export default Signup;
