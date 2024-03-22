import { createSlice } from "@reduxjs/toolkit";

const initialProperty = {
  id: Date.now(),
  numOfBed: 0,
  numOfBath: 0,
  monthlyRent: 1,
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
        monthlyRent: 1,
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

      state.propertyList = state.propertyList.filter((property) => property.id !== propertyIdToRemove);
    },
    updateProperty: (state, action) => {
      const { propertyId, field, value } = action.payload;

      const propertyIndex = state.propertyList.findIndex((property) => property.id === propertyId);

      if (propertyIndex !== -1) {
        if (field === "files") {
          // If the field is "files", update the files array directly
          const existingFiles = state.propertyList[propertyIndex][field];

          // Modify the file names by adding propertyId
          const modifiedFiles = value?.map((file) => {
            const modifiedFile = new File([file], `${propertyId}_${file.name}`, {
              type: file.type,
              lastModified: file.lastModified,
            });

            return modifiedFile;
          });

          state.propertyList[propertyIndex][field] = [...existingFiles, ...modifiedFiles];
        } else {
          // Otherwise, update the specified field with the new value
          state.propertyList[propertyIndex] = {
            ...state.propertyList[propertyIndex],
            [field]: value,
          };
        }
      }
    },
    // ! Reset all state
    resetPropertyList: (state, action) => {
      // Reset propertyList to contain only the initialProperty
      state.propertyList = [initialProperty];
    },
  },
});

export const { addNewProperty, updateProperty, removeProperty, resetPropertyList } = propertyListSlice.actions;

export default propertyListSlice.reducer;
