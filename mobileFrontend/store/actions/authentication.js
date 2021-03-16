import { backendIp, backendPort } from "../../constants/server";
import axios from "axios";

const hostAddress = `${backendIp}:${backendPort}`;

export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";
export const LOGOUT = "LOGOUT";

export const signup = (
  email,
  password,
  firstName,
  lastName,
  addressLine1,
  addressLine2,
  city,
  state,
  zipcode,
  country,
  contact
) => async dispatch => {
  axios.defaults.withCredentials = true;

  const data = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    contact: contact,
    addressLine1: addressLine1,
    addressLine2: addressLine2,
    city: city,
    state: state,
    zipcode: zipcode,
    country: country
  };

  console.log(data);
  await axios
    .post(hostAddress + "/register/patient", data)
    .then(async responseData => {
      console.log("responseData: ", responseData.data);
      let payload;
      if (responseData.status == 200) {
        payload = {
          userToken: responseData.data.token,
          medicalId: responseData.data.medicalFlag,
          userId: responseData.data.userId,
          message: responseData.data.message
        };
      } else {
        payload = {
          userToken: "",
          medicalId: "",
          userId: "",
          message: responseData.data.message
        };
      }
      dispatch({
        type: SIGN_UP,
        payload: payload
      });
    })
    .catch(function(err) {
      console.log(err);
    });
};

export const signIn = (email, password) => async dispatch => {
  axios.defaults.withCredentials = true;

  const data = {
    email: email,
    password: password
  };

  console.log(data);
  await axios
    .post(hostAddress + "/login", data)
    .then(async responseData => {
      console.log("responseData: ", responseData.data);
      let payload;
      if (responseData.status == 200) {
        payload = {
          userToken: responseData.data.token,
          medicalId: responseData.data.medicalFlag,
          userId: responseData.data.userId,
          message: responseData.data.message
        };
      } else {
        payload = {
          userToken: "",
          medicalId: "",
          userId: "",
          message: responseData.data.message
        };
      }

      dispatch({
        type: SIGN_IN,
        payload: payload
      });
    })
    .catch(function(err) {
      console.log(err);
    });
};

export const logout = () => {
  return({ type: LOGOUT });
};
