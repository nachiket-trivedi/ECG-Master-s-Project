import { backendIp, backendPort } from "../../constants/server";
import axios from "axios";

const hostAddress = `${backendIp}:${backendPort}`;

export const VIEW_PERSONAL_PROFILE = "VIEW_PERSONAL_PROFILE";
export const EDIT_PERSONAL_PROFILE = "EDIT_PERSONAL_PROFILE";
export const VIEW_MEDICAL_PROFILE = "VIEW_MEDICAL_PROFILE";
export const EDIT_MEDICAL_PROFILE = "EDIT_MEDICAL_PROFILE";

export const viewPersonalProfile = (userId, token) => async dispatch => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  };
  axios.defaults.withCredentials = true;
  await axios
    .get(hostAddress + "/profile/personalProfile/" + userId, config)
    .then(async responseData => {
      console.log("responseData: ", responseData.data);
      dispatch({
        type: VIEW_PERSONAL_PROFILE,
        payload: responseData.data
      });
    })
    .catch(function(err) {
      console.log(err);
    });
};

export const editPersonalProfile = (
  userId,
  firstName,
  lastName,
  addressLine1,
  addressLine2,
  city,
  state,
  zipcode,
  country,
  contact,
  email,
  token
) => async dispatch => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  };
  axios.defaults.withCredentials = true;

  const data = {
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    contact: contact,
    addressLine1: addressLine1,
    addressLine2: addressLine2,
    city: city,
    state: state,
    zipcode: zipcode,
    country: country,
    password: ""
  };

  console.log(data);
  await axios
    .post(hostAddress + "/profile/updatePersonalProfile", data, config)
    .then(async responseData => {
      console.log("responseData: ", responseData.data);
      const payload = {
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        state: state,
        zipcode: zipcode,
        country: country,
        email: email
      };
      dispatch({
        type: EDIT_PERSONAL_PROFILE,
        payload: payload
      });
    })
    .catch(function(err) {
      console.log(err);
    });
};

export const viewMedicalProfile = (userId, token) => async dispatch => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  };
  axios.defaults.withCredentials = true;
  await axios
    .get(hostAddress + "/profile/medicalProfile/" + userId, config)
    .then(async responseData => {
      console.log("responseData: ", responseData.data);
      dispatch({
        type: VIEW_MEDICAL_PROFILE,
        payload: responseData.data
      });
    })
    .catch(function(err) {
      console.log(err);
    });
};

export const editMedicalProfile = (
  userId,
  gender,
  bloodType,
  history,
  dob,
  height,
  weight,
  weightUnit,
  heightUnit,
  token
) => async dispatch => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  };
  axios.defaults.withCredentials = true;

  const data = {
    userId: userId,
    gender: gender,
    bloodType: bloodType,
    history: history,
    dob: dob,
    height: height,
    weight: weight,
    weightUnit: weightUnit,
    heightUnit: heightUnit
  };

  console.log(data);
  await axios
    .post(hostAddress + "/profile/updateMedicalProfile", data, config)
    .then(async responseData => {
      console.log("responseData: ", responseData.data);
      const payload = {
        userId: userId,
        gender: gender,
        blood_type: bloodType,
        history: history,
        dob: dob,
        height: height,
        weight: weight,
        weight_unit: weightUnit,
        height_unit: heightUnit
      };
      console.log(payload);
      dispatch({
        type: EDIT_PERSONAL_PROFILE,
        payload: payload
      });
    })
    .catch(function(err) {
      console.log(err);
    });
};
