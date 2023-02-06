import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  CategoryType,
  createAttributesType,
  removeAttributeType,
} from "../types/dataTypes";
import { RootState } from "./store";
import data from "../data.json";

const initialState: CategoryType[] = data.categories as CategoryType[];

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory: (state) => {
      const id = new Date().toJSON();
      state.push({
        id: "c_" + id,
        title: "New Category",
        selectedAttributeId: "a_" + id,
        attributes: [{ id: "a_" + id, text: "", type: "text" }],
      });
    },
    updateCategory: (state, action: PayloadAction<CategoryType>) => {
      let index = -1;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        console.log("category does not exist");
        return;
      }
      state[index] = action.payload;
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      // state = state.filter((category) => category.id !== action.payload);
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
      console.log("category does not exist");
    },

    createAttribute: (state, action: PayloadAction<createAttributesType>) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.categoryId) {
          state[i].attributes.push({
            id: action.payload.attributeId,
            text: "",
            type: action.payload.type,
          });
          if (state[i].selectedAttributeId === "") {
            state[i].selectedAttributeId = state[i].attributes[0].id;
          }
          return;
        }
      }

      console.log("category does not exist");
    },

    removeAttribute: (state, action: PayloadAction<removeAttributeType>) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.categoryId) {
          state[i].attributes = state[i].attributes.filter(
            (_attr) => _attr.id !== action.payload.attributeId
          );

          if (state[i].selectedAttributeId === action.payload.attributeId)
            state[i].selectedAttributeId =
              state[i].attributes.length > 0 ? state[i].attributes[0].id : "";

          return;
        }
      }
      console.log("category does not exist");
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createCategory,
  updateCategory,
  deleteCategory,
  createAttribute,
  removeAttribute,
} = categoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
