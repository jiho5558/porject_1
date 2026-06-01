// TodoList.jsx

import React from 'react'
import TodoListChild from './TodoListChild'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
// import { TodoContext } from '../../no0_context/TodoContext'

const TodoList = () => {
  const {todoList} = useSelector(state=>state.todo);
  const todoSlice = useSelector(state => state.todo);
  const todoObj = todoSlice.todoObj;
  const {id, subject, checked} = todoObj;
  
  
  
  return (
    <Container>
      {
        todoList?.map(item => (
          <TodoListChild
            key={item.id}
            item={item}
          />
        ))
      }
    </Container>
  )
}

export default TodoList

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 14px;
`