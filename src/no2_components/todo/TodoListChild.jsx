// TodoListChild.jsx

import React, { useState } from "react";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import {
  toggle,
  update,
  remove,
} from "../../no3_store/slices/todoSlice";

import {
  usePutToggleTodo,
} from "../../no3_store/hooks/useTodo";

const TodoListChild = ({ item }) => {
  const dispatch = useDispatch();

  const toggleMutation = usePutToggleTodo();

  const [editing, setEditing] = useState(false);

  const [todo, setTodo] = useState({
    id: item.id,
    subject: item.subject,
    checked: item.checked,
  });

  const handleToggle = async () => {
    try {
      await toggleMutation.mutateAsync({
        ...todo,
        checked: !todo.checked,
      });

      dispatch(toggle(item.id));
    } catch (error) {
      console.error(error);
      alert("토글 실패");
    }
  };

  const handleUpdate = () => {
    dispatch(
      update({
        id: item.id,
        subject: todo.subject,
      })
    );

    setEditing(false);
  };

  return (
    <Container>
      <CheckBoxArea onClick={handleToggle}>
        {todo.checked ? (
          <MdCheckBox />
        ) : (
          <MdCheckBoxOutlineBlank />
        )}
      </CheckBoxArea>

      <ContentArea>
        {editing ? (
          <EditInput
            type="text"
            name="subject"
            value={todo.subject}
            onChange={(e) =>
              setTodo((prev) => ({
                ...prev,
                subject: e.target.value,
              }))
            }
            onBlur={handleUpdate}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdate();
              }
            }}
            autoFocus
          />
        ) : (
          <Checked
            $checked={todo.checked}
            onDoubleClick={() => setEditing(true)}
          >
            {todo.subject}
          </Checked>
        )}
      </ContentArea>

      <DeleteButton
        onClick={() => dispatch(remove(item.id))}
      >
        <MdRemoveCircleOutline />
      </DeleteButton>
    </Container>
  );
};

export default TodoListChild;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const CheckBoxArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #3b82f6;
  cursor: pointer;
`;

const ContentArea = styled.div`
  flex: 1;
`;

const Checked = styled.div`
  font-size: 18px;
  color: ${({ $checked }) =>
    $checked ? "#999" : "#222"};
  text-decoration: ${({ $checked }) =>
    $checked ? "line-through" : "none"};
  cursor: pointer;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
`;

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #ef4444;
  cursor: pointer;
`;