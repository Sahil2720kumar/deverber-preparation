import { StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Stack } from "expo-router";
import apartments from "@/assets/data/day5/apartments.json";
import CustomMarker from "@/src/compontents/day5/CustomMarker";
import ApartmentListItem from "@/src/compontents/day5/ApartmentListItem";
import { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";

const AirbnbScreen = () => {
  const [selectedApartment, setSelectedApartment] = useState<
    (typeof apartments)[0] | null
  >(null);

  // variables
  const snapPoints = useMemo(() => [80, "50%", "90%"], []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 27.4807,
          longitude: 94.9059,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
      >
        {apartments.map((apartment) => {
          return (
            <CustomMarker
              apartment={apartment}
              key={apartment.id}
              onPress={() => setSelectedApartment(apartment)}
              selectedApartment={selectedApartment}
            />
          );
        })}
      </MapView>

      {/* Display selected apartment  */}
      {selectedApartment && (
        <ApartmentListItem
          apartment={selectedApartment}
          additionalStyle={styles.selectedApartmentStyles}
        />
      )}

      {/* Display Bottom Sheet  */}
      <BottomSheet index={0} snapPoints={snapPoints}>
        <View style={styles.contentContainer}>
          <Text style={styles.listTitle}>Over {apartments.length} places</Text>
          <BottomSheetFlatList
            data={apartments}
            renderItem={({ item }) => <ApartmentListItem apartment={item} />}
            contentContainerStyle={{
              gap: 10,
              paddingHorizontal: 10,
              paddingBottom: 10,
            }}
            scrollEnabled
            showsVerticalScrollIndicator={false}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default AirbnbScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "100%",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
  },
  listTitle: {
    fontFamily: "InterBold",
    textAlign: "center",
    fontSize: 16,
    padding: 10,
    letterSpacing: 1,
  },
  selectedApartmentStyles: {
    position: "absolute",
    bottom: 100,
    right: 10,
    left: 10,
  },
});
