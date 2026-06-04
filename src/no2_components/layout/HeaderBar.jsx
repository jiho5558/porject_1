
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  logout,
} from "../../no3_store/hooks/useUser";

const HeaderBar = () => {
  const user = getCurrentUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    alert("로그아웃 되었습니다.");

    navigate("/login");
  };

  return (
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

            <LogoutButton
              onClick={handleLogout}
            >
              로그아웃
            </LogoutButton>
          </UserSection>
        ) : (
          <ButtonGroup>
            <LoginButton
              onClick={() =>
                navigate("/login")
              }
            >
              로그인
            </LoginButton>

            <RegisterButton
              onClick={() =>
                navigate("/register")
              }
            >
              회원가입
            </RegisterButton>
          </ButtonGroup>
        )}
      </Menu>
    </Container>
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


