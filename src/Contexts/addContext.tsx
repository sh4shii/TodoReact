import React, { useState, createContext, ReactNode } from "react";
import { AddType, EditType } from "./addType";

export interface ChildrenProps {
  children: React.ReactNode;
}

export const AddContext = createContext<AddType | null>(null);

export const AddContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [id, setId] = useState(0);

  return (
    <AddContext.Provider value={{ showAdd, setShowAdd, id, setId }}>
      {children}
    </AddContext.Provider>
  );
};

export const EditContext = createContext<EditType | null>(null);

export const EditContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setEditId] = useState("");

  return (
    <EditContext.Provider
      value={{
        showEdit,
        setDesc,
        setShowEdit,
        setTitle,
        title,
        desc,
        id,
        setEditId,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};
