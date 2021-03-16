import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  ScrollView
} from "react-native";
import MainButton from "../components/MainButton";
import { useSelector, useDispatch } from "react-redux";
import { editPersonalProfile } from "../store/actions/profile";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import * as profileActions from "../store/actions/profile";

function EditPersonalProfileScreen(props) {
  /*
  const dispatch = useDispatch();

  const editPersonalProfileHandler = useCallback(() => {
    dispatch(editPersonalProfile(user.email))
  }, [dispatch,user.email]);
  */
  const user = useSelector(state => {
    return state.profile.personalDetails;
  });

  const userId = useSelector(state => {
    return state.auth.userId;
  });

  const token = useSelector(state => {
    return state.auth.userToken;
  });

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [addressLine1, setAddressLine1] = useState(user.addressLine1);
  const [addressLine2, setAddressLine2] = useState(user.addressLine2);
  const [homeState, setHomeState] = useState(user.state);
  const [city, setCity] = useState(user.city);
  const [contact, setContact] = useState(user.contact);
  const [country, setCountry] = useState(user.country);
  const [zipcode, setZipcode] = useState(user.zipcode);

  const email = user.email;

  const dispatch = useDispatch();

  const submitHandler = () => {
      dispatch(profileActions.editPersonalProfile(userId,
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        homeState,
        zipcode,
        country,
        contact,
        email,
        token))
        props.navigation.pop();
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>Personal Details</Text>
        <MainButton onPress={submitHandler}> Save </MainButton>
      </View>
      <Card style={styles.profileCard}>
        <View style={styles.detailsGrid}>
          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons
                name="person-outline"
                size={34}
                color={colors.primary}
              />
              <View style={styles.field}>
                <Text style={styles.fieldName}>First Name</Text>
                <TextInput
                  style={styles.fieldValue}
                  placeholder={firstName}
                  onChangeText={text => setFirstName(text)}
                  returnKeyType="next"
                ></TextInput>
              </View>
            </View>
            <View style={styles.gridItemRight}>
              <Ionicons
                name="person-outline"
                size={34}
                color={colors.primary}
              />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Last Name</Text>
                <TextInput
                  style={styles.fieldValue}
                  placeholder={lastName}
                  onChangeText={text => setLastName(text)}
                  returnKeyType="next"
                ></TextInput>
              </View>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons name="call-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Mobile</Text>
                <TextInput
                  style={styles.fieldValue}
                  placeholder={contact}
                  keyboardType="number-pad"
                  onChangeText={text => setContact(text)}
                  returnKeyType="next"
                ></TextInput>
              </View>
            </View>
            <View style={styles.gridItemRight}>
              <Ionicons name="globe-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Country</Text>
                <TextInput
                  style={styles.fieldValue}
                  placeholder={country}
                  onChangeText={text => setCountry(text)}
                  returnKeyType="next"
                ></TextInput>
              </View>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons
                name="location-outline"
                size={34}
                color={colors.primary}
              />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Address</Text>
                <TextInput
                  style={styles.fieldValueRow}
                  placeholder={addressLine1}
                  onChangeText={text => setAddressLine1(text)}
                  returnKeyType="next"
                ></TextInput>
              </View>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons name="home-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Address line 2</Text>
                <TextInput
                  style={styles.fieldValueRow}
                  placeholder={addressLine2}
                  onChangeText={text => setAddressLine2(text)}
                  returnKeyType="next"
                ></TextInput>
              </View>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons name="map-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>City</Text>
                <TextInput
                  style={styles.fieldValueRow}
                  placeholder={city}
                  onChangeText={text => setCity(text)}
                  returnKeyType="next"
                ></TextInput>
              </View>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons name="flag-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>State</Text>
                <TextInput
                  style={styles.fieldValue}
                  placeholder={homeState}
                  onChangeText={text => setHomeState(text)}
                  returnKeyType="next"
                ></TextInput>
              </View>
            </View>
            <View style={styles.gridItemRight}>
              <Ionicons name="pin-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Zipcode</Text>
                <TextInput
                  style={styles.fieldValue}
                  placeholder={zipcode.toString()}
                  keyboardType="number-pad"
                  onChangeText={text => setZipcode(text)}
                  returnKeyType="next"
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
    overflow: "scroll"
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
    paddingVertical: 10,
    overflow: "hidden"
  },
  gridItemLeft: {
    flexDirection: "row",
    flex: 1
  },
  gridItemRight: {
    flexDirection: "row",
    marginLeft: 10,
    flex: 1
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
  fieldName: {
    fontSize: 14,
    color: "grey",
    textAlign: "left"
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
  }
});

export default EditPersonalProfileScreen;
