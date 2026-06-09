import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  logout,
} from "../../no3_store/hooks/useUser";

import LoginFormModal from "../user/LoginFormModal";
import RegisterFormModal from "../user/RegisterFormModal";

const HeaderBar = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLogout = () => {
    logout();

    alert("로그아웃 되었습니다.");

    navigate("/");
  };

  return (
    <>
      <Container>
        <Logo onClick={() => navigate("/")}>
          MySystem
        </Logo>

        <Menu>
          {user ? (
            <UserSection>
              <UserName>
                👋 {user.username} 님
              </UserName>

              <LogoutButton onClick={handleLogout}>
                로그아웃
              </LogoutButton>
            </UserSection>
          ) : (
            <ButtonGroup>
              <LoginButton
                onClick={() => setLoginOpen(true)}
              >
                로그인
              </LoginButton>

              <RegisterButton
                onClick={() => setRegisterOpen(true)}
              >
                회원가입
              </RegisterButton>
            </ButtonGroup>
          )}
        </Menu>
      </Container>

      <LoginFormModal
        open={loginOpen}
        setOpen={setLoginOpen}
      />

      <RegisterFormModal
        open={registerOpen}
        setOpen={setRegisterOpen}
      />
    </>
  );
};

export default HeaderBar;

const Container = styled.header`
  width: 100%;
  height: 70px;
  background: #1e293b;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 32px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #4dabf7;
  cursor: pointer;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const UserName = styled.div`
  color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const BaseButton = styled.button`
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
`;

const LoginButton = styled(BaseButton)`
  background: white;
`;

const RegisterButton = styled(BaseButton)`
  background: #3b82f6;
  color: white;
`;

const LogoutButton = styled(BaseButton)`
  background: #ef4444;
  color: white;
`;