import React from "react";
import styled from "styled-components";

import {
  useAllGetProduct,
  useDeleteProduct,
} from "../../../no3_store/hooks/sales/useProduct";

const ProductTable = ({ setSelectedProduct }) => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useAllGetProduct();

  const deleteMutation = useDeleteProduct();

  const handleDelete = async (id) => {
    if (!window.confirm("삭제하시겠습니까?")) return;

    try {
      await deleteMutation.mutateAsync(id);
      alert("삭제 완료");
    } catch (error) {
      alert("삭제 실패");
    }
  };

  if (isLoading) return <h3>loading...</h3>;

  if (error) return <h3>데이터를 불러올 수 없습니다.</h3>;

  return (
    <Table>
      <thead>
        <tr>
          <Th>상품명</Th>
          <Th>색상</Th>
          <Th>원가</Th>
          <Th>판매가</Th>
          <Th>카테고리 코드</Th>
          <Th>상품 관리</Th>
        </tr>
      </thead>

      <tbody>
  {products.map((item) => (
    <tr key={item.id}>
      <Td>{item.product_name}</Td>
      <Td>{item.color}</Td>
      <Td>{item.cost_price}</Td>
      <Td>{item.sale_price}</Td>
      <Td>{item.category_code}</Td>

      <Td>
        <UpdateButton
          onClick={() => setSelectedProduct(item)}
        >
          수정
        </UpdateButton>

        <DeleteButton
          onClick={() => handleDelete(item.id)}
        >
          삭제
        </DeleteButton>
      </Td>
    </tr>
  ))}
</tbody>
    </Table>
  );
};

export default ProductTable;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
`;

const Th = styled.th`
  background: #f7f7f8;
  color: #565869;
  font-weight: 600;
  padding: 16px;
  text-align: center;
  border-bottom: 1px solid #ececf1;
`;

const Td = styled.td`
  padding: 16px;
  text-align: center;
  color: #202123;
  border-bottom: 1px solid #f1f1f3;
`;

const UpdateButton = styled.button`
  border: 1px solid #e5e7eb;
  background: #f8fafc;
  color: #374151;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  margin-right: 8px;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

const DeleteButton = styled.button`
  border: 1px solid #d1d5db;
  background: #e5e7eb;
  color: #374151;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #d1d5db;
    border-color: #9ca3af;
  }
`;
