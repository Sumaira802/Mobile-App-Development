import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { ThemeContext } from "../context/ThemeContext"; 
import * as Location from "expo-location";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function WeatherDetailsScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  const API_KEY = "14d75da9a4fa3a42602c1a80fcdd5e57";

  // Dynamic Colors
  const colors = {
    bg: isDarkMode ? "#000" : "#F5F7FA",
    cardBg: isDarkMode ? "#1c1c1e" : "#FFFFFF",
    textMain: isDarkMode ? "#fff" : "#222",
    textSub: isDarkMode ? "#aaa" : "#666",
    tempColor: isDarkMode ? "#90caf9" : "#222",
  };

  useEffect(() => {
    // Clock Timer
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Fetch Weather
    const fetchWeather = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") { setLoading(false); return; }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        setWeather(res.data);
      } catch (error) {
        console.log("Weather Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    return () => clearInterval(timer);
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} color={isDarkMode ? "#fff" : "#000"} />;

  const formatTime = (timestamp) => {
    if (!timestamp) return "--";
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.city, { color: colors.textMain }]}>{weather?.name}, {weather?.sys?.country}</Text>
      <Text style={styles.time}>{currentTime}</Text>

      <View style={[styles.mainCard, { backgroundColor: colors.cardBg }]}>
        <Ionicons name="partly-sunny" size={80} color="#FFD700" />
        <Text style={[styles.temp, { color: colors.tempColor }]}>
          {weather?.main?.temp ? Math.round(weather.main.temp) : "--"}°C
        </Text>
        <Text style={[styles.desc, { color: colors.textSub }]}>{weather?.weather?.[0]?.description}</Text>
      </View>

      <View style={styles.grid}>
        <Card title="Feels Like" value={`${weather?.main?.feels_like}°C`} colors={colors} />
        <Card title="Humidity" value={`${weather?.main?.humidity}%`} colors={colors} />
        <Card title="Wind" value={`${weather?.wind?.speed} m/s`} colors={colors} />
        <Card title="Pressure" value={`${weather?.main?.pressure} hPa`} colors={colors} />
        <Card title="Sunrise" value={formatTime(weather?.sys?.sunrise)} colors={colors} />
        <Card title="Sunset" value={formatTime(weather?.sys?.sunset)} colors={colors} />
      </View>
    </ScrollView>
  );
}

// Helper Card Component
function Card({ title, value, colors }) {
  return (
    <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
      <Text style={[styles.cardTitle, { color: colors.textSub }]}>{title}</Text>
      <Text style={[styles.cardValue, { color: colors.textMain }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  city: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  time: {
    color: "#aaa",
    textAlign: "center",
    marginBottom: 15,
  },
  mainCard: {
    padding: 25,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
  },
  temp: {
    fontSize: 55,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 15,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 13,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
});