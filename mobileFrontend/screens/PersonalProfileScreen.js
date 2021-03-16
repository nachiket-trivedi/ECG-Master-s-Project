import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as profileActions from "../store/actions/profile";

import colors from "../constants/colors";

import MainButton from "../components/MainButton";
import Card from "../components/Card";

import { useSelector, useDispatch } from "react-redux";

function PersonalProfileScreen(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector(state => {
    return state.profile.personalDetails;
  });

  const userId = useSelector(state => {
    return state.profile.userId;
  });

  const loadData = useCallback(async () => {
    await dispatch(profileActions.viewPersonalProfile(userId))
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    props.navigation.addListener("focus", loadData);
  },[loadData]);

//   if (isLoading) {
//     return (
//       <View style={styles.activityScreen}>
//         <ActivityIndicator size="large" color={colors.primary} />
//       </View>
//     );
//   }

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
          <Text style={styles.headingTitle} numberOfLines={2}>
            {user.firstName} {user.lastName}
          </Text>
          <Text>{user.email}</Text>
        </View>
        <View style={styles.buttonSpace}>
          <MainButton
            onPress={() => {
              props.navigation.navigate({ name: "MedicalProfileScreen" });
            }}
          >
            Medical
          </MainButton>
        </View>
      </View>
      <Card style={styles.profileCard}>
        <View style={styles.detailsHeading}>
          <Text style={styles.detailsTitle}>Personal Details</Text>
          <View style={styles.buttonSpace}>
            <MainButton
              onPress={() => {
                props.navigation.navigate({
                  name: "EditPersonalProfileScreen"
                });
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
              <Ionicons name="call-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Mobile</Text>
                <Text style={styles.fieldValue}>{user.contact}</Text>
              </View>
            </View>
            <View style={styles.gridItemRight}>
              <Ionicons name="globe-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Country</Text>
                <Text style={styles.fieldValue}>{user.country}</Text>
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
                <Text style={styles.fieldValue}>{user.addressLine1}</Text>
              </View>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons name="home-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Address line 2</Text>
                <Text style={styles.fieldValue}>{user.addressLine2}</Text>
              </View>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons name="map-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>City</Text>
                <Text style={styles.fieldValue}>{user.city}</Text>
              </View>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridItemLeft}>
              <Ionicons name="flag-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>State</Text>
                <Text style={styles.fieldValue}>{user.state}</Text>
              </View>
            </View>
            <View style={styles.gridItemRight}>
              <Ionicons name="pin-outline" size={34} color={colors.primary} />
              <View style={styles.field}>
                <Text style={styles.fieldName}>Zipcode</Text>
                <Text style={styles.fieldValue}>{user.zipcode}</Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  activityScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
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
    flex: 2,
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

export default PersonalProfileScreen;
