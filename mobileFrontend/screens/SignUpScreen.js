import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  SafeAreaView,
  Alert
} from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import MainButton from "../components/MainButton";
import CancelButton from "../components/CancelButton";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/authentication";
import { connect } from "react-redux";

function SignUpScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [homeState, setHomeState] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");

  const dispatch = useDispatch();

  const submitHandler = async () => {
    await dispatch(
      authActions.signup(
        email,
        password,
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        homeState,
        zipcode,
        country,
        contact
      )
    );
    const message = props.auth.message;
    if (message == "Successful Registration") {
      props.navigation.navigate("Home");
    } else {
      Alert.alert("Sign Up error", message, [
        { text: "Okay", style: "destructive", onPress: cancelHandler }
      ]);
    }
  };

  const cancelHandler = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setAddressLine1("");
    setAddressLine2("");
    setHomeState("");
    setCity("");
    setContact("");
    setCountry("");
    setZipcode("");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <KeyboardAvoidingView
          behaviour="padding"
          keyboardVerticalOffset={50}
          style={styles.screen}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <Card style={styles.authBox}>
              <View style={styles.heading}>
                <Text style={styles.headingText}>Sign Up</Text>
              </View>

              <View style={styles.gridRow}>
                <Ionicons
                  name="mail-outline"
                  size={36}
                  color={colors.primary}
                />
                <View style={styles.field}>
                  <Text style={styles.fieldName}>Email</Text>
                  <TextInput
                    style={styles.fieldValueRow}
                    placeholder="jane@doe.com"
                    autoCapitalize="none"
                    required
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={text => setEmail(text)}
                    returnKeyType="next"
                    clearButtonMode="always"
                  ></TextInput>
                </View>
              </View>
              <View style={styles.gridRow}>
                <Ionicons name="key-outline" size={36} color={colors.primary} />
                <View style={styles.field}>
                  <Text style={styles.fieldName}>Password</Text>
                  <TextInput
                    style={styles.fieldValueRow}
                    placeholder="*******"
                    autoCorrect={false}
                    secureTextEntry
                    required
                    keyboardType="email-address"
                    onChangeText={text => setPassword(text)}
                    returnKeyType="next"
                    clearButtonMode="always"
                  ></TextInput>
                </View>
              </View>

              <View style={styles.gridRow}>
                <View style={styles.leftField}>
                  <Ionicons
                    name="person-outline"
                    size={36}
                    color={colors.primary}
                  />
                  <View style={styles.field}>
                    <Text style={styles.fieldName}>First Name</Text>
                    <TextInput
                      style={styles.fieldValueTwoColumn}
                      placeholder="Jane"
                      autoCorrect={false}
                      required
                      keyboardType="default"
                      onChangeText={text => setFirstName(text)}
                      returnKeyType="next"
                      clearButtonMode="always"
                    ></TextInput>
                  </View>
                </View>

                <View style={styles.rightField}>
                  <Ionicons
                    name="person-outline"
                    size={36}
                    color={colors.primary}
                  />
                  <View style={styles.field}>
                    <Text style={styles.fieldName}>Last Name</Text>
                    <TextInput
                      style={styles.fieldValueTwoColumn}
                      placeholder="Doe"
                      autoCorrect={false}
                      required
                      keyboardType="default"
                      onChangeText={text => setLastName(text)}
                      returnKeyType="next"
                      clearButtonMode="always"
                    ></TextInput>
                  </View>
                </View>
              </View>

              <View style={styles.gridRow}>
                <View style={styles.leftField}>
                  <Ionicons
                    name="call-outline"
                    size={36}
                    color={colors.primary}
                  />
                  <View style={styles.field}>
                    <Text style={styles.fieldName}>Contact</Text>
                    <TextInput
                      style={styles.fieldValueTwoColumn}
                      placeholder="9898989888"
                      autoCorrect={false}
                      required
                      keyboardType="number-pad"
                      onChangeText={text => setContact(text)}
                      returnKeyType="next"
                      clearButtonMode="always"
                    ></TextInput>
                  </View>
                </View>

                <View style={styles.rightField}>
                  <Ionicons
                    name="globe-outline"
                    size={36}
                    color={colors.primary}
                  />
                  <View style={styles.field}>
                    <Text style={styles.fieldName}>Country</Text>
                    <TextInput
                      style={styles.fieldValueTwoColumn}
                      placeholder="United States"
                      autoCorrect={false}
                      required
                      keyboardType="default"
                      onChangeText={text => setCountry(text)}
                      returnKeyType="next"
                      clearButtonMode="always"
                    ></TextInput>
                  </View>
                </View>
              </View>

              <View style={styles.gridRow}>
                <Ionicons
                  name="location-outline"
                  size={36}
                  color={colors.primary}
                />
                <View style={styles.field}>
                  <Text style={styles.fieldName}>Address Line 1</Text>
                  <TextInput
                    style={styles.fieldValueRow}
                    placeholder="1234 Main St"
                    autoCorrect={false}
                    required
                    keyboardType="default"
                    onChangeText={text => setAddressLine1(text)}
                    returnKeyType="next"
                    clearButtonMode="always"
                  ></TextInput>
                </View>
              </View>

              <View style={styles.gridRow}>
                <Ionicons
                  name="home-outline"
                  size={36}
                  color={colors.primary}
                />
                <View style={styles.field}>
                  <Text style={styles.fieldName}>Address Line 2</Text>
                  <TextInput
                    style={styles.fieldValueRow}
                    placeholder="Apt, Suite, Floor"
                    autoCorrect={false}
                    required
                    keyboardType="default"
                    onChangeText={text => setAddressLine2(text)}
                    returnKeyType="next"
                    clearButtonMode="always"
                  ></TextInput>
                </View>
              </View>

              <View style={styles.gridRow}>
                <Ionicons name="map-outline" size={36} color={colors.primary} />
                <View style={styles.field}>
                  <Text style={styles.fieldName}>City</Text>
                  <TextInput
                    style={styles.fieldValueRow}
                    placeholder="San Jose"
                    autoCorrect={false}
                    required
                    keyboardType="default"
                    onChangeText={text => setCity(text)}
                    returnKeyType="next"
                    clearButtonMode="always"
                  ></TextInput>
                </View>
              </View>

              <View style={styles.gridRow}>
                <View style={styles.leftField}>
                  <Ionicons
                    name="map-outline"
                    size={36}
                    color={colors.primary}
                  />
                  <View style={styles.field}>
                    <Text style={styles.fieldName}>State</Text>
                    <TextInput
                      style={styles.fieldValueTwoColumn}
                      placeholder="CA"
                      autoCorrect={false}
                      required
                      keyboardType="default"
                      onChangeText={text => setHomeState(text)}
                      returnKeyType="next"
                      clearButtonMode="always"
                    ></TextInput>
                  </View>
                </View>

                <View style={styles.rightField}>
                  <Ionicons
                    name="pin-outline"
                    size={36}
                    color={colors.primary}
                  />
                  <View style={styles.field}>
                    <Text style={styles.fieldName}>Zipcode</Text>
                    <TextInput
                      style={styles.fieldValueTwoColumn}
                      placeholder="95113"
                      autoCorrect={false}
                      required
                      keyboardType="number-pad"
                      onChangeText={text => setZipcode(text)}
                      returnKeyType="next"
                      clearButtonMode="always"
                    ></TextInput>
                  </View>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <MainButton onPress={submitHandler}> Submit</MainButton>
                {/* <CancelButton onPress={cancelHandler}>Cancel</CancelButton> */}
              </View>
              <View>
                <Button
                  title="Already a member? Sign In"
                  color={colors.titleColor}
                  size={22}
                  onPress={() => props.navigation.navigate("AuthScreen")}
                ></Button>
              </View>
            </Card>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary
  },
  authBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 50
  },
  heading: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20
  },
  headingText: {
    fontSize: 22,
    color: colors.titleColor,
    fontFamily: "open-sans-bold"
  },
  gridRow: {
    flexDirection: "row",
    marginVertical: 15,
    overflow: "hidden"
  },
  leftField: {
    flex: 1,
    flexDirection: "row"
  },
  rightField: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 5
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 15,
    alignSelf: "stretch",
    justifyContent: "space-evenly"
  },
  field: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginLeft: 10
  },
  fieldName: {
    fontSize: 14,
    color: "grey",
    textAlign: "left",
    marginBottom: 5
  },
  fieldValueTwoColumn: {
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
    width: Dimensions.get("window").width - 100,
    overflow: "hidden"
  }
});
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, null)(SignUpScreen);
