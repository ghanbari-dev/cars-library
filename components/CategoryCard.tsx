import { AddTwoTone } from "@mui/icons-material";
import { Button, Divider, Switch, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMachine, selectMachines } from "../redux/machinesSlice";
import { CategoryType } from "../types/dataTypes";
import MachineCard from "./MachineCard";

type Props = { category: CategoryType };

const CategoryCard = ({ category }: Props) => {
  const machines = useSelector(selectMachines(category.id));
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-3xl font-extrabold">{category.title}</div>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => dispatch(createMachine(category))}
          startIcon={<AddTwoTone />}
        >
          Add New Item
        </Button>
      </div>
      <Divider className="mt-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-5 p-5">
        {machines.map((machine) => (
          <MachineCard key={machine.id} category={category} machine={machine} />
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
