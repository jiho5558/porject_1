// EmployeePage.jsx

import React, { useState } from 'react';
import styled from 'styled-components';

import EmployeeList from '../no2_components/employee/EmployeeList';
import EmployeeTable from '../no2_components/employee/EmployeeTable';
import EmployeeRegister from '../no2_components/employee/EmployeeRegister';
import EmployeeUpdate from '../no2_components/employee/EmployeeUpdate';

import {
  useDeleteEmployee,
} from '../no3_store/hooks/useEmployee';

const EmployeePage = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState('');

  const deleteMutation = useDeleteEmployee();

  const handleDelete = async () => {
    if (!selectedId) {
      alert('삭제할 데이터를 선택하세요');
      return;
    }

    try {
      await deleteMutation.mutateAsync(selectedId);
      alert('삭제되었습니다.');
      setSelectedId(null);
    } catch (error) {
      alert('직원 삭제 실패');
    }
  };

  return (
    <Container>
      <Title>Employee Management</Title>

      <Content>
        <LeftSection>
          <Card>
            <SectionTitle>직원 목록</SectionTitle>

            <EmployeeList
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </Card>
        </LeftSection>

        <RightSection>
          <Card>
            <SectionTitle>직원 정보</SectionTitle>
            <EmployeeTable />
          </Card>

          <Card>
            <ButtonGroup>
              <ActionButton
                onClick={() => setMode('register')}
              >
                등록
              </ActionButton>

              <ActionButton
                onClick={() => setMode('update')}
              >
                수정
              </ActionButton>

              <DeleteButton
                onClick={() => setMode('delete')}
              >
                삭제
              </DeleteButton>
            </ButtonGroup>

            {mode === 'register' ? (
              <EmployeeRegister />
            ) : mode === 'update' ? (
              <EmployeeUpdate selectedId={selectedId} />
            ) : mode === 'delete' ? (
              <DeleteBox>
                <p>위 데이터를 삭제하시겠습니까?</p>

                <DeleteConfirmButton
                  onClick={handleDelete}
                >
                  삭제 확인
                </DeleteConfirmButton>
              </DeleteBox>
            ) : null}
          </Card>
        </RightSection>
      </Content>
    </Container>
  );
};

export default EmployeePage;

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #1e293b;
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
`;

const LeftSection = styled.div`
  width: 250px;
`;

const RightSection = styled.div`
  flex: 1;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin-bottom: 15px;
  color: #334155;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  border: none;
  background: #3b82f6;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const DeleteButton = styled.button`
  border: none;
  background: #ef4444;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const DeleteBox = styled.div`
  padding: 20px 0;
`;

const DeleteConfirmButton = styled.button`
  border: none;
  background: #dc2626;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;