import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Pressable, 
  Text, 
  Alert, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if(!email || !password) {
            Alert.alert("Error", "Please enter email and password");
            return;
        }
        
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/auth/login", { email, password });
            router.replace('/(tabs)/home'); 
        } catch (error) {
            Alert.alert("Login Failed", "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.container}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.card}>
                    <Text style={styles.title}>WELCOME BACK!</Text>
                    <Text style={styles.subtitle}>Log in to continue</Text>

                    <TextInput 
                        style={styles.input} 
                        placeholder="Email Address" 
                        placeholderTextColor="#aaa"
                        onChangeText={setEmail} 
                        value={email}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Password" 
                        placeholderTextColor="#aaa"
                        secureTextEntry 
                        onChangeText={setPassword} 
                        value={password} 
                    />
                    
                    <Pressable 
                        onPress={handleLogin}
                        disabled={loading}
                        style={({ pressed }) => [
                            styles.btn,
                            { opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }
                        ]}
                    >
                        <Text style={styles.btnText}>{loading ? "Logging in..." : "Login"}</Text>
                    </Pressable>

                    <Pressable onPress={() => router.push('/signup')} style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? <Text style={styles.linkText}>Sign Up</Text></Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { 
      flex: 1, backgroundColor: "#f4f7f6" 
    },
    scrollContainer: { 
      flexGrow: 1, justifyContent: "center", alignItems: 'center', padding: 20 
    },
    card: { 
        backgroundColor: "#fff", 
        padding: 30, 
        borderRadius: 25, 
        width: '100%',
        maxWidth: 450,
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 10 }, 
        shadowOpacity: 0.05, 
        shadowRadius: 15, 
        elevation: 5 
    },
    title: { 
      fontSize: 28, fontWeight: "800", color: "#111", textAlign: 'center', marginBottom: 25 
    },
    subtitle: { 
      fontSize: 14, color: "#888", textAlign: 'center', marginBottom: 20 
    },
    input: { 
        backgroundColor: "#f9f9f9", 
        padding: 18, 
        marginBottom: 15, 
        borderRadius: 14, 
        borderWidth: 1, 
        borderColor: "#e5e5e5", 
        fontSize: 16
    },
    btn: { 
        backgroundColor: "#2196F3", 
        padding: 18, 
        borderRadius: 14, 
        alignItems: 'center', 
        marginTop: 10,
        width: '100%' 
    },
    btnText: {
      color: '#fff', fontSize: 16, fontWeight: '700' 
    },
    footer: { 
      marginTop: 20, alignItems: 'center' 
    },
    footerText: { 
      color: "#666" 
    },
    linkText: { 
      color: "#2196F3", fontWeight: "bold" 
    }
});