import React, { useState } from "react";
import {
  Modal,
  Input,
  InputNumber,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useRegisterUser } from "../../no3_store/hooks/useUser";

const { Title } = Typography;

const initialState = {
  id: "",
  username: "",
  password: "",
  confirmPassword: "",
  age: "",
  email: "",
  city: "",
};

const RegisterForm = ({ open, setOpen }) => {
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

  const handleRegister = async () => {
    const {
      username,
      password,
      confirmPassword,
      email,
    } = user;

    if (!username.trim()) {
      alert("아이디를 입력하세요.");
      return;
    }

    if (!password.trim()) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!email.trim()) {
      alert("이메일을 입력하세요.");
      return;
    }

    const { confirmPassword: _, ...userData } =
      user;

    userData.id = Date.now().toString();
    userData.age = Number(userData.age);

    try {
      await registerMutation.mutateAsync(
        userData
      );

      alert("회원가입 성공");

      setOpen(false);
      setUser(initialState);

      navigate("/");
    } catch (error) {
      alert(
        error?.message || "회원가입 실패"
      );
    }
  };

  return (
    <Modal
      open={open}
      onOk={handleRegister}
      onCancel={() => {
        setOpen(false);
        setUser(initialState);
      }}
      okText="회원가입"
      cancelText="취소"
      confirmLoading={
        registerMutation.isPending
      }
      width={500}
      centered
    >
      <Wrapper>
        <Title
          level={3}
          style={{ textAlign: "center" }}
        >
          회원가입
        </Title>

        <Description>
          새로운 계정을 생성하세요.
        </Description>

        <InputGroup>
          <Label>아이디</Label>
          <Input
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="아이디 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>비밀번호</Label>
          <Input.Password
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="비밀번호 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>비밀번호 확인</Label>
          <Input.Password
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호 다시 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>이메일</Label>
          <Input
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="이메일 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>나이</Label>

          <InputNumber
            value={user.age}
            onChange={(value) =>
              setUser((prev) => ({
                ...prev,
                age: value,
              }))
            }
            placeholder="나이 입력"
            style={{ width: "100%" }}
          />
        </InputGroup>

        <InputGroup>
          <Label>도시</Label>

          <Input
            name="city"
            value={user.city}
            onChange={handleChange}
            placeholder="도시 입력"
          />
        </InputGroup>
      </Wrapper>
    </Modal>
  );
};

export default RegisterForm;

const Wrapper = styled.div`
  padding: 20px 10px;
`;

const Description = styled.p`
  text-align: center;
  color: #64748b;
  margin-bottom: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #334155;
`;