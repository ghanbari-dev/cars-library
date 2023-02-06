import { DeleteOutlineTwoTone } from "@mui/icons-material";
import { IconButton, Paper, Switch, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { deleteMachine, updateMachine } from "../redux/machinesSlice";
import {
  AttributesType,
  CategoryType,
  MachineDataType,
  MachineType,
} from "../types/dataTypes";

type Props = { category: CategoryType; machine: MachineType };

const MachineCard = ({ machine, category }: Props) => {
  const dispatch = useDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    attr: AttributesType,
    isCheckbox = false
  ) => {
    const tempData: MachineDataType[] = [];
    for (let i = 0; i < machine.data.length; i++) {
      machine.data[i].id !== attr.id
        ? tempData.push(machine.data[i])
        : tempData.push({
            ...machine.data[i],
            value: isCheckbox ? (e.target.checked ? "1" : "") : e.target.value,
          });
    }
    dispatch(updateMachine({ ...machine, data: tempData }));
  };

  const selectedAttribute = machine.data.filter(
    (data) => data.id === category.selectedAttributeId
  );

  return (
    <Paper className="p-4 bg-white rounded">
      <div className="flex justify-between items-center">
        <div>
          {selectedAttribute.length > 0 &&
            (selectedAttribute[0].value || "Unnamed Field")}
        </div>
        <div className="flex items-center">
          <div className="text-sm text-red-600">Remove</div>
          <IconButton
            color="error"
            onClick={() => dispatch(deleteMachine(machine.id))}
          >
            <DeleteOutlineTwoTone />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {category.attributes.map((attr, index) =>
          attr.type === "text" ||
          attr.type === "number" ||
          attr.type === "date" ? (
            <TextField
              key={attr.id}
              label={attr.text}
              type={
                attr.type === "number"
                  ? "number"
                  : attr.type === "text"
                  ? "text"
                  : "date"
              }
              value={machine.data[index].value}
              onChange={(e) => {
                handleChange(e as ChangeEvent<HTMLInputElement>, attr);
              }}
            />
          ) : (
            <div key={attr.id} className="flex gap-4 items-center">
              <Switch
                checked={!!machine.data[index].value}
                onChange={(e) => {
                  handleChange(e, attr, true);
                }}
              />
              <div>{attr.text}</div>
            </div>
          )
        )}
      </div>
    </Paper>
  );
};

export default MachineCard;
