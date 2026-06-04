import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';



import TodoTemplate from '../no2_components/todo/TodoTemplate';
import TodoInsert from '../no2_components/todo/TodoInsert';
import TodoList from '../no2_components/todo/TodoList';
import axios from 'axios';
export const todoAllgetApi = async () => {
  try {
    return await axios.get('http://localhost:3001/todos');
  } catch (error) {
    console.error('Error fetching todo list:', error);
    throw error;
  }
};
const TodoPage = () => {
  const { todoList } = useSelector((state) => state.todo);
  const { todoObj } = useSelector((state) => state.todo);
  const { id, subject, checked } = todoObj;

  useEffect(() => {
}, []);
  
return (
    <TodoTemplate>
      <TodoInsert />


        {todoList?.map((item) => (
  <div key={item.id}>
    <div>{item.id}</div>
    <div>{item.subject}</div>
    <div>{item.checked ? "완료" : "미완료"}</div>
  </div>
))}
  

      <TodoList todoList={todoList} />
    </TodoTemplate>
  );
};

export default TodoPage;