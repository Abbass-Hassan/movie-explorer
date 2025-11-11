import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const LoadingScreen = ({ color = COLORS.primary }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingScreen;

