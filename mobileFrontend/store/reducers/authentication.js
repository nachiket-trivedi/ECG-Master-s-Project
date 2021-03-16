import { SIGN_IN, SIGN_UP, LOGOUT } from "../actions/authentication";

const initialState = {
  userToken: "",
  medicalId: "",
  userId: "",
  message: ""
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        userToken: action.payload.userToken,
        medicalId: action.payload.medicalId,
        userId: action.payload.userId,
        message: action.payload.message
      };
    case SIGN_UP:
      return {
        ...state,
        userToken: action.payload.userToken,
        medicalId: action.payload.medicalId,
        userId: action.payload.userId,
        message: action.payload.message
      };
    case LOGOUT:
      return {
        ...state,
        userToken: "",
        medicalId: "",
        userId: "",
        message: ""
      };
    default:
      return state;
  }
  return state;
};

export default authReducer;
