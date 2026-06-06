// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#2196F3' }}>
      {/* Home Tab */}
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'Home', 
          tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color}/> 
        }} 
      />
      
      {/* Forecast Tab */}
      <Tabs.Screen 
        name="forecast" 
        options={{ 
          title: 'Forecast', 
          tabBarIcon: ({color}) => <Ionicons name="partly-sunny" size={24} color={color}/> 
        }} 
      />

      {/* Saved Cities Tab */}
      <Tabs.Screen 
        name="saved" 
        options={{ 
          title: 'Saved', 
          tabBarIcon: ({color}) => <Ionicons name="bookmark" size={24} color={color}/> 
        }} 
      />

      <Tabs.Screen 
        name="details" 
        options={{ 
          title: 'Current', 
          tabBarIcon: ({color}) => <Ionicons name="person" size={24} color={color}/> 
        }} 
      />

      {/* Settings Tab */}
      <Tabs.Screen 
        name="settings" 
        options={{ 
          title: 'Settings', 
          tabBarIcon: ({color}) => <Ionicons name="settings" size={24} color={color}/> 
        }} 
      />

    </Tabs>
  );
}