import React, { useState } from "react";
import { Modal, Input, Typography, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useLoginUser } from "../../no3_store/hooks/useUser";

const { Title } = Typography;

const initialState = {
  name: "",
  password: "",
};

const LoginForm = ({ open, setOpen }) => {
  const [user, setUser] = useState(initialState);

  const navigate = useNavigate();
  const loginMutation = useLoginUser();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (user.name.trim() === "") {
      alert("아이디를 입력하세요.");
      return;
    }

    if (user.password.trim() === "") {
      alert("비밀번호를 입력하세요.");
      return;
    }

    try {
      await loginMutation.mutateAsync({
        name: user.name,
        password: user.password,
      });

      alert("로그인 성공");

      setOpen(false);
      setUser(initialState);

      navigate("/");
      window.location.reload();
    } catch (error) {
      alert(
        error?.message ||
          "아이디 또는 비밀번호가 틀렸습니다."
      );
    }
  };

  return (
    <Modal
      open={open}
      onOk={handleLogin}
      onCancel={() => {
        setOpen(false);
        setUser(initialState);
      }}
      okText="로그인"
      cancelText="취소"
      confirmLoading={loginMutation.isPending}
      width={450}
      centered
    >
      <Wrapper>
        <Title level={3} style={{ textAlign: "center" }}>
          로그인
        </Title>

        <Description>
          계정에 로그인하여 서비스를 이용하세요.
        </Description>

        <InputGroup>
          <Label>아이디</Label>

          <Input
            name="name"
            value={user.name}
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

        <Divider />

        <CloseButton
          type="button"
          onClick={() => {
            setOpen(false);
            setUser(initialState);
          }}
        >
          닫기
        </CloseButton>
      </Wrapper>
    </Modal>
  );
};

export default LoginForm;

const Wrapper = styled.div`
  padding: 20px 10px;
`;

const Description = styled.p`
  text-align: center;
  color: #64748b;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-weight: 600;
`;

const BaseButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;

const CloseButton = styled(BaseButton)`
  background: #e2e8f0;
`;