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

function AuthScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = async () => {
    await dispatch(authActions.signIn(email, password));
    const message = props.auth.message;
    if (message == "Login Successful") {
      props.navigation.navigate("Home");
    } else if (message != ""){
      Alert.alert(message, message, [
        { text: "Okay", style: "destructive", onPress: cancelHandler }
      ]);
      dispatch(authActions.logout());
    }
  };

  const cancelHandler = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <KeyboardAvoidingView
      behaviour="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Card style={styles.authBox}>
        <ScrollView>
          <View style={styles.heading}>
            <Text style={styles.headingText}>Sign In</Text>
          </View>
          <View style={styles.gridRow}>
            <Ionicons name="mail-outline" size={36} color={colors.primary} />
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
                autoCapitalize="none"
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
          <View style={styles.buttonContainer}>
            <MainButton onPress={submitHandler}> Submit</MainButton>
            {/* <CancelButton onPress={cancelHandler}>Cancel</CancelButton> */}
          </View>
          <View>
            <Button
              title="Not a member? Sign Up"
              color={colors.titleColor}
              size={22}
              onPress={() => props.navigation.navigate("SignUpScreen")}
            ></Button>
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
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
    marginTop: Dimensions.get("window").height / 3.5
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
    marginVertical: 15
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
  fieldValueRow: {
    fontSize: 18,
    color: "grey",
    textAlign: "left",
    borderBottomWidth: 1,
    flex: 1,
    width: 300,
    overflow: "hidden"
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, null)(AuthScreen);
