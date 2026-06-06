import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function WeatherCard({
  weather,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>
        {weather.name}
      </Text>

      <Text style={styles.temp}>
        {weather.main.temp}°C
      </Text>

      <Text>
        {
          weather.weather[0]
            .description
        }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    marginVertical: 10,
  },

  city: {
    fontSize: 22,
    fontWeight: "bold",
  },

  temp: {
    fontSize: 40,
  },
});