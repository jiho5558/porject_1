import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from "./no1_pages/HomePage";
import TodoPage from "./no1_pages/TodoPage";
import EmployeePage from "./no1_pages/EmployeePage";
import ProductPage from "./no1_pages/sales/ProductPage";
import SalesPage from "./no1_pages/sales/SalesPage";

import HeaderBar from "./no2_components/layout/HeaderBar";
import SiderBar from "./no2_components/layout/SiderBar";

import EmployeeProvider from "./no0_context/EmployeeContext";
import UserProvider from "./no0_context/UserContext";
import TodoProvider from "./no0_context/TodoContext";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <TodoProvider>
            <Container>
              <HeaderBar />

              <BodyLayout>
                <SiderBar />

                <PageContainer>
                  <Routes>
  <Route path="/" element={<HomePage />} />

  <Route path="/todo" element={<TodoPage />} />

  <Route
    path="/employee"
    element={
      <EmployeeProvider>
        <EmployeePage />
      </EmployeeProvider>
    }
  />

  <Route
    path="/product"
    element={<ProductPage />}
  />

  <Route
    path="/sales"
    element={<SalesPage />}
  />
</Routes>
                </PageContainer>
              </BodyLayout>
            </Container>
          </TodoProvider>
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f1f5f9;
`;

const BodyLayout = styled.div`
  display: flex;
`;

const PageContainer = styled.main`
  flex: 1;
  padding: 32px;
  background: #f8fafc;
  min-height: calc(100vh - 70px);

  @media (max-width: 768px) {
    padding: 90px 20px 20px;
  }
`;