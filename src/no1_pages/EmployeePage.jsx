// EmployeePage.jsx

import React, { useState } from 'react';
import styled from 'styled-components';

import EmployeeList from '../no2_components/employee/EmployeeList';
import EmployeeTable from '../no2_components/employee/EmployeeTable';
import EmployeeRegister from '../no2_components/employee/EmployeeRegister';
import EmployeeUpdate from '../no2_components/employee/EmployeeUpdate';

import {
  useAllGetEmployee,
  useDeleteEmployee,
} from '../no3_store/hooks/useEmployee';

const EmployeePage = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState('');

  const deleteMutation = useDeleteEmployee();

  const handleDelete = () => {
    if (!selectedId) {
      alert('삭제할 데이터를 선택하세요');
      return;
    }

    deleteMutation.mutate(selectedId);
    alert('삭제되었습니다.');
  };

  return (
    <Container>
      <Title>Employee Management</Title>

      <Content>
        <LeftSection>
          <Card>
            <SectionTitle>직원 목록</SectionTitle>
            <EmployeeList />
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
              <EmployeeUpdate />
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
