import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from './src/screens/SplashScreen';

const AppContent = () => {
  const { isDark, isReady } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <FavoritesProvider>
        <StatusBar style="light" />
        <SplashScreen />
      </FavoritesProvider>
    );
  }

  return (
    <FavoritesProvider>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {showSplash ? <SplashScreen /> : <AppNavigator />}
    </FavoritesProvider>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
