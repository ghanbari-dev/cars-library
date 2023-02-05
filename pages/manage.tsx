import React from "react";
import { Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, selectCategories } from "../redux/categoriesSlice";
import Header from "../components/Header";
import CreateCategoryCard from "../components/CreateCategoryCard";
import { AddTwoTone } from "@mui/icons-material";

type Props = {};

const manage = (props: Props) => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-100 h-screen flex flex-col relative">
      <Header title="Manage Categories" />

      <div className="overflow-y-auto flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-5 p-5">
        {categories.map((category) => (
          <CreateCategoryCard key={category.id} category={category} />
        ))}
      </div>
      <Button
        className="absolute right-5 bottom-5"
        color="primary"
        variant="contained"
        onClick={() => dispatch(createCategory())}
        startIcon={<AddTwoTone />}
      >
        Add New Category
      </Button>
    </div>
  );
};

export default manage;
