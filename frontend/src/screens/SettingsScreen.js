import React, { useContext } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { ThemeContext } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } =
    useContext(ThemeContext);

  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(
                "token"
              );

              router.replace("/");
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  const textColor = isDarkMode
    ? "#fff"
    : "#000";

  const cardBg = isDarkMode
    ? "#1e1e1e"
    : "#fff";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? "#000"
            : "#f2f2f2",
        },
      ]}
    >
      <Text
        style={[
          styles.headerTitle,
          {
            color: textColor,
          },
        ]}
      >
        Settings
      </Text>

      {/* Preferences */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: cardBg,
          },
        ]}
      >
        <View style={styles.row}>
          <View
            style={styles.iconContainer}
          >
            <Ionicons
              name="moon-outline"
              size={24}
              color={
                isDarkMode
                  ? "#fff"
                  : "#333"
              }
            />

            <Text
              style={[
                styles.label,
                {
                  color: textColor,
                },
              ]}
            >
              Dark Mode
            </Text>
          </View>

          <Switch
            value={isDarkMode}
            onValueChange={
              toggleTheme
            }
            trackColor={{
              true: "#2196F3",
            }}
          />
        </View>
      </View>

      {/* Account */}
      <Text
        style={[
          styles.sectionHeader,
          {
            color: isDarkMode
              ? "#888"
              : "#666",
          },
        ]}
      >
        ACCOUNT
      </Text>

      <View
        style={[
          styles.card,
          {
            backgroundColor: cardBg,
          },
        ]}
      >
        <TouchableOpacity
  onPress={() => router.replace("/")}
  style={styles.row}
>
  <View style={styles.iconContainer}>
    <Ionicons
      name="log-out-outline"
      size={24}
      color="#ff4d4d"
    />

    <Text
      style={{
        color: "#ff4d4d",
        fontSize: 16,
      }}
    >
      Logout
    </Text>
  </View>
</TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
  },

  sectionHeader: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
  },

  card: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  label: {
    fontSize: 16,
  },
});