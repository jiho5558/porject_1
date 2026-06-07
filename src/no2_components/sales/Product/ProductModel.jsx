import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  usePostRegisterProduct,
  usePutUpdateProduct,
} from "../../../no3_store/hooks/sales/useProduct";

const initialProduct = {
  productName: "",
  color: "",
  costPrice: "",
  sellPrice: "",
  categoryCode: "",
};

const ProductModel = ({
  selectedProduct = null,
  setSelectedProduct = () => {},
}) => {
  const [product, setProduct] = useState(initialProduct);

  const registerMutation = usePostRegisterProduct();
  const updateMutation = usePutUpdateProduct();

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      setProduct(initialProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (product.id) {
        await updateMutation.mutateAsync(product);
        alert("수정 완료");
      } else {
        await registerMutation.mutateAsync(product);
        alert("등록 완료");
      }

      setProduct(initialProduct);
      setSelectedProduct(null);
    } catch (error) {
      console.error(error);
      alert("오류 발생");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="productName"
        placeholder="상품명"
        value={product.productName}
        onChange={handleChange}
      />

      <Input
        name="color"
        placeholder="색상"
        value={product.color}
        onChange={handleChange}
      />

      <Input
        name="costPrice"
        placeholder="원가"
        value={product.costPrice}
        onChange={handleChange}
      />

      <Input
        name="sellPrice"
        placeholder="판매가"
        value={product.sellPrice}
        onChange={handleChange}
      />

      <Input
        name="categoryCode"
        placeholder="카테고리 코드"
        value={product.categoryCode}
        onChange={handleChange}
      />

      <Button type="submit">
        {product.id ? "수정" : "상품 등록"}
      </Button>
    </Form>
  );
};

export default ProductModel;

const Form = styled.form`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 10px;
`;

const Button = styled.button`
  border: none;
  background: #3b82f6;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
`;