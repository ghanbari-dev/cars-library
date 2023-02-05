export interface CategoryType {
  id: string;
  title: string;
  selectedAttributeId: string;
  attributes: AttributesType[];
}

export interface createAttributesType {
  categoryId: string;
  attributeId: string;
  type: "text" | "number" | "date" | "checkbox";
}

export interface removeAttributeType {
  categoryId: string;
  attributeId: string;
}

export interface AttributesType {
  id: string;
  text: string;
  type: "text" | "number" | "date" | "checkbox";
}

export interface MachineType {
  id: string;
  categoryId: string;
  data: MachineDataType[];
}

export interface MachineDataType {
  id: string;
  value: string;
}
