import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';

const EmptyState = ({ message, subtitle, icon, iconSize = 24 }) => {
  return (
    <View style={styles.container}>
      {icon && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={COLORS.textSecondary}
          style={styles.icon}
        />
      )}
      <Text style={styles.message}>{message}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: COLORS.text,
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    lineHeight: FONT_SIZES.md * 1.5,
  },
});

export default EmptyState;

