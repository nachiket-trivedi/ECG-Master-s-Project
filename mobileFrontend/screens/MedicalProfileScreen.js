import React, { useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import MainButton from "../components/MainButton";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as profileActions from "../store/actions/profile";

import Card from "../components/Card";

function MedicalProfileScreen(props) {
  const dispatch = useDispatch();

  const user = useSelector(state => {
    return state.profile.personalDetails;
  });

  const userId = useSelector(state => {
    return state.profile.userId;
  });

  const userMedical = useSelector(state => {
    return state.profile.medicalDetails;
  });

  const loadData = useCallback(async () => {
    await dispatch(profileActions.viewMedicalProfile(userId));
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    props.navigation.addListener("focus", loadData);
  },[loadData]);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.heading}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/female.png")}
            resizeMode="cover"
          />
        </View>
        <View style={styles.name}>
          <Text style={styles.headingTitle}>
            {user.firstName} {user.lastName}
          </Text>
          <Text>{user.email}</Text>
        </View>
      </View>
      <Card style={styles.profileCard}>
        <View style={styles.detailsHeading}>
          <Text style={styles.detailsTitle}>Medical Details</Text>
          <View style={styles.buttonSpace}>
            <MainButton
              onPress={() => {
                props.navigation.navigate({ name: "EditMedicalProfileScreen" });
              }}
            >
              Edit
              {/* <Ionicons name="pencil-outline" size={16} color="white" />{" "} */}
            </MainButton>
          </View>
        </View>
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
                <Text style={styles.fieldValue}>{userMedical.gender}</Text>
              </View>
            </View>
            <View style={styles.gridItemRight}>
              <Ionicons
                name="calendar-outline"
                size={34}
                color={colors.primary}
              />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Birth Date</Text>
                <Text style={styles.fieldValue}>
                  {new Date(userMedical.dob).toISOString().split("T")[0]}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons name="water-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Blood Type</Text>
                <Text style={styles.fieldValue}>{userMedical.blood_type}</Text>
              </View>
            </View>
            <View style={styles.gridItemRight}>
              <Ionicons
                name="arrow-up-outline"
                size={34}
                color={colors.primary}
              />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Height</Text>
                <Text style={styles.fieldValue}>
                  {userMedical.height} {userMedical.height_unit}
                </Text>
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
                <Text style={styles.fieldValue}>
                  {userMedical.weight} {userMedical.weight_unit}
                </Text>
              </View>
            </View>
            <View style={styles.gridItemRight}>
              <Ionicons name="body-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>BMI</Text>
                <Text style={styles.fieldValue}>{userMedical.BMI}</Text>
              </View>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons name="heart-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>History of Heart Disorders</Text>
                <Text style={styles.fieldValue}>{userMedical.history}</Text>
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
  image: {
    width: "100%",
    height: "100%"
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    borderColor: "grey",
    borderRadius: 200,
    borderWidth: 1,
    overflow: "hidden",
    flex: 1,
    alignSelf: "flex-start"
  },
  name: {
    flex: 3,
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingLeft: 10
  },
  detailsHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 10
  },
  detailsTitle: {
    fontSize: 20,
    paddingLeft: 10,
    fontFamily: "open-sans-bold",
    textAlignVertical: "center"
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
    color: "black",
    textAlign: "left"
  }
});

export default MedicalProfileScreen;
