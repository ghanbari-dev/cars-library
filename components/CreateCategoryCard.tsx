import { DeleteOutlineTwoTone } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  IconButton,
  Paper,
  Popover,
  Radio,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createAttribute,
  deleteCategory,
  removeAttribute,
  updateCategory,
} from "../redux/categoriesSlice";
import {
  addCategoryMachinesAttribute,
  deleteCategoryMachines,
  removeCategoryMachinesAttribute,
} from "../redux/machinesSlice";
import { CategoryType } from "../types/dataTypes";

type Props = { category: CategoryType };

const CreateCategoryCard = ({ category }: Props) => {
  const dispatch = useDispatch();

  /* useEffect(() => {
    // setCategoryState(category);
  }, []); */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateCategory({ ...category, selectedAttributeId: event.target.value })
    );
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addAttributehandler = (
    type: "text" | "number" | "date" | "checkbox"
  ) => {
    const aId = "a_" + new Date().toJSON();
    dispatch(
      createAttribute({
        categoryId: category.id,
        type: type,
        attributeId: aId,
      })
    );
    dispatch(
      addCategoryMachinesAttribute({
        categoryId: category.id,
        attributeId: aId,
      })
    );
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Paper className="p-4 bg-white rounded">
      <div className="text-2xl font-extrabold flex justify-between">
        <div>{category.title}</div>
        <div className="flex items-center">
          <div className="text-sm text-red-600">Delete Category</div>
          <IconButton
            color="error"
            onClick={() => {
              dispatch(deleteCategory(category.id));
              dispatch(deleteCategoryMachines(category.id));
            }}
          >
            <DeleteOutlineTwoTone />
          </IconButton>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <TextField
          fullWidth
          variant="outlined"
          label="Category Name"
          value={category.title}
          onChange={(e) => {
            dispatch(updateCategory({ ...category, title: e.target.value }));
          }}
        />
        {category.attributes.map((attr, index) => (
          <div className="flex gap-2 items-center" key={attr.id}>
            <TextField
              fullWidth
              variant="outlined"
              label="Field"
              value={attr.text}
              onChange={(e) => {
                const tempAttributes = [...category.attributes];
                tempAttributes[index] = {
                  ...tempAttributes[index],
                  text: e.target.value,
                };
                dispatch(
                  updateCategory({ ...category, attributes: tempAttributes })
                );
              }}
            />
            <div className="pr-3 text-cyan-700">{attr.type}</div>
            <IconButton
              color="warning"
              onClick={() => {
                dispatch(
                  removeAttribute({
                    categoryId: category.id,
                    attributeId: attr.id,
                  })
                );
                dispatch(
                  removeCategoryMachinesAttribute({
                    categoryId: category.id,
                    attributeId: attr.id,
                  })
                );
              }}
            >
              <DeleteOutlineTwoTone />
            </IconButton>
            <Radio
              name="title"
              value={attr.id}
              checked={category.selectedAttributeId === attr.id}
              onChange={handleChange}
            />
          </div>
        ))}
        <Button color="secondary" variant="contained" onClick={handleClick}>
          Add New Field
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <ButtonGroup orientation="vertical">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
               addAttributehandler("text");
              }}
            >
              TEXT
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                addAttributehandler("number");
              }}
            >
              NUMBER
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                addAttributehandler("date");
              }}
            >
              DATE
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                addAttributehandler("checkbox");
              }}
            >
              CHECKBOX
            </Button>
          </ButtonGroup>
        </Popover>
      </div>
    </Paper>
  );
};

export default CreateCategoryCard;
