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
  files: [],
};

const initialState = {
  propertyList: [initialProperty],
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
        files: [],
      };

      state.propertyList.push(newProperty);
    },

    removeProperty: (state, action) => {
      const propertyIdToRemove = action.payload;

      state.propertyList = state.propertyList.filter(
        (property) => property.id !== propertyIdToRemove,
      );
    },

    updateProperty: (state, action) => {
      const { propertyId, field, value } = action.payload;

      const propertyIndex = state.propertyList.findIndex(
        (property) => property.id === propertyId,
      );

      if (propertyIndex !== -1) {
        if (field === "files") {
          // If the field is "files", update the files array directly
          const uniqueFileName = `${propertyId}-${value}`;
          state.propertyList[propertyIndex][field] = [
            ...state.propertyList[propertyIndex][field],
            uniqueFileName,
          ];
        } else {
          // Otherwise, update the specified field with the new value
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
