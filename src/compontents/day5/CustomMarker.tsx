import { StyleSheet, Text, View } from "react-native";
import React, { memo, useState } from "react";
import { Marker } from "react-native-maps";

const CustomMarker = memo(({ apartment, onPress, selectedApartment }) => {
  return (
    <Marker
      onPress={onPress}
      key={apartment.id}
      coordinate={{
        latitude: apartment.latitude,
        longitude: apartment.longitude,
      }}
      //title={apartment.name}
      //description={apartment.description}
    >
      <View
        style={[
          {
            backgroundColor: "white",
            padding: 5,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 20,
            //shadowColor: "gray",
            //shadowOffset: { width: 0, height: 2 },
            //shadowOpacity: 0.5,
            //shadowRadius: 2,
            //elevation: 2,
            //alignSelf: "stretch",
          },
          {
            backgroundColor: `${selectedApartment?.name === apartment.name ? "#D3D1D6" : "white"}`,
          },
        ]}
      >
        <Text style={{ fontFamily: "InterBold" }}>₹ {apartment.price}</Text>
      </View>
    </Marker>
  );
});

export default CustomMarker;

const styles = StyleSheet.create({});
