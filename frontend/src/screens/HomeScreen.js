import React, { useState, useContext } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons"; 

const API_KEY = "14d75da9a4fa3a42602c1a80fcdd5e57"; 
const API_URL = "https://api.openweathermap.org/data/2.5";

export default function HomeScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const [city, setCity] = useState("Islamabad");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    Keyboard.dismiss();
    try {
      const res = await axios.get(`${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(res.data);
    } catch (error) {
      Alert.alert("Error", "City not found");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#0F172A" : "#F8FAFC" }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <Text style={[styles.heading, { color: isDarkMode ? "#FFF" : "#1E293B" }]}>Weather Forecast</Text>

        <View style={styles.searchBox}>
          <TextInput
            style={[styles.input, { backgroundColor: isDarkMode ? "#1E293B" : "#FFF", color: isDarkMode ? "#FFF" : "#000" }]}
            placeholder="Search City..."
            placeholderTextColor="#94A3B8"
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={getWeather}>
            <Ionicons name="search" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#38BDF8" style={{ marginTop: 20 }} />}

        {weather && (
          <View style={[styles.card, { backgroundColor: isDarkMode ? "#1E293B" : "#FFF" }]}>
            <Text style={[styles.city, { color: isDarkMode ? "#FFF" : "#0F172A" }]}>{weather.name}</Text>
            <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
            <Text style={styles.desc}>{weather.weather[0].description.toUpperCase()}</Text>
            
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Ionicons name="water-outline" size={20} color="#38BDF8" />
                <Text style={{color: isDarkMode ? "#CBD5E1" : "#64748B"}}>{weather.main.humidity}%</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="speedometer-outline" size={20} color="#38BDF8" />
                <Text style={{color: isDarkMode ? "#CBD5E1" : "#64748B"}}>{weather.wind.speed} m/s</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  scroll: { 
    padding: 20, 
    paddingTop: 60 
  },
  heading: { 
    fontSize: 28, 
    fontWeight: "800", 
    marginBottom: 30, 
    textAlign: "center" 
  },
  searchBox: { 
    flexDirection: "row", 
    gap: 10 
  },
  input: { 
    flex: 1, 
    padding: 18, 
    borderRadius: 15, 
    fontSize: 16, 
    elevation: 2 
  },
  searchBtn: { 
    backgroundColor: "#38BDF8", 
    padding: 18, 
    borderRadius: 15, 
    justifyContent: "center" 
  },
  card: { 
    marginTop: 40, 
    padding: 30, 
    borderRadius: 30, 
    alignItems: "center", 
    elevation: 10, 
    shadowColor: "#000", 
    shadowOpacity: 0.1, 
    shadowRadius: 20 
  },
  city: { 
    fontSize: 32, 
    fontWeight: "bold" 
  },
  temp: { 
    fontSize: 70, 
    fontWeight: "900", 
    color: "#38BDF8", 
    marginVertical: 10 
  },
  desc: { 
    fontSize: 18, 
    color: "#94A3B8", 
    letterSpacing: 1 
  },
  detailsRow: { 
    flexDirection: "row", 
    gap: 30, 
    marginTop: 30 
  },
  detailItem: { 
    alignItems: "center", 
    gap: 5 
  }
});