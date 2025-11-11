import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { FONT_SIZES } from '../constants/typography';
import { SPACING } from '../constants/spacing';

const SplashScreen = () => (
  <View style={styles.container}>
    <Image
      source={require('../../assets/popcorn.png')}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.title}>Movie Explorer</Text>
    <Text style={styles.subtitle}>Your favorite movies in one place</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    color: COLORS.primary,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default SplashScreen;

