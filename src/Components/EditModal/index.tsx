import React, { useContext, useState } from "react";
import * as S from "./styles";
import { AddContext, EditContext } from "../../Contexts/addContext";
import { AddType, EditType } from "../../Contexts/addType";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskProps, TaskListType } from "../../Contexts/taskType";
import { CategoriesContext } from "../../Contexts/categoriesContext";
import { CategorieContextType } from "../../Contexts/categoriesType";
import Select from "react-select/dist/declarations/src/Select";
import axios from "axios";

const EditModal = ({ cb }: any) => {
  const { setShowEdit, title, setTitle, desc, setDesc, id, setEditId } =
    useContext(EditContext) as EditType;

  const token = localStorage.getItem("token");

  const addTodo = async () => {

    if(title.trim().length===0 || desc.trim().length===0)return

    const response = await axios.put(
      `https://todo-backend-50fin.vercel.app/api/todo/update/${id}`,
      {
        title: title,
        description: desc,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      cb();
    }
    setShowEdit(false);
  };

  const handleCancel = () => {
    setShowEdit(false);
  };

  return (
    <S.Background>
      <S.Container>
        <S.Text>Insert title</S.Text>
        <S.TitleInput
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

          <S.Text>Insert description</S.Text>
          <S.TitleInput
            placeholder="Description"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <S.Buttons>
          <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
          <S.DeletButton onClick={addTodo}>Edit</S.DeletButton>
        </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default EditModal;
