import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext"; 

export default function ForecastScreen() {
  const { isDarkMode } = useContext(ThemeContext); 

  const data = [
    { day: "Monday", temp: "34°C", icon: "sunny" },
    { day: "Tuesday", temp: "32°C", icon: "partly-sunny" },
    { day: "Wednesday", temp: "36°C", icon: "cloudy" },
    { day: "Thursday", temp: "31°C", icon: "rainy" },
    { day: "Friday", temp: "35°C", icon: "sunny" },
  ];

  // Dynamic Styles
  const themeStyles = {
    container: { backgroundColor: isDarkMode ? "#000" : "#f4f7f6" },
    headerTitle: { color: isDarkMode ? "#fff" : "#333" },
    card: { backgroundColor: isDarkMode ? "#1e1e1e" : "#fff" },
    dayText: { color: isDarkMode ? "#ccc" : "#444" },
    tempText: { color: isDarkMode ? "#90caf9" : "#2196F3" }
  };

  return (
    <View style={[styles.container, themeStyles.container]}>
      <Text style={[styles.headerTitle, themeStyles.headerTitle]}>7-Day Forecast</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.day}
        renderItem={({ item }) => (
          <View style={[styles.card, themeStyles.card]}>
            <Text style={[styles.dayText, themeStyles.dayText]}>{item.day}</Text>
            <Ionicons name={item.icon} size={28} color={isDarkMode ? "#90caf9" : "#2196F3"} />
            <Text style={[styles.tempText, themeStyles.tempText]}>{item.temp}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "600",
    width: 100,
  },
  tempText: {
    fontSize: 18,
    fontWeight: "800",
  },
});