import React, { useState } from "react";
import styled from "styled-components";

import ProductTable from "../../no2_components/sales/Product/ProductTable";
import ProductModel from "../../no2_components/sales/Product/ProductModel";
import { PiChatCentered } from "react-icons/pi";
import { getCurrentUser } from "../../no3_store/hooks/useUser";
import AuthControl from "../../no2_components/layout/AuthControl";
const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] =
    useState(null);
const user = getCurrentUser();
if(!user){
  return(
    <AuthControl
    message="로그인 후 상품 정보를 조회 및 관리할 수 있습니다."
    />
  )
}
  return (
    <Container>
      <TopArea>
        <Title>상품 관리</Title>

        <ProductModel
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </TopArea>

      <Card>
        <ProductTable
          setSelectedProduct={setSelectedProduct}
        />
      </Card>
    </Container>
  );
};

export default ProductPage;

const Container = styled.div`
  padding: 20px;
 
`;

const TopArea = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:20px;
 
`;

const Title = styled.h1`
  color:#1e293b;
  text-align: center;
`;

const Card = styled.div`
  background:white;
  padding:20px;
  border-radius:12px;
  box-shadow:0 2px 10px rgba(0,0,0,.1);
  text-align: center;
`;
