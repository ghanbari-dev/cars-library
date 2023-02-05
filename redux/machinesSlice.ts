import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  CategoryType,
  createAttributesType,
  MachineDataType,
  MachineType,
  removeAttributeType,
} from "../types/dataTypes";
import { RootState } from "./store";

const initialState: MachineType[] = [];

export const machinesSlice = createSlice({
  name: "machines",
  initialState,
  reducers: {
    createMachine: (state, action: PayloadAction<CategoryType>) => {
      const temp: MachineDataType[] = [];
      action.payload.attributes.map((attr) =>
        temp.push({ id: attr.id, value: "" })
      );
      state.push({
        id: new Date().toJSON(),
        categoryId: action.payload.id,
        data: temp,
      });
    },
    deleteMachine: (state, action: PayloadAction<string>) => {
      let index = -1;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload) {
          index = i;
        }
      }
      if (index !== -1) {
        state.splice(index, 1);
        return;
      }
      console.log("machine does not exist");
    },
    updateMachine: (state, action: PayloadAction<MachineType>) => {
      let index = -1;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        console.log("machine does not exist");
        return;
      }
      state[index] = action.payload;
    },
    deleteCategoryMachines: (state, action: PayloadAction<string>) => {
      for (let i = state.length - 1; i >= 0; i--) {
        if (state[i].categoryId === action.payload) {
          state.splice(i, 1);
        }
      }
    },
    removeCategoryMachinesAttribute: (
      state,
      action: PayloadAction<removeAttributeType>
    ) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].categoryId === action.payload.categoryId) {
          state[i].data = state[i].data.filter(
            (_attr) => _attr.id !== action.payload.attributeId
          );
        }
      }
    },
    addCategoryMachinesAttribute: (
      state,
      action: PayloadAction<Omit<createAttributesType, "type">>
    ) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].categoryId === action.payload.categoryId) {
          state[i].data.push({
            id: action.payload.attributeId,
            value: "",
          });
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createMachine,
  deleteMachine,
  updateMachine,
  deleteCategoryMachines,
  removeCategoryMachinesAttribute,
  addCategoryMachinesAttribute,
} = machinesSlice.actions;

export const selectMachines =
  (action: string) =>
  (state: RootState): MachineType[] =>
    state.machines.filter((machine) => machine.categoryId === action);

export default machinesSlice.reducer;
