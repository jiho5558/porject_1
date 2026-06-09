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
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
`;

const Input = styled.input`
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  color: #202123;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #c7c7d1;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.04);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Button = styled.button`
  border: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.9);
  color: #202123;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: #f7f7f8;
    border-color: #d1d5db;
  }

  &:active {
    transform: scale(0.98);
  }
`;