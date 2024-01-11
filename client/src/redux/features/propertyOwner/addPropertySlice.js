import { createSlice } from "@reduxjs/toolkit";

const initialProperty = {
  id: Date.now(),
  numOfBed: 0,
  numOfBath: 0,
  address: "",
  description: "",
  maintenanceCoveredTenant: "",
  maintenanceCoveredOwner: "",
  schools: "",
  universities: "",
  allowedPets: "",
};

const initialState = {
  propertyList: [initialProperty],
  files: {
    [`images-${initialProperty.id}`]: [],
  },
};

const propertyListSlice = createSlice({
  name: "propertyList",
  initialState,
  reducers: {
    addNewProperty: (state) => {
      const newProperty = {
        id: Date.now(),
        numOfBed: 0,
        numOfBath: 0,
        address: "",
        description: "",
        maintenanceCoveredTenant: "",
        maintenanceCoveredOwner: "",
        schools: "",
        universities: "",
        allowedPets: "",
      };

      // Use Immer to update the state
      state.propertyList.push(newProperty);
      state.files[`images-${newProperty.id}`] = [];

      // No need to return a new state object; Immer handles it
    },

    removeProperty: (state, action) => {
      const propertyIdToRemove = action.payload;

      // Remove the property from propertyList
      state.propertyList = state.propertyList.filter(
        (property) => property.id !== propertyIdToRemove,
      );

      // Remove the corresponding entry in the files object
      delete state.files[`images-${propertyIdToRemove}`];

      // No need to return a new state object; Immer handles it
    },

    updateProperty: (state, action) => {
      const { propertyId, field, value } = action.payload;

      // Find the index of the property with the given propertyId
      const propertyIndex = state.propertyList.findIndex(
        (property) => property.id === propertyId,
      );

      // If the property is found, update the specified field with the new value
      if (propertyIndex !== -1) {
        if (field === "images") {
          state.files[`images-${propertyId}`] = value;
        } else {
          state.propertyList[propertyIndex] = {
            ...state.propertyList[propertyIndex],
            [field]: value,
          };
        }
      }
    },
  },
});

export const { addNewProperty, updateProperty, removeProperty } =
  propertyListSlice.actions;

export default propertyListSlice.reducer;
