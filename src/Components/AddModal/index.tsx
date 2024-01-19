import React, { useContext, useState } from "react";
import * as S from "./styles";
import { AddContext } from "../../Contexts/addContext";
import { AddType } from "../../Contexts/addType";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskProps, TaskListType } from "../../Contexts/taskType";
import { CategoriesContext } from "../../Contexts/categoriesContext";
import { CategorieContextType } from "../../Contexts/categoriesType";
import Select from "react-select/dist/declarations/src/Select";
import axios from "axios";

const AddModal = ({ cb }: any) => {
  const { addTask } = useContext(TaskListContext) as TaskListType;
  const { setShowAdd } = useContext(AddContext) as AddType;

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const token = localStorage.getItem("token");

  const addTodo = async () => {
    if(title.trim().length===0 || desc.trim().length===0)return

    const response = await axios.post(
      "https://todo-backend-50fin.vercel.app/api/todo/add",
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

    if (response.status === 201) {
      cb();
    }
    setShowAdd(false);
  };

  const handleCancel = () => {
    setShowAdd(false);
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
          <S.DeletButton onClick={addTodo}>Add</S.DeletButton>
          </S.Buttons>
      </S.Container>
    </S.Background>
  );
};

export default AddModal;
