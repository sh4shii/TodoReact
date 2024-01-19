import React, { useContext, useEffect, useState } from "react";
import * as S from "./styles";
import Logo from "../../toDo.png"
import TaskFill from "../../Img/taskFill.png";
import Settings from "../../Img/settings.svg";
import Folder from "../../Img/folder.svg";
import Logout from "../../Img/logout.svg";
import SidebarItem from "../../Components/SidebarItem";
import ExpandSidebarItem from "../../Components/ExpandSidebarItem";
import TaskCard from "../../Components/TaskCard";
import AddTask from "../../Components/AddTask";
import { TaskListContext } from "../../Contexts/taskListContext";
import { TaskListType } from "../../Contexts/taskType";
import FilterTag from "../../Components/FilterTag";
import Filter from "../../Img/filter.svg";
import { DeleteContext } from "../../Contexts/deleteContext";
import { DeleteType } from "../../Contexts/deleteType";
import DeleteModal from "../../Components/DeleteModal";
import AddModal from "../../Components/AddModal";
import { AddContext, EditContext } from "../../Contexts/addContext";
import { AddType, EditType } from "../../Contexts/addType";
import { Link, useNavigate } from "react-router-dom";
import AuthContext, {
  AuthType,
  UserDataProps,
} from "../../Contexts/authContext";
import axios from "axios";
import dayjs from "dayjs";
import EditModal from "../../Components/EditModal";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";

export type Todo = {
  _id: string;
  createdAt: string;
  description: string;
  title: string;
  updatedAt: string;
  user_id: string;
};

const Home: React.FC = () => {
  const { taskList, doneTasks, notDoneTasks } = useContext(
    TaskListContext
  ) as TaskListType;
  const { showDelete } = useContext(DeleteContext) as DeleteType;
  const { showAdd } = useContext(AddContext) as AddType;
  const { showEdit } = useContext(EditContext) as EditType;
  const navigate = useNavigate();

  const { setUserData } = useContext(AuthContext) as AuthType;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const itemsPerPage = 4;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [sortCriteria, setSortCriteria] = useState("title");

  const getAllTodos = async () => {
    const response = await axios.get(
      "https://todo-backend-50fin.vercel.app/api/todo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (response.data) setTodos(response.data.todos);
  };

  const handleSortCriteriaChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSortCriteria(event.target.value);
  };

  const sortedTodos = [...todos];

  const compareFunction = (
    a: { [x: string]: any },
    b: { [x: string]: any }
  ) => {
    const valueA = a[sortCriteria];
    const valueB = b[sortCriteria];

    if (sortCriteria === "title") {
      const titleA = valueA.toLowerCase();
      const titleB = valueB.toLowerCase();
      return titleA.localeCompare(titleB);
    } else {
      const dateA = new Date(valueA).getTime();
      const dateB = new Date(valueB).getTime();
      return dateA - dateB;
    }
  };

  sortedTodos.sort(compareFunction);

  useEffect(() => {
    if(token===null)navigate('/login')
    else getAllTodos();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setUserData({ email: "" });
  }
  return (
    <S.Page>
      <S.Sidebar>
        <S.Img src={Logo} />

        <Link
          to="/login"
          style={{ textDecoration: "none" }}
          onClick={handleLogout}
        >
          <SidebarItem
            icon={Logout}
            name="Logout"
            isActive={false}
          ></SidebarItem>
        </Link>
      </S.Sidebar>
      <S.Main>
        <div style={{
          display:"flex",
          justifyContent:"space-between",
          width: "70vw",
          marginTop:"2rem",
          padding:"0 2rem",
          alignItems:"center"

        }}>
        <S.Header>All your todos</S.Header>
        <div style={{
          display:"flex",
          gap:"1rem",
          alignItems:"center"
        }}>
        <FormControl>
          <InputLabel htmlFor="sortCriteria">Sort By:</InputLabel>
          <Select
            id="sortCriteria"
            value={sortCriteria}
            onChange={handleSortCriteriaChange}
            label="Sort By"
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="createdAt">Created Date</MenuItem>
            <MenuItem value="updatedAt">Updated Date</MenuItem>
          </Select>
        </FormControl>



        <input
          type="text"
          value={search}
          placeholder="Search..."

          onChange={(e) => setSearch(e.target.value)}
          style={{
            height:"2rem",
padding:"0 0.25rem",
borderRadius:"1rem"
          }}
        />
        </div>
         </div>

        <S.TitleAndFilter>

        </S.TitleAndFilter>

        {sortedTodos !== undefined &&
          sortedTodos
            .filter(
              (item) =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase())
            )
            .slice(startIndex, endIndex)
            .map((task, key) => (
              <TaskCard
                id={task._id}
                key={key}
                name={task.title}
                list={task.description}
                color={"yellow"}
                done={false}
                createdAt={dayjs(task.createdAt).format("DD/MM/YYYY")}
                updatedAt={dayjs(task.updatedAt).format("DD/MM/YYYY")}
                cb={getAllTodos}
              />
            ))}

        <AddTask></AddTask>
        <Pagination
          page={page}
          onChange={(e, value) => setPage(value)}
          count={Math.ceil(todos.length / 5)}
        />
      </S.Main>
      {showDelete && <DeleteModal cb={getAllTodos} />}
      {showAdd && <AddModal cb={getAllTodos} />}
      {showEdit && <EditModal cb={getAllTodos} />}
    </S.Page>
  );
};

export default Home;
