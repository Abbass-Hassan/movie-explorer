import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const EmptyState = ({ message, subtitle, icon, iconSize = 24 }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      {icon && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={colors.textSecondary}
          style={styles.icon}
        />
      )}
      <Text style={styles.message}>{message}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.xxxl,
    },
    icon: {
      marginBottom: SPACING.lg,
    },
    message: {
      color: colors.text,
      fontSize: FONT_SIZES.xl,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: SPACING.sm,
    },
    subtitle: {
      color: colors.textSecondary,
      fontSize: FONT_SIZES.md,
      textAlign: 'center',
      lineHeight: FONT_SIZES.md * 1.5,
    },
  });

export default EmptyState;

