import React from "react";

export type AddType = {
  showAdd: boolean;
  setShowAdd: Function;
  id: number;
  setId: Function;
};

export type EditType = {
  showEdit: boolean;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setEditId: React.Dispatch<React.SetStateAction<string>>;
};
