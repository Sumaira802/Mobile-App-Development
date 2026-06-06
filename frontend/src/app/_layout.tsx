import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { ThemeProvider, ThemeContext } from '../context/ThemeContext';
import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

function MainApp() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff' }}>
      <Slot /> 
    </View>
  );
}

export default function RootLayout() {
 useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); 
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </Provider>
  );
}