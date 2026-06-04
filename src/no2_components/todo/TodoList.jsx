// TodoList.jsx

import React from 'react';
import styled from 'styled-components';

import TodoListChild from './TodoListChild';

import {
  useAllGetTodo,
} from '../../no3_store/hooks/useTodo';

const TodoList = () => {
  const {
    data,
    isLoading,
    error,
  } = useAllGetTodo();

  if (isLoading) {
    return <h3>loading...</h3>;
  }

  if (error) {
    return <h3>{error.message}</h3>;
  }

  const todoList = Array.isArray(data)
    ? data
    : [];

  return (
    <Container>
      {todoList.length === 0 ? (
        <h3>등록된 Todo가 없습니다.</h3>
      ) : (
        todoList.map((item) => (
          <TodoListChild
            key={item.id}
            item={item}
          />
        ))
      )}
    </Container>
  );
};

export default TodoList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;