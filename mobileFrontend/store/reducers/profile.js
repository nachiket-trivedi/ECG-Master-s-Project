import {
  EDIT_PERSONAL_PROFILE,
  VIEW_PERSONAL_PROFILE,
  VIEW_MEDICAL_PROFILE,
  EDIT_MEDICAL_PROFILE
} from "../actions/profile";

const initialState = {
  personalDetails: {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipcode: "",
    country: ""
  },
  medicalDetails: {
    gender: "",
    dob: new Date(),
    height: "",
    weight_unit: "",
    height_unit: "",
    weight: "",
    blood_type: "",
    BMI: "",
    history: ""
  }
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_PERSONAL_PROFILE:
      return {
        ...state,
        personalDetails: action.payload
      };
    case VIEW_MEDICAL_PROFILE:
      return {
        ...state,
        medicalDetails: action.payload
      };
    case EDIT_PERSONAL_PROFILE:
      return {
        ...state,
        personalDetails: action.payload
      };
    case EDIT_MEDICAL_PROFILE:
      return {
        ...state,
        medicalDetails: action.payload
      };
    default:
      return state;
  }
  return state;
};

export default profileReducer;
