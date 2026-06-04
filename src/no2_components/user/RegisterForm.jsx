
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRegisterUser } from "../../no3_store/hooks/useUser";

const initialState = {
  id: "",
  username: "",
  password: "",
  confirmPassword: "",
  age: "",
  email: "",
  city: "",
};

const RegisterForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(initialState);

  const registerMutation = useRegisterUser();

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

    if (user.password !== user.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const { confirmPassword, ...userData } = user;

    userData.id = Date.now().toString();
    userData.age = Number(userData.age);

    try {
      await registerMutation.mutateAsync(userData);

      alert("회원가입 성공");

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert("회원가입 실패");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo>MySystem</Logo>

        <Title>회원가입</Title>

        <Description>
          새로운 계정을 생성하세요.
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

        <InputGroup>
          <Label>비밀번호 확인</Label>

          <Input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호 다시 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>이메일</Label>

          <Input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="이메일 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>나이</Label>

          <Input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            placeholder="나이 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>도시</Label>

          <Input
            type="text"
            name="city"
            value={user.city}
            onChange={handleChange}
            placeholder="도시 입력"
          />
        </InputGroup>

        <RegisterButton type="submit">
          회원가입
        </RegisterButton>

        <Divider />

        <LoginButton
          type="button"
          onClick={() => navigate("/login")}
        >
          이미 회원이신가요? 로그인
        </LoginButton>
      </Form>
    </Container>
  );
};

export default RegisterForm;

