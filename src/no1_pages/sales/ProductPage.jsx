import React, { useState } from "react";
import styled from "styled-components";

import ProductTable from "../../no2_components/sales/Product/ProductTable";
import ProductModel from "../../no2_components/sales/Product/ProductModel";

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] =
    useState(null);

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
`;

const Card = styled.div`
  background:white;
  padding:20px;
  border-radius:12px;
  box-shadow:0 2px 10px rgba(0,0,0,.1);
`;