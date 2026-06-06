import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext"; // Context import karein

export default function SavedCitiesScreen() {
  const { isDarkMode } = useContext(ThemeContext); // Theme access karein
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);

  // Dynamic Colors
  const colors = {
    bg: isDarkMode ? "#000" : "#ffffff",
    card: isDarkMode ? "#1c1c1e" : "#ffffff",
    text: isDarkMode ? "#fff" : "#333",
    inputBg: isDarkMode ? "#2c2c2e" : "#f0f2f5",
    placeholder: isDarkMode ? "#8e8e93" : "#aaa",
    border: isDarkMode ? "#333" : "#f0f0f0",
  };

  const addCity = () => {
    if (!city.trim()) return;
    setCities([...cities, { id: Date.now().toString(), name: city }]);
    setCity("");
  };

  const deleteCity = (id) => {
    setCities(cities.filter((item) => item.id !== id));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>My Saved Locations</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
          placeholder="Enter city name..."
          placeholderTextColor={colors.placeholder}
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addCity}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={cities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.cityCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cityName, { color: colors.text }]}>{item.name}</Text>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteCity(item.id)}>
              <Ionicons name="trash-outline" size={20} color="#ff5252" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    fontSize: 16,
    marginRight: 10,
  },
  addBtn: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cityCard: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cityName: {
    fontSize: 18,
    fontWeight: "600",
  },
  deleteBtn: {
    padding: 5,
  },
});