import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FONT_SIZES } from '../constants/typography';
import { SPACING } from '../constants/spacing';
import { useTheme } from '../context/ThemeContext';

const SplashScreen = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
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
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      color: colors.primary,
      fontWeight: '700',
      marginBottom: SPACING.sm,
    },
    subtitle: {
      fontSize: FONT_SIZES.md,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

export default SplashScreen;

