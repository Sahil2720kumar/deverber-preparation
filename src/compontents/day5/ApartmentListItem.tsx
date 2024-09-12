import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { memo } from "react";

import apartments from "@/assets/data/day5/apartments.json";

type apartmentProps = {
  apartment: (typeof apartments)[0];
  additionalStyle?: ViewStyle;
};

const ApartmentListItem = memo(
  ({ apartment, additionalStyle = {} }: apartmentProps) => {
    return (
      <View style={[styles.card, additionalStyle]}>
        <View style={styles.imgContainer}>
          <Text>Image here</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{apartment.name}</Text>
          <Text style={styles.description}>{apartment.description}</Text>

          <View style={styles.footer}>
            <Text style={styles.price}>₹ {apartment.price} night</Text>
            <Text style={styles.price}>
              ★ {apartment.star} ({apartment.rating})
            </Text>
          </View>
        </View>
      </View>
    );
  },
);

export default ApartmentListItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",

    flexDirection: "row",
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  imgContainer: {
    width: 150,
    aspectRatio: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#D3D1D6",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontFamily: "InterBold",
    marginBottom: 10,
    fontSize: 16,
  },
  description: {
    color: "gray",
  },
  price: {
    fontFamily: "InterBold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
});
