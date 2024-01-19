import React, { useState, useContext } from "react";
import * as S from "./styles";
import Edit from "../../Img/edit.svg";
import Erase from "../../Img/erase.svg";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType } from "../../Contexts/taskType";
import { DeleteContext } from "../../Contexts/deleteContext";
import { DeleteType } from "../../Contexts/deleteType";
import { EditContext } from "../../Contexts/addContext";
import { EditType } from "../../Contexts/addType";

interface TaskCardProps {
  id: string;
  name: string;
  list: string;
  color: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
  cb: () => Promise<void>;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  name,
  list,
  color,
  done,
  createdAt,
  updatedAt,
  cb,
}) => {
  const { setShowDelete, setId } = useContext(DeleteContext) as DeleteType;
  const { setShowEdit, setTitle, setDesc, setEditId } = useContext(
    EditContext
  ) as EditType;
  const { checkTask } = useContext(TaskListContext) as TaskListType;

  function handleCheck() {
    // checkTask(id);
  }

  const deleteTodo = () => {
    setId(id);

    setShowDelete(true);
  };

  const handleEdit = () => {
    setEditId(id);
    setDesc(list);
    setTitle(name);

    setShowEdit(true);
  };

  return (
    <S.Container>

      <S.Description>
        <S.Name done={done}>{name}</S.Name>
        <S.ListBelong>
          <S.ColorTag color={color} />
          <S.ListName>{list}</S.ListName>
          <S.ListName>{createdAt}</S.ListName>
          <S.ListName>{updatedAt}</S.ListName>
        </S.ListBelong>
      </S.Description>

<div>
      <S.Icon src={Edit} onClick={handleEdit} />
      <S.Icon src={Erase} onClick={deleteTodo} />
      </div>
    </S.Container>
  );
};

export default TaskCard;
