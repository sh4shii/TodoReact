import React from "react";
import * as S from "./styles";
import { DeleteType } from "../../Contexts/deleteType";
import { DeleteContext } from "../../Contexts/deleteContext";
import { useContext } from "react";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType } from "../../Contexts/taskType";
import axios from "axios";

const DeleteModal = ({ cb }: any) => {
  const { setShowDelete, id, setId } = useContext(DeleteContext) as DeleteType;
  const { deleteTask } = useContext(TaskListContext) as TaskListType;
  const token = localStorage.getItem("token");

  function handleCancel() {
    setShowDelete(false);
  }

  const handleConfirm = async () => {
    const response = await axios.delete(
      `https://todo-backend-50fin.vercel.app/api/todo/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers if needed
        },
      }
    );

    if (response.status === 204) {
      cb();
      setShowDelete(false);
    }
  };

  return (
    <S.Background>
      <S.Container>
        <S.Text>Are you sure you want to delete this task?</S.Text>
        <S.Buttons>
          <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
          <S.DeletButton onClick={handleConfirm}>Delete</S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default DeleteModal;
