import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Dimensions,
  TextInput
} from "react-native";
import MainButton from "../components/MainButton";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card";
import RNPickerSelect from "react-native-picker-select"; //https://blog.logrocket.com/how-to-use-the-react-native-picker-select/
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as profileActions from "../store/actions/profile";

function EditMedicalProfileScreen(props) {
  const userMedical = useSelector(state => {
    return state.profile.medicalDetails;
  });

  const userId = useSelector(state => {
    return state.profile.userId;
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDOBConfirm = date => {
    let dob = new Date(date).toISOString().split("T")[0];
    setDate(dob);
    hideDatePicker();
  };

  const [gender, setGender] = useState(userMedical.gender);
  const [bloodType, setBloodType] = useState(userMedical.blood_type);
  const [heightUnit, setHeightUnit] = useState(userMedical.height_unit);
  const [weightUnit, setWeightUnit] = useState(userMedical.weight_unit);
  const [height, setHeight] = useState(userMedical.height);
  const [weight, setWeight] = useState(userMedical.weight);
  const [history, setHistory] = useState(userMedical.history);
  const [date, setDate] = useState(new Date(userMedical.dob).toISOString().split("T")[0]);


  const dispatch = useDispatch();

  const submitHandler = () => {
    console.log(date)
    dispatch(
      profileActions.editMedicalProfile(
        userId,
        gender,
        bloodType,
        history,
        date,
        height,
        weight,
        weightUnit,
        heightUnit
      )
    );
    props.navigation.pop();
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>Medical Details</Text>
        <MainButton onPress={submitHandler}> Save </MainButton>
      </View>
      <Card style={styles.profileCard}>
        <View style={styles.detailsGrid}>
          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons
                name="male-female-outline"
                size={34}
                color={colors.primary}
              />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Gender</Text>
                <View style={styles.fieldValueDropDown}>
                  <RNPickerSelect
                    onValueChange={gender => setGender(gender)}
                    items={[
                      { label: "Female", value: "Female" },
                      { label: "Male", value: "Male" }
                    ]}
                  />
                </View>
              </View>
            </View>

            <View style={styles.gridItemRight}>
              <Ionicons name="water-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Blood Type</Text>
                <View style={styles.fieldValueDropDown}>
                  <RNPickerSelect
                    onValueChange={bloodType => setBloodType(bloodType)}
                    items={[
                      { label: "A+", value: "A+" },
                      { label: "A-", value: "A-" },
                      { label: "B+", value: "B+" },
                      { label: "B-", value: "B-" },
                      { label: "O+", value: "O+" },
                      { label: "O-", value: "O-" },
                      { label: "AB+", value: "AB+" },
                      { label: "AB-", value: "AB-" }
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons
                name="calendar-outline"
                size={34}
                color={colors.primary}
              />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Date of Birth</Text>
                <View style={styles.fieldValueRow}>
                  <Button
                    color="#DCDCDC"
                    title="Select Date of Birth"
                    onPress={showDatePicker}
                  />
                </View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleDOBConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons
                name="arrow-up-outline"
                size={34}
                color={colors.primary}
              />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Height</Text>
                <TextInput
                  style={styles.fieldValue}
                  keyboardType="numeric"
                  onChangeText={text => setHeight(text)}
                  returnKeyType="next"
                >
                  {height}
                </TextInput>
              </View>
            </View>

            <View style={styles.gridItemRight}>
              <Ionicons name="water-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Height Units</Text>
                <View style={styles.fieldValueDropDown}>
                  <RNPickerSelect
                    onValueChange={heightUnits => setHeightUnit(heightUnits)}
                    items={[
                      { label: "inch", value: "inch" },
                      { label: "cm", value: "cm" }
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons
                name="barbell-outline"
                size={34}
                color={colors.primary}
              />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Weight</Text>
                <TextInput
                  style={styles.fieldValue}
                  keyboardType="numeric"
                  onChangeText={text => setWeight(text)}
                  returnKeyType="next"
                >
                  {weight}
                </TextInput>
              </View>
            </View>

            <View style={styles.gridItemRight}>
              <Ionicons name="water-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Weight Units</Text>
                <View style={styles.fieldValueDropDown}>
                  <RNPickerSelect
                    onValueChange={weightUnits => setWeightUnit(weightUnits)}
                    items={[
                      { label: "lb", value: "lb" },
                      { label: "kg", value: "kg" }
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons name="heart-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>History of Heart Disorders</Text>
                <TextInput
                  style={styles.fieldValueRow}
                  placeholder={history}
                  onChangeText={text => setHistory(text)}
                ></TextInput>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 20,
    overflow: "hidden"
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    overflow: "hidden",
    height: Math.min(Dimensions.get("window").height / 8, 100)
  },
  headingTitle: {
    fontSize: 22,
    fontFamily: "open-sans"
  },
  profileCard: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginTop: 10,
    overflow: "hidden",
    height: "100%"
  },
  detailsGrid: {
    marginVertical: 10,
    marginHorizontal: 5,
    paddingVertical: 10
  },
  gridItemLeft: {
    flexDirection: "row",
    flex: 1,
    alignSelf: "flex-start"
  },
  gridItemRight: {
    flexDirection: "row",
    marginLeft: 10,
    flex: 1,
    alignSelf: "flex-start"
  },
  gridRow: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    alignContent: "flex-start"
  },
  field: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginLeft: 5
  },
  fieldValue: {
    fontSize: 18,
    color: "grey",
    textAlign: "left",
    borderBottomWidth: 1,
    flex: 1,
    width: 120,
    overflow: "hidden"
  },
  fieldValueRow: {
    fontSize: 18,
    color: "grey",
    textAlign: "left",
    borderBottomWidth: 1,
    flex: 1,
    width: 300,
    overflow: "hidden"
  },
  fieldValueDropDown: {
    fontSize: 18,
    color: "grey",
    textAlign: "left",
    borderBottomWidth: 1,
    flex: 1,
    width: 120,
    height: 25,
    overflow: "hidden"
  }
});

export default EditMedicalProfileScreen;
