import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import axios from "axios";
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const handleSignup = async () => {
    // Validation
    if (!name.trim()) { Alert.alert("Error", "Please enter your name"); return; }
    if (!email.trim()) { Alert.alert("Error", "Please enter your email"); return; }
    if (!password.trim()) { Alert.alert("Error", "Please enter your password"); return; }
    if (!email.includes("@")) { Alert.alert("Error", "Please enter a valid email address"); return; }

    setLoading(true);
    try {
      // API call to server
      await axios.post("http://localhost:5000/api/auth/signup", { name, email, password });
      Alert.alert("Success", "Account Created!");
      router.replace('/');
    } catch (error) {
      console.log("Signup Error:", error.response?.data);
      Alert.alert("Error", "Signup Failed: " + (error.response?.data?.message || "Check Server"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        keyboardShouldPersistTaps="always" 
      >
        <View style={styles.card}>
          <Text style={styles.title}>SIGN UP!</Text>
          
          <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} placeholderTextColor="#aaa" />
          <TextInput placeholder="Email Address" style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholderTextColor="#aaa" />
          <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} placeholderTextColor="#aaa" />
          
          <Pressable onPress={handleSignup} disabled={loading} style={styles.btn}>
            <Text style={styles.btnText}>{loading ? "Creating..." : "Create Account"}</Text>
          </Pressable>

          <Pressable onPress={() => router.replace('/')} style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? <Text style={styles.linkText}>Log In</Text></Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f7f6" },
  scrollContainer: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  card: { backgroundColor: "#fff", padding: 30, borderRadius: 25, width: "100%", maxWidth: 450, elevation: 5, boxShadow: "0px 10px 15px rgba(0,0,0,0.1)" },
  title: { fontSize: 28, fontWeight: "800", color: "#111", textAlign: "center", marginBottom: 25 },
  input: { backgroundColor: "#f9f9f9", padding: 18, marginBottom: 15, borderRadius: 14, borderWidth: 1, borderColor: "#e5e5e5", fontSize: 16 },
  btn: { backgroundColor: "#2196F3", padding: 18, borderRadius: 14, alignItems: "center", marginTop: 10, width: "100%" },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  footer: { marginTop: 20, alignItems: "center" },
  linkText: { color: "#2196F3", fontWeight: "bold" }
});