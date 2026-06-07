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
            <Td>{item.productName}</Td>
            <Td>{item.color}</Td>
            <Td>{item.costPrice}</Td>
            <Td>{item.sellPrice}</Td>
            <Td>{item.categoryCode}</Td>

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
`;

const Th = styled.th`
  background: #e2e8f0;
  padding: 12px;
  border-bottom: 1px solid #cbd5e1;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
`;

const UpdateButton = styled.button`
  border: none;
  background: #10b981;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 8px;
`;

const DeleteButton = styled.button`
  border: none;
  background: #ef4444;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
`;