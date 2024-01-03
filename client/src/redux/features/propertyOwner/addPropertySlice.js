import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  propertyList: [
    {
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
      images: [],
    },
  ],
};
const propertyListSlice = createSlice({
  name: "propertyList",
  initialState,
  reducers: {
    addNewProperty: (state) => {
      return {
        ...state,
        propertyList: [
          ...state.propertyList,
          {
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
            images: [],
          },
        ],
      };
    },
    removeProperty: (state, action) => {
      const propertyIdToRemove = action.payload;
      return {
        ...state,
        propertyList: state.propertyList.filter(
          (property) => property.id !== propertyIdToRemove,
        ),
      };
    },
    updateProperty: (state, action) => {
      const { propertyId, field, value } = action.payload;

      // Find the index of the property with the given propertyId
      const propertyIndex = state.propertyList.findIndex(
        (property) => property.id === propertyId,
      );

      // If the property is found, update the specified field with the new value
      if (propertyIndex !== -1) {
        state.propertyList[propertyIndex] = {
          ...state.propertyList[propertyIndex],
          [field]: value,
        };
      }
    },
  },
});

export const { addNewProperty, updateProperty, removeProperty } =
  propertyListSlice.actions;

export default propertyListSlice.reducer;
