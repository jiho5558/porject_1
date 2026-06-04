
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { userLoginThunk } from "../../no3_store/slices/userSlice";

const initialState = {
  username: "",
  password: "",
};
const LoginForm = () => {
  const [user, setUser] = useState(initialState);

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (user.username.trim() === "") {
      alert("아이디를 입력하세요.");
      return;
    }

    if (user.password.trim() === "") {
      alert("비밀번호를 입력하세요.");
      return;
    }

    try {
      const result = await dispatch(
        userLoginThunk({
          username: user.username,
          password: user.password,
        })
      );

      console.log("Thunk 결과 :", result);

      if (userLoginThunk.fulfilled.match(result)) {
        alert("로그인 성공");

        navigate("/");
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error(error);

      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo>MySystem</Logo>

        <Title>로그인</Title>

        <Description>
          계정에 로그인하여 서비스를 이용하세요.
        </Description>

        <InputGroup>
          <Label>아이디</Label>

          <Input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="아이디 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>비밀번호</Label>

          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="비밀번호 입력"
          />
        </InputGroup>

        <LoginButton type="submit">
          로그인
        </LoginButton>

        <Divider />

        <RegisterButton
          type="button"
          onClick={() => navigate("/register")}
        >
          회원가입
        </RegisterButton>
      </Form>
    </Container>
  );
};


export default LoginForm;


const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #f8fafc;
`;

const Form = styled.form`
  width: 400px;

  background: white;

  padding: 40px;

  border-radius: 16px;

  display: flex;
  flex-direction: column;

  gap: 16px;

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  text-align: center;
`;

const Title = styled.h2`
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 10px;
`;

const BaseButton = styled.button`
  padding: 12px;
  border: none;
  cursor: pointer;
`;

const LoginButton = styled(BaseButton)`
  background: #2563eb;
  color: white;
`;

const RegisterButton = styled(BaseButton)`
  background: #e2e8f0;
`;

const Divider = styled.hr`
  width: 100%;
`;


