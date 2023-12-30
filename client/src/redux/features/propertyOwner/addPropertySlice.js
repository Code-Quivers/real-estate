import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  propertyList: [
    {
      id: 1,
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
            id: state.propertyList.length + 1,
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
    updateProperty: (state, action) => {
      const { propertyId, field, value, photos } = action.payload;

      // Find the index of the property with the given propertyId
      const propertyIndex = state.propertyList.findIndex(
        (property) => property.id === propertyId,
      );

      // If the property is found, update the specified field with the new value
      if (propertyIndex !== -1) {
        state.propertyList[propertyIndex] = {
          ...state.propertyList[propertyIndex],
          [field]: value,
          photos: photos || [], // Set photos to the provided array or an empty array
        };
      }
    },
  },
});

export const { addNewProperty, updateProperty } = propertyListSlice.actions;

export default propertyListSlice.reducer;
